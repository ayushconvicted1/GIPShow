import { connectToDatabase } from "../../../lib/mongodb";
import { nanoid } from "nanoid";

export async function POST(req) {
  try {
    const { userId, name } = await req.json();
    const { db } = await connectToDatabase();

    // Check if user already has a referral link
    const existingReferral = await db
      .collection("referrals")
      .findOne({ userId });
    if (existingReferral) {
      const referralLink = `${process.env.NEXT_PUBLIC_BASE_URL}/?referral=${existingReferral.referralCode}`;
      return Response.json({ success: true, referralLink });
    }

    // Generate new referral link
    const referralCode = nanoid(10);
    await db.collection("referrals").insertOne({
      userId,
      name,
      referralCode,
      createdAt: new Date(),
    });

    const referralLink = `${process.env.NEXT_PUBLIC_BASE_URL}/?referral=${referralCode}`;
    return Response.json({ success: true, referralLink });
  } catch (err) {
    console.error(err);
    return Response.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
