import Image from "next/image";
import {Rubik} from "next/font/google";
import {cn} from "@/lib/utils";

const font = Rubik({
    subsets: ["latin"],
    weight: ["400", "600"]
});

export const Logo = () => {
    return ( 
        <div className="hidden md:flex items-center gap-x-2">
            <Image src="/notepad_black.png" height="40" width="40" alt="Logo"/>
            <p className={cn("font-semibold", font.className)}>
                mini-note
            </p>
        </div>
     );
}
 
export default Logo;