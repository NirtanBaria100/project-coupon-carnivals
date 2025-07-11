import React, { useState, useEffect, useRef } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { MagnifyingGlassIcon, ChevronDownIcon } from '@heroicons/react/24/outline'; // Removed UserIcon
import promocarnivals2Logo from '@/assets/promocarnivals2.png';
import axios from 'axios';

type Search = {
    slug: string | null,
    name: string | null,
}

const Header = () => {
    const { categories } = usePage().props;

    const [searchTerm, setSearchTerm] = useState('');
    const [storeResults, setstoreResults] = useState<Search[]>([]);
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const searchInputRef = useRef(null);
    const searchDropdownRef = useRef(null);
    const mobileMenuRef = useRef(null);
    const mobileCategoriesButtonRef = useRef(null); // Keep this if you plan to re-introduce a mobile categories button

    const staticCategories = [
        { slug: "travel", name: "Travel" },
        { slug: "home-and-garden", name: "Home & Garden" },
        { slug: "jewellery-watches", name: "Jewellery & Watches" },
        { slug: "clothing", name: "Clothing" },
        { slug: "sports", name: "Sports" },
        { slug: "arts-crafts", name: "Arts & Crafts" },
        { slug: "pet-supplies", name: "Pet Supplies" },
        { slug: "electronics", name: "Electronics" },
        { slug: "free-shipping", name: "Free Shipping" },
        { slug: "gifts", name: "Gifts" }
    ];

    const staticDesktopCategories = staticCategories; // Assuming same for both, as per previous logic

    useEffect(() => {
        const handleClickOutside = (event) => {
            // Close search dropdown if click outside search input or dropdown itself
            if (
                searchInputRef.current && !searchInputRef.current.contains(event.target) &&
                searchDropdownRef.current && !searchDropdownRef.current.contains(event.target)
            ) {
                setIsSearchFocused(false);
            }
            // Close mobile menu if click outside menu button or menu itself
            // Only relevant if a dedicated mobile menu button exists and toggles it
            if (
                mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) &&
                mobileCategoriesButtonRef.current && !mobileCategoriesButtonRef.current.contains(event.target)
            ) {
                setIsMobileMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSearchChange = (e) => {
        const searchValue = e.target.value;
        setSearchTerm(searchValue);
        if (searchValue.length > 0) {
            axios.post('/search/stores', {
                data: { searchValue: searchValue },
            }).then((res) => {
                const result = res.data.data;
                const stores = result.stores;
                setstoreResults(stores);
            }).catch(error => {
                console.error("Error fetching search results:", error);
                setstoreResults([]);
            });
        } else {
            setstoreResults([]);
        }
    };

    const handleFocus = () => {
        setIsSearchFocused(true);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && searchTerm.trim()) {
            setIsSearchFocused(false);
            // Example: Redirect to search results page
            // window.location.href = `/search?q=${encodeURIComponent(searchTerm)}`;
        }
    };

    const toggleMobileMenu = () => {
        // This toggle is usually tied to a hamburger menu button
        setIsMobileMenuOpen(prevState => !prevState);
    };

    const handleMouseEnterMobileMenuButton = () => {
        // Only open menu on hover for desktop (md breakpoint and up) if you have a hoverable mobile menu button
        if (window.innerWidth >= 768) {
            setIsMobileMenuOpen(true);
        }
    };

    const handleMouseLeaveMobileMenuArea = () => {
        // Only close menu on mouse leave for desktop (md breakpoint and up) if needed
        if (window.innerWidth >= 768) {
            setIsMobileMenuOpen(false);
        }
    };

    return (
        <header className="relative font-sans bg-white"> {/* Set explicit white background */}

            {/* Main Header Content - Logo, Search Bar, Blog/Categories Links */}
            {/* Added shadow-sm for a very subtle shadow */}
            <div className="  shadow-[0_4px_4px_-4px_rgba(0,0,0,0.2)]">
            {/* Increased py for more vertical space, subtle border-b, and shadow-sm */}
                <div className="flex px-4 md:px-6 lg:px-8 py-4 container mx-auto flex-wrap items-center justify-between gap-y-4 md:flex-nowrap">
                    {/* Left: Logo */}
                    <Link href="/" className="flex-shrink-0"> {/* Removed pr-4 md:pr-0 */}
                        <img
                            src={promocarnivals2Logo}
                            alt="Site Logo"
                            className="h-16 w-auto site_logo" // Adjusted logo height for a sleeker look
                        />
                    </Link>

                    {/* Search Bar */}
                    <div className="relative w-full md:w-auto md:flex-grow md:mx-6"> {/* Increased md:mx for more spacing */}
                        <input
                            ref={searchInputRef}
                            type="text"
                            placeholder="Search for stores and categories"
                            // No rounded-full
                            className="w-full h-10 px-3 pl-10 text-sm border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200" // Refined border and focus styles
                            style={{
                                backgroundColor: 'var(--search-input-bg, #f5f5f5)', // Added fallback for --search-input-bg
                                color: 'var(--search-input-text, #333)',
                                borderColor: 'var(--search-input-border, #e0e0e0)',
                                '--tw-ring-color': 'var(--search-input-focus-ring, #3b82f6)',
                            }}
                            value={searchTerm}
                            onChange={handleSearchChange}
                            onFocus={handleFocus}
                            onKeyPress={handleKeyPress}
                        />
                        <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" style={{ color: 'var(--search-input-placeholder, #a0a0a0)' }} /> {/* Made icon lighter */}

                        {/* Search Results Dropdown (Empty State) */}
                        {isSearchFocused && searchTerm.length === 0 && (
                            <div
                                ref={searchDropdownRef}
                                className="absolute top-full left-0 mt-2 w-full border border-gray-200 rounded-md shadow-lg z-50 py-3 text-center text-sm animate-fadeInDown" // Refined border and shadow
                                style={{
                                    backgroundColor: 'var(--search-dropdown-bg, #fff)',
                                    borderColor: 'var(--search-dropdown-border, #ddd)',
                                    color: 'var(--search-dropdown-text, #555)'
                                }}
                            >
                                Type to search...
                            </div>
                        )}
                        {/* Search Results Dropdown (Results/No Results) */}
                        {isSearchFocused && searchTerm.length > 0 && (
                            <div
                                ref={searchDropdownRef}
                                className="absolute top-full left-0 mt-2 w-full border border-gray-200 rounded-md shadow-lg z-50 py-3 text-sm animate-fadeInDown max-h-60 overflow-y-auto" // Refined border and shadow
                                style={{
                                    backgroundColor: 'var(--search-dropdown-bg, #fff)',
                                    borderColor: 'var(--search-dropdown-border, #ddd)',
                                    color: 'var(--search-dropdown-text, #555)'
                                }}
                            >
                                {storeResults.length > 0 ? (
                                    <div className="space-y-1 px-3"> {/* Reduced space-y for tighter results */}
                                        {storeResults.map((result) => (
                                            <Link
                                                key={result.slug}
                                                href={`/store/${result.slug}`}
                                                className="block px-4 py-2 text-left hover:bg-gray-50 rounded-sm" // Lighter hover, slightly rounded
                                                style={{ color: 'var(--text-default, #333)' }}
                                                onClick={() => setIsSearchFocused(false)}
                                            >
                                                {result.name}
                                            </Link>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center px-4 py-2 text-gray-500"> {/* Softer "No Result" color */}
                                        No Result Found
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Right Section: Blogs and Categories */}
                    <div className="flex items-center gap-x-4 mt-4 md:mt-0"> {/* Adjusted gap-x for more breathing room */}
                        <Link href="/all/blogs" className="font-semibold text-base whitespace-nowrap hover:text-blue-600 transition-colors duration-300" style={{ color: 'var(--text-default, #333)' }}>
                            <span className="inline-block align-middle mr-1" role="img" aria-label="blog-icon">📰</span>Blogs
                        </Link>

                        <Link href="/categories" className="font-semibold text-base whitespace-nowrap hover:text-blue-600 transition-colors duration-300" style={{ color: 'var(--text-default, #333)' }}>
                            <span className="inline-block align-middle mr-1" role="img" aria-label="categories-icon">📚</span>Categories {/* Changed icon for categories */}
                        </Link>

                        {/* Optional: User/Login Icon (if needed, otherwise remove) */}
                        {/* <Link href="/profile" className="text-gray-700 hover:text-blue-600">
                            <UserIcon className="h-6 w-6" />
                        </Link> */}
                    </div>
                </div>
            </div>

            {/* Categories Section - Cleaned up and simplified */}
            {/* Removed the border-t and shadow-sm from this div to rely only on the top section's shadow */}
            <div className="container mx-auto px-4 md:px-6 lg:px-8 py-2"> {/* Retained py-2 for vertical spacing */}
                <nav className="w-full overflow-x-auto custom-scrollbar"> {/* Removed pb-2 as it's not needed with no shadow here */}
                    <ul className="flex justify-start sm:justify-center flex-wrap gap-x-4 gap-y-2 text-sm font-medium headernav_ul"> {/* Adjusted gap-x for category links */}
                        {staticCategories.map((category) => (
                            <li key={category.slug}>
                                <Link
                                    href={`/category/${category.slug}`}
                                    className="block px-3 py-1 text-gray-700 hover:text-blue-600 transition-colors duration-200 whitespace-nowrap" // Simplified styles for a cleaner look
                                    // Removed specific background/text colors from style prop, rely on Tailwind classes and hover
                                >
                                    {category.name}
                                </Link>
                            </li>
                        ))}

                    </ul>
                </nav>
            </div>


            {/* Mobile Menu (now includes Blogs, Categories, and other links if needed) */}
            {/* This whole mobile menu is likely toggled by a hamburger icon on small screens,
                which is not currently in your provided code, but good to keep in mind. */}
            {isMobileMenuOpen && (
                <div
                    ref={mobileMenuRef}
                    className="absolute top-full left-0 right-0 mx-auto mt-2 w-[calc(100vw-2rem)] sm:max-w-lg bg-white border border-gray-200 rounded-md shadow-lg z-50 py-3 animate-fadeInDown md:hidden"
                    style={{ backgroundColor: 'var(--search-dropdown-bg, #fff)', borderColor: 'var(--search-dropdown-border, #ddd)' }}
                    onMouseLeave={handleMouseLeaveMobileMenuArea}
                >
                    <ul className="py-2">
                        <li>
                            <Link href="/all/blogs" className="block px-4 py-2 text-left hover:bg-gray-100 text-gray-700" onClick={() => setIsMobileMenuOpen(false)}>
                                <span className="inline-block align-middle mr-1" role="img" aria-label="blog-icon">📰</span>Blogs
                            </Link>
                        </li>
                        <li>
                            <Link href="/categories" className="block px-4 py-2 text-left hover:bg-gray-100 text-gray-700" onClick={() => setIsMobileMenuOpen(false)}>
                                <span className="inline-block align-middle mr-1" role="img" aria-label="categories-icon">📚</span>Categories
                            </Link>
                        </li>

                        {/* Mobile grid for categories - removed rounded-full */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 px-4 py-2 mt-2 border-t border-gray-100 pt-3">
                            {staticDesktopCategories.map((category) => (
                                <Link
                                    key={category.slug}
                                    href={`/category/${category.slug}`}
                                    className="block px-3 py-1 text-center text-sm bg-gray-50 text-gray-700 rounded-md shadow-sm hover:shadow-md hover:bg-gray-100 transition-all duration-300 whitespace-nowrap" // Adjusted button styles
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {category.name}
                                </Link>
                            ))}
                            {/* "More Categories" link for mobile */}
                            <Link
                                href="/categories"
                                className="block px-3 py-1 text-center text-sm bg-gray-50 text-gray-700 rounded-md shadow-sm hover:shadow-md hover:bg-gray-100 transition-all duration-300 whitespace-nowrap"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                More...
                            </Link>
                        </div>
                    </ul>
                </div>
            )}
        </header>
    );
};

export default Header;
