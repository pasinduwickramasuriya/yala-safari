import BlogCard from '@/components/BlogCard'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import HeroBlog from '@/components/HeroBlog'
import prisma from '@/lib/prisma'

// Force dynamic rendering
export const dynamic = 'force-dynamic'
export const revalidate = 0

interface Blog {
  id: number;
  title: string;
  content: string;
  imageUrl: string;
  slug: string;
  createdAt: Date;
}

async function getBlogs() {
  try {
    return await prisma.blog.findMany({ orderBy: { createdAt: 'desc' } })
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }
}

async function fetchData() {
  try {
    const heroSection = await prisma.heroSection.findFirst({
      where: { id: 1 },
    });
    return heroSection;
  } catch (error) {
    console.error('Error fetching hero section:', error);
    return null;
  }
}

export default async function Blog() {
  const blogs = await getBlogs()
  const heroSection = await fetchData();
  return (<>
    <Header />
    <HeroBlog heroSections={heroSection ? [heroSection] : []} />
    <main className="bg-background min-h-screen">
      <section className="container mx-auto px-4 py-12 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog: Blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </section>
    </main>
  </>
  )
}