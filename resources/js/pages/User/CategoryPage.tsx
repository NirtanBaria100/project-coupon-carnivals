// resources/js/Pages/CategoryPage.jsx

import React from 'react';
import { Link } from '@inertiajs/react';
import OfferCard from '@/Components/OfferCard';

// IMPORTANT: Import the AppLayout component
import AppLayout from '@/layouts/app-layout'; // Adjust path if your layout is elsewhere

// Accept props from the Inertia controller, including categoryName
const CategoryPage = ({ categoryName }) => {
  const formatCategoryName = (name) => {
    if (!name) return 'Category';
    // Ensure the name is formatted correctly for display
    return name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const formattedCategoryName = formatCategoryName(categoryName);

  // Dummy data for offers on a category page (replace with real data later)
  const categoryOffers = [
    { storeLogo: 'https://via.placeholder.com/60x60?text=StoreA', offerText: 'New Customers - 10% off your first order', endDate: 'Valid Until 2025', showCode: true, offerValue: 'FIRST10', tags: ['Verified', 'Exclusive'] },
    { storeLogo: 'https://via.placeholder.com/60x60?text=StoreB', offerText: 'Exclusive! - 11% off sitewide', endDate: 'Valid Until 2025', showCode: true, offerValue: 'SITE11', tags: ['Verified', 'Featured'] },
    { storeLogo: 'https://via.placeholder.com/60x60?text=StoreC', offerText: 'Free Shipping when you spend $75+ with Shop Now!', endDate: 'Some restrictions apply', showCode: false, tags: ['Verified'] },
    { storeLogo: 'https://via.placeholder.com/60x60?text=StoreD', offerText: 'Free Shipping on Orders $49+', endDate: 'Valid Until 2025', showCode: true, offerValue: 'SHIPFREE', tags: ['Verified', 'Exclusive'] },
    { storeLogo: 'https://via.placeholder.com/60x60?text=StoreE', offerText: '$5 OFF $25+ Order with Email Sign Up', endDate: 'Valid Until 2025', showCode: false, tags: ['Verified'] },
    { storeLogo: 'https://via.placeholder.com/60x60?text=StoreF', offerText: 'Free Shipping on All Orders $45+', endDate: 'Valid Until 2025', showCode: false, tags: ['Verified', 'Exclusive'] },
    { storeLogo: 'https://via.placeholder.com/60x60?text=StoreG', offerText: 'Free Shipping on $75+ order', endDate: 'Valid Until 2025', showCode: false, tags: ['Verified'] },
    { storeLogo: 'https://via.placeholder.com/60x60?text=StoreH', offerText: 'Free Shipping on $29+ order', endDate: 'Valid Until 2025', showCode: false, tags: ['Verified', 'Exclusive'] },
  ];

  return (
    // Wrap the entire content of CategoryPage with AppLayout
    <AppLayout>
      <div className="bg-gray-100 pb-8 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumbs */}
          <nav className="text-sm text-gray-600 mb-6">
            <Link href="/" className="hover:underline">Home</Link> &gt;
            <span className="ml-1 font-semibold">{formattedCategoryName}</span>
          </nav>

          {/* Category Header - Adjusted for responsiveness */}
          <div className="flex flex-col md:flex-row items-center md:space-x-4 mb-8 text-center md:text-left">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 mb-4 md:mb-0 flex-shrink-0">
              {/* Category Icon/Image Placeholder */}
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2H7a2 2 0 00-2 2v2m7-7V3"></path></svg>
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2 leading-tight">
                DISCOUNT CODES AND VOUCHERS FOR <br className="md:hidden" /> {formattedCategoryName.toUpperCase()}
              </h1>
              <p className="text-gray-600 text-sm sm:text-base">
                We have 564 live discount codes & deals in {formattedCategoryName}.
              </p>
            </div>
          </div>

          {/* Main Content Grid - Adjusted for responsiveness */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Offer Cards */}
            <div className="lg:col-span-2 lg:border-r lg:border-dotted lg:border-gray-400 lg:pr-8">
              {categoryOffers.map((offer, index) => (
                <OfferCard key={index} {...offer} />
              ))}
            </div>

            {/* Right Column: Sidebar */}
            <div className="lg:col-span-1 p-4 lg:pl-8 space-y-8 mt-8 lg:mt-0">
              {/* Category Description */}
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <h3 className="text-xl font-bold text-gray-800 mb-4">About {formattedCategoryName} Category</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Explore the best deals and discount codes in the **{formattedCategoryName}** category. Whether you're looking for home decor, gardening tools, or outdoor essentials, find verified vouchers and promotional offers from leading brands. Our team constantly updates this section to ensure you have access to the freshest and most reliable discounts. Save big on everything for your home and garden!
                </p>
              </div>

              {/* Popular Categories */}
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Popular Categories</h3>
                <ul className="space-y-3">
                  {[...Array(5)].map((_, i) => (
                    <li key={i} className="text-gray-700 hover:text-blue-600 cursor-pointer text-sm">
                      <Link href={`/category/popular-category-${i + 1}`}>Popular Category {i + 1}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Affiliate Line (consistent with Home Page) */}
          <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md my-8 w-full min-h-[8rem] flex items-center justify-center border border-gray-200">
            <p className="text-center text-gray-700 text-base leading-relaxed">
              As an affiliate partner, we may earn a commission from qualifying purchases made through links on our site. This helps support our work and allows us to continue providing you with the best deals and coupons. Thank you for your support!
            </p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default CategoryPage;
