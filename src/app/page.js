'use client';
import Image from "next/image";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
function generateProjectLinks() { 
    const router = useRouter();
    const projects = [
        {
            name: "Timestamp",
            img: null,
            src: "/timestamp"
        },
        {
            name: "Request Header Parser",
            img: null,
            src: "/request-parser"
        },
        {
            name: "URL shortener",
            img: null,
            src: "/url-shortener"
        },
        {
            name: "Exercise Tracker",
            img: null,
            src: "/exercise-tracker"
        },
        {
            name: "File Metadata",
            img: null,
            src: "/file-meta"
        }
    ];
    return (
        <div>
            <h1 className="projectTitle" >My Projects</h1>
            <div className="projectContainer">
            {projects.map((Obj, index) => {
                return (
                    <div className="projectDiv" key={ index }>
                        <img src={Obj.img} className="projectImage"></img>
                        <Link href={Obj.src} className="projectName shadow-lg bg-bermuda-950 hover:bg-bermuda-300">
                            { Obj.name }
                        </Link>
                    </div>
                );
            })}
            </div>
        </div>
    );
};



export default function Home() {
    return (
    <div>
        <div className="Header">
            <div id="Home">
            </div>
            <div id="Title">
                <h1>
                    Dalton Robinson
                </h1>
            </div>
            <div id="nav-bar">
                <a href="#about">About</a>
                <span className="spacer"> | </span>
                <a href="#projects">Projects</a>
        </div>
        </div>   
         <div id="about">
            <h2>About Me</h2>
            <p>Hello! My name is Dalton Robinson, I am an aspiring full-stack web developer currently working hard to learn all I can. Below you can find a list of different technologies I have experience using! A little further down are a couple of projects I have made using some of these technologies! To see more of what I have created please visit my <a href="https://github.com/Critical-3rr0r?tab=repositories" target="_blank">Github!</a></p>
            <div className="listHolder">
                <div id="frontList">
                    <h3>Frontend Tech</h3>
                    <ul>
                        <li>Next.js</li>
                        <li>React</li>
                        <li>HTML</li>
                        <li>CSS</li>
                    </ul>
                </div>
                <div id="backList">
                    <h3>Backend Tech</h3>
                    <ul>
                        <li>PostgreSQL</li>
                        <li>MongoDB</li>
                        <li>Bash</li>
                        <li>NPM</li>
                        <li>Node.js</li>
                        <li>Express</li>
                        <li>Git</li>
                    </ul>
                </div>
            </div>
         </div>
         <div id="fade"></div>
         <div id="projects">
                { generateProjectLinks() }
         </div>
    </div>
  );
};
