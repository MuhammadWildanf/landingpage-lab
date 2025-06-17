import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  const { name, email, phone, message } = await request.json();

  // Konfigurasi Nodemailer
  // GANTI DENGAN KREDENSIAL ASLI KAMU ATAU LAYANAN EMAIL LAIN
  const transporter = nodemailer.createTransport({
    host: "smtp.your-email-provider.com", // e.g., smtp.gmail.com for Gmail
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "your-email@example.com", // GANTI DENGAN EMAIL KAMU
      pass: "your-email-password", // GANTI DENGAN PASSWORD/APP PASSWORD KAMU
    },
  });

  try {
    await transporter.sendMail({
      from: `"${name}" <${email}>`, // Alamat pengirim (optional, bisa email kamu)
      to: "visual.lab@imajiwa.id", // GANTI DENGAN ALAMAT EMAIL PENERIMA ASLI
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ message: 'Failed to send email' }, { status: 500 });
  }
} 