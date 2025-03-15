// import prisma from '@/lib/prisma';
// import Header from '@/components/Header';
// import { notFound } from 'next/navigation';

// async function getPackage(slug: string) {
//   const pkg = await prisma.package.findUnique({
//     where: { slug },
//   });
//   if (!pkg) {
//     notFound(); // Show 404 if package not found
//   }
//   return pkg;
// }

// export default async function PackageDetailPage({ params }: { params: { slug: string } }) {
//   const pkg = await getPackage(params.slug);
//   return (
//     <>
//       <Header />
//       <div className="container mx-auto py-8">
//         <h1 className="text-3xl font-semibold mb-4">{pkg.name}</h1>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             {pkg.imageUrl && (
//               <img
//                 src={pkg.imageUrl}
//                 alt={pkg.name}
//                 className="w-full h-64 object-cover rounded-lg"
//               />
//             )}
//           </div>
//           <div>
//             <p className="text-lg mb-4">{pkg.description}</p>
//             <p className="text-xl font-bold mb-4">Price: ${pkg.price}</p>
//             <a
//               href="/contact"
//               className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//             >
//               Book Now
//             </a>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }



import prisma from '@/lib/prisma';
import Header from '@/components/Header';
import BookingForm from '@/components/BookingForm';
import { notFound } from 'next/navigation';

async function getPackage(slug: string) {
  const pkg = await prisma.package.findUnique({
    where: { slug },
  });
  if (!pkg) {
    notFound();
  }
  return pkg;
}

export default async function PackageDetailPage({ params }: { params: { slug: string } }) {
  const pkg = await getPackage(params.slug);
  return (
    <>
      <Header />
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-semibold mb-4">{pkg.name}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            {pkg.imageUrl && (
              <img
                src={pkg.imageUrl}
                alt={pkg.name}
                className="w-full h-64 object-cover rounded-lg"
              />
            )}
          </div>
          <div>
            <p className="text-lg mb-4">{pkg.description}</p>
            <p className="text-xl font-bold mb-4">Price: ${pkg.price}</p>
          </div>
        </div>
        <div className="mt-8">
          <BookingForm tourPackage={pkg.name} />
        </div>
      </div>
    </>
  );
}