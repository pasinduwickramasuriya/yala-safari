import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the admin user with hashed password
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: "admin"
      }
    });

    // Return user without password
    const { password: _, ...userWithoutPassword } = user;
    return NextResponse.json({ message: "Admin user created successfully", user: userWithoutPassword });

  } catch (error: any) {
    if (error.code === 'P2002') {
      return NextResponse.json({ error: "Email already exists" }, { status: 400 });
    }
    console.error("Error creating admin user:", error);
    return NextResponse.json({ error: "Failed to create admin user" }, { status: 500 });
  }
} 