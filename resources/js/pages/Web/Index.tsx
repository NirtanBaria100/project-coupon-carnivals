import React, { useState, useEffect, useCallback } from 'react';
import OfferCard from '@/Components/OfferCard';
import { Link } from 'react-router-dom';

const HomePage = () => {
  // Dummy data for Offers (replace with real data later) - UNTOUCHED
  const homePageOffers = [
    { storeLogo: 'https://via.placeholder.com/100x100?text=Cettire', offerText: 'Up to 20% OFF New Season', endDate: 'Wed, 14 May, 2025', showCode: true, offerValue: 'TRIP20', tags: ['Verified', 'Exclusive', 'Featured'] },
    { storeLogo: 'https://via.placeholder.com/100x100?text=Trip', offerText: 'Trip.com Rewards: Up to 20% Off Hotels + 60% More Trip Coins', endDate: 'Wed, 14 May, 2025', showCode: false, tags: ['Verified', 'Featured'] },
    { storeLogo: 'https://via.placeholder.com/100x100?text=Target', offerText: 'Up to 50% Off Home Items', endDate: 'Wed, 14 May, 2025', showCode: false, tags: ['Verified'] },
    { storeLogo: 'https://via.placeholder.com/100x100?text=Quest', offerText: 'Shop events selection of women\'s health finds and more', endDate: 'Wed, 14 May, 2025', showCode: false, tags: ['Exclusive'] },
    { storeLogo: 'https://via.placeholder.com/100x100?text=Stanley', offerText: '20% OFF Japan Mug & Cups', endDate: 'Wed, 14 May, 2025', showCode: false, tags: ['Verified'] },
    { storeLogo: 'https://via.placeholder.com/100x100?text=Amazon', offerText: 'Shop first order with Email Sign Up', endDate: 'Wed, 14 May, 2025', showCode: false, tags: ['Verified'] },
    { storeLogo: 'https://via.placeholder.com/100x100?text=Casify', offerText: 'Mother\'s Day Sale: Buy 2+ Get 20% Off', endDate: 'Wed, 14 May, 2025', showCode: false, tags: ['Featured'] },
  ];

  // Carousel state and logic START - UNTOUCHED
  const [currentSlide, setCurrentSlide] = useState(0);
  const bannerData = [
    {
      image: "https://picsum.photos/1200/320?random=1",
      heading: "MEGA SAVINGS WEEK!",
      subheading: "Exclusive offers on top brands.",
      buttonText: "Shop Now",
      buttonLink: "/category/new-arrivals"
    },
    {
      image: "https://picsum.photos/1200/320?random=2",
      heading: "Travel Deals Await",
      subheading: "Book your next adventure with huge discounts.",
      buttonText: "Find Flights",
      buttonLink: "/category/travel"
    },
    {
      image: "https://picsum.photos/1200/320?random=3",
      heading: "Unlock Special Discounts",
      subheading: "Sign up and get 15% off your first purchase!",
      buttonText: "Register Now",
      buttonLink: "/register"
    },
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
    <div className="pb-12 font-sans" style={{ backgroundColor: 'var(--page-bg)' }}>
      {/* Banners Slider Section START */}
      <div className="w-full h-80 sm:h-96 md:h-[450px] lg:h-[550px] xl:h-[650px] overflow-hidden relative shadow-lg mb-10">
        <div
          className="carousel-container h-full flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {bannerData.map((banner, index) => (
            <div key={index} className="carousel-item h-full w-full flex-shrink-0 relative">
              <img src={banner.image} alt={`Banner ${index + 1}`} className="absolute inset-0 w-full h-full object-cover" />

              {/* Overlay Text and Button */}
              <div
                className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 z-10"
                style={{ backgroundColor: 'var(--banner-overlay-bg)' }}
              >
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-3 sm:mb-5 drop-shadow-md leading-tight max-w-4xl" style={{ color: 'var(--banner-text-color)' }}>
                  {banner.heading}
                </h2>
                <p className="text-md sm:text-lg md:text-xl lg:text-2xl mb-5 sm:mb-10 font-light drop-shadow-sm px-2 max-w-2xl" style={{ color: 'var(--banner-text-color)' }}>
                  {banner.subheading}
                </p>
                <Link
                  to={banner.buttonLink}
                  className="inline-block font-bold py-3 px-8 sm:py-4 sm:px-10 rounded-full text-md sm:text-lg shadow-xl transform transition-transform duration-300 hover:scale-105 border-2 border-transparent hover:border-white"
                  style={{
                    backgroundColor: 'var(--banner-button-bg)',
                    color: 'var(--banner-button-text)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--banner-button-bg-hover)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--banner-button-bg)';
                  }}
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
                {homePageOffers.map((offer, index) => (
                  <OfferCard key={index} {...offer} />
                ))}
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
                {[...Array(5)].map((_, i) => (
                  <li key={i} className="text-sm transition-colors duration-300"
                    style={{ color: 'var(--popular-link-default)' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--popular-link-hover)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--popular-link-default)'}
                  >
                    <Link to={`/store/store-name-${i + 1}`}>Store Name {i + 1}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Popular Categories */}
            <div
              className="p-6 rounded-lg shadow-lg"
              style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--card-border)' }}
            >
              <h3 className="text-xl font-bold mb-5" style={{ color: 'var(--main-heading-color)' }}>Popular Categories</h3>
              <ul className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <li key={i} className="text-sm transition-colors duration-300"
                    style={{ color: 'var(--popular-link-default)' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--popular-link-hover)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--popular-link-default)'}
                  >
                    <Link to={`/category/category-name-${i + 1}`}>Category Name {i + 1}</Link>
                  </li>
                ))}
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
            Welcome to <span className="font-semibold" style={{ color: 'var(--text-highlight)' }}>[Your Website Name]</span>! Your ultimate destination for discovering the best deals, coupons, and discounts across a wide range of stores and categories. We work tirelessly to bring you verified offers, ensuring you save money on your favorite brands. Start exploring today and make every purchase a smart one!
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
            {[...Array(4)].map((_, i) => (
              <Link
                to={`/blog/post/${i + 1}`}
                key={i}
                className="rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 block"
                style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--card-border)' }}
              >
                <div
                  className="w-full h-36 flex items-center justify-center text-sm"
                  style={{ backgroundColor: 'var(--blog-placeholder-bg)', color: 'var(--text-muted)' }}
                >
                  <img src={`https://picsum.photos/1200/320?random=${i + 1}`} alt={`Blog Post ${i + 1}`} className="w-full h-full object-cover" />
                </div>
                <div className="p-4">
                  <p className="text-base font-semibold mb-2" style={{ color: 'var(--blog-card-text)' }}>Blog Post Title {i + 1}</p>
                  <p className="text-sm" style={{ color: 'var(--blog-card-description)' }}>Short description of the blog post content. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>
              </Link>
            ))}
          </div>

          {/* See All Blogs Button */}
          <div className="text-center mt-10">
            <Link
              to="/blogs"
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
  );
};

export default HomePage;
