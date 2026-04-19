import React from "react";
import { addToCart, removeFromCart } from "../redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProductList = ({ data }) => {
  const { title, thumbnail, price, rating, description, id } = data;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart.cart);
  const cartItem = cart.find((obj) => obj.id === id);

  const createSlug = (text) =>
    text
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");

  const handleProductClick = () => {
    navigate(`/product/${id}/${createSlug(title)}`);
  };

  const addToCartHandler = () => {
    dispatch(
      addToCart({
        cartObj: { price, title, image: thumbnail, qty: 1, description, id },
      }),
    );
  };

  const handleBuyNow = (e) => {
    e.stopPropagation();
    if (!cartItem) addToCartHandler();
    navigate("/cart");
  };

  const originalPrice = Math.floor(price * 1.3);
  const discount = Math.floor(((originalPrice - price) / originalPrice) * 100);
  const fullStars = Math.floor(rating);

  return (
    <div
      onClick={handleProductClick}
      className="group relative cursor-pointer bg-white rounded-2xl border border-gray-100 hover:border-gray-300 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col"
    >
      {/* Discount Badge */}
      <span className="absolute top-3 left-3 z-10 bg-emerald-500 text-white text-[11px] font-semibold px-2 py-0.5 rounded-full tracking-wide">
        {discount}% OFF
      </span>

      {/* Image */}
      <div className="relative w-full h-44 bg-gray-50 flex items-center justify-center overflow-hidden">
        <img
          src={thumbnail}
          alt={title}
          className="h-full w-full object-contain p-3 group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-2">
        {/* Title */}
        <h2 className="text-sm font-semibold text-gray-800 line-clamp-2 leading-snug">
          {title}
        </h2>

        {/* Rating */}
        <div className="flex items-center gap-1">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill={i < fullStars ? "#f59e0b" : "none"}
                stroke="#f59e0b"
                strokeWidth={1.5}
                className="w-3.5 h-3.5"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.286 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.285-3.957a1 1 0 00-.364-1.118L2.05 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.299-3.957z" />
              </svg>
            ))}
          </div>
          <span className="text-xs text-gray-400">({rating})</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-bold text-gray-900">
            ₹{price.toLocaleString("en-IN")}
          </span>
          <span className="text-xs text-gray-400 line-through">
            ₹{originalPrice.toLocaleString("en-IN")}
          </span>
        </div>

        {/* Deal tag */}
        <p className="text-[11px] text-emerald-600 font-medium">
          Limited time deal 🔥
        </p>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Buttons */}
        <div
          className="mt-2 flex items-center gap-2"
          onClick={(e) => e.stopPropagation()}
        >
          {cartItem ? (
            /* Qty Controller */
            <div className="flex items-center gap-2 flex-1 justify-center bg-gray-50 border border-gray-200 rounded-xl py-1.5 px-3">
              <button
                onClick={() => dispatch(removeFromCart({ id }))}
                className="w-6 h-6 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-200 transition text-base font-bold"
              >
                −
              </button>
              <span className="text-sm font-semibold text-gray-800 min-w-[20px] text-center">
                {cartItem.qty}
              </span>
              <button
                onClick={addToCartHandler}
                className="w-6 h-6 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-200 transition text-base font-bold"
              >
                +
              </button>
            </div>
          ) : (
            <button
              onClick={addToCartHandler}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-sm font-medium py-2 rounded-xl transition-all duration-150"
            >
              Add to Cart
            </button>
          )}

          <button
            onClick={handleBuyNow}
            className="flex-1 bg-gray-900 hover:bg-gray-700 active:scale-95 text-white text-sm font-medium py-2 rounded-xl transition-all duration-150"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
