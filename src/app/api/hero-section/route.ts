import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { v2 as cloudinary } from "cloudinary";

// Define the expected Cloudinary upload response type
interface CloudinaryUploadResponse {
  secure_url: string;
  [key: string]: unknown; // Allow additional properties if needed
}

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// GET: Fetch all hero sections
export async function GET() {
  try {
    const heroSections = await prisma.heroSection.findMany();
    return NextResponse.json(heroSections);
  } catch (error: unknown) {
    console.error("Error fetching hero sections:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to fetch hero sections", details: errorMessage },
      { status: 500 }
    );
  }
}

// POST: Create a new hero section
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const title = formData.get("title") as string | null;
    const subtitle = formData.get("subtitle") as string | null;

    // Validate required fields
    if (!file || !title || !subtitle) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Upload image to Cloudinary
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const uploadResponse = await new Promise<CloudinaryUploadResponse>(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            { folder: "hero_sections", resource_type: "image" },
            (error, result) => {
              if (error) reject(error);
              else resolve(result as CloudinaryUploadResponse);
            }
          )
          .end(buffer);
      }
    );

    const imageUrl = uploadResponse.secure_url;

    // Save to database
    const heroSection = await prisma.heroSection.create({
      data: {
        imageUrl,
        title,
        subtitle,
      },
    });

    return NextResponse.json(heroSection, { status: 201 });
  } catch (error: unknown) {
    console.error("Error creating hero section:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to create hero section", details: errorMessage },
      { status: 500 }
    );
  }
}