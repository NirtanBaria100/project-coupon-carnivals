// src/components/OfferCard.jsx
import React, { useState, useCallback } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

const OfferCard = ({
  storeLogo,
  offerText,
  endDate,
  showCode,
  offerValue, // offerValue will be either the code or the URL
  isExpired,
  tags = []
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copyStatus, setCopyStatus] = useState('');
  const [showTermsMessage, setShowTermsMessage] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(offerValue)
      .then(() => {
        setCopyStatus('Copied!');
        setTimeout(() => setCopyStatus(''), 2000);
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
        setCopyStatus('Failed to copy!');
      });
  };

  const handleViewTermsClick = () => {
    setShowTermsMessage(prev => !prev);
  };

  const handleOfferButtonClick = () => {
    if (!isExpired) {
      // Always open google.com in a new tab when the main button is clicked
      window.open('https://www.google.com', '_blank');

      // Always open the modal after opening the Google link
      setIsModalOpen(true);
    }
  };

  // --- NEW FUNCTION TO CLOSE MODAL ON BACKDROP CLICK ---
  const handleBackdropClick = (e) => {
    // Only close if the click originated directly on the backdrop, not on the modal content itself
    if (e.target.classList.contains('bg-opacity-60')) { // Targeting the specific backdrop class
      setIsModalOpen(false);
    }
  };
  // --------------------------------------------------------

  // UI Change: Button colors updated to new palette
  const buttonBgColor = isExpired ? 'bg-[var(--offer-button-disabled-bg)] cursor-not-allowed' : 'bg-[var(--offer-button-bg)]';
  const buttonTextColor = 'text-[var(--offer-button-text)]';

  const storeName = "The Body Shop"; // This can be passed as a prop too
  const defaultStoreLogo = "https://via.placeholder.com/100x100?text=Store+Logo";
  const defaultStoreImage = "https://via.placeholder.com/150x150?text=Brand+Image";

  const getPartialCode = useCallback(() => {
    return showCode && offerValue ? offerValue.substring(0, 3).toUpperCase() : '---';
  }, [showCode, offerValue]);

  // UI Change: Tag styles updated to new palette
  const getTagStyle = (tag) => {
    switch (tag.toLowerCase()) {
      case 'verified':
        return 'bg-[var(--tag-verified-bg)] text-[var(--tag-verified-text)] font-medium';
      case 'exclusive':
        return 'bg-[var(--tag-exclusive-bg)] text-[var(--tag-exclusive-text)] font-medium';
      case 'featured':
        return 'bg-[var(--tag-featured-bg)] text-[var(--tag-featured-text)] font-medium';
      case 'new':
        return 'bg-[var(--tag-new-bg)] text-[var(--tag-new-text)] font-medium';
      default:
        return 'bg-[var(--tag-default-bg)] text-[var(--tag-default-text)] font-medium';
    }
  };

  // Determine if a tag should blink - UNTOUCHED LOGIC
  const shouldBlink = (tag) => {
    return tag.toLowerCase() === 'verified' || tag.toLowerCase() === 'exclusive';
  };

  return (
    <div
      className={`relative rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex mb-6 overflow-hidden ${isExpired ? 'opacity-70 grayscale' : ''}`}
      style={{ backgroundColor: 'var(--offer-card-bg)' }}
    >
      {/* Left Section: Logo & Text */}
      <div
        className="flex-shrink-0 w-1/4 p-4 flex flex-col items-center justify-center border-r"
        style={{ borderColor: 'var(--offer-card-border)', backgroundColor: 'var(--offer-card-left-section-bg)' }}
      >
        <div className="w-24 h-24 bg-[var(--offer-card-bg)] flex items-center justify-center rounded-full overflow-hidden shadow-inner mb-2">
          <img
            src={storeLogo || defaultStoreLogo}
            alt="Store Logo"
            className="w-full h-full object-contain p-2"
          />
        </div>
        <p className="text-center text-sm font-semibold" style={{ color: 'var(--offer-card-store-name-text)' }}>{storeName}</p>
      </div>

      {/* Middle Section: Offer Description */}
      <div className="flex-grow p-5 flex flex-col justify-center">
        <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--offer-card-offer-heading-text)' }}>{offerText}</h3>
        <p className={`text-sm ${isExpired ? 'font-bold' : ''}`} style={{ color: isExpired ? 'var(--offer-card-expired-text)' : 'var(--offer-card-expires-text)' }}>
          {isExpired ? 'Expired' : `Expires: ${endDate}`}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
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
      <div className="relative flex-shrink-0 w-1/4 flex flex-col items-center justify-center p-2 sm:p-4">
        {showCode ? (
          // Container for the button and the sliding code part
          <div
            className={`relative w-full max-w-[160px] h-[45px] overflow-hidden group
              ${isExpired ? 'cursor-not-allowed' : 'cursor-pointer'} rounded-md`}
            onMouseEnter={() => !isExpired && setIsHovered(true)}
            onMouseLeave={() => !isExpired && setIsHovered(false)}
            onClick={handleOfferButtonClick} // This will now always open Google and the modal
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
              // Handle hover background for the button itself if it's not disabled
              onMouseEnter={(e) => !isExpired && (e.currentTarget.style.backgroundColor = 'var(--offer-button-hover-bg)')}
              onMouseLeave={(e) => !isExpired && (e.currentTarget.style.backgroundColor = 'var(--offer-button-bg)')}
            >
              <span className="uppercase text-center text-sm tracking-wider px-2 whitespace-nowrap">
                Show Code
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
          <button
            onClick={handleOfferButtonClick} // This will now always open Google and the modal
            className={`relative ${buttonBgColor} ${buttonTextColor} font-extrabold py-3 px-6 rounded-md transition-colors duration-200
              ${isExpired ? 'opacity-60' : ''} w-full max-w-[160px]
              `}
            disabled={isExpired}
            // Handle hover background for the button itself if it's not disabled
            onMouseEnter={(e) => !isExpired && (e.currentTarget.style.backgroundColor = 'var(--offer-button-hover-bg)')}
            onMouseLeave={(e) => !isExpired && (e.currentTarget.style.backgroundColor = 'var(--offer-button-bg)')}
          >
            Get Offer
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
              <h2 className="text-2xl font-bold" style={{ color: 'var(--modal-heading-text)' }}>Offer Details</h2>
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
                src={storeLogo || defaultStoreImage}
                alt={storeName}
                className="w-24 h-24 rounded-full mb-4 border-2 shadow-sm"
                style={{ borderColor: 'var(--modal-logo-border)' }}
              />
              <h3 className="2xl font-semibold mb-1" style={{ color: 'var(--modal-store-name-text)' }}>{storeName}</h3>
              <p className="text-center text-lg leading-snug" style={{ color: 'var(--modal-offer-text-description)' }}>{offerText}</p>
            </div>

            {showCode ? (
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
                    className="font-bold py-3 px-5 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50"
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
                <p className="mt-4 text-center text-base" style={{ color: 'var(--modal-offer-text-description)' }}>
                  Click the button below to go to the store and get this offer!
                </p>
                {/* This button inside the modal also directs to Google.com */}
                <a
                  href="https://www.google.com"
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
                <li>Offer valid until {endDate}.</li>
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
