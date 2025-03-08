export default function Home() {
    return (
        <div>
            <div className="Header">
                <div id="Home">
                    <a>Home</a>
                </div>
                <div id="Title">
                    <h1>
                        Dalton Robinson
                    </h1>
                </div>
                <div id="nav-bar">
                    <a>About</a>
                    <span className="spacer"> | </span>
                    <a>Projects</a>
                </div>
            </div>
            <div id="about">
                <h2>About Me</h2>
            </div>
            <div id="projects">
                <h1>HI</h1>
                {generateProjectLinks()}
            </div>
        </div>
    );
};