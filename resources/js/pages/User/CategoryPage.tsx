// resources/js/Pages/CategoryPage.jsx

import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import OfferCard from '@/Components/OfferCard';

// IMPORTANT: Import the AppLayout component
import AppLayout from '@/layouts/app-layout'; // Adjust path if your layout is elsewhere
import WebLayout from '@/layouts/web-layout';
interface SingleCategory {
    name : string | null,
    slug : string | null,
    desc : string | null,
    image_icon : string | null,
    icon: string | null,
    is_popular: boolean | false,
}
interface Coupons {
        featured_image: string | null,
        title:string  | null,
        coupon_type:string  | null,
        code:string  | null,
        coupon_url:string  | null,
        is_verified: boolean | false,
        is_exclusive: boolean | false,
        is_featured: boolean | false,
        isExpired: boolean | false,
        expires: Date,
}
interface Props {
    coupons: Coupons,
    category : SingleCategory,
}
// Accept props from the Inertia controller, including categoryName
const CategoryPage = ({ categoryName , category , coupons}:Props) => {
  const {categories} = usePage().props;
  const popularCategories =  categories.filter(e => e.slug != category.slug && e.is_popular == true) ;
  const formatCategoryName = (name) => {
    if (!name) return 'Category';
    // Ensure the name is formatted correctly for display
    return name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const formattedCategoryName = formatCategoryName(category.name);



  return (

    <WebLayout>
      <div className="bg-gray-100 pb-8 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumbs */}
          <nav className="text-sm text-gray-600 mb-6">
            <Link href="/" className="hover:underline">Home</Link> &gt;
            <span className="ml-1 font-semibold">{category.name}</span>
          </nav>

          {/* Category Header - Adjusted for responsiveness */}
          <div className="flex flex-col md:flex-row items-center md:space-x-4 mb-8 text-center md:text-left">
            <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden shadow-sm flex items-center justify-center text-gray-600 mb-4 md:mb-0 flex-shrink-0">
              {/* Category Icon/Image Placeholder */}
                <img src={category.image_icon} alt={category.name} />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2 leading-tight">
                DISCOUNT CODES AND VOUCHERS FOR <br className="md:hidden" /> {category?.name.toUpperCase()}
              </h1>
              <p className="text-gray-600 text-sm sm:text-base">
                We have {coupons.length} live discount codes & deals in {category?.name}.
              </p>
            </div>
          </div>

          {/* Main Content Grid - Adjusted for responsiveness */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Offer Cards */}
            <div className="lg:col-span-2 lg:border-r lg:border-dotted lg:border-gray-400 lg:pr-8">
              {coupons.length > 0 ? coupons.map((offer, index) => (
                <OfferCard key={index} {...offer} />
              )) : <span className='text-red-500'>No Coupons Available</span>}
            </div>

            {/* Right Column: Sidebar */}
            <div className="lg:col-span-1 p-4 lg:pl-8 space-y-8 mt-8 lg:mt-0">
              {/* Category Description */}
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <h3 className="text-xl font-bold text-gray-800 mb-4">About {formattedCategoryName} Category</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                 {category.desc}
                </p>
              </div>

              {/* Popular Categories */}
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Popular Categories</h3>
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

          {/* Affiliate Line (consistent with Home Page) */}
          <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md my-8 w-full min-h-[8rem] flex items-center justify-center border border-gray-200">
            <p className="text-center text-gray-700 text-base leading-relaxed">
              As an affiliate partner, we may earn a commission from qualifying purchases made through links on our site. This helps support our work and allows us to continue providing you with the best deals and coupons. Thank you for your support!
            </p>
          </div>
        </div>
      </div>
    </WebLayout>
  );
};

export default CategoryPage;
