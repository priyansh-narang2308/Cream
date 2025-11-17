"use client";

import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { PulsatingButton } from "@/components/ui/pulsating-button";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { Github } from "lucide-react";

export default function Home() {
  return (
    <div>
      <Header />

      <main className="flex-1 flex flex-col items-center px-4 py-10 sm:px-6 text-center gap-10">
        <div className="max-w-4xl space-y-6 relative">
          <div
            className="absolute inset-0 -z-10 bg-gradient-to-br
      from-blue-50 via-indigo-50 to-purple-50
      dark:from-blue-950/20 dark:via-indigo-950/20 dark:to-purple-950/20
      rounded-3xl blur-3xl scale-150 opacity-60"
          />

          <div className="pt-4 w-full max-w-3xl">
            <RainbowButton>
              Star on Github <Github />
            </RainbowButton>
          </div>
          <h1
            className="text-4xl sm:text-6xl font-bold tracking-tight
      bg-clip-text text-transparent bg-gradient-to-r
      from-blue-600 via-purple-600 to-indigo-600
      dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400"
          >
            Connect instantly.
            <br />
            <span
              className="bg-clip-text text-transparent bg-gradient-to-r
        from-purple-600 to-pink-600
        dark:from-purple-400 dark:to-pink-400"
            >
              Chat smarter.
            </span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A fast, private, beautifully simple platform for real-time
            conversations.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 mt-2">
          <SignedOut>
            <SignInButton>
              <Button
                size="lg"
                className="text-lg px-8 py-5 h-auto cursor-pointer"
              >
                Start Chatting For Free
              </Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <PulsatingButton
              className="text-lg px-8 py-5 h-auto cursor-pointer"
              onClick={() => (window.location.href = "/dashboard")}
            >
              Go to Dashboard
            </PulsatingButton>
          </SignedIn>
        </div>
      </main>
    </div>
  );
}
