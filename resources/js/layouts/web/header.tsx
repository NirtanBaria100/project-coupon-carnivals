import React, { useState, useEffect, useRef } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { MagnifyingGlassIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import promocarnivals2Logo from '@/assets/promocarnivals2.png';
import axios from 'axios';
import { MenuIcon, SidebarCloseIcon, ToggleLeftIcon } from 'lucide-react';

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
    const [isMobileCategoriesOpen, setIsMobileCategoriesOpen] = useState(false); // NEW

    const searchInputRef = useRef(null);
    const searchDropdownRef = useRef(null);
    const mobileMenuRef = useRef(null);
    const mobileCategoriesButtonRef = useRef(null);

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

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                searchInputRef.current && !searchInputRef.current.contains(event.target) &&
                searchDropdownRef.current && !searchDropdownRef.current.contains(event.target)
            ) {
                setIsSearchFocused(false);
            }
            if (
                mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) &&
                mobileCategoriesButtonRef.current && !mobileCategoriesButtonRef.current.contains(event.target)
            ) {
                setIsMobileMenuOpen(false);
                setIsMobileCategoriesOpen(false);
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
            // window.location.href = `/search?q=${encodeURIComponent(searchTerm)}`;
        }
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(prev => !prev);
    };

    const toggleMobileCategories = () => {
        setIsMobileCategoriesOpen(prev => !prev);
    };

    return (
        <header className="relative font-sans bg-white shadow-sm">
            <div className="shadow-sm">
                <div className="flex px-4 md:px-6 lg:px-8 py-4 container mx-auto flex-wrap items-center justify-between gap-y-4 md:flex-nowrap">
                    <div className="flex justify-between w-full md:w-auto">
                        <Link href="/" className="flex-shrink-0">
                            <img
                                src={promocarnivals2Logo}
                                alt="Site Logo"
                                className="h-16 w-auto site_logo"
                            />
                        </Link>
                        <button
                            ref={mobileCategoriesButtonRef}
                            className="md:hidden font-semibold text-end text-base text-gray-700 hover:text-orange-600 transition duration-300"
                            onClick={toggleMobileCategories}
                        > {isMobileCategoriesOpen ? <SidebarCloseIcon className="w-6 h-6 inline ml-1" /> : <MenuIcon className="w-6 h-6 inline ml-1" />}
                        </button>
                    </div>

                    <div className="relative w-full md:w-auto md:flex-grow md:mx-6">
                        <input
                            ref={searchInputRef}
                            type="text"
                            placeholder="Search for stores and categories"
                            className="w-full h-10 px-3 pl-10 text-sm border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                            style={{
                                backgroundColor: 'var(--search-input-bg, #f5f5f5)',
                                color: 'var(--search-input-text, #333)',
                                borderColor: 'var(--search-input-border, #e0e0e0)',
                                '--tw-ring-color': 'var(--search-input-focus-ring, #3b82f6)',
                            }}
                            value={searchTerm}
                            onChange={handleSearchChange}
                            onFocus={handleFocus}
                            onKeyPress={handleKeyPress}
                        />
                        <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

                        {isSearchFocused && searchTerm.length === 0 && (
                            <div
                                ref={searchDropdownRef}
                                className="absolute top-full left-0 mt-2 w-full border border-gray-200 rounded-md shadow-lg z-50 py-3 text-center text-sm animate-fadeInDown"
                                style={{
                                    backgroundColor: 'var(--search-dropdown-bg, #fff)',
                                    borderColor: 'var(--search-dropdown-border, #ddd)',
                                    color: 'var(--search-dropdown-text, #555)'
                                }}
                            >
                                Type to search...
                            </div>
                        )}
                        {isSearchFocused && searchTerm.length > 0 && (
                            <div
                                ref={searchDropdownRef}
                                className="absolute top-full left-0 mt-2 w-full border border-gray-200 rounded-md shadow-lg z-50 py-3 text-sm animate-fadeInDown max-h-60 overflow-y-auto"
                                style={{
                                    backgroundColor: 'var(--search-dropdown-bg, #fff)',
                                    borderColor: 'var(--search-dropdown-border, #ddd)',
                                    color: 'var(--search-dropdown-text, #555)'
                                }}
                            >
                                {storeResults.length > 0 ? (
                                    <div className="space-y-1 px-3">
                                        {storeResults.map((result) => (
                                            <Link
                                                key={result.slug}
                                                href={`/store/${result.slug}`}
                                                className="block px-4 py-2 text-left hover:bg-gray-50 rounded-sm"
                                                style={{ color: 'var(--text-default, #333)' }}
                                                onClick={() => setIsSearchFocused(false)}
                                            >
                                                {result.name}
                                            </Link>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center px-4 py-2 text-gray-500">
                                        No Result Found
                                    </div>
                                )}
                            </div>
                        )}

                    </div>

                    <div className="flex items-center justify-center w-60 gap-x-4  md:mt-0 hd_blogandcat">
                        <Link href="/all/blogs" className="font-semibold text-base whitespace-nowrap hover:text-orange-600 transition-colors duration-300">
                            📰 Blogs
                        </Link>

                        {/* Show this only on desktop */}
                        <Link
                            href="/categories"
                            className=" md:inline font-semibold text-base hover:text-orange-600 transition-colors duration-300"
                        >
                            🏷️ Categories
                        </Link>

                        {/* Toggle button visible only on mobile */}

                    </div>

                </div>
            </div>

            {/* Desktop Categories */}
            <div className="hidden md:block container mx-auto px-4 md:px-6 lg:px-8 py-2">
                <nav className="w-full overflow-x-auto custom-scrollbar">
                    <ul className="flex justify-start sm:justify-center flex-wrap gap-x-4 gap-y-2 text-sm font-medium headernav_ul">
                        {staticCategories.map((category) => (
                            <li key={category.slug}>
                                <Link
                                    href={`/category/${category.slug}`}
                                    className="block px-3 py-1 text-gray-700 hover:text-blue-600 transition-colors duration-200 whitespace-nowrap"
                                >
                                    {category.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>

            {/* Mobile Categories Toggle Section */}
            {isMobileCategoriesOpen && (
                <div className="block md:hidden px-4 py-2 bg-white border-t border-gray-100 animate-fadeInDown">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">

                        {staticCategories.map((category) => (
                            <Link
                                key={category.slug}
                                href={`/category/${category.slug}`}
                                className="block px-3 py-1 text-[13px] bg-gray-50 text-gray-700 rounded-md shadow-sm hover:shadow-md hover:bg-gray-100 transition-all duration-300 whitespace-nowrap"
                                onClick={() => setIsMobileCategoriesOpen(false)}
                            >
                                {category.name}
                            </Link>
                        ))}

                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
