// import Link from 'next/link'

// export default function Header() {
//   return (
//     <header className="bg-white-500 text-green p-4">
//       <nav className="container mx-auto flex justify-between items-center">
//         <Link href="/" className="text-2xl font-bold">Yala Safari</Link>
//         <div className="space-x-4">
//           <Link href="/">Home</Link>
//           <Link href="/safari-packages">Safari Packages</Link>
//           <Link href="/about">About</Link>
//           <Link href="/contact">Contact</Link>
//           <Link href="/blog">Blog</Link>
//         </div>
//       </nav>
//     </header>
//   )
// }



// 'use client';

// import { useState } from 'react';
// import Link from 'next/link';
// import { Menu, X } from 'lucide-react'; // Icons for hamburger menu

// export default function Header() {
//   const [isOpen, setIsOpen] = useState(false); // State for mobile menu toggle

//   const toggleMenu = () => setIsOpen(!isOpen);

//   return (
//     <header className="bg-black shadow-md sticky top-0 z-50">
//       <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
//         {/* Logo */}
//         <Link href="/" className="text-2xl font-bold text-green-700 hover:text-green-900 transition-colors duration-300 ml-20">
//           Yala Safari
//         </Link>

//         {/* Desktop Navigation */}
//         <div className="hidden md:flex space-x-5 items-center mr-32">
//           <Link href="/" className="text-white hover:text-green-700 font-medium transition-colors duration-300">
//             Home
//           </Link>
//           <Link href="/safari-packages" className="text-white hover:text-green-700 font-medium transition-colors duration-300">
//             Safari Packages
//           </Link>
//           <Link href="/about" className="text-white hover:text-green-700 font-medium transition-colors duration-300">
//             About
//           </Link>
//           <Link href="/contact" className="text-white hover:text-green-700 font-medium transition-colors duration-300">
//             Contact
//           </Link>
//           <Link href="/blog" className="text-white hover:text-green-700 font-medium transition-colors duration-300">
//             Blog
//           </Link>
//         </div>

//         {/* Mobile Menu Button */}
//         <button
//           className="md:hidden text-white focus:outline-none"
//           onClick={toggleMenu}
//           aria-label="Toggle menu"
//         >
//           {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//         </button>
//       </nav>

//       {/* Mobile Navigation Slider */}
//       <div
//         className={`fixed inset-y-0 right-0 w-64 bg-black/50 shadow-lg transform transition-transform duration-300 ease-in-out md:hidden z-50 ${
//           isOpen ? 'translate-x-0' : 'translate-x-full'
//         }`}
//       >
//         <div className="flex flex-col p-4 space-y-6">
//           <button
//             className="self-end text-white focus:outline-none"
//             onClick={toggleMenu}
//             aria-label="Close menu"
//           >
//             <X className="w-6 h-6" />
//           </button>
//           <Link
//             href="/"
//             className="text-white hover:text-green-700 font-medium text-lg transition-colors duration-300"
//             onClick={toggleMenu}
//           >
//             Home
//           </Link>
//           <Link
//             href="/safari-packages"
//             className="text-white hover:text-green-700 font-medium text-lg transition-colors duration-300"
//             onClick={toggleMenu}
//           >
//             Safari Packages
//           </Link>
//           <Link
//             href="/about"
//             className="text-white hover:text-green-700 font-medium text-lg transition-colors duration-300"
//             onClick={toggleMenu}
//           >
//             About
//           </Link>
//           <Link
//             href="/contact"
//             className="text-white hover:text-green-700 font-medium text-lg transition-colors duration-300"
//             onClick={toggleMenu}
//           >
//             Contact
//           </Link>
//           <Link
//             href="/blog"
//             className="text-white hover:text-green-700 font-medium text-lg transition-colors duration-300"
//             onClick={toggleMenu}
//           >
//             Blog
//           </Link>
//         </div>
//       </div>

//       {/* Overlay for Mobile Menu */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black/50 md:hidden z-40"
//           onClick={toggleMenu}
//           aria-hidden="true"
//         />
//       )}
//     </header>
//   );
// }


"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const closeMenu = () => {
    console.log("Closing menu"); // Debug log to confirm function is called
    setIsOpen(false);
  };

  // Handle link click with a slight delay to allow navigation
  const handleLinkClick = () => {
    setTimeout(closeMenu, 100); // Delay closing by 100ms to ensure navigation triggers
  };

  return (
    <header className="bg-black shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-green-700 hover:text-green-900 transition-colors duration-300 ml-4 md:ml-20">
          Yala Safari
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-5 items-center mr-8 md:mr-32">
          <Link href="/" className="text-white hover:text-green-700 font-medium transition-colors duration-300">
            Home
          </Link>
          <Link href="/safari-packages" className="text-white hover:text-green-700 font-medium transition-colors duration-300">
            Safari Packages
          </Link>
          <Link href="/about" className="text-white hover:text-green-700 font-medium transition-colors duration-300">
            About
          </Link>
          <Link href="/contact" className="text-white hover:text-green-700 font-medium transition-colors duration-300">
            Contact
          </Link>
          <Link href="/customer-reviews" className="text-white hover:text-green-700 font-medium transition-colors duration-300">
            Reviews
          </Link>
          <Link href="/blog" className="text-white hover:text-green-700 font-medium transition-colors duration-300">
            Blog
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white focus:outline-none p-2"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Navigation Slider */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/10 md:hidden z-50"
          onClick={closeMenu}
        >
          <div
            className="fixed inset-y-0 right-0 w-64 bg-black/90 shadow-lg transform transition-transform duration-300 ease-in-out"
            onClick={(e) => e.stopPropagation()} // Prevent clicks inside slider from closing it
            role="dialog"
            aria-hidden={!isOpen}
          >
            <div className="flex flex-col p-4 space-y-6">
              <button
                className="self-end text-white focus:outline-none p-2"
                onClick={closeMenu}
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
              <Link
                href="/"
                className="text-white hover:text-green-700 font-medium text-lg transition-colors duration-300"
                onClick={handleLinkClick}
              >
                Home
              </Link>
              <Link
                href="/safari-packages"
                className="text-white hover:text-green-700 font-medium text-lg transition-colors duration-300"
                onClick={handleLinkClick}
              >
                Safari Packages
              </Link>
              <Link
                href="/about"
                className="text-white hover:text-green-700 font-medium text-lg transition-colors duration-300"
                onClick={handleLinkClick}
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-white hover:text-green-700 font-medium text-lg transition-colors duration-300"
                onClick={handleLinkClick}
              >
                Contact
              </Link>
              <Link
                href="/customer-reviews"
                className="text-white hover:text-green-700 font-medium text-lg transition-colors duration-300"
                onClick={handleLinkClick}
              >
                Reviews
              </Link>
              <Link
                href="/blog"
                className="text-white hover:text-green-700 font-medium text-lg transition-colors duration-300"
                onClick={handleLinkClick}
              >
                Blog
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}