import { connectToDatabase } from '../../../lib/mongodb';
import { createCalendarEvent } from '../../../lib/calendar';

export async function POST(req) {
  try {
    const { name, email, referral } = await req.json();
    const { db } = await connectToDatabase();

    // Validate referral if provided
    let referrerId = null;
    if (referral) {
      const referralDoc = await db.collection('referrals').findOne({ referralCode: referral });
      if (!referralDoc) {
        return Response.json({ success: false, message: 'Invalid referral code' }, { status: 400 });
      }
      referrerId = referralDoc.userId;
    }

    // Check if user already exists
    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) {
      return Response.json({ success: false, message: 'Email already registered' }, { status: 400 });
    }

    // Store user
    const user = { name, email, referralId: referrerId, createdAt: new Date() };
    await db.collection('users').insertOne(user);
    
    // Create calendar event
    await createCalendarEvent({
      email,
      summary: 'Real Estate Expo',
      description: 'Join us for the Real Estate Expo!',
      start: '2025-08-01T09:00:00Z', // Example date
      end: '2025-08-01T17:00:00Z',
    });

    return Response.json({ success: true });
  } catch (err) {
    console.error(err);
    return Response.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}