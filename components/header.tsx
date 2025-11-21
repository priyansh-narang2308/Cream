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
    <header className="flex items-center justify-between h-16 px-4 sm:px-6">
      <Link href="/dashboard" className="flex items-center gap-2">
        <span className="font-semibold tracking-widest uppercase text-lg ml-0 sm:ml-20">
          Cream
        </span>
      </Link>

      <div className="flex items-center gap-2">
        <Authenticated>
          {!isDashboard && (
            <Link href="/dashboard">
              <Button variant={"default"} className="cursor-pointer">
                Dashboard
              </Button>
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
            <Button
              variant="outline"
              className="
    cursor-pointer
    sm:mr-20 mr-0
    border-2 border-indigo-500
    text-indigo-600 hover:text-white
    hover:bg-indigo-600
    font-semibold
    transition duration-150 ease-in-out
    shadow-md
  "
            >
              Sign In
            </Button>
          </SignInButton>
        </Unauthenticated>
      </div>
    </header>
  );
};

export default Header;
