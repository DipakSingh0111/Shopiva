import React from "react";
import { Field } from "./CheckoutUI";

const DeliveryStep = ({ form, errors, onChange, onNext }) => (
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">

    {/* Header */}
    <div className="flex items-center gap-3 mb-6">
      <div className="w-9 h-9 rounded-xl bg-indigo-100 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#6366f1" className="w-5 h-5">
          <path fillRule="evenodd" d="m9.69 18.933.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 0 0 .281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 1 0 3 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 0 0 2.273 1.765 11.842 11.842 0 0 0 .976.544l.062.029.018.008.006.003ZM10 11.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z" clipRule="evenodd" />
        </svg>
      </div>
      <div>
        <h2 className="text-lg font-bold text-gray-900">Delivery Information</h2>
        <p className="text-xs text-gray-400">Where should we deliver your order?</p>
      </div>
    </div>

    {/* Fields */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Field label="First Name" name="firstName" placeholder="Rahul"
        value={form.firstName} onChange={onChange} error={errors.firstName} />
      <Field label="Last Name" name="lastName" placeholder="Sharma"
        value={form.lastName} onChange={onChange} error={errors.lastName} />
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
      <Field label="Email Address" name="email" type="email" placeholder="rahul@email.com"
        icon="✉️" value={form.email} onChange={onChange} error={errors.email} />
      <Field label="Phone Number" name="phone" type="tel" placeholder="9876543210"
        icon="📞" value={form.phone} onChange={onChange} error={errors.phone} />
    </div>

    <div className="mt-4">
      <Field label="Street Address" name="street" placeholder="123, MG Road, Near Park"
        icon="🏠" value={form.street} onChange={onChange} error={errors.street} />
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
      <Field label="City" name="city" placeholder="Mumbai"
        value={form.city} onChange={onChange} error={errors.city} />
      <Field label="State" name="state" placeholder="Maharashtra"
        value={form.state} onChange={onChange} error={errors.state} />
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
      <Field label="Zip Code" name="zip" placeholder="400001"
        value={form.zip} onChange={onChange} error={errors.zip} />
      <Field label="Country" name="country" placeholder="India"
        value={form.country} onChange={onChange} error={errors.country} />
    </div>

    {/* Next button */}
    <button
      onClick={onNext}
      className="mt-8 w-full bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white font-bold py-3.5 rounded-xl transition-all duration-150 shadow-md shadow-indigo-200 flex items-center justify-center gap-2"
    >
      Continue to Payment
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
        <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
      </svg>
    </button>
  </div>
);

export default DeliveryStep;
