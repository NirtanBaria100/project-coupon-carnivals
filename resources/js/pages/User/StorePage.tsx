// resources/js/Pages/StorePage.jsx

import React, { useState, useEffect } from 'react';
import OfferCard from '@/components/OfferCard';
import WebLayout from '@/layouts/web-layout';
import { Link, useForm } from '@inertiajs/react';
import { toastDirection } from '@/lib/utils/Constants';
import toast from 'react-hot-toast';
import PageMeta from '@/components/PageMeta';
import { json } from 'stream/consumers';

interface SimilarStore {
    name: string | null,
    slug: string | null,
}
interface FeaturedLinks {
    name: string | null,
    slug: string | null,
}
interface StoreRating {
  id: number;
  store_id: number;
  ip_address: string;
  ratings: number;
  is_approved: number;
  created_at: string;
  updated_at: string;
}
interface Store {
    id: number | null,
    totalRatings: number | 0,
    name: string | null,
    thumbnail: string | null,
    affiliate_irl: string | null, // Keeping this for OfferCard but removed from direct UI links
    desc: string | null,
    extra_info: string | null,
    ratings: number | 0 // This comes from backend as the store's average rating
    slug: string | null,
    home_url: string | null,
    meta_description: string | '',
    seo_title: string | '',
    focus_keyphrase: string | '',
    store_ratings: StoreRating[],
    updated_at:Date,
    coupon_updated:Date | null,
}

interface Coupon {
    featured_image: string | null,
    title: string | null,
    coupon_type: string | null,
    code: string | null,
    coupon_url: string | null,
    is_verified: boolean | false,
    is_exclusive: boolean | false,
    id: number | false,
    is_featured: boolean | false,
    isExpired: boolean | false,
    expires: Date,
}

interface ExpiredCoupon {
    id:number,
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
    stores: Store,
    similarStores: SimilarStore[],
    coupons: Coupon[],
    expiredCoupons: ExpiredCoupon[],
    featuredLinks: FeaturedLinks[]
}

const StorePage = ({ coupons, stores, expiredCoupons, similarStores, featuredLinks }: Props) => {

    const [userRating, setUserRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);

    const { data, post, setData,  } = useForm({
        store_id: stores.id,
        ratings: stores.ratings
    });
    // Load rating from local storage when the component mounts
    useEffect(() => {
        const ratingsArray = stores.store_ratings || [];
        let ratings:number=0;
        // calculating avg
        if (ratingsArray.length > 0) {
            const sum = ratingsArray.reduce((acc, r) => acc + r.ratings, 0);
            const average = sum / ratingsArray.length;
            ratings=average
        } else {
            ratings=0;
        }
        // Initialize userRating with the store's average rating from props
        setUserRating(ratings);
    }, [stores.store_ratings]); // Depend on stores.store_ratings to update if it changes

    // Handle click on a star - this part still sends rating to backend
    const [pendingRating, setPendingRating] = useState<number | null>(null);

    useEffect(() => {
        if (pendingRating !== null && data.ratings === pendingRating) {
            post(route('ratings.store'), {
                forceFormData: true,
                onSuccess: () => {
                    toast.success('Thanks for Your Ratings!', { position: toastDirection });
                    setPendingRating(null); // reset
                },
            });
        }
    }, [data.ratings, pendingRating]);

    const handleClickStar = (rating: number) => {
        setUserRating(rating);
        setData('ratings', rating);
        setPendingRating(rating);
    };

    // Helper function to render star icons
    // The `interactive` flag determines if the stars can be clicked/hovered for user input
    const renderStars = (currentRating: number, interactive: boolean = false) => {
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
            {/* <PageMeta title={'A'} description={stores.meta_description} keywords={stores.focus_keyphrase} /> */}
            <div className="bg-white pb-8 min-h-screen">
                <div className="container mx-auto px-4 py-8">
                    {/* Breadcrumbs */}
                    <nav className="text-sm text-gray-600 mb-6">
                        <Link href="/" className="hover:underline">Home </Link> &gt;
                        <Link href="/stores" className="hover:underline ml-1">Stores</Link> &gt;
                        <span className="ml-1 font-semibold">{stores.name}</span>
                    </nav>

                    {/* Store Header Section */}
                    {/* Added 'justify-center' to the parent flex container for horizontal centering when space allows, and on small screens */}
                    <div className="store-thumbnail-div flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-8 mb-8 p-4 bg-white rounded-lg shadow-md justify-center">
                        <div className="flex-shrink-0 flex items-center justify-center rounded-lg overflow-hidden border border-gray-200 mb-0 store-thumbnail-firstdiv">
                            {/* Removed: The <a> tag around the image */}
                           <Link target='_blank' href={stores?.home_url?.toString() ||stores?.affiliate_irl?.toString() }> <img src={stores.thumbnail || "https://via.placeholder.com/128x128?text=Store+Logo"} alt={`${stores.name} Logo`} className="w-40 h-30 object-contain p-2" /></Link>
                        </div>
                        {/* Ensure text content (h1, p) is centered on smaller screens and aligns below image */}
                        <div className="flex-grow flex flex-col items-center sm:items-start w-full store-thumbnail-secdiv">
                            <div className="text-center sm:text-left sm:flex-grow w-full"> {/* Added w-full here for better centering control */}
                                {/* Removed: The <a> tag around the h1 */}
                                <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
                                    {stores.name}
                                </h1>
                                <div  className="prose max-w-none leading-relaxed"
                            style={{ color: "var(--text-default)" }}  dangerouslySetInnerHTML={{ __html: stores.desc }} ></div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column: Offers List */}
                        <div className="lg:col-span-2 lg:border-r lg:border-dotted lg:border-gray-400 lg:pr-8 pb-8 storepage_leftcoloffers">
                            {coupons.length > 0 ? coupons.map((offer, index) => (
                                <OfferCard key={index} coupon_id={offer.id} type="stores" store_slug={'/store/' + stores.slug} store={stores} affiliate_url={offer.coupon_url || stores.affiliate_irl} storeName={stores.name} {...offer} />
                            )) : <span className="text-red-500">No Coupons Available</span>}
                            {expiredCoupons.length > 0 ? <><p className="text-gray-600 mt-8 mb-4 text-center sm:text-left font-semibold border-b pb-2">
                                These offers have expired, but may still work
                            </p> {expiredCoupons.map((offer, index) => (

                                <OfferCard key={index} coupon_id={offer.id} store_slug={'/store/' + stores.slug} store={stores} affiliate_url={offer.coupon_url || stores.affiliate_irl} storeName={stores.name} {...offer} type={"stores"} />
                            ))}</> : <>
                                {/* <hr /> <br /> <span className="text-red-500">No Expired Coupons Available</span> */}
                            </>}
                        </div>

                        {/* Right Column: Sidebar */}
                        <div className="lg:col-span-1 p-4 lg:pl-8 space-y-8 mt-8 lg:mt-0 storepage_rightcolsidebar">
                            {/* Offer Summary */}
                            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                                <h3 className="text-xl font-bold text-gray-800 mb-4">Offer Summary</h3>
                                <p className="text-gray-700 text-sm">Active Codes: {coupons.filter(e => e.coupon_type == 'code').length}</p>
                                <p className="text-gray-700 text-sm">Active Deals: {coupons.filter(e => e.coupon_type == 'deal').length}</p>
                               {(stores?.coupon_updated || stores?.updated_at) && (
                                <>
                                <p className="text-gray-500 text-xs mt-2">
                                    Last updated:{' '}
                                    {new Date(stores.coupon_updated || stores.updated_at).toLocaleDateString('en-GB', {
                                    day: 'numeric',
                                    month: 'short',
                                    year: 'numeric',
                                    })}
                                </p>
                                </>
                                )}

                            </div>

                            {/* Rate Store Name - Dynamic */}
                            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                                <h3 className="text-xl font-bold text-gray-800 mb-4">Rate {stores?.name}</h3>
                                <div className="flex justify-center mb-2">
                                 
                                    {renderStars(userRating, true)} {/* Pass true to make stars interactive */}
                                </div>
                              <p className="text-gray-500 text-sm mt-1 text-center">
                                <span className="font-semibold text-gray-700">
                                    {stores.store_ratings?.length || 0} &nbsp; rating{stores.store_ratings?.length === 1 ? '' : 's'}
                                </span>{' '}
                                with an average rating of{' '}
                                <span className="font-semibold text-gray-700">
                                    {stores.store_ratings && stores.store_ratings.length > 0
                                    ? (
                                        stores.store_ratings.reduce((sum, r) => sum + r.ratings, 0) /
                                        stores.store_ratings.length
                                        ).toFixed(1)
                                    : '0.0'} out of 5 stars.
                                </span>
                                </p>
                            </div>

                            {/* Store Short Descriptions */}
                            {stores.extra_info && <div className="bg-white p-6 rounded-lg shadow-md flex text-gray-700 text-base h-auto min-h-[100px] border border-gray-200 store_sidebar_above">
                                <div
                                    className="prose max-w-none leading-relaxed"
                                    style={{ color: "var(--text-default)" }}
                                    dangerouslySetInnerHTML={{ __html: stores.extra_info }}
                                ></div>
                            </div>}

                            {/* Popular Categories */}
                            {featuredLinks.length > 0 && (
                                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                                    <h3 className="text-xl font-bold text-gray-800 mb-4">Popular Categories</h3>
                                    <ul className="list-disc list-inside space-y-2 text-blue-600 storepage_featuredlink">
                                        {featuredLinks.map((store, index) => (
                                            <li key={index}>
                                                <Link href={'/category/' + store.slug} className="hover:underline">
                                                    {store.name ?? "N/A"}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Same Category Stores */}
                            {similarStores.length > 0 && (
                                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                                    <h3 className="text-xl font-bold text-gray-800 mb-4">Similar Stores</h3>
                                    <ul className="list-disc list-inside space-y-2 text-blue-600 samcat_storepage">
                                        {similarStores.map((store, index) => (
                                            <li key={index}>
                                                <Link href={'/store/' + store.slug} className="hover:underline">
                                                    {store.name ?? "N/A"}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                    <p className="text-gray-500 text-sm mt-4">{similarStores.length} similar stores in this category.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Long Description Section */}

                    {stores.desc ? <div className="bg-white p-6 rounded-lg shadow-md my-8 border border-gray-200 storepage_longdescsec">
                        {/* <h3 className="text-xl font-bold text-gray-800 mb-4">About {stores.name}</h3> */}
                        <div
                            className="prose max-w-none leading-relaxed"
                            style={{ color: "var(--text-default)" }}
                             dangerouslySetInnerHTML={{ __html: stores.extra_info }} 
                           
                        ></div>
                    </div>
                        : <></>}

                </div>
            </div>
        </WebLayout>
    );
};

export default StorePage;
