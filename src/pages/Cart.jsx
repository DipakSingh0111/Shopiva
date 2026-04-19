import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart, removeFromCart, clearItemFromCart } from "../redux/cartSlice";
import OrderSummary from "../components/checkout/OrderSummary";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.cart);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const originalTotal = cart.reduce(
    (sum, item) => sum + Math.floor(item.price * 1.3) * item.qty,
    0
  );
  const saved = originalTotal - subtotal;
  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  const deliveryCharge = subtotal > 499 ? 0 : 49;
  const grandTotal = subtotal + deliveryCharge;

  const handleIncrease = (item) => {
    dispatch(
      addToCart({
        cartObj: {
          id: item.id,
          title: item.title,
          image: item.image,
          price: item.price,
          qty: 1,
          description: item.description,
        },
      })
    );
  };

  const handleDecrease = (item) => {
    dispatch(removeFromCart({ id: item.id }));
  };

  // ✅ Fix: ek hi dispatch se poora item remove
  const handleRemove = (id) => {
    dispatch(clearItemFromCart({ id }));
  };

  /* ── Empty State ── */
  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4 px-4 text-center">
        <div className="w-24 h-24 rounded-full bg-indigo-50 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.2}
            stroke="#6366f1"
            className="w-12 h-12"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
            />
          </svg>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Cart is empty</h2>
          <p className="text-sm text-gray-400 mt-1">
            Koi item nahi mila. Kuch products add karo!
          </p>
        </div>
        <button
          onClick={() => navigate("/")}
          className="mt-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-8 py-3 rounded-2xl transition active:scale-95 shadow-md shadow-indigo-200"
        >
          Shop Now
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-10 mt-10">

        {/* ── Header ── */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Shopping Cart
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              {totalQty} item{totalQty !== 1 ? "s" : ""} selected
            </p>
          </div>
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-800 font-semibold bg-indigo-50 hover:bg-indigo-100 px-4 py-2 rounded-xl transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M14 8a.75.75 0 0 1-.75.75H4.56l3.22 3.22a.75.75 0 1 1-1.06 1.06l-4.5-4.5a.75.75 0 0 1 0-1.06l4.5-4.5a.75.75 0 0 1 1.06 1.06L4.56 7.25H13.25A.75.75 0 0 1 14 8Z" clipRule="evenodd" />
            </svg>
            Continue Shopping
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

          {/* ── Cart Items ── */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {cart.map((item) => {
              const origPrice = Math.floor(item.price * 1.3);
              const itemDiscount = Math.floor(((origPrice - item.price) / origPrice) * 100);

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 p-4"
                >
                  <div className="flex gap-4">
                    {/* Image */}
                    <div className="w-28 h-28 flex-shrink-0 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-contain p-2"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex flex-col flex-1 min-w-0 gap-1.5">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 leading-snug flex-1">
                          {item.title}
                        </h3>
                        {/* ✅ X button — clearItemFromCart */}
                        <button
                          onClick={() => handleRemove(item.id)}
                          className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-gray-300 hover:text-red-500 hover:bg-red-50 transition"
                          title="Remove item"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
                            <path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" />
                          </svg>
                        </button>
                      </div>

                      {/* Badges */}
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-0.5 rounded-full">
                          {itemDiscount}% OFF
                        </span>
                        <span className="text-[10px] text-gray-400 bg-gray-50 border border-gray-100 px-2 py-0.5 rounded-full">
                          Free Delivery
                        </span>
                      </div>

                      {/* Price */}
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <span className="text-lg font-extrabold text-gray-900">
                          ₹{(item.price * item.qty).toLocaleString("en-IN")}
                        </span>
                        <span className="text-xs text-gray-400 line-through">
                          ₹{(origPrice * item.qty).toLocaleString("en-IN")}
                        </span>
                        {item.qty > 1 && (
                          <span className="text-xs text-gray-400">
                            · ₹{item.price.toLocaleString("en-IN")} each
                          </span>
                        )}
                      </div>

                      {/* Qty Controls */}
                      <div className="flex items-center gap-3 mt-1 flex-wrap">
                        <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl overflow-hidden">
                          <button
                            onClick={() => handleDecrease(item)}
                            className="w-9 h-9 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition font-bold text-lg"
                          >
                            −
                          </button>
                          <span className="w-9 text-center text-sm font-bold text-gray-800">
                            {item.qty}
                          </span>
                          <button
                            onClick={() => handleIncrease(item)}
                            className="w-9 h-9 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition font-bold text-lg"
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => handleRemove(item.id)}
                          className="text-xs text-red-400 hover:text-red-600 font-semibold flex items-center gap-1 transition"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5">
                            <path fillRule="evenodd" d="M5 3.25V4H2.75a.75.75 0 0 0 0 1.5h.3l.815 8.15A1.5 1.5 0 0 0 5.357 15h5.285a1.5 1.5 0 0 0 1.493-1.35l.815-8.15h.3a.75.75 0 0 0 0-1.5H11v-.75A2.25 2.25 0 0 0 8.75 1h-1.5A2.25 2.25 0 0 0 5 3.25Zm2.25-.75a.75.75 0 0 0-.75.75V4h3v-.75a.75.75 0 0 0-.75-.75h-1.5ZM6.05 6a.75.75 0 0 1 .787.713l.275 5.5a.75.75 0 0 1-1.498.075l-.275-5.5A.75.75 0 0 1 6.05 6Zm3.9 0a.75.75 0 0 1 .712.787l-.275 5.5a.75.75 0 0 1-1.498-.075l.275-5.5A.75.75 0 0 1 9.95 6Z" clipRule="evenodd" />
                          </svg>
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Order Summary ── */}
            <OrderSummary/>

        </div>
      </div>
    </div>
  );
};

export default Cart;
