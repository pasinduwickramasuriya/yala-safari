import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { v2 as cloudinary } from 'cloudinary'; // Fixed import

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// PUT: Update a hero section
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  const formData = await request.formData();
  const title = formData.get('title') as string;
  const subtitle = formData.get('subtitle') as string;
  const file = formData.get('file') as File | null;

  let imageUrl;
  if (file) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const uploadResponse = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream( // Changed to cloudinary.uploader for consistency
        { folder: 'hero_sections' },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    });
    imageUrl = (uploadResponse as any).secure_url;
  }

  const updateData: any = { title, subtitle };
  if (imageUrl) updateData.imageUrl = imageUrl;

  const heroSection = await prisma.heroSection.update({
    where: { id },
    data: updateData,
  });

  return NextResponse.json(heroSection);
}

// DELETE: Delete a hero section
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  await prisma.heroSection.delete({
    where: { id },
  });
  return NextResponse.json({ message: 'Deleted successfully' });
}