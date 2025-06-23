import React from 'react';
import Link from 'next/link';
import { FaFacebook, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  const footerSections = [
    {
      title: 'COMPANY',
      links: [
        { text: 'Home', href: '/' },
        { text: 'Shop', href: '/Shop' },
        { text: 'About Us', href: '/about' },
        { text: 'Contact Us', href: '/ContactUs' },
      ],
    },
    {
      title: 'LINKS',
      links: [
        { text: 'Your Order', href: '/checkout' },
        { text: 'Your Account', href: '/' },
        { text: 'Track Order', href: '/checkout' },
        { text: 'Wishlist', href: '/wishlist' },
      ],
    },
    {
      title: 'CONTACT INFO',
      links: [
        { text: 'Call us: +92 313 2640125', href: 'tel:+923132640125' },
        { text: 'Email us', href: 'mailto:info@rubinasfragrance.com' },
        { text: 'Tutorials', href: '/tutorials' },
        { text: 'Community', href: '/community' },
      ],
    },
  ];

  return (
    <footer
      className="w-full bg-black text-white mt-6 shadow-inner"
      aria-label="Website Footer"
    >
      <div className="max-w-7xl mx-auto px-6 py-12 md:flex md:justify-start md:items-start gap-12">
        {/* Logo & Description */}
        <div className="md:w-[280px] font-bold text-2xl md:text-3xl leading-tight text-gray-100">
          <p className="text-white">RUBINAS FRAGRANCE</p>
          <p className="mt-5 text-sm leading-relaxed text-gray-400">
            RUBINA FRAGRANCE STORE, YOUR DESTINATION FOR PREMIUM FRAGRANCE – AUTHENTIC, CURATED, AND UNFORGETTABLE. SHOP WITH CONFIDENCE.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-4 mt-8">
            <Link
              href="https://www.facebook.com/people/Rubinas-Fragrance/61576245939677"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-blue-600 hover:text-blue-600 transition-colors duration-300 hover:scale-110"
            >
              <FaFacebook className="w-7 h-7" />
            </Link>

            <Link
              href="https://www.instagram.com/rubinasfragrance2025"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="inline-flex items-center justify-center bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 w-7 h-7 rounded-full hover:scale-110 transition-transform duration-300"
            >
              <FaInstagram className="text-white w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Footer Sections */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 flex-1 mt-10 md:mt-0">
          {footerSections.map((section, idx) => (
            <div key={idx} className="leading-tight flex flex-col gap-4">
              <h3 className="font-semibold text-base text-gray-200">{section.title}</h3>
              {section.links.map(({ text, href }, linkIdx) => (
                <Link
                  key={linkIdx}
                  href={href}
                  className="text-gray-400 hover:text-[#db4444] hover:underline transition duration-300 transform hover:translate-x-1"
                >
                  {text}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="w-full px-6 text-center pb-6">
        <hr className="border-t border-gray-700 mb-6 max-w-7xl mx-auto" />
        <p className="text-sm text-gray-500 font-medium select-none">
          &copy; {new Date().getFullYear()} Skill Initiative Tech. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
