export async function GET(req, { params }) {
    
    // Take the browser params and make a variable called TSMicro with them
    const { TSMicro } = await params;
    
    // take the string representation of TSMicro for regex purposes
    const input = TSMicro.toString();
    
    // determine if a GET request is being made
    if (req.method === "GET") { 
        if (!TSMicro) {
            return Response.json({ error: "Please input a time" });

            
        } 
        // determine if the input string matches either yyyy-mm-dd or unix(ms) format
        else if ( input.match(/(^[0-9]{4}-[0-9][0-9]-[0-9][0-9]$)|(^[0-9]{13})/)) {

            // set the date value by determining if the value passed was UNIX or yyyy-mm-dd format
            const date = isNaN(Number(TSMicro)) ? new Date(TSMicro) : new Date(Number(TSMicro));

            // set the unix date depending on input type
            const dateUnix = isNaN(Number(TSMicro)) ? new Date(TSMicro).getTime() : TSMicro;

            // return the proper information
            return Response.json({ unix: dateUnix, utc: date.toUTCString() });
            
        } 
        //determine if the input is equal to a predetermined empty string and return current time
        else if (input === "empty") { 
            const date = new Date();
            const dateUnix = date.getTime();
            return Response.json({ unix: dateUnix, utc: date.toUTCString() });
        }
        else { 
            return Response.json({ error: "Invalid Date" });
        }
    };
};