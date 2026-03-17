import nodemailer from "nodemailer";

type ContactEmailPayload = {
  name: string;
  email: string;
  phone: string | null;
  message: string;
};

type AppointmentEmailPayload = {
  name: string;
  email: string;
  phone: string;
  serviceTitle: string;
  preferredDate: string;
  preferredTime: string | null;
  notes: string | null;
};

function getMailerConfig() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? "587");
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.MAIL_TO;
  const from = process.env.MAIL_FROM ?? user;

  if (!host || !user || !pass || !to || !from || Number.isNaN(port)) {
    return null;
  }

  return { host, port, user, pass, to, from };
}

async function sendMail(subject: string, text: string, html: string) {
  const config = getMailerConfig();

  if (!config) {
    throw new Error("Email is not configured. Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MAIL_TO, and MAIL_FROM.");
  }

  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.port === 465,
    auth: {
      user: config.user,
      pass: config.pass,
    },
  });

  await transporter.sendMail({
    from: config.from,
    to: config.to,
    subject,
    text,
    html,
  });
}

export async function sendContactEmail(payload: ContactEmailPayload) {
  const subject = `New Contact Message: ${payload.name}`;
  const phoneLine = payload.phone ?? "Not provided";

  const text = [
    "New contact form submission",
    "",
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Phone: ${phoneLine}`,
    "",
    "Message:",
    payload.message,
  ].join("\n");

  const html = `
    <h2>New contact form submission</h2>
    <p><strong>Name:</strong> ${payload.name}</p>
    <p><strong>Email:</strong> ${payload.email}</p>
    <p><strong>Phone:</strong> ${phoneLine}</p>
    <p><strong>Message:</strong></p>
    <p>${payload.message.replace(/\n/g, "<br />")}</p>
  `;

  await sendMail(subject, text, html);
}

export async function sendAppointmentEmail(payload: AppointmentEmailPayload) {
  const subject = `New Appointment Request: ${payload.name}`;
  const timeLine = payload.preferredTime ?? "Not provided";
  const notesLine = payload.notes ?? "Not provided";

  const text = [
    "New appointment request",
    "",
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone}`,
    `Service: ${payload.serviceTitle}`,
    `Preferred date: ${payload.preferredDate}`,
    `Preferred time: ${timeLine}`,
    "",
    "Notes:",
    notesLine,
  ].join("\n");

  const html = `
    <h2>New appointment request</h2>
    <p><strong>Name:</strong> ${payload.name}</p>
    <p><strong>Email:</strong> ${payload.email}</p>
    <p><strong>Phone:</strong> ${payload.phone}</p>
    <p><strong>Service:</strong> ${payload.serviceTitle}</p>
    <p><strong>Preferred date:</strong> ${payload.preferredDate}</p>
    <p><strong>Preferred time:</strong> ${timeLine}</p>
    <p><strong>Notes:</strong></p>
    <p>${notesLine.replace(/\n/g, "<br />")}</p>
  `;

  await sendMail(subject, text, html);
}