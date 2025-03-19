import { NextResponse } from "next/server";
function addCorsHeaders(response) {
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type");
  return response;
}
export async function GET(req) {
    // pulls the search parameters from the URL
    const { searchParams } = new URL(req.url);
    // pull the name, size, and type from the search params
    const fileName = searchParams.get("Name");
    const fileSize = searchParams.get("Size");
    const fileType = searchParams.get("Type");
    // checks if any details are missing for some reason
    if (!fileName || !fileSize || !fileType) {
      let response = NextResponse.json({ message: "Missing file details" }, { status: 400 });
      return addCorsHeaders(response);
    }
    // returns the name, type, and size in JSON format
    let response = NextResponse.json({
      fileName,
      fileType,
      fileSize,
    });
    return addCorsHeaders(response);
  }
  export async function OPTIONS() {
    return addCorsHeaders(new Response(null, { status: 204 }));
  }