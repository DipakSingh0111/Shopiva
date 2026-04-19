import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import StepBar from "../components/checkout/StepBar";
import OrderSummary from "../components/checkout/OrderSummary";
import DeliveryStep from "../components/checkout/DeliveryStep";
import PaymentStep from "../components/checkout/PaymentStep";
import ConfirmStep from "../components/checkout/ConfirmStep";
import {toast} from 'react-hot-toast'

const PlaceOrder = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });

  // ── Field change handler ──
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: "" });
  };

  // ── Delivery validation ──
  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = "Required";
    if (!form.lastName.trim()) e.lastName = "Required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      e.email = "Valid email required";
    if (!form.phone.trim() || form.phone.length < 10)
      e.phone = "Valid phone required";
    if (!form.street.trim()) e.street = "Required";
    if (!form.city.trim()) e.city = "Required";
    if (!form.state.trim()) e.state = "Required";
    if (!form.zip.trim()) e.zip = "Required";
    if (!form.country.trim()) e.country = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // ── Step navigation ──
  const handleNext = () => {
    if (step === 0 && !validate()) return;
    setStep((s) => Math.min(s + 1, 2));
  };

  const handleBack = (toStep) => setStep(toStep);

  const handlePlaceOrder = () => {
   toast.success("🎉 Order placed successfully!");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Title */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Checkout
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Complete your order in just a few steps
          </p>
        </div>

        {/* Progress bar */}
        <StepBar current={step} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* ── Left: Step panels ── */}
          <div className="lg:col-span-2">
            {step === 0 && (
              <DeliveryStep
                form={form}
                errors={errors}
                onChange={handleChange}
                onNext={handleNext}
              />
            )}
            {step === 1 && (
              <PaymentStep
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
                onBack={() => handleBack(0)}
                onNext={handleNext}
              />
            )}
            {step === 2 && (
              <ConfirmStep
                form={form}
                paymentMethod={paymentMethod}
                onBack={handleBack}
                onPlaceOrder={handlePlaceOrder}
              />
            )}
          </div>

          {/* ── Right: Order summary ── */}
          <div className="lg:col-span-1">
            <OrderSummary />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
