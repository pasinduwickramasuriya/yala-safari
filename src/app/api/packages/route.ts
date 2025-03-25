// import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma";
// import { Prisma } from "@prisma/client";

// // GET: Fetch all packages
// export async function GET() {
//   try {
//     const packages = await prisma.package.findMany();
//     return NextResponse.json(packages);
//   } catch (error: unknown) {
//     console.error("Error fetching packages:", error);
//     const errorMessage =
//       error instanceof Error ? error.message : "Unknown error";
//     return NextResponse.json(
//       { error: "Failed to fetch packages", details: errorMessage },
//       { status: 500 }
//     );
//   }
// }

// // POST: Create a new package
// export async function POST(request: Request) {
//   try {
//     const data = await request.json();
//     console.log("Received POST data:", data);
//     const pkg = await prisma.package.create({ data });
//     return NextResponse.json(pkg, { status: 201 });
//   } catch (error: unknown) {
//     console.error("Error adding package:", error);

//     // Handle Prisma-specific errors
//     if (error instanceof Prisma.PrismaClientKnownRequestError) {
//       if (error.code === "P2002") {
//         return NextResponse.json(
//           { error: "A package with this slug already exists" },
//           { status: 400 }
//         );
//       }
//     }

//     const errorMessage =
//       error instanceof Error ? error.message : "Unknown error";
//     return NextResponse.json(
//       { error: "Failed to add package", details: errorMessage },
//       { status: 500 }
//     );
//   }
// }

// // PUT: Update an existing package
// export async function PUT(request: Request) {
//   try {
//     const { id, ...data } = await request.json();
//     console.log("Received PUT data:", { id, ...data });
//     if (!id) {
//       return NextResponse.json({ error: "Package ID required" }, { status: 400 });
//     }
//     const updatedPkg = await prisma.package.update({
//       where: { id: Number(id) },
//       data,
//     });
//     return NextResponse.json(updatedPkg);
//   } catch (error: unknown) {
//     console.error("Error updating package:", error);

//     // Handle Prisma-specific errors (e.g., record not found)
//     if (error instanceof Prisma.PrismaClientKnownRequestError) {
//       if (error.code === "P2025") {
//         return NextResponse.json(
//           { error: "Package not found" },
//           { status: 404 }
//         );
//       }
//     }

//     const errorMessage =
//       error instanceof Error ? error.message : "Unknown error";
//     return NextResponse.json(
//       { error: "Failed to update package", details: errorMessage },
//       { status: 500 }
//     );
//   }
// }

// // DELETE: Delete a package
// export async function DELETE(request: Request) {
//   try {
//     const url = new URL(request.url);
//     const id = url.searchParams.get("id");
//     if (!id) {
//       return NextResponse.json({ error: "Package ID required" }, { status: 400 });
//     }
//     await prisma.package.delete({ where: { id: Number(id) } });
//     return NextResponse.json({ success: true });
//   } catch (error: unknown) {
//     console.error("Error deleting package:", error);

//     // Handle Prisma-specific errors (e.g., record not found)
//     if (error instanceof Prisma.PrismaClientKnownRequestError) {
//       if (error.code === "P2025") {
//         return NextResponse.json(
//           { error: "Package not found" },
//           { status: 404 }
//         );
//       }
//     }

//     const errorMessage =
//       error instanceof Error ? error.message : "Unknown error";
//     return NextResponse.json(
//       { error: "Failed to delete package", details: errorMessage },
//       { status: 500 }
//     );
//   }
// }



import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

// GET: Fetch all packages
export async function GET() {
  try {
    const packages = await prisma.package.findMany();
    return NextResponse.json(packages, { status: 200 });
  } catch (error: unknown) {
    console.error("Error fetching packages:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json(
      { error: "Failed to fetch packages", details: errorMessage },
      { status: 500 }
    );
  }
}

// POST: Create a new package
export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log("Received POST data:", data);

    const pkg = await prisma.package.create({ data });
    return NextResponse.json(pkg, { status: 201 });
  } catch (error: unknown) {
    console.error("Error adding package:", error);

    // Handle Prisma-specific errors
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return NextResponse.json(
          { error: "A package with this slug already exists" },
          { status: 400 }
        );
      }
    }

    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json(
      { error: "Failed to add package", details: errorMessage },
      { status: 500 }
    );
  }
}

// PUT: Update an existing package
export async function PUT(request: Request) {
  try {
    const { id, ...data } = await request.json();
    console.log("Received PUT data:", { id, ...data });

    if (!id) {
      return NextResponse.json({ error: "Package ID is required" }, { status: 400 });
    }

    const updatedPkg = await prisma.package.update({
      where: { id: Number(id) },
      data,
    });
    return NextResponse.json(updatedPkg, { status: 200 });
  } catch (error: unknown) {
    console.error("Error updating package:", error);

    // Handle Prisma-specific errors
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json({ error: "Package not found" }, { status: 404 });
      }
    }

    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json(
      { error: "Failed to update package", details: errorMessage },
      { status: 500 }
    );
  }
}

// DELETE: Delete a package
export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Package ID is required" }, { status: 400 });
    }

    await prisma.package.delete({ where: { id: Number(id) } });
    return NextResponse.json({ message: "Package deleted successfully" }, { status: 200 });
  } catch (error: unknown) {
    console.error("Error deleting package:", error);

    // Handle Prisma-specific errors
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json({ error: "Package not found" }, { status: 404 });
      }
    }

    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json(
      { error: "Failed to delete package", details: errorMessage },
      { status: 500 }
    );
  }
}