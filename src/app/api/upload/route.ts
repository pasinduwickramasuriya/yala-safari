import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

// Define the expected Cloudinary upload response type
interface CloudinaryUploadResponse {
  secure_url: string;
  [key: string]: unknown; // Optional: allows additional properties
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const result = await new Promise<CloudinaryUploadResponse>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { resource_type: "auto" }, // Automatically detect file type
          (error, result) => {
            if (error) reject(error);
            else resolve(result as CloudinaryUploadResponse);
          }
        )
        .end(buffer);
    });

    return NextResponse.json({ url: result.secure_url }, { status: 200 });
  } catch (error: unknown) {
    console.error("Error uploading file to Cloudinary:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to upload file", details: errorMessage },
      { status: 500 }
    );
  }
}