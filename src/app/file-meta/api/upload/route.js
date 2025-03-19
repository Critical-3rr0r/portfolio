import { NextResponse } from "next/server";
function addCorsHeaders(response) {
    response.headers.set("Access-Control-Allow-Origin", "*"); // Allow all origins
    response.headers.set("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type");
    return response;
  }
  export async function OPTIONS() {
    let response = new NextResponse(null, { status: 204 });
    return addCorsHeaders(response);
  }
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
        let response = NextResponse.redirect(url.toString(), 303);
        return addCorsHeaders(response);
    }catch(error){
        // prints an error message if upload failed
        console.error("Upload Error:", error);
        let response = NextResponse.json({ message: "upload failed" }, { status: 500 });
        return addCorsHeaders(response);
    }
}