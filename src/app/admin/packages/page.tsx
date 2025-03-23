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