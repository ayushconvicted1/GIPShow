import { connectToDatabase } from "../../../lib/mongodb";
import { sendEmail } from "../../../lib/nodemailer"; // Import the email utility
// import { createCalendarEvent } from "../../../lib/calendar"; // Keep for future use

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
      referral, // This is the referralCode
    } = await req.json();
    const { db } = await connectToDatabase();

    // Validate referral if provided
    let referrerEmail = null;
    let referrerName = null;
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
      console.log(referralDoc);
      referrerEmail = referralDoc.email;
      referrerName = referralDoc.name;
    }

    // Check if user already exists
    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      return Response.json(
        { success: false, message: "Email already registered" },
        { status: 400 }
      );
    }

    // 2. Create the complete user object
    const user = {
      name,
      email,
      phone,
      city,
      propertyType,
      source,
      timeSlot,
      referrerEmail, // Store who referred this user
      createdAt: new Date(),
    };

    // Store the new user in the database
    await db.collection("users").insertOne(user);

    // --- Send Confirmation Email to the New User ---
    const userEmailSubject = "Welcome to the GIP Show!";
    const userEmailHtml = `
      <h1>Hi ${name},</h1>
      <p>Thank you for your interest in the GIP Show! Your registration is confirmed.</p>
      <p>Here are the details you provided:</p>
      <ul>
        <li><strong>Name:</strong> ${name}</li>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Phone:</strong> ${phone}</li>
        <li><strong>City:</strong> ${city}</li>
        <li><strong>Property Type:</strong> ${propertyType}</li>
        <li><strong>Source:</strong> ${source}</li>
        <li><strong>Preferred Time Slot:</strong> ${timeSlot}</li>
      </ul>
      <p>We look forward to seeing you!</p>
      <p>Best regards,<br>The GIP Show Team</p>
    `;

    await sendEmail({
      to: email,
      subject: userEmailSubject,
      html: userEmailHtml,
    });
    // --- End of User Email ---

    // --- Send Notification Email to the Referrer ---
    if (referrerEmail && referrerName) {
      const referrerEmailSubject = "New Referral Signup for the GIP Show!";
      const referrerEmailHtml = `
        <h1>Hi ${referrerName},</h1>
        <p>Great news! Someone has registered for the GIP Show using your referral link.</p>
        <p><strong>New Registrant Details:</strong></p>
        <ul>
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>City:</strong> ${city}</li>
        </ul>
        <p>Thank you for spreading the word!</p>
        <p>Best regards,<br>The GIP Show Team</p>
      `;

      await sendEmail({
        to: referrerEmail,
        subject: referrerEmailSubject,
        html: referrerEmailHtml,
      });
    }
    // --- End of Referrer Email ---

    return Response.json({ success: true, message: "Registration successful" });
  } catch (err) {
    console.error(err);
    return Response.json(
      { success: false, message: "Server error during registration." },
      { status: 500 }
    );
  }
}
