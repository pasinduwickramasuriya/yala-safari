import prisma from '@/lib/prisma'
import Image from 'next/image'

async function getBlog(slug: string) {
  return await prisma.blog.findUnique({ where: { slug } })
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const blog = await getBlog(params.slug)
  if (!blog) return <div>Blog not found</div>
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-semibold mb-6">{blog.title}</h1>
      <Image src={blog.imageUrl} alt={blog.title} width={600} height={400} className="mb-6" />
      <p>{blog.content}</p>
    </div>
  )
}