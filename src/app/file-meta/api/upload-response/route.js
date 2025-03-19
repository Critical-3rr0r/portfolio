import { NextResponse } from "next/server";
export async function GET(req) {
    // pulls the search parameters from the URL
    const { searchParams } = new URL(req.url);
    // pull the name, size, and type from the search params
    const fileName = searchParams.get("Name");
    const fileSize = searchParams.get("Size");
    const fileType = searchParams.get("Type");
    // checks if any details are missing for some reason
    if (!fileName || !fileSize || !fileType) {
      return NextResponse.json({ message: "Missing file details" }, { status: 400 });
    }
    // returns the name, type, and size in JSON format
    return NextResponse.json({
      fileName,
      fileType,
      fileSize,
    });
  }