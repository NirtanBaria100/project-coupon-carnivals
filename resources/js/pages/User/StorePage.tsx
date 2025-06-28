// resources/js/Pages/StorePage.jsx

import React from 'react';
import { Link } from '@inertiajs/react';
import OfferCard from '@/Components/OfferCard';

// IMPORTANT: Import the AppLayout component
// import AppLayout from '@/layouts/app-layout'; // Adjust path if your layout is elsewhere
interface Store {
    name  : string | null,
    thumbnail:string | null,
    affiliate_irl:string | null,
    desc:string | null
}
interface Coupon {
    featured_image: string | null,
    title:string  | null,
    coupon_type:string  | null,
    code:string  | null,
    coupon_url:string  | null,
    is_verified: boolean | false,
    is_exclusive: boolean | false,
    isExpired: boolean | false,
    expires: Date,
}
interface Props {
store: Store[],
coupons: Coupon[]
}
// Accept props from the Inertia controller, including storeName
const StorePage = ({ coupons , store }:Props) => { // Removed ':string' as it's not standard React prop type syntax

  // Dummy data for offers on a store page
  const storeOffers = [
    { storeLogo: 'https://cdn.worldvectorlogo.com/logos/the-body-shop-1.svg', offerText: 'Free Vitamin C tonic when you spend £45 at The Body Shop', endDate: 'Wed, 14 May, 2025', showCode: true, offerValue: 'VITC15', tags: ['Verified', 'Exclusive', 'Featured'] },
    { storeLogo: 'https://cdn.worldvectorlogo.com/logos/the-body-shop-1.svg', offerText: '15% Off Your First Order Online', endDate: 'Fri, 30 Jun, 2025', showCode: true, offerValue: 'FIRST15', tags: ['Exclusive'] },
    { storeLogo: 'https://cdn.worldvectorlogo.com/logos/the-body-shop-1.svg', offerText: 'Seasonal Sale: Up to 50% Off Selected Items', endDate: 'Sun, 15 Jul, 2025', showCode: false, offerValue: 'https://www.thebodyshop.com/sale', tags: ['Featured'] },
    { storeLogo: 'https://cdn.worldvectorlogo.com/logos/the-body-shop-1.svg', offerText: 'Free Shipping on Orders Over £30', endDate: 'Mon, 31 Aug, 2025', showCode: false, offerValue: 'https://www.thebodyshop.com/shipping', tags: ['Verified'] },
    { storeLogo: 'https://cdn.worldvectorlogo.com/logos/the-body-shop-1.svg', offerText: 'Buy One Get One Free on Face Masks', endDate: 'Wed, 14 May, 2025', showCode: true, offerValue: 'BOGOFMASK', tags: ['Verified', 'New'] },
  ];

  // Dummy data for expired offers
  const expiredOffers = [
    { storeLogo: 'https://cdn.worldvectorlogo.com/logos/the-body-shop-1.svg', offerText: 'This offer has expired, but may still work', endDate: 'Wed, 14 May, 2025', showCode: true, offerValue: 'EXPIRED1', isExpired: true, tags: ['Verified'] },
    { storeLogo: 'https://cdn.worldvectorlogo.com/logos/the-body-shop-1.svg', offerText: 'Expired Offer example, still works sometimes', endDate: 'Tue, 12 Apr, 2025', showCode: false, offerValue: 'https://www.thebodyshop.com/old-offer', isExpired: true, tags: ['Verified'] },
    { storeLogo: 'https://cdn.worldvectorlogo.com/logos/the-body-shop-1.svg', offerText: 'Another expired deal you might like', endDate: 'Mon, 01 Mar, 2025', showCode: false, offerValue: 'https://www.thebodyshop.com/another-old-deal', isExpired: true, tags: ['Verified'] },
  ];

  return (
    // Wrap the entire content of StorePage with AppLayout
    // <AppLayout>
      <div className="bg-gray-100 pb-8 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumbs */}
          <nav className="text-sm text-gray-600 mb-6">
            <Link href="/" className="hover:underline">Home </Link> &gt;
            <Link href="/stores" className="hover:underline ml-1">Stores</Link> &gt;
            <span className="ml-1 font-semibold">{store.name} Promo Codes</span>
          </nav>

          {/* Store Header Section */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-8 mb-8 p-4 bg-white rounded-lg shadow-md">
            <div className="w-32 h-32 flex-shrink-0 flex items-center justify-center rounded-lg overflow-hidden border border-gray-200">
              <img src={store.thumbnail} alt={`${store.thumbnail} Logo`} className="w-full h-full object-contain p-2" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 text-center sm:text-left">
                {store.name}
              </h1>
              <p className="text-base sm:text-xl text-gray-600 mt-2 text-center sm:text-left">{store.desc}</p>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Offers List */}
            <div className="lg:col-span-2 lg:border-r lg:border-dotted lg:border-gray-400 lg:pr-8 pb-8">
              {coupons.map((offer, index) => (
                <OfferCard key={index} storeName={store.name} {...offer} />
              ))}
              <p className="text-gray-600 mt-8 mb-4 text-center sm:text-left font-semibold border-b pb-2">
                These offers have expired, but may still work
              </p>
              {expiredOffers.map((offer, index) => (
                <OfferCard key={index} storeName={store.name} {...offer} />
              ))}
            </div>

            {/* Right Column: Sidebar */}
            <div className="lg:col-span-1 p-4 lg:pl-8 space-y-8 mt-8 lg:mt-0">
              {/* Offer Summary */}
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Offer Summary</h3>
                <p className="text-gray-700 text-sm">Active Codes: 2</p>
                <p className="text-gray-700 text-sm">Active Deals: 7</p>
                <p className="text-gray-500 text-xs mt-2">Last updated: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
              </div>

              {/* Rate Store Name */}
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Rate {store?.name}</h3>
                <p className="text-blue-600 text-lg font-bold">★★★★★</p>
                <p className="text-gray-500 text-sm mt-1">5.0 from 312 Users</p>
              </div>

              {/* Store Short Descriptions */}
              <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-center text-gray-700 text-base h-auto min-h-[100px] border border-gray-200">
                <p className="text-center">Short description of {store?.name} and its products/services. This section can include a brief history or unique selling points.</p>
              </div>

              {/* Featured Links (these should also point to Laravel routes if they navigate within your app) */}
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Featured Links</h3>
                <ul className="list-disc list-inside space-y-2 text-blue-600">
                  {/* IMPORTANT: Change these to <Link href="..." /> if they are internal Inertia routes */}
                  <li><a href="#" className="hover:underline">Shop All Products</a></li>
                  <li><a href="#" className="hover:underline">New Arrivals</a></li>
                  <li><a href="#" className="hover:underline">Clearance Sale</a></li>
                </ul>
              </div>

              {/* Same Category Stores (these should also point to Laravel routes if they navigate within your app) */}
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <h3 className="text-xl font-bold text-gray-800 mb-4">More Stores Like {store?.name}</h3>
                <ul className="list-disc list-inside space-y-2 text-blue-600">
                  {/* IMPORTANT: Change these to <Link href="..." /> if they are internal Inertia routes */}
                  <li><a href="#" className="hover:underline">Brand A</a></li>
                  <li><a href="#" className="hover:underline">Brand B</a></li>
                  <li><a href="#" className="hover:underline">Brand C</a></li>
                </ul>
                <p className="text-gray-500 text-sm mt-4">12 similar stores in this category.</p>
              </div>
            </div>
          </div>

          {/* Long Description Section */}
          <div className="bg-white p-6 rounded-lg shadow-md my-8 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-800 mb-4">About {store.name}</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
             {store.desc}
            </p>
          </div>

        </div>
      </div>
    // </AppLayout>
  );
};

export default StorePage;
