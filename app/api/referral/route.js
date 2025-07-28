import { connectToDatabase } from "../../../lib/mongodb";
import { nanoid } from "nanoid";
import { sendEmail } from "../../../lib/nodemailer"; // Import the email utility

export async function POST(req) {
  try {
    const { email, name } = await req.json();

    // --- Server-side validation ---
    if (!email || !name) {
      return Response.json(
        { success: false, message: "Email and name are required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (typeof email !== "string" || !emailRegex.test(email)) {
      return Response.json(
        { success: false, message: "Invalid email format provided." },
        { status: 400 }
      );
    }
    // --- End of validation ---

    const { db } = await connectToDatabase();
    const lowerCaseEmail = email.toLowerCase();

    // Check if user already has a referral link
    const existingReferral = await db
      .collection("referrals")
      .findOne({ email: lowerCaseEmail });

    if (existingReferral) {
      const referralLink = `${process.env.NEXT_PUBLIC_BASE_URL}/?referral=${existingReferral.referralCode}`;
      return Response.json({ success: true, referralLink });
    }

    // Generate new referral link
    const referralCode = nanoid(10);
    const referralLink = `${process.env.NEXT_PUBLIC_BASE_URL}/?referral=${referralCode}`;

    await db.collection("referrals").insertOne({
      email: lowerCaseEmail,
      name,
      referralCode,
      createdAt: new Date(),
    });

    // --- Send Email to the Affiliate ---
    const emailSubject = "Your GIP Show Affiliate Link is Ready!";
    const emailHtml = `
      <h1>Hello ${name},</h1>
      <p>Thank you for becoming an affiliate for the GIP Show!</p>
      <p>Here is your unique referral link to share:</p>
      <p><a href="${referralLink}">${referralLink}</a></p>
      <p>You'll be notified by email whenever someone registers using your link.</p>
      <p>Best regards,<br>The GIP Show Team</p>
    `;

    await sendEmail({
      to: lowerCaseEmail,
      subject: emailSubject,
      html: emailHtml,
    });
    // --- End of Email Sending ---

    return Response.json({ success: true, referralLink });
  } catch (err) {
    console.error(err);
    // Check if the error is from our email function
    if (err.message === "Could not send email.") {
      return Response.json(
        {
          success: false,
          message: "Referral created, but failed to send email.",
        },
        { status: 500 }
      );
    }
    return Response.json(
      { success: false, message: "An internal server error occurred." },
      { status: 500 }
    );
  }
}
