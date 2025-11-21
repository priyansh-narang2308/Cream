"use client";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { Authenticated, Unauthenticated } from "convex/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";

const Header = () => {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");

  return (
    <header className="bg-white backdrop-blur-xl supports-backdrop-filter:bg-white/70 border-b border-black/5">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 max-w-7xl mx-auto">
        <Link
          href="/dashboard"
          className="group relative flex items-center gap-2 transition-all duration-300"
        >
          <span className="text-2xl inline-block transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-125 group-hover:rotate-3">
            🍦
          </span>

          <span className="font-semibold text-lg inline-block transition-all duration-300 group-hover:tracking-wide group-hover:text-purple-500">
            Cream
          </span>

          <span
            className="
      absolute inset-0 rounded-xl opacity-0 blur-xl transition-all duration-300
      group-hover:opacity-40 group-hover:bg-purple-500/40
    "
          ></span>
        </Link>

        <div className="flex items-center gap-3">
          <Authenticated>
            {!isDashboard && (
              <Link href="/dashboard">
                <Button className="cursor-pointer">Dashboard</Button>
              </Link>
            )}
            <UserButton />
          </Authenticated>

          <Unauthenticated>
            <SignInButton
              mode="modal"
              forceRedirectUrl="/dashboard"
              signUpForceRedirectUrl="/dashboard"
            >
              <Button variant="outline" className="cursor-pointer">
                Sign In
              </Button>
            </SignInButton>
          </Unauthenticated>
        </div>
      </div>
    </header>
  );
};

export default Header;
