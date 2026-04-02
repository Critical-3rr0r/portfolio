"use client"
import Image from "next/image";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Quantico } from "next/font/google";
import { motion } from "framer-motion";
import ProjectCard from "./components/projectCard";
  const quantico = Quantico({
    weight: ["400", "700"],
    style: ["normal", "italic"],
  })
interface ProjectCardProps {
    image: string,
    name: string,
    link: string,
    description: string,
    underConstruction: boolean
}
export default function Home() {
  const projects: ProjectCardProps[] = [
    {
      image: "/images/Matchmaker.png",
      name: "Matchmaker",
      link: "https://globomatchmaker.vercel.app",
      description: "A matchmaking website built for a discord community for the videogame Marvel Rivals",
      underConstruction: false
    },
    {
      image: "/images/TGH.png",
      name: "Two Generations Handmade",
      link: "",
      description: "An ecommerce platform built for my family with both client facing and admin utilities. JWT protected routes and API with shopify powered checkout",
      underConstruction: true
    }
  ]
  const frontEndStack = ["Next.js", "React", "Tailwind", "Typescript"]
  const backEndStack = ["Node.js", "MongoDB", "Firebase", "Cloudinary", "Postgres"]
  return(
    <div className="bg-[url(/images/stars.jpg)] bg-cover w-full min-h-screen h-full flex flex-col items-center">  
        <div className="bg-linear-to-b from-slate-950/50 via-sky-900/75 to-sky-600/90 justify-center w-full md:w-full flex flex-col md:flex-row md:gap-100 max-h-screen h-screen overflow-hidden">
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
      <div className={`bg-linear-to-b/shorter from-sky-600/90 via-sky-400 to-sky-300 h-full w-full flex flex-col ${quantico.className}`}>
        <h2 className="text-5xl text-center">My Projects</h2>
        <div className="h-150 w-full md:w-3/4 flex flex-row items-center self-center px-10 gap-5 overflow-x-scroll">
              {projects.map((item, index) => {
                return(<ProjectCard key={index} {...item}/>)
              })}
        </div>
        <footer className="text-black text-xl flex flex-col items-center justify-center gap-5 mb-5 self-center mt-5">
          <p className="text-3xl">Socials</p>
          <ol className="flex flex-row gap-15 w-full items-center justify-center">
              <li className="transition-all duration-300 hover:text-sky-900 hover:scale-110"><a href="https://github.com/Critical-3rr0r"><FontAwesomeIcon icon={faGithub} /> Github</a></li>
              <li className="transition-all duration-300 hover:text-sky-900 hover:scale-110"><a href="https://www.linkedin.com/in/dalton-robinson-15a280321/"><FontAwesomeIcon icon={faLinkedin}/> LinkedIn</a></li>
          </ol>
        </footer>
      </div>
    </div>
  )
}
