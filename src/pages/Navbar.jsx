import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const cart = useSelector((state)=> state.cart.cart)

  return (
    <>
      <header
        className="fixed top-0 left-0 w-full z-50 
        bg-black border-b border-gray-800"
      >
        <div className="max-w-[1300px] mx-auto px-6 h-[70px] flex items-center justify-between">
          {/* 🔥 Logo */}
          <Link to="/" className="text-xl font-bold tracking-wide">
            <span className="text-white">Sho</span>
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
            piva
            </span>
          </Link>

          {/* 🔥 Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm text-gray-300">
            {["Home", "Shop", "New", "Women", "Men"].map((item, i) => (
              <Link
                key={i}
                to={
                  item === "Home"
                    ? "/"
                    : item === "Shop"
                      ? "/products-list"
                      : item === "New"
                        ? "/latest-products"
                        : `/${item.toLowerCase()}`
                }
                className="relative group transition"
              >
                <span className="group-hover:text-white transition">
                  {item}
                </span>

                {/* Gradient underline */}
                <span
                  className="absolute left-0 -bottom-1 w-0 h-[2px] 
                            bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 
                            transition-all duration-300 group-hover:w-full"
                ></span>
              </Link>
            ))}
          </nav>

          {/* 🔥 Right Section */}
          <div className="hidden md:flex items-center gap-5">
            {/* Search */}
            <div className="relative group">
              <input
                type="text"
                placeholder="Search products..."
                className="bg-gray-900 text-sm text-white px-4 py-2 rounded-full 
                            outline-none w-[180px] focus:w-[240px] transition-all duration-300
                            border border-gray-700 focus:border-pink-500"
              />
              <FaSearch className="absolute right-3 top-2.5 text-gray-400 group-focus-within:text-pink-400" />
            </div>

            {/* Cart */}
            <div className="relative cursor-pointer group">
              <FaShoppingCart className="text-xl text-gray-300 group-hover:text-pink-400 transition" />
              <span
                className="absolute -top-2 -right-2 text-xs 
                        bg-gradient-to-r from-pink-500 to-purple-500 text-white px-1.5 rounded-full"
              >
               {cart.length}
              </span>
            </div>

            {/* Button */}
            <Link
              to="/register"
              className="px-5 py-2 text-sm rounded-full text-white font-medium
                        bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500
                        hover:scale-105 transition-all duration-300
                        shadow-[0_0_15px_rgba(236,72,153,0.6)]"
            >
              Register
            </Link>
          </div>

          {/* 🔥 Mobile Icon */}
          <div
            className="md:hidden text-white text-2xl cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </div>
        </div>

        {/* 🔥 Mobile Menu */}
        <div
          className={`md:hidden bg-black border-t border-gray-800 transition-all duration-300 overflow-hidden 
            ${menuOpen ? "max-h-[400px]" : "max-h-0"}`}
        >
          <div className="flex flex-col px-6 py-5 gap-4 text-gray-300">
            <Link to="/">Home</Link>
            <Link to="/products-list">Shop</Link>
            <Link to="/latest-products">New</Link>
            <Link to="/womens">Women</Link>
            <Link to="/mens">Men</Link>

            {/* Search */}
            <div className="relative mt-3">
              <input
                type="text"
                placeholder="Search..."
                className="w-full bg-gray-900 text-white px-4 py-2 rounded-full outline-none border border-gray-700"
              />
              <FaSearch className="absolute right-3 top-2.5 text-gray-400" />
            </div>

            <Link
              to="/register"
              className="mt-3 text-center py-2 rounded-full text-white
                        bg-gradient-to-r from-pink-500 to-purple-500"
            >
              Register
            </Link>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
