import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PayPalButtons } from "@paypal/react-paypal-js";
import Swal from "sweetalert2";
import { useSelector, useDispatch } from 'react-redux';

const Checkout = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({});
    const [billingDifferent, setBillingDifferent] = useState(false);
    const navigate = useNavigate();
    const cartItems = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();


    const subtotal = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );
    const steps = [
        "Contact",
        "Shipping",
        "Billing",
        "Prescription",
        "Review & Pay",
    ];

    // shipping add  
    const tax = subtotal * 0.05;
    const discount = 200;
    const shipping = 150;
    const total = subtotal + tax + shipping - discount;
    // Load saved data from localStorage
    useEffect(() => {
        const savedData = localStorage.getItem("checkoutDraft");
        if (savedData) setFormData(JSON.parse(savedData));
    }, []);

    // Save form data in localStorage
    useEffect(() => {
        localStorage.setItem(
            "checkoutDraft",
            JSON.stringify({ ...formData, currentStep })
        );
    }, [formData, currentStep]);

    const handleChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    // Validation for each step
    const validateStep = () => {
        switch (currentStep) {
            case 0: // Contact
                return formData.email && formData.phone;
            case 1: // Shipping
                return (
                    formData.shippingName &&
                    formData.shippingStreet &&
                    formData.shippingCity &&
                    formData.shippingZip &&
                    formData.shippingMethod
                );
            case 2: // Billing (only if billingDifferent is checked)
                if (billingDifferent) {
                    return (
                        formData.billingStreet &&
                        formData.billingCity &&
                        formData.billingZip
                    );
                }
                return true;
            case 3: // Prescription
                return !!formData.prescription;
            case 4: // Review & Pay
                return formData.terms && formData.warranty && formData.privacy;
            default:
                return false;
        }
    };

    const nextStep = () => {
        if (!validateStep()) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please fill all required fields before continuing!",
            });
            return;
        }
        setCurrentStep((p) => Math.min(p + 1, steps.length - 1));
    };

    const prevStep = () => setCurrentStep((p) => Math.max(p - 1, 0));

    const handleSubmit = () => {
        localStorage.removeItem("checkoutDraft");
        navigate("/payment");
    };

    // Validation when clicking on step numbers
    const handleStepClick = (idx) => {
        if (idx > currentStep) {
            if (!validateStep()) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Please complete the current step before moving ahead!",
                });
                return;
            }
        }
        setCurrentStep(idx);
    };



    return (
        <div className="max-w-4xl mx-auto p-6">
            {/* Progress Bar */}
            <div className="mb-8">
                <div className="flex items-center">
                    {steps.map((step, idx) => (
                        <React.Fragment key={idx}>
                            <button
                                type="button"
                                onClick={() => handleStepClick(idx)}
                                className="flex flex-col items-center flex-shrink-0 text-center cursor-pointer group mt-5"
                                aria-current={idx === currentStep ? "step" : undefined}
                            >
                                <div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all
                  ${idx <= currentStep
                                            ? "bg-red-600 text-white border-red-600"
                                            : "border-black text-black group-hover:bg-black group-hover:text-white"
                                        }`}
                                >
                                    {idx + 1}
                                </div>
                                <span
                                    className={`mt-2 text-sm ${idx === currentStep
                                        ? "text-red-600 font-bold"
                                        : "text-gray-700"
                                        }`}
                                >
                                    {step}
                                </span>
                            </button>
                            {idx < steps.length - 1 && (
                                <div
                                    className={`flex-1 h-2 rounded-sm transition-colors
                  ${idx < currentStep ? "bg-red-600" : "bg-gray-300"}`}
                                />
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>

            {/* Step 0: Contact */}
            {currentStep === 0 && (
                <div className="grid grid-cols-2 gap-4">
                    <input
                        type="email"
                        placeholder="Email"
                        value={formData.email || ""}
                        onChange={(e) => handleChange("email", e.target.value)}
                        className="border border-black p-2 rounded w-full col-span-2"
                        required
                    />
                    <input
                        type="tel"
                        placeholder="Mobile Phone"
                        value={formData.phone || ""}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        className="border border-black p-2 rounded w-full col-span-2"
                        required
                    />
                </div>
            )}

            {/* Step 1: Shipping */}
            {currentStep === 1 && (
                <div className="grid grid-cols-2 gap-4">
                    <input
                        type="text"
                        placeholder="Full Name"
                        value={formData.shippingName || ""}
                        onChange={(e) => handleChange("shippingName", e.target.value)}
                        className="border border-black p-2 rounded w-full col-span-2"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Street"
                        value={formData.shippingStreet || ""}
                        onChange={(e) => handleChange("shippingStreet", e.target.value)}
                        className="border border-black p-2 rounded w-full col-span-2"
                        required
                    />
                    <input
                        type="text"
                        placeholder="City"
                        value={formData.shippingCity || ""}
                        onChange={(e) => handleChange("shippingCity", e.target.value)}
                        className="border border-black p-2 rounded w-full"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Zip"
                        value={formData.shippingZip || ""}
                        onChange={(e) => handleChange("shippingZip", e.target.value)}
                        className="border border-black p-2 rounded w-full"
                        required
                    />
                    <select
                        value={formData.shippingMethod || ""}
                        onChange={(e) => handleChange("shippingMethod", e.target.value)}
                        className="border border-black p-2 rounded w-full col-span-2"
                        required
                    >
                        <option value="">Select Shipping Method</option>
                        <option value="Standard">Standard (5-7 days)</option>
                        <option value="Express">Express (2-3 days)</option>
                        <option value="Overnight">Overnight</option>
                    </select>
                </div>
            )}

            {/* Step 2: Billing */}
            {currentStep === 2 && (
                <div>
                    <label className="flex items-center mb-2">
                        <input
                            type="checkbox"
                            checked={billingDifferent}
                            onChange={(e) => setBillingDifferent(e.target.checked)}
                            className="mr-2"
                        />
                        Billing address is different from shipping
                    </label>
                    {billingDifferent && (
                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <input
                                type="text"
                                placeholder="Street"
                                value={formData.billingStreet || ""}
                                onChange={(e) => handleChange("billingStreet", e.target.value)}
                                className="border border-black p-2 rounded w-full col-span-2"
                                required
                            />
                            <input
                                type="text"
                                placeholder="City"
                                value={formData.billingCity || ""}
                                onChange={(e) => handleChange("billingCity", e.target.value)}
                                className="border border-black p-2 rounded w-full"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Zip"
                                value={formData.billingZip || ""}
                                onChange={(e) => handleChange("billingZip", e.target.value)}
                                className="border border-black p-2 rounded w-full"
                                required
                            />
                        </div>
                    )}
                </div>
            )}

            {/* Step 3: Prescription */}
            {currentStep === 3 && (
                <div>
                    <label className="block mb-2 font-medium">Prescription</label>
                    <input
                        type="file"
                        onChange={(e) =>
                            handleChange("prescription", e.target.files[0]?.name)
                        }
                        className="border border-black p-2 rounded w-full mt-3"
                        required
                    />
                </div>
            )}

            {/* Step 4: Review & Pay */}
            {currentStep === 4 && (
                <div className="border-2 border-black rounded-xl shadow-lg bg-white p-6 space-y-6">
                    {/* Review */}
                    <div>
                        <h2 className="font-bold text-xl mb-4 text-red-600 border-b border-black pb-2">
                            Billing  Details
                        </h2>
                        <p>
                            <strong>Email:</strong> {formData.email}
                        </p>
                        <p>
                            <strong>Phone:</strong> {formData.phone}
                        </p>
                        <p>
                            <strong>Shipping Address:</strong> {formData.shippingStreet},{" "}
                            {formData.shippingCity} {formData.shippingZip} (
                            {formData.shippingMethod})
                        </p>
                        {billingDifferent && (
                            <p>
                                <strong>Billing:</strong> {formData.billingStreet},{" "}
                                {formData.billingCity} {formData.billingZip}
                            </p>
                        )}
                        {formData.prescription && (
                            <p>
                                <strong>Prescription:</strong> {formData.prescription}
                            </p>
                        )}
                    </div>
                    <div className="w-full  ml-auto bg-white shadow-lg border border-gray-200 rounded-xl p-6">
                        {/* Heading */}
                        <h2 className="font-bold text-xl mb-4 text-red-600 border-b border-gray-300 pb-2">
                            Your Order
                        </h2>

                        {/* Cart Items */}
                        <div className="space-y-4">
                            {cartItems.map((item, index) => (
                                <div key={index} className="flex justify-between items-start pb-3 border-b border-dashed border-gray-300">
                                    {/* Left - Product Info */}
                                    <div className="flex items-center mb-3">
                                        {/* Product Image */}
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-50 h-24 object-cover rounded mr-4"
                                        />

                                        {/* Product Details */}
                                        <div className="flex-1">
                                            <h4 className="text-gray-800 font-semibold flex items-center">
                                                {item.name}
                                                <span className="text-sm text-gray-500 ml-2">x {item.quantity}</span>
                                            </h4>
                                        </div>
                                    </div>


                                    {/* Right - Price */}
                                    <div className="text-right">
                                        <p className="text-gray-800 font-bold mt-8">
                                            ₹{(item.price * item.quantity).toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div className="mt-4 space-y-2 text-gray-700">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>₹{subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping</span>
                                <span>₹{shipping.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Tax</span>
                                <span>₹{tax.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-green-600">
                                <span>Discount</span>
                                <span>-₹{discount.toFixed(2)}</span>
                            </div>
                            <div className="border-t pt-2 flex justify-between font-bold text-red-600 text-lg">
                                <span>Total</span>
                                <span>₹{total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>



                    {/* Consents */}
                    <div>
                        <h2 className="font-bold text-xl mb-4 text-red-600 border-b border-black pb-2">
                            Consents
                        </h2>
                        <label className="flex items-center mb-2">
                            <input
                                type="checkbox"
                                checked={formData.terms || false}
                                onChange={(e) => handleChange("terms", e.target.checked)}
                                className="mr-2"
                            />
                            I agree to Terms & Conditions
                        </label>
                        <label className="flex items-center mb-2">
                            <input
                                type="checkbox"
                                checked={formData.warranty || false}
                                onChange={(e) => handleChange("warranty", e.target.checked)}
                                className="mr-2"
                            />
                            I agree to Warranty/Return Policy
                        </label>
                        <label className="flex items-center mb-2">
                            <input
                                type="checkbox"
                                checked={formData.privacy || false}
                                onChange={(e) => handleChange("privacy", e.target.checked)}
                                className="mr-2"
                            />
                            I agree to Privacy Policy
                        </label>
                    </div>


                </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-6">
                {currentStep > 0 && (
                    <button
                        onClick={prevStep}
                        className="px-4 py-2 rounded bg-black text-white hover:bg-gray-800"
                    >
                        Previous
                    </button>
                )}
                {currentStep < steps.length - 1 && (
                    <button
                        onClick={nextStep}
                        className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
                    >
                        Next
                    </button>
                )}
                {currentStep === steps.length - 1 && (
                    <button
                        onClick={handleSubmit}
                        disabled={!validateStep()}
                        className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 disabled:opacity-50"
                    >
                        Continue Order
                    </button>
                )}
            </div>
        </div>
    );
};

export default Checkout;
