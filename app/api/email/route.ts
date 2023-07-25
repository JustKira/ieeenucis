import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
export async function POST(
  request: Request,
  { params }: { params: { uid: string } }
) {
  const { email, text, title } = await request.json();

  if (!email && !text && !title) {
    return new NextResponse(null, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  });

  const mailOption = {
    from: `${process.env.NODEMAILER_EMAIL}`,
    to: `${email}`,
    subject: `New mail from ${email}`,
    text: `
        ${text}
        `,
  };

  transporter
    .sendMail(mailOption)
    .then(() => {
      return new NextResponse(null, { status: 204 });
    })
    .catch((error) => {
      return new NextResponse(JSON.stringify(error), { status: 400 });
    });

  return new NextResponse(null, { status: 204 });
}
