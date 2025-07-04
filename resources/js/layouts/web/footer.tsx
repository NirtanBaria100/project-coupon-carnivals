// src/components/Footer.jsx
import { Link, usePage } from '@inertiajs/react';
import { FaFacebookF, FaTwitter, FaInstagram, FaTelegramPlane } from 'react-icons/fa';
import PromoCarnivalsIcon from '@/assets/white logo.png'; // <--- IMPORTANT: Adjust this path to your actual logo image

const Footer = () => {
    const { amazing_discount } = usePage().props; // Keep this if amazing_discount is used elsewhere in the footer or globally

    // Define the static categories for the footer
    const footerCategories = [
        { name: 'Sports', slug: 'sports' },
        { name: 'Home & Garden', slug: 'home-garden' },
        { name: 'Pet Supplies', slug: 'pet-supplies' },
        { name: 'Free Shipping', slug: 'free-shipping' },
        { name: 'Fashion', slug: 'fashion' },
        { name: 'Travel', slug: 'travel' },
    ];

    return (
        // Set footer background to black using CSS variable
       
        <footer className="py-10 mt-auto font-sans footer_site" style={{ backgroundColor: 'var(--footer-bg)', color: 'var(--footer-text-primary)' }}>
            <div className="container mx-auto px-4 md:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-6">
                {/* Company Info */}
                <div>
                    {/* Logo text: pure white */}
                    <h3 className="text-2xl font-bold mb-5 flex items-center" style={{ color: 'var(--footer-heading-color)' }}>
                        {/* PromoCarnivals Logo/Icon */}
                        <img src={PromoCarnivalsIcon} alt="PromoCarnivals Logo" className="h-20 w-auto mr-2" /> {/* Adjust h-8 w-8 as needed */}
                    </h3>
                    {/* Description text: lighter gray */}
                    <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--footer-text-secondary)' }}>
                        Descriptions Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <div className="flex space-x-3 mt-4">
                        {/* Social Icons */}
                        {/* Using inline styles with onMouseEnter/onMouseLeave for hover effects */}
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                            className="w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-colors duration-300"
                            style={{ backgroundColor: 'var(--footer-social-icon-bg)' }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--footer-social-facebook-hover)'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--footer-social-icon-bg)'}
                        >
                            <FaFacebookF className="h-4 w-4" style={{ color: 'var(--footer-social-icon-color)' }} />
                        </a>

                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                            className="w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-colors duration-300"
                            style={{ backgroundColor: 'var(--footer-social-icon-bg)' }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--footer-social-instagram-hover)'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--footer-social-icon-bg)'}
                        >
                            <FaInstagram className="h-4 w-4" style={{ color: 'var(--footer-social-icon-color)' }} />
                        </a>
                    </div>
                </div>

                {/* Categories Column - UPDATED */}
                <div>
                    {/* Heading: pure white */}
                    <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--footer-heading-color)' }}>Categories</h3> {/* Changed heading to "Categories" */}
                    <ul className="space-y-3">
                        {footerCategories.map((category) => ( // Map over the new static footerCategories array
                            <li key={category.slug}>
                                <Link
                                    href={`/category/${category.slug}`}
                                    className="text-sm transition-colors duration-300"
                                    style={{ color: 'var(--footer-text-secondary)' }}
                                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--footer-link-hover)')}
                                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--footer-text-secondary)')}
                                >
                                    {category.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Information Column - No Change */}
                <div>
                    <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--footer-heading-color)' }}>Information</h3>
                    <ul className="space-y-3">
                        <li><Link href="/privacy-policy" className="text-sm transition-colors duration-300"
                            style={{ color: 'var(--footer-text-secondary)' }}
                            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--footer-link-hover)'}
                            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--footer-text-secondary)'}
                        >Privacy Policy</Link></li>
                        <li><Link href="/terms-of-use" className="text-sm transition-colors duration-300"
                            style={{ color: 'var(--footer-text-secondary)' }}
                            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--footer-link-hover)'}
                            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--footer-text-secondary)'}
                        >Terms of Use</Link></li>
                        <li><Link href="/faq" className="text-sm transition-colors duration-300"
                            style={{ color: 'var(--footer-text-secondary)' }}
                            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--footer-link-hover)'}
                            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--footer-text-secondary)'}
                        >FAQ's</Link></li>
                        <li><Link href="/stores" className="text-sm transition-colors duration-300"
                            style={{ color: 'var(--footer-text-secondary)' }}
                            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--footer-link-hover)'}
                            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--footer-text-secondary)'}
                        >All Brands</Link></li>
                        <li><Link href="/all/blogs" className="text-sm transition-colors duration-300"
                            style={{ color: 'var(--footer-text-secondary)' }}
                            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--footer-link-hover)'}
                            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--footer-text-secondary)'}
                        >Blogs</Link></li>
                    </ul>
                </div>

                {/* More From Us Column - No Change */}
                <div>
                    <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--footer-heading-color)' }}>More From Us</h3>
                    <ul className="space-y-3">
                        <li><Link href="/how-we-make-money" className="text-sm transition-colors duration-300"
                            style={{ color: 'var(--footer-text-secondary)' }}
                            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--footer-link-hover)'}
                            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--footer-text-secondary)'}
                        >How we make money</Link></li>
                        <li><Link href="/how-to-use-coupons" className="text-sm transition-colors duration-300"
                            style={{ color: 'var(--footer-text-secondary)' }}
                            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--footer-link-hover)'}
                            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--footer-text-secondary)'}
                        >How to use coupons</Link></li>
                    </ul>
                </div>
            </div>

            {/* Copyright/Disclaimer Section */}
            <div
                className="container mx-auto px-4 md:px-6 lg:px-8 text-center text-xs mt-10 pt-6"
                style={{ color: 'var(--footer-copyright-text)', borderTop: '1px solid var(--footer-border-color)' }}
            >
                <p>&copy; {new Date().getFullYear()} PromoCarnivals. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
