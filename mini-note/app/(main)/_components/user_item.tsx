"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { ChevronsLeftRight } from "lucide-react";
import { SignOutButton, useUser } from "@clerk/clerk-react";

export const UserItem = () => {
    const {user} = useUser();
    return ( 
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div role="button" className="flex items-center text-sm p-3 w-full hover:bg-primary/5">
                    <div className="gap-x-2 flex items-center max-w-[150px">
                        <Avatar className="h-5 w-5">
                            <AvatarImage src={user?.imageUrl}/>
                        </Avatar>
                        <span className="text-start font-medium line-clamp-1">
                            Hi, {user?.firstName}!
                        </span>
                    </div>
                    <ChevronsLeftRight className="rotate-90 ml-2 text-muted-foreground h-4 w-4"/>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-10  z-[10000]" align="start" alignOffset={11} forceMount>
                <DropdownMenuItem className="w-full cursor-pointer text-muted-foreground" asChild>
                    <SignOutButton>
                        Log Out
                    </SignOutButton>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
     );
}
 
