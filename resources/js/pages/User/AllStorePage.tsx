// src/components/AllStorePage.jsx
import WebLayout from '@/layouts/web-layout';
import { Link } from '@inertiajs/react';
import React, { useState, useEffect, useMemo, useCallback } from 'react';

interface Stores {
  id: number,
  name: string | null,
  slug: string | null,
  desc: string | null,
  imageUrl: string | null,
  totalOffers?: number; // Add totalOffers to the interface if it's used for sorting
  averageRating?: number; // Add averageRating
  totalReviews?: number; // Add totalReviews
  categories?: string[]; // Add categories if they are part of the store data
}

interface Props {
  allStores: Stores[],
}

const AllStorePage = ({ allStores }: Props) => {
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('offers'); // 'offers' or 'name'
  const [stores, setStores] = useState<Stores[]>(allStores); // Use internal state for stores to allow sorting/filtering
  const [selectedCategory, setSelectedCategory] = useState('All'); // Added state for category filtering

  // Dummy fetch function - REPLACE WITH YOUR ACTUAL API CALL
  const fetchStores = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // For demonstration, we're using `allStores` directly.
      // In a real application, you would fetch data here.
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
      setStores(allStores); // Use dummy data for now
    } catch (err) {
      console.error("Failed to fetch stores:", err);
      setError("Failed to load stores. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [allStores]);

  useEffect(() => {
    fetchStores();
  }, [fetchStores]);

  // Get unique categories from fetched stores data
  const uniqueCategories = useMemo(() => {
    const categories = new Set<string>();
    stores.forEach(store => {
      // Assuming store.categories is an array of strings
      store.categories?.forEach(cat => categories.add(cat));
    });
    return ['All', ...Array.from(categories)];
  }, [stores]);


  // Helper function to render star ratings
  const renderStars = (rating: number) => {
    const stars = [];
    // Ensure rating is a number and within 0-5
    const normalizedRating = Math.max(0, Math.min(5, Math.round(rating)));
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg
          key={i}
          className={`h-4 w-4 ${i <= normalizedRating ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.927 8.72c-.783-.57-.381-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
        </svg>
      );
    }
    return stars;
  };


  const filteredAndSortedStores = useMemo(() => {
    let filtered = [...stores]; // Create a copy to avoid mutating the original prop

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(store =>
        store.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        store.desc?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        store.categories?.some(cat => cat.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(store =>
        store.categories?.includes(selectedCategory)
      );
    }

    // Sort
    if (sortOrder === 'name') {
      filtered.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
    } else if (sortOrder === 'offers') {
      filtered.sort((a, b) => (b.totalOffers || 0) - (a.totalOffers || 0)); // Descending by offers
    }

    return filtered;
  }, [stores, searchTerm, selectedCategory, sortOrder]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center font-sans" style={{ backgroundColor: 'var(--page-bg)' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 mx-auto mb-4" style={{ borderColor: 'var(--primary-orange)' }}></div>
          <p className="text-lg" style={{ color: 'var(--text-muted)' }}>Loading stores...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center font-sans" style={{ backgroundColor: 'var(--page-bg)' }}>
        <div className="text-center p-8 rounded-lg shadow-lg border" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--error-border)' }}>
          <p className="text-xl font-semibold mb-4" style={{ color: 'var(--error-text)' }}>{error}</p>
          <button
            onClick={fetchStores}
            className="font-bold py-2 px-4 rounded-md transition-colors duration-200"
            style={{ backgroundColor: 'var(--error-button-bg)', color: 'var(--neutral-white)' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--error-button-hover)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--error-button-bg)'}
          >
            Retry Loading
          </button>
        </div>
      </div>
    );
  }

  return (
    <WebLayout>
      <div className="pb-12 font-sans" style={{ backgroundColor: 'var(--page-bg)' }}>
        <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8">
          {/* Breadcrumbs */}
          <nav className="text-sm mb-6">
            <a href='/' className='mx-2' style={{ color: 'var(--breadcrumb-separator-color)' }}>Home</a>
            <a style={{ color: 'var(--breadcrumb-separator-color)' }}>&gt;</a> &nbsp;
            <span className="font-semibold" style={{ color: 'var(--main-heading-color)' }}>All Stores</span>
          </nav>

          {/* Page Header */}
          <div
            className="p-6 sm:p-8 rounded-lg shadow-lg border mb-10 text-center"
            style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}
          >
            <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 leading-tight" style={{ color: 'var(--main-heading-color)' }}>
              Our Partner Stores
            </h1>
            <p className="text-base sm:text-lg" style={{ color: 'var(--text-muted)' }}>
              Discover thousands of stores offering amazing deals, coupons, and discounts.
            </p>
          </div>

          {/* Filters and Search Bar */}
          <div
            className="p-5 rounded-lg shadow-md border mb-8 flex flex-col md:flex-row items-center justify-between gap-4"
            style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}
          >
            <div className="w-full md:w-1/2 relative">
              <input
                type="text"
                placeholder="Search stores by name or category..."
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent"
                style={{
                  backgroundColor: 'var(--form-input-bg)',
                  color: 'var(--form-input-text)',
                  borderColor: 'var(--form-input-border)',
                }}
                onFocus={(e) => e.currentTarget.style.borderColor = 'var(--primary-orange)'}
                onBlur={(e) => e.currentTarget.style.borderColor = 'var(--form-input-border)'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                className="absolute right-0 top-0 mt-2 mr-3"
                style={{ color: 'var(--search-icon-color)' }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary-orange)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--search-icon-color)'}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              {/* Category Filter */}
              <div className="relative w-full sm:w-auto">
                <select
                  className="block appearance-none w-full border py-2 px-4 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:ring-2"
                  style={{
                    backgroundColor: 'var(--form-input-bg)',
                    borderColor: 'var(--form-input-border)',
                    color: 'var(--form-input-text)',    

                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = 'var(--primary-orange)'}
                  onBlur={(e) => e.currentTarget.style.borderColor = 'var(--form-input-border)'}
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {uniqueCategories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2" style={{ color: 'var(--form-input-text)' }}>
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                </div>
              </div>


              {/* Sort By */}
              <div className="relative w-full sm:w-auto">
                <select
                  className="block appearance-none w-full border py-2 px-4 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:ring-2"
                  style={{
                    backgroundColor: 'var(--form-input-bg)',
                    borderColor: 'var(--form-input-border)',
                    color: 'var(--form-input-text)',
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = 'var(--primary-orange)'}
                  onBlur={(e) => e.currentTarget.style.borderColor = 'var(--form-input-border)'}
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                >
                  <option value="offers">Sort by Offers</option>
                  <option value="name">Sort by Name (A-Z)</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2" style={{ color: 'var(--form-input-text)' }}>
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                </div>
              </div>
            </div>
          </div>

          {/* Stores Grid */}
          {filteredAndSortedStores.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredAndSortedStores.map((store) => (
                <div
                  key={store.id}
                  className="rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border flex flex-col items-center p-5 text-center"
                  style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}
                >
                  <div
                    className="w-24 h-24 flex items-center justify-center rounded-full overflow-hidden shadow-inner border mb-4" // Added mb-4 for spacing
                    style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--modal-logo-border)' }}
                  >
                    <img
                      src={store.imageUrl || "https://via.placeholder.com/100x100?text=Store+Logo"}
                      alt={`${store.name} Logo`}
                      className="w-full h-full object-contain p-2"
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--main-heading-color)' }}>
                    {store.name}
                  </h3>
                  <p className="text-sm mb-3 line-clamp-3" style={{ color: 'var(--text-muted)' }}>{store.desc}</p>
                  <div className="flex flex-wrap justify-center gap-2 text-xs mb-2">
                    {/* {store.categories && store.categories.map((cat, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 rounded-full text-[11px]"
                        style={{ backgroundColor: 'var(--tag-bg)', color: 'var(--tag-text)' }}
                      >
                        {cat}
                      </span>
                    ))} */}
                  </div>

                  {/* Rating Section */}
                  <div className="flex items-center justify-center mb-2">
                    {store.averageRating !== undefined && (
                      <div className="flex text-yellow-400 mr-1">
                        {renderStars(store.averageRating)}
                      </div>
                    )}
                    <span className="font-semibold text-sm" style={{ color: 'var(--main-heading-color)' }}>
                      {store.averageRating !== undefined ? store.averageRating.toFixed(1) : 'N/A'}
                    </span>
                    <span className="text-xs ml-1" style={{ color: 'var(--text-muted)' }}>
                      ({store.totalReviews || 0})
                    </span>
                  </div>

                  <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>
                    <span className="font-semibold" style={{ color: 'var(--text-highlight)' }}>{store.totalOffers || 0}</span> Offers Available
                  </p>

                  {/* Buttons side-by-side */}
                  <div className="flex justify-center gap-3 mt-auto w-full"> {/* Added w-full and gap-3 for spacing */}
                    <Link
                      href={'/store/' + store.slug}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold py-2 px-5 rounded-md transition-colors duration-200 text-sm flex-1 text-center" // Used flex-1 for equal width
                      style={{ backgroundColor: 'var(--primary-orange)', color: 'var(--neutral-white)' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--button-hover-orange)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--primary-orange)'}
                    >
                      Visit Store
                    </Link>
                    <Link
                      href={'/store/' + store.slug}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold py-2 px-5 rounded-md transition-colors duration-200 text-sm flex-1 text-center" // Used flex-1 for equal width
                      style={{ backgroundColor: 'var(--primary-orange)', color: 'var(--neutral-white)' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--button-hover-orange)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--primary-orange)'}
                    >
                      View Offers
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div
              className="p-6 sm:p-8 rounded-lg shadow-lg border text-center"
              style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}
            >
              <p className="text-xl" style={{ color: 'var(--text-default)' }}>No stores found matching your criteria.</p>
              <button
                onClick={() => { setSearchTerm(''); setSelectedCategory('All'); setSortOrder('offers'); }}
                className="mt-4 inline-block font-bold py-2 px-4 rounded-md transition-colors duration-200"
                style={{ backgroundColor: 'var(--primary-orange)', color: 'var(--neutral-white)' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--button-hover-orange)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--primary-orange)'}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </WebLayout>
  );
};

export default AllStorePage;
