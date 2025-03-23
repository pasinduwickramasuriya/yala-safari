import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

// Export handlers for GET and POST
export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);