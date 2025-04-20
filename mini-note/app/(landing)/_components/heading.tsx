"use client";

import {useConvexAuth} from "convex/react"
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {SignInButton, UserButton} from "@clerk/clerk-react";
import Link from "next/link";

export const Heading = () => {
  const{isAuthenticated, isLoading} = useConvexAuth();
  return (
    <div className="max-w-5xl space-y-4">
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-medium pb-5 underline">
        mini-note
      </h1>
      <h2 className="text-2xl sm:text-4xl md:text-5xl pb-5">
        Your notes, and nothing else.
      </h2>
      {isLoading && (
        <p>Loading...</p>
      )}
      {isAuthenticated && !isLoading && (
        <Button asChild>
          <Link href="/notes">
              Enter mini-note
              <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      )}
      {!isAuthenticated && !isLoading && (
        <SignInButton mode="modal">
            <Button size="sm">
                Join mini-note
            </Button>
        </SignInButton>
      )}
    </div>
  );
};
