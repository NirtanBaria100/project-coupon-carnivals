// src/components/BlogPage.jsx
import React from 'react';
import { Link } from '@inertiajs/react';
import WebLayout from '@/layouts/web-layout';

interface Blogs {
    title: string | null,
    slug: string | null,
    created_at : string | null,
    category: [],
}
interface Props {
    blogs: Blogs[]
}
const BlogPage = ({ blogs }: Props) => {
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
                    <div
                        className="p-6 sm:p-8 rounded-lg shadow-lg border mb-10 text-center"
                        style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}
                    >
                        <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 leading-tight" style={{ color: 'var(--main-heading-color)' }}>
                            Our Latest Blog Posts
                        </h1>
                        <p className="text-base sm:text-lg" style={{ color: 'var(--text-muted)' }}>
                            Stay updated with the best saving tips, deal guides, and shopping hacks from our experts.
                        </p>
                    </div>

                    {/* Blog Posts Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blogs.map((post, i) => (
                            <div
                                key={i}
                                className="rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border"
                                style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}
                            >
                                <Link href={`/blog/${post.slug}`}>
                                    <img src={'https://picsum.photos/id/1020/400/250'} alt={post.title} className="w-full h-48 object-cover" />
                                </Link>
                                <div className="p-5">
                                    <div className="text-xs font-semibold uppercase mb-2" style={{ color: 'var(--primary-orange)' }}>
                                        <Link
                                            href={`/blogs/category/${post.category.slug}`}
                                            className="hover:underline"
                                        >
                                            {post.category.name}
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
                                        <span>By "Admin"</span>
                                        <span>{post.created_at}</span>
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
