import { NextResponse } from 'next/server';

export async function GET(req) {
  // Extract headers
  const ip = req.headers.get('x-forwarded-for') || 'Unknown IP';
  const lang = req.headers.get('accept-language') || 'Unknown Language';
  const software = req.headers.get('user-agent') || 'Unknown User-Agent';

  // Return JSON response
  return NextResponse.json({
    ipaddress: ip,
    language: lang,
    software: software,
  });
}