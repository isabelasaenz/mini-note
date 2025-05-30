"use client";

import { useConvexAuth } from "convex/react";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useScrollTop } from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { ModeToggle } from "@/components/mode-toggle";

export const Navbar = () => {
    const { isAuthenticated, isLoading } = useConvexAuth();
    const scrolled = useScrollTop();

    return (
        <div
            className={cn(
                "z-50 fixed top-0 flex items-center w-full p-5 border-b bg-[#1f1f1f]"
            )}
        >
            <Logo />
            <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2 pr-5">
                {isLoading && <p>Loading...</p>}

                {!isAuthenticated && !isLoading && (
                    <SignInButton mode="modal">
                        <Button
                            size="sm"
                            className="border border-white text-white"
                        >
                            Log in
                        </Button>
                    </SignInButton>
                )}

                {isAuthenticated && !isLoading && (
                    <>
                        <Button
                            size="sm"
                            asChild
                            className="border border-white text-white"
                        >
                            <Link href="/notes">
                                Enter mini-note
                                <ArrowRight className="h-4 w-4 ml-2" />
                            </Link>
                        </Button>
                        <UserButton afterSignOutUrl="/" />
                    </>
                )}
            </div>
        </div>
    );
};

export default Navbar;
