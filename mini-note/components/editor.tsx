"use client";

import type { PartialBlock } from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";

type EditorProps = {
    onChange: (value: string) => void;
    initialContent?: string;
    editable?: boolean;
};

const Editor = ({ onChange, initialContent, editable = true }: EditorProps) => {
    const { resolvedTheme } = useTheme();
    
    const editor = useCreateBlockNote({
        initialContent: initialContent
            ? (JSON.parse(initialContent) as PartialBlock[])
            : undefined,
    });

    useEffect(() => {
        if (editor) {
            editor.isEditable = editable; // Set the isEditable flag directly
        }
    }, [editor, editable]);

    const [editorContent, setEditorContent] = useState<string>(initialContent || "");

    useEffect(() => {
        if (editor && editor.topLevelBlocks) {
            const content = JSON.stringify(editor.topLevelBlocks, null, 2);
            setEditorContent(content);
            onChange(content);
        }
    }, [editor, editable, onChange]);

    return (
        <div>
            <BlockNoteView
                editor={editor}
                theme={resolvedTheme === "dark" ? "dark" : "light"}
                editable={editable} 
            />
        </div>
    );
};

export default Editor;
