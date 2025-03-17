import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Configure email transporter (e.g., Gmail SMTP)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail address
    pass: process.env.EMAIL_PASS, // Your Gmail App Password
  },
});

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email, message } = data;

    console.log("Contact data received:", data); // Debug input
    console.log("Email config:", {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS ? "set" : "unset",
    }); // Debug env vars

    // Email to you (admin)
    const adminEmail = {
      from: process.env.EMAIL_USER,
      to: "pasindusadanjana17@gmail.com", // Replace with your actual email
      subject: `New Contact Message from ${name}`,
      text: `
        New Contact Message:
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `,
    };

    // Confirmation email to customer
    const customerEmail = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Thank You for Contacting Yala Safari",
      text: `
        Dear ${name},

        Thank you for reaching out to us!

        Your Message:
        ${message}

        We’ll get back to you soon with a response.

        Best regards,
        The Yala Safari Team
      `,
    };

    // Send both emails
    console.log("Sending admin email...");
    await transporter.sendMail(adminEmail);
    console.log("Admin email sent");
    console.log("Sending customer email...");
    await transporter.sendMail(customerEmail);
    console.log("Customer email sent");

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error("Error sending contact emails:", error);
    return NextResponse.json(
      { error: "Failed to process contact message", details: error.message || "Unknown error" },
      { status: 500 }
    );
  }
}