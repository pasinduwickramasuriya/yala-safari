// import Image from 'next/image'
// import Link from 'next/link'

// export default function BlogCard({ blog }: { blog: { id: number; title: string; content: string; imageUrl: string; slug: string; createdAt: Date } }) {
//   return (
//     <div className="card">
//       <Image src={blog.imageUrl} alt={blog.title} width={300} height={200} className="rounded-t-lg" />
//       <div className="p-4">
//         <h3 className="text-xl font-semibold">{blog.title}</h3>
//         <p className="text-gray-600">{blog.content.substring(0, 100)}...</p>
//         <Link href={`/blog/${blog.slug}`} className="btn mt-4 inline-block">Read More</a>
//       </div>
//     </div>
//   )
// }


import Image from 'next/image'
import Link from 'next/link'

export default function BlogCard({ blog }: { blog: { id: number; title: string; content: string; imageUrl: string; slug: string; createdAt: Date } }) {
  return (
    <div className="card">
      <Image src={blog.imageUrl} alt={blog.title} width={300} height={200} className="rounded-t-lg" />
      <div className="p-4">
        <h3 className="text-xl font-semibold">{blog.title}</h3>
        <p className="text-gray-600">{blog.content.substring(0, 100)}...</p>
        <Link href={`/blog/${blog.slug}`} className="btn mt-4 inline-block">
          Read More
        </Link>
      </div>
    </div>
  )
}
