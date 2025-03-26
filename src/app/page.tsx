// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import PackageCard from "@/components/PackageCard";
// import HeroSlider from "@/components/HeroSlider";
// import prisma from "@/lib/prisma";
// import PhotoGallery from "@/components/PhotoGallery";
// import WhyChooseUs from "@/components/WhyChooseUs";
// // import { ModeToggle } from "@/components/mode-toggle";
// import Link from "next/link";
// import GallerySection from "@/components/GallerySection";
// import ReviewsSection from "@/components/ReviewSection";

// // Force dynamic rendering
// export const dynamic = 'force-dynamic'
// export const revalidate = 0

// async function fetchData() {
//   const packages = await prisma.package.findMany();
//   const heroSections = await prisma.heroSection.findMany();
//   return { packages, heroSections };
// }

// export default async function Home() {
//   const { packages, heroSections } = await fetchData();

//   return (
//     <div className="min-h-screen flex flex-col bg-background text-foreground">
//       {/* Header */}
//       <Header />

//       {/* Main Content */}
//       <main className="flex-grow">
//         {/* Hero Section */}
//         <HeroSlider heroSections={heroSections} />

//         {/* Featured Packages Section */}
//         <section className="container mx-auto py-16 px-4 md:px-6 bg-background">
//           <h2 className="text-xl md:text-2xl font-extrabold text-center text-foreground mb-12 tracking-tight animate-fadeIn">
//             Featured Safari Packages
//           </h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//             {packages.slice(0, 3).map((pkg) => (
//               <PackageCard key={pkg.id} pkg={pkg} />
//             ))}
//           </div>
//           <div className="text-center mt-12">
//             <Link
//               href="/safari-packages"
//               className="inline-block bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white px-8 py-3 rounded-full font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
//             >
//               View All Packages
//             </Link>
//           </div>
//         </section>

//         {/* Photo Gallery Section */}
//         <PhotoGallery />
//         <GallerySection />
//         <ReviewsSection />

//         {/* Why Choose Us Section */}
//         <WhyChooseUs />
//       </main>
//     </div>
//   );
// }



import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PackageCard from "@/components/PackageCard";
import HeroSlider from "@/components/HeroSlider";
import prisma from "@/lib/prisma";
import PhotoGallery from "@/components/PhotoGallery";
import WhyChooseUs from "@/components/WhyChooseUs";
import Link from "next/link";
import GallerySection from "@/components/GallerySection";
import ReviewsSection from "@/components/ReviewSection";

// Force dynamic rendering
export const dynamic = "force-dynamic";
export const revalidate = 0;

async function fetchData() {
  try {
    const packages = await prisma.package.findMany();
    const heroSections = await prisma.heroSection.findMany();
    return { packages, heroSections, error: null };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { packages: [], heroSections: [], error: "Failed to load data" };
  }
}

export default async function Home() {
  const { packages, heroSections, error } = await fetchData();

  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <Header />
        <main className="flex-grow container mx-auto py-16 px-4 md:px-6">
          <h1 className="text-2xl font-bold text-center text-red-600">
            Oops, something went wrong!
          </h1>
          <p className="text-center mt-4">
            We couldn&apos;t load the page content. Please try again later.
          </p>
        </main>
        {/* <Footer /> */}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Section */}
        <HeroSlider heroSections={heroSections} />

        {/* Featured Packages Section */}
        <section className="container mx-auto py-16 px-4 md:px-6 bg-background">
          <h2 className="text-xl md:text-2xl font-extrabold text-center text-foreground mb-12 tracking-tight animate-fadeIn">
            Featured Safari Packages
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {packages.slice(0, 3).map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/safari-packages"
              className="inline-block bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white px-8 py-3 rounded-full font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              View All Packages
            </Link>
          </div>
        </section>

        {/* Photo Gallery Section */}
        <PhotoGallery />
        <GallerySection />
        <ReviewsSection />

        {/* Why Choose Us Section */}
        <WhyChooseUs />
      </main>

      {/* Footer */}

    </div>
  );
}