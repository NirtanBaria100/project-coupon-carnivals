// resources/js/Components/Header.jsx
import React, { useState, useEffect, useRef } from 'react';
// IMPORTANT: Change this line from 'react-router-dom' to '@inertiajs/react'
import { Link } from '@inertiajs/react';
import { UserIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchInputRef = useRef(null);
  const searchDropdownRef = useRef(null);

  const allDummyResults = [
    { id: 1, name: 'The Body Shop', type: 'Store', link: '/store/the-body-shop' },
    { id: 2, name: 'Free Shipping Offer', type: 'Offer', link: '/offer/free-shipping' },
    { id: 3, name: 'Electronics Category', type: 'Category', link: '/category/electronics' },
    { id: 4, name: 'Fashion Deals', type: 'Offer', link: '/offer/fashion-deals' },
    { id: 5, name: 'Home & Garden Store', type: 'Store', link: '/store/home-garden' },
    { id: 6, name: 'Discount Codes for XYZ', type: 'Offer', link: '/offer/xyz-discount' },
    { id: 7, name: 'Travel Vouchers', type: 'Offer', link: '/offer/travel-vouchers' },
    { id: 8, name: 'Beauty Products Sale', type: 'Offer', link: '/offer/beauty-sale' },
  ];

  useEffect(() => {
    if (searchTerm.length > 1) {
      const filtered = allDummyResults.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchInputRef.current && !searchInputRef.current.contains(event.target) &&
        searchDropdownRef.current && !searchDropdownRef.current.contains(event.target)
      ) {
        setIsSearchFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFocus = () => {
    setIsSearchFocused(true);
  };

  const handleBlur = (e) => {
    // This is handled by the useEffect for handleClickOutside now, but keeping this for robustness
    if (!searchDropdownRef.current || !searchDropdownRef.current.contains(e.relatedTarget)) {
      // setIsSearchFocused(false); // Let useEffect handle this to avoid flicker
    }
  };

  return (
    <header className="bg-white shadow-lg py-4 border-b border-gray-100">
      <div className="container mx-auto px-4">
        {/* Top Row: SIGNIN, LOGO, Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-y-4">

          {/* Left: SIGNIN with User Icon */}
          <div className="order-2 sm:order-1 flex items-center space-x-2">
            {/* Make sure /login is your actual Inertia route for sign-in */}
            <UserIcon className="h-5 w-5 text-gray-500" />
            <Link href="/login" className="text-gray-700 hover:text-blue-600 font-medium text-sm whitespace-nowrap transition-colors duration-200">SIGNIN</Link>
          </div>

          {/* Center: LOGO */}
          <div className="order-1 sm:order-2">
            <Link href="/" className="inline-block px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-extrabold text-2xl tracking-wide uppercase rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              MYLOGO
            </Link>
          </div>

          {/* Right: Search Bar with Dropdown */}
          <div className="w-full sm:w-auto relative order-3">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search for offers..."
              className="w-full sm:w-64 md:w-80 h-10 bg-gray-50 text-gray-800 px-3 pl-10 text-sm rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              value={searchTerm}
              onChange={handleSearchChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />

            {/* Search Results Dropdown */}
            {isSearchFocused && searchTerm.length > 0 && searchResults.length > 0 && (
              <div
                ref={searchDropdownRef}
                className="absolute top-full left-0 mt-2 w-full sm:w-64 md:w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50 animate-fadeInDown"
              >
                <ul className="py-2">
                  {searchResults.map((result) => (
                    <li key={result.id}>
                      <Link
                        href={result.link} // Changed to href
                        className="flex justify-between items-center px-4 py-2 hover:bg-gray-100 text-gray-800 text-sm"
                        onClick={() => {
                          setSearchTerm('');
                          setSearchResults([]);
                          setIsSearchFocused(false);
                        }}
                      >
                        <span>{result.name}</span>
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{result.type}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {isSearchFocused && searchTerm.length > 0 && searchResults.length === 0 && (
              <div
                ref={searchDropdownRef}
                className="absolute top-full left-0 mt-2 w-full sm:w-64 md:w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50 py-4 text-center text-gray-500 text-sm animate-fadeInDown"
              >
                No results found for "{searchTerm}"
              </div>
            )}
          </div>
        </div>

        {/* Separator line with "Categories" text */}
        <div className="relative py-4 my-6 text-center">
          <h2 className="text-xl font-bold text-gray-800">Explore Categories</h2>
          <p className="text-sm text-gray-500">Find the best deals by category</p>
        </div>

        {/* Categories Navigation - Horizontally scrollable on small screens */}
        <nav className="w-full overflow-x-auto custom-scrollbar pb-2">
          <ul className="flex justify-start sm:justify-center lg:justify-between gap-x-4 sm:gap-x-6 text-gray-700 font-medium text-sm">
            {/* All `to` props should be `href` */}
            <li><Link href="/category/Electronics" className="hover:text-blue-600 whitespace-nowrap px-3 py-2 rounded-md transition-colors duration-200 block bg-gray-50 hover:bg-gray-100">Electronics</Link></li>
            <li><Link href="/category/Fashion" className="hover:text-blue-600 whitespace-nowrap px-3 py-2 rounded-md transition-colors duration-200 block bg-gray-50 hover:bg-gray-100">Fashion</Link></li>
            <li><Link href="/category/Home-and-Garden" className="hover:text-blue-600 whitespace-nowrap px-3 py-2 rounded-md transition-colors duration-200 block bg-gray-50 hover:bg-gray-100">Home & Garden</Link></li>
            <li><Link href="/category/Food-and-Drink" className="hover:text-blue-600 whitespace-nowrap px-3 py-2 rounded-md transition-colors duration-200 block bg-gray-50 hover:bg-gray-100">Food & Drink</Link></li>
            <li><Link href="/category/Travel" className="hover:text-blue-600 whitespace-nowrap px-3 py-2 rounded-md transition-colors duration-200 block bg-gray-50 hover:bg-gray-100">Travel</Link></li>
            <li><Link href="/category/Health" className="hover:text-blue-600 whitespace-nowrap px-3 py-2 rounded-md transition-colors duration-200 block bg-gray-50 hover:bg-gray-100">Health</Link></li>
            <li><Link href="/category/Kitchen-and-Kitchenware" className="hover:text-blue-600 whitespace-nowrap px-3 py-2 rounded-md transition-colors duration-200 block bg-gray-50 hover:bg-gray-100">Kitchen & Kitchenware</Link></li>
            <li><Link href="/category/Beauty" className="hover:text-blue-600 whitespace-nowrap px-3 py-2 rounded-md transition-colors duration-200 block bg-gray-50 hover:bg-gray-100">Beauty</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
