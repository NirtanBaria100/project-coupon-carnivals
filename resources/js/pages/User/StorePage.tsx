// resources/js/Pages/StorePage.jsx

import React from 'react';
import OfferCard from '@/Components/OfferCard';
import WebLayout from '@/layouts/web-layout';

// IMPORTANT: Import the AppLayout component
// import AppLayout from '@/layouts/app-layout'; // Adjust path if your layout is elsewhere
interface SimilarStore {
    name: string | null,
    slug:string | null,
}
interface Store {
    name: string | null,
    thumbnail:string | null,
    affiliate_irl:string | null,
    desc:string | null,
    extra_info: string | null,
}
interface Coupon {
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
interface ExpiredCoupon {
    featured_image: string | null,
    title:string  | null,
    coupon_type:string  | null,
    code:string  | null,
    coupon_url:string  | null,
    is_verified: boolean | false,
    is_exclusive: boolean | false,
    is_featured : boolean | false,
    isExpired: boolean | false,
    expires: Date,
}
interface Props {
stores: Store[],
similarStores : SimilarStore[],
coupons: Coupon[],
expiredCoupons: ExpiredCoupon[]
}
const StorePage = ({ coupons , stores , expiredCoupons , similarStores}:Props) => {
  return (
    // Wrap the entire content of StorePage with AppLayout
     <WebLayout>
      <div className="bg-gray-100 pb-8 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumbs */}
          <nav className="text-sm text-gray-600 mb-6">
            <a href="/" className="hover:underline">Home </a> &gt;
            <a href="/stores" className="hover:underline ml-1">Stores</a> &gt;
            <span className="ml-1 font-semibold">{stores.name} Promo Codes</span>
          </nav>

          {/* Store Header Section */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-8 mb-8 p-4 bg-white rounded-lg shadow-md">
            <div className="w-32 h-32 flex-shrink-0 flex items-center justify-center rounded-lg overflow-hidden border border-gray-200">
              <img src={stores.thumbnail} alt={`${stores.thumbnail} Logo`} className="w-full h-full object-contain p-2" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 text-center sm:text-left">
                {stores.name}
              </h1>
              <p className="text-base sm:text-xl text-gray-600 mt-2 text-center sm:text-left">{stores.desc}</p>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Offers List */}
            <div className="lg:col-span-2 lg:border-r lg:border-dotted lg:border-gray-400 lg:pr-8 pb-8">
              {coupons.length > 0 ? coupons.map((offer, index) => (
                <OfferCard key={index} storeName={stores.name}  affiliate_irl={stores.affiliate_irl} {...offer} />
              )) :  <span className="text-red-500">No  Coupons Available</span>}
              <p className="text-gray-600 mt-8 mb-4 text-center sm:text-left font-semibold border-b pb-2">
                These offers have expired, but may still work
              </p>
              {expiredCoupons.length > 0 ? expiredCoupons.map((offer, index) => (
                <OfferCard key={index} storeName={stores.name} affiliate_irl={stores.affiliate_irl} {...offer} />
              )) : <>
              <span className="text-red-500">No Expired Coupons Available</span>
              </>}
            </div>

            {/* Right Column: Sidebar */}
            <div className="lg:col-span-1 p-4 lg:pl-8 space-y-8 mt-8 lg:mt-0">
              {/* Offer Summary */}
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Offer Summary</h3>
                <p className="text-gray-700 text-sm">Active Codes: {coupons.filter(e => e.coupon_type == 'code').length}</p>
                <p className="text-gray-700 text-sm">Active Deals: {coupons.filter(e => e.coupon_type == 'deal').length}</p>
                <p className="text-gray-500 text-xs mt-2">Last updated: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
              </div>

              {/* Rate Store Name */}
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Rate {stores?.name}</h3>
                <p className="text-blue-600 text-lg font-bold">★★★★★</p>
                <p className="text-gray-500 text-sm mt-1">5.0 from 312 Users</p>
              </div>

              {/* Store Short Descriptions */}
              <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-center text-gray-700 text-base h-auto min-h-[100px] border border-gray-200">
                <p className="text-center">{stores.extra_info || 'No Info Available'}</p>
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
                <h3 className="text-xl font-bold text-gray-800 mb-4">More Stores Like {stores?.name}</h3>
                <ul className="list-disc list-inside space-y-2 text-blue-600">
                  {/* IMPORTANT: Change these to <Link href="..." /> if they are internal Inertia routes */}
             {similarStores.length > 0 ? (
                similarStores.map((store, index) => (
                    <li key={index}>
                    <a href={'/store/'+ store.slug} className="hover:underline" target='_blank'>
                        {store.name ?? "N/A"}
                    </a>
                    </li>
                ))
                ) : (
                <span className="text-red-500 text-center">No Similar Stores Available</span>
                )}
                </ul>
                <p className="text-gray-500 text-sm mt-4">{similarStores.length} similar stores in this category.</p>
              </div>
            </div>
          </div>

          {/* Long Description Section */}
          <div className="bg-white p-6 rounded-lg shadow-md my-8 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-800 mb-4">About {stores.name}</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
             {stores.desc}
            </p>
          </div>

        </div>
      </div>
   </WebLayout>
  );
};

export default StorePage;
