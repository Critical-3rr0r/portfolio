'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { Suspense } from "react";
export default function SearchParamsComponent() {
    const searchParams = useSearchParams();
    const vParam = searchParams.get("v"); // Get the "v" parameter from the URL
    useEffect(() => {
        if (vParam) {
          window.location.href = `/url-shortener/api/shorturl/${vParam}`
        }
      }, [vParam]);
    return <></>
}
export default function Home() {
    const [url, setUrl] = useState(null);
    const [short, setShort] = useState("Submit a url to get the shortURL here");
    const router = useRouter();
    
    
    const handleUrlChange = (event) => {
        setUrl(event.target.value);
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!url){
            return;
        }
        if(isNaN(Number(url))){
            const response = await fetch("/url-shortener/api/shorturl?url=" + url, {
                method: "POST"
            });
            const data = await response.json();
            console.log(data);
            setShort(data.short_url);
        }else{
            const fullUrl = "/url-shortener/api/shorturl/" + url;
            router.push(fullUrl);
        }
    };
    return (
        <div>
            <form className="form" id="urlForm" onSubmit={handleSubmit} name="urlInput">
                <h1>URL SHORTENER!</h1>
                <label>Please input a URL</label>
                <input type="text" id="textInput" onChange={handleUrlChange} placeholder="https://yoururl.domain/anything OR shorturl#" required></input>
                <input type="submit" value="Submit" id="submitButton"></input>
            </form>
            <p className="urlDesc">{short}</p>
            <Suspense>
            <SearchParamsComponent />
            </Suspense>
        </div>
    );
};