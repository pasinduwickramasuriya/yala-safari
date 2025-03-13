// import Image from 'next/image'
// import Link from 'next/link'

// export default function PackageCard({ pkg }: { pkg: { id: number; name: string; description: string; imageUrl: string; price: number; slug: string } }) {
//   return (
//     <div className="card">
//       <Image src={pkg.imageUrl} alt={pkg.name} width={300} height={200} className="rounded-t-lg" />
//       <div className="p-4">
//         <h3 className="text-xl font-semibold">{pkg.name}</h3>
//         <p className="text-gray-600">{pkg.description}</p>
//         <p className="text-lg font-bold mt-2">Price: ${pkg.price}</p>
//         <Link href={`/safari-packages/${pkg.slug}`} className="btn mt-4 inline-block">View Details</a>
//       </div>
//     </div>
//   )
// }


import Image from 'next/image'
import Link from 'next/link'

export default function PackageCard({ pkg }: { pkg: { id: number; name: string; description: string; imageUrl: string; price: number; slug: string } }) {
  return (
    <div className="card">
      <Image src={pkg.imageUrl} alt={pkg.name} width={300} height={200} className="rounded-t-lg" />
      <div className="p-4">
        <h3 className="text-xl font-semibold">{pkg.name}</h3>
        <p className="text-gray-600">{pkg.description}</p>
        <p className="text-lg font-bold mt-2">Price: ${pkg.price}</p>
        <Link href={`/safari-packages/${pkg.slug}`} className="btn mt-4 inline-block">
          View Details
        </Link>
      </div>
    </div>
  )
}
