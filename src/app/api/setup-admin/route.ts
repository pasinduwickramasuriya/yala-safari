import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

const SETUP_KEY = process.env.SETUP_KEY || 'temporary-setup-key-12345';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password, setupKey } = body;

    if (!email || !password || !setupKey) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (setupKey !== SETUP_KEY) {
      return NextResponse.json({ error: "Invalid setup key" }, { status: 401 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Delete existing admin if exists
    await prisma.user.deleteMany({
      where: { email }
    });

    // Create new admin user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: "admin"
      }
    });

    // Return user without password
    const { password: _, ...userWithoutPassword } = user;
    return NextResponse.json({ 
      message: "Admin user created successfully", 
      user: userWithoutPassword 
    });

  } catch (error: any) {
    console.error("Error creating admin user:", error);
    return NextResponse.json({ 
      error: "Failed to create admin user",
      details: error.message 
    }, { status: 500 });
  }
} 