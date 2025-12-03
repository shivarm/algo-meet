import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import cors from "cors";

import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";

const app = express();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.json());
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));

app.get("/health", (_, res) => {
  res.status(200).json({ msg: "api is up and running" });
});

// make our app ready for deployment
if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));

  app.get("/{*any}", (_, res) => {
    res.sendFile(path.join(__dirname, "../client", "dist", "index.html"));
  });
}

const startServer = async () => {
  try {
    await connectDB();
    app.listen(ENV.PORT, () => console.log("Server is running on port:", ENV.PORT));
  } catch (error) {
    console.error("Error starting the server", error);
  }
};

startServer();
