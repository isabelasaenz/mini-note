"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger, DropdownMenuSeparator  } from "@/components/ui/dropdown-menu";
import { useMutation } from "convex/react";
import { ChevronDown, ChevronRight, LucideIcon, MoreHorizontal, Plus, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface ItemProps{
    id?: Id<"notes">;
    noteIcon?: string;
    active?: boolean;
    expanded?: boolean;
    isSearch?: boolean;
    level?: number;
    onExpand?: () => void;
    label: string;
    onClick?: () => void;
    icon: LucideIcon;
};

export const Item = ({
    label,
    onClick,
    icon: Icon,
    id,
    active,
    expanded,
    noteIcon,
    isSearch,
    level = 0,
    onExpand,
}: ItemProps) => {

    const router = useRouter();
    const create = useMutation(api.notes.create);
    const archive = useMutation(api.notes.archive);

    const onArchive = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent> 
    ) => {
        event.stopPropagation();
        if (!id) return;
        const promise = archive({id});
        toast.promise(promise, {
            loading: "Moving note to trash",
            success: "Note moved to trash",
            error: "Failed to move note to trash"
        });
    };

    const handleExpand = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        event.stopPropagation();
        onExpand?.();
    }

    const onCreate = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        event.stopPropagation();
        if (!id) return;
        const promise = create({title: "Untitled", parentNote: id})
            .then((noteId) => {
                if (!expanded){
                    onExpand?.();
                }
                //router.push(`/notes/${noteId}`);
            })
        toast.promise(promise,{
            loading: "Creating...",
            success: "New note created",
            error: "Failed to create note"
        });
    }

    const ChevronIcon = expanded ? ChevronDown : ChevronRight;


    return (
        <div
            onClick={onClick}
            role="button"
            style={{paddingLeft: level ? `${(level * 12) + 12}px` : "12px"}}
            className={cn(
                "group min-h-[27px] text-sm py-1 pr-3 w-full hover:bg-neutral-700 flex items-center text-neutral-300",
                active && " bg-neutral-700 text-neutral-200"
            )}
        >
            {!!id && (
                <div role="button" 
                    className="h-full rounded-sm hover:bg-neutral-600 mr-1"
                    onClick={handleExpand}
                >
                    <ChevronIcon className="h-4 w-4 shrink-0 text-muted-foreground/50"/>
                </div>
            )}
            {noteIcon ? (
                <div  className="shrink-0 mr-2 text-[18px]">
                {noteIcon}
                </div>
            ) : (<Icon className="shrink-0 h-[18px] mr-2 text-muted-foreground"/>)
            }   
            
            <span>
                {label}
            </span>
            {isSearch && (
                <kbd className="ml-auto pointer-events-none inline-flex h-5 select-note items-center gap-1 rounder border-0 bg-neutral-700 px-1.5 font-mono text-[10px] font-mediumm text-neutral-300 opacity-100">
                    <span className="text-xs">
                        ctrl + k
                    </span>
                </kbd>
            )}
            {!!id && (
                <div className="ml-auto flex items-center gap-x-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger 
                            onClick={(e) => e.stopPropagation()}
                            asChild
                        >
                            <div role="button" className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-600 text-neutral-200">
                                <MoreHorizontal className="h-4 w-4 text-muted-foreground"/>
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-60 z-[99999] bg-neutral-700 border-0" align="start" side="right" forceMount >
                            <DropdownMenuItem 
                                className="w-full cursor-pointer bg-neutral-700 text-neutral-300 hover:bg-neutral-600"
                                onClick={onArchive}
                            >
                                <Trash className="h-4 w-4 mr-2"/>
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <div 
                        role="button"
                        onClick={onCreate}
                        className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-600">
                        <Plus className="h-4 w-4 text-muted-foreground"/>
                    </div> 
                </div>
            )}
        </div>
    )
}

Item.Skeleton = function ItemSkeleton({level}: {level?: number}){
    return(
        <div 
            className="flex gap-x-2 py-[3px]"
            style={{
                paddingLeft: level ? `${(level * 12)+25}px` : "12px"
            }}
        >
            <Skeleton className="h-4 w-4"/>
            <Skeleton className="h-4 w-[30%]"/>
        </div>
    )
}