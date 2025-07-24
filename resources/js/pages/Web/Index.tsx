// src/components/HomePage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { Link, usePage } from '@inertiajs/react';
import banner1Image from '@/assets/banner 1.webp'; // Import the banner image directly
import banner2Image from '@/assets/banner 2.webp'; // Import the banner image directly
import OfferCard from '@/components/OfferCard';
import WebLayout from '@/layouts/web-layout';
import { excerptFromHtml } from '@/lib/excerptFromHtml';
import PageMeta from '@/components/PageMeta';
import {Schema} from '@/components/Schema';
interface Coupons {
    featured_image: string | null,
    title: string | null,
    coupon_type: string | null,
    code: string | null,
    id : number | 0,
    coupon_url: string | null,
    is_verified: boolean | false,
    is_exclusive: boolean | false,
    is_featured: boolean | false,
    isExpired: boolean | false,
    stores:[],
    expires: Date,
}
interface Stores {
    id: number | 0,
    name: string | null,
    slug: string | null,
}
interface Blogs {
    title: string | null,
    slug: string | null,
    imageURL: string | null,
    content:any
}

interface Category{
    id:Number|null,
    name:string|null,
    slug:string|null,
}
interface Props {
    featured_coupons: Coupons[],
    popular_stores: Stores[],
    blogs: Blogs[],
    popular_categories:Category[]
}
const HomePage = ({ featured_coupons, popular_stores, blogs,popular_categories }: Props) => {
    const { categories } = usePage().props;
        const FirstSchema =  {
        "@context": "http://schema.org",
        "@type": "WebPage",
        "url": "https://promocarnivals.com"
        };

        const SecondSchema = {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Promo Carnivals",
            "url": "https://promocarnivals.com",
            "publisher": {
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "Promo Carnivals",
                "url": "https://promocarnivals.com",
                "logo": {
                "@context": "https://schema.org",
                "@type": "ImageObject",
                "url": "https://promocarnivals.com/build/assets/promocarnivals2-BOfHa-Vt.png",
                "caption": "Promo Carnivals Logo"
                }
            },
            "potentialAction": {
                "@context": "https://schema.org",
                "@type": "SearchAction",
                "target": "https://promocarnivals.com/search?q={query}",
                "query-input": "required name=query"
            }
        }

        const ThirdSchema = {
        "@context": "https://schema.org",
        "@graph": [
            {
            "@type": "SiteNavigationElement",
            "name": "Home",
            "url": "https://promocarnivals.com/",
            "@id": "#trending"
            },
            {
            "@type": "SiteNavigationElement",
            "name": "Categories",
            "url": "https://promocarnivals.com/categories",
            "@id": "#trending"
            },
            {
            "@type": "SiteNavigationElement",
            "name": "Stores",
            "url": "https://promocarnivals.com/stores",
            "@id": "#trending"
            },
            {
            "@type": "SiteNavigationElement",
            "name": "Blogs",
            "url": "https://promocarnivals.com/all/blogs",
            "@id": "#trending"
            }
        ]
        }
        const FourthSchema = {
        "@context": "https://schema.org",
        "@graph": [
            {
            "@type": "SiteNavigationElement",
            "name": "Travel",
            "url": "https://promocarnivals.com/category/travel",
            "@id": "#navigation"
            },
            {
            "@type": "SiteNavigationElement",
            "name": "Home & Garden",
            "url": "https://promocarnivals.com/category/home-and-garden",
            "@id": "#navigation"
            },
            {
            "@type": "SiteNavigationElement",
            "name": "Jewellery & Watches",
            "url": "https://promocarnivals.com/category/jewellery-watches",
            "@id": "#navigation"
            },
            {
            "@type": "SiteNavigationElement",
            "name": "Clothing & Apparel",
            "url": "https://promocarnivals.com/category/clothing-and-apparel",
            "@id": "#navigation"
            },
            {
            "@type": "SiteNavigationElement",
            "name": "Sports & Outdoors",
            "url": "https://promocarnivals.com/category/sports-&-outdoors",
            "@id": "#navigation"
            },
            {
            "@type": "SiteNavigationElement",
            "name": "Arts & Crafts",
            "url": "https://promocarnivals.com/category/arts-crafts",
            "@id": "#navigation"
            },
            {
            "@type": "SiteNavigationElement",
            "name": "Pet Supplies",
            "url": "https://promocarnivals.com/category/pet-supplies",
            "@id": "#navigation"
            },
            {
            "@type": "SiteNavigationElement",
            "name": "Electronics",
            "url": "https://promocarnivals.com/category/electronics",
            "@id": "#navigation"
            },
            {
            "@type": "SiteNavigationElement",
            "name": "Free Shipping",
            "url": "https://promocarnivals.com/category/free-shipping",
            "@id": "#navigation"
            },
            {
            "@type": "SiteNavigationElement",
            "name": "Gifts",
            "url": "https://promocarnivals.com/category/gifts",
            "@id": "#navigation"
            }
          ]
        }
    
    
    
    const popularCategories = popular_categories;//Array.isArray(categories)
        //? categories.filter((e: { is_popular:boolean }) => e.is_popular === true).slice(0, 8)
        //: [];
    // Carousel state and logic START - MODIFIED
    const [currentSlide, setCurrentSlide] = useState(0);
    const bannerData = [
        { image: banner1Image , url : '/stores' }, // Use the imported image
        // { image: banner2Image , url : '/category/clothing-and-apparel'}, // Use the imported image again for the second slide
    ];
    const totalSlides = bannerData.length;

    const nextSlide = useCallback(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
    }, [totalSlides]);

    const prevSlide = useCallback(() => {
        setCurrentSlide((prevSlide) => (prevSlide - 1 + totalSlides) % totalSlides);
    }, [totalSlides]);

    // useEffect(() => {
    //     const slideInterval = setInterval(nextSlide, 5000); // changed from 50000 to 5000
    //     return () => clearInterval(slideInterval);
    // }, [nextSlide]);
    // Carousel state and logic END

    const remapBlogs = blogs.map(blog=>{


        return {
            ...blog,
            excerpt:excerptFromHtml(blog.content, 150)
        }
    })

    return (
        <WebLayout FirstSchema={FirstSchema} SecondSchema={SecondSchema} ThirdSchema={ThirdSchema} FourthSchema={FourthSchema}>
            <PageMeta title={"Promo Carnivals - Find Exclusive Coupons and Discounts"} description={"Explore top deals & discounts on fashion, tech, beauty & more at PromoCarnivals. Shop smart, save big—new promos added daily!"} keywords={""} />
            <div className="pb-12 font-sans" style={{ backgroundColor: 'var(--page-bg)' }}>
                {/* Banners Slider Section START */}
                <div className="w-full h-60 sm:h-96 md:h-[450px] lg:h-[400px] xl:h-[550px] overflow-hidden relative shadow-lg mb-10">
                    <div
                        className="carousel-container h-full flex transition-transform duration-500 ease-in-out"
                        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                    >
                        {bannerData.map((banner, index) => (
                            <div key={index} className="carousel-item h-full w-full flex-shrink-0 relative">
                                <a  target="_blank" href={banner.url}> <img src={banner.image} alt={`Banner ${index + 1}`} className="absolute inset-0 w-full h-full object-contain" /></a>

                                {/* Overlay (now empty as heading, subheading, and button are removed) */}
                                {/* The overlay div itself remains to maintain the dark overlay effect if 'var(--banner-overlay-bg)' is semi-transparent.
                  If you want to remove the overlay entirely, you can remove this div as well. */}

                            </div>
                        ))}
                    </div>

                    {/* Previous Button */}
                    {/* <button
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
                    </button> */}

                    {/* Next Button */}
                    {/* <button
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
                    </button> */}

                    {/* Indicator Dots */}
                    {/* <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
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
                    </div> */}
                </div>
                {/* Banners Slider Section END */}

                <div className="container mx-auto">
                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8 p-5 home2colmaindiv" >
                        {/* Left Column: Offers List */}
                        <div className="lg:col-span-2 home_featuredoffers_maindiv ">
                            <div
                                className="p-2 sm:p-8 home_featuredoffers_div"
                            >
                                <h1
                                    className="text-2xl font-extrabold mb-6 border-l-4 pl-4"
                                    style={{ color: 'var(--main-heading-color)', borderColor: 'var(--heading-border-accent)' }}
                                >
                                    Featured Offers
                                </h1>
                                <div className="space-y-6">
                                    {/* OfferCard is a separate component, ensure its internal colors are also updated with variables */}
                                    {featured_coupons.length > 0 ? featured_coupons.map((offer, index) => (

                                        <OfferCard key={index} coupon_id={offer.id} type="home" storeName={offer.stores[0]?.name} store={offer.stores[0]} affiliate_url={offer.coupon_url || offer.stores[0].affiliate_irl} store_slug={'/store/' + offer?.stores[0].slug || ''} {...offer} />
                                    )) : <span>No Featured Offers Available</span>}
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Popular Sections */}
                        <div className="lg:col-span-1 space-y-8 mt-8 lg:mt-0 popstoreandcat_maindiv">

                            {/* Popular Stores */}
                            <div
                                className="p-6 rounded-lg shadow-lg popular_storediv"
                                style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--card-border)' }}
                            >
                                <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--main-heading-color)' }}>Popular Stores</h3>
                                <ul className="space-y-3">
                                    {popular_stores.length > 0 ? popular_stores.map((store) => (
                                        <li key={store.id}>
                                            <Link
                                                href={`/store/${store.slug}`}
                                                className="flex items-center py-1.5 transition-all duration-300 whitespace-nowrap"
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
                                className="p-6 rounded-lg shadow-lg popular_catdivhome"
                                style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--card-border)' }}
                            >
                                <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--main-heading-color)' }}>Popular Categories</h3>
                                <ul className="space-y-3">
                                    {popularCategories.length > 0 ? popularCategories.map((category) => (
                                        <li key={category.id}>
                                            <Link
                                                href={`/category/${category.slug}`}
                                                className="flex items-center py-1.5 transition-all duration-300 whitespace-nowrap"
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
                        className="p-6 sm:p-8 rounded-lg shadow-lg my-10 w-full homeweb_desc"
                        style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--card-border)' }}
                    >
                        <h2>Discover Big Savings at Promo Carnivals</h2>
                        <p className="text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                            <p>Welcome to Promo Carnivals, where we help you save money on all your favorite products. Whether you are looking for deals on groceries, clothes, electronics, or home appliances, we have covered you.</p>
<br /><h3>Fresh Coupons and Deals Updated Daily</h3>
<p>Our experts update coupons daily bases to ensure our valuable customers get the latest and best deals frequently.</p>
<br /><h3>Unlock Special Offers You Won’t Find Elsewhere</h3>
<p>You can easily get access to exclusive offers and special discounts that you will not find anywhere else. So, why wait? sign up today for our newsletter to stay in the loop and never miss a great deal.</p>
<br /><h3>Your Smart Shopping Starts Here</h3>
<p>Do not wait! Start exploring Promo Carnivals right now and discover how easy it is to save your money on everything you need. Happy shopping!</p>

                        </p>
                    </div>

                    {/* Popular Posts From Our Blog Section */}
                    <div className="mb-10 homeblog_sec p-5">
                        <h2
                            className="text-2xl font-extrabold mb-8 border-l-4 pl-4 blog_headinghome"
                            style={{ color: 'var(--main-heading-color)', borderColor: 'var(--heading-border-accent)' }}
                        >
                            Savings tips from the blog
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {remapBlogs.map((blog, i) => (
                                <Link
                                    href={`/blog/${blog?.slug}`}
                                    key={i}
                                    className="rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 block"
                                    style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--card-border)' }}
                                >
                                    <div
                                        className="w-full h-36 flex items-center justify-center text-sm"
                                        style={{ backgroundColor: 'var(--blog-placeholder-bg)', color: 'var(--text-muted)' }}
                                    >
                                        {/* Using the same banner1Image for blog placeholders as well, for consistency */}
                                        <img src={blog?.imageURL || ""} alt={`Blog Post ${i + 1}`} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="p-4">
                                        <p className="text-base font-semibold mb-2" style={{ color: 'var(--blog-card-text)' }}>{blog?.title}</p>
                                        <p className="text-sm" style={{ color: 'var(--blog-card-description)' }}>{blog?.excerpt || ""}</p>
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

                </div>
            </div>
        {/* <!-- 1. WebPage Schema --> */}
      
        </WebLayout>
    );
};

export default HomePage;
