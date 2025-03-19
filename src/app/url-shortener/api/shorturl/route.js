import KVdb from 'kvdb.io';
const bucket = KVdb.bucket("6Saj8pp5Czmc96WwDLGX9L");
async function listKeys(bucketKey) {
    const url = `https://kvdb.io/${bucketKey}/?list`;
  
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
  
      const text = await response.text(); // Read response as plain text
      const keys = text.trim().split("\n"); // Split by newline to get an array
  
      return keys;
    } catch (error) {
      console.error("Error listing keys:", error);
      return [];
    }
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
        const value = await fetch("https://kvdb.io/6Saj8pp5Czmc96WwDLGX9L/" + url)
        .then(response => response.text())
        .then(data => {
            return data;  
        }).catch(error => console.error(error));
        console.log(value, "key");
        if (value){
            //if it exists navigate to the page requested
            return Response.redirect(value);
        }else{
            //else throw error
            console.log("error num");
            return Response.json({"Error": "Invalid URL"});
        }
    }
    //else check if url contains valid URL
    else if (url.match(urlregex)){
        //Declare variables to use
        let check = null;
        let lastKey = -1;
        let numbers = [];
        //fetch the bucket to see if any values match
        const response = await fetch("https://kvdb.io/6Saj8pp5Czmc96WwDLGX9L")
        .then(response => response.text())
        .then(data => {
            check = Object.entries(data).filter(([key, value]) => value === url);  
        }).catch(error => console.error(error));
       // get the list of keys from the bucket and return all number values
        numbers = await listKeys("6Saj8pp5Czmc96WwDLGX9L").then(data => {
            const parsedData = data.map(item => Number(item)).filter(Number.isFinite);
            return parsedData;
        });
        // determine the highest value key
        lastKey = Math.max(...numbers) ? Math.max(...numbers) : 0;
        
        if (!check || check.length === 0 ){
            //else add key value pair and return the key
            await fetch("https://kvdb.io/6Saj8pp5Czmc96WwDLGX9L/" + (lastKey + 1), {
                method: "PUT",
                headers: { "Content-Type": "text/plain" },
                body: url
            });
            return Response.json({"original_url": url, "short_url" : lastKey+1});
        }else{
        //return key value pair in JSON format
        return Response.json({"url": url, "shorturl" : check[0]?.[0]});
        }
    }else{
        console.log("other error");
        return Response.json({"Error": "Invalid URL"});
    }
}