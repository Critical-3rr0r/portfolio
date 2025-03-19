import KVdb from "kvdb.io";
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

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: new Headers({
      ...Object.fromEntries(response.headers),
      ...corsHeaders,
    }),
  });
}
export async function GET(req, { params }) {
  const { url } = params;
  console.log(url);
  const numregex = /^\d*$/;
  //check if url contains number
  console.log(url.match(numregex), "nym reg");
  if (!url) {
    const response = Response.json({ Error: "Invalid URL" });
    return addCorsHeaders(response);
  }
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
      //if it exists navigate to the page requested
      const response = Response.redirect(value);
      return addCorsHeaders(response);
    } else {
      //else throw error
      console.log("error num");
      const response = Response.json({ Error: "Invalid URL" });
      return addCorsHeaders(response);
    }
  } else {
    console.log("other error");
    const response = Response.json({ Error: "Invalid URL" });
    return addCorsHeaders(response);
  }
}
export async function OPTIONS() {
  return addCorsHeaders(new Response(null, { status: 204 }));
}
