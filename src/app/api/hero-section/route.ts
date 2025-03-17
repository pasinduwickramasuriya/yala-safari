import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// GET: Fetch all hero sections
export async function GET() {
  const heroSections = await prisma.heroSection.findMany();
  return NextResponse.json(heroSections);
}

// POST: Create a new hero section
export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get('file') as File;
  const title = formData.get('title') as string;
  const subtitle = formData.get('subtitle') as string;

  if (!file || !title || !subtitle) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  // Upload image to Cloudinary
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const uploadResponse = await new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { folder: 'hero_sections' },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    ).end(buffer);
  });

  const imageUrl = (uploadResponse as any).secure_url;

  // Save to database
  const heroSection = await prisma.heroSection.create({
    data: {
      imageUrl,
      title,
      subtitle,
    },
  });

  return NextResponse.json(heroSection, { status: 201 });
}