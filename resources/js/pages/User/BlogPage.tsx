// src/components/BlogPage.jsx
import React, { useMemo, useState } from 'react';
import { Link } from '@inertiajs/react';
import WebLayout from '@/layouts/web-layout';

interface Blogs {
    title: string | null,
    slug: string | null,
    author: [],
    date: string | null,
    imageURL: string | null,
    category: [],
}
interface Props {
    blogs: Blogs[]
}
const BlogPage = ({ blogs }: Props) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('date'); // 'offers' or 'name'
    const filteredAndSortedStores = useMemo(() => {
        let filtered = [...blogs]; // Create a copy to avoid mutating the original prop

        // Filter by search term
        if (searchTerm) {
            filtered = filtered.filter(store =>
                store.title?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        // Sort
        if (sortOrder === 'name') {
            filtered.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
        }
        return filtered;
    }, [blogs, searchTerm, sortOrder]);
    return (
        <WebLayout>
            <div className="pb-12 font-sans" style={{ backgroundColor: 'var(--page-bg)' }}>
                <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8">
                    {/* Breadcrumbs */}
                    <nav className="text-sm mb-6">
                        <Link
                            href="/"
                            className="transition-colors duration-300"
                            style={{ color: 'var(--text-muted)' }}
                            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-accent-hover)'}
                            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
                        >
                            Home
                        </Link>
                        <span className="mx-2" style={{ color: 'var(--breadcrumb-separator-color)' }}>&gt;</span>
                        <span className="font-semibold" style={{ color: 'var(--main-heading-color)' }}>All Blogs</span>
                    </nav>

                    {/* Page Header */}

                    {/* Page Header */}
                    <div
                        className="p-6 sm:p-8 rounded-lg shadow-lg border mb-10 text-center"
                        style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}
                    >
                        <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 leading-tight" style={{ color: 'var(--main-heading-color)' }}>
                            Our Partner Stores
                        </h1>
                        <p className="text-base sm:text-lg" style={{ color: 'var(--text-muted)' }}>
                            Discover thousands of stores offering amazing deals, coupons, and discounts.
                        </p>
                    </div>

                    {/* Filters and Search Bar */}
                    <div
                        className="p-5 rounded-lg shadow-md border mb-8 flex flex-col md:flex-row items-center justify-between gap-4"
                        style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}
                    >
                        <div className="w-full md:w-1/2 relative">
                            <input
                                type="text"
                                placeholder="Search stores by name ..."
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent"
                                style={{
                                    backgroundColor: 'var(--form-input-bg)',
                                    color: 'var(--form-input-text)',
                                    borderColor: 'var(--form-input-border)',
                                }}
                                onFocus={(e) => e.currentTarget.style.borderColor = 'var(--primary-orange)'}
                                onBlur={(e) => e.currentTarget.style.borderColor = 'var(--form-input-border)'}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <button
                                className="absolute right-0 top-0 mt-2 mr-3"
                                style={{ color: 'var(--search-icon-color)' }}
                                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary-orange)'}
                                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--search-icon-color)'}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">


                            {/* Sort By */}
                            <div className="relative w-full sm:w-auto">
                                <select
                                    className="block appearance-none w-full border py-2 px-4 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:ring-2"
                                    style={{
                                        backgroundColor: 'var(--form-input-bg)',
                                        borderColor: 'var(--form-input-border)',
                                        color: 'var(--form-input-text)',
                                    }}
                                    onFocus={(e) => e.currentTarget.style.borderColor = 'var(--primary-orange)'}
                                    onBlur={(e) => e.currentTarget.style.borderColor = 'var(--form-input-border)'}
                                    value={sortOrder}
                                    onChange={(e) => setSortOrder(e.target.value)}
                                >

                                    <option value="name">Sort by Name (A-Z)</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2" style={{ color: 'var(--form-input-text)' }}>
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Blog Posts Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredAndSortedStores.map((post, i) => (
                            <div
                                key={i}
                                className="rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border"
                                style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}
                            >
                                <Link href={`/blog/${post.slug}`}>
                                    <img src={post.imageURL || ''} alt={post.title || ""} className="w-full h-48 object-cover" />
                                </Link>
                                <div className="p-5">
                                    <div className="text-xs font-semibold uppercase mb-2" style={{ color: 'var(--primary-orange)' }}>
                                        <Link
                                            href={`/blogs/category/${post.category.slug || ""}`}
                                            className="hover:underline"
                                        >
                                            {post.category.name || ""}
                                        </Link>
                                    </div>
                                    <h3 className="text-xl font-bold mb-3 leading-snug" style={{ color: 'var(--heading-color)' }}>
                                        <Link
                                            href={`/blog/${post.slug}`}
                                            className="transition-colors duration-300"
                                            style={{ color: 'var(--heading-color)' }}
                                            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-accent-hover)'}
                                            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--heading-color)'}
                                        >
                                            {post.title}
                                        </Link>
                                    </h3>
                                    <p className="text-sm mb-4 line-clamp-3" style={{ color: 'var(--text-muted)' }}>Tsete</p>
                                    <div className="flex justify-between items-center text-xs" style={{ color: 'var(--text-muted)' }}>
                                        <span>By {post.author.name.toUpperCase() || ""}</span>
                                        <span>{post.date}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination (Dummy) */}
                    <div className="flex justify-center mt-12">
                        <nav className="flex space-x-2" aria-label="Pagination">
                            <a
                                href="#"
                                className="relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200"
                                style={{
                                    color: 'var(--text-muted)',
                                    backgroundColor: 'var(--neutral-white)',
                                    border: '1px solid var(--card-border)'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--card-border)'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--neutral-white)'}
                            >
                                Previous
                            </a>
                            <a
                                href="#"
                                className="relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200"
                                style={{
                                    color: 'var(--neutral-white)',
                                    backgroundColor: 'var(--primary-orange)',
                                    border: '1px solid var(--primary-orange)'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--button-hover-orange)'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--primary-orange)'}
                            >
                                1
                            </a>
                            <a
                                href="#"
                                className="relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200"
                                style={{
                                    color: 'var(--text-muted)',
                                    backgroundColor: 'var(--neutral-white)',
                                    border: '1px solid var(--card-border)'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--card-border)'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--neutral-white)'}
                            >
                                2
                            </a>
                            <a
                                href="#"
                                className="relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200"
                                style={{
                                    color: 'var(--text-muted)',
                                    backgroundColor: 'var(--neutral-white)',
                                    border: '1px solid var(--card-border)'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--card-border)'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--neutral-white)'}
                            >
                                3
                            </a>
                            <a
                                href="#"
                                className="relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200"
                                style={{
                                    color: 'var(--text-muted)',
                                    backgroundColor: 'var(--neutral-white)',
                                    border: '1px solid var(--card-border)'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--card-border)'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--neutral-white)'}
                            >
                                Next
                            </a>
                        </nav>
                    </div>
                </div>
            </div>
        </WebLayout>
    );
};

export default BlogPage;
