"use server";

import { Resend } from "resend";

// console.log("Resend APi key", process.env.RESEND_API_KEY ? "set" : "notset");

export async function sendEmail({ to, subject, react }) {
  const resend = new Resend(process.env.RESEND_API_KEY || "");

  try {
    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to,
      subject,
      react,
    });

    return { success: true, data };
  } catch (error) {
    console.error("Failed to send email", error);

    return { success: false, error };
  }
}
