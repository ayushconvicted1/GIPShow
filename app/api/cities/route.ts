// app/api/cities/route.ts
import { NextResponse } from "next/server";

// Define the expected structure for a GeoNames search result item
interface GeoNamesResult {
  geonameId: number;
  name: string;
  countryName: string;
  population: number;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const prefix = searchParams.get("prefix");

  if (!prefix) {
    return NextResponse.json(
      { message: "Prefix is required" },
      { status: 400 }
    );
  }

  // Use your new environment variable
  const username = process.env.GEONAMES_USERNAME;

  if (!username) {
    console.error("GeoNames username is not configured in .env.local");
    return NextResponse.json(
      { message: "Server configuration error" },
      { status: 500 }
    );
  }

  // ✨ Construct the new URL for the GeoNames API
  const url = `http://api.geonames.org/searchJSON?name_startsWith=${prefix}&maxRows=10&orderby=population&featureClass=P&username=${username}`;

  /*
   * URL Parameter Breakdown:
   * - searchJSON:       Specifies the API endpoint for JSON search results.
   * - name_startsWith:  The autocomplete parameter for the city name.
   * - maxRows:          Limits the number of returned results.
   * - orderby:          Sorts results by population, descending.
   * - featureClass=P:   Filters for populated places (cities, towns, etc.).
   * - username:         Your required GeoNames username for authentication.
   */

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `GeoNames API call failed with status: ${response.status}`
      );
    }

    const data = await response.json();

    // Check for errors returned by the GeoNames API itself
    if (data.status) {
      throw new Error(`GeoNames API error: ${data.status.message}`);
    }

    // ✨ Transform the GeoNames data to match your frontend's expected structure
    const formattedData = data.geonames.map((city: GeoNamesResult) => ({
      id: city.geonameId,
      city: city.name,
      country: city.countryName,
    }));

    return NextResponse.json(formattedData);
  } catch (error: any) {
    console.error("Failed to fetch city data from GeoNames:", error.message);
    return NextResponse.json(
      { message: "Failed to fetch city data" },
      { status: 500 }
    );
  }
}
