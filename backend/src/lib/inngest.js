import User from "../models/user.model.js";
import { Inngest } from "inngest";
import { connectDB } from "./db.js";
import { ENV } from "./env.js";
import { sendEmail } from "../email/emailHandler.js";
import { createWelcomeEmailTemplate } from "../email/emailTemplates.js";
import { upsertStreamUser, deleteStreamUser } from "./stream.js";

export const inngest = new Inngest({ id: "algo-meet" });

const syncUser = inngest.createFunction(
  { id: "sync-user" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    try {
      await connectDB();

      const { id, email_addresses, first_name, last_name, image_url } = event.data;

      const userData = {
        clerkId: id,
        email: email_addresses[0]?.email_address,
        name: `${first_name || ""} ${last_name || ""}`.trim(),
        profileImage: image_url,
      };

      // Use updateOne with upsert to prevent duplicate errors
      const result = await User.updateOne(
        { clerkId: id },
        { $set: userData },
        { upsert: true }
      );

      const isNewUser = result.upsertedCount > 0;
      console.log(isNewUser ? "New user created:" : "User updated:", userData.email);

      await upsertStreamUser({
        id: userData.clerkId,
        name: userData.name,
        image: userData.profileImage,
      });
      console.log("✅ User synced to Stream");

      if (isNewUser) {
        const emailHtml = createWelcomeEmailTemplate(userData.name || "there", ENV.CLIENT_URL);
        await sendEmail({
          to: userData.email,
          subject: "Welcome to AlgoMeet! 🎉",
          html: emailHtml,
        });
        console.log("Welcome email sent to:", userData.email);
      }
    } catch (error) {
      console.error("Error in syncUser:", error);
      throw error;
    }
  }
);

const deleteUserFromDB = inngest.createFunction(
  { id: "delete-user-from-db" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    try {
      await connectDB();

      const { id } = event.data;
      
      await User.deleteOne({ clerkId: id });
      console.log("User deleted from MongoDB:", id);

      await deleteStreamUser(id);
      console.log("User deleted from Stream");
    } catch (error) {
      console.error("Error in deleteUserFromDB:", error);
      throw error;
    }
  }
);

export const functions = [syncUser, deleteUserFromDB];