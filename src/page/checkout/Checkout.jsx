import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import API from "../../API/Api";

const Checkout = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [billingDifferent, setBillingDifferent] = useState(false);
  const [deliveryRange, setDeliveryRange] = useState("");
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const userId = localStorage.getItem("user");

  const subtotal = cartItems.reduce((total, item) => {
    const catId = item.cat_id || "";
    const isContactLens = catId.includes("6915735feeb23fa59c7d532b");

    const frameTotal = item.price * item.quantity;
    const lensTotal = (item.lens?.totalPrice || 0) * item.quantity;
    const policyTotal = (item.policy?.price || 0) * item.quantity;

    if (isContactLens) {
      return total + frameTotal + policyTotal;
    } else {
      return total + frameTotal + lensTotal + policyTotal;
    }
  }, 0);

  const steps = ["Contact", "Shipping", "Billing", "Review & Pay"];

  // Tax and shipping logic
  // const taxRates = {
  //   Ontario: 0.13,
  //   Alberta: 0.05,
  //   Default: 0.13,
  //   International: 0,
  // };
  const taxRates = {
    Ontario: 0,
    Alberta: 0,
    Default: 0,
    International: 0,
  };

  //shipping charges
  // const shippingCharges = {
  //   Standard: 10,
  //   Express: 30,
  //   PremiumExpress: 50,
  // };
  const shippingCharges = {
    Standard: 0,
    Express: 0,
    PremiumExpress: 0,
  };
  const getTaxRate = (province) => {
    if (province === "Ontario") return taxRates.Ontario;
    if (province === "Alberta") return taxRates.Alberta;
    if (province === "International") return taxRates.International;
    return taxRates.Default;
  };
  const province = formData.shippingProvince || "Default";
  const taxRate = getTaxRate(province);
  const tax = +(subtotal * taxRate).toFixed(2);
  const shipping =
    subtotal > 500 ? 0 : shippingCharges[formData.shippingMethod] || 0;

  const total = +(subtotal + tax + shipping).toFixed(2);

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

  useEffect(() => {
    if (!userId) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please login to proceed with checkout.",
        confirmButtonText: "Go to Login",
        confirmButtonColor: "#dc2626",
      }).then(() => {
        navigate("/login"); // redirect to login page
      });
    }
  }, [userId, navigate]);

  const validateStep = () => {
    switch (currentStep) {
      case 0: {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^(\+1\s?)?\d{3}[\s.-]?\d{3}[\s.-]?\d{4}$/;
        return (
          emailRegex.test(formData.email || "") &&
          phoneRegex.test(formData.phone || "")
        );
      }
      case 1: // Shipping
        return (
          formData.shippingName &&
          formData.shippingStreet &&
          formData.shippingCity &&
          formData.shippingPostal &&
          formData.shippingMethod &&
          formData.shippingProvince
        );
      case 2: // Billing
        if (billingDifferent) {
          const postalRegex = /^[A-Za-z]\d[A-Za-z] ?\d[A-Za-z]\d$/;
          return (
            postalRegex.test(formData.billingPostal || "") &&
            formData.billingStreet &&
            formData.billingCity
          );
        }
        return true;
      // case 3: // Prescription
      //   return !!formData.prescription;
      case 3: // Review & Pay
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

  const resolveLocationFromProvince = (province) => {
    const EAST = [
      "Ontario",
      "Quebec",
      "Nova Scotia",
      "New Brunswick",
      "Newfoundland",
      "Prince Edward Island",
    ];

    const WEST = [
      "Alberta",
      "British Columbia",
      "Manitoba",
      "Saskatchewan",
      "Northwest Territories",
      "Yukon",
      "Nunavut",
    ];

    if (EAST.includes(province)) return "east";
    if (WEST.includes(province)) return "west";
    return null; // do NOT allow International orders for now
  };

  const handleSubmit = async () => {
    const location = resolveLocationFromProvince(formData.shippingProvince);

    if (!location) {
      Swal.fire({
        icon: "error",
        title: "Location not supported",
        text: "We currently deliver only in East or West Canada",
      });
      return;
    }

    // STEP: verify inventory at selected location
    try {
      const res = await API.get(`/inventory/available-products/${location}`);
      const availableProducts = res.data.products || [];

      for (const item of cartItems) {
        // const productKey = item.productId || item.id;

        // const found = availableProducts.find((p) => {
        //   const backendProductId =
        //     p.productId?._id || p.productId || p._id;

        //   return String(backendProductId) === String(productKey);
        // });

        const productKey = item.productId || item.id;

        const found = availableProducts.find(
          (p) => String(p._id) === String(productKey)
        );

        if (!found) {
          await Swal.fire({
            icon: "warning",
            title: `${item.name} is Out of Stock`,
            text: `This item is not available in the ${location.toUpperCase()} warehouse.`,
          });
          return;
        }

        const availableQty = Number(found.availableQty || 0);

        if (availableQty < item.quantity) {
          await Swal.fire({
            icon: "warning",
            title: `Only ${availableQty} left`,
            text: `Reduce quantity of ${item.name} to continue.`,
          });
          return;
        }
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Stock check failed",
        text: "Please try again.",
      });
      return;
    }

    const orderSummary = {
      userId,
      email: formData.email,
      phone: formData.phone,
      location,
      cartItems: cartItems.map((item) => ({
        productId: item.id,
        name: item.name,
        image: item.image,
        price: item.price,
        categoryId: item.cat_id,
        catName: item.cat_sec,
        subCategoryName: item.subCategoryName,
        quantity: item.quantity,
        product_size: item.selectedSize || [],
        product_color: item.selectedColor || null,
        lens: item.lens || null, // lens details per product
        policy: item.policy || null, // policy details per product
        vendorID: item.vendorID || null,
      })),

      shippingAddress: {
        fullName: formData.shippingName,
        address: formData.shippingStreet,
        city: formData.shippingCity,
        province: formData.shippingProvince,
        postalCode: formData.shippingPostal,
        country: "Canada",
        phone: formData.phone,
      },

      billingAddress: billingDifferent
        ? {
          fullName: formData.shippingName,
          address: formData.billingStreet,
          city: formData.billingCity,
          province: formData.billingProvince,
          postalCode: formData.billingPostal,
          country: "Canada",
          phone: formData.phone,
        }
        : {
          fullName: formData.shippingName,
          address: formData.shippingStreet,
          city: formData.shippingCity,
          province: formData.shippingProvince,
          postalCode: formData.shippingPostal,
          country: "Canada",
          phone: formData.phone,
        },

      subtotal,
      tax,
      shipping,
      total,

      paymentMethod: "COD",
      paymentStatus: "Pending",
      orderStatus: "Placed",
    };

    localStorage.setItem("orderSummary", JSON.stringify(orderSummary));
    navigate("/payment");
  };

  const shippingOptions = {
    Standard: { min: 10, max: 17 },
    Express: { min: 8, max: 14 },
    PremiumExpress: { min: 4, max: 10 },
  };

  useEffect(() => {
    if (formData.shippingMethod && shippingOptions[formData.shippingMethod]) {
      const { min, max } = shippingOptions[formData.shippingMethod];
      const today = new Date();

      const startDate = new Date(today);
      startDate.setDate(today.getDate() + min);

      const endDate = new Date(today);
      endDate.setDate(today.getDate() + max);

      const options = { year: "numeric", month: "long", day: "numeric" };

      setDeliveryRange(
        `${startDate.toLocaleDateString(
          "en-US",
          options
        )} - ${endDate.toLocaleDateString("en-US", options)}`
      );
    } else {
      setDeliveryRange("");
    }
  }, [formData.shippingMethod]);

  const handleStepClick = (step) => {
    if (step < currentStep || validateStep()) {
      setCurrentStep(step);
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill all required fields before continuing!",
      });
    }
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
                      ? "bg-[#f00000] text-white border-red-600"
                      : "border-black text-black group-hover:bg-black group-hover:text-white"
                    }`}
                >
                  {idx + 1}
                </div>
                <span
                  className={`mt-2 text-sm ${idx === currentStep
                    ? "text-[#f00000] font-bold"
                    : "text-gray-700"
                    }`}
                >
                  {step}
                </span>
              </button>
              {idx < steps.length - 1 && (
                <div
                  className={`flex-1 h-2 rounded-sm transition-colors hover:cursor-pointer
                  ${idx < currentStep ? "bg-[#f00000]" : "bg-gray-300"}`}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Step 0: Contact */}
      {currentStep === 0 && (
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <input
              type="email"
              placeholder="example@email.com"
              value={formData.email || ""}
              onChange={(e) => handleChange("email", e.target.value)}
              className={`border p-2 rounded w-full 
          ${formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
                  ? "border-red-500"
                  : "border-black"
                }`}
              required
            />
            {formData.email &&
              !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) && (
                <p className="text-[#f00000] text-sm mt-1">
                  Invalid email address
                </p>
              )}
          </div>

          <div className="col-span-2">
            <input
              type="tel"
              placeholder="416 123 4567"
              value={formData.phone || ""}
              onChange={(e) => handleChange("phone", e.target.value)}
              className={`border p-2 rounded w-full ${formData.phone &&
                !/^(\+1\s?)?\d{3}[\s.-]?\d{3}[\s.-]?\d{4}$/.test(formData.phone)
                ? "border-red-500"
                : "border-black"
                }`}
              required
            />
            {formData.phone &&
              !/^(\+1\s?)?\d{3}[\s.-]?\d{3}[\s.-]?\d{4}$/.test(
                formData.phone
              ) && (
                <p className="text-[#f00000] text-sm mt-1">
                  Invalid phone number. Use 416 123 4567 format.
                </p>
              )}
          </div>
        </div>
      )}

      {/* Step 1: Shipping */}
      {currentStep === 1 && (
        <div className="grid grid-cols-2 gap-4">
          <h1 className="w-[488px]">
            Expected Delivery Date:{" "}
            <b>{deliveryRange || "Please select a shipping method"}</b>
          </h1>
          <br />
          <hr
            className={`border-t-2 -mt-2 ${!deliveryRange
              ? "w-[418px] border-black"
              : "w-[498px] border-black"
              }`}
          />

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
            placeholder="Postal Code"
            value={formData.shippingPostal || ""}
            onChange={(e) => {
              const val = e.target.value.toUpperCase();
              handleChange("shippingPostal", val);
            }}
            className={`border p-2 rounded w-full ${formData.shippingPostal &&
              !/^[A-Za-z]\d[A-Za-z] ?\d[A-Za-z]\d$/.test(
                formData.shippingPostal
              )
              ? "border-red-500"
              : "border-black"
              }`}
            required
          />
          {formData.shippingPostal &&
            !/^[A-Za-z]\d[A-Za-z] ?\d[A-Za-z]\d$/.test(
              formData.shippingPostal
            ) && (
              <p className="text-[#f00000] text-sm mt-1">
                Invalid postal code. Example: A1A 1A1
              </p>
            )}

          {/* Province */}
          <select
            value={formData.shippingProvince || ""}
            onChange={(e) => handleChange("shippingProvince", e.target.value)}
            className="border border-black p-2 rounded w-full col-span-2"
            required
          >
            <option value="">Select Province</option>
            <option value="Ontario">Ontario</option>
            <option value="Alberta">Alberta</option>
            <option value="British Columbia">British Columbia</option>
            <option value="Quebec">Quebec</option>
            <option value="Manitoba">Manitoba</option>
            <option value="Saskatchewan">Saskatchewan</option>
            <option value="Nova Scotia">Nova Scotia</option>
            <option value="New Brunswick">New Brunswick</option>
            <option value="Newfoundland">Newfoundland</option>
            <option value="Prince Edward Island">Prince Edward Island</option>
            <option value="Northwest Territories">Northwest Territories</option>
            <option value="Yukon">Yukon</option>
            <option value="Nunavut">Nunavut</option>

            <option value="International">International</option>
          </select>
          <select
            value={formData.shippingMethod || ""}
            onChange={(e) => handleChange("shippingMethod", e.target.value)}
            className="border border-black p-2 rounded w-full col-span-2"
            required
          >
            <option value="">Select Shipping Method</option>
            <option value="Standard">Standard (10-17 days)</option>
            <option value="Express">Express (8-14 days)</option>
            <option value="PremiumExpress">Premium Express (4-10 days)</option>
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
                placeholder="Postal Code"
                value={formData.billingPostal || ""}
                onChange={(e) => {
                  const val = e.target.value.toUpperCase(); // convert to uppercase
                  handleChange("billingPostal", val);
                }}
                className={`border p-2 rounded w-full ${formData.billingPostal &&
                  !/^[A-Za-z]\d[A-Za-z] ?\d[A-Za-z]\d$/.test(
                    formData.billingPostal
                  )
                  ? "border-red-500"
                  : "border-black"
                  }`}
                required
              />
              {formData.billingPostal &&
                !/^[A-Za-z]\d[A-Za-z] ?\d[A-Za-z]\d$/.test(
                  formData.billingPostal
                ) && (
                  <p className="text-[#f00000] text-sm mt-1">
                    Invalid postal code. Example: A1A 1A1
                  </p>
                )}
            </div>
          )}
        </div>
      )}

      {/* Step 3: Review & Pay */}
      {currentStep === 3 && (
        <div className="border-2 border-black rounded-xl shadow-lg bg-white p-6 space-y-6">
          {/* Review */}
          <div>
            <h2 className="font-bold text-xl mb-4 text-[#f00000] border-b border-black pb-2">
              Billing Details
            </h2>
            <p>
              <strong>Email:</strong> {formData.email}
            </p>
            <p>
              <strong>Phone:</strong> {formData.phone}
            </p>
            <p>
              <strong>Shipping Address:</strong> {formData.shippingStreet},{" "}
              {formData.shippingCity} {formData.shippingPostal} (
              {formData.shippingMethod})
            </p>
            <p>
              <strong>Province:</strong> {formData.shippingProvince}
            </p>
            {billingDifferent && (
              <p>
                <strong>Billing:</strong> {formData.billingStreet},{" "}
                {formData.billingCity} {formData.billingPostal}
              </p>
            )}
          </div>

          <div className="w-full ml-auto bg-white shadow-lg border border-gray-200 rounded-xl p-6 overflow-hidden">
            <h2 className="font-bold text-xl mb-4 text-[#f00000] border-b border-gray-300 pb-2">
              Your Order
            </h2>

            {cartItems.map((item, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row sm:justify-between sm:items-start pb-3 border-b border-dashed border-gray-300 gap-3 sm:gap-0"
              >
                {/* Left Side: Image + Details */}
                <div className="flex items-start w-full sm:w-auto">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 sm:w-50 sm:h-24 object-cover rounded mr-4 flex-shrink-0"
                  />

                  <div className="flex-1">
                    <h4 className="text-gray-800 font-semibold flex items-center">
                      {item.name}
                      <span className="text-sm text-gray-500 ml-2">
                        x {item.quantity}
                      </span>
                    </h4>

                    {item.selectedSize?.length > 0 && (
                      <p className="text-gray-600 text-sm">
                        Size: {item.selectedSize}
                      </p>
                    )}

                    {item.selectedColor?.length > 0 && (
                      <p className="text-gray-600 text-sm flex items-center">
                        Color:
                        <span
                          style={{
                            backgroundColor: item.selectedColor,
                            width: "15px",
                            height: "15px",
                            display: "inline-block",
                            borderRadius: "50%",
                            marginRight: "5px",
                            marginLeft: "5px",
                          }}
                        ></span>
                        {item.selectedColor}
                      </p>
                    )}

                    {item.policy && item.policy.active && (
                      <p className="text-gray-600 text-sm mt-1">
                        Policy: {item.policy.name} ($
                        {(item.policy.price || 0).toFixed(2)})
                      </p>
                    )}

                    {item.lens &&
                      item.lens.totalPrice != null &&
                      item.cat_id !== "6915735feeb23fa59c7d532b" && (
                        <p className="text-gray-600 text-sm">
                          Lens: ${(item.lens.totalPrice || 0).toFixed(2)}
                        </p>
                      )}

                    <p className="text-gray-800 font-bold mt-1">
                      {item.cat_id === "6915735feeb23fa59c7d532b"
                        ? "Contact Lens"
                        : "Frame"}{" "}
                      ${(item.price || 0).toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Right Side: Price */}
                <div className="w-full sm:w-auto text-right mt-2 sm:mt-8">
                  {item.cat_id === "6915735feeb23fa59c7d532b" ? (
                    <p className="text-gray-800 font-bold">
                      $
                      {(
                        ((item.price || 0) + (item.policy?.price || 0)) *
                        (item.quantity || 1)
                      ).toFixed(2)}
                    </p>
                  ) : (
                    <p className="text-gray-800 font-bold">
                      $
                      {(
                        ((item.price || 0) +
                          (item.lens?.totalPrice || 0) +
                          (item.policy?.price || 0)) *
                        (item.quantity || 1)
                      ).toFixed(2)}
                    </p>
                  )}
                </div>
              </div>
            ))}
            <div className="mt-4 space-y-2 text-gray-700">
              <div className="flex flex-col sm:flex-row sm:justify-between">
                <span>Subtotal</span>
                <span className="mt-1 sm:mt-0">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between">
                <span>Shipping</span>
                <span className="mt-1 sm:mt-0">
                  {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between">
                <span>Tax ({(taxRate * 100).toFixed(0)}%)</span>
                <span className="mt-1 sm:mt-0">${tax.toFixed(2)}</span>
              </div>
              <div className="border-t pt-2 flex flex-col sm:flex-row sm:justify-between font-bold text-[#f00000] text-lg">
                <span>Total</span>
                <span className="mt-1 sm:mt-0">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Consents */}
          <div>
            <h2 className="font-bold text-xl mb-4 text-[#f00000] border-b border-black pb-2">
              Consents
            </h2>

            <label className="flex items-center mb-2">
              <input
                type="checkbox"
                checked={formData.terms || false}
                onChange={(e) => handleChange("terms", e.target.checked)}
                className="mr-2"
              />
              I agree to{" "}
              <Link
                to="/terms&Conditions"
                className="text-blue-600 underline ml-1"
              >
                Terms & Conditions
              </Link>
            </label>

            <label className="flex items-center mb-2">
              <input
                type="checkbox"
                checked={formData.warranty || false}
                onChange={(e) => handleChange("warranty", e.target.checked)}
                className="mr-2"
              />
              I agree to{" "}
              <Link
                to="/return-exchange"
                className="text-blue-600 underline ml-1"
              >
                Warranty / Return Policy
              </Link>
            </label>

            <label className="flex items-center mb-2">
              <input
                type="checkbox"
                checked={formData.privacy || false}
                onChange={(e) => handleChange("privacy", e.target.checked)}
                className="mr-2"
              />
              I agree to{" "}
              <Link
                to="/privacy-policy"
                className="text-blue-600 underline ml-1"
              >
                Privacy Policy
              </Link>
            </label>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between mt-6">
        {currentStep > 0 && (
          <button
            onClick={prevStep}
            className="px-4 py-2 rounded bg-black text-white hover:bg-gray-800 hover:cursor-pointer"
          >
            Previous
          </button>
        )}
        {currentStep < steps.length - 1 && (
          <button
            onClick={nextStep}
            className="px-4 py-2 rounded bg-[#f00000] text-white hover:bg-red-700 hover:cursor-pointer"
          >
            Next
          </button>
        )}
        {currentStep === steps.length - 1 && (
          <button
            onClick={handleSubmit}
            disabled={!validateStep()}
            className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 hover:cursor-pointer"
          >
            Continue Order
          </button>
        )}
      </div>
    </div>
  );
};

export default Checkout;
