import { useCallback, useState } from 'react';
// Assuming ChevronDownIcon comes from a library like @heroicons/react
// If not, you'll need to provide its SVG or import it from wherever it's defined.
import { ChevronDownIcon } from '@heroicons/react/24/solid'; // Adjust import path if needed
import { Link } from '@inertiajs/react';

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
    store_slug,
    affiliate_url,
    store,
    type = 'store',
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [copyStatus, setCopyStatus] = useState('');
    const [showTermsMessage, setShowTermsMessage] = useState(false);

    console.log(store_slug);
    // Use 'code' as offerValue for consistency with original modal logic
    const offerValue = code;

    const handleCopyCode = () => {
        navigator.clipboard
            .writeText(offerValue)
            .then(() => {
                setCopyStatus('Copied!');
                setTimeout(() => setCopyStatus(''), 2000);
            })
            .catch((err) => {
                console.error('Failed to copy text: ', err); // Added console error for debugging
                setCopyStatus('Failed to copy!');
            });
    };
    const handleViewTermsClick = () => {
        setShowTermsMessage((prev) => !prev);
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
            window.open(affiliate_url, '_blank');
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
    const defaultStoreLogo = store.thumbnail;
    const defaultStoreImage = store.thumbnail;

    // Tags array generation based on backend flags
    const tags = [];
    if (is_verified) {
        tags.push('Verified');
    }
    if (is_exclusive) {
        tags.push('Exclusive');
    }
    if (is_featured) {
        tags.push('Featured');
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
            className={`relative mb-6 flex flex-col overflow-hidden rounded-xl shadow-lg transition-shadow duration-300 hover:shadow-xl md:flex-row ${isExpired ? 'opacity-70 grayscale' : ''}`}
            style={{ backgroundColor: 'var(--offer-card-bg)' }}
        >
            {/* Left Section: Logo & Text */}
            <div
                className="flex w-full flex-shrink-0 flex-col items-center justify-center border-b p-4 md:w-1/4 md:border-r md:border-b-0"
                style={{ borderColor: 'var(--offer-card-border)', backgroundColor: 'var(--offer-card-left-section-bg)' }}
            >
                <div className="mb-2 flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-[var(--offer-card-bg)] shadow-inner">
                    <Link href={type == 'stores' ? affiliate_url : store_slug}>
                        <img src={type == 'stores' ?( featured_image || defaultStoreLogo) : defaultStoreLogo} alt={`${storeName} Logo`} className="h-full w-full object-contain p-2" />
                    </Link>
                </div>
                <Link href={type == 'stores' ? affiliate_url : store_slug}>
                    <p className="text-center text-sm font-semibold" style={{ color: 'var(--offer-card-store-name-text)' }}>
                        {storeName}
                    </p></Link>
            </div>

            {/* Middle Section: Offer Description */}
            <div className="flex flex-grow flex-col justify-center p-5 text-center md:p-6 md:text-left">
                <h3 className="mb-2 text-lg font-bold sm:text-xl" style={{ color: 'var(--offer-card-offer-heading-text)' }}>
                    {title}
                </h3>
                <p
                    className={`text-sm ${isExpired ? 'font-bold' : ''}`}
                    style={{ color: isExpired ? 'var(--offer-card-expired-text)' : 'var(--offer-card-expires-text)' }}
                >
                    {isExpired ? 'Expired' : ` ${expires == null ? '' : 'Expires: '+expires}`}
                </p>
                <div className="mt-3 flex flex-wrap justify-center gap-2 md:justify-start">
                    {tags.map((tag, index) => (
                        <span key={index} className={`rounded-full px-3 py-1 text-xs ${getTagStyle(tag)} ${shouldBlink(tag) ? 'animate-pulse' : ''}`}>
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* Right Section: Button & Terms */}
            <div className="relative flex w-full flex-shrink-0 flex-col items-center justify-center p-4 md:w-1/4 md:p-2">
                {coupon_type === 'code' ? (
                    // Container for the button and the sliding code part
                    <div
                        className={`group relative h-[45px] w-full max-w-[160px] overflow-hidden ${isExpired ? 'cursor-not-allowed' : 'cursor-pointer'} rounded-md`}
                        onMouseEnter={() => !isExpired && setIsHovered(true)}
                        onMouseLeave={() => !isExpired && setIsHovered(false)}
                        onClick={handleOfferButtonClick} // This handles opening URL and modal
                    >
                        {/* The Main "Show Code" Button that slides */}
                        <button
                            type="button"
                            disabled={isExpired}
                            className={`absolute inset-0 h-full w-full ${buttonBgColor} ${buttonTextColor} flex items-center justify-center rounded-md font-extrabold transition-transform duration-300 ease-in-out ${isHovered && !isExpired ? '-translate-x-[60px]' : 'translate-x-0'} ${isExpired ? 'opacity-60' : ''} z-20`}
                            onMouseEnter={(e) => !isExpired && (e.currentTarget.style.backgroundColor = 'var(--offer-button-hover-bg)')}
                            onMouseLeave={(e) => !isExpired && (e.currentTarget.style.backgroundColor = 'var(--offer-button-bg)')}
                        >
                            <span className="px-2 text-center text-sm tracking-wider whitespace-nowrap uppercase">{buttonText}</span>
                        </button>

                        {/* The Scratched Code Part that slides in from the right */}
                        <div
                            className={`absolute top-0 right-0 flex h-full w-[60px] items-center justify-center rounded-r-md text-lg font-extrabold transition-transform duration-300 ease-in-out ${isHovered && !isExpired ? 'translate-x-0' : 'translate-x-full'} ${isExpired ? 'translate-x-0 opacity-100' : ''} z-10`}
                            style={{ backgroundColor: 'var(--offer-code-scratch-bg)', color: 'var(--offer-code-scratch-text)' }}
                        >
                            <span className="whitespace-nowrap">{getPartialCode()}</span>
                        </div>

                        {/* Vertical Dashed Separator */}
                        <div
                            className={`bg-opacity-70 absolute top-0 right-[60px] h-full w-px border-r border-dashed transition-opacity duration-300 ease-in-out ${isHovered && !isExpired ? 'opacity-100' : 'opacity-0'} ${isExpired ? 'opacity-100' : ''} z-30`}
                            style={{ backgroundColor: 'var(--offer-code-separator-color)', borderColor: 'var(--offer-code-separator-color)' }}
                        ></div>
                    </div>
                ) : (
                    // Regular "Get Offer" button
                    <button // Changed from <a> to <button> for consistent onClick handling
                        onClick={handleOfferButtonClick} // This handles opening URL and modal
                        className={`relative ${buttonBgColor} ${buttonTextColor} rounded-md px-6 py-3 font-extrabold transition-colors duration-200 ${isExpired ? 'opacity-60' : ''} w-full max-w-[160px]`}
                        disabled={isExpired}
                        onMouseEnter={(e) => !isExpired && (e.currentTarget.style.backgroundColor = 'var(--offer-button-hover-bg)')}
                        onMouseLeave={(e) => !isExpired && (e.currentTarget.style.backgroundColor = 'var(--offer-button-bg)')}
                    >
                        {buttonText}
                    </button>
                )}

                {/* View Terms & Conditions with inline message */}
                <div className="mt-4 w-full text-center">
                    <button
                        onClick={handleViewTermsClick}
                        className="mx-auto flex cursor-pointer items-center justify-center text-xs underline transition-colors duration-300"
                        style={{ color: 'var(--terms-link-text)' }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--terms-link-hover-text)')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--terms-link-text)')}
                    >
                        Details
                        <ChevronDownIcon className={`ml-1 h-3 w-3 transition-transform duration-200 ${showTermsMessage ? 'rotate-180' : ''}`} />
                    </button>
                    {showTermsMessage && (
                        <p className="mt-1 text-xs italic transition-opacity duration-300 ease-in-out" style={{ color: 'var(--terms-message-text)' }}>
                            {coupon_type == 'code' ? 'Click "Show Code" To Activate This Deal. Exclusions May Apply' : 'No Promo Code Needed. Click "Get Offer" To Activate This Deal. Exclusions May Apply'}
                        </p>
                    )}
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 font-sans"
                    style={{ backgroundColor: 'var(--modal-backdrop-bg)' }}
                    onClick={handleBackdropClick}
                >
                    <div className="animate-scaleIn w-full max-w-md rounded-lg p-6 shadow-2xl" style={{ backgroundColor: 'var(--modal-bg)' }}>
                        <div className="mb-6 flex items-center justify-between border-b pb-4">
                            <h2 className="text-xl font-bold sm:text-2xl" style={{ color: 'var(--modal-heading-text)' }}>
                                Offer Details
                            </h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-3xl leading-none font-semibold"
                                style={{ color: 'var(--modal-close-button-text)' }}
                                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--modal-close-button-hover-text)')}
                                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--modal-close-button-text)')}
                            >
                                &times;
                            </button>
                        </div>

                        <div className="mb-6 flex flex-col items-center">
                            <img
                                src={featured_image || defaultStoreImage}
                                alt={storeName}
                                className="mb-4 h-24 w-24 rounded-full border-2 shadow-sm"
                                style={{ borderColor: 'var(--modal-logo-border)' }}
                            />
                            <h3 className="mb-1 text-xl font-semibold sm:text-2xl" style={{ color: 'var(--modal-store-name-text)' }}>
                                {storeName}
                            </h3>
                            <p className="text-center text-base leading-snug" style={{ color: 'var(--modal-offer-text-description)' }}>
                                {title}
                            </p>
                        </div>

                        {coupon_type === 'code' ? (
                            <div className="mt-4">
                                <label className="mb-2 block text-sm font-bold" style={{ color: 'var(--modal-label-text)' }}>
                                    Your Coupon Code:
                                </label>
                                <div
                                    className="flex items-center overflow-hidden rounded-lg border-2 border-dashed"
                                    style={{ borderColor: 'var(--modal-code-input-border)', backgroundColor: 'var(--modal-code-input-bg)' }}
                                >
                                    <input
                                        type="text"
                                        readOnly
                                        value={offerValue}
                                        className="flex-grow bg-transparent p-3 font-mono text-xl outline-none"
                                        style={{
                                            color: 'var(--modal-code-input-text)',
                                            '::placeholder': { color: 'var(--modal-code-input-placeholder)' },
                                        }}
                                        placeholder="No code available"
                                    />
                                    <button
                                        onClick={handleCopyCode}
                                        className="focus:ring-opacity-50 px-4 py-3 text-sm font-bold whitespace-nowrap transition-colors duration-200 focus:ring-2 focus:outline-none sm:px-5 sm:text-base"
                                        style={{
                                            backgroundColor: 'var(--modal-copy-button-bg)',
                                            color: 'var(--modal-copy-button-text)',
                                            '--tw-ring-color': 'var(--modal-copy-button-bg)',
                                        }}
                                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--modal-copy-button-hover-bg)')}
                                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--modal-copy-button-bg)')}
                                    >
                                        {copyStatus || 'Copy Code'}
                                    </button>
                                </div>
                                <p className="mt-3 text-center text-xs" style={{ color: 'var(--modal-instructions-text)' }}>
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
                                    href={affiliate_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="focus:ring-opacity-50 mt-6 block w-full rounded-md py-3 text-center font-bold transition-colors duration-200 focus:ring-2 focus:outline-none"
                                    style={{
                                        backgroundColor: 'var(--modal-copy-button-bg)',
                                        color: 'var(--modal-copy-button-text)',
                                        '--tw-ring-color': 'var(--modal-copy-button-bg)',
                                    }}
                                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--modal-copy-button-hover-bg)')}
                                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--modal-copy-button-bg)')}
                                    onClick={() => setIsModalOpen(false)} // Close modal on click
                                >
                                    Go to Offer Page
                                </a>
                            </>
                        )}

                        <div
                            className="mt-6 border-t pt-4 text-sm"
                            style={{ borderColor: 'var(--modal-terms-border)', color: 'var(--modal-terms-text)' }}
                        >
                            <p className="mb-2 font-semibold">Details:</p>
                            <ul className="list-inside list-disc space-y-1 text-xs">
                                <li> {coupon_type == 'code' ? 'Click "Show Code" To Activate This Deal. Exclusions May Apply' : 'No Promo Code Needed. Click "Get Offer" To Activate This Deal. Exclusions May Apply'}</li>

                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OfferCard;
