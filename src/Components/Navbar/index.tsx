import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 shadow-2xl">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-4">
            <Link to={'/'} className="group flex items-center space-x-3">
              <div className="bg-gradient-to-r from-purple-400 to-pink-400 p-2 rounded-xl transform transition-transform group-hover:scale-110 group-hover:rotate-3">
                <svg
                  className="w-6 h-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
                PetShop
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link
              to={'/'}
              className="group relative px-4 py-2 rounded-lg text-gray-300 hover:text-white transition-all duration-300 hover:bg-white/10"
            >
              <span className="relative z-10">Home</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </Link>

            <Link
              to={'/place-order'}
              className="group relative px-4 py-2 rounded-lg text-gray-300 hover:text-white transition-all duration-300 hover:bg-white/10"
            >
              <span className="relative z-10">Place Order</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </Link>

            <Link
              to={'/products'}
              className="group relative px-4 py-2 rounded-lg text-gray-300 hover:text-white transition-all duration-300 hover:bg-white/10"
            >
              <span className="relative z-10">Products</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </Link>

            {/* Search Bar */}
            <div className="relative ml-4">
              <input
                type="text"
                placeholder="Search products..."
                className="bg-white/10 text-white placeholder-gray-400 px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white/20 transition-all duration-300 w-48"
              />
              <svg
                className="absolute right-3 top-2.5 w-4 h-4 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            {/* CTA Button */}
            <Link
              to={'/contact'}
              className="ml-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full font-semibold transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
            >
              Contact Us
            </Link>

            {/* User Avatar */}
            <div className="ml-4">
              <button className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-semibold hover:scale-110 transition-transform duration-300">
                U
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white focus:outline-none focus:text-white transition-colors duration-300"
            >
              <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z" />
                ) : (
                  <path d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          } overflow-hidden`}
        >
          <div className="py-4 space-y-2 border-t border-white/10">
            {/* Mobile Search */}
            <div className="px-4 pb-3">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full bg-white/10 text-white placeholder-gray-400 px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white/20 transition-all duration-300"
              />
            </div>

            <Link
              to={'/'}
              className="block px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              🏠 Home
            </Link>
            <Link
              to={'/place-order'}
              className="block px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              📦 Place Order
            </Link>
            <Link
              to={'/products'}
              className="block px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              🛍️ Products
            </Link>
            <Link
              to={'/contact'}
              className="block mx-4 mt-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full font-semibold text-center transition-all duration-300 hover:scale-105"
              onClick={() => setIsMenuOpen(false)}
            >
              📞 Contact Us
            </Link>
          </div>
        </div>
      </nav>

      {/* Animated underline */}
      <div className="h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 opacity-80"></div>
    </header>
  );
}

export default Navbar;
