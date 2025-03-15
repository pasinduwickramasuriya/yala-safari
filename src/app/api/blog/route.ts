// import { NextResponse } from 'next/server'
// import prisma from '@/lib/prisma'

// export async function GET() {
//   const blogs = await prisma.blog.findMany()
//   return NextResponse.json(blogs)
// }

// export async function POST(request: Request) {
//   const data = await request.json()
//   const blog = await prisma.blog.create({ data })
//   return NextResponse.json(blog)
// }



import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const blogs = await prisma.blog.findMany();
    return NextResponse.json(blogs);
  } catch (error: any) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log('Received POST data:', data); // Debug
    const blog = await prisma.blog.create({ data });
    return NextResponse.json(blog, { status: 201 });
  } catch (error: any) {
    console.error('Error adding blog:', error);
    if (error.code === 'P2002') { // Unique slug violation
      return NextResponse.json({ error: 'A blog with this slug already exists' }, { status: 400 });
    }
    return NextResponse.json(
      { error: 'Failed to add blog', details: error.message || 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const { id, ...data } = await request.json();
    console.log('Received PUT data:', { id, ...data }); // Debug
    if (!id) return NextResponse.json({ error: 'Blog ID required' }, { status: 400 });
    const updatedBlog = await prisma.blog.update({
      where: { id: Number(id) },
      data,
    });
    return NextResponse.json(updatedBlog);
  } catch (error: any) {
    console.error('Error updating blog:', error);
    return NextResponse.json(
      { error: 'Failed to update blog', details: error.message || 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Blog ID required' }, { status: 400 });
    await prisma.blog.delete({ where: { id: Number(id) } });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting blog:', error);
    return NextResponse.json(
      { error: 'Failed to delete blog', details: error.message || 'Unknown error' },
      { status: 500 }
    );
  }
}