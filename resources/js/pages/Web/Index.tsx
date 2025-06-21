// resources/js/Pages/HomePage.tsx

import React, { useState, useEffect, useCallback } from 'react';
import OfferCard from '@/Components/OfferCard'; // UPDATED PATH: Import from Components directory
import { Link } from '@inertiajs/react'; // IMPORTANT: Use Inertia's Link for client-side navigation

const HomePage = () => {
  // Dummy data for Offers (replace with real data later)
  const homePageOffers = [
    { storeLogo: 'https://via.placeholder.com/100x100?text=Cettire', offerText: 'Up to 20% OFF New Season', endDate: 'Wed, 14 May, 2025', showCode: true, offerValue: 'TRIP20', tags: ['Verified', 'Exclusive', 'Featured'], isExpired: false },
    { storeLogo: 'https://via.placeholder.com/100x100?text=Trip', offerText: 'Trip.com Rewards: Up to 20% Off Hotels + 60% More Trip Coins', endDate: 'Wed, 14 May, 2025', showCode: false, tags: ['Verified', 'Featured'], isExpired: false },
    { storeLogo: 'https://via.placeholder.com/100x100?text=Target', offerText: 'Up to 50% Off Home Items', endDate: 'Wed, 14 May, 2025', showCode: false, tags: ['Verified'], isExpired: true }, // Example expired offer
    { storeLogo: 'https://via.placeholder.com/100x100?text=Quest', offerText: 'Shop events selection of women\'s health finds and more', endDate: 'Wed, 14 May, 2025', showCode: false, tags: ['Exclusive'], isExpired: false },
    { storeLogo: 'https://via.placeholder.com/100x100?text=Stanley', offerText: '20% OFF Japan Mug & Cups', endDate: 'Wed, 14 May, 2025', showCode: false, tags: ['Verified'], isExpired: false },
    { storeLogo: 'https://via.placeholder.com/100x100?text=Amazon', offerText: 'Shop first order with Email Sign Up', endDate: 'Wed, 14 May, 2025', showCode: false, tags: ['Verified'], isExpired: false },
    { storeLogo: 'https://via.placeholder.com/100x100?text=Casify', offerText: 'Mother\'s Day Sale: Buy 2+ Get 20% Off', endDate: 'Wed, 14 May, 2025', showCode: false, tags: ['Featured'], isExpired: false },
  ];

  // Carousel state and logic START
  const [currentSlide, setCurrentSlide] = useState(0);
  const bannerData = [
    {
      image: "https://picsum.photos/1200/320?random=1", // RED banner
      heading: "MEGA SAVINGS WEEK!",
      subheading: "Exclusive offers on top brands.",
      buttonText: "Shop Now",
      buttonLink: "/category/new-arrivals"
    },
    {
      image: "https://picsum.photos/1200/320?random=2", // GREEN banner
      heading: "Travel Deals Await",
      subheading: "Book your next adventure with huge discounts.",
      buttonText: "Find Flights",
      buttonLink: "/category/travel"
    },
    {
      image: "https://picsum.photos/1200/320?random=3", // BLUE banner
      heading: "Unlock Special Discounts",
      subheading: "Sign up and get 15% off your first purchase!",
      buttonText: "Register Now",
      buttonLink: "/register"
    },
  ];
  const totalSlides = bannerData.length;

  // Function to go to the next slide
  const nextSlide = useCallback(() => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
  }, [totalSlides]);

  // Function to go to the previous slide
  const prevSlide = useCallback(() => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Auto-slide effect
  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 3000); // Auto-slide every 3 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(slideInterval);
  }, [nextSlide]); // Depend on nextSlide to avoid stale closures

  // Carousel state and logic END

  return (
    <div className="bg-gray-100 pb-8">
      {/* Banners Slider Section START */}
      <div className="w-full h-80 sm:h-96 md:h-[400px] lg:h-[500px] xl:h-[600px] overflow-hidden relative mb-8">
        <div
          className="carousel-container h-full flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {bannerData.map((banner, index) => (
            <div key={index} className="carousel-item h-full w-full flex-shrink-0 relative">
              {/* Image element within the slide item */}
              <img src={banner.image} alt={`Banner ${index + 1}`} className="absolute inset-0 w-full h-full object-cover" />

              {/* Overlay Text and Button */}
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center p-4 z-10">
                <h2 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-2 sm:mb-4 drop-shadow-lg leading-tight">
                  {banner.heading}
                </h2>
                <p className="text-white text-md sm:text-lg md:text-xl lg:text-2xl mb-4 sm:mb-8 font-light drop-shadow-md px-2 max-w-xl">
                  {banner.subheading}
                </p>
                <Link // IMPORTANT: Using Inertia's Link
                  href={banner.buttonLink} // IMPORTANT: Use 'href' instead of 'to'
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 sm:py-3 sm:px-8 rounded-full text-md sm:text-lg shadow-lg transform transition-transform duration-300 hover:scale-105"
                >
                  {banner.buttonText}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Previous Button */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-2 sm:left-4 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 sm:p-3 rounded-full hover:bg-opacity-75 transition-all duration-300 z-20"
          aria-label="Previous Slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-2 sm:right-4 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 sm:p-3 rounded-full hover:bg-opacity-75 transition-all duration-300 z-20"
          aria-label="Next Slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Indicator Dots */}
        <div className="absolute bottom-3 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {bannerData.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${currentSlide === index ? 'bg-blue-600' : 'bg-gray-400'} transition-colors duration-300`}
              aria-label={`Go to slide ${index + 1}`}
            ></button>
          ))}
        </div>
      </div>
      {/* Banners Slider Section END */}

      {/* This container will wrap all other content, keeping it centered with horizontal padding */}
      <div className="container mx-auto px-4">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Left Column: Offers List */}
          <div className="lg:col-span-2">
            <div className="border-l-4 border-gray-400 pl-4 mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Featured Offers</h2>
            </div>
            {homePageOffers.map((offer, index) => (
              <OfferCard key={index} {...offer} />
            ))}
          </div>

          {/* Right Column: Popular Sections */}
          <div className="lg:col-span-1 space-y-8 mt-8 lg:mt-0">
            {/* Popular Stores */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">Popular Stores</h3>
              <ul className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <li key={i} className="text-gray-700 hover:text-blue-600 cursor-pointer text-sm">
                    <Link href={`/store/store-name-${i + 1}`}>Store Name {i + 1}</Link> {/* IMPORTANT: Use 'href' */}
                  </li>
                ))}
              </ul>
            </div>

            {/* Popular Categories */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">Popular Categories</h3>
              <ul className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <li key={i} className="text-gray-700 hover:text-blue-600 cursor-pointer text-sm">
                    <Link href={`/category/category-name-${i + 1}`}>Category Name {i + 1}</Link> {/* IMPORTANT: Use 'href' */}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Website Descriptions Section */}
        <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md my-8 w-full min-h-[8rem] border border-gray-200">
          <p className="text-center text-gray-700 text-base leading-relaxed">
            Welcome to [Your Website Name]! Your ultimate destination for discovering the best deals, coupons, and discounts across a wide range of stores and categories. We work tirelessly to bring you verified offers, ensuring you save money on your favorite brands. Start exploring today and make every purchase a smart one!
          </p>
        </div>

        {/* Popular Posts From Our Blog Section - MODIFIED */}
        <div className="mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 border-l-4 border-gray-400 pl-4">Popular Posts From Our Blog</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <Link href={`/blog/post/${i + 1}`} key={i} className="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105 block"> {/* IMPORTANT: Use 'href' */}
                <div className="w-full h-32 bg-gray-300 flex items-center justify-center text-gray-700 text-sm">
                  <img src={`https://picsum.photos/300/150?random=${i + 10}`} alt={`Blog Post ${i + 1}`} className="w-full h-full object-cover" />
                </div>
                <div className="p-4">
                  <p className="text-base font-semibold text-gray-800 mb-2">Blog Post Title {i + 1}</p>
                  <p className="text-xs text-gray-600">Short description of the blog post content. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Affiliate Line */}
        <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md my-8 w-full min-h-[8rem] border border-gray-200">
          <p className="text-center text-gray-700 text-base leading-relaxed">
            As an affiliate partner, we may earn a commission from qualifying purchases made through links on our site. This helps support our work and allows us to continue providing you with the best deals and coupons. Thank you for your support!
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;