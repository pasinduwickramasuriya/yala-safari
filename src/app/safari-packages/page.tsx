import Header from '@/components/Header'
import HeroPackage from '@/components/HeroPackage';
import PackageCard from '@/components/PackageCard'
import prisma from '@/lib/prisma'

async function fetchData() {

  const heroSections = await prisma.heroSection.findMany();
  return { heroSections };
}

async function getPackages() {
  return await prisma.package.findMany()
}

export default async function SafariPackages() {
  const { heroSections } = await fetchData();
  const packages = await getPackages()
  return (<>

    <Header />
    <HeroPackage heroSections={heroSections} />
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