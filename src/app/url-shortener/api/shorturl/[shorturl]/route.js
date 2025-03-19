import KVdb from "kvdb.io";
import { headers } from "next/headers";
const bucket = KVdb.bucket("Rv5j9EuUoeRf6Hxf7qtidW");
async function listKeys(bucketKey) {
  const url = `https://kvdb.io/${bucketKey}/?list`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const text = await response.text(); // Read response as plain text
    const keys = text.trim().split("\n"); // Split by newline to get an array
    console.log(keys, "keys");
    return keys;
  } catch (error) {
    console.error("Error listing keys:", error);
    return [];
  }
}
function addCorsHeaders(response) {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  // Clone existing headers to avoid immutability issues
  const newHeaders = new Headers(response.headers);
  
  // Append CORS headers
  for (const [key, value] of Object.entries(corsHeaders)) {
    newHeaders.set(key, value);
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: newHeaders, // Use the modified headers
  });
}
export async function OPTIONS() {
  return addCorsHeaders(new Response(null, { status: 204 }));
}
export async function GET(req, { params }) {
  const { shorturl } = await params;
  const numregex = /^\d*$/;
  //check if url contains number
  console.log(shorturl);
  if (!shorturl) {
    const response = Response.json({ error: "invalid URL" });
    return addCorsHeaders(response);
  }
  const url = shorturl.toString();
  if (url.match(numregex)) {
    //check if key exists
    const value = await fetch("https://kvdb.io/Rv5j9EuUoeRf6Hxf7qtidW/" + url)
      .then((response) => response.text())
      .then((data) => {
        return data;
      })
      .catch((error) => console.error(error));
    console.log(value, "key");
    if (value) {

      return new Response(null, {
        status: 308,
        headers: {
          "Location": `/url-shortener/redirect?to=${encodeURIComponent(value)}`,
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    } else {
      //else throw error
      console.log("error num");
      const response = Response.json({ error: "invalid URL" });
      return addCorsHeaders(response);
    }
  } else {
    console.log("other error");
    const response = Response.json({ error: "invalid URL" });
    return addCorsHeaders(response);
  }
}
