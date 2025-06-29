// src/components/SingleBlogPage.jsx
import React from "react";
import { Link } from "@inertiajs/react";
import WebLayout from "@/layouts/web-layout";

interface Post {
    title: string | null,
    content: string | null,
    imageURL: string | null,
    date: string | null,
    author: string | null,
}
interface RecentPost {
    title: string | null,
    slug: string | null,
    id: number | null
}
interface Category {
    name: string | null,
    slug: string | null,
    id: number | null
}
interface Props {
    post: Post[],
    recentPost: RecentPost[],
    categories: Category[]
}
const SingleBlog = ({ post, categories, recentPost }: Props) => {
    console.log(post);

    return (
        <WebLayout>
            <div
                className="pb-12 font-sans"
                style={{ backgroundColor: "var(--page-bg)" }}
            >
                <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8">
                    {/* Breadcrumbs */}
                    <nav className="text-sm  mb-6">
                        <Link
                            href="/"
                            className="transition-colors duration-300"
                            style={{ color: "var(--text-muted)" }}
                            onMouseEnter={(e) =>
                                (e.currentTarget.style.color = "var(--text-accent-hover)")
                            }
                            onMouseLeave={(e) =>
                                (e.currentTarget.style.color = "var(--text-muted)")
                            }
                        >
                            Home
                        </Link>
                        <span
                            className="mx-2"
                            style={{ color: "var(--breadcrumb-separator-color)" }}
                        >
                            &gt;
                        </span>
                        <Link
                            href='/all/blogs'

                            className="transition-colors duration-300"
                            style={{ color: "var(--text-muted)" }}
                            onMouseEnter={(e) =>
                                (e.currentTarget.style.color = "var(--text-accent-hover)")
                            }
                            onMouseLeave={(e) =>
                                (e.currentTarget.style.color = "var(--text-muted)")
                            }
                        >
                            Blogs
                        </Link>
                        <span
                            className="mx-2"
                            style={{ color: "var(--breadcrumb-separator-color)" }}
                        >
                            &gt;
                        </span>
                        <span
                            className="font-semibold line-clamp-1"
                            style={{ color: "var(--main-heading-color)" }}
                        >
                            {post.title}
                        </span>
                    </nav>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Blog Content */}
                        <div
                            className="lg:col-span-2 p-6 sm:p-8 rounded-lg shadow-lg border"
                            style={{
                                backgroundColor: "var(--card-bg)",
                                borderColor: "var(--card-border)",
                            }}
                        >
                            <h1
                                className="text-3xl sm:text-4xl font-extrabold mb-4 leading-tight"
                                style={{ color: "var(--main-heading-color)" }}
                            >
                                {post.title}
                            </h1>
                            <div
                                className="flex items-center text-sm mb-6 space-x-4"
                                style={{ color: "var(--text-muted)" }}
                            >
                                <span>
                                    By{" "}
                                    <span
                                        className="font-semibold"
                                        style={{ color: "var(--primary-orange)" }}
                                    >
                                        {post.author.name.toUpperCase()}
                                    </span>
                                </span>
                                <span>•</span>
                                <span>Published Date:{" "}
                                <span
                                    className="font-semibold"
                                    style={{ color: "var(--primary-orange)" }}
                                >{post.date}</span></span>
                                <span>•</span>
                                <span>
                                    Category:
                                    <Link
                                        href={`/blogs/category/${post.category.slug}`}
                                        className="hover:underline"
                                        style={{ color: "var(--primary-orange)" }}
                                    >
                                        {post.category.name}
                                    </Link>
                                </span>
                            </div>

                            <img src={post.imageURL}
                                alt={post.title}
                                className="w-full h-auto rounded-lg mb-8 shadow-md"
                            />
                            <h1>Description:</h1>
                            <hr /> <br />
                            {/* The dangerouslySetInnerHTML content will directly use the inline styles defined in dummyPosts */}
                            <div
                                className="prose max-w-none leading-relaxed"
                                style={{ color: "var(--text-default)" }}
                                dangerouslySetInnerHTML={{ __html: post.content }}
                            >
                                {/* Blog content will be injected here */}
                            </div>

                            {/* Comments Section - ADDED HERE */}

                            {/* End Comments Section */}
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1 space-y-8 mt-8 lg:mt-0">


                            {/* Recent Posts */}
                            <div
                                className="p-6 rounded-lg shadow-lg border"
                                style={{
                                    backgroundColor: "var(--card-bg)",
                                    borderColor: "var(--card-border)",
                                }}
                            >
                                <h3
                                    className="text-xl font-bold mb-4"
                                    style={{ color: "var(--heading-color)" }}
                                >
                                    Recent Posts
                                </h3>
                                <ul className="space-y-3">
                                    {recentPost.length > 0 ? recentPost.map(
                                        (
                                            p,
                                            index // Show top 5 recent posts
                                        ) => (
                                            <li key={index}>
                                                <Link
                                                    href={`/blog/${p.id}`}
                                                    className="text-sm transition-colors duration-300"
                                                    style={{ color: "var(--text-muted)" }}
                                                    onMouseEnter={(e) =>
                                                    (e.currentTarget.style.color =
                                                        "var(--text-accent-hover)")
                                                    }
                                                    onMouseLeave={(e) =>
                                                        (e.currentTarget.style.color = "var(--text-muted)")
                                                    }
                                                >
                                                    {p.title}
                                                </Link>
                                                <p
                                                    className="text-xs mt-1"
                                                    style={{ color: "var(--text-muted)" }}
                                                >
                                                    {p.date}
                                                </p>
                                            </li>
                                        )
                                    ) : <span className="text-red-500">No Recent Posts Available</span>}
                                </ul>
                            </div>

                            {/* Blog Categories */}
                            <div
                                className="p-6 rounded-lg shadow-lg border"
                                style={{
                                    backgroundColor: "var(--card-bg)",
                                    borderColor: "var(--card-border)",
                                }}
                            >
                                <h3
                                    className="text-xl font-bold mb-4"
                                    style={{ color: "var(--heading-color)" }}
                                >
                                    Blog Categories
                                </h3>
                                <ul className="space-y-2">
                                    {categories.length > 0 ? categories.map((category) => (
                                        <li key={category.id}>
                                            <Link
                                                href={`/blogs/category/${category.slug}`}
                                                className="flex items-center px-2 py-1 transition-all duration-300 whitespace-nowrap"
                                                style={{
                                                    backgroundColor: 'var(--category-button-bg-default)',
                                                    color: 'var(--category-button-text-default)'
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.color = 'var(--category-button-bg-hover)';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.color = 'var(--category-button-text-default)';
                                                }}
                                            >
                                                {category.name}
                                            </Link>
                                        </li>
                                    )) : <span className='text-red-500'>No Popular Categories Available</span>}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </WebLayout>
    );
};

export default SingleBlog;
