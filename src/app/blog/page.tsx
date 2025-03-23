import BlogCard from '@/components/BlogCard'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import HeroBlog from '@/components/HeroBlog'
import prisma from '@/lib/prisma'

async function getBlogs() {
  return await prisma.blog.findMany({ orderBy: { createdAt: 'desc' } })
}

async function fetchData() {
  // const packages = await prisma.package.findMany();
  const heroSections = await prisma.heroSection.findMany();
  return { heroSections };
}

export default async function Blog() {
  const blogs = await getBlogs()
  const { heroSections } = await fetchData();
  return (<>
    <Header />
    <HeroBlog heroSections={heroSections} />
    <div className="container mx-auto py-8">
      <h1 className="text-xl font-semibold mb-6 text-center">Blogs Adventure </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  </>
  )
}