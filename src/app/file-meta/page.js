"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function Home() {
    const [file, setFile] = useState(null);
    const router = useRouter();
    // sets the file state on change in the form
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };
    // Submit handler
    const handleSubmit = async (event) => {
        event.preventDefault();
        // checks if the file state is empty
        if (!file) {
          return;
        }
        // creates a formData object and appends the contents of the file state
        const formData = new FormData();
        formData.append("file", file);
        // tries to post the form data and prints an error if failed
        try {
          const response = await fetch("/file-meta/api/upload", {
            method: "POST",
            body: formData,
          });
          // detects if the form data recieved a redirect response and pushes the router to the response url
          if(response.redirected){

            router.push(response.url);
          }
        }catch (error){
            console.error("error uploading", error);
        }
    }
    return (
        <div>
            <form className="form" onSubmit={handleSubmit} >
                <label>Please upload a file!</label>
                <input type="file" id="fileInput" name="upfile" onChange={handleFileChange} required></input>
                <input type="submit" value="Submit" id="submitButton"></input>
            </form>
        </div>
    );
};
