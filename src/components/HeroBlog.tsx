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

export default function HeroBlog({ heroSections }: HeroSliderProps) {
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
            className={`absolute h-full w-full transition-transform duration-500 ease-in-out ${index === currentSlide ? 'translate-x-0' : 'translate-x-full'
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
                <h5 className="mb-4 text-4xl font-bold tracking-tight">
                  {/* {hs.title} */}
                  Yala Blogs
                </h5>
                {/* <p className="mb-8 font-bold">Contact Us</p> */}
                {/* <button className="rounded-full bg-transparent px-8 py-3 text-lg font-semibold text-white transition-colors hover:bg-black">
                  Explore Packages
                </button> */}
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
            className={`h-2 w-2 rounded-full transition-colors ${index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}