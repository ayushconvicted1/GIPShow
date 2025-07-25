import { connectToDatabase } from "../../../lib/mongodb";

export async function POST(req) {
  try {
    // Step 1: Read the referral code from the POST request's JSON body.
    const { referralCode } = await req.json();

    // It's good practice to handle cases where the code might be missing.
    if (!referralCode) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Referral code not provided.",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Step 2: Connect to the database.
    const { db } = await connectToDatabase();

    // Step 3: Find a document that matches the provided referral code.
    const referral = await db
      .collection("referrals")
      .findOne({ referralCode: referralCode });

    // Step 4: Check if a referral was found.
    if (referral) {
      // If found, return a success response with the referrer's name.
      return new Response(
        JSON.stringify({ success: true, referrerName: referral.name }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    } else {
      // If not found, return a failure response.
      return new Response(
        JSON.stringify({ success: false, message: "Invalid referral code." }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }
  } catch (err) {
    console.error(err);
    // Return a generic server error if something goes wrong.
    return new Response(
      JSON.stringify({ success: false, message: "Server error." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
