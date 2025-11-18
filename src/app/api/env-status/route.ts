import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  try {
    // Check for DeepResearch API key (either DEEPRESEARCH_API_KEY or VALYU_API_KEY)
    const deepresearchKeyPresent = !!(
      process.env.DEEPRESEARCH_API_KEY || process.env.VALYU_API_KEY
    );

    // Check for Mapbox access token
    const mapboxKeyPresent = !!process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

    return NextResponse.json(
      {
        deepresearchKeyPresent,
        mapboxKeyPresent,
      },
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to read env status" },
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
