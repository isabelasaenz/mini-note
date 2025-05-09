"use client";       

import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import { useQuery, useMutation } from "convex/react";
import { Toolbar } from "@/components/toolbar";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { useMemo } from "react";

const NoteIdPage = () => {
    const { noteId } = useParams() as { noteId: string };

    const Editor = useMemo(
        () => dynamic(() => import("@/components/editor"), { ssr: false }),
        []
    );

    const note = useQuery(api.notes.getById, {
        noteId: noteId as any,
    });

    const update = useMutation(api.notes.update);

    const onChange = (content: string) => {
        update({
            id: noteId as any,
            content,
        });
    };

    if (note === undefined) {
        return (
            <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
                <div className="space-y-4 pl-8 pt-4">
                    <Skeleton className="h-14 w-[50%]" />
                    <Skeleton className="h-4 w-[80%]" />
                    <Skeleton className="h-4 w-[40%]" />
                    <Skeleton className="h-4 w-[60%]" />
                </div>
            </div>
        );
    }

    if (note === null) {
        return <div className="text-center text-gray-500 mt-10">Note not found</div>;
    }

    return (
        <div className="pb-40">
            <div className="md:max-w-3xl lg:max-w-4xl mx-auto" style={{ marginLeft: "30px" }}>
                <Toolbar initialData={note} />
                <div className="mt-6">
                    <Editor
                        editable={!note.isArchived}
                        onChange={onChange}
                        initialContent={note.content}
                    />
                </div>
            </div>
        </div>
    );
};

export default NoteIdPage;
