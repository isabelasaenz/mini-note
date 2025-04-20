import Image from "next/image";

export const LandingImage = () => {
    return ( 
        <div className="flex flex-col items-center justify-center max-w-5xl">
            <div className="flex items-center">
                <div className="relative w-[200px] h=[200px] sm:w-[250px] sm:h-[250px] md:w-[300px]  md:h-[300px]"> 
                    <Image src="/notepad_black.png" fill className="object-contain" alt="Bloco de notas" />
                </div>
            </div>
        </div>
     );
}
 
export default LandingImage;