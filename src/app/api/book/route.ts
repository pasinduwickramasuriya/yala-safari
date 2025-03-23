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
//     const { name, phone, email, date, country, tourPackage, message } = data;

//     // Validate required fields
//     if (!name || !phone || !email || !date || !tourPackage) {
//       return NextResponse.json(
//         { error: "Missing required fields" },
//         { status: 400 }
//       );
//     }

//     console.log("Booking data received:", data); // Debug input
//     console.log("Email config:", {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS ? "set" : "unset",
//     }); // Debug env vars

//     // Email to admin
//     const adminEmail = {
//       from: process.env.EMAIL_USER,
//       to: "pasindusadanjana17@gmail.com", // Replace with your email
//       subject: `New Booking for ${tourPackage}`,
//       text: `
//         New Booking Details:
//         Name: ${name}
//         Phone: ${phone}
//         Email: ${email}
//         Date: ${date}
//         Country: ${country}
//         Tour Package: ${tourPackage}
//         Message: ${message || "None"}
//       `,
//     };

//     // Confirmation email to customer
//     const customerEmail = {
//       from: process.env.EMAIL_USER,
//       to: email,
//       subject: `Booking Confirmation - ${tourPackage}`,
//       text: `
//         Thank you for booking with us!
        
//         Booking Details:
//         Tour Package: ${tourPackage}
//         Date: ${date}
//         Name: ${name}
        
//         We’ll contact you soon to confirm availability and payment details.
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
//     console.error("Error sending booking emails:", error);

//     // Extract error message safely
//     const errorMessage =
//       error instanceof Error ? error.message : "Unknown error";

//     return NextResponse.json(
//       { error: "Failed to process booking", details: errorMessage },
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
    const { name, phone, email, date, country, tourPackage, message } = data;

    // Validate required fields
    if (!name || !phone || !email || !date || !tourPackage) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    console.log("Booking data received:", data); // Debug input
    console.log("Email config:", {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS ? "set" : "unset",
    }); // Debug env vars

    // Email to admin (HTML with shadcn-inspired styling)
    const adminEmail = {
      from: process.env.EMAIL_USER,
      to: "pasindusadanjana17@gmail.com", // Replace with your email
      subject: `New Booking for ${tourPackage}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; color: #1f2a44; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <h1 style="font-size: 24px; font-weight: 600; color: #1f2a44; margin-bottom: 16px;">New Booking Submission</h1>
          <p style="font-size: 16px; color: #64748b; margin-bottom: 24px;">A new booking has been received for your review.</p>
          <div style="background-color: #f8fafc; padding: 16px; border: 1px solid #e2e8f0; border-radius: 8px;">
            <h2 style="font-size: 18px; font-weight: 500; color: #1f2a44; margin-bottom: 12px;">Booking Details</h2>
            <p style="font-size: 14px; color: #64748b; margin: 4px 0;"><strong>Name:</strong> ${name}</p>
            <p style="font-size: 14px; color: #64748b; margin: 4px 0;"><strong>Phone:</strong> ${phone}</p>
            <p style="font-size: 14px; color: #64748b; margin: 4px 0;"><strong>Email:</strong> ${email}</p>
            <p style="font-size: 14px; color: #64748b; margin: 4px 0;"><strong>Date:</strong> ${date}</p>
            <p style="font-size: 14px; color: #64748b; margin: 4px 0;"><strong>Country:</strong> ${country || "Not provided"}</p>
            <p style="font-size: 14px; color: #64748b; margin: 4px 0;"><strong>Tour Package:</strong> ${tourPackage}</p>
            <p style="font-size: 14px; color: #64748b; margin: 4px 0;"><strong>Message:</strong> ${message || "None"}</p>
          </div>
          <p style="font-size: 14px; color: #64748b; margin-top: 24px;">Please review and contact the customer to confirm the booking.</p>
        </div>
      `,
    };

    // Confirmation email to customer (HTML with shadcn-inspired styling)
    const customerEmail = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Booking Confirmation - ${tourPackage}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; color: #1f2a44; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <h1 style="font-size: 24px; font-weight: 600; color: #1f2a44; margin-bottom: 16px;">Thank You for Your Booking!</h1>
          <p style="font-size: 16px; color: #64748b; margin-bottom: 24px;">We’ve received your booking request and are excited to assist you.</p>
          <div style="background-color: #f8fafc; padding: 16px; border: 1px solid #e2e8f0; border-radius: 8px;">
            <h2 style="font-size: 18px; font-weight: 500; color: #1f2a44; margin-bottom: 12px;">Your Booking Details</h2>
            <p style="font-size: 14px; color: #64748b; margin: 4px 0;"><strong>Tour Package:</strong> ${tourPackage}</p>
            <p style="font-size: 14px; color: #64748b; margin: 4px 0;"><strong>Date:</strong> ${date}</p>
            <p style="font-size: 14px; color: #64748b; margin: 4px 0;"><strong>Name:</strong> ${name}</p>
          </div>
          <p style="font-size: 14px; color: #64748b; margin-top: 24px;">We’ll reach out soon to confirm availability and provide payment details. If you have any questions, feel free to reply to this email.</p>
          <div style="margin-top: 24px; text-align: center;">
            <a href="mailto:${process.env.EMAIL_USER}" style="display: inline-block; padding: 12px 24px; background-color: #1a7f64; color: #ffffff; text-decoration: none; border-radius: 9999px; font-weight: 500;">Contact Us</a>
          </div>
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
    console.error("Error sending booking emails:", error);

    // Extract error message safely
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    return NextResponse.json(
      { error: "Failed to process booking", details: errorMessage },
      { status: 500 }
    );
  }
}