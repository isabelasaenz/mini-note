"use client";

import { useQuery } from "convex/react";
import { MenuIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Title } from "./title";
import { Banner } from "./banner";
import { Menu } from "./menu";

type NavbarProps = {
    isCollapsed: boolean;
    onResetWidth: () => void;
};

export const Navbar = ({ 
    isCollapsed, 
    onResetWidth 
}: NavbarProps) => {
    const params = useParams();
    const note = useQuery(api.notes.getById, {noteId: params.noteId as Id<"notes">}); 

    if(note === undefined) {
        return(
            <nav className="bg-background dark:bg-[#1F1F1F] px-3 py-2 w-full flex items-center justify-between">
                <Title.Skeleton />
                <div className="flex items-center gap-x-2">
                    <Menu.Skeleton />
                </div>
            </nav>
        )
    }

    if (note === null) {
        return null;
    }

    return(
        <>
            <nav className="bg-background dark:bg-[#1F1F1F] px-3 py-2 w-full flex items-center gap-x-4">
                {isCollapsed && (
                    <MenuIcon
                        className="h-6 w-6 text-muted-foreground"
                        role = "button"
                        onClick={onResetWidth}
                    />
                )}
                <div className="flex items-center justify-between w-full">
                    <Title initialData={note} />
                    <div className="flex items-center gap-x-2">
                        <Menu noteId={note._id} isArchived={note.isArchived} />
                    </div>
                </div>
            </nav>
            {note.isArchived && (
                <Banner 
                    noteId={note._id} 
                />
            )}
        </>
    )
}
