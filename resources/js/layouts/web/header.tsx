import React, { useState, useEffect, useRef } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { UserIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import promocarnivals2Logo from '@/assets/promocarnivals2.png';
import axios from 'axios';

const Header = () => {
    const { categories } = usePage().props;
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const searchInputRef = useRef(null);
    const searchDropdownRef = useRef(null);

    useEffect(() => {
        // This useEffect seems to be partially redundant with handleSearchChange
        // if (searchTerm.length > 1) {
        //     // axios.post('/search/blogs', { data: { searchValue: searchTerm } }).then((res) => {
        //     //     setSearchResults(res.data.data);
        //     // });
        // } else {
        //     setSearchResults([]);
        // }
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
        const searchValue = e.target.value;
        setSearchTerm(searchValue);
        if (searchValue.length > 0) { // Fetch results only if there's a search term
            axios.post('/search/blogs', {
                data: { searchValue: searchValue },
            }).then((res) => {
                const result = res.data.data;
                setSearchResults(result);
            }).catch(error => {
                console.error("Error fetching search results:", error);
                setSearchResults([]); // Clear results on error
            });
        } else {
            setSearchResults([]); // Clear results if search term is empty
        }
    };

    const handleFocus = () => {
        setIsSearchFocused(true);
    };

    const handleBlur = () => {
        // Handled by handleClickOutside for robustness.
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && searchTerm.trim()) {
            setIsSearchFocused(false);
            // Optionally, navigate to a search results page here
            // window.location.href = `/search?q=${encodeURIComponent(searchTerm)}`;
        }
    };

    return (
        <header className="shadow-md py-3 font-sans" style={{ backgroundColor: 'var(--header-bg)', borderBottom: '1px solid var(--border-light)' }}>
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
                {/* Top Row: Logo, Search Bar, Blog Link, Summer Sales, Exclusive Vouchers */}
                {/* Adjusted gap-x for tighter spacing and ensured search bar can grow */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-y-4 md:gap-x-2 pb-4 border-b border-gray-200 mb-4"> {/* Changed md:gap-x-4 to md:gap-x-2 */}
                    {/* Left: Logo */}
                    <Link href="/" className="flex-shrink-0">
                        <img
                            src={promocarnivals2Logo}
                            alt="Site Logo"
                            className="h-20 w-auto site_logo"
                        />
                    </Link>

                    {/* Middle: Search Bar */}
                    {/* Removed md:max-w-md and added flex-grow for more width */}
                    <div className="relative flex-grow w-full"> {/* Removed mx-4 for now, let flex-grow handle it */}
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
                            onBlur={handleBlur}
                            onKeyPress={handleKeyPress}
                        />
                        <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--search-input-placeholder)' }} />

                        {/* Search Results Dropdown */}
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
                                            href={`/blog/${result.slug}`}
                                            className="block px-4 py-2 text-left"
                                            style={{ color: 'var(--text-default)' }}
                                            onMouseEnter={(e) =>
                                                (e.currentTarget.style.backgroundColor =
                                                    'var(--search-result-hover-bg)')
                                            }
                                            onMouseLeave={(e) =>
                                                (e.currentTarget.style.backgroundColor = 'transparent')
                                            }
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

                        {/* ORIGINAL: SIGNIN with User Icon - UNCOMMENTED AND KEPT AS PER PREVIOUS INSTRUCTION */}
                        {/* <div className="flex-shrink-0 flex items-center space-x-1">
                            <UserIcon className="h-5 w-5" style={{ color: 'var(--icon-default)' }} />
                            <Link
                                href="/signin"
                                className="font-medium text-sm whitespace-nowrap transition-colors duration-300"
                                style={{ color: 'var(--text-default)' }}
                                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-accent-hover)'}
                                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-default)'}
                            >
                                SIGNIN
                            </Link>
                        </div> */}
                    </div>
                </div>

                {/* Categories Section (without heading) */}
                <div className="relative text-center mt-4">
                    <nav className="w-full overflow-x-auto custom-scrollbar pb-2">
                        <ul className="flex justify-start sm:justify-center flex-wrap gap-2 sm:gap-3 text-sm font-medium headernav_ul">
                            {categories.map((category) => (
                                <li key={category.id}>
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
        </header>
    );
};

export default Header;
