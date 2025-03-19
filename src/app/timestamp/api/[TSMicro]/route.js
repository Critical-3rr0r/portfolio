import { NextResponse } from "next/server";
function addCorsHeaders(response) {
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type");
    return response;
  }
export async function GET(req, { params }) {
  // Take the browser params and make a variable called TSMicro with them
  const { TSMicro } = params;

  // Take the string representation of TSMicro for regex purposes
  const input = TSMicro?.toString();

  // Determine if a GET request is being made
  if (!TSMicro) {
    const response = NextResponse.json({ error: "Please input a time" }, { status: 400 });
    return addCorsHeaders(response);
    }

  // Determine if the input string matches either yyyy-mm-dd or unix(ms) format
  if (input.match(/(^[0-9]{4}-[0-9][0-9]-[0-9][0-9]$)|(^[0-9]{13})/)) {
    // Set the date value by determining if the value passed was UNIX or yyyy-mm-dd format
    const date = isNaN(Number(TSMicro)) ? new Date(TSMicro) : new Date(Number(TSMicro));

    // Validate date instance
    if (isNaN(date.getTime())) {
      const response = NextResponse.json({ error: "Invalid Date" }, { status: 400 });
      return addCorsHeaders(response);
    }

    // Set the unix date depending on input type
    const dateUnix = date.getTime();

    // Return the proper information
    const response = NextResponse.json({ unix: dateUnix, utc: date.toUTCString() });
    return addCorsHeaders(response);
    }

  // Determine if the input is equal to a predetermined empty string and return current time
  if (input === "empty") {
    const date = new Date();
    const response = NextResponse.json({ unix: date.getTime(), utc: date.toUTCString() });
    return addCorsHeaders(response);
    }

  // Return an error for invalid input
  const response = NextResponse.json({ error: "Invalid Date" }, { status: 400 });
  return addCorsHeaders(response);
}
 export async function OPTIONS() {
    return addCorsHeaders(new Response(null, { status: 204 }));
  }