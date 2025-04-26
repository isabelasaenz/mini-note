"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";

const NotesPage = () => {
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
            <Button>
                <PlusCircleIcon className="h-4 w-4"/>
                New
            </Button>
        </div>
     );
}
 
export default NotesPage;