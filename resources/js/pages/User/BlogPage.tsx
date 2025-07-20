// src/components/BlogPage.jsx
import PageMeta from '@/components/PageMeta';
import WebLayout from '@/layouts/web-layout';
import { excerptFromHtml } from '@/lib/excerptFromHtml';
import { Link } from '@inertiajs/react';
import { useMemo, useState } from 'react';
interface Blog {
    title: string | null;
    slug: string | null;
    author: { name: string; } | null; // Assuming author is an object with a name property
    date: string | null;
    imageURL: string | null;
    category: { name: string; slug: string; } | null; // Assuming category is an object with name and slug
    content:any
}

// Updated interface to reflect Inertia's pagination structure
interface PaginatedBlogs {
    data: Blog[]; // The actual array of blog posts
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
    current_page: number;
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}
interface SingleCategory {
    name: string | '',
    id: number,
    slug: string | null,
  
}
interface Props {
    blogs: PaginatedBlogs;
    popularCategories:SingleCategory[]
}

const BlogPage = ({ blogs ,popularCategories}: Props) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('date'); // 'offers' or 'name'
    // console.log({blogs})
    // Use blogs.data for filtering and sorting
        const filteredAndSortedBlogs = useMemo(() => {
        let filtered = [...blogs.data];

        // 🔎 search
        if (searchTerm) {
            filtered = filtered.filter((b) =>
            (b.title || "").toLowerCase().includes(searchTerm.toLowerCase())
            );
        }



        // ↕ sort
        if (sortOrder === "name") {
            filtered.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
        } else if (sortOrder === "date") {
            filtered.sort((a, b) => (b.date || "").localeCompare(a.date || ""));
        }

        // ✂️ add excerpt (first 150 chars – tweak as needed)
        return filtered.map((b) => ({
            ...b,
            excerpt: excerptFromHtml(b.content, 150),
        }));
        }, [blogs.data, searchTerm, sortOrder]);


   

    return (
        <WebLayout>
            
            <PageMeta title={"Blogs - Promo Carnivals"} description={""} keywords={""} />
            <div className="pb-12 font-sans" style={{ backgroundColor: 'var(--page-bg)' }}>
                <div className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
                    {/* Breadcrumbs */}
                    <nav className="mb-6 text-sm">
                        <Link
                            href="/"
                            className="transition-colors duration-300"
                            style={{ color: 'var(--text-muted)' }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-accent-hover)')}
                            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                        >
                            Home
                        </Link>
                        <span className="mx-2" style={{ color: 'var(--breadcrumb-separator-color)' }}>
                            &gt;
                        </span>
                        <span className="font-semibold" style={{ color: 'var(--main-heading-color)' }}>
                            All Blogs
                        </span>
                    </nav>

                    {/* Page Header */}
                    <div
                        className="mb-10 rounded-lg border p-6 text-center shadow-lg sm:p-8"
                        style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}
                    >
                        <h1 className="mb-3 text-3xl font-extrabold leading-tight sm:text-4xl" style={{ color: 'var(--main-heading-color)' }}>
                            PromoCarnivals Blogs {/* This still says "Our Partner Stores", should it be "Our Blogs"? */}
                        </h1>

                        <div
                        className="mb-0 flex flex-col items-center justify-between gap-4 rounded-lg  p-2  md:flex-row"
                        style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}
                    >
                        <div className="relative w-full ">
                            <input
                                type="text"
                                placeholder="Search blogs by title ..."
                                className="w-full rounded-md border px-4 py-2 focus:border-transparent focus:ring-2 focus:outline-none"
                                style={{
                                    backgroundColor: 'var(--form-input-bg)',
                                    color: 'var(--form-input-text)',
                                    borderColor: 'var(--form-input-border)',
                                }}
                                onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--primary-orange)')}
                                onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--form-input-border)')}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <button
                                className="absolute right-0 top-0 mr-3 mt-2"
                                style={{ color: 'var(--search-icon-color)' }}
                                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--primary-orange)')}
                                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--search-icon-color)')}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path
                                        fillRule="evenodd"
                                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                        </div>

                    </div>
                    </div>

                    {/* Filters and Search Bar */}


                    {/* Blog Posts Grid */}
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {filteredAndSortedBlogs.map((post, i) => (
                            <div
                                key={i}
                                className="overflow-hidden rounded-lg border shadow-md transition-shadow duration-300 hover:shadow-xl"
                                style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}
                            >
                                <Link href={`/blog/${post.slug}`}>
                                    <img src={post.imageURL || ''} alt={post.title || ''} className="h-48 w-full object-cover" />
                                </Link>
                                <div className="p-5">
                                    <div className="mb-2 text-xs font-semibold uppercase" style={{ color: 'var(--primary-orange)' }}>
                                        <Link href={`/blogs/category/${post.category?.slug || ''}`} className="hover:underline">
                                            {post.category?.name || ''}
                                        </Link>
                                    </div>
                                    <h3 className="mb-3 text-xl font-bold leading-snug" style={{ color: 'var(--heading-color)' }}>
                                        <Link
                                            href={`/blog/${post.slug}`}
                                            className="transition-colors duration-300"
                                            style={{ color: 'var(--heading-color)' }}
                                            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-accent-hover)')}
                                            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--heading-color)')}
                                        >
                                            {post.title}
                                        </Link>
                                    </h3>
                                        <p className="text-sm  mb-3">
                                            {post.excerpt}
                                        </p>

                                    <div className="flex items-center justify-between text-xs" style={{ color: 'var(--text-)' }}>
                                        <span>By {post.author?.name.toUpperCase() || ''}</span> {/* Used optional chaining for author.name */}
                                        <span>{post.date}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Inertia.js Pagination */}
                    {blogs.links && blogs.links.length > 3 && ( // Check for actual links array and filter out simple "prev" and "next" if total is small
                        <div className="mt-12 flex justify-center">
                            <nav className="flex space-x-2" aria-label="Pagination">
                                {blogs.links.map((link, index) => (
                                    <Link
                                        key={index}
                                        href={link.url || '#'} // Use '#' if url is null (for prev/next when not available)
                                        className={`relative inline-flex items-center rounded-md px-4 py-2 text-sm font-medium transition-colors duration-200 ${link.active
                                            ? 'bg-primary-orange border-primary-orange text-neutral-white' // Active link styles
                                            : 'bg-neutral-white border-card-border text-text-muted' // Inactive link styles
                                            }`}
                                        style={{
                                            backgroundColor: link.active ? 'var(--primary-orange)' : 'var(--neutral-white)',
                                            color: link.active ? 'var(--neutral-white)' : 'var(--text-muted)',
                                            border: `1px solid ${link.active ? 'var(--primary-orange)' : 'var(--card-border)'}`,
                                        }}
                                        onMouseEnter={(e) =>
                                            !link.active && (e.currentTarget.style.backgroundColor = 'var(--card-border)')
                                        }
                                        onMouseLeave={(e) =>
                                            !link.active && (e.currentTarget.style.backgroundColor = 'var(--neutral-white)')
                                        }
                                        dangerouslySetInnerHTML={{ __html: link.label }} // Render HTML entities like &laquo; and &raquo;
                                        preserveScroll // Keeps scroll position on pagination click
                                    />
                                ))}
                            </nav>
                        </div>
                    )}
                   
                </div>
            </div>

        </WebLayout>
    );
};

export default BlogPage;
