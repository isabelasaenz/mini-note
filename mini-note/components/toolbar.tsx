"use client";

import { useMutation } from "convex/react";
import { Smile, X } from "lucide-react";
import React, { ElementRef, useRef, useState } from "react";
import TextareaAutoSize from "react-textarea-autosize";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import type { Doc } from "@/convex/_generated/dataModel";

import { IconPicker } from "./icon-picker";

type ToolbarProps = {
    initialData: Doc<"notes">;
    preview?: boolean;
};

export const Toolbar = ({ initialData, preview }: ToolbarProps) => {
    const inputRef = useRef<ElementRef<"textarea">>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(initialData.title);

    const update = useMutation(api.notes.update);
    const removeIcon = useMutation(api.notes.removeIcon);

    const enableInput = () => {
        if (preview) return;

        setIsEditing(true);

        setTimeout(() => {
            setValue(initialData.title);
            inputRef.current?.focus();
        }, 0);
    };

    const disableInput = () => setIsEditing(false);

    const onInput = (value: string) => {
        setValue(value);
        update({
            id: initialData._id,
            title: value || "Untitled",
        });
    };

    const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            disableInput();
        }
    };

    const onIconSelect = (icon: string) => {
        update({
            id: initialData._id,
            icon,
        });
    };

    const onRemoveIcon = () => {
        removeIcon({
            id: initialData._id,
        });
    };

    return (
        <div className="pt-15 pl-5 group relative">
            {!preview && (
                <div className="flex items-center gap-x-2 pt-6">
                    {!!initialData.icon && (
                        <IconPicker onChange={onIconSelect}>
                            <p className="text-4xl hover:opacity-75 transition cursor-pointer">
                                {initialData.icon}
                            </p>
                        </IconPicker>
                    )}
    
                    {isEditing ? (
                        <TextareaAutoSize
                            ref={inputRef}
                            onBlur={disableInput}
                            onKeyDown={onKeyDown}
                            value={value}
                            onChange={(e) => onInput(e.target.value)}
                            className="text-4xl bg-transparent font-bold break-words outline-none text-[#3F3F3F] dark:text-[#CFCFCF] resize-none"
                        />
                    ) : (
                        <div
                            role="button"
                            onClick={enableInput}
                            className="text-4xl font-bold break-words outline-none text-[#3F3F3F] dark:text-[#CFCFCF]"
                        >
                            {initialData.title}
                        </div>
                    )}
    
                    {!!initialData.icon && (
                        <Button
                            onClick={onRemoveIcon}
                            className="rounded-full opacity-0 group-hover:opacity-100 transition text-muted-foreground text-xs"
                            variant="outline"
                            size="sm"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    )}
                </div>
            )}
    
            {preview && (
                <div className="flex items-center gap-x-2 pt-6">
                    {!!initialData.icon && (
                        <p className="text-4xl">{initialData.icon}</p>
                    )}
                    <p className="text-5xl font-bold break-words text-[#3F3F3F] dark:text-[#CFCFCF]">
                        {initialData.title}
                    </p>
                </div>
            )}
    
            {!initialData.icon && !preview && (
                <div className="pt-4">
                    <IconPicker onChange={onIconSelect} asChild>
                        <Button
                            className="text-muted-foreground text-xs"
                            variant="outline"
                            size="sm"
                        >
                            <Smile className="h-4 w-4 mr-2" />
                            Add icon
                        </Button>
                    </IconPicker>
                </div>
            )}
        </div>
    );       
};
