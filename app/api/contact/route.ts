import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      firstName = "",
      lastName = "",
      email = "",
      phone = "",
      service = "",
      message = "",
      hp = "", // honeypot
    } = body || {};

    // Spam guard
    if (hp) return NextResponse.json({ ok: true });

    if (!email || !message) {
      return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 400 });
    }

    const resendApiKey = process.env.RESEND_API_KEY?.trim();
    const to = (process.env.TO_EMAIL || "rajasubhanahmed@gmail.com").trim();

    // If no key locally, just log (dev fallback)
    if (!resendApiKey) {
      console.log("Contact (dev, no RESEND_API_KEY):", body);
      return NextResponse.json({ ok: true, dev: true });
    }

    // Log the exact "to" we are using so we can verify
    console.log("Contact: sending to =>", to);

    const resend = new Resend(resendApiKey);

    const html = `
      <h2>New Portfolio Inquiry</h2>
      <p><b>Name:</b> ${firstName} ${lastName}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Phone:</b> ${phone || "-"}</p>
      <p><b>Service:</b> ${service || "-"}</p>
      <p><b>Message:</b></p>
      <p>${String(message || "").replace(/\n/g, "<br/>")}</p>
    `;

    const { error } = await resend.emails.send({
      from: "Subhan Portfolio <onboarding@resend.dev>",
      to: [to],                     // <- only to your account email in sandbox
      subject: "New Portfolio Inquiry",
      html,
      // reply_to: email,            // (Optional) enable after we confirm Resend’s field name
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ ok: false, error: String(error) }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }
}
