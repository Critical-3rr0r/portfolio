import Image from "next/image";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Quantico } from "next/font/google";
import ProjectCard from "./components/projectCard";
import Overview from "./components/overview";
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

  return(
    <div className="bg-[url(/images/stars.jpg)] bg-cover w-full min-h-screen h-full flex flex-col items-center text-black">  
        <div className="bg-linear-to-b from-slate-950/50 via-sky-900/75 to-sky-600/90 justify-center w-full md:w-full  max-h-screen h-screen overflow-hidden">
          <Overview />
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
