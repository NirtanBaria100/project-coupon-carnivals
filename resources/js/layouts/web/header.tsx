import React, { useState, useEffect, useRef } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { UserIcon, MagnifyingGlassIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import promocarnivals2Logo from '@/assets/promocarnivals2.png';
import axios from 'axios';

const Header = () => {
    // You can now safely remove '{ categories } = usePage().props;'
    // if no other part of the Header component relies on it directly for dynamic data.
    // However, I'll leave it in for now in case it's used elsewhere that hasn't been discussed.
    const { categories } = usePage().props;

    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const searchInputRef = useRef(null);
    const searchDropdownRef = useRef(null);
    const mobileMenuRef = useRef(null);
    const mobileCategoriesButtonRef = useRef(null);

    // Define the static categories for both desktop and mobile headers
    const staticDesktopCategories = [
        { name: 'Travel', slug: 'travel' },
        { name: 'Home & Garden', slug: 'home-garden' },
        { name: 'Jewellery & Watches', slug: 'jewellery-watches' },
        { name: 'Clothing', slug: 'clothing' },
        { name: 'Sports', slug: 'sports' },
        { name: 'Arts & Crafts', slug: 'arts-crafts' },
        { name: 'Pet Supplies', slug: 'pet-supplies' },
        { name: 'Electronics', slug: 'electronics' },
        { name: 'Free Shipping', slug: 'free-shipping' },
        { name: 'Gifts', slug: 'gifts' },
    ];

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
            axios.post('/search/blogs', {
                data: { searchValue: searchValue },
            }).then((res) => {
                const result = res.data.data;
                setSearchResults(result);
            }).catch(error => {
                console.error("Error fetching search results:", error);
                setSearchResults([]);
            });
        } else {
            setSearchResults([]);
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
        // Only toggle for small screens (below md breakpoint)
        if (window.innerWidth < 768) {
            setIsMobileMenuOpen(prevState => !prevState);
        }
    };

    const handleMouseEnterMobileMenuButton = () => {
        // Open menu on hover for desktop (md breakpoint and up)
        if (window.innerWidth >= 768) {
            setIsMobileMenuOpen(true);
        }
    };

    const handleMouseLeaveMobileMenuArea = () => {
        // Close menu on mouse leave for desktop (md breakpoint and up)
        if (window.innerWidth >= 768) {
            setIsMobileMenuOpen(false);
        }
    };

    return (
        // Added 'relative' to header for absolute positioning of mobile dropdown
        // Added 'font-sans' to ensure global Poppins font is applied here
        <header className="shadow-md py-3 relative font-sans" style={{ backgroundColor: 'var(--header-bg)', borderBottom: '1px solid var(--border-light)' }}>
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
                {/* Top Row: Logo, Search Bar, Blog Link, Summer Sales, Exclusive Vouchers */}
                <div className="flex flex-wrap items-center justify-between gap-y-4 md:flex-nowrap pb-4 border-b border-gray-200 mb-4">
                    {/* Left: Logo - Always order-1 (first) */}
                    <Link href="/" className="flex-shrink-0 order-1 pr-4 md:pr-0">
                        <img
                            src={promocarnivals2Logo}
                            alt="Site Logo"
                            className="h-20 w-auto site_logo"
                        />
                    </Link>

                    {/* Search Bar */}
                    <div className="relative w-full order-last md:order-2 md:w-auto md:flex-grow md:mx-4 mt-4 md:mt-0">
                        <input
                            ref={searchInputRef}
                            type="text"
                            placeholder="Search for stores and categories"
                            className="w-full h-10 px-3 pl-10 text-sm rounded-full border focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300"
                            style={{
                                backgroundColor: 'var(--search-input-bg)',
                                color: 'var(--search-input-text)',
                                borderColor: 'var(--search-input-border)',
                                '--tw-ring-color': 'var(--search-input-focus-ring)',
                            }}
                            value={searchTerm}
                            onChange={handleSearchChange}
                            onFocus={handleFocus}
                            onKeyPress={handleKeyPress}
                        />
                        <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--search-input-placeholder)' }} />

                        {/* Search Results Dropdown (Empty State) */}
                        {isSearchFocused && searchTerm.length === 0 && (
                            <div
                                ref={searchDropdownRef}
                                className="absolute top-full left-0 mt-2 w-full border rounded-lg shadow-xl z-50 py-3 text-center text-sm animate-fadeInDown"
                                style={{
                                    backgroundColor: 'var(--search-dropdown-bg)',
                                    borderColor: 'var(--search-dropdown-border)',
                                    color: 'var(--search-dropdown-text)'
                                }}
                            >
                                Type to search...
                            </div>
                        )}
                        {/* Search Results Dropdown (Results/No Results) */}
                        {isSearchFocused && searchTerm.length > 0 && (
                            <div
                                ref={searchDropdownRef}
                                className="absolute top-full left-0 mt-2 w-full border rounded-lg shadow-xl z-50 py-3 text-sm animate-fadeInDown max-h-60 overflow-y-auto"
                                style={{
                                    backgroundColor: 'var(--search-dropdown-bg)',
                                    borderColor: 'var(--search-dropdown-border)',
                                    color: 'var(--search-dropdown-text)'
                                }}
                            >
                                {searchResults.length > 0 ? (
                                    searchResults.map((result) => (
                                        <Link
                                            key={result.slug}
                                            href={`/blog/${result.slug}`} // Assuming search results are blogs
                                            className="block px-4 py-2 text-left hover:bg-gray-100"
                                            style={{ color: 'var(--text-default)' }}
                                            onClick={() => setIsSearchFocused(false)}
                                        >
                                            {result.title}
                                        </Link>
                                    ))
                                ) : (
                                    <div className="text-center px-4 py-2 text-red-500">
                                        No Result Found
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Right Section: Blog, Summer Sales, Exclusive Vouchers */}
                    {/* Adjusted gap-x here for tighter spacing between the links */}
                    <div className="blogandcatlink flex items-center gap-x-2 flex-shrink-0 mt-4 md:mt-0"> {/* Added mt-4 for mobile spacing, removed md:gap-x-4 */}
                        <Link href="/all/blogs" className="font-medium text-sm whitespace-nowrap transition-colors duration-300" style={{ color: 'var(--text-default)' }}
                            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-accent-hover)'}
                            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-default)'}
                        >
                            <span className="inline-block align-middle mr-1" role="img" aria-label="blog-icon">📄</span>Blog
                        </Link>

                        <Link href="/categories" className="font-medium text-sm whitespace-nowrap transition-colors duration-300" style={{ color: 'var(--text-default)' }}
                            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-accent-hover)'}
                            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-default)'}
                        >
                            <span className="inline-block align-middle mr-1" role="img" aria-label="exclusive-vouchers-icon">💰</span>Categories
                        </Link>
                    </div>
                </div>

                {/* Categories Section (without heading) */}
                <div className="relative text-center mt-4">
                    <nav className="w-full overflow-x-auto custom-scrollbar pb-2">
                        <ul className="flex justify-start sm:justify-center flex-wrap gap-2 sm:gap-3 text-sm font-medium headernav_ul">
                            {categories.map((category) => (
                                <li key={category.slug}> {/* Using slug as key as there's no 'id' from a static list */}
                                    <Link
                                        href={`/category/${category.slug}`}
                                        className="flex items-center px-3 transition-all duration-300 whitespace-nowrap"
                                        style={{
                                            backgroundColor: 'var(--category-button-bg-default)',
                                            color: 'var(--category-button-text-default)'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor = 'var(--category-button-bg-hover)';
                                            e.currentTarget.style.color = 'var(--category-button-text-hover)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor = 'var(--category-button-bg-default)';
                                            e.currentTarget.style.color = 'var(--category-button-text-default)';
                                        }}
                                    >
                                        {category.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>

            {/* Mobile Categories Dropdown - Rendered OUTSIDE the .container for full width positioning */}
            {isMobileMenuOpen && (
                <div
                    ref={mobileMenuRef}
                    // Positioned relative to the <header> element now
                    // w-[calc(100vw-2rem)] ensures full width minus padding relative to viewport
                    // md:hidden ensures it only appears on small screens
                    className="absolute top-full left-0 right-0 mx-auto mt-2 w-[calc(100vw-2rem)] sm:max-w-lg bg-white border rounded-lg shadow-xl z-50 py-3 animate-fadeInDown md:hidden"
                    style={{ backgroundColor: 'var(--search-dropdown-bg)', borderColor: 'var(--search-dropdown-border)' }}
                    onMouseLeave={handleMouseLeaveMobileMenuArea} // Keep for desktop hover close behavior if needed
                >
                    <ul className="py-2">

                        <li>
                            <Link href="/blog" className="block px-4 py-2 text-left hover:bg-gray-100" style={{ color: 'var(--text-default)' }} onClick={() => setIsMobileMenuOpen(false)}>
                                <span className="inline-block align-middle mr-1" role="img" aria-label="blog-icon">📄</span>Blog
                            </Link>
                        </li>
                        <li>
                            <Link href="/summer-sales" className="block px-4 py-2 text-left hover:bg-gray-100 font-bold" style={{ color: 'var(--text-default)' }} onClick={() => setIsMobileMenuOpen(false)}>
                                <span className="inline-block align-middle mr-1" role="img" aria-label="summer-sales-icon">☀️</span>Summer Sales
                            </Link>
                        </li>
                        <li>
                            <Link href="/exclusive-vouchers" className="block px-4 py-2 text-left hover:bg-gray-100 font-bold" style={{ color: 'var(--text-default)' }} onClick={() => setIsMobileMenuOpen(false)}>
                                <span className="inline-block align-middle mr-1" role="img" aria-label="exclusive-vouchers-icon">💰</span>Exclusive Vouchers
                            </Link>
                        </li>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 px-4 py-2">
                            {/* CHANGED: Now uses staticDesktopCategories for mobile dropdown */}
                            {staticDesktopCategories.map((category) => (
                                <Link
                                    key={category.slug} // Use slug as key
                                    href={`/category/${category.slug}`}
                                    className="block px-4 py-2 text-center text-sm rounded-full shadow-sm hover:shadow-md transition-all duration-300 whitespace-nowrap"
                                    style={{
                                        backgroundColor: 'var(--category-button-bg-default)',
                                        color: 'var(--category-button-text-default)'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = 'var(--category-button-bg-hover)';
                                        e.currentTarget.style.color = 'var(--category-button-text-hover)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = 'var(--category-button-bg-default)';
                                        e.currentTarget.style.color = 'var(--category-button-text-default)';
                                    }}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {category.name}
                                </Link>
                            ))}
                        </div>
                    </ul>
                </div>
            )}
        </header>
    );
};

export default Header;
