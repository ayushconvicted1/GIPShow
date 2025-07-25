import { connectToDatabase } from "../../../lib/mongodb";
import { createCalendarEvent } from "../../../lib/calendar";

export async function POST(req) {
  try {
    // 1. Destructure all fields from the request body
    const {
      name,
      email,
      phone,
      city,
      propertyType,
      source,
      timeSlot,
      referral,
    } = await req.json();
    const { db } = await connectToDatabase();

    // Validate referral if provided
    let referrerId = null;
    if (referral) {
      const referralDoc = await db
        .collection("referrals")
        .findOne({ referralCode: referral });
      if (!referralDoc) {
        return Response.json(
          { success: false, message: "Invalid referral code" },
          { status: 400 }
        );
      }
      referrerId = referralDoc.userId;
    }

    // Check if user already exists
    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      return Response.json(
        { success: false, message: "Email already registered" },
        { status: 400 }
      );
    }

    // 2. Create the complete user object with all fields
    const user = {
      name,
      email,
      phone,
      city,
      propertyType,
      source,
      timeSlot,
      referrerId,
      createdAt: new Date(),
    };

    // Store the new user in the database
    await db.collection("users").insertOne(user);

    // Create calendar event (uncomment and configure as needed)
    // await createCalendarEvent({
    //   email,
    //   summary: 'Real Estate Expo Inquiry',
    //   description: `New inquiry from ${name}. Preferred time: ${timeSlot}.`,
    //   start: '2025-08-01T09:00:00Z', // Example date - make this dynamic
    //   end: '2025-08-01T17:00:00Z',
    // });

    return Response.json({ success: true, message: "Registration successful" });
  } catch (err) {
    console.error(err);
    return Response.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
