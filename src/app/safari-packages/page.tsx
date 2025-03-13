import Header from '@/components/Header'
import PackageCard from '@/components/PackageCard'
import prisma from '@/lib/prisma'

async function getPackages() {
  return await prisma.package.findMany()
}

export default async function SafariPackages() {
  const packages = await getPackages()
  return (<>
  <Header/>
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-semibold mb-6">Safari Packages</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <PackageCard key={pkg.id} pkg={pkg} />
        ))}
      </div>
    </div>
    </>
  )
}