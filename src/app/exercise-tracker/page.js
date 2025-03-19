"use client";
import { useState } from "react";
function BuildLogs({ logs }){
return(
    <div className="log">
        {logs.map((Obj, index) =>{
            return(
                <div key={index}>
                    <p>Exercise #{index+1}</p>
                    <ul className="logElement">
                        <li>
                        Description: {Obj.description} 
                        </li>
                        <li>
                            Duration: {Obj.duration} (min)
                        </li>
                        <li>
                            Date: {Obj.date}
                        </li>
                    </ul>
                </div>
            );
        })}
    </div>
);
}
export default function Home() {
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState(null);
    const [logs, setLogs] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [logsButton, setLogsButton] = useState(false);
    const styles = {
        show: "show",
        hide: "hide",
        exerciseForm: "exerciseForm",
        logs: "logs"
    }
    const submitHandler = async (event) => {
        event.preventDefault();
        if (isSubmitting) return;
        setIsSubmitting(true);
        try{
            const formData = new FormData(event.target);
            const response = await fetch("/exercise-tracker/api/users", {
                method: "POST",
                body: formData
            });
            const data = await response.json();
            setUser(data._id);
            setUsername(data.username);
        }catch(error){
            console.error(error);
        }finally{
            setIsSubmitting(false);
        }
    };
    const postHandler = async (event) => {
        event.preventDefault();
        if (isSubmitting) return;
        setIsSubmitting(true);
        try{
            const formData = new FormData(event.target);
            const description = formData.get("description");
            const duration = Number(formData.get("duration"));
            const date = formData.get("date") ? formData.get("date") : new Date().toDateString();
            const response = await fetch(`/exercise-tracker/api/users/${user}/exercises`, {
                method: "POST",
                body: formData
            });
            const data = await response.json();
            if(logs){
                setLogs((prevLogs) => [{description: description, duration: duration, date: date}, ...prevLogs])
            }else{
                setLogs([{description: description, duration: duration, date: date}]);
            }
        }catch(error){
            console.error(error);
        }finally{
            setIsSubmitting(false);
        }
    };
    const logsButtonHandler = (event) => {
        setLogsButton((value) => !value);
    };
    const logGetter = async (event) => {
        event.preventDefault();
        if (isSubmitting) return;
        setIsSubmitting(true);
        const formData = new FormData(event.target);
        const url = new URL(`/exercise-tracker/api/users/${user}/logs`, window.location.origin);
        const from = formData.get("from");
        const to = formData.get("to");
        const limit = formData.get("limit");
        const params = new URLSearchParams();
        
        if(from){
            params.append("from", from);
        };
        if(to){
            params.append("to", to);
        };
        if(limit){
            params.append("limit", limit);
        };

        url.search = params.toString();
        const response = await fetch(url, {
            method: "GET",
        });

        if (!response.ok){
            throw new Error(`Error: ${response.statusText}`);
        };
        const data = await response.json();
        setLogs(data.log);
        console.log(logs, "logged data");
        setIsSubmitting(false);
    };
    return (
        <div>
            <h1 className="title">Exercise Tracker</h1>
            <div>
                <img className="images left" src="/images/exercise-left.png"/>
                <img className="images right" src="/images/exercise-right.png"/>
                <div className={`${styles.exerciseForm} ${!user ? styles.show : styles.hide}`}>
                    <h1>Please enter your username!</h1>
                    <form onSubmit={submitHandler}>
                        <input type="text" className="text" name="username" required></input>
                        <input type="submit" value="Submit" id="submitButton"></input>
                    </form>
                </div>
                <div className={`${styles.exerciseForm} ${!user ? styles.hide : styles.show}`}>
                    <h1>Add an exercise, {username}!</h1>
                    <form onSubmit={postHandler}>
                        <input type="text" className="text" placeholder="description" name="description" required></input>
                        <input type="text" className="text" placeholder="duration (mins.)" name="duration" required></input>
                        <input type="date" className="text" placeholder="date (yyyy-mm-dd)" name="date"></input>
                        <input type="submit" value="Submit" id="submitButton"></input>
                    </form>
                    <button id="logsButton" onClick={logsButtonHandler}>Show/Hide logs request form</button>
                    <div className={`${logsButton ? styles.show : styles.hide}`}>
                        <form onSubmit={logGetter}>
                            <label htmlFor="from-date">From:</label>
                            <input type="date" className="text" id="from-date" name="from" />

                            <label htmlFor="to-date">To:</label>
                            <input type="date" className="text" id="to-date" name="to" />

                            <label htmlFor="limit">Limit:</label>
                            <input type="number" className="text" id="limit" name="limit" />

                            <button type="submit" id="submitButton">Submit</button>
                        </form>
                    </div>
                </div>
                <div className={`${styles.logs} ${!logs ? styles.hide : styles.show}`}>
                    {logs?.length > 0 && <BuildLogs logs={logs}/>}
                </div>
            </div>
        </div>
    );
};