// src/components/HomePage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { Link, usePage } from '@inertiajs/react';
import banner1Image from '@/assets/banner 1.png'; // Import the banner image directly
import banner2Image from '@/assets/banner 2.png'; // Import the banner image directly
import OfferCard from '@/Components/OfferCard';
import WebLayout from '@/layouts/web-layout';
interface Coupons {
    featured_image: string | null,
    title: string | null,
    coupon_type: string | null,
    code: string | null,
    coupon_url: string | null,
    is_verified: boolean | false,
    is_exclusive: boolean | false,
    is_featured: boolean | false,
    isExpired: boolean | false,
    expires: Date,
}
interface Stores {
    name: string | null,
    slug: string | null,
}
interface Blogs {
    title: string | null,
    slug: string | null,
    imageURL: string|null
}
interface Props {
    featured_coupons: Coupons[],
    popular_stores: Stores[],
    blogs: Blogs[]
}
const HomePage = ({ featured_coupons, popular_stores, blogs }: Props) => {

    const { categories } = usePage().props;
    const popularCategories = categories.filter(e => e.is_popular == true);
    // Carousel state and logic START - MODIFIED
    const [currentSlide, setCurrentSlide] = useState(0);
    const bannerData = [
        { image: banner1Image }, // Use the imported image
        { image: banner2Image }, // Use the imported image again for the second slide
    ];
    const totalSlides = bannerData.length;

    const nextSlide = useCallback(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
    }, [totalSlides]);

    const prevSlide = useCallback(() => {
        setCurrentSlide((prevSlide) => (prevSlide - 1 + totalSlides) % totalSlides);
    }, [totalSlides]);

    useEffect(() => {
        const slideInterval = setInterval(nextSlide, 3000);
        return () => clearInterval(slideInterval);
    }, [nextSlide]);
    // Carousel state and logic END

    return (
        <WebLayout>
            <div className="pb-12 font-sans" style={{ backgroundColor: 'var(--page-bg)' }}>
                {/* Banners Slider Section START */}
                <div className="w-full h-80 sm:h-96 md:h-[450px] lg:h-[550px] xl:h-[650px] overflow-hidden relative shadow-lg mb-10">
                    <div
                        className="carousel-container h-full flex transition-transform duration-500 ease-in-out"
                        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                    >
                        {bannerData.map((banner, index) => (
                            <div key={index} className="carousel-item h-full w-full flex-shrink-0 relative">
                                <img src={banner.image} alt={`Banner ${index + 1}`} className="absolute inset-0 w-full h-full object-contain" />

                                {/* Overlay (now empty as heading, subheading, and button are removed) */}
                                {/* The overlay div itself remains to maintain the dark overlay effect if 'var(--banner-overlay-bg)' is semi-transparent.
                  If you want to remove the overlay entirely, you can remove this div as well. */}
                                <div
                                    className="absolute inset-0" // Removed flex, items-center, justify-center, text-center, p-4, z-10

                                >
                                    {/* Heading, Subheading, and Button are removed from here */}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Previous Button */}
                    <button
                        onClick={prevSlide}
                        className="absolute top-1/2 left-4 transform -translate-y-1/2 p-3 sm:p-4 rounded-full transition-all duration-300 z-20 focus:outline-none focus:ring-2"
                        style={{
                            backgroundColor: 'var(--carousel-nav-bg)',
                            color: 'var(--carousel-nav-icon-color)',
                            '--tw-ring-color': 'var(--carousel-nav-focus-ring)'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--carousel-nav-bg-hover)'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--carousel-nav-bg)'}
                        aria-label="Previous Slide"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-7 sm:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    {/* Next Button */}
                    <button
                        onClick={nextSlide}
                        className="absolute top-1/2 right-4 transform -translate-y-1/2 p-3 sm:p-4 rounded-full transition-all duration-300 z-20 focus:outline-none focus:ring-2"
                        style={{
                            backgroundColor: 'var(--carousel-nav-bg)',
                            color: 'var(--carousel-nav-icon-color)',
                            '--tw-ring-color': 'var(--carousel-nav-focus-ring)'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--carousel-nav-bg-hover)'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--carousel-nav-bg)'}
                        aria-label="Next Slide"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-7 sm:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    {/* Indicator Dots */}
                    <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
                        {bannerData.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full transition-all duration-300 transform ${currentSlide === index ? 'scale-125' : ''}`}
                                style={{
                                    backgroundColor: currentSlide === index ? 'var(--carousel-indicator-active)' : 'var(--carousel-indicator-inactive)'
                                }}
                                aria-label={`Go to slide ${index + 1}`}
                            ></button>
                        ))}
                    </div>
                </div>
                {/* Banners Slider Section END */}

                <div className="container mx-auto px-4 md:px-6 lg:px-8">
                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
                        {/* Left Column: Offers List */}
                        <div className="lg:col-span-2">
                            <div
                                className="p-6 sm:p-8 rounded-lg shadow-lg mb-8"
                                style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--card-border)' }}
                            >
                                <h2
                                    className="text-2xl font-extrabold mb-6 border-l-4 pl-4"
                                    style={{ color: 'var(--main-heading-color)', borderColor: 'var(--heading-border-accent)' }}
                                >
                                    Featured Offers
                                </h2>
                                <div className="space-y-6">
                                    {/* OfferCard is a separate component, ensure its internal colors are also updated with variables */}
                                    {featured_coupons.length > 0 ? featured_coupons.map((offer, index) => (
                                        <OfferCard key={index} {...offer} />
                                    )) : <span>No Featured Offers Available</span>}
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Popular Sections */}
                        <div className="lg:col-span-1 space-y-8 mt-8 lg:mt-0">
                            {/* Popular Stores */}
                            <div
                                className="p-6 rounded-lg shadow-lg"
                                style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--card-border)' }}
                            >
                                <h3 className="text-xl font-bold mb-5" style={{ color: 'var(--main-heading-color)' }}>Popular Stores</h3>
                                <ul className="space-y-3">
                                    {popular_stores.length > 0 ? popular_stores.map((store) => (
                                        <li key={store.id}>
                                            <Link
                                                href={`/store/${store.slug}`}
                                                className="flex items-center px-3 py-1.5 transition-all duration-300 whitespace-nowrap"
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
                                                {store.name}
                                            </Link>
                                        </li>
                                    )) : <span className='text-red-500'>No Popular Stores Available</span>}
                                </ul>
                            </div>

                            {/* Popular Categories */}
                            <div
                                className="p-6 rounded-lg shadow-lg"
                                style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--card-border)' }}
                            >
                                <h3 className="text-xl font-bold mb-5" style={{ color: 'var(--main-heading-color)' }}>Popular Categories</h3>
                                <ul className="space-y-3">
                                    {popularCategories.length > 0 ? popularCategories.map((category) => (
                                        <li key={category.id}>
                                            <Link
                                                href={`/category/${category.slug}`}
                                                className="flex items-center px-3 py-1.5 transition-all duration-300 whitespace-nowrap"
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

                    {/* Website Descriptions Section */}
                    <div
                        className="p-6 sm:p-8 rounded-lg shadow-lg my-10 w-full"
                        style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--card-border)' }}
                    >
                        <p className="text-center text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                            Welcome to <Link href='/' className="font-semibold" style={{ color: 'var(--text-highlight)' }}>PromoCarnivals</Link>! Your ultimate destination for discovering the best deals, coupons, and discounts across a wide range of stores and categories. We work tirelessly to bring you verified offers, ensuring you save money on your favorite brands. Start exploring today and make every purchase a smart one!
                        </p>
                    </div>

                    {/* Popular Posts From Our Blog Section */}
                    <div className="mb-10">
                        <h2
                            className="text-2xl font-extrabold mb-8 border-l-4 pl-4"
                            style={{ color: 'var(--main-heading-color)', borderColor: 'var(--heading-border-accent)' }}
                        >
                            Popular Posts From Our Blog
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {blogs.map((blog, i) => (
                                <Link
                                    href={`/blog/${blog.slug}`}
                                    key={i}
                                    className="rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 block"
                                    style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--card-border)' }}
                                >
                                    <div
                                        className="w-full h-36 flex items-center justify-center text-sm"
                                        style={{ backgroundColor: 'var(--blog-placeholder-bg)', color: 'var(--text-muted)' }}
                                    >
                                        {/* Using the same banner1Image for blog placeholders as well, for consistency */}
                                        <img src={blog.imageURL} alt={`Blog Post ${i + 1}`} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="p-4">
                                        <p className="text-base font-semibold mb-2" style={{ color: 'var(--blog-card-text)' }}>{blog.title}</p>
                                        <p className="text-sm" style={{ color: 'var(--blog-card-description)' }}>Short description of the blog post content. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* See All Blogs Button */}
                        <div className="text-center mt-10">
                            <Link
                                href="/all/blogs"
                                className="inline-block font-bold py-3 px-8 rounded-full text-lg shadow-lg transform transition-transform duration-300 hover:scale-105"
                                style={{
                                    backgroundColor: 'var(--banner-button-bg)', // Using banner button colors for consistency
                                    color: 'var(--banner-button-text)'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = 'var(--banner-button-bg-hover)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = 'var(--banner-button-bg)';
                                }}
                            >
                                See All Blogs
                            </Link>
                        </div>
                    </div>

                    {/* Affiliate Line */}
                    <div
                        className="p-6 sm:p-8 rounded-lg shadow-lg my-10 w-full"
                        style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--card-border)' }}
                    >
                        <p className="text-center text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                            As an affiliate partner, we may earn a commission from qualifying purchases made through links on our site. This helps support our work and allows us to continue providing you with the best deals and coupons. Thank you for your support!
                        </p>
                    </div>
                </div>
            </div>
        </WebLayout>
    );
};

export default HomePage;
