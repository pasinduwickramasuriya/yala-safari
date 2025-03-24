import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const adminUsers = await prisma.user.findMany({
      where: {
        role: "admin"
      },
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true
      }
    });
    return NextResponse.json(adminUsers);
  } catch (error) {
    console.error("Error fetching admin users:", error);
    return NextResponse.json({ error: "Failed to fetch admin users" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const adminUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: "admin"
      },
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true
      }
    });

    return NextResponse.json({ message: "Admin user created", user: adminUser }, { status: 201 });
  } catch (error) {
    console.error("Error creating admin user:", error);
    return NextResponse.json({ error: "Failed to create admin user" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, email, password } = body;

    if (!id) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const updateData: any = {};
    
    if (email) updateData.email = email;
    if (password) updateData.password = await bcrypt.hash(password, 10);

    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: updateData,
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true
      }
    });

    return NextResponse.json({ message: "Admin user updated", user: updatedUser });
  } catch (error) {
    console.error("Error updating admin user:", error);
    return NextResponse.json({ error: "Failed to update admin user" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    await prisma.user.delete({
      where: { id: parseInt(id) }
    });

    return NextResponse.json({ message: "Admin user deleted" });
  } catch (error) {
    console.error("Error deleting admin user:", error);
    return NextResponse.json({ error: "Failed to delete admin user" }, { status: 500 });
  }
} 