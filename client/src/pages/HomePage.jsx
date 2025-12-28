import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { ArrowRightIcon, CheckIcon, SparklesIcon, VideoIcon, ZapIcon } from "lucide-react";
import { SignInButton } from "@clerk/clerk-react";

const HomePage = () => {
  return (
    <div className="bg-linear-to-br from-base-100 via-base-200 to-base-300">
      {/* Navbar */}
      <nav className="bg-base-100/80 backdrop-blur-md border-b border-primary/20 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto p-4 flex items-center justify-between">
          {/* LOGO */}
          <Link
            to={"/"}
            className="flex items-center gap-3 hover:scale-105 transition-transform duration-200"
          >
            <div className="size-10 rounded-xl bg-linear-to-br from-primary via-secondary to-accent flex items-center justify-center shadow-lg">
              <SparklesIcon className="size-6 text-white" />
            </div>

            <div className="flex flex-col">
              <span className="font-black text-xl bg-linear-to-br from-primary via-secondary to-accent bg-clip-text text-transparent font-mono tracking-wider">
                Talent IQ
              </span>
              <span className="text-xs text-base-content/60 font-medium -mt-1">
                pair programming
              </span>
            </div>
          </Link>
          {/* Auth btn */}
          <SignInButton mode="modal">
            <button
              className="group px-6 py-3 bg-linear-to-r from-primary to-secondary
             text-white rounded-xl font-semibold text-sm hover:shadow-xl transition-all 
             duration-200 hover:scale-105 flex items-center gap-2"
            >
              <span>Getting Started</span>
              <ArrowRightIcon className="size-4" />
            </button>
          </SignInButton>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left design */}
          <div className="space-y-8">
            <div className="badge badge-primary badge-lg">
              <ZapIcon className="size-5" />
              Real Time programming with collaborator
            </div>
            <h1 className="text-5xl lg:text-7xl font-black leading-tight">
              <span
                className="bg-linear-to-r from-primary via-secondary to-accent
               bg-clip-text text-transparent"
              >
                Code Together,
              </span>
              <br />
              <span className="text-base-content">Learn Together</span>
            </h1>
            <p className="mt-4 text-lg text-base-content/80 max-w-xl">
              Unlock your coding potential with real-time pair programming, instant feedback, and
              seamless collaboration. Whether you're preparing for interviews or building projects,
              Talent IQ empowers you to grow, connect, and succeed—together.
            </p>

            <div className="flex flex-wrap gap-3">
              <div className="badge badge-lg badge-outline">
                <CheckIcon className="size-4 text-success" />
                Live Video Chats
              </div>
              <div className="badge badge-lg badge-outline">
                <CheckIcon className="size-4 text-success" />
                Code Editor
              </div>
              <div className="badge badge-lg badge-outline">
                <CheckIcon className="size-4 text-success" />
                Multi-Language
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <SignInButton mode="modal">
                <button className="btn btn-primary btn-lg">
                  Start Coding now
                  <ArrowRightIcon className="size-4" />
                </button>
              </SignInButton>
              <button className="btn btn-outline btn-lg">
                <VideoIcon className="size-5" /> Watch Demo
              </button>
            </div>
            {/* Stats */}
            <div className="flex flex-wrap gap-4">
              <div className="flex flex-col items-center">
                <span className="text-4xl lg:text-5xl font-extrabold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                  10K+
                </span>
                <span className="mt-2 text-base font-medium text-base-content/70">
                  Active Users
                </span>
              </div>

              <div className="flex flex-col items-center">
                <span className="text-4xl lg:text-5xl font-extrabold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                  50K+
                </span>
                <span className="mt-2 text-base font-medium text-base-content/70">Sessions</span>
              </div>

              <div className="flex flex-col items-center">
                <span className="text-4xl lg:text-5xl font-extrabold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                  99.9%
                </span>
                <span className="mt-2 text-base font-medium text-base-content/70">Uptime</span>
              </div>
            </div>
          </div>
          {/* Right */}
          <img
            src="/hero.png"
            alt=""
            className="w-full h-auto rounded-3xl shadow-2xl border-4 border-base-100 
           hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
