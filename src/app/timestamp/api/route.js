export async function GET(req) {
    // Get the current date and time
    const now = new Date();
  
    // Format the response as a JSON object
    const responseBody = {
      unix: now.getTime(), // Unix timestamp in milliseconds
      utc: now.toUTCString(), // UTC string format
    };
  
    return new Response(JSON.stringify(responseBody), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }