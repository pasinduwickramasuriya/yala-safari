
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

// GET: Fetch all blogs
export async function GET() {
  try {
    const blogs = await prisma.blog.findMany();
    return NextResponse.json(blogs);
  } catch (error: unknown) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
  }
}

// POST: Create a new blog
export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log("Received POST data:", data); // Debug
    const blog = await prisma.blog.create({ data });
    return NextResponse.json(blog, { status: 201 });
  } catch (error: unknown) {
    console.error("Error adding blog:", error);

    // Handle Prisma-specific errors
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return NextResponse.json(
          { error: "A blog with this slug already exists" },
          { status: 400 }
        );
      }
    }

    // Fallback for other errors
    const message =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to add blog", details: message },
      { status: 500 }
    );
  }
}

// PUT: Update an existing blog
export async function PUT(request: Request) {
  try {
    const { id, ...data } = await request.json();
    console.log("Received PUT data:", { id, ...data }); // Debug
    if (!id) {
      return NextResponse.json({ error: "Blog ID required" }, { status: 400 });
    }
    const updatedBlog = await prisma.blog.update({
      where: { id: Number(id) },
      data,
    });
    return NextResponse.json(updatedBlog);
  } catch (error: unknown) {
    console.error("Error updating blog:", error);

    // Handle Prisma-specific errors (e.g., record not found)
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          { error: "Blog not found" },
          { status: 404 }
        );
      }
    }

    const message =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to update blog", details: message },
      { status: 500 }
    );
  }
}

// DELETE: Delete a blog
export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Blog ID required" }, { status: 400 });
    }
    await prisma.blog.delete({ where: { id: Number(id) } });
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("Error deleting blog:", error);

    // Handle Prisma-specific errors (e.g., record not found)
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          { error: "Blog not found" },
          { status: 404 }
        );
      }
    }

    const message =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to delete blog", details: message },
      { status: 500 }
    );
  }
}