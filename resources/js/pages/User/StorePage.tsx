// resources/js/Pages/StorePage.jsx

import React, { useState, useEffect } from 'react';
import OfferCard from '@/components/OfferCard';
import WebLayout from '@/layouts/web-layout';
import { Link, useForm } from '@inertiajs/react'; // Import Link for Inertia.js navigation
import { toastDirection } from '@/lib/utils/Constants';
import toast from 'react-hot-toast';

interface SimilarStore {
    name: string | null,
    slug: string | null,
}

interface Store {
    id: number | null,
    name: string | null,
    thumbnail: string | null,
    affiliate_irl: string | null,
    desc: string | null,
    extra_info: string | null,
    ratings:number | 0
}

interface Coupon {
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

interface ExpiredCoupon {
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

interface Props {
    stores: Store, // Changed to single Store object based on usage
    similarStores: SimilarStore[],
    coupons: Coupon[],
    expiredCoupons: ExpiredCoupon[]
}

const StorePage = ({ coupons, stores, expiredCoupons, similarStores }: Props) => {

    const [userRating, setUserRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const { data, post, setData , reset} = useForm({
        store_id: stores.id,
        ratings: stores.ratings
    });
    // Load rating from local storage when the component mounts
    useEffect(() => {
        setUserRating(stores.ratings);
    }, [stores.name]);

    // Handle click on a star
    const handleClickStar = (rating: number) => {
        setUserRating(rating);
        setData('ratings', rating);

        if (stores.id) {
            post(route('ratings.store'), {
                data: {
                    store_id: stores.id,
                    ratings: rating, // <- use direct clicked value here
                },
                forceFormData: true,
                onSuccess: () => {
                    toast.success('Thanks for Your Ratings!', { position: toastDirection });
                },
            });
        }
    };
    // Helper function to render star icons
    const renderStars = (currentRating: number, setRating: React.Dispatch<React.SetStateAction<number>>, interactive: boolean = false) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <svg
                    key={i}
                    className={`h-7 w-7 transition-colors duration-200 ${(interactive ? (i <= (hoverRating || currentRating)) : (i <= currentRating))
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                        } ${interactive ? 'cursor-pointer' : ''}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    onMouseEnter={interactive ? () => setHoverRating(i) : undefined}
                    onMouseLeave={interactive ? () => setHoverRating(0) : undefined}
                    onClick={interactive ? () => handleClickStar(i) : undefined}
                >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.927 8.72c-.783-.57-.381-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                </svg>
            );
        }
        return stars;
    };


    return (
        <WebLayout>
            <div className="bg-gray-100 pb-8 min-h-screen">
                <div className="container mx-auto px-4 py-8">
                    {/* Breadcrumbs */}
                    <nav className="text-sm text-gray-600 mb-6">
                        <Link href="/" className="hover:underline">Home </Link> &gt;
                        <Link href="/stores" className="hover:underline ml-1">Stores</Link> &gt;
                        <span className="ml-1 font-semibold">{stores.name} Promo Codes</span>
                    </nav>

                    {/* Store Header Section */}
                    <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-8 mb-8 p-4 bg-white rounded-lg shadow-md">
                        <div className="w-32 h-32 flex-shrink-0 flex items-center justify-center rounded-lg overflow-hidden border border-gray-200">
                            <img src={stores.thumbnail || "https://via.placeholder.com/128x128?text=Store+Logo"} alt={`${stores.name} Logo`} className="w-full h-full object-contain p-2" />
                        </div>
                        {/* Adjusted: Main content area with store name, description, and button */}
                        <div className="flex-grow flex flex-col sm:flex-row items-center sm:items-start sm:justify-between w-full">
                            {/* Store Name and Description Group */}
                            <div className="text-center sm:text-left sm:flex-grow">
                                <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
                                    {stores.name}
                                </h1>
                                <p className="text-base sm:text-xl text-gray-600 mt-2">{stores.desc}</p>
                            </div>

                            {/* Visit Store Button */}
                            {stores.affiliate_irl && (
                                <div className="mt-4 sm:mt-0 sm:ml-6 flex-shrink-0"> {/* Adjusted margin-left for more space */}
                                    <a
                                        href={stores.affiliate_irl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center font-bold py-3 px-8 rounded-md transition-colors duration-200 text-base min-w-[150px]" /* Increased padding, text size, and added min-width */
                                        style={{ backgroundColor: 'var(--primary-orange)', color: 'var(--neutral-white)', margin: '35px' }}
                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--offer-button-hover-bg)'}
                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--primary-orange)'}
                                    >
                                        Visit Store
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column: Offers List */}
                        <div className="lg:col-span-2 lg:border-r lg:border-dotted lg:border-gray-400 lg:pr-8 pb-8">
                            {coupons.length > 0 ? coupons.map((offer, index) => (
                                <OfferCard key={index} storeName={stores.name} {...offer} />
                            )) : <span className="text-red-500">No Coupons Available</span>}
                            <p className="text-gray-600 mt-8 mb-4 text-center sm:text-left font-semibold border-b pb-2">
                                These offers have expired, but may still work
                            </p>
                            {expiredCoupons.length > 0 ? expiredCoupons.map((offer, index) => (
                                <OfferCard key={index} storeName={stores.name} {...offer} />
                            )) : <>
                                <span className="text-red-500">No Expired Coupons Available</span>
                            </>
                            }
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

                            {/* Rate Store Name - Dynamic */}
                            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                                <h3 className="text-xl font-bold text-gray-800 mb-4">Rate {stores?.name}</h3>
                                <div className="flex justify-center mb-2">
                                    {renderStars(userRating, setUserRating, true)}
                                </div>
                                <p className="text-gray-500 text-sm mt-1 text-center">
                                    {userRating > 0 ? `Your rating: ${userRating}.0` : 'Click stars to rate!'}
                                </p>
                            </div>

                            {/* Store Short Descriptions */}
                            <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-center text-gray-700 text-base h-auto min-h-[100px] border border-gray-200">
                                <p className="text-center">{stores.extra_info || 'No Info Available'}</p>
                            </div>

                            {/* Featured Links */}
                            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                                <h3 className="text-xl font-bold text-gray-800 mb-4">Featured Links</h3>
                                <ul className="list-disc list-inside space-y-2 text-blue-600">
                                    <li><a href={stores.affiliate_irl || "#"} className="hover:underline" target="_blank" rel="noopener noreferrer">Shop All Products</a></li>
                                    <li><a href={stores.affiliate_irl || "#"} className="hover:underline" target="_blank" rel="noopener noreferrer">New Arrivals</a></li>
                                    <li><a href={stores.affiliate_irl || "#"} className="hover:underline" target="_blank" rel="noopener noreferrer">Clearance Sale</a></li>
                                </ul>
                            </div>

                            {/* Same Category Stores */}
                            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                                <h3 className="text-xl font-bold text-gray-800 mb-4">More Stores Like {stores?.name}</h3>
                                <ul className="list-disc list-inside space-y-2 text-blue-600">
                                    {similarStores.length > 0 ? (
                                        similarStores.map((store, index) => (
                                            <li key={index}>
                                                <Link href={'/store/' + store.slug} className="hover:underline">
                                                    {store.name ?? "N/A"}
                                                </Link>
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
