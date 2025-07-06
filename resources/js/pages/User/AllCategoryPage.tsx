// src/components/Category.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const AllCategoryPage = () => {
    // Define your static categories. You can expand this list as needed.
    const categories = [
        "Accessories", "Apparel", "Automotive",
        "Bags", "Beauty Products", "Bicycle",
        "Black Friday", "Books", "Chocolate",
        "Clothing", "Condoms", "Cosmetics",
        "Electronics", "Fashion", "Foods",
        "Free Shipping", "Furniture", "Gift",
        "Health", "Home & Garden", "Home Accessories"
        // Add more categories as per your requirements
    ];

    return (
        <div
            className="pb-12 font-sans"
            style={{ backgroundColor: "var(--page-bg)" }}
        >
            <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8">
                {/* Breadcrumbs */}
                <nav className="text-sm mb-6">
                    <Link
                        to="/"
                        className="transition-colors duration-300"
                        style={{ color: "var(--text-muted)" }}
                        onMouseEnter={(e) =>
                            (e.currentTarget.style.color = "var(--primary-orange)")
                        }
                        onMouseLeave={(e) =>
                            (e.currentTarget.style.color = "var(--text-muted)")
                        }
                    >
                        Home{" "}
                    </Link>
                    <span
                        className="mx-2"
                        style={{ color: "var(--breadcrumb-separator-color)" }}
                    >
                        &gt;
                    </span>
                    <span
                        className="font-semibold"
                        style={{ color: "var(--main-heading-color)" }}
                    >
                        All Categories
                    </span>
                </nav>

                {/* Page Header */}
                <div
                    className="p-6 sm:p-8 rounded-lg shadow-lg border mb-10 text-center"
                    style={{
                        backgroundColor: "var(--card-bg)",
                        borderColor: "var(--card-border)",
                    }}
                >
                    <h1
                        className="text-3xl sm:text-4xl font-extrabold mb-3 leading-tight"
                        style={{ color: "var(--main-heading-color)" }}
                    >
                        Categories
                    </h1>
                    <p
                        className="text-base sm:text-lg"
                        style={{ color: "var(--text-muted)" }}
                    >
                        Explore deals by category.
                    </p>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-6">
                    {categories.map((category) => (
                        <Link
                            key={category}
                            // You'll need to define the actual path for category pages, e.g., /category/accessories
                            // For now, it will just navigate to a placeholder path.
                            to={`/category/${category.toLowerCase().replace(/\s/g, "-")}`}
                            className="text-base font-semibold transition-colors duration-200"
                            style={{ color: "var(--primary-orange)" }} // Set default color to orange as per image
                            onMouseEnter={(e) =>
                                (e.currentTarget.style.color = "var(--button-hover-orange)")
                            } // Darker orange on hover
                            onMouseLeave={(e) =>
                                (e.currentTarget.style.color = "var(--primary-orange)")
                            }
                        >
                            {category}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AllCategoryPage;
