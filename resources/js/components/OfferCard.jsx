// resources/js/Components/OfferCard.jsx
import React, { useState, useCallback } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/solid'; // Make sure @heroicons/react is installed
const OfferCard = ({
  featured_image,
  title,
  coupon_type,
  code ,
  isExpired,
  is_verified,
  is_featured,
  is_exclusive, // offerValue will be either the code or the URL
  expires,
  affiliate_irl,
  storeName,
  tags = [],
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copyStatus, setCopyStatus] = useState('');
  const [showTermsMessage, setShowTermsMessage] = useState(false);
  const offerValue = code ;
  const handleCopyCode = () => {
    navigator.clipboard.writeText(offerValue)
      .then(() => {
        setCopyStatus('Copied!');
        setTimeout(() => setCopyStatus(''), 2000);
      })
      .catch(err => {
        setCopyStatus('Failed to copy!');
      });
  };

  const handleViewTermsClick = () => {
    setShowTermsMessage(prev => !prev);
  };

  const handleOfferButtonClick = () => {
    if (!isExpired) {
      if(offerValue){
        navigator.clipboard.writeText(offerValue)
      }
      setIsModalOpen(true);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target.classList.contains('bg-opacity-60')) {
      setIsModalOpen(false);
    }
  };
  // --------------------------------------------------------
  const buttonText = coupon_type  == 'code' ? 'Show Code' : 'Get Offer';
  const buttonBgColor = isExpired ? 'bg-gray-400 cursor-not-allowed' : 'primary-button-bg hover:bg-blue-600';
  const buttonTextColor = 'text-white';
  const defaultStoreLogo = "https://via.placeholder.com/100x100?text=Store+Logo";
  const defaultStoreImage = "https://via.placeholder.com/150x150?text=Brand+Image";
  if(is_verified) {
    tags.push('verified');
  }
  if(is_exclusive){
    tags.push('exclusive')
  }
  if(is_featured){
    tags.push('featured')
  }
  const getPartialCode = useCallback(() => {
    return coupon_type == 'code' && offerValue ? offerValue.substring(0, 3).toUpperCase() : '---';
  }, [coupon_type == 'code', offerValue]);
  const getTagStyle = (tag) => {
    switch (tag.toLowerCase()) {
      case 'verified':
        return 'bg-green-100 text-green-800 font-medium';
      case 'exclusive':
        return 'bg-purple-100 text-purple-800 font-medium';
      case 'featured':
        return 'bg-yellow-100 text-yellow-800 font-medium';
      default:
        return 'bg-gray-100 text-gray-700 font-medium';
    }
  };

  // Determine if a tag should blink
  const shouldBlink = (tag) => {
    return tag.toLowerCase() === 'verified' || tag.toLowerCase() === 'exclusive' || tag.toLowerCase() == 'featured';
  };

  return (
    <div className={`relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex mb-6 overflow-hidden ${isExpired ? 'opacity-70 grayscale' : ''}`}>
      {/* Left Section: Logo & Text */}
      <div className="flex-shrink-0 w-1/4 p-4 flex flex-col items-center justify-center border-r border-gray-100 bg-gray-50">
        <div className="w-24 h-24 bg-white flex items-center justify-center rounded-full overflow-hidden shadow-inner mb-2">
          <img
            src={featured_image || defaultStoreLogo}
            alt="Store Logo"
            className="w-full h-full object-contain p-2"
          />
        </div>
        <p className="text-center text-sm font-semibold text-gray-700 mt-1">{storeName}</p>
      </div>

      {/* Middle Section: Offer Description */}
      <div className="flex-grow p-5 flex flex-col justify-center">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className={`text-sm ${isExpired  ? 'text-red-500 font-bold' : 'text-gray-600'}`}>
          {isExpired ? 'Expired' : `Expires: ${expires}`}
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
        {coupon_type == 'code' ? (
          // Container for the button and the sliding code part
          <div
            className={`relative w-full max-w-[160px] h-[45px] overflow-hidden group
              ${isExpired? 'cursor-not-allowed' : 'cursor-pointer'}`}
            onMouseEnter={() => !isExpired && setIsHovered(true)}
            onMouseLeave={() => !isExpired && setIsHovered(false)}
            onClick={handleOfferButtonClick} // This will now always open Google and the modal
          >
            {/* The Main "Show Code" Button that slides */}
            <a
              href={affiliate_irl} target='_blank'
              disabled={isExpired}
              className={`absolute inset-0 w-full h-full
                ${buttonBgColor} ${buttonTextColor} font-extrabold rounded-md
                flex items-center justify-center cursor-pointer
                transition-transform duration-300 ease-in-out
                ${isHovered && !isExpired ? '-translate-x-[60px]' : 'translate-x-0'}
                ${isExpired ? 'opacity-60' : ''}
                z-20
                `}
            >
              <span className="uppercase cursor-pointer text-center text-sm tracking-wider px-2 whitespace-nowrap">
                {buttonText}
              </span>
            </a>

            {/* The Scratched Code Part that slides in from the right */}
            <div
              className={`absolute top-0 right-0 h-full w-[60px]
                bg-gray-200 text-gray-700 font-extrabold rounded-r-md
                flex items-center justify-center text-lg
                transition-transform duration-300 ease-in-out
                ${isHovered && !isExpired ? 'translate-x-0' : 'translate-x-full'}
                ${isExpired? 'translate-x-0 opacity-100' : ''}
                z-10
                `}
            >
              <span className="whitespace-nowrap">{getPartialCode()}</span>
            </div>

            {/* Vertical Dashed Separator */}
            <div
              className={`absolute right-[60px] top-0 h-full w-px
                bg-white bg-opacity-70 border-r border-dashed border-white
                transition-opacity duration-300 ease-in-out
                ${isHovered && isExpired ? 'opacity-100' : 'opacity-0'}
                ${isExpired ? 'opacity-100' : ''}
                z-30
                `}
            ></div>

          </div>
        ) : (
          // Regular "Get Offer" button
          <a href={affiliate_irl} target='_blank'
            onClick={handleOfferButtonClick} // This will now always open Google and the modal
            className={`relative ${buttonBgColor} ${buttonTextColor} font-extrabold text-center py-3 px-6 rounded-md cursor-pointer transition-colors duration-200
              ${isExpired ? 'opacity-60' : ''} w-full max-w-[160px]
              `}
            disabled={isExpired ? true : false}
          >
            {buttonText}
          </a>
        )}

        {/* View Terms & Conditions with inline message */}
        <div className="mt-4 text-center w-full">
          <button
            onClick={handleViewTermsClick}
            className="text-xs text-blue-600 underline cursor-pointer hover:text-blue-800 flex items-center justify-center mx-auto"
          >
            View Terms & Conditions
            <ChevronDownIcon className={`ml-1 w-3 h-3 transition-transform duration-200 ${showTermsMessage ? 'rotate-180' : ''}`} />
          </button>
          {showTermsMessage && (
            <p className="text-xs text-gray-500 mt-1 italic transition-opacity duration-300 ease-in-out">
              Terms & conditions apply.
            </p>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
          onClick={handleBackdropClick}
        >
          <div className="bg-white p-6 rounded-lg shadow-2xl max-w-md w-full animate-scaleIn">
            <div className="flex justify-between items-center mb-6 border-b pb-4">
              <h2 className="text-2xl font-bold text-gray-800">Offer Details</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 text-3xl font-semibold leading-none"
              >
                &times;
              </button>
            </div>

            <div className="flex flex-col items-center mb-6">
              <img src={featured_image || defaultStoreImage} alt={storeName} className="w-24 h-24 rounded-full mb-4 border-2 border-gray-200 shadow-sm" />
              <h3 className="2xl font-semibold text-gray-900 mb-1">{storeName}</h3>
              <p className="text-gray-700 text-center text-lg leading-snug">{title}</p>
            </div>

            {coupon_type == 'code' ? (
              <div className="mt-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Your Coupon Code:
                </label>
                <div className="flex items-center border-2 border-dashed border-gray-300 rounded-lg overflow-hidden bg-gray-50">
                  <input
                    type="text"
                    readOnly
                    value={offerValue}
                    className="flex-grow p-3 text-xl font-mono bg-transparent outline-none text-gray-800 placeholder-gray-400"
                    placeholder="No code available"
                  />
                  <button
                    onClick={handleCopyCode}
                    className="bg-green-600 hover:bg-green-700 cursor-pointer  text-white font-bold py-3 px-5 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                  >
                    {copyStatus || 'Copy Code'}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-3 text-center">
                  Click "Copy Code" and paste it at checkout.
                </p>
              </div>
            ) : (
              <>
                <p className="mt-4 text-gray-700 text-center text-base">
                  Click the button below to go to the store and get this offer!
                </p>
                {/* This button inside the modal also directs to Google.com */}
                <a
                  href={affiliate_irl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  onClick={() => setIsModalOpen(false)} // Close modal on click
                >
                  Go to Offer Page
                </a>
              </>
            )}

            <div className="mt-6 pt-4 border-t border-gray-200 text-gray-600 text-sm">
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
