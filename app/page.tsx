"use client";

import { CTASection } from "@/components/cta-section";
import { FeaturesSection } from "@/components/feature-section";
import { Footer } from "@/components/footer";
import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { PulsatingButton } from "@/components/ui/pulsating-button";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { Github } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 flex flex-col items-center px-4 py-16 sm:px-6 text-center gap-12">
        <div className="relative max-w-4xl w-full space-y-10">
          <div
            className="absolute inset-0 -z-10 bg-linear-to-br
  from-pink-200 via-fuchsia-200 to-purple-200
  dark:from-pink-900 dark:via-fuchsia-900/25 dark:to-purple-900/20
  rounded-3xl blur-3xl opacity-70 scale-125"
          />

          <div className="w-full flex justify-center">
            <RainbowButton className="px-6 py-3 text-base">
              Star on Github <Github className="ml-2 h-4 w-4" />
            </RainbowButton>
          </div>

          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-linear-to-r  from-blue-600 via-purple-600 to-indigo-600  dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400 leading-tight">
            Talk with Anyone. <br />
            <span className="bg-clip-text text-transparent bg-linear-to-r from-purple-600 to-pink-600  dark:from-purple-400 dark:to-pink-400">
              Anytime. Anywhere.{" "}
            </span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A clean, modern chat platform built for speed, privacy, and
            effortless conversations. No noise, no clutter - just pure
            communication.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <SignedOut>
            <SignInButton>
              <Button
                size="lg"
                className="text-lg px-10 py-5 h-auto shadow-lg hover:shadow-xl transition-all cursor-pointer"
              >
                Start Chatting For Free
              </Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <PulsatingButton
              className="text-lg px-10 py-5 h-auto cursor-pointer hover:bg-black/60"
              onClick={() => (window.location.href = "/dashboard")}
            >
              Go to Dashboard
            </PulsatingButton>
          </SignedIn>
        </div>

        <FeaturesSection />
        <CTASection />
        <Footer />
      </main>
    </div>
  );
}
