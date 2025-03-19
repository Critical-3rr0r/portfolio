import KVdb from 'kvdb.io';
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
        headers: new Headers({ ...Object.fromEntries(response.headers), ...corsHeaders }),
    });
}
export async function GET(req){
    const { searchParams } = new URL(req.url);
    const url = searchParams.get("url");
    console.log(url);
    
    const urlregex = /^https:\/\/[\w-]+\.[\w-]+\.[\w-]+(?:\/[\w-]+)*$/;
    const numregex = /^\d*$/;
    //check if url contains number
    console.log(url.match(urlregex), "url reg");
    console.log(url.match(numregex), "nym reg");
    if(url.match(numregex)){
        //check if key exists
        const value = await fetch("https://kvdb.io/Rv5j9EuUoeRf6Hxf7qtidW/" + url)
        .then(response => response.text())
        .then(data => {
            return data;  
        }).catch(error => console.error(error));
        console.log(value, "key");
        if (value){
            //if it exists navigate to the page requested
            const response = Response.redirect(value);
            return addCorsHeaders(response);
        }else{
            //else throw error
            console.log("error num");
            const response = Response.json({"Error": "Invalid URL"});
            return addCorsHeaders(response);
        }
    }else{
        console.log("other error");
        const response = Response.json({"Error": "Invalid URL"});
        return addCorsHeaders(response);
    }
}
export async function POST(req){
    const { searchParams } = new URL(req.url);
    const url = searchParams.get("url");
    const body = await req.json();
    console.log(body, "request body");
    console.log(url);
    
    const urlregex = /^https:\/\/[\w-]+\.[\w-]+\.[\w-]+(?:\/[\w-]+)*$/;
    //else check if url contains valid URL
    if (url.match(urlregex)){
        //Declare variables to use
        let check = null;
        let lastKey = -1;
        let numbers = [];
        //fetch the bucket to see if any values match
        const response = await fetch("https://kvdb.io/Rv5j9EuUoeRf6Hxf7qtidW/?values=true&format=json")
        .then(response => response.json())
        .then(data => {
            console.log(data, "data");
            check = data.find(subArray => subArray.includes(url));  
        }).catch(error => console.error(error));
       // get the list of keys from the bucket and return all number values
        numbers = await listKeys("Rv5j9EuUoeRf6Hxf7qtidW").then(data => {
            const parsedData = data.map(item => Number(item)).filter(Number.isFinite);
            return parsedData;
        });
        // determine the highest value key
        lastKey = Math.max(...numbers) ? Math.max(...numbers) : 0;
        console.log(check, "check");
        if (!check || check.length === 0 ){
            //else add key value pair and return the key
            await fetch("https://kvdb.io/Rv5j9EuUoeRf6Hxf7qtidW/" + (lastKey + 1), {
                method: "PUT",
                headers: { "Content-Type": "text/plain" },
                body: url
            });
            const response = Response.json({"original_url": url, "short_url" : lastKey+1});
            return addCorsHeaders(response);
        }else{
        //return key value pair in JSON format
        const response = Response.json({"url": url, "short_url" : check[0]?.[0]});
        return addCorsHeaders(response);
        }
    }
}
 export async function OPTIONS() {
    return addCorsHeaders(new Response(null, { status: 204 }));
  }