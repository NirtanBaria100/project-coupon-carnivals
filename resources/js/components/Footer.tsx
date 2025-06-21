// resources/js/Components/Footer.jsx
import React from 'react';
// IMPORTANT: Change this line from 'react-router-dom' to '@inertiajs/react'
import { Link } from '@inertiajs/react';
import { FaFacebookF, FaTwitter, FaInstagram, FaTelegramPlane } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-auto">
      <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-4 sm:gap-x-8 md:gap-x-8">
        {/* Company Info */}
        <div>
          <h3 className="text-xl font-bold mb-4">LOGO</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Descriptions Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <div className="flex space-x-4 mt-4">
            {/* Social Icons - These can remain standard <a> tags as they link externally */}
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-8 h-8 bg-gray-700 hover:bg-blue-600 transition-colors duration-200 rounded-full flex items-center justify-center">
              <FaFacebookF className="h-4 w-4" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="w-8 h-8 bg-gray-700 hover:bg-blue-400 transition-colors duration-200 rounded-full flex items-center justify-center">
              <FaTwitter className="h-4 w-4" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-8 h-8 bg-gray-700 hover:bg-pink-500 transition-colors duration-200 rounded-full flex items-center justify-center">
              <FaInstagram className="h-4 w-4" />
            </a>
            <a href="https://telegram.org" target="_blank" rel="noopener noreferrer" aria-label="Telegram" className="w-8 h-8 bg-gray-700 hover:bg-sky-500 transition-colors duration-200 rounded-full flex items-center justify-center">
              <FaTelegramPlane className="h-4 w-4" />
            </a>
          </div>
        </div>
        {/* Amazing Discounts Column */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Amazing Discounts</h3>
          <ul className="space-y-2">
            {/* All `to` props should be `href` */}
            <li><Link href="#" className="text-gray-400 hover:text-white text-sm">Link 1</Link></li>
            <li><Link href="#" className="text-gray-400 hover:text-white text-sm">Link 2</Link></li>
            <li><Link href="#" className="text-gray-400 hover:text-white text-sm">Link 3</Link></li>
          </ul>
        </div>
        {/* Information Column */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Information</h3>
          <ul className="space-y-2">
            <li><Link href="#" className="text-gray-400 hover:text-white text-sm">Link A</Link></li>
            <li><Link href="#" className="text-gray-400 hover:text-white text-sm">Link B</Link></li>
            <li><Link href="#" className="text-gray-400 hover:text-white text-sm">Link C</Link></li>
          </ul>
        </div>
        {/* More From Us Column */}
        <div>
          <h3 className="text-lg font-semibold mb-4">More From Us</h3>
          <ul className="space-y-2">
            <li><Link href="#" className="text-gray-400 hover:text-white text-sm">Article X</Link></li>
            <li><Link href="#" className="text-gray-400 hover:text-white text-sm">Article Y</Link></li>
            <li><Link href="#" className="text-gray-400 hover:text-white text-sm">Article Z</Link></li>
          </ul>
        </div>
      </div>
      {/* Copyright/Disclaimer Section */}
      <div className="container mx-auto px-4 text-center text-gray-500 text-xs mt-8 border-t border-gray-700 pt-4">
        <p>&copy; {new Date().getFullYear()} Your Company Name. All rights reserved. | <Link href="#" className="hover:text-white">Disclaimer</Link> | <Link href="#" className="hover:text-white">Privacy Policy</Link></p>
      </div>
    </footer>
  );
};

export default Footer;
