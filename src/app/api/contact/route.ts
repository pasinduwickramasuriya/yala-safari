// import { NextResponse } from "next/server";
// import nodemailer from "nodemailer";

// // Configure email transporter (e.g., Gmail SMTP)
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER, // Your Gmail address
//     pass: process.env.EMAIL_PASS, // Your Gmail App Password
//   },
// });

// export async function POST(request: Request) {
//   try {
//     const data = await request.json();
//     const { name, email, message } = data;

//     // Validate required fields
//     if (!name || !email || !message) {
//       return NextResponse.json(
//         { error: "Missing required fields" },
//         { status: 400 }
//       );
//     }

//     console.log("Contact data received:", data); // Debug input
//     console.log("Email config:", {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS ? "set" : "unset",
//     }); // Debug env vars

//     // Email to admin
//     const adminEmail = {
//       from: process.env.EMAIL_USER,
//       to: "pasindusadanjana17@gmail.com", // Replace with your actual email
//       subject: `New Contact Message from ${name}`,
//       text: `
//         New Contact Message:
//         Name: ${name}
//         Email: ${email}
//         Message: ${message}
//       `,
//     };

//     // Confirmation email to customer
//     const customerEmail = {
//       from: process.env.EMAIL_USER,
//       to: email,
//       subject: "Thank You for Contacting Yala Safari",
//       text: `
//         Dear ${name},

//         Thank you for reaching out to us!

//         Your Message:
//         ${message}

//         We’ll get back to you soon with a response.

//         Best regards,
//         The Yala Safari Team
//       `,
//     };

//     // Send both emails
//     console.log("Sending admin email...");
//     await transporter.sendMail(adminEmail);
//     console.log("Admin email sent");
//     console.log("Sending customer email...");
//     await transporter.sendMail(customerEmail);
//     console.log("Customer email sent");

//     return NextResponse.json({ success: true }, { status: 200 });
//   } catch (error: unknown) {
//     console.error("Error sending contact emails:", error);

//     // Extract error message safely
//     const errorMessage =
//       error instanceof Error ? error.message : "Unknown error";

//     return NextResponse.json(
//       { error: "Failed to process contact message", details: errorMessage },
//       { status: 500 }
//     );
//   }
// }


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

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    console.log("Contact data received:", data); // Debug input
    console.log("Email config:", {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS ? "set" : "unset",
    }); // Debug env vars

    // Email to admin (HTML with shadcn-inspired styling)
    const adminEmail = {
      from: process.env.EMAIL_USER,
      to: "pasindusadanjana17@gmail.com", // Replace with your actual email
      subject: `New Contact Message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; color: #1f2a44; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <h1 style="font-size: 24px; font-weight: 600; color: #1f2a44; margin-bottom: 16px;">New Contact Message</h1>
          <p style="font-size: 16px; color: #64748b; margin-bottom: 24px;">A new message has been received via the contact form.</p>
          <div style="background-color: #f8fafc; padding: 16px; border: 1px solid #e2e8f0; border-radius: 8px;">
            <h2 style="font-size: 18px; font-weight: 500; color: #1f2a44; margin-bottom: 12px;">Message Details</h2>
            <p style="font-size: 14px; color: #64748b; margin: 4px 0;"><strong>Name:</strong> ${name}</p>
            <p style="font-size: 14px; color: #64748b; margin: 4px 0;"><strong>Email:</strong> ${email}</p>
            <p style="font-size: 14px; color: #64748b; margin: 4px 0;"><strong>Message:</strong></p>
            <p style="font-size: 14px; color: #64748b; margin: 4px 0; white-space: pre-wrap;">${message}</p>
          </div>
          <p style="font-size: 14px; color: #64748b; margin-top: 24px;">Please review and respond to the customer as soon as possible.</p>
        </div>
      `,
    };

    // Confirmation email to customer (HTML with shadcn-inspired styling)
    const customerEmail = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Thank You for Contacting Yala Safari",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; color: #1f2a44; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <h1 style="font-size: 24px; font-weight: 600; color: #1f2a44; margin-bottom: 16px;">Thank You, ${name}!</h1>
          <p style="font-size: 16px; color: #64748b; margin-bottom: 24px;">We’ve received your message and appreciate you reaching out.</p>
          <div style="background-color: #f8fafc; padding: 16px; border: 1px solid #e2e8f0; border-radius: 8px;">
            <h2 style="font-size: 18px; font-weight: 500; color: #1f2a44; margin-bottom: 12px;">Your Message</h2>
            <p style="font-size: 14px; color: #64748b; margin: 4px 0; white-space: pre-wrap;">${message}</p>
          </div>
          <p style="font-size: 14px; color: #64748b; margin-top: 24px;">Our team will get back to you soon with a response. If you have any urgent questions, feel free to reply to this email.</p>
          <div style="margin-top: 24px; text-align: center;">
            <a href="mailto:${process.env.EMAIL_USER}" style="display: inline-block; padding: 12px 24px; background-color: #1a7f64; color: #ffffff; text-decoration: none; border-radius: 9999px; font-weight: 500;">Contact Us</a>
          </div>
          <p style="font-size: 14px; color: #64748b; margin-top: 16px;">Best regards,<br/>The Yala Safari Team</p>
        </div>
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
  } catch (error: unknown) {
    console.error("Error sending contact emails:", error);

    // Extract error message safely
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    return NextResponse.json(
      { error: "Failed to process contact message", details: errorMessage },
      { status: 500 }
    );
  }
}