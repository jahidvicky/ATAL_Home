import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import API from "../../API/Api";

const Checkout = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [billingDifferent, setBillingDifferent] = useState(false);
  const [draftLoaded, setDraftLoaded] = useState(false);
  const [postalCodeError, setPostalCodeError] = useState("");

  // ─── ADDED ────────────────────────────────────────────────────────────────
  const FLAT_RATE_SHIPPING = 15.00; // ← set your flat rate here
  const [estimateLoading, setEstimateLoading] = useState(false);
  const [deliveryEstimate, setDeliveryEstimate] = useState(null);

  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const userId = localStorage.getItem("user");
  const token = localStorage.getItem("token");

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

  const taxRates = {
    // HST Provinces
    Ontario: 0.13,
    "Nova Scotia": 0.15,
    "New Brunswick": 0.15,
    "Newfoundland": 0.15,
    "Prince Edward Island": 0.15,

    // GST + PST Provinces
    "British Columbia": 0.12,  // 5% GST + 7% PST
    Manitoba: 0.12,            // 5% GST + 7% PST
    Saskatchewan: 0.11,        // 5% GST + 6% PST
    Quebec: 0.14975,           // 5% GST + 9.975% QST

    // GST Only (no PST)
    Alberta: 0.05,
    "Northwest Territories": 0.05,
    Yukon: 0.05,
    Nunavut: 0.05,
  }
  const taxRate = taxRates[formData.shippingProvince] ?? 0.05;
  const tax = +(subtotal * taxRate).toFixed(2);
  const shipping = subtotal > 200 ? 0 : FLAT_RATE_SHIPPING;

  const total = +(subtotal + tax + shipping).toFixed(2);

  // ─── ADDED: fetch delivery estimate from new backend endpoint ─────────────
  const fetchDeliveryEstimate = async () => {
    const postalRegex = /^[A-Za-z]\d[A-Za-z] ?\d[A-Za-z]\d$/;
    if (!formData.shippingPostal || !postalRegex.test(formData.shippingPostal)) return;

    try {
      setEstimateLoading(true);
      setDeliveryEstimate(null);

      const res = await API.post("/shipping/delivery-estimate", {
        destination: formData.shippingPostal.replace(/\s/g, ""),
      });

      if (res.data?.success) {
        setDeliveryEstimate({
          min: res.data.estimatedDelivery,
          max: res.data.estimatedDeliveryMax,
        });
      }
    } catch (err) {
      console.error("Delivery estimate error:", err);
      setDeliveryEstimate(null);
    } finally {
      setEstimateLoading(false);
    }
  };
  // ──────────────────────────────────────────────────────────────────────────

  useEffect(() => {
    const postalRegex = /^[A-Za-z]\d[A-Za-z] ?\d[A-Za-z]\d$/;
    if (!formData.shippingPostal || !postalRegex.test(formData.shippingPostal)) return;
    const timer = setTimeout(() => fetchDeliveryEstimate(), 700);
    return () => clearTimeout(timer);
  }, [formData.shippingPostal]);
  // ──────────────────────────────────────────────────────────────────────────

  // Draft & autofill — UNCHANGED
  useEffect(() => {
    const savedData = localStorage.getItem("checkoutDraft");
    if (savedData) setFormData(JSON.parse(savedData));
    setDraftLoaded(true);
  }, []);

  useEffect(() => {
    if (draftLoaded && userId && token) autofillUserAddress();
  }, [draftLoaded, userId, token]);

  useEffect(() => {
    localStorage.setItem("checkoutDraft", JSON.stringify({ ...formData, currentStep }));
  }, [formData, currentStep]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSelectAll = (checked) => {
    setFormData((prev) => ({ ...prev, terms: checked, warranty: checked, privacy: checked }));
  };

  const autofillUserAddress = async () => {
    if (!userId || !token) return;
    try {
      const res = await API.get(`/customer/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.data?.success || !res.data?.data) return;
      const customer = res.data.data;
      setFormData((prev) => ({
        ...prev,
        email: prev.email || customer.email || "",
        phone: prev.phone || customer.mobilePhone || "",
        shippingName: prev.shippingName || `${customer.firstName || ""} ${customer.lastName || ""}`.trim(),
        shippingStreet: prev.shippingStreet || customer.address?.street || "",
        shippingCity: prev.shippingCity || customer.address?.city || "",
        shippingPostal: prev.shippingPostal || customer.address?.postalCode || "",
      }));
    } catch (error) {
      console.error("Failed to autofill address", error.response?.data || error);
    }
  };

  const validatePostalCode = async (postalCode) => {
    const cleaned = postalCode.replace(/\s/g, "");
    if (cleaned.length < 6) return;
    try {
      const { data } = await API.post("/shipping/validate-address", { postalCode: cleaned });
      if (!data.valid) setPostalCodeError(data.message || "Invalid postal code");
      else setPostalCodeError("");
    } catch {
      setPostalCodeError("");
    }
  };


  // ─── Validation ───────────────────────────────────────────────────────────
  const validateStep = () => {
    switch (currentStep) {
      case 0: {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^(\+1\s?)?\d{3}[\s.-]?\d{3}[\s.-]?\d{4}$/;
        return emailRegex.test(formData.email || "") && phoneRegex.test(formData.phone || "");
      }
      case 1: {
        // NEW: no service selection required, just address fields
        const postalValid = /^[A-Za-z]\d[A-Za-z] ?\d[A-Za-z]\d$/.test(formData.shippingPostal || "");
        return !!(
          formData.shippingName &&
          formData.shippingStreet &&
          formData.shippingCity &&
          postalValid &&
          formData.shippingProvince &&
          !postalCodeError
        );
        // ────────────────────────────────────────────────────────────────────
      }
      case 2:
        if (billingDifferent) {
          const postalRegex = /^[A-Za-z]\d[A-Za-z] ?\d[A-Za-z]\d$/;
          return (
            postalRegex.test(formData.billingPostal || "") &&
            formData.billingStreet &&
            formData.billingCity
          );
        }
        return true;
      case 3:
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
      // ──────────────────────────────────────────────────────────────────────
      return;
    }
    setCurrentStep((p) => Math.min(p + 1, steps.length - 1));
  };

  const prevStep = () => setCurrentStep((p) => Math.max(p - 1, 0));

  const handleStepClick = (step) => {
    if (step < currentStep || validateStep()) setCurrentStep(step);
    else Swal.fire({ icon: "error", title: "Oops...", text: "Please fill all required fields before continuing!" });
  };

  // ─── Submit ───────────────────────────────────────────────────────────────
  // const resolveLocationFromProvince = (province) => {
  //   const EAST = ["Ontario", "Quebec", "Nova Scotia", "New Brunswick", "Newfoundland", "Prince Edward Island"];
  //   const WEST = ["Alberta", "British Columbia", "Manitoba", "Saskatchewan", "Northwest Territories", "Yukon", "Nunavut"];
  //   if (EAST.includes(province)) return "east";
  //   if (WEST.includes(province)) return "west";
  //   return null;
  // };

  const handleSubmit = async () => {
    // const location = resolveLocationFromProvince(formData.shippingProvince);
    // if (!location) {
    //   Swal.fire({ icon: "error", title: "Location not supported", text: "We currently deliver only in East or West Canada" });
    //   return;
    // }

    try {
      const res = await API.get(`/inventory/available-products?scope=global`);
      const availableProducts = res.data.products || [];
      for (const item of cartItems) {
        const productKey = item.productId || item.id;
        const found = availableProducts.find((p) => String(p._id) === String(productKey));
        if (!found) {
          await Swal.fire({ icon: "warning", title: `${item.name} is Out of Stock`, text: `This item is not available in the ${location.toUpperCase()} warehouse.` });
          return;
        }
        if (Number(found.availableQty || 0) < item.quantity) {
          await Swal.fire({ icon: "warning", title: `Only ${found.availableQty} left`, text: `Reduce quantity of ${item.name} to continue.` });
          return;
        }
      }
    } catch (err) {
      Swal.fire({ icon: "error", title: "Stock check failed", text: "Please try again." });
      return;
    }

    // NEW: flat rate, no service type saved (admin picks when creating shipment)
    const orderSummary = {
      userId: userId || null,
      isGuest: !userId,
      email: formData.email,
      phone: formData.phone,
      // location,
      cartItems: cartItems.map((item) => ({
        productId: item.productId || item.id,
        name: item.name,
        image: item.image,
        price: item.price,
        categoryId: item.cat_id,
        catName: item.cat_sec,
        subCategoryName: item.subCategoryName,
        quantity: item.quantity,
        product_size: item.selectedSize || [],
        product_color: item.selectedColor ? [item.selectedColor] : [],
        lens: item.lens || null,
        policy: item.policy || null,
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
        ? { fullName: formData.shippingName, address: formData.billingStreet, city: formData.billingCity, province: formData.billingProvince, postalCode: formData.billingPostal, country: "Canada", phone: formData.phone }
        : { fullName: formData.shippingName, address: formData.shippingStreet, city: formData.shippingCity, province: formData.shippingProvince, postalCode: formData.shippingPostal, country: "Canada", phone: formData.phone },
      subtotal,
      tax,
      shipping,
      total,
      shippingServiceType: null,
      shippingServiceName: "Standard Shipping",
      expectedDeliveryDate: deliveryEstimate?.min || null,
      paymentMethod: "Stripe",
      paymentStatus: "Pending",
      orderStatus: "Payment Pending",
    };
    // ────────────────────────────────────────────────────────────────────────

    localStorage.setItem("orderSummary", JSON.stringify(orderSummary));
    navigate("/payment");
  };

  useEffect(() => {
    if (!cartItems.length) navigate("/cart");
  }, [cartItems]);

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Progress Bar — UNCHANGED */}
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
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${idx <= currentStep ? "bg-[#f00000] text-white border-red-600" : "border-black text-black group-hover:bg-black group-hover:text-white"}`}>
                  {idx + 1}
                </div>
                <span className={`mt-2 text-sm ${idx === currentStep ? "text-[#f00000] font-bold" : "text-gray-700"}`}>
                  {step}
                </span>
              </button>
              {idx < steps.length - 1 && (
                <div className={`flex-1 h-2 rounded-sm transition-colors ${idx < currentStep ? "bg-[#f00000]" : "bg-gray-300"}`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Step 0: Contact — UNCHANGED */}
      {currentStep === 0 && (
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <input
              type="email"
              placeholder="example@email.com"
              value={formData.email || ""}
              onChange={(e) => handleChange("email", e.target.value)}
              className={`border p-2 rounded w-full ${formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) ? "border-red-500" : "border-black"}`}
              required
            />
            {formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) && (
              <p className="text-[#f00000] text-sm mt-1">Invalid email address</p>
            )}
          </div>
          <div className="col-span-2">
            <input
              type="tel"
              placeholder="416 123 4567"
              value={formData.phone || ""}
              onChange={(e) => handleChange("phone", e.target.value)}
              className={`border p-2 rounded w-full ${formData.phone && !/^(\+1\s?)?\d{3}[\s.-]?\d{3}[\s.-]?\d{4}$/.test(formData.phone) ? "border-red-500" : "border-black"}`}
              required
            />
            {formData.phone && !/^(\+1\s?)?\d{3}[\s.-]?\d{3}[\s.-]?\d{4}$/.test(formData.phone) && (
              <p className="text-[#f00000] text-sm mt-1">Invalid phone number. Use 416 123 4567 format.</p>
            )}
          </div>
        </div>
      )}

      {/* Step 1: Shipping — CHANGED */}
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

          <div className="flex flex-col">
            <input
              type="text"
              placeholder="Postal Code"
              value={formData.shippingPostal || ""}
              onChange={(e) => {
                const val = e.target.value.toUpperCase();
                handleChange("shippingPostal", val);
                setPostalCodeError("");
                setDeliveryEstimate(null);
                // ────────────────────────────────────────────────────────────
              }}
              onBlur={(e) => validatePostalCode(e.target.value)}
              className={`border p-2 rounded w-full ${(formData.shippingPostal && !/^[A-Za-z]\d[A-Za-z] ?\d[A-Za-z]\d$/.test(formData.shippingPostal)) || postalCodeError ? "border-red-500" : "border-black"}`}
              required
            />
            {formData.shippingPostal && !/^[A-Za-z]\d[A-Za-z] ?\d[A-Za-z]\d$/.test(formData.shippingPostal) && (
              <p className="text-[#f00000] text-sm mt-1">Invalid postal code. Example: A1A 1A1</p>
            )}
            {postalCodeError && <p className="text-[#f00000] text-sm mt-1">{postalCodeError}</p>}
          </div>

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
          </select>

          {/* ── CHANGED: replaced Loomis service cards with single flat-rate row ── */}
          <div className="col-span-2">
            <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <span className="text-xl">🚚</span>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">Standard Shipping</p>

                    {/* loading state */}
                    {estimateLoading && (
                      <p className="text-xs text-gray-400 animate-pulse mt-0.5">
                        Calculating delivery date...
                      </p>
                    )}

                    {/* delivery estimate */}
                    {!estimateLoading && deliveryEstimate?.min && (
                      <p className="text-xs text-green-700 font-medium mt-0.5">
                        Estimated delivery: {deliveryEstimate.min}
                        {deliveryEstimate.max ? ` – ${deliveryEstimate.max}` : ""}
                      </p>
                    )}

                    {/* waiting for postal code */}
                    {!estimateLoading && !deliveryEstimate && (
                      <p className="text-xs text-gray-400 mt-0.5">
                        Enter postal code to see estimated delivery
                      </p>
                    )}
                  </div>
                </div>

                {/* price */}
                <div className="text-right">
                  {subtotal > 200 ? (
                    <span className="text-green-600 font-bold text-sm">FREE</span>
                  ) : (
                    <span className="font-bold text-sm text-gray-800">
                      ${FLAT_RATE_SHIPPING.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Billing — UNCHANGED */}
      {currentStep === 2 && (
        <div>
          <label className="flex items-center mb-2">
            <input type="checkbox" checked={billingDifferent} onChange={(e) => setBillingDifferent(e.target.checked)} className="mr-2" />
            Billing address is different from shipping
          </label>
          {billingDifferent && (
            <div className="grid grid-cols-2 gap-4 mt-4">
              <input type="text" placeholder="Street" value={formData.billingStreet || ""} onChange={(e) => handleChange("billingStreet", e.target.value)} className="border border-black p-2 rounded w-full col-span-2" required />
              <input type="text" placeholder="City" value={formData.billingCity || ""} onChange={(e) => handleChange("billingCity", e.target.value)} className="border border-black p-2 rounded w-full" required />
              <div>
                <input
                  type="text"
                  placeholder="Postal Code"
                  value={formData.billingPostal || ""}
                  onChange={(e) => handleChange("billingPostal", e.target.value.toUpperCase())}
                  className={`border p-2 rounded w-full ${formData.billingPostal && !/^[A-Za-z]\d[A-Za-z] ?\d[A-Za-z]\d$/.test(formData.billingPostal) ? "border-red-500" : "border-black"}`}
                  required
                />
                {formData.billingPostal && !/^[A-Za-z]\d[A-Za-z] ?\d[A-Za-z]\d$/.test(formData.billingPostal) && (
                  <p className="text-[#f00000] text-sm mt-1">Invalid postal code. Example: A1A 1A1</p>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Step 3: Review & Pay — CHANGED in Billing Details section */}
      {currentStep === 3 && (
        <div className="border-2 border-black rounded-xl shadow-lg bg-white p-6 space-y-6">
          <div>
            <h2 className="font-bold text-xl mb-4 text-[#f00000] border-b border-black pb-2">Billing Details</h2>
            <p><strong>Email:</strong> {formData.email}</p>
            <p><strong>Phone:</strong> {formData.phone}</p>
            <p><strong>Shipping Address:</strong> {formData.shippingStreet}, {formData.shippingCity} {formData.shippingPostal}</p>
            <p><strong>Province:</strong> {formData.shippingProvince}</p>
            <p><strong>Shipping:</strong> Standard Shipping</p>
            {deliveryEstimate?.min && (
              <p>
                <strong>Estimated Delivery:</strong>{" "}
                <span className="text-green-700 font-medium">
                  {deliveryEstimate.min}
                  {deliveryEstimate.max ? ` – ${deliveryEstimate.max}` : ""}
                </span>
              </p>
            )}
            {/* ────────────────────────────────────────────────────────────── */}

            {billingDifferent && (
              <p><strong>Billing:</strong> {formData.billingStreet}, {formData.billingCity} {formData.billingPostal}</p>
            )}
          </div>

          {/* Order Summary — UNCHANGED */}
          <div className="w-full ml-auto bg-white shadow-lg border border-gray-200 rounded-xl p-6 overflow-hidden">
            <h2 className="font-bold text-xl mb-4 text-[#f00000] border-b border-gray-300 pb-2">Your Order</h2>
            {cartItems.map((item, index) => (
              <div key={index} className="flex flex-col sm:flex-row sm:justify-between sm:items-start pb-3 border-b border-dashed border-gray-300 gap-3 sm:gap-0">
                <div className="flex items-start w-full sm:w-auto">
                  <img src={item.image} alt={item.name} className="w-24 h-24 sm:w-50 sm:h-24 object-cover rounded mr-4 flex-shrink-0" loading="lazy" />
                  <div className="flex-1">
                    <h4 className="text-gray-800 font-semibold flex items-center">
                      {item.name}<span className="text-sm text-gray-500 ml-2">x {item.quantity}</span>
                    </h4>
                    {item.selectedSize?.length > 0 && <p className="text-gray-600 text-sm">Size: {item.selectedSize}</p>}
                    {item.selectedColor?.length > 0 && (
                      <p className="text-gray-600 text-sm flex items-center">
                        Color:
                        <span style={{ backgroundColor: item.selectedColor, width: "15px", height: "15px", display: "inline-block", borderRadius: "50%", margin: "0 5px" }} />
                        {item.selectedColor}
                      </p>
                    )}
                    {item.policy?.active && <p className="text-gray-600 text-sm mt-1">Policy: {item.policy.name} (${(item.policy.price || 0).toFixed(2)})</p>}
                    {item.lens?.totalPrice != null && item.cat_id !== "6915735feeb23fa59c7d532b" && (
                      <p className="text-gray-600 text-sm">Lens: ${(item.lens.totalPrice || 0).toFixed(2)}</p>
                    )}
                    <p className="text-gray-800 font-bold mt-1">
                      {item.cat_id === "6915735feeb23fa59c7d532b" ? "Contact Lens" : "Frame"} ${(item.price || 0).toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="w-full sm:w-auto text-right mt-2 sm:mt-8">
                  {item.cat_id === "6915735feeb23fa59c7d532b" ? (
                    <p className="text-gray-800 font-bold">${(((item.price || 0) + (item.policy?.price || 0)) * (item.quantity || 1)).toFixed(2)}</p>
                  ) : (
                    <p className="text-gray-800 font-bold">${(((item.price || 0) + (item.lens?.totalPrice || 0) + (item.policy?.price || 0)) * (item.quantity || 1)).toFixed(2)}</p>
                  )}
                </div>
              </div>
            ))}
            <div className="mt-4 space-y-2 text-gray-700">
              <div className="flex justify-between"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between"><span>Tax ({(taxRate * 100).toFixed(0)}%)</span><span>${tax.toFixed(2)}</span></div>
              <div className="border-t pt-2 flex justify-between font-bold text-[#f00000] text-lg">
                <span>Total</span><span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Consents — UNCHANGED */}
          <div>
            <h2 className="font-bold text-xl mb-4 text-[#f00000] border-b border-black pb-2">Consents</h2>
            <label className="flex items-center mb-3 font-semibold">
              <input type="checkbox" checked={!!(formData.terms && formData.warranty && formData.privacy)} onChange={(e) => handleSelectAll(e.target.checked)} className="mr-2" />
              I agree to all policies
            </label>
            <label className="flex items-center mb-2">
              <input type="checkbox" checked={formData.terms || false} onChange={(e) => handleChange("terms", e.target.checked)} className="mr-2" />
              I agree to <Link to="/terms&Conditions" className="text-blue-600 underline ml-1">Terms & Conditions</Link>
            </label>
            <label className="flex items-center mb-2">
              <input type="checkbox" checked={formData.warranty || false} onChange={(e) => handleChange("warranty", e.target.checked)} className="mr-2" />
              I agree to <Link to="/return-exchange" className="text-blue-600 underline ml-1">Warranty / Return Policy</Link>
            </label>
            <label className="flex items-center mb-2">
              <input type="checkbox" checked={formData.privacy || false} onChange={(e) => handleChange("privacy", e.target.checked)} className="mr-2" />
              I agree to <Link to="/privacy-policy" className="text-blue-600 underline ml-1">Privacy Policy</Link>
            </label>
          </div>
        </div>
      )}

      {/* Navigation — UNCHANGED */}
      <div className="flex justify-between mt-6">
        {currentStep > 0 && (
          <button onClick={prevStep} className="px-4 py-2 rounded bg-black text-white hover:bg-gray-800 hover:cursor-pointer">
            Previous
          </button>
        )}
        {currentStep < steps.length - 1 && (
          <button onClick={nextStep} className="px-4 py-2 rounded bg-[#f00000] text-white hover:bg-red-700 hover:cursor-pointer">
            Next
          </button>
        )}
        {currentStep === steps.length - 1 && (
          <button onClick={handleSubmit} disabled={!validateStep()} className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 hover:cursor-pointer">
            Proceed to Payment
          </button>
        )}
      </div>
    </div>
  );
};

export default Checkout;