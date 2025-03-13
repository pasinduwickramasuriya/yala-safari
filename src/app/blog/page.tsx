import BlogCard from '@/components/BlogCard'
import prisma from '@/lib/prisma'

async function getBlogs() {
  return await prisma.blog.findMany({ orderBy: { createdAt: 'desc' } })
}

export default async function Blog() {
  const blogs = await getBlogs()
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-semibold mb-6">Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  )
}