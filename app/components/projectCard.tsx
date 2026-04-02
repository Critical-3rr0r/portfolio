"use client"
import { Quantico } from "next/font/google";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
interface ProjectCardProps {
    image: string,
    name: string,
    link: string,
    description: string,
    underConstruction: boolean
}
const quantico = Quantico({
weight: ["400", "700"],
style: ["normal", "italic"],
})
export default function ProjectCard({image, name, link, description, underConstruction}: ProjectCardProps) {
    const [showDesc, setShowDesc] = useState<boolean>(false)
    const router = useRouter()
    return(
    <div className={`min-w-75 w-125 flex flex-col items-center h-100 rounded-lg shadow-lg text-black bg-white ${quantico.className}`}>
        <h2 className="text-xl md:text-3xl text-center mt-3">{name}</h2>
        <div className="w-3/4 h-2/3 flex flex-col items-center justify-center justify-self-center transition-all duration-300 md:hover:scale-105 cursor-pointer" style={{touchAction: "manipulation"}} onClick={() => {setShowDesc(prev => !prev)}}>
            {showDesc ? <p className="text-center self-center">{description}</p> : <Image src={image} alt={`${name} image`} width={600} height={600} className="rounded-lg" /> }
            <p className="text-center text-black/50 italic">Click to show/hide description</p>
        </div>
        <button className={`text-center text-xl bg-sky-400 p-2 w-50 rounded-full transition-all duration-300 md:hover:bg-sky-500 md:hover:scale-110 md:hover:shadow-lg ${underConstruction ? "disabled cursor-not-allowed" : "cursor-pointer"}`} style={{touchAction: "manipulation"}} onClick={() => {router.push(link); alert("clicked")}}>{underConstruction ? "Under Construction" : "Visit"}</button>
    </div>
    )
}