// import prisma from '@/lib/prisma'
// import AddPackageForm from '@/components/AddPackageForm'

// async function getPackages() {
//   return await prisma.package.findMany()
// }

// export default async function AdminPackages() {
//   const packages = await getPackages()
//   return (
//     <div>
//       <h1 className="text-3xl font-semibold mb-6">Manage Packages</h1>
//       <ul className="mb-6">
//         {packages.map((pkg) => (
//           <li key={pkg.id} className="p-2 border-b">{pkg.name} - ${pkg.price}</li>
//         ))}
//       </ul>
//       <AddPackageForm />
//     </div>
//   )
// }



// import prisma from '@/lib/prisma';
// import AddPackageForm from '@/components/AddPackageForm';

// async function getPackages() {
//   return await prisma.package.findMany();
// }

// export default async function AdminPackages() {
//   const packages = await getPackages();
//   return (
//     <div>
//       <h1 className="text-3xl font-semibold mb-6">Manage Packages</h1>
//       <ul className="mb-6">
//         {packages.map((pkg) => (
//           <li key={pkg.id} className="p-2 border-b flex justify-between items-center">
//             <span>{pkg.name} - ${pkg.price}</span>
//             <div>
//               {/* Edit Button - Passes package data to AddPackageForm */}
//               <AddPackageForm packageToEdit={pkg} />
//               {/* Delete Button */}
//               <form
//                 action={async () => {
//                   'use server'; // Server directive for server action
//                   await prisma.package.delete({ where: { id: pkg.id } });
//                 }}
//                 method="POST"
//                 className="inline"
//               >
//                 <button
//                   type="submit"
//                   className="ml-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
//                 >
//                   Delete
//                 </button>
//               </form>
//             </div>
//           </li>
//         ))}
//       </ul>
//       {/* Add New Package Form */}
//       <AddPackageForm />
//     </div>
//   );
// }



import prisma from '@/lib/prisma';
import AddPackageForm from '@/components/AddPackageForm';
import DeleteButton from '@/components/DeleteButton';

async function getPackages() {
  return await prisma.package.findMany();
}

export default async function AdminPackages() {
  const packages = await getPackages();
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6">Manage Packages</h1>
      <ul className="mb-6">
        {packages.map((pkg) => (
          <li key={pkg.id} className="p-2 border-b flex justify-between items-center">
            <span>{pkg.name} - ${pkg.price}</span>
            <div>
              <AddPackageForm packageToEdit={pkg} />
              <DeleteButton packageId={pkg.id} />
            </div>
          </li>
        ))}
      </ul>
      <AddPackageForm />
    </div>
  );
}