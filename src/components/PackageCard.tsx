import Image from "next/image";
import Link from "next/link";

interface Package {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  slug: string;
}

export default function PackageCard({ pkg }: { pkg: Package }) {
  return (
    <div className="group  rounded-xl  overflow-hidden transition-all duration-300  hover:-translate-y-1 max-w-sm mx-auto ">
      {/* Image Section */}
      <div className="relative h-56 w-full">
        <Image
          src={pkg.imageUrl}
          alt={pkg.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105 rounded-t-xl"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      {/* Content Section */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-card-foreground truncate">{pkg.name}</h3>
        <p className="text-muted-foreground mt-2 line-clamp-2">{pkg.description}</p>
        <p className="text-lg font-bold text-green-600 mt-4">Price: ${pkg.price}</p>
        {/* <Link
          href={`/safari-packages/${pkg.slug}`}
          className="mt-4 inline-block bg-green-600 text-white px-5 py-2 rounded-lg font-medium transition-all duration-300 hover:bg-green-700 hover:shadow-md"
        >
          View Details
        </Link> */}
        <div className="mt-4 flex justify-center">
          <Link
            href={`/safari-packages/${pkg.slug}`}
            className="inline-block bg-green-600 text-white px-5 py-2 rounded-lg font-medium transition-all duration-300 hover:bg-green-700 hover:shadow-md"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}