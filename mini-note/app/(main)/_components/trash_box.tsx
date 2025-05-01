"use client";

import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery, useMutation } from "convex/react";
import { Search, Trash, Undo } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export const TrashBox = () => { 
    const router = useRouter();
    const params = useParams();
    const notes = useQuery(api.notes.getTrash);
    const restore = useMutation(api.notes.restore);
    const remove = useMutation(api.notes.remove);

    const [search, setSearch] = useState("");

    const filteredNotes = notes?.filter((note) => {
        return note.title.toLowerCase().includes(search.toLowerCase());
    });

    const onClick = (noteId: string) => {
        router.push(`/notes/${noteId}`)
    };

    const onRemove = ( 
        noteId: Id<"notes">

    ) => {
        const promise = remove({id: noteId});
        toast.promise(promise, {
            loading: "Deleting note...",
            success: "Note deleted",
            error: "Failed to delete note"
        });

        if (params.noteId === noteId) {
            router.push("/notes");
        }
    };

    const onRestore = ( 
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        noteId: Id<"notes">,

    ) => {
        event.stopPropagation();
        const promise = restore({id: noteId});
        toast.promise(promise, {
            loading: "Restoring...",
            success: "Note restored",
            error: "Failed to restore"
        });
    };

    if (notes === undefined){
        return (
            <div className="h-full flex items-center justify-center padding-4">
                Loading...
            </div>
        );
    }

    return(
        <div className="text-sm">
            <div className="flex items-center gap-x-1 p-2">
                <Search className="h-4 w-4"/>
                <Input 
                    className="h-7 px-2 focus-visible:ring-transparent bg-secondary"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by title"
                />
            </div>
            <div className="mt-2 px-1 pb-1">
                <p className="hidden last:block text-xs text-center text-muted-foreground pb-2">
                    No notes found
                </p>
                {filteredNotes?.map((note) => (
                    <div
                        className="text-sm rounded-sm w-full hover:bg-primary/5 flex items-center text-primary justify-between"
                        key={note._id}
                        role="button"
                        onClick={() => onClick(note._id)}
                    >
                        <span className="truncate pl-2">
                            {note.title}
                        </span>
                        <div className="flex items-center">
                            <div
                                className="rounded-sm p-2 hover:bg-secondary"
                                onClick={(e) => onRestore(e, note._id)}
                                role="button"
                            >
                                <Undo className="h-4 w-4 text-muted-foreground"/>
                            </div>
                            <ConfirmModal onConfirm={()=>onRemove(note._id)}>
                                <div
                                    className="rounded-sm p-2 hover:bg-secondary"
                                    role="button"
                                >
                                    <Trash className="h-4 w-4 text-muted-foreground"/>
                                </div>                                
                            </ConfirmModal>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};