import React, { useEffect, useState } from "react";
import API from "../../API/Api";
import Swal from "sweetalert2";

/* ── Validators ─────────────────────────────────────────────── */
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validate = (formData, uploadFile, userType) => {
  const errs = {};
  if (!formData.name.trim()) errs.name = "Name is required.";
  if (!formData.email.trim()) errs.email = "Email is required.";
  else if (!emailRegex.test(formData.email)) errs.email = "Enter a valid email.";
  if (userType === "vendor" && !formData.vendorType) errs.vendorType = "Select a vendor type.";
  if (!uploadFile) errs.file = "Please upload a PDF document.";
  return errs;
};

/* ── Initial form state ──────────────────────────────────────── */
const blankForm = {
  name: "",
  email: "",
  businessNumber: "",
  registrationNumber: "",
  vendorType: "",
  message: "",
};

/* ── Shared Modal Component ──────────────────────────────────── */
function InquiryModal({ userType, onClose }) {
  const [formData, setFormData] = useState(blankForm);
  const [uploadFile, setUploadFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const isVendor = userType === "vendor";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadFile(file);
      setFileName(file.name);
      setErrors((prev) => ({ ...prev, file: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errs = validate(formData, uploadFile, userType);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setLoading(true);
    try {
      const form = new FormData();
      form.append("name", formData.name);
      form.append("email", formData.email);
      form.append("userType", userType);
      form.append("businessNumber", formData.businessNumber);
      form.append("registrationNumber", formData.registrationNumber);
      form.append("vendorType", formData.vendorType);
      form.append("message", formData.message);
      form.append("uploadDocument", uploadFile);

      await API.post("/addInquiry", form);

      Swal.fire({
        icon: "success",
        title: "Inquiry Submitted!",
        text: "Your inquiry has been sent. We'll be in touch shortly.",
        showConfirmButton: false,
        timer: 2500,
        position: "top-end",
        toast: true,
      });
      onClose();
    } catch (error) {
      const is409 = error?.response?.status === 409;
      Swal.fire({
        icon: is409 ? "warning" : "error",
        title: is409 ? "Already Submitted" : "Submission Failed",
        text: error?.response?.data?.message ||
          (is409 ? "A duplicate inquiry was detected."
            : "Something went wrong. Please try again."),
        showConfirmButton: is409,
        timer: is409 ? undefined : 2500,
        position: "top-end",
        toast: true,
      });
    } finally {
      setLoading(false);
    }
  };

  /* Close on backdrop click */
  const handleBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  /* ── Input helper ── */
  const inputCls = (name) =>
    `w-full border rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 ${errors[name] ? "border-red-500" : "border-gray-300"
    }`;

  const Err = ({ name }) =>
    errors[name] ? <p className="mt-1 text-xs text-red-600">{errors[name]}</p> : null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50"
      onClick={handleBackdrop}
    >
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative mx-4 max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-semibold text-[#f00000]">
            {isVendor ? "Vendor Inquiry" : "Insurance Company Inquiry"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition text-xl leading-none"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full name"
              className={inputCls("name")}
            />
            <Err name="name" />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className={inputCls("email")}
            />
            <Err name="email" />
          </div>

          {/* Vendor-specific fields */}
          {isVendor ? (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Business Number
                </label>
                <input
                  name="businessNumber"
                  value={formData.businessNumber}
                  onChange={handleChange}
                  placeholder="Business registration / tax number"
                  className={inputCls("businessNumber")}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Vendor Type <span className="text-red-500">*</span>
                </label>
                <select
                  name="vendorType"
                  value={formData.vendorType}
                  onChange={handleChange}
                  className={inputCls("vendorType")}
                >
                  <option value="">Select vendor type</option>
                  <option value="lab">Lab</option>
                  <option value="brand">Brand</option>
                  <option value="supplier">Supplier</option>
                </select>
                <Err name="vendorType" />
              </div>
            </>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Registration Number
              </label>
              <input
                name="registrationNumber"
                value={formData.registrationNumber}
                onChange={handleChange}
                placeholder="Company registration number"
                className={inputCls("registrationNumber")}
              />
            </div>
          )}

          {/* File upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload Document (PDF) <span className="text-red-500">*</span>
            </label>
            <label
              className={`flex items-center gap-3 cursor-pointer border rounded-lg p-2.5 hover:border-red-400 transition ${errors.file ? "border-red-500" : "border-gray-300"
                }`}
            >
              <span className="bg-[#f00000] text-white text-xs font-semibold px-3 py-1.5 rounded-md whitespace-nowrap">
                Choose File
              </span>
              <span className="text-sm text-gray-400 truncate">
                {fileName || "No file chosen"}
              </span>
              <input
                type="file"
                accept=".pdf"
                onChange={handleFile}
                className="hidden"
              />
            </label>
            {fileName && (
              <p className="mt-1 text-xs text-green-600 truncate">
                ✓ {fileName}
              </p>
            )}
            <Err name="file" />
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={3}
              placeholder="Any additional information..."
              className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-between pt-2 gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2.5 bg-[#f00000] hover:bg-red-700 text-white rounded-lg text-sm font-semibold transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Submitting..." : "Submit Inquiry"}
            </button>
          </div>
        </form>

        {/* Overlay spinner */}
        {loading && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center rounded-xl">
            <div className="w-10 h-10 border-4 border-[#f00000] border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Main Page ───────────────────────────────────────────────── */
const ContactPage = () => {
  const [modal, setModal] = useState(null);

  return (
    <div className="min-h-screen flex flex-col items-center py-12 px-4 bg-white">
      <h1 className="text-4xl font-bold text-[#f00000] mb-12">Contact Us</h1>

      <div className="w-full max-w-4xl bg-white border border-red-500 rounded-lg">

        {/* ── Store Info ── */}
        <div className="mt-5 p-8">
          <h2 className="text-2xl font-semibold text-[#f00000] mb-4">Atal Optical</h2>
          <div className="bg-white border border-red-500 rounded-md p-6 text-black shadow-md">
            <p className="mb-4 text-gray-700">
              Your trusted destination for premium sunglasses &amp; eyewear. Visit
              us or get in touch using the details below.
            </p>
            <ul className="space-y-3 text-sm">
              <li>
                <span className="font-semibold text-[#f00000]">Store Address: </span>
                Corporate Office: 34 Shining Willow Crescent, Brampton, ON L6P 2A2, Canada
              </li>
              <li>
                <span className="font-semibold text-[#f00000]">Phone: </span>
                +1 1866-242-3545
              </li>
              <li>
                <span className="font-semibold text-[#f00000]">Email: </span>
                sales.ataloptical@gmail.com, info.ataloptical@gmail.com
              </li>
              <li>
                <span className="font-semibold text-[#f00000]">Store Hours: </span>
                Mon – Sat, 10:00 AM – 6:00 PM
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-t-2 border-black w-full" />

        {/* ── Vendor ── */}
        <div className="mt-5 p-8">
          <h2 className="text-2xl font-semibold text-[#f00000] mb-4">Become A Vendor</h2>
          <p className="text-gray-700 mb-4 text-sm">
            Join our network of trusted vendors. Partner with us to supply quality
            products and services.
          </p>
          <button
            onClick={() => setModal("vendor")}
            className="bg-[#f00000] hover:bg-black text-white hover:text-[#f00000] font-semibold py-2 px-4 rounded-md w-full transition-colors duration-200 cursor-pointer"
          >
            Click Here
          </button>
        </div>

        <hr className="border-t-2 border-black w-full" />

        {/* ── Insurance Company ── */}
        <div className="mt-5 p-8">
          <h2 className="text-2xl font-semibold text-[#f00000] mb-4">
            Become An Insurance Company
          </h2>
          <p className="text-gray-700 mb-4 text-sm">
            Collaborate with us as an insurance company. Work together to provide
            innovative solutions.
          </p>
          <button
            onClick={() => setModal("company")}
            className="bg-[#f00000] hover:bg-black text-white hover:text-red-500 font-semibold py-2 px-4 rounded-md w-full transition-colors duration-200 cursor-pointer"
          >
            Click Here
          </button>
        </div>
      </div>

      {/* ── Modal ── */}
      {modal && (
        <InquiryModal
          userType={modal}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  );
};

export default ContactPage;