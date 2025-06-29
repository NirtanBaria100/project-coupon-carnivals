import WebLayout from "@/layouts/web-layout";
import React, { useState, useMemo } from 'react'; // Import useState and useMemo

const blogPosts = [
    {
        id: '1',
        title: 'Top 10 Ways to Save on Groceries in 2025',
        imageUrl: 'https://picsum.photos/id/1015/400/250',
        excerpt: 'Discover clever tips and tricks to cut down your grocery bills without compromising on quality or healthy eating. From smart shopping lists to using coupon apps, we cover it all.',
        date: 'June 20, 2025',
        author: 'Admin',
        category: 'Shopping Tips',
    },
    {
        id: '2',
        title: 'Seasonal Sales You Cannot Miss This Summer',
        imageUrl: 'https://picsum.photos/id/1016/400/250',
        excerpt: 'Summer brings amazing deals! Learn about the best times to shop for electronics, clothing, and home goods to maximize your savings.',
        date: 'June 15, 2025',
        author: 'Admin',
        category: 'Sales & Deals',
    },
    {
        id: '3',
        title: 'Decoding Coupon Terms & Conditions: A Simple Guide',
        imageUrl: 'https://picsum.photos/id/1018/400/250',
        excerpt: 'Confused by coupon fine print? Our guide breaks down common terms and conditions, helping you use your discounts effectively and avoid surprises.',
        date: 'June 10, 2025',
        author: 'Admin',
        category: 'Coupon Guide',
    },
    {
        id: '4',
        title: 'Smart Shopping for Electronics: Get the Best Deals',
        imageUrl: 'https://picsum.photos/id/1019/400/250',
        excerpt: 'Looking for a new gadget? We share expert advice on when and where to buy electronics to get the most bang for your buck, including Black Friday and Prime Day strategies.',
        date: 'June 5, 2025',
        author: 'Admin',
        category: 'Tech Deals',
    },
    {
        id: '5',
        title: 'Home Renovation on a Budget: DIY & Discount Tricks',
        imageUrl: 'https://picsum.photos/id/1020/400/250',
        excerpt: 'Dreaming of a home makeover but on a tight budget? Explore DIY tips, discount store finds, and coupon strategies to transform your living space affordably.',
        date: 'May 28, 2025',
        author: 'Admin',
        category: 'Home & Garden',
    },
    {
        id: '6',
        title: 'Mastering Online Coupons: A Beginner\'s Guide',
        imageUrl: 'https://picsum.photos/id/1021/400/250',
        excerpt: 'New to online coupons? This guide covers everything from finding codes to applying them at checkout, ensuring you never miss a saving opportunity.',
        date: 'May 25, 2025',
        author: 'Admin',
        category: 'Coupon Guide',
    },
    {
        id: '7',
        title: 'Budget Travel Hacks for Your Next Vacation',
        imageUrl: 'https://picsum.photos/id/1022/400/250',
        excerpt: 'Travel smart, save big! Discover incredible hacks for flights, accommodations, and activities that will make your dream vacation a reality without breaking the bank.',
        date: 'May 20, 2025',
        author: 'Admin',
        category: 'Travel Deals',
    },
    {
        id: '8',
        title: 'Healthy Eating on a Dime: Meal Prep Ideas',
        imageUrl: 'https://picsum.photos/id/1023/400/250',
        excerpt: 'Eating healthy doesn\'t have to be expensive. Learn meal prep strategies and grocery shopping tips to enjoy nutritious food while keeping your budget intact.',
        date: 'May 15, 2025',
        author: 'Admin',
        category: 'Shopping Tips',
    },
    {
        id: '9',
        title: 'Back to School Savings Guide 2025',
        imageUrl: 'https://picsum.photos/id/1024/400/250',
        excerpt: 'Prepare for the new school year with our ultimate savings guide. Find the best deals on supplies, electronics, and apparel for students of all ages.',
        date: 'May 10, 2025',
        author: 'Admin',
        category: 'Sales & Deals',
    },
    {
        id: '10',
        title: 'The Art of Negotiation: Getting Better Deals',
        imageUrl: 'https://picsum.photos/id/1025/400/250',
        excerpt: 'Unleash your inner deal hunter! This post provides actionable tips and strategies for negotiating prices on big purchases, from cars to appliances.',
        date: 'May 5, 2025',
        author: 'Admin',
        category: 'Shopping Tips',
    },
    // Adding more posts to demonstrate pagination beyond 10 posts
    { id: '11', title: 'Post 11', imageUrl: 'https://picsum.photos/id/1026/400/250', excerpt: 'Excerpt 11', date: 'April 30, 2025', author: 'Admin', category: 'General' },
    { id: '12', title: 'Post 12', imageUrl: 'https://picsum.photos/id/1027/400/250', excerpt: 'Excerpt 12', date: 'April 25, 2025', author: 'Admin', category: 'General' },
    { id: '13', title: 'Post 13', imageUrl: 'https://picsum.photos/id/1028/400/250', excerpt: 'Excerpt 13', date: 'April 20, 2025', author: 'Admin', category: 'General' },
    { id: '14', title: 'Post 14', imageUrl: 'https://picsum.photos/id/1029/400/250', excerpt: 'Excerpt 14', date: 'April 15, 2025', author: 'Admin', category: 'General' },
    { id: '15', title: 'Post 15', imageUrl: 'https://picsum.photos/id/1030/400/250', excerpt: 'Excerpt 15', date: 'April 10, 2025', author: 'Admin', category: 'General' },
    { id: '16', title: 'Post 16', imageUrl: 'https://picsum.photos/id/1031/400/250', excerpt: 'Excerpt 16', date: 'April 5, 2025', author: 'Admin', category: 'General' },
    { id: '17', title: 'Post 17', imageUrl: 'https://picsum.photos/id/1032/400/250', excerpt: 'Excerpt 17', date: 'March 30, 2025', author: 'Admin', category: 'General' },
    { id: '18', title: 'Post 18', imageUrl: 'https://picsum.photos/id/1033/400/250', excerpt: 'Excerpt 18', date: 'March 25, 2025', author: 'Admin', category: 'General' },
    { id: '19', title: 'Post 19', imageUrl: 'https://picsum.photos/id/1034/400/250', excerpt: 'Excerpt 19', date: 'March 20, 2025', author: 'Admin', category: 'General' },
    { id: '20', title: 'Post 20', imageUrl: 'https://picsum.photos/id/1035/400/250', excerpt: 'Excerpt 20', date: 'March 15, 2025', author: 'Admin', category: 'General' },
    { id: '21', title: 'Post 21', imageUrl: 'https://picsum.photos/id/1036/400/250', excerpt: 'Excerpt 21', date: 'March 10, 2025', author: 'Admin', category: 'General' },
    { id: '22', title: 'Post 22', imageUrl: 'https://picsum.photos/id/1037/400/250', excerpt: 'Excerpt 22', date: 'March 5, 2025', author: 'Admin', category: 'General' },
    { id: '23', title: 'Post 23', imageUrl: 'https://picsum.photos/id/1038/400/250', excerpt: 'Excerpt 23', date: 'Feb 28, 2025', author: 'Admin', category: 'General' },
    { id: '24', title: 'Post 24', imageUrl: 'https://picsum.photos/id/1039/400/250', excerpt: 'Excerpt 24', date: 'Feb 25, 2025', author: 'Admin', category: 'General' },
    { id: '25', title: 'Post 25', imageUrl: 'https://picsum.photos/id/1040/400/250', excerpt: 'Excerpt 25', date: 'Feb 20, 2025', author: 'Admin', category: 'General' },
    { id: '26', title: 'Post 26', imageUrl: 'https://picsum.photos/id/1041/400/250', excerpt: 'Excerpt 26', date: 'Feb 15, 2025', author: 'Admin', category: 'General' },
    { id: '27', title: 'Post 27', imageUrl: 'https://picsum.photos/id/1042/400/250', excerpt: 'Excerpt 27', date: 'Feb 10, 2025', author: 'Admin', category: 'General' },
    { id: '28', title: 'Post 28', imageUrl: 'https://picsum.photos/id/1043/400/250', excerpt: 'Excerpt 28', date: 'Feb 5, 2025', author: 'Admin', category: 'General' },
    { id: '29', title: 'Post 29', imageUrl: 'https://picsum.photos/id/1044/400/250', excerpt: 'Excerpt 29', date: 'Jan 30, 2025', author: 'Admin', category: 'General' },
    { id: '30', title: 'Post 30', imageUrl: 'https://picsum.photos/id/1045/400/250', excerpt: 'Excerpt 30', date: 'Jan 25, 2025', author: 'Admin', category: 'General' },
    { id: '31', title: 'Post 31', imageUrl: 'https://picsum.photos/id/1046/400/250', excerpt: 'Excerpt 31', date: 'Jan 20, 2025', author: 'Admin', category: 'General' },
    { id: '32', title: 'Post 32', imageUrl: 'https://picsum.photos/id/1047/400/250', excerpt: 'Excerpt 32', date: 'Jan 15, 2025', author: 'Admin', category: 'General' },
    { id: '33', title: 'Post 33', imageUrl: 'https://picsum.photos/id/1048/400/250', excerpt: 'Excerpt 33', date: 'Jan 10, 2025', author: 'Admin', category: 'General' },
    { id: '34', title: 'Post 34', imageUrl: 'https://picsum.photos/id/1049/400/250', excerpt: 'Excerpt 34', date: 'Jan 5, 2025', author: 'Admin', category: 'General' },
    { id: '35', title: 'Post 35', imageUrl: 'https://picsum.photos/id/1050/400/250', excerpt: 'Excerpt 35', date: 'Dec 30, 2024', author: 'Admin', category: 'General' },
    { id: '36', title: 'Post 36', imageUrl: 'https://picsum.photos/id/1051/400/250', excerpt: 'Excerpt 36', date: 'Dec 25, 2024', author: 'Admin', category: 'General' },
    { id: '37', title: 'Post 37', imageUrl: 'https://picsum.photos/id/1052/400/250', excerpt: 'Excerpt 37', date: 'Dec 20, 2024', author: 'Admin', category: 'General' },
    { id: '38', title: 'Post 38', imageUrl: 'https://picsum.photos/id/1053/400/250', excerpt: 'Excerpt 38', date: 'Dec 15, 2024', author: 'Admin', category: 'General' },
    { id: '39', title: 'Post 39', imageUrl: 'https://picsum.photos/id/1054/400/250', excerpt: 'Excerpt 39', date: 'Dec 10, 2024', author: 'Admin', category: 'General' },
    { id: '40', title: 'Post 40', imageUrl: 'https://picsum.photos/id/1055/400/250', excerpt: 'Excerpt 40', date: 'Dec 5, 2024', author: 'Admin', category: 'General' },
    { id: '41', title: 'Post 41', imageUrl: 'https://picsum.photos/id/1056/400/250', excerpt: 'Excerpt 41', date: 'Nov 30, 2024', author: 'Admin', category: 'General' },
    { id: '42', title: 'Post 42', imageUrl: 'https://picsum.photos/id/1057/400/250', excerpt: 'Excerpt 42', date: 'Nov 25, 2024', author: 'Admin', category: 'General' },
    { id: '43', title: 'Post 43', imageUrl: 'https://picsum.photos/id/1058/400/250', excerpt: 'Excerpt 43', date: 'Nov 20, 2024', author: 'Admin', category: 'General' },
    { id: '44', title: 'Post 44', imageUrl: 'https://picsum.photos/id/1059/400/250', excerpt: 'Excerpt 44', date: 'Nov 15, 2024', author: 'Admin', category: 'General' },
    { id: '45', title: 'Post 45', imageUrl: 'https://picsum.photos/id/1060/400/250', excerpt: 'Excerpt 45', date: 'Nov 10, 2024', author: 'Admin', category: 'General' },
    { id: '46', title: 'Post 46', imageUrl: 'https://picsum.photos/id/1061/400/250', excerpt: 'Excerpt 46', date: 'Nov 5, 2024', author: 'Admin', category: 'General' },
    { id: '47', title: 'Post 47', imageUrl: 'https://picsum.photos/id/1062/400/250', excerpt: 'Excerpt 47', date: 'Oct 30, 2024', author: 'Admin', category: 'General' },
    { id: '48', title: 'Post 48', imageUrl: 'https://picsum.photos/id/1063/400/250', excerpt: 'Excerpt 48', date: 'Oct 25, 2024', author: 'Admin', category: 'General' },
    { id: '49', title: 'Post 49', imageUrl: 'https://picsum.photos/id/1064/400/250', excerpt: 'Excerpt 49', date: 'Oct 20, 2024', author: 'Admin', category: 'General' },
    { id: '50', title: 'Post 50', imageUrl: 'https://picsum.photos/id/1065/400/250', excerpt: 'Excerpt 50', date: 'Oct 15, 2024', author: 'Admin', category: 'General' },
    { id: '51', title: 'Post 51', imageUrl: 'https://picsum.photos/id/1066/400/250', excerpt: 'Excerpt 51', date: 'Oct 10, 2024', author: 'Admin', category: 'General' },
    { id: '52', title: 'Post 52', imageUrl: 'https://picsum.photos/id/1067/400/250', excerpt: 'Excerpt 52', date: 'Oct 5, 2024', author: 'Admin', category: 'General' },
    { id: '53', title: 'Post 53', imageUrl: 'https://picsum.photos/id/1068/400/250', excerpt: 'Excerpt 53', date: 'Sep 30, 2024', author: 'Admin', category: 'General' },
    { id: '54', title: 'Post 54', imageUrl: 'https://picsum.photos/id/1069/400/250', excerpt: 'Excerpt 54', date: 'Sep 25, 2024', author: 'Admin', category: 'General' },
    { id: '55', title: 'Post 55', imageUrl: 'https://picsum.photos/id/1070/400/250', excerpt: 'Excerpt 55', date: 'Sep 20, 2024', author: 'Admin', category: 'General' },
    { id: '56', title: 'Post 56', imageUrl: 'https://picsum.photos/id/1071/400/250', excerpt: 'Excerpt 56', date: 'Sep 15, 2024', author: 'Admin', category: 'General' },
    { id: '57', title: 'Post 57', imageUrl: 'https://picsum.photos/id/1072/400/250', excerpt: 'Excerpt 57', date: 'Sep 10, 2024', author: 'Admin', category: 'General' },
    { id: '58', title: 'Post 58', imageUrl: 'https://picsum.photos/id/1073/400/250', excerpt: 'Excerpt 58', date: 'Sep 5, 2024', author: 'Admin', category: 'General' },
    { id: '59', title: 'Post 59', imageUrl: 'https://picsum.photos/id/1074/400/250', excerpt: 'Excerpt 59', date: 'Aug 30, 2024', author: 'Admin', category: 'General' },
    { id: '60', title: 'Post 60', imageUrl: 'https://picsum.photos/id/1075/400/250', excerpt: 'Excerpt 60', date: 'Aug 25, 2024', author: 'Admin', category: 'General' },
];

const BlogPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 6; // You can adjust this number
    const maxPagesToShow = 20; // Maximum number of pagination buttons to display

    // Filtered posts based on search term
    const filteredPosts = useMemo(() => {
        if (!searchTerm) {
            return blogPosts;
        }
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        return blogPosts.filter(post =>
            post.title.toLowerCase().includes(lowerCaseSearchTerm) ||
            post.excerpt.toLowerCase().includes(lowerCaseSearchTerm) ||
            post.category.toLowerCase().includes(lowerCaseSearchTerm) ||
            post.author.toLowerCase().includes(lowerCaseSearchTerm)
        );
    }, [searchTerm]); // Re-calculate when searchTerm changes

    // Pagination calculations
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prev => prev + 1);
        }
    };

    // Generate page numbers for pagination controls with a limit of maxPagesToShow
    const pageNumbers = useMemo(() => {
        const numbers = [];
        const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
        const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

        for (let i = startPage; i <= endPage; i++) {
            numbers.push(i);
        }
        return numbers;
    }, [totalPages, currentPage, maxPagesToShow]);


    return (
        <WebLayout>
            <div className="pb-12 font-sans" style={{ backgroundColor: 'var(--page-bg)' }}>
                <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8">
                    {/* Breadcrumbs */}
                    <nav className="text-sm mb-6">
                        <a
                            href="/"
                            className="transition-colors duration-300"
                            style={{ color: 'var(--text-muted)' }}
                            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-accent-hover)'}
                            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
                        >
                            Home
                        </a>
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

                    {/* Search Bar */}
                    <div className="mb-8 p-5 rounded-lg shadow-md border" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}>
                        <div className="relative w-full">
                           <input
    type="text"
    placeholder="Search blog posts by title, category, or content..."
    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent focus:border-[color:var(--primary-orange)]"
    style={{
        backgroundColor: 'var(--form-input-bg)',
        color: 'var(--form-input-text)',
        borderColor: 'var(--form-input-border)',
    }}
    value={searchTerm}
    onChange={(e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    }}
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
                    </div>

                    {/* Blog Posts Grid */}
                    {currentPosts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {currentPosts.map((post) => (
                                <div
                                    key={post.id}
                                    className="rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border"
                                    style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}
                                >
                                    <a href={`/blog/${post.id}`}>
                                        <img src={post.imageUrl} alt={post.title} className="w-full h-48 object-cover" />
                                    </a>
                                    <div className="p-5">
                                        <div className="text-xs font-semibold uppercase mb-2" style={{ color: 'var(--primary-orange)' }}>
                                            <a
                                                href={`/blog/category/${post.category.toLowerCase().replace(/\s/g, '-')}`}
                                                className="hover:underline"
                                            >
                                                {post.category}
                                            </a>
                                        </div>
                                        <h3 className="text-xl font-bold mb-3 leading-snug" style={{ color: 'var(--heading-color)' }}>
                                            <a
                                                href={`/blog/${post.id}`}
                                                className="transition-colors duration-300"
                                                style={{ color: 'var(--heading-color)' }}
                                                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-accent-hover)'}
                                                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--heading-color)'}
                                            >
                                                {post.title}
                                            </a>
                                        </h3>
                                        <p className="text-sm mb-4 line-clamp-3" style={{ color: 'var(--text-muted)' }}>{post.excerpt}</p>
                                        <div className="flex justify-between items-center text-xs" style={{ color: 'var(--text-muted)' }}>
                                            <span>By {post.author}</span>
                                            <span>{post.date}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div
                            className="p-6 sm:p-8 rounded-lg shadow-lg border text-center"
                            style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}
                        >
                            <p className="text-xl" style={{ color: 'var(--text-default)' }}>No blog posts found matching your criteria.</p>
                            <button
                                onClick={() => setSearchTerm('')} // Only reset search term
                                className="mt-4 inline-block font-bold py-2 px-4 rounded-md transition-colors duration-200"
                                style={{ backgroundColor: 'var(--primary-orange)', color: 'var(--neutral-white)' }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--button-hover-orange)'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--primary-orange)'}
                            >
                                Clear Search
                            </button>
                        </div>
                    )}


                    {/* Pagination */}
                    {filteredPosts.length > postsPerPage && ( // Only show pagination if there are more posts than `postsPerPage`
                        <div className="flex justify-center mt-12">
                            <nav className="flex space-x-2" aria-label="Pagination">
                                <button
                                    onClick={handlePrevious}
                                    disabled={currentPage === 1}
                                    className="relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                    style={{
                                        color: 'var(--text-muted)',
                                        backgroundColor: 'var(--neutral-white)',
                                        border: '1px solid var(--card-border)'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--card-border)'}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--neutral-white)'}
                                >
                                    Previous
                                </button>
                                {pageNumbers.map(number => (
                                    <button
                                        key={number}
                                        onClick={() => paginate(number)}
                                        className={`relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200
                                            ${currentPage === number
                                                ? 'bg-primary-orange text-neutral-white' // Active page styles
                                                : 'bg-neutral-white text-text-muted border border-card-border' // Inactive page styles
                                            }`}
                                        style={currentPage === number ?
                                            { backgroundColor: 'var(--primary-orange)', color: 'var(--neutral-white)', border: '1px solid var(--primary-orange)' } :
                                            { backgroundColor: 'var(--neutral-white)', color: 'var(--text-muted)', border: '1px solid var(--card-border)' }
                                        }
                                        onMouseEnter={(e) => {
                                            if (currentPage !== number) e.currentTarget.style.backgroundColor = 'var(--card-border)';
                                            else e.currentTarget.style.backgroundColor = 'var(--button-hover-orange)';
                                        }}
                                        onMouseLeave={(e) => {
                                            if (currentPage !== number) e.currentTarget.style.backgroundColor = 'var(--neutral-white)';
                                            else e.currentTarget.style.backgroundColor = 'var(--primary-orange)';
                                        }}
                                    >
                                        {number}
                                    </button>
                                ))}
                                <button
                                    onClick={handleNext}
                                    disabled={currentPage === totalPages}
                                    className="relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                    style={{
                                        color: 'var(--text-muted)',
                                        backgroundColor: 'var(--neutral-white)',
                                        border: '1px solid var(--card-border)'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--card-border)'}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--neutral-white)'}
                                >
                                    Next
                                </button>
                            </nav>
                        </div>
                    )}
                </div>
            </div>
        </WebLayout>
    )
};

export default BlogPage;
