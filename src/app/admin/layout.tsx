import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth"; // Corrected import path
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/AdminSlidebar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") redirect("/admin/login");
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-grow p-6">{children}</main>
    </div>
  );
}
