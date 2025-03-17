// export default function Footer() {
//     return (
//       <footer className="bg-gray-800 text-white p-4 text-center">
//         <p>© 2023 Yala Safari Jeep Service. All rights reserved.</p>
//       </footer>
//     )
//   }



'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail, ArrowRight } from 'lucide-react';

const companyLinks = [
  { name: 'About Us', href: '/about' },
  { name: 'Our Team', href: '/team' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact Us', href: '/contact' },
];

const safariLinks = [
  { name: 'Safari Packages', href: '/safari-packages' },
  { name: 'Yala National Park', href: '/yala-park' },
  { name: 'Booking Info', href: '/booking' },
  { name: 'FAQs', href: '/faqs' },
];

const socialLinks = [
  { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/yala-safari' },
  { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/yala-safari' },
  { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/yala-safari' },
];

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log('Subscribed with:', email); // Replace with actual subscription logic
    setEmail('');
  };

  return (
    <footer className="bg-black text-gray-300">
      {/* Newsletter Section */}
      {/* <div className="border-b border-gray-800">
        <div className="container mx-auto px-4 py-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold text-white mb-2">Stay in the Wild</h3>
            <p className="text-gray-400">Subscribe for safari updates and exclusive offers</p>
          </div>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="px-4 py-3 bg-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-600 w-full sm:w-80"
              required
            />
            <button
              type="submit"
              className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center transition-colors duration-300"
            >
              Subscribe <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </form>
        </div>
      </div> */}

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand & Contact */}
        <div>
          <Link href="/" className="text-2xl font-bold text-green-600 hover:text-green-700 transition-colors duration-300">
            Yala Safari
          </Link>
          <p className="text-gray-400 mt-4 mb-6">
            Your gateway to unforgettable safari adventures in Yala National Park.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-green-600" />
              <span>Yala National Park, Sri Lanka</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-green-600" />
              <span>+94 123 456 789</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-green-600" />
              <span>info@yalasafari.lk</span>
            </div>
          </div>
        </div>

        {/* Company Links */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-6">Company</h4>
          <ul className="space-y-4">
            {companyLinks.map(({ name, href }) => (
              <li key={name}>
                <Link href={href} className="hover:text-green-600 transition-colors duration-300">
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Safari Links */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-6">Safari</h4>
          <ul className="space-y-4">
            {safariLinks.map(({ name, href }) => (
              <li key={name}>
                <Link href={href} className="hover:text-green-600 transition-colors duration-300">
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Social & Legal */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-6">Connect With Us</h4>
          <div className="flex gap-4 mb-6">
            {socialLinks.map(({ name, icon: Icon, href }) => (
              <Link
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-gray-800 transition-colors duration-300"
              >
                <Icon className="h-5 w-5 text-green-600" />
              </Link>
            ))}
          </div>
          <ul className="space-y-4">
            <li>
              <Link href="/privacy" className="hover:text-green-600 transition-colors duration-300">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-green-600 transition-colors duration-300">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-6 text-center">
        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} Yala Safari Jeep Service. All rights reserved.
        </p>
      </div>
    </footer>
  );
}