import Header from "@/components/Header";
import prisma from "@/lib/prisma";
import Image from "next/image";
import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Remove static generation flags
// export const dynamic = "force-static";
// export const dynamicParams = false;

async function getBlog(slug: string) {
  return await prisma.blog.findUnique({ where: { slug } });
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const blog = await getBlog(params.slug);
  return {
    title: blog?.title || "Blog Not Found",
    description: blog?.content || "The requested blog post could not be found.",
  };
}

export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  const blog = await getBlog(params.slug);

  if (!blog) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-background flex items-center justify-center">
          <Card className="text-center p-8 bg-card text-card-foreground rounded-xl shadow-lg">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-foreground">
                Blog Not Found
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Sorry, we couldn't find the blog post you're looking for.
              </p>
            </CardContent>
          </Card>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="bg-background min-h-screen">
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 text-white">
            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4 max-w-3xl animate-fadeIn">
              {blog.title}
            </h1>
            <p className="text-sm md:text-base text-muted-foreground">
              Published on{" "}
              {new Date(blog.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="container mx-auto px-4 py-12 md:px-6">
          {/* <Card className="max-w-3xl mx-auto bg-white dark:bg-black text-card-foreground rounded-xl shadow-md"> */}
          <CardContent className="p-6 md:p-8">
            <article className="prose prose-lg max-w-none text-foreground">
              <p className="leading-relaxed">{blog.content}</p>
            </article>
          </CardContent>
          {/* </Card> */}
        </section>
      </main>
    </>
  );
}

export async function generateStaticParams() {
  const blogs = await prisma.blog.findMany({ select: { slug: true } });
  return blogs.map((blog) => ({ slug: blog.slug }));
}