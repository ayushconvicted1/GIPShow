import { connectToDatabase } from "../../../lib/mongodb";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');

  try {
    const { db } = await connectToDatabase();
    const referral = await db.collection('referrals').findOne({ referralCode: code });
    return Response.json({ valid: !!referral });
  } catch (err) {
    console.error(err);
    return Response.json({ valid: false }, { status: 500 });
  }
}