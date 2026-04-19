import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { placeOrder } from "../../redux/orderSlice";
import { toast } from "react-hot-toast";

const ConfirmStep = ({ form, paymentMethod, onBack }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.cart || []);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0,
  );
  const delivery = subtotal > 499 ? 0 : 49;
  const grandTotal = subtotal + delivery;

  const handleFinalPlaceOrder = () => {
    const orderData = {
      customer: form,
      paymentMethod,
      items: cartItems,
      total: grandTotal,
    };

    dispatch(placeOrder(orderData));
    toast.success("🎉 Order placed successfully!");
    navigate("/my-orders");
  };

  return (
    <div className="bg-white border border-gray-100 rounded-[32px] p-6 sm:p-10 shadow-sm">
      <div className="mb-8">
        <h2 className="text-2xl font-black text-gray-900 tracking-tight">
          Review Order
        </h2>
        <p className="text-sm text-gray-400 mt-1">
          Final step before we ship your items
        </p>
      </div>

      <div className="space-y-6">
        {/* Delivery Box */}
        <div className="group bg-gray-50/50 hover:bg-white hover:shadow-md hover:border-gray-100 border border-transparent rounded-3xl p-6 transition-all duration-300 relative">
          <button
            onClick={() => onBack(0)}
            className="absolute top-6 right-6 text-xs font-bold text-indigo-600 bg-white px-3 py-1.5 rounded-full shadow-sm border border-gray-100 hover:scale-105 transition-transform"
          >
            Edit
          </button>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center shadow-sm text-lg">
              📍
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                Shipping To
              </p>
              <p className="text-base font-bold text-gray-800">
                {form.firstName} {form.lastName}
              </p>
              <p className="text-sm text-gray-500 mt-1 leading-relaxed max-w-[280px]">
                {form.street}, {form.city}, {form.state} — {form.zip}
              </p>
              <div className="flex items-center gap-3 mt-3">
                <span className="text-xs bg-white px-2 py-1 rounded-lg border text-gray-500 font-medium">
                  📞 {form.phone}
                </span>
                <span className="text-xs bg-white px-2 py-1 rounded-lg border text-gray-500 font-medium truncate max-w-[150px]">
                  ✉️ {form.email}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Box */}
        <div className="group bg-gray-50/50 hover:bg-white hover:shadow-md hover:border-gray-100 border border-transparent rounded-3xl p-6 transition-all duration-300 relative">
          <button
            onClick={() => onBack(1)}
            className="absolute top-6 right-6 text-xs font-bold text-indigo-600 bg-white px-3 py-1.5 rounded-full shadow-sm border border-gray-100 hover:scale-105 transition-transform"
          >
            Edit
          </button>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center shadow-sm text-lg">
              💳
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                Payment Method
              </p>
              <p className="text-base font-bold text-gray-800">
                {paymentMethod === "cod"
                  ? "Cash on Delivery"
                  : "Online Payment"}
              </p>
              <p className="text-xs text-emerald-500 font-bold mt-1 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                Securely handled
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mt-12 pt-8 border-t border-gray-50">
        <button
          onClick={() => onBack(1)}
          className="flex-1 order-2 sm:order-1 py-4 font-bold text-gray-500 bg-gray-100 rounded-2xl hover:bg-gray-200 transition-colors"
        >
          ← Back
        </button>
        <button
          onClick={handleFinalPlaceOrder}
          className="flex-[2] order-1 sm:order-2 py-4 font-bold text-white bg-gray-900 rounded-2xl shadow-xl shadow-gray-200 hover:bg-black active:scale-[0.98] transition-all flex items-center justify-center gap-3"
        >
          <span>Confirm & Place Order</span>
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ConfirmStep;
