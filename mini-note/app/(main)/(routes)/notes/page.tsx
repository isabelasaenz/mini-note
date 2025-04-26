"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import {api} from "@/convex/_generated/api";
import { toast } from "sonner";

const NotesPage = () => {
    const {user} = useUser();
    const create = useMutation(api.notes.create);

    const onCreate = () => {
        const promise = create({title: "Untitled"});
        toast.promise(promise,{
            loading: "Creating...",
            success: "New note created",
            error: "Failed to create note"
        });
    }

    return ( 
        <div className="h-full flex flex-col items-center justify-center space-y-4">
            <Image 
                src="/blank_page_white.png" height="200" width="200" alt="Empty note"
                className="object-contain hidden dark:block"
            />
            <Image 
                src="/blank_page_black.png" height="200" width="200" alt="Empty note"
                className="object-contain dark:hidden" 
            />
            <Button onClick={onCreate}>
                <PlusCircleIcon className="h-4 w-4"/>
                New note
            </Button>
        </div>
     );
}
 
export default NotesPage;