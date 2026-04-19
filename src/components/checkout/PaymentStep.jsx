import React from "react";
import { Field, PayOption } from "./CheckoutUI";

const PaymentStep = ({ paymentMethod, setPaymentMethod, onBack, onNext }) => (
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">

    {/* Header */}
    <div className="flex items-center gap-3 mb-6">
      <div className="w-9 h-9 rounded-xl bg-indigo-100 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#6366f1" className="w-5 h-5">
          <path d="M1 4.25a3.733 3.733 0 0 1 2.25-.75h13.5c.844 0 1.623.279 2.25.75A2.25 2.25 0 0 0 16.75 2H3.25A2.25 2.25 0 0 0 1 4.25ZM1 7.25a3.733 3.733 0 0 1 2.25-.75h13.5c.844 0 1.623.279 2.25.75A2.25 2.25 0 0 0 16.75 5H3.25A2.25 2.25 0 0 0 1 7.25ZM7 8a1 1 0 0 0-1 1 8 8 0 0 0 8 8h2a2.25 2.25 0 0 0 2.25-2.25V9.75A2.25 2.25 0 0 0 16 7.5H3.25A2.25 2.25 0 0 0 1 9.75V17A2.25 2.25 0 0 0 3.25 19.25H7a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1Z" />
        </svg>
      </div>
      <div>
        <h2 className="text-lg font-bold text-gray-900">Payment Method</h2>
        <p className="text-xs text-gray-400">Choose how you want to pay</p>
      </div>
    </div>

    {/* Payment options */}
    <div className="flex flex-col gap-3">
      <PayOption value="cod" selected={paymentMethod} onChange={setPaymentMethod}
        icon="💵" title="Cash on Delivery"
        subtitle="Pay when your order arrives at your door" />
      <PayOption value="upi" selected={paymentMethod} onChange={setPaymentMethod}
        icon="📱" title="UPI Payment"
        subtitle="Pay via Google Pay, PhonePe, Paytm, etc." />
      <PayOption value="card" selected={paymentMethod} onChange={setPaymentMethod}
        icon="💳" title="Credit / Debit Card"
        subtitle="Visa, Mastercard, RuPay accepted" />
      <PayOption value="netbanking" selected={paymentMethod} onChange={setPaymentMethod}
        icon="🏦" title="Net Banking"
        subtitle="All major Indian banks supported" />
    </div>

    {/* UPI */}
    {paymentMethod === "upi" && (
      <div className="mt-5 p-4 bg-indigo-50 border border-indigo-100 rounded-2xl">
        <Field label="UPI ID" name="upiId" placeholder="yourname@upi"
          icon="@" onChange={() => {}} />
        <p className="text-[11px] text-gray-400 mt-2">
          Enter your UPI ID — e.g. 9876543210@paytm
        </p>
      </div>
    )}

    {/* Card */}
    {paymentMethod === "card" && (
      <div className="mt-5 p-4 bg-indigo-50 border border-indigo-100 rounded-2xl flex flex-col gap-3">
        <Field label="Card Number" name="cardNo" placeholder="1234 5678 9012 3456" onChange={() => {}} />
        <div className="grid grid-cols-2 gap-3">
          <Field label="Expiry" name="expiry" placeholder="MM / YY" onChange={() => {}} />
          <Field label="CVV" name="cvv" placeholder="···" type="password" onChange={() => {}} />
        </div>
        <Field label="Cardholder Name" name="cardName" placeholder="Rahul Sharma" onChange={() => {}} />
      </div>
    )}

    {/* Net Banking */}
    {paymentMethod === "netbanking" && (
      <div className="mt-5 p-4 bg-indigo-50 border border-indigo-100 rounded-2xl">
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Select Bank
        </label>
        <select className="mt-2 w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-700 outline-none focus:border-indigo-500 bg-white">
          <option>State Bank of India</option>
          <option>HDFC Bank</option>
          <option>ICICI Bank</option>
          <option>Axis Bank</option>
          <option>Kotak Mahindra Bank</option>
          <option>Punjab National Bank</option>
          <option>Other</option>
        </select>
      </div>
    )}

    {/* Navigation */}
    <div className="flex gap-3 mt-8">
      <button
        onClick={onBack}
        className="flex-1 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-600 font-semibold py-3 rounded-xl transition"
      >
        ← Back
      </button>
      <button
        onClick={onNext}
        className="flex-[2] bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white font-bold py-3 rounded-xl transition-all shadow-md shadow-indigo-200 flex items-center justify-center gap-2"
      >
        Review Order →
      </button>
    </div>
  </div>
);

export default PaymentStep;
