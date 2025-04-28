"use client";

import {cn} from "@/lib/utils";
import {ChevronsLeft, MenuIcon, Plus, PlusCircle, Search, Settings, Trash} from "lucide-react";
import {usePathname} from "next/navigation";
import React, { useRef, useState, useEffect } from "react";
import {useMediaQuery} from "usehooks-ts";
import { UserItem } from "./user_item";
import { useMutation} from "convex/react";
import { api } from "@/convex/_generated/api";
import { Item } from "./item";
import { toast } from "sonner";
import { NoteList } from "./note_list";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { TrashBox } from "./trash_box";

export const Navigation = () => {
    const pathname = usePathname();
    const isMobile = useMediaQuery("(max-width: 768px)");
    const sidebarRef = useRef<HTMLElement | null>(null); // Use HTMLElement for "aside"
    const navbarRef = useRef<HTMLDivElement | null>(null); // Use HTMLDivElement for "div"
    const isResizingRef = useRef(false);
    const [isResetting, setIsResetting] = useState(false);
    const [isCollapsed, setCollapsed] = useState(isMobile);
    const [isExpanded, setIsExpanded] = useState(false);
    const create = useMutation(api.notes.create);

    useEffect(() => {
        setCollapsed(isMobile);
        
        if (sidebarRef.current && navbarRef.current) {
            if (isMobile) {
                sidebarRef.current.style.width = "0px";
                navbarRef.current.style.left = "0px";
                navbarRef.current.style.width = "100%";
            } else {
                sidebarRef.current.style.width = "240px";
                navbarRef.current.style.left = "240px";
                navbarRef.current.style.width = "calc(100% - 240px)";
            }
        }
    }, [isMobile]);
    
    const handleMouseDown = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        event.preventDefault();
        event.stopPropagation();
        isResizingRef.current = true;
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    };

    const handleMouseMove = (event: MouseEvent) => {
        if (!isResizingRef.current) return;
        let newWidth = event.clientX;
        if (newWidth < 200) newWidth = 200;
        if (newWidth > 480) newWidth = 480;

        if (sidebarRef.current && navbarRef.current){
            sidebarRef.current.style.width = `${newWidth}px`;
            navbarRef.current.style.setProperty("left", `${newWidth}px`);
            navbarRef.current.style.setProperty("width", `calc(100% - ${newWidth}px)`);
        }
    };

    const handleMouseUp = () => {
        isResizingRef.current = false;
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
    };

    const collapseSidebar = () => {
        setCollapsed(true);
        if (sidebarRef.current && navbarRef.current) {
            sidebarRef.current.style.width = "0px";
            navbarRef.current.style.left = "0px";
            navbarRef.current.style.width = "100%";
        }
    };    

    const expandSidebar = () => {
        setCollapsed(false);
        if (sidebarRef.current && navbarRef.current) {
            sidebarRef.current.style.width = "240px";
            navbarRef.current.style.left = "240px";
            navbarRef.current.style.width = "calc(100% - 240px)";
        }
    };
    
    const handleCreate = () => {
        const promise = create({title: "Untitled"});
        toast.promise(promise,{
            loading: "Creating...",
            success: "New note created",
            error: "Failed to create note"
        });
    };

    return ( 
        <>
            <aside ref={sidebarRef} 
                className={cn(
                    "group/sidebar h-full bg-neutral-800 text-neutral-200 overflow-y-auto relative flex w-60 flex-col z-[9999]",
                    isResetting && "transition-all ease-in-out duration-300",
                    isMobile && "w-0"
                )}>
                <div role="button" 
                    className={cn(
                        "h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-600 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition",
                        isMobile && "opacity-100"

                    )}
                    onClick={collapseSidebar}
                >
                    <ChevronsLeft className="h-6 w-6"/>
                </div>
                <div>
                    <UserItem/>
                    <Item  
                        label="Settings" 
                        icon={Settings}
                        onClick={()=>{}}
                    />
                    <Item
                        label="Search"
                        icon={Search}
                        isSearch
                        onClick={()=>{}}
                    />
                    <Item 
                        onClick={handleCreate} 
                        label="New note" 
                        icon={PlusCircle}
                    />
                </div>
                <div className="mt-4">
                    <NoteList/>
                    <Popover>
                        <PopoverTrigger className="w-full mt-4">
                            <Item icon={Trash} label="Trash"/>
                        </PopoverTrigger>
                        <PopoverContent
                            className="p-0 w-72"
                            side={isMobile ? "bottom" : "right"}
                        >
                            <TrashBox/>
                        </PopoverContent>
                    </Popover>
                </div>
                <div 
                    onMouseDown={handleMouseDown}
                    className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0"
                />
            </aside>
            <div ref={navbarRef}
                className={cn(
                    "absolute top-0 z-[9999] left-60 w-[calc(100%-240px)]",
                    isResetting && "transition-all ease-in-out duration-300",
                    isMobile && "left-0 w-full"
                )}
            >
                <nav className="bg-transparent px-3 py-3 w-full">
                    {isCollapsed && <MenuIcon onClick={expandSidebar} role="button" className="h-6 w-6 text-muted-foreground"/>}
                </nav>
            </div>
        </>
     );
}
 