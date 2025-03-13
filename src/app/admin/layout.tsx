// import { getServerSession } from 'next-auth/next'
// import { authOptions } from '@/app/api/auth/[...nextauth]/route'
// import { redirect } from 'next/navigation'
// import AdminSidebar from '@/components/AdminSlidebar'
// export default async function AdminLayout({ children }: { children: React.ReactNode }) {
//   const session = await getServerSession(authOptions)
// //   if (!session || session.user.role !== 'admin') redirect('/admin/login')
// if (!session || session.user.role !== 'admin') redirect('/login')
//   return (
//     <div className="flex min-h-screen">
//       <AdminSidebar />
//       <main className="flex-grow p-6">{children}</main>
//     </div>
//   )
// }


import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import AdminSidebar from '@/components/AdminSlidebar';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'admin') redirect('/admin/login'); // Keep /admin/login here
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-grow p-6">{children}</main>
    </div>
  );
}
