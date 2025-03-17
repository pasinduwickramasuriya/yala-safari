// import { NextRequest, NextResponse } from "next/server";
// import prisma from "@/lib/prisma";
// import { writeFile } from "fs/promises";
// import path from "path";

// export async function POST(req: NextRequest) {
//   try {
//     const formData = await req.formData();
//     const customerName = formData.get("customerName") as string;
//     const customerEmail = formData.get("customerEmail") as string;
//     const description = formData.get("description") as string;
//     const image = formData.get("image") as File | null;

//     if (!customerName || !customerEmail || !description) {
//       return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
//     }

//     let imageUrl: string | undefined;
//     if (image) {
//       const buffer = Buffer.from(await image.arrayBuffer());
//       const filename = `${Date.now()}-${image.name}`;
//       const uploadPath = path.join(process.cwd(), "public", "uploads", filename);
//       await writeFile(uploadPath, buffer);
//       imageUrl = `/uploads/${filename}`;
//     }

//     const review = await prisma.customerReview.create({
//       data: {
//         customerName,
//         customerEmail,
//         description,
//         imageUrl,
//         isApproved: false,
//       },
//     });

//     return NextResponse.json({ message: "Review submitted", review }, { status: 201 });
//   } catch (error) {
//     console.error("Error submitting review:", error);
//     return NextResponse.json({ error: "Internal server error" }, { status: 500 });
//   }
// }



import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { writeFile, mkdir } from "fs/promises"; // Add mkdir
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const customerName = formData.get("customerName") as string;
    const customerEmail = formData.get("customerEmail") as string;
    const description = formData.get("description") as string;
    const image = formData.get("image") as File | null;

    if (!customerName || !customerEmail || !description) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    let imageUrl: string | undefined;
    if (image) {
      const buffer = Buffer.from(await image.arrayBuffer());
      const filename = `${Date.now()}-${image.name}`;
      const uploadDir = path.join(process.cwd(), "public", "uploads");

      // Ensure the uploads directory exists
      await mkdir(uploadDir, { recursive: true }); // Creates directory if it doesn't exist

      const uploadPath = path.join(uploadDir, filename);
      await writeFile(uploadPath, buffer);
      imageUrl = `/uploads/${filename}`;
    }

    const review = await prisma.customerReview.create({
      data: {
        customerName,
        customerEmail,
        description,
        imageUrl,
        isApproved: false,
      },
    });

    return NextResponse.json({ message: "Review submitted", review }, { status: 201 });
  } catch (error) {
    console.error("Error submitting review:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}