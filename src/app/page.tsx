
// import Header from '@/components/Header';
// import Footer from '@/components/Footer';
// import PackageCard from '@/components/PackageCard';
// import HeroSlider from '@/components/HeroSlider';
// import prisma from '@/lib/prisma';

// async function fetchData() {
//   const packages = await prisma.package.findMany();
//   const heroSections = await prisma.heroSection.findMany();
//   return { packages, heroSections };
// }

// export default async function Home() {
//   const { packages, heroSections } = await fetchData();

//   return (
//     <div className="min-h-screen flex flex-col">
//       <Header />
//       <main className="flex-grow">
//         <HeroSlider heroSections={heroSections} />
        
//         <section className="container mx-auto py-12">
//           <h2 className="text-3xl font-semibold mb-6 text-center">Featured Packages</h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {packages.slice(0, 3).map((pkg) => (
//               <PackageCard key={pkg.id} pkg={pkg} />
//             ))}
//           </div>
//         </section>
//         <section className="bg-gray-100 py-12">
//           <div className="container mx-auto text-center">
//             <h2 className="text-3xl font-semibold mb-6">Why Choose Us</h2>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//               <div className="p-4">
//                 <h3 className="text-xl font-bold mb-2">Expert Guides</h3>
//                 <p className="text-gray-700">
//                   Our experienced guides ensure a safe and informative safari experience.
//                 </p>
//               </div>
//               <div className="p-4">
//                 <h3 className="text-xl font-bold mb-2">Comfortable Jeeps</h3>
//                 <p className="text-gray-700">
//                   Travel in comfort with our well-maintained, spacious safari jeeps.
//                 </p>
//               </div>
//               <div className="p-4">
//                 <h3 className="text-xl font-bold mb-2">Best Rates</h3>
//                 <p className="text-gray-700">
//                   Enjoy competitive pricing without compromising on quality.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </section>
//       </main>
//       <Footer />
//     </div>
//   );
// }



// import Header from '@/components/Header';
// import Footer from '@/components/Footer';
// import PackageCard from '@/components/PackageCard';
// import HeroSlider from '@/components/HeroSlider';
// import prisma from '@/lib/prisma';
// import PhotoGallery from '@/components/PhotoGallery';

// async function fetchData() {
//   const packages = await prisma.package.findMany();
//   const heroSections = await prisma.heroSection.findMany();
//   return { packages, heroSections };
// }

// export default async function Home() {
//   const { packages, heroSections } = await fetchData();

//   return (
//     <div className="min-h-screen flex flex-col bg-gray-50">
//       {/* Header */}
//       <Header />

//       {/* Main Content */}
//       <main className="flex-grow">
//         {/* Hero Section */}
//         <HeroSlider heroSections={heroSections} />

//         {/* Featured Packages Sectioncontainer */}
//         <section className=" mx-auto py-16 px-4 md:px-0 bg-black">
//           <h2 className="text-4xl md:text-2xl font-extrabold text-center text-white mb-12 tracking-tight animate-fadeIn">
//             Featured Safari Packages
//           </h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
//             {packages.slice(0, 3).map((pkg) => (
//               <PackageCard key={pkg.id} pkg={pkg} />
//             ))}
//           </div>
//           <div className="text-center mt-12">
//             <a
//               href="/safari-packages"
//               className="inline-block bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white px-8 py-3 rounded-full font-semibold shadow-lg transform hover:scale-105 transition-all duration-300"
//             >
//               View All Packages
//             </a>
//           </div>
//         </section>

    

//         {/* Why Choose Us Section */}
//         <section className="bg-gradient-to-b from-teal-50 to-white py-20">
//           <div className="container mx-auto px-4 md:px-0 text-center">
//             <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-12 tracking-tight animate-fadeIn">
//               Why Choose Yala Safari
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
//               <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300">
//                 <div className="text-green-600 mb-4">
//                   <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 1.857h10M9 4a3 3 0 013-3h0a3 3 0 013 3m-6 0h6" />
//                   </svg>
//                 </div>
//                 <h3 className="text-2xl font-bold text-gray-800 mb-3">Expert Guides</h3>
//                 <p className="text-gray-600 leading-relaxed">
//                   Our experienced guides ensure a safe and unforgettable safari adventure.
//                 </p>
//               </div>
//               <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300">
//                 <div className="text-green-600 mb-4">
//                   <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17V7m0 10h6m-6 0a2 2 0 01-2-2V9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9z" />
//                   </svg>
//                 </div>
//                 <h3 className="text-2xl font-bold text-gray-800 mb-3">Comfortable Jeeps</h3>
//                 <p className="text-gray-600 leading-relaxed">
//                   Travel in style with our well-maintained, spacious safari jeeps.
//                 </p>
//               </div>
//               <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300">
//                 <div className="text-green-600 mb-4">
//                   <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2-1.343-2-3-2zm0 8c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
//                   </svg>
//                 </div>
//                 <h3 className="text-2xl font-bold text-gray-800 mb-3">Best Rates</h3>
//                 <p className="text-gray-600 leading-relaxed">
//                   Enjoy premium experiences at competitive prices without compromise.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </section>
//       </main>

//       {/* Footer */}
//       <Footer />
//     </div>
//   );
// }




import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PackageCard from '@/components/PackageCard';
import HeroSlider from '@/components/HeroSlider';
import prisma from '@/lib/prisma';
import PhotoGallery from '@/components/PhotoGallery';
import WhyChooseUs from '@/components/WhyChooseUs';

async function fetchData() {
  const packages = await prisma.package.findMany();
  const heroSections = await prisma.heroSection.findMany();
  return { packages, heroSections };
}

export default async function Home() {
  const { packages, heroSections } = await fetchData();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Section */}
        <HeroSlider heroSections={heroSections} />

        {/* Featured Packages Section */}
        <section className="mx-auto py-16 px-4 md:px-0 bg-black">
          <h2 className="text-4xl md:text-2xl font-extrabold text-center text-white mb-12 tracking-tight animate-fadeIn">
            Featured Safari Packages
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {packages.slice(0, 3).map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
          <div className="text-center mt-12">
            <a
              href="/safari-packages"
              className="inline-block bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white px-8 py-3 rounded-full font-semibold shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              View All Packages
            </a>
          </div>
        </section>

        {/* Photo Gallery Section */}
        
        <PhotoGallery />
      
        {/* Why Choose Us Section */}
        <WhyChooseUs />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}