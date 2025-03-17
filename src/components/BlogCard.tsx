
// import Image from 'next/image'
// import Link from 'next/link'

// export default function BlogCard({ blog }: { blog: { id: number; title: string; content: string; imageUrl: string; slug: string; createdAt: Date } }) {
//   return (
//     <div className="card">
//       <Image src={blog.imageUrl} alt={blog.title} width={300} height={200} className="rounded-t-lg" />
//       <div className="p-4">
//         <h3 className="text-xl font-semibold">{blog.title}</h3>
//         <p className="text-gray-600">{blog.content.substring(0, 100)}...</p>
//         <Link href={`/blog/${blog.slug}`} className="btn mt-4 inline-block">
//           Read More
//         </Link>
//       </div>
//     </div>
//   )
// }



// "use client";

// import Image from "next/image";
// import Link from "next/link";

// interface Blog {
//   id: number;
//   title: string;
//   content: string;
//   imageUrl: string;
//   slug: string;
//   createdAt: Date;
// }

// export default function BlogCard({ blog }: { blog: Blog }) {
//   return (
//     <div className="group relative bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 max-w-sm mx-auto">
//       {/* Image Section */}
//       <div className="relative h-56 w-full">
//         <Image
//           src={blog.imageUrl}
//           alt={blog.title}
//           fill
//           className="object-cover rounded-t-xl transition-transform duration-500 group-hover:scale-105"
//           sizes="(max-width: 768px) 100vw, 300px"
//           priority={false}
//         />
//         {/* Gradient Overlay */}
//         <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
//       </div>

//       {/* Content Section */}
//       <div className="p-6 relative z-10">
//         {/* Title */}
//         <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white line-clamp-2 mb-2">
//           {blog.title}
//         </h3>

//         {/* Excerpt */}
//         <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base line-clamp-3 mb-4">
//           {blog.content.substring(0, 100)}...
//         </p>

//         {/* Date */}
//         <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
//           {new Date(blog.createdAt).toLocaleDateString("en-US", {
//             year: "numeric",
//             month: "long",
//             day: "numeric",
//           })}
//         </p>

//         {/* Read More Button */}
//         <Link
//           href={`/blog/${blog.slug}`}
//           className="inline-block bg-gradient-to-r from-green-600 to-teal-600 text-white py-2 px-4 rounded-lg font-semibold text-sm shadow-md hover:from-green-700 hover:to-teal-700 transition-all duration-300"
//         >
//           Read More
//         </Link>
//       </div>
//     </div>
//   );
// }



"use client";

import Image from "next/image";
import Link from "next/link";

interface Blog {
  id: number;
  title: string;
  content: string;
  imageUrl: string;
  slug: string;
  createdAt: Date;
}

export default function BlogCard({ blog }: { blog: Blog }) {
  return (
    <div className="group bg-dark  rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 max-w-2xl mx-auto flex flex-row">
      {/* Image Section */}
      <div className="relative w-3/3 h-48">
        <Image
          src={blog.imageUrl}
          alt={blog.title}
          fill
          className="object-cover rounded-l-xl transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
          priority={false}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
      </div>

      {/* Content Section */}
      <div className="p-6 w-auto flex flex-col justify-between">
        {/* Title */}
        <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white line-clamp-2 mb-2">
          {blog.title}
        </h3>

        {/* Excerpt */}
        <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 mb-3">
          {blog.content.substring(0, 100)}...
        </p>

        {/* Date */}
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
          {new Date(blog.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>

        {/* Read More Button */}
        <Link
          href={`/blog/${blog.slug}`}
          className="inline-block bg-gradient-to-r from-green-600 to-teal-600 text-white py-2 px-4 rounded-lg font-semibold text-sm shadow-md hover:from-green-700 hover:to-teal-700 transition-all duration-300 self-start"
        >
          Read More
        </Link>
      </div>
    </div>
  );
}

