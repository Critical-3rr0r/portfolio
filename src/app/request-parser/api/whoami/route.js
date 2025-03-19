import { NextResponse } from 'next/server';
function addCorsHeaders(response) {
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type");
  return response;
}
export async function GET(req) {
  // Extract headers
  const ip = req.headers.get('x-forwarded-for') || 'Unknown IP';
  const lang = req.headers.get('accept-language') || 'Unknown Language';
  const software = req.headers.get('user-agent') || 'Unknown User-Agent';

  // Return JSON response
  let response = NextResponse.json({
    ipaddress: ip,
    language: lang,
    software: software,
  });
  return addCorsHeaders(response);
}
 export async function OPTIONS() {
    return addCorsHeaders(new Response(null, { status: 204 }));
  }