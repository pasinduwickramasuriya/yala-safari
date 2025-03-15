
// import { NextResponse } from 'next/server';
// import nodemailer from 'nodemailer';

// // Configure email transporter (e.g., Gmail SMTP)
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER, // Your Gmail address
//     pass: process.env.EMAIL_PASS, // Your Gmail App Password (not regular password)
//   },
// });

// export async function POST(request: Request) {
//   try {
//     const data = await request.json();
//     const { name, phone, email, date, country, tourPackage, message } = data;

//     // Email to you (admin)
//     const adminEmail = {
//       from: process.env.EMAIL_USER,
//       to: '	pasindusadanjana17@gmail.com', // Replace with your email
//       subject: `New Booking for ${tourPackage}`,
//       text: `
//         New Booking Details:
//         Name: ${name}
//         Phone: ${phone}
//         Email: ${email}
//         Date: ${date}
//         Country: ${country}
//         Tour Package: ${tourPackage}
//         Message: ${message || 'None'}
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
//     await transporter.sendMail(adminEmail);
//     await transporter.sendMail(customerEmail);

//     return NextResponse.json({ success: true }, { status: 200 });
//   } catch (error: any) {
//     console.error('Error sending booking emails:', error);
//     return NextResponse.json(
//       { error: 'Failed to process booking', details: error.message || 'Unknown error' },
//       { status: 500 }
//     );
//   }
// }



import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Configure email transporter (e.g., Gmail SMTP)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail address
    pass: process.env.EMAIL_PASS, // Your Gmail App Password
  },
});

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, phone, email, date, country, tourPackage, message } = data;

    console.log('Booking data received:', data); // Debug input
    console.log('Email config:', { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS ? 'set' : 'unset' }); // Debug env vars

    // Email to you (admin)
    const adminEmail = {
      from: process.env.EMAIL_USER,
      to: 'pasindusadanjana17@gmail.com', // Replace with your email
      subject: `New Booking for ${tourPackage}`,
      text: `
        New Booking Details:
        Name: ${name}
        Phone: ${phone}
        Email: ${email}
        Date: ${date}
        Country: ${country}
        Tour Package: ${tourPackage}
        Message: ${message || 'None'}
      `,
    };

    // Confirmation email to customer
    const customerEmail = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Booking Confirmation - ${tourPackage}`,
      text: `
        Thank you for booking with us!
        
        Booking Details:
        Tour Package: ${tourPackage}
        Date: ${date}
        Name: ${name}
        
        We’ll contact you soon to confirm availability and payment details.
      `,
    };

    // Send both emails
    console.log('Sending admin email...');
    await transporter.sendMail(adminEmail);
    console.log('Admin email sent');
    console.log('Sending customer email...');
    await transporter.sendMail(customerEmail);
    console.log('Customer email sent');

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error('Error sending booking emails:', error);
    return NextResponse.json(
      { error: 'Failed to process booking', details: error.message || 'Unknown error' },
      { status: 500 }
    );
  }
}