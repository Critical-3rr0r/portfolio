import { NextResponse } from "next/server";
export async function POST(req, res){
    try{
        // grabs the form data posted and gets the "file" from it
        const formData = await req.formData();
        const file = formData.get("file");
        const url = new URL("/file-meta/api/upload-response", req.url);
        // adds serach parameters to the URL generated in order to process a get response later
        url.searchParams.set("Name", file.name);
        url.searchParams.set("Size", file.size);
        url.searchParams.set("Type", file.type);
        // returns a redirect response to the full URL
        return NextResponse.redirect(url.toString(), 303);
    }catch(error){
        // prints an error message if upload failed
        console.error("Upload Error:", error);
        return NextResponse.json({ message: "upload failed"}, { status: 500 });
    }
}