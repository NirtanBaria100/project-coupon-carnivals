import React, { useState, useEffect, useRef } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { UserIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'; // UserIcon is kept
import promocarnivals2Logo from '@/assets/promocarnivals2.png'; // Import the logo directly
import axios from 'axios';

const Header = () => {
    const { categories } = usePage().props;
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const searchInputRef = useRef(null);
    const searchDropdownRef = useRef(null);

    useEffect(() => {
        if (searchTerm.length > 1) {

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
        const searchValue = e.target.value;
        axios.post('/search/blogs', {
            data: { searchValue: searchValue },
        }).then((res) => {
            const result = res.data.data;
            setSearchResults(result);
        })
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
        }
    };

    return (
        // Header background white, border light gray using CSS variables
        <header className="shadow-md py-3 font-sans" style={{ backgroundColor: 'var(--header-bg)', borderBottom: '1px solid var(--border-light)' }}>
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
                {/* Top Row: Logo, Search Bar, Blog Link, and Sign In */}
                {/* Adjusted for better mobile layout: flex-col on small, then flex-row on md */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-y-4 md:gap-x-4 pb-4 border-b border-gray-200 mb-4">
                    {/* Left: Random Placeholder Logo */}
                    <Link href="/" className="flex-shrink-0 md:mb-0"> {/* Removed mb-4 */}
                        <img
                            src={promocarnivals2Logo} // Using imported logo
                            alt="Site Logo"
                            className="h-20 w-auto" // Added w-auto to maintain aspect ratio
                        />
                    </Link>

                    {/* Right Section: Search Bar, Blog Link, and SIGNIN */}
                    {/* Adjusted for better mobile layout: order and width */}
                    <div className="flex flex-col sm:flex-row items-center gap-y-4 sm:gap-x-4 flex-grow w-full md:w-auto justify-end"> {/* Added w-full */}
                        {/* Search Bar with Dropdown - Now full width on small screens */}
                        <div className="relative w-full sm:max-w-xs md:max-w-md"> {/* Made full width on small, then max-w on sm/md */}
                            <input
                                ref={searchInputRef}
                                type="text"
                                placeholder="Search anything..."
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
                            {isSearchFocused && searchTerm.length > 0 && searchResults.length === 0 && (
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
                            {isSearchFocused && (
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

                        {/* NEW: Blog Link */}
                        {/* Added ml-auto on small screens to push it to the right if search bar takes full width */}


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
                <div className="relative pt-4 pb-2 text-center mt-4">
                    <nav className="w-full overflow-x-auto custom-scrollbar pb-2">
                        <ul className="flex justify-start sm:justify-center flex-wrap gap-2 sm:gap-3 text-sm font-medium">
                            {categories.map((category) => (
                                <li key={category.id}>
                                    <Link
                                        href={`/category/${category.slug}`}
                                        className="flex items-center px-3 py-1.5 rounded-full shadow-sm hover:shadow-md transition-all duration-300 whitespace-nowrap"
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
