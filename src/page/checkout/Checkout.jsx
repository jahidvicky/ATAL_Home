import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PayPalButtons } from "@paypal/react-paypal-js";
import Swal from "sweetalert2";

const Checkout = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({});
    const [billingDifferent, setBillingDifferent] = useState(false);
    const navigate = useNavigate();

    const steps = [
        "Contact",
        "Shipping",
        "Billing",
        "Prescription",
        "Review & Pay",
    ];

    useEffect(() => {
        const savedData = localStorage.getItem("checkoutDraft");
        if (savedData) setFormData(JSON.parse(savedData));
    }, []);

    useEffect(() => {
        localStorage.setItem(
            "checkoutDraft",
            JSON.stringify({ ...formData, currentStep })
        );
    }, [formData, currentStep]);

    const handleChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const nextStep = () =>
        setCurrentStep((p) => Math.min(p + 1, steps.length - 1));
    const prevStep = () => setCurrentStep((p) => Math.max(p - 1, 0));

    const handleSubmit = () => {
        localStorage.removeItem("checkoutDraft");
        navigate("/place-order");
    };

    // Simple Mock Bill Data
    const subtotal = 2000;
    const tax = subtotal * 0.05;
    const discount = 200;
    const total = subtotal + tax - discount;

    return (
        <div className="max-w-4xl mx-auto p-6">
            {/* Progress Bar */}
            <div className="mb-8">
                <div className="flex items-center">
                    {steps.map((step, idx) => (
                        <React.Fragment key={idx}>
                            <button
                                type="button"
                                onClick={() => setCurrentStep(idx)}
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
                    />
                    <input
                        type="tel"
                        placeholder="Mobile Phone"
                        value={formData.phone || ""}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        className="border border-black p-2 rounded w-full col-span-2"
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
                    />
                    <input
                        type="text"
                        placeholder="Street"
                        value={formData.shippingStreet || ""}
                        onChange={(e) => handleChange("shippingStreet", e.target.value)}
                        className="border border-black p-2 rounded w-full col-span-2"
                    />
                    <input
                        type="text"
                        placeholder="City"
                        value={formData.shippingCity || ""}
                        onChange={(e) => handleChange("shippingCity", e.target.value)}
                        className="border border-black p-2 rounded w-full"
                    />
                    <input
                        type="text"
                        placeholder="Zip"
                        value={formData.shippingZip || ""}
                        onChange={(e) => handleChange("shippingZip", e.target.value)}
                        className="border border-black p-2 rounded w-full"
                    />
                    <select
                        value={formData.shippingMethod || ""}
                        onChange={(e) => handleChange("shippingMethod", e.target.value)}
                        className="border border-black p-2 rounded w-full col-span-2"
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
                            />
                            <input
                                type="text"
                                placeholder="City"
                                value={formData.billingCity || ""}
                                onChange={(e) => handleChange("billingCity", e.target.value)}
                                className="border border-black p-2 rounded w-full"
                            />
                            <input
                                type="text"
                                placeholder="Zip"
                                value={formData.billingZip || ""}
                                onChange={(e) => handleChange("billingZip", e.target.value)}
                                className="border border-black p-2 rounded w-full"
                            />
                        </div>
                    )}
                </div>
            )}

            {/* Step 3: Prescription */}
            {currentStep === 3 && (
                <div>
                    <label className="block mb-2 font-medium">Prescription</label>
                    <div className="space-y-2">
                        <label className="flex items-center">
                            Upload prescription
                        </label>
                    </div>
                    <input
                        type="file"
                        onChange={(e) =>
                            handleChange("prescription", e.target.files[0]?.name)
                        }
                        className="border border-black p-2 rounded w-full mt-3"
                    />
                </div>
            )}

            {/* Step 4: Review & Pay */}
            {currentStep === 4 && (
                <div className="border-2 border-black rounded-xl shadow-lg bg-white p-6 space-y-6">
                    {/* Review */}
                    <div>
                        <h2 className="font-bold text-xl mb-4 text-red-600 border-b border-black pb-2">
                            Review Details
                        </h2>
                        <p>
                            <strong>Email:</strong> {formData.email}
                        </p>
                        <p>
                            <strong>Phone:</strong> {formData.phone}
                        </p>
                        <p>
                            <strong>Shipping:</strong> {formData.shippingStreet},{" "}
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

                    <div className="p-6">
                        <h2 className="text-xl font-bold mb-4">Pay with PayPal</h2>

                        <PayPalButtons
                            style={{ layout: "vertical" }}
                            createOrder={(data, actions) => {
                                return actions.order.create({
                                    purchase_units: [
                                        {
                                            amount: {
                                                value: "20.00",
                                            },
                                        },
                                    ],
                                });
                            }}
                            onApprove={(data, actions) => {
                                return actions.order.capture().then((details) => {
                                    Swal.fire({
                                        toast: true,
                                        position: "top-end",
                                        icon: "success",
                                        title: `Transaction completed by ${details.payer.name.given_name}`,
                                        showConfirmButton: false,
                                        timer: 1500,
                                        timerProgressBar: true
                                    });
                                    // console.log("Full details:", details);
                                });
                            }}
                            onError={(err) => {
                                console.error("PayPal Checkout Error:", err);
                            }}
                        />
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

                    {/* Mock Bill */}
                    <div>
                        <h2 className="font-bold text-xl mb-4 text-red-600 border-b border-black pb-2">
                            Mock Bill
                        </h2>
                        <div className="space-y-2 text-gray-800">
                            <div className="flex justify-between">
                                <span>Subtotal</span> <span>₹{subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Tax (5%)</span> <span>₹{tax.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-green-600">
                                <span>Discount</span> <span>-₹{discount.toFixed(2)}</span>
                            </div>
                            <div className="border-t mt-2 pt-2 flex justify-between font-bold text-red-600">
                                <span>Total</span> <span>₹{total.toFixed(2)}</span>
                            </div>
                        </div>
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
                        disabled={
                            !formData.paymentMethod ||
                            !formData.terms ||
                            !formData.warranty ||
                            !formData.privacy
                        }
                        className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 disabled:opacity-50"
                    >
                        Submit
                    </button>
                )}
            </div>
        </div>
    );
};

export default Checkout;