import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    const { data, error } = await resend.emails.send({
      from: `Portfolio Contact <${process.env.PERSONAL_EMAIL}>`,
      to: [process.env.PERSONAL_EMAIL!],
      subject: `New message from ${name}`,
      text: message,
      html: `
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong> ${message}</p>
        `,
    });

    if (error) {
      console.error("error sending an email:", error);
      return NextResponse.json({ error }, { status: 400 });
    }
    return NextResponse.json(data);
  } catch (error) {
    console.error("error in the api route:", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
