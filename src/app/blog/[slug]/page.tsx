// import Footer from '@/components/Footer'
// import Header from '@/components/Header'
// import prisma from '@/lib/prisma'
// import Image from 'next/image'

// async function getBlog(slug: string) {
//   return await prisma.blog.findUnique({ where: { slug } })
// }

// export default async function BlogPost({ params }: { params: { slug: string } }) {
//   const blog = await getBlog(params.slug)
//   if (!blog) return <div>Blog not found</div>
//   return (<>
//   <Header/>
//     <div className="container mx-auto py-8">
//       <h1 className="text-3xl font-semibold mb-6">{blog.title}</h1>
//       <Image src={blog.imageUrl} alt={blog.title} width={600} height={400} className="mb-6" />
//       <p>{blog.content}</p>
//     </div>
//   <Footer/>
//     </>)
// }


import Footer from "@/components/Footer";
import Header from "@/components/Header";
import prisma from "@/lib/prisma";
import Image from "next/image";

// Fetch blog data server-side
async function getBlog(slug: string) {
  return await prisma.blog.findUnique({ where: { slug } });
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const blog = await getBlog(params.slug);

  // Handle case where blog is not found
  if (!blog) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
          <div className="text-center p-8 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Blog Not Found</h1>
            <p className="text-gray-600 dark:text-gray-300">
              Sorry, we couldn’t find the blog post you’re looking for.
            </p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="bg-gray-50 dark:bg-gray-950 min-h-screen">
        {/* Hero Section */}
        <section className="relative h-[60vh] w-full">
          <Image
            src={blog.imageUrl}
            alt={blog.title}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent"></div>
          {/* Title and Metadata */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 text-white">
            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4 max-w-3xl animate-fadeIn">
              {blog.title}
            </h1>
            <p className="text-sm md:text-base text-gray-300">
              Published on{" "}
              {new Date(blog.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
              {/* Add author if available in your schema */}
              {/* {blog.author && ` by ${blog.author}`} */}
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="container mx-auto px-4 md:px-0 py-12">
          <div className="max-w-3xl mx-auto bg-black dark:bg-black rounded-xl shadow-md p-6 md:p-8">
            <article className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
                {blog.content}
              </p>
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

// Optional: Generate static params for dynamic routes (if using static generation)
export async function generateStaticParams() {
  const blogs = await prisma.blog.findMany({ select: { slug: true } });
  return blogs.map((blog) => ({ slug: blog.slug }));
}