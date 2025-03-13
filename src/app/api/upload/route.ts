import { NextResponse } from 'next/server'
import cloudinary from '@/lib/cloudinary'

export async function POST(request: Request) {
  const formData = await request.formData()
  const file = formData.get('file') as File
  if (!file) return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
  const buffer = Buffer.from(await file.arrayBuffer())
  const result = await new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream((error, result) => {
      if (error) reject(error)
      else resolve(result)
    }).end(buffer)
  })
  return NextResponse.json({ url: (result as any).secure_url })
}