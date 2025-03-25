// import { NextRequest, NextResponse } from "next/server";
// import prisma from "@/lib/prisma";
// import { writeFile, mkdir } from "fs/promises";
// import path from "path";

// // POST handler (unchanged)
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
//       const uploadDir = path.join(process.cwd(), "public", "uploads");

//       await mkdir(uploadDir, { recursive: true });
//       const uploadPath = path.join(uploadDir, filename);
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

// // Added GET handler to fetch approved reviews
// export async function GET() {
//   try {
//     const reviews = await prisma.customerReview.findMany({
//       where: { isApproved: true }, // Fetch only approved reviews
//     });
//     return NextResponse.json(reviews);
//   } catch (error) {
//     console.error("Error fetching reviews:", error);
//     return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
//   }
// }



import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

// GET: Fetch approved customer reviews
export async function GET() {
  try {
    const reviews = await prisma.customerReview.findMany({
      where: { isApproved: true }, // Only fetch approved reviews
    });
    return NextResponse.json(reviews, { status: 200 });
  } catch (error: unknown) {
    console.error("Error fetching reviews:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json(
      { error: "Failed to fetch reviews", details: errorMessage },
      { status: 500 }
    );
  }
}

// POST: Submit a new customer review
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const customerName = formData.get("customerName") as string;
    const customerEmail = formData.get("customerEmail") as string;
    const description = formData.get("description") as string;
    const image = formData.get("image") as File | null;

    // Validate required fields
    if (!customerName || !customerEmail || !description) {
      return NextResponse.json(
        { error: "Missing required fields: customerName, customerEmail, or description" },
        { status: 400 }
      );
    }

    // Handle image upload if provided
    let imageUrl: string | undefined;
    if (image) {
      const buffer = Buffer.from(await image.arrayBuffer());
      const filename = `${Date.now()}-${image.name}`;
      const uploadDir = path.join(process.cwd(), "public", "uploads");

      await mkdir(uploadDir, { recursive: true });
      const uploadPath = path.join(uploadDir, filename);
      await writeFile(uploadPath, buffer);
      imageUrl = `/uploads/${filename}`;
    }

    // Create the review in the database
    const review = await prisma.customerReview.create({
      data: {
        customerName,
        customerEmail,
        description,
        imageUrl,
        isApproved: false,
      },
    });

    return NextResponse.json(
      { message: "Review submitted successfully", review },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Error submitting review:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json(
      { error: "Failed to submit review", details: errorMessage },
      { status: 500 }
    );
  }
}