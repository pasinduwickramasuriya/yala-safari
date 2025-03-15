// import { NextResponse } from 'next/server'
// import prisma from '@/lib/prisma'

// export async function GET() {
//   const packages = await prisma.package.findMany()
//   return NextResponse.json(packages)
// }

// export async function POST(request: Request) {
//   const data = await request.json()
//   const pkg = await prisma.package.create({ data })
//   return NextResponse.json(pkg)
// }

// export async function PUT(request: Request) {
//     const { id, ...data } = await request.json();
//     if (!id) return NextResponse.json({ error: 'Package ID is required' }, { status: 400 });
//     const updatedPkg = await prisma.package.update({
//       where: { id: Number(id) },
//       data,
//     });
//     return NextResponse.json(updatedPkg);
//   }



// import { NextResponse } from 'next/server';
// import prisma from '@/lib/prisma';

// export async function DELETE(request: Request) {
//   const url = new URL(request.url);
//   const id = url.searchParams.get('id');
//   if (!id) return NextResponse.json({ error: 'Package ID required' }, { status: 400 });
//   await prisma.package.delete({ where: { id: Number(id) } });
//   return NextResponse.json({ success: true });
// }

// export async function GET() {
//   const packages = await prisma.package.findMany();
//   return NextResponse.json(packages);
// }

// export async function POST(request: Request) {
//   const data = await request.json();
//   const pkg = await prisma.package.create({ data });
//   return NextResponse.json(pkg);
// }

// export async function PUT(request: Request) {
//   const { id, ...data } = await request.json();
//   if (!id) return NextResponse.json({ error: 'Package ID required' }, { status: 400 });
//   const updatedPkg = await prisma.package.update({ where: { id: Number(id) }, data });
//   return NextResponse.json(updatedPkg);
// }



import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const packages = await prisma.package.findMany();
    return NextResponse.json(packages);
  } catch (error: any) { // Add :any
    console.error('Error fetching packages:', error);
    return NextResponse.json({ error: 'Failed to fetch packages' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log('Received POST data:', data);
    const pkg = await prisma.package.create({ data });
    return NextResponse.json(pkg, { status: 201 });
  } catch (error: any) { // Add :any
    console.error('Error adding package:', error);
    if (error.code === 'P2002') { // Now safe
      return NextResponse.json({ error: 'A package with this slug already exists' }, { status: 400 });
    }
    return NextResponse.json(
      { error: 'Failed to add package', details: error.message || 'Unknown server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const { id, ...data } = await request.json();
    console.log('Received PUT data:', { id, ...data });
    if (!id) return NextResponse.json({ error: 'Package ID required' }, { status: 400 });
    const updatedPkg = await prisma.package.update({
      where: { id: Number(id) },
      data,
    });
    return NextResponse.json(updatedPkg);
  } catch (error: any) { // Add :any
    console.error('Error updating package:', error);
    return NextResponse.json(
      { error: 'Failed to update package', details: error.message || 'Unknown server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Package ID required' }, { status: 400 });
    await prisma.package.delete({ where: { id: Number(id) } });
    return NextResponse.json({ success: true });
  } catch (error: any) { // Add :any
    console.error('Error deleting package:', error);
    return NextResponse.json(
      { error: 'Failed to delete package', details: error.message || 'Unknown server error' },
      { status: 500 }
    );
  }
}