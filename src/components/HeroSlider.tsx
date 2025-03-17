// 'use client';

// import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';

// interface HeroSection {
//   imageUrl: string;
//   title: string;
//   subtitle: string;
// }

// interface HeroSliderProps {
//   heroSections: HeroSection[];
// }

// const settings = {
//   dots: true,
//   infinite: true,
//   speed: 800, // Smooth transition speed
//   slidesToShow: 1,
//   slidesToScroll: 1,
//   autoplay: true,
//   autoplaySpeed: 4000, // Slightly longer interval for readability
//   arrows: false, // Remove arrows for cleaner UI (optional: set to true if needed)
//   fade: true, // Fade effect for elegant transitions
//   pauseOnHover: true, // Pause on hover for user control
//   customPaging: () => (
//     <div className="w-3 h-3 bg-white rounded-full opacity-50 hover:opacity-100 transition-opacity" />
//   ), // Custom dot styling
// };

// export default function HeroSlider({ heroSections }: HeroSliderProps) {
//   return (
//     <section className="hero relative overflow-hidden">
//       <Slider {...settings} className="h-[calc(100vh-4rem)] md:h-[80vh]">
//         {heroSections.map((hs, index) => (
//           <div key={index} className="relative h-full">
//             <img
//               src={hs.imageUrl}
//               alt={hs.title}
//               className="w-full h-full object-cover brightness-75" // Slightly darken for text contrast
//               loading="lazy" // Optimize loading
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent flex items-center justify-center">
//               <div className="text-center text-white px-4 md:px-8 max-w-3xl animate-fadeIn">
//                 <h1 className="text-3xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">
//                   {hs.title}
//                 </h1>
//                 <p className="text-lg md:text-2xl mb-6 drop-shadow-md">
//                   {hs.subtitle}
//                 </p>
//                 <a
//                   href="/safari-packages"
//                   className="inline-block bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white px-6 py-3 rounded-full font-semibold shadow-lg transform hover:scale-105 transition-all duration-300"
//                 >
//                   Explore Packages
//                 </a>
//               </div>
//             </div>
//           </div>
//         ))}
//       </Slider>
//     </section>
//   );
// }

// // Optional: Add this to your global CSS (e.g., globals.css) for the fade-in animation
// /*
// @keyframes fadeIn {
//   from { opacity: 0; transform: translateY(20px); }
//   to { opacity: 1; transform: translateY(0); }
// }
// .animate-fadeIn {
//   animation: fadeIn 1s ease-out forwards;
// }
// */



'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react'; // Assuming you're using Lucide icons

interface HeroSection {
  imageUrl: string;
  title: string;
  subtitle: string;
}

interface HeroSliderProps {
  heroSections: HeroSection[];
}

export default function HeroSlider({ heroSections }: HeroSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-sliding effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSections.length);
    }, 4000); // Matches your autoplaySpeed of 4000ms

    return () => clearInterval(interval); // Cleanup on unmount
  }, [heroSections.length]);

  // Navigation functions
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSections.length) % heroSections.length);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSections.length);
  };

  return (
    <div className="relative w-full">
      <div className="relative h-[600px] w-full overflow-hidden">
        {heroSections.map((hs, index) => (
          <div
            key={index}
            className={`absolute h-full w-full transition-transform duration-500 ease-in-out ${
              index === currentSlide ? 'translate-x-0' : 'translate-x-full'
            }`}
            style={{
              transform: `translateX(${(index - currentSlide) * 100}%)`,
            }}
          >
            <img
              src={hs.imageUrl}
              alt={hs.title}
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/70">
              <div className="container mx-auto flex h-full flex-col items-center justify-center px-4 text-center text-white">
                <h2 className="mb-5 text-2xl font-bold tracking-tight">
                  {hs.title}
                </h2>
                <p className="mb-8">{hs.subtitle}</p>
                <button className="rounded-full bg-transparent px-8 py-3 text-lg font-semibold text-white transition-colors hover:bg-black">
                  Explore Packages
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/25 p-2 hover:bg-white"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6 text-gray-800" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/25 p-2 hover:bg-white"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6 text-gray-800" />
      </button>
      {/* Dots */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {heroSections.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 w-2 rounded-full transition-colors ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}