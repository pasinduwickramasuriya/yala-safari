import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { v2 as cloudinary } from "cloudinary";

// Define Cloudinary upload response type
interface CloudinaryUploadResponse {
  secure_url: string;
  [key: string]: unknown; // Optional: allows additional properties
}

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// PUT: Update a hero section
export async function PUT(request: NextRequest) {
  try {
    // Manually extract id from the URL
    const urlParts = request.url.split("/");
    const id = parseInt(urlParts[urlParts.length - 1]);
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const formData = await request.formData();
    const title = formData.get("title") as string | null;
    const subtitle = formData.get("subtitle") as string | null;
    const file = formData.get("file") as File | null;

    // Validation
    if (!title || !subtitle) {
      return NextResponse.json(
        { error: "Title and subtitle are required" },
        { status: 400 }
      );
    }

    let imageUrl: string | undefined;
    if (file) {
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

      imageUrl = uploadResponse.secure_url;
    }

    const updateData: { title: string; subtitle: string; imageUrl?: string } = {
      title,
      subtitle,
    };
    if (imageUrl) updateData.imageUrl = imageUrl;

    const heroSection = await prisma.heroSection.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(heroSection, { status: 200 });
  } catch (error: unknown) {
    console.error("Error updating hero section:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to update hero section", details: errorMessage },
      { status: 500 }
    );
  }
}

// DELETE: Delete a hero section
export async function DELETE(request: NextRequest) {
  try {
    // Manually extract id from the URL
    const urlParts = request.url.split("/");
    const id = parseInt(urlParts[urlParts.length - 1]);
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    await prisma.heroSection.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Deleted successfully" }, { status: 200 });
  } catch (error: unknown) {
    console.error("Error deleting hero section:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to delete hero section", details: errorMessage },
      { status: 500 }
    );
  }
}