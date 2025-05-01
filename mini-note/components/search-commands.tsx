"use client";

import { useUser } from "@clerk/clerk-react";
import { useQuery } from "convex/react";
import { File } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command";
import { api } from "@/convex/_generated/api";
import { useSearch } from "@/hooks/use-search";

export const SearchCommand = () => {
    const { user } = useUser();
    const router = useRouter();
    const notes = useQuery(api.notes.getSearch);
    const [isMounted, setIsMounted] = useState(false);

    const toggle = useSearch((store) => store.toggle);
    const isOpen = useSearch((store) => store.isOpen);
    const onClose = useSearch((store) => store.onClose);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const onSelect = (id: string) => {
        router.push(`/notes/${id}`);
        onClose();
    };

    if (!isMounted) return null;


    return (
    <CommandDialog open={isOpen} onOpenChange={onClose}>
        <CommandInput placeholder="Search notes" />
        <CommandList>
            <CommandEmpty>
                No notes found
                </CommandEmpty>
            <CommandGroup heading="Notes">
                {notes?.map((note) => (
                    <CommandItem
                        key={note._id}
                        value={note.title.toLowerCase()}
                        title={note.title}
                        onSelect={onSelect}
                    >
                        {note.icon ? (
                            <p className="mr-2 text-[18px]">
                                {note.icon}
                                </p>
                        ) : (
                            <File className="mr-2 h-4 w-4" />
                        )}

                        <span>
                            {note.title}
                        </span>
                    </CommandItem>
                ))}
            </CommandGroup>
        </CommandList>
    </CommandDialog>
    );
    };