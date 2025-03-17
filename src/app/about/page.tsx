import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HeroAbout from "@/components/HeroAbout";
import HeroSlider from "@/components/HeroSlider";
import prisma from "@/lib/prisma";
import { Link } from "lucide-react";


async function fetchData() {
  const packages = await prisma.package.findMany();
  const heroSections = await prisma.heroSection.findMany();
  return { packages, heroSections };
}

export default async function About() {
  const { packages, heroSections } = await fetchData();
  return (
    <>
      <Header />
      <main className="bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 min-h-screen">
        {/* Hero Section */}
        
          {/* <div className="container mx-auto px-4 md:px-0 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 animate-fadeIn tracking-tight">
              About Yala Safari
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Discover the wild heart of Sri Lanka with unforgettable safari adventures in Yala National Park.
            </p>
          </div> */}
       <HeroAbout heroSections={heroSections} />
       

        {/* Yala National Park Description */}
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-green-700 dark:text-green-500 mb-6">
                  Yala National Park
                </h2>
                <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  Nestled in the southeast of Sri Lanka, Yala National Park is a biodiversity hotspot renowned for its rich wildlife and stunning landscapes. Spanning over 979 square kilometers, it’s home to one of the highest leopard densities in the world, alongside elephants, sloth bears, crocodiles, and over 200 species of birds. The park’s diverse ecosystems—ranging from dense jungles to coastal lagoons—offer a breathtaking backdrop for safari adventures.
                </p>
                <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  Whether you’re captivated by the roar of a leopard or the serene beauty of a sunset over the savannah, Yala promises an immersive experience into nature’s wonders.
                </p>
              </div>
              <div className="relative h-64 md:h-96 rounded-xl overflow-hidden shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1553524082-82690780f842?w=1000&auto=format&fit=crop&q=60"
                  alt="Yala National Park"
                  className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Our Services */}
        <section className="bg-black text-white py-16">
          <div className="container mx-auto px-4 md:px-0">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-green-500 mb-12">
              Our Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 bg-gray-900 rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300">
                <h3 className="text-2xl font-semibold mb-4">Custom Safari Packages</h3>
                <p className="text-gray-300 leading-relaxed">
                  From half-day excursions to multi-day adventures, we tailor our safari packages to suit every traveler—whether you’re a solo explorer, a family, or a group of friends.
                </p>
              </div>
              <div className="p-6 bg-gray-900 rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300">
                <h3 className="text-2xl font-semibold mb-4">Expert Guided Tours</h3>
                <p className="text-gray-300 leading-relaxed">
                  Our passionate and knowledgeable guides bring Yala to life, sharing insights about the park’s wildlife, history, and conservation efforts while ensuring your safety.
                </p>
              </div>
              <div className="p-6 bg-gray-900 rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300">
                <h3 className="text-2xl font-semibold mb-4">Luxury Jeep Safaris</h3>
                <p className="text-gray-300 leading-relaxed">
                  Explore Yala in comfort with our well-equipped, spacious jeeps, designed to provide the best views and a smooth ride through the park’s rugged terrain.
                </p>
              </div>
            </div>
            <div className="text-center mt-12">
              <Link
                href="/safari-packages"
                className="inline-block bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white px-8 py-3 rounded-full font-semibold shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                Explore Our Packages
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}