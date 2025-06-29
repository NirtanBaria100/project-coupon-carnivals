import React, { useState, useEffect, useMemo, useCallback } from 'react';
// Assuming ChevronDownIcon comes from a library like @heroicons/react
// If not, you'll need to provide its SVG or import it from wherever it's defined.
import { ChevronDownIcon } from '@heroicons/react/24/solid'; // Adjust import path if needed

const OfferCard = ({
  featured_image,
  title, // Replaces offerText
  coupon_type, // Determines if it's a code or link offer
  code, // The actual coupon code
  isExpired,
  is_verified, // Backend flag for verified tag
  is_featured, // Backend flag for featured tag
  is_exclusive, // Backend flag for exclusive tag
  expires, // Replaces endDate
  coupon_url, // The URL to visit for the offer
  storeName, // Replaces default "The Body Shop"
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copyStatus, setCopyStatus] = useState('');
  const [showTermsMessage, setShowTermsMessage] = useState(false);

  // Use 'code' as offerValue for consistency with original modal logic
  const offerValue = code;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(offerValue)
      .then(() => {
        setCopyStatus('Copied!');
        setTimeout(() => setCopyStatus(''), 2000);
      })
      .catch(err => {
        console.error('Failed to copy text: ', err); // Added console error for debugging
        setCopyStatus('Failed to copy!');
      });
  };

  const handleViewTermsClick = () => {
    setShowTermsMessage(prev => !prev);
  };

  const handleOfferButtonClick = () => {
    if (!isExpired) {
      // If it's a code, copy it. The modal will show the code.
      // If it's not a code (i.e., 'Get Offer'), the modal will just show instructions.
      if (coupon_type === 'code' && offerValue) {
        navigator.clipboard.writeText(offerValue);
      }

      // Open the offer URL in a new tab
      // This uses coupon_url from the backend props
      if (coupon_url) {
        window.open(coupon_url, '_blank');
      }

      // Always open the modal after opening the link/copying code
      setIsModalOpen(true);
    }
  };

  const handleBackdropClick = (e) => {
    // Corrected backdrop click logic to ensure only backdrop clicks close the modal
    if (e.target === e.currentTarget) {
      setIsModalOpen(false);
    }
  };

  // Determine button text based on coupon_type
  const buttonText = coupon_type === 'code' ? 'Show Code' : 'Get Offer';

  // Consistent button colors using CSS variables from the polished UI
  const buttonBgColor = isExpired ? 'bg-[var(--offer-button-disabled-bg)] cursor-not-allowed' : 'bg-[var(--offer-button-bg)]';
  const buttonTextColor = 'text-[var(--offer-button-text)]';

  // Default images for fallback
  const defaultStoreLogo = "https://via.placeholder.com/100x100?text=Store+Logo";
  const defaultStoreImage = "https://via.placeholder.com/150x150?text=Brand+Image";

  // Tags array generation based on backend flags
  const tags = [];
  if (is_verified) {
    tags.push('verified');
  }
  if (is_exclusive) {
    tags.push('exclusive');
  }
  if (is_featured) {
    tags.push('featured');
  }

  // Get partial code for the scratched effect
  const getPartialCode = useCallback(() => {
    return coupon_type === 'code' && offerValue ? offerValue.substring(0, 3).toUpperCase() : '---';
  }, [coupon_type, offerValue]); // Dependency array updated

  // UI Change: Tag styles updated to new palette
  const getTagStyle = (tag) => {
    switch (tag.toLowerCase()) {
      case 'verified':
        return 'bg-[var(--tag-verified-bg)] text-[var(--tag-verified-text)] font-medium';
      case 'exclusive':
        return 'bg-[var(--tag-exclusive-bg)] text-[var(--tag-exclusive-text)] font-medium';
      case 'featured':
        return 'bg-[var(--tag-featured-bg)] text-[var(--tag-featured-text)] font-medium';
      case 'new': // Keep 'new' tag style even if not currently pushed from backend props
        return 'bg-[var(--tag-new-bg)] text-[var(--tag-new-text)] font-medium';
      default:
        return 'bg-[var(--tag-default-bg)] text-[var(--tag-default-text)] font-medium';
    }
  };

  // Determine if a tag should blink
  const shouldBlink = (tag) => {
    return tag.toLowerCase() === 'verified' || tag.toLowerCase() === 'exclusive' || tag.toLowerCase() === 'featured';
  };

  return (
    <div
      className={`relative rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col md:flex-row mb-6 overflow-hidden ${isExpired ? 'opacity-70 grayscale' : ''}`}
      style={{ backgroundColor: 'var(--offer-card-bg)' }}
    >
      {/* Left Section: Logo & Text */}
      <div
        className="flex-shrink-0 w-full md:w-1/4 p-4 flex flex-col items-center justify-center border-b md:border-r md:border-b-0"
        style={{ borderColor: 'var(--offer-card-border)', backgroundColor: 'var(--offer-card-left-section-bg)' }}
      >
        <div className="w-24 h-24 bg-[var(--offer-card-bg)] flex items-center justify-center rounded-full overflow-hidden shadow-inner mb-2">
          <img
            src={featured_image || defaultStoreLogo}
            alt={`${storeName} Logo`}
            className="w-full h-full object-contain p-2"
          />
        </div>
        <p className="text-center text-sm font-semibold" style={{ color: 'var(--offer-card-store-name-text)' }}>{storeName}</p>
      </div>

      {/* Middle Section: Offer Description */}
      <div className="flex-grow p-5 md:p-6 flex flex-col justify-center text-center md:text-left">
        <h3 className="text-lg sm:text-xl font-bold mb-2" style={{ color: 'var(--offer-card-offer-heading-text)' }}>{title}</h3>
        <p className={`text-sm ${isExpired ? 'font-bold' : ''}`} style={{ color: isExpired ? 'var(--offer-card-expired-text)' : 'var(--offer-card-expires-text)' }}>
          {isExpired ? 'Expired' : `Expires: ${expires}`}
        </p>
        <div className="mt-3 flex flex-wrap justify-center md:justify-start gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className={`px-3 py-1 text-xs rounded-full ${getTagStyle(tag)} ${shouldBlink(tag) ? 'animate-pulse' : ''}`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Right Section: Button & Terms */}
      <div className="relative flex-shrink-0 w-full md:w-1/4 flex flex-col items-center justify-center p-4 md:p-2">
        {coupon_type === 'code' ? (
          // Container for the button and the sliding code part
          <div
            className={`relative w-full max-w-[160px] h-[45px] overflow-hidden group
              ${isExpired ? 'cursor-not-allowed' : 'cursor-pointer'} rounded-md`}
            onMouseEnter={() => !isExpired && setIsHovered(true)}
            onMouseLeave={() => !isExpired && setIsHovered(false)}
            onClick={handleOfferButtonClick} // This handles opening URL and modal
          >
            {/* The Main "Show Code" Button that slides */}
            <button
              type="button"
              disabled={isExpired}
              className={`absolute inset-0 w-full h-full
                ${buttonBgColor} ${buttonTextColor} font-extrabold rounded-md
                flex items-center justify-center
                transition-transform duration-300 ease-in-out
                ${isHovered && !isExpired ? '-translate-x-[60px]' : 'translate-x-0'}
                ${isExpired ? 'opacity-60' : ''}
                z-20
                `}
              onMouseEnter={(e) => !isExpired && (e.currentTarget.style.backgroundColor = 'var(--offer-button-hover-bg)')}
              onMouseLeave={(e) => !isExpired && (e.currentTarget.style.backgroundColor = 'var(--offer-button-bg)')}
            >
              <span className="uppercase text-center text-sm tracking-wider px-2 whitespace-nowrap">
                {buttonText}
              </span>
            </button>

            {/* The Scratched Code Part that slides in from the right */}
            <div
              className={`absolute top-0 right-0 h-full w-[60px]
                font-extrabold rounded-r-md
                flex items-center justify-center text-lg
                transition-transform duration-300 ease-in-out
                ${isHovered && !isExpired ? 'translate-x-0' : 'translate-x-full'}
                ${isExpired ? 'translate-x-0 opacity-100' : ''}
                z-10`}
              style={{ backgroundColor: 'var(--offer-code-scratch-bg)', color: 'var(--offer-code-scratch-text)' }}
            >
              <span className="whitespace-nowrap">{getPartialCode()}</span>
            </div>

            {/* Vertical Dashed Separator */}
            <div
              className={`absolute right-[60px] top-0 h-full w-px
                bg-opacity-70 border-r border-dashed
                transition-opacity duration-300 ease-in-out
                ${isHovered && !isExpired ? 'opacity-100' : 'opacity-0'}
                ${isExpired ? 'opacity-100' : ''}
                z-30
                `}
              style={{ backgroundColor: 'var(--offer-code-separator-color)', borderColor: 'var(--offer-code-separator-color)' }}
            ></div>

          </div>
        ) : (
          // Regular "Get Offer" button
          <button // Changed from <a> to <button> for consistent onClick handling
            onClick={handleOfferButtonClick} // This handles opening URL and modal
            className={`relative ${buttonBgColor} ${buttonTextColor} font-extrabold py-3 px-6 rounded-md transition-colors duration-200
              ${isExpired ? 'opacity-60' : ''} w-full max-w-[160px]
              `}
            disabled={isExpired}
            onMouseEnter={(e) => !isExpired && (e.currentTarget.style.backgroundColor = 'var(--offer-button-hover-bg)')}
            onMouseLeave={(e) => !isExpired && (e.currentTarget.style.backgroundColor = 'var(--offer-button-bg)')}
          >
            {buttonText}
          </button>
        )}

        {/* View Terms & Conditions with inline message */}
        <div className="mt-4 text-center w-full">
          <button
            onClick={handleViewTermsClick}
            className="text-xs underline cursor-pointer flex items-center justify-center mx-auto transition-colors duration-300"
            style={{ color: 'var(--terms-link-text)' }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--terms-link-hover-text)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--terms-link-text)'}
          >
            View Terms & Conditions
            <ChevronDownIcon className={`ml-1 w-3 h-3 transition-transform duration-200 ${showTermsMessage ? 'rotate-180' : ''}`} />
          </button>
          {showTermsMessage && (
            <p className="text-xs mt-1 italic transition-opacity duration-300 ease-in-out" style={{ color: 'var(--terms-message-text)' }}>
              Terms & conditions apply.
            </p>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 p-4 font-sans"
          style={{ backgroundColor: 'var(--modal-backdrop-bg)' }}
          onClick={handleBackdropClick}
        >
          <div
            className="p-6 rounded-lg shadow-2xl max-w-md w-full animate-scaleIn"
            style={{ backgroundColor: 'var(--modal-bg)' }}
          >
            <div className="flex justify-between items-center mb-6 border-b pb-4">
              <h2 className="text-xl sm:text-2xl font-bold" style={{ color: 'var(--modal-heading-text)' }}>Offer Details</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-3xl font-semibold leading-none"
                style={{ color: 'var(--modal-close-button-text)' }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--modal-close-button-hover-text)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--modal-close-button-text)'}
              >
                &times;
              </button>
            </div>

            <div className="flex flex-col items-center mb-6">
              <img
                src={featured_image || defaultStoreImage}
                alt={storeName}
                className="w-24 h-24 rounded-full mb-4 border-2 shadow-sm"
                style={{ borderColor: 'var(--modal-logo-border)' }}
              />
              <h3 className="text-xl sm:text-2xl font-semibold mb-1" style={{ color: 'var(--modal-store-name-text)' }}>{storeName}</h3>
              <p className="text-center text-base leading-snug" style={{ color: 'var(--modal-offer-text-description)' }}>{title}</p>
            </div>

            {coupon_type === 'code' ? (
              <div className="mt-4">
                <label className="block text-sm font-bold mb-2" style={{ color: 'var(--modal-label-text)' }}>
                  Your Coupon Code:
                </label>
                <div
                  className="flex items-center border-2 border-dashed rounded-lg overflow-hidden"
                  style={{ borderColor: 'var(--modal-code-input-border)', backgroundColor: 'var(--modal-code-input-bg)' }}
                >
                  <input
                    type="text"
                    readOnly
                    value={offerValue}
                    className="flex-grow p-3 text-xl font-mono bg-transparent outline-none"
                    style={{ color: 'var(--modal-code-input-text)', '::placeholder': { color: 'var(--modal-code-input-placeholder)' } }}
                    placeholder="No code available"
                  />
                  <button
                    onClick={handleCopyCode}
                    className="font-bold py-3 px-4 sm:px-5 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50 text-sm sm:text-base whitespace-nowrap"
                    style={{
                      backgroundColor: 'var(--modal-copy-button-bg)',
                      color: 'var(--modal-copy-button-text)',
                      '--tw-ring-color': 'var(--modal-copy-button-bg)'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--modal-copy-button-hover-bg)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--modal-copy-button-bg)'}
                  >
                    {copyStatus || 'Copy Code'}
                  </button>
                </div>
                <p className="text-xs mt-3 text-center" style={{ color: 'var(--modal-instructions-text)' }}>
                  Click "Copy Code" and paste it at checkout.
                </p>
              </div>
            ) : (
              <>
                <p className="mt-4 text-center text-sm sm:text-base" style={{ color: 'var(--modal-offer-text-description)' }}>
                  Click the button below to go to the store and get this offer!
                </p>
                {/* This button inside the modal directs to the coupon_url */}
                <a
                  href={coupon_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 block w-full text-center font-bold py-3 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50"
                  style={{
                    backgroundColor: 'var(--modal-copy-button-bg)',
                    color: 'var(--modal-copy-button-text)',
                    '--tw-ring-color': 'var(--modal-copy-button-bg)'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--modal-copy-button-hover-bg)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--modal-copy-button-bg)'}
                  onClick={() => setIsModalOpen(false)} // Close modal on click
                >
                  Go to Offer Page
                </a>
              </>
            )}

            <div
              className="mt-6 pt-4 border-t text-sm"
              style={{ borderColor: 'var(--modal-terms-border)', color: 'var(--modal-terms-text)' }}
            >
              <p className="font-semibold mb-2">Full Terms & Conditions:</p>
              <ul className="list-disc list-inside text-xs space-y-1">
                <li>Offer valid until {expires}.</li>
                <li>Limited to one use per customer.</li>
                <li>Cannot be combined with other promotions.</li>
                <li>Applicable to online purchases only.</li>
                <li>See store for more details.</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OfferCard;
