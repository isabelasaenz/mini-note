"use client";

import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { MoreHorizontal, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";

type MenuProps = {
    noteId: Id<"notes">;
    isArchived: boolean;
};

export const Menu = ({ noteId, isArchived }: MenuProps) => {
    const router = useRouter();
    const { user } = useUser();
    const archive = useMutation(api.notes.archive);
    const remove = useMutation(api.notes.remove);

    const onArchive = () => {
        const promise = archive({ id: noteId });

        toast.promise(promise, {
            loading: "Moving to trash...",
            success: "Note moved to trash",
            error: "Failed to archive note",
        });

        router.push("/notes");
    };

    const onRemove = () => {
        const promise = remove({ id: noteId });

        toast.promise(promise, {
            loading: "Deleting note...",
            success: "Note deleted",
            error: "Failed to delete note"
        });

        router.push("/notes");
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size="sm" variant="ghost">
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                className="w-60"
                align="end"
                alignOffset={8}
                forceMount
            >
                <DropdownMenuItem onClick={isArchived ? onRemove : onArchive}>
                    <Trash className="h-4 w-4 mr-2" />
                    {isArchived ? "Delete permanently" : "Move to trash"}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

Menu.Skeleton = function MenuSkeleton() {
    return <Skeleton className="h-10 w-10" />;
};
