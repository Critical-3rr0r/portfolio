'use client';
import Image from "next/image";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
function generateProjectLinks() { 
    const router = useRouter();
    const projects = [
        {
            name: "Exercise Tracker",
            img: "/images/exercise.png",
            src: "/exercise-tracker"
        },
        {
            name: "WhoAmI",
            img: "/images/who.png",
            src: "/request-parser"
        },
        {
            name: "URL shortener",
            img: "/images/url.png",
            src: "/url-shortener"
        },
        {
            name: "Timestamp",
            img: "/images/time.png",
            src: "/timestamp"
        },
        {
            name: "File Metadata",
            img: "/images/file.png",
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
                        <Link href={Obj.src} className="projectName ">
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
                        <li><a href="https://nextjs.org" target="_blank">Next.js</a></li>
                        <li><a href='https://react.dev' target="_blank">React</a></li>
                        <li><a href='https://developer.mozilla.org/en-US/docs/Web/HTML' target="_blank">HTML</a></li>
                        <li><a href='https://developer.mozilla.org/en-US/docs/Web/CSS' target="_blank">CSS</a></li>
                        <li><a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript' target="_blank">JavaScript</a></li>
                    </ul>
                </div>
                <div id="backList">
                    <h3>Backend Tech</h3>
                    <ul>
                        <li><a href='https://www.postgresql.org/docs/' target="_blank">PostgreSQL</a></li>
                        <li><a href='https://www.mongodb.com/docs/' target="_blank">MongoDB</a></li>
                        <li><a href='https://www.gnu.org/software/bash/manual/bash.html' target="_blank">Bash</a></li>
                        <li><a href='https://docs.npmjs.com' target="_blank">NPM</a></li>
                        <li><a href='https://nodejs.org/docs/latest/api/' target="_blank">Node.js</a></li>
                        <li><a href='https://expressjs.com' target="_blank">Express</a></li>
                        <li><a href='https://git-scm.com/doc' target="_blank">Git</a></li>
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
