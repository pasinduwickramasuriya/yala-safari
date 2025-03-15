// import prisma from '@/lib/prisma'
// import AddBlogForm from '@/components/AddBlogForm'

// async function getBlogs() {
//   return await prisma.blog.findMany()
// }

// export default async function AdminBlog() {
//   const blogs = await getBlogs()
//   return (
//     <div>
//       <h1 className="text-3xl font-semibold mb-6">Manage Blog</h1>
//       <ul className="mb-6">
//         {blogs.map((blog) => (
//           <li key={blog.id} className="p-2 border-b">{blog.title}</li>
//         ))}
//       </ul>
//       <AddBlogForm />
//     </div>
//   )
// }


import prisma from '@/lib/prisma';
import AddBlogForm from '@/components/AddBlogForm';
import DeleteBlogButton from '@/components/DeleteBlogButton';

async function getBlogs() {
  return await prisma.blog.findMany();
}

export default async function AdminBlog() {
  const blogs = await getBlogs();
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6">Manage Blog</h1>
      <ul className="mb-6">
        {blogs.map((blog) => (
          <li key={blog.id} className="p-2 border-b flex justify-between items-center">
            <span>{blog.title}</span>
            <div>
              <AddBlogForm blogToEdit={blog} />
              <DeleteBlogButton blogId={blog.id} />
            </div>
          </li>
        ))}
      </ul>
      <AddBlogForm />
    </div>
  );
}