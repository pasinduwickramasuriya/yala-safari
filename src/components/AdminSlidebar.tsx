// import Link from 'next/link'
// import { signOut } from 'next-auth/react'

// export default function AdminSidebar() {
//   return (
//     <aside className="bg-gray-800 text-white w-64 p-4">
//       <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
//       <nav className="space-y-4">
//         <Link href="/admin/dashboard" className="block hover:bg-gray-700 p-2 rounded">Dashboard</Link>
//         <Link href="/admin/packages" className="block hover:bg-gray-700 p-2 rounded">Manage Packages</Link>
//         <Link href="/admin/blog" className="block hover:bg-gray-700 p-2 rounded">Manage Blog</Link>
//         <button onClick={() => signOut({ callbackUrl: '/' })} className="block w-full text-left hover:bg-gray-700 p-2 rounded">Logout</button>
//       </nav>
//     </aside>
//   )
// }



'use client';
import { signOut } from 'next-auth/react';

export default function AdminSidebar() {
  const handleLogout = () => signOut({ callbackUrl: '/' });
  return (
    <aside className="bg-gray-800 text-white w-64 p-4">
      <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
      <nav className="space-y-4">
        <a href="/admin/dashboard" className="block hover:bg-gray-700 p-2 rounded">Dashboard</a>
        <a href="/admin/packages" className="block hover:bg-gray-700 p-2 rounded">Manage Packages</a>
        <a href="/admin/blog" className="block hover:bg-gray-700 p-2 rounded">Manage Blog</a>
        <button
          onClick={handleLogout}
          className="block w-full text-left hover:bg-gray-700 p-2 rounded"
        >
          Logout
        </button>
      </nav>
    </aside>
  );
}