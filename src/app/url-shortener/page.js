'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function Home() {
    const [url, setUrl] = useState(null);
    const router = useRouter();
    const handleUrlChange = (event) => {
        setUrl(event.target.value);
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!url){
            return;
        }
        const fullUrl = "/url-shortener/api/shorturl?url=" + url;
        router.push(fullUrl);
    };
    return (
        <div>
            <form className="form" id="urlForm" onSubmit={handleSubmit} name="urlInput">
                <h1>URL SHORTENER!</h1>
                <label>Please input a URL</label>
                <input type="text" id="textInput" onChange={handleUrlChange} placeholder="https://yoururl.domain/anything OR shorturl#" required></input>
                <input type="submit" value="Submit" id="submitButton"></input>
            </form>
        </div>
    );
};