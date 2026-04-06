"use client"
import { motion } from "framer-motion";
import { Quantico } from "next/font/google";
  const quantico = Quantico({
    weight: ["400", "700"],
    style: ["normal", "italic"],
  })
export default function Overview(){
    const frontEndStack = ["Next.js", "React", "Tailwind", "Typescript"]
    const backEndStack = ["Node.js", "MongoDB", "Firebase", "Cloudinary", "Postgres"]
    return(
        <div className="h-full w-full flex flex-col md:flex-row items-center justify-center md:gap-100 text-white">
          <div className="self-center">
            <motion.h1 animate={{opacity: [0, 100], scale: [0, 1.2]}} transition={{duration: 1.5, ease: "easeInOut"}} className={`text-4xl md:text-5xl self-center ${quantico.className} underline decoration-sky-300`}>Dalton Robinson</motion.h1>
            <motion.h2 animate={{opacity:[0, 100]}} transition={{duration: 1.5, delay: 1.5}} className={`text-center mt-5 text-xl md:text-2xl ${quantico.className}`}>Full Stack Web Developer</motion.h2>
          </div>
          
          <motion.div animate={{y: [-1000, 50, 0]}} transition={{duration: 1.5, delay: 1.5}} className={`flex flex-col self-center gap-5 pt-10 items-center text-xl md:text-2xl ${quantico.className}`}>
            <h2 className="text-3xl md:text-4xl">Tech Stack</h2>
            <h3 className="border-b-2 text-2xl md:text-3xl font-bold">Frontend</h3>
            <ol className="flex flex-col items-center text-lg md:text-xl gap-2">
              {frontEndStack.map((item, index) => {
                return(<li key={index}>{item}</li>)
              })}
            </ol>
            <h3 className="border-b-2 text-2xl md:text-3xl font-bold">Backend</h3>
            <ol className="flex flex-col items-center text-xl gap-2">
              {backEndStack.map((item, index) => {
                return(<li key={index}>{item}</li>)
              })}
            </ol>
          </motion.div>
        </div>
    )
}