import nodemailer from "nodemailer";

// This function will be used to send emails.
// It configures a transporter using environment variables for security
// and constructs the email with the provided options.

export async function sendEmail({ to, subject, html }) {
  // 1. Create a Nodemailer transporter using SMTP
  // We use environment variables to keep credentials secure.
  // Make sure to set these in your .env.local file.
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_PORT == 465, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // For Gmail, this is an App Password
    },
  });

  // 2. Define the email options
  const mailOptions = {
    from: `"GIP Show" <${process.env.SMTP_USER}>`, // Sender address
    to, // List of receivers
    subject, // Subject line
    html, // HTML body content
  };

  // 3. Send the email and handle the response
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Error sending email:", error);
    // Throw an error to be caught by the calling function
    throw new Error("Could not send email.");
  }
}
