"use client";

import { useMutation, useQuery } from "convex/react";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import { Toolbar } from "@/components/toolbar";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";

type noteIdPageProps = {
    params: {
        noteId: Id<"notes">;
    };
};

const noteIdPage = ({
    params
}: noteIdPageProps) => {
    const note = useQuery(api.notes.getById, {
        noteId: params.noteId,
    });

    const update = useMutation(api.notes.update);

    const onChange = (content: string) => {
        update({
            id: params.noteId,
            content,
        });
    };

    if (note === undefined) {
        return (
        <div>
            Loading...
        </div>
        )
    }
    
    if (note === null) {
        return (
        <div>
            Note not found 
        </div>
        )
    }

    return(
        <div className="pb-40">
            <div className="md:max-w-3xl lg:max-w-4xl mx-auto" style={{ marginLeft: '40px' }}>
                <Toolbar initialData={note}/>
            </div>
        </div>
    )
};

export default noteIdPage;