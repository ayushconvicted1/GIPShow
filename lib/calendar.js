import { google } from 'googleapis';

export async function createCalendarEvent({ email, summary, description, start, end }) {
  // const auth = new google.auth.JWT({
  //   email: process.env.GOOGLE_CLIENT_EMAIL,
  //   key: process.env.GOOGLE_PRIVATE_KEY,
  //   scopes: ['https://www.googleapis.com/auth/calendar'],
  // });

  const auth = new google.auth.GoogleAuth({
    keyFile: './keyFile.json',
    scopes: ['https://www.googleapis.com/auth/calendar'],
  });

  const calendar = google.calendar({ version: 'v3', auth });

  try {
    await calendar.events.insert({
      calendarId: 'primary',
      resource: {
        summary,
        description,
        start: { dateTime: start },
        end: { dateTime: end },
        attendees: [{ email }],
      },
    });
  } catch (err) {
    console.error('Failed to create calendar event:', err);
    throw err;
  }
}