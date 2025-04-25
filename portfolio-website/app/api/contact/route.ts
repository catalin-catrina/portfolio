import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(request: Request) {
  try {
    const { name, message, email } = await request.json();

    // 1) Basic validation
    if (!email || !message) {
      return NextResponse.json(
        { error: "Email and message are required." },
        { status: 400 }
      );
    }

    // 2) Notify myself
    await resend.emails.send({
      from: process.env.CONTACT_FROM!,
      to: [process.env.CONTACT_TO!],
      subject: `Portfolio contact from ${name} — ${email}`,

      // HTML version (for rich clients)
      html: `
        <h2>New message via portfolio.catalincatrina.com</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br/>
           ${message.replace(/\n/g, "<br/>")}
        </p>
      `,

      // Plain-text version (for spam filters & simple clients)
      text: `
        New message via portfolio.catalincatrina.com

        Name: ${name}
        Email: ${email}

        Message:
        ${message}
      `,
    });

    // 3) Send confirmation back to the visitor
    await resend.emails.send({
      from: process.env.CONTACT_FROM!,
      to: email, // visitor’s email
      subject: "Thanks for reaching out!",

      // HTML auto-reply
      html: `
        <h1>Hey ${name},</h1>
        <p>Thanks for your message! I’ve received it and will get back to you soon.</p>
        <p>— Cătălin</p>
      `,

      // Plain-text auto-reply
      text: `
        Hey ${name},

        Thanks for your message! I’ve received it and will get back to you soon.

        — Cătălin
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form error", err);
    return NextResponse.json(
      { error: "Server error, please try again later." },
      { status: 500 }
    );
  }
}
