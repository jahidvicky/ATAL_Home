import React, { useEffect, useState } from "react";
import API from "../../API/Api";
import Swal from "sweetalert2";

const ContactPage = () => {
  const [showVendor, setShowVendor] = useState(false);
  const [showCompany, setShowCompany] = useState(false);
  const [customer, setCustomer] = useState([]);
  const [loading, setLoading] = useState(false);
  const [document, setDocument] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    userType: "",
    businessNumber: "",
    registrationNumber: "",
    vendorType: "",
    message: "",
    uploadDocument: null,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const sendInquiry = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const form = new FormData();

      form.append("name", formData.name || "");
      form.append("email", formData.email || "");
      form.append("userType", formData.userType || "");
      form.append("businessNumber", formData.businessNumber || "");
      form.append("registrationNumber", formData.registrationNumber || "");
      form.append("vendorType", formData.vendorType || "");
      form.append("message", formData.message || "");

      if (document) {
        form.append("uploadDocument", document);
      }

      await API.post("/addInquiry", form);

      Swal.fire({
        icon: "success",
        title: "Inquiry Submitted Successfully",
        text: "Your inquiry has been sent to the admin.",
        showConfirmButton: false,
        timer: 2000,
        position: "top-end",
        toast: true,
      });

      setFormData({
        name: "",
        email: "",
        userType: "",
        businessNumber: "",
        registrationNumber: "",
        vendorType: "",
        message: "",
        uploadDocument: null,
      });
      setDocument(null);
      setShowVendor(false);
      setShowCompany(false);
    } catch (error) {
      console.error("Error submitting inquiry:", error);

      if (error?.response?.status === 409) {
        Swal.fire({
          icon: "warning",
          title: "Duplicate Found",
          text: error.response.data?.message || "Duplicate inquiry detected.",
          showConfirmButton: true,
          position: "top-end",
          toast: true,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to submit inquiry",
          text: "Something went wrong. Please try again later or Check File type.",
          showConfirmButton: false,
          timer: 2000,
          position: "top-end",
          toast: true,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const getCustomer = async (id) => {
    try {
      const res = await API.get(`/customer/${id}`);
      setCustomer(res.data.data);
    } catch (error) {
      console.error("Failed to fetch customer:", error);
    }
  };

  useEffect(() => {
    const id = localStorage.getItem("user");
    if (id) {
      getCustomer(id);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center py-12 px-4 bg-white">
      <h1 className="text-4xl font-bold text-[#f00000] mb-12">Contact Us</h1>

      <div className="w-full max-w-4xl bg-white border border-red-500 rounded-lg">
        <div className="mt-5 p-8">
          <h2 className="text-2xl font-semibold text-[#f00000] mb-4">
            Atal Optical
          </h2>

          <div className="bg-white border border-red-500 rounded-md p-6 text-black shadow-md">
            <p className="mb-4 text-gray-700">
              Your trusted destination for premium sunglasses & eyewear. Visit
              us or get in touch using the details below.
            </p>

            <ul className="space-y-3">
              <li>
                <span className="font-semibold text-[#f00000]">
                  Store Address:
                </span>{" "}
                Atal Optical, 45 Fashion Street, Toronto, ON M5V 2B6, Canada
              </li>
              <li>
                <span className="font-semibold text-[#f00000]">Phone:</span> +1
                5698765 43210
              </li>
              <li>
                <span className="font-semibold text-[#f00000]">Email:</span>{" "}
                sales.ataloptical@gmail.com, info.ataloptical@gmail.com
              </li>
              <li>
                <span className="font-semibold text-[#f00000]">Store Hours:</span>{" "}
                Mon - Sat, 10:00 AM - 8:00 PM
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-t-2 border-black w-full" />

        {/* Vendor Section */}
        <div className="mt-5 p-8">
          <h2 className="text-2xl font-semibold text-[#f00000] mb-4">
            Become A Vendor
          </h2>
          <p className="text-black mb-4">
            Join our network of trusted vendors. Partner with us to supply
            quality products and services.
          </p>

          <button
            onClick={() => {
              setFormData((prev) => ({ ...prev, userType: "vendor" }));
              setShowVendor(true);
            }}
            className="bg-[#f00000] hover:bg-black hover:text-[#f00000] text-white font-semibold py-2 px-4 rounded-md w-full hover:cursor-pointer"
          >
            Click Here
          </button>
        </div>

        <hr className="border-t-2 border-black w-full" />

        {/* Company Section */}
        <div className="mt-5 p-8">
          <h2 className="text-2xl font-semibold text-[#f00000] mb-4">
            Become A Insurance Company
          </h2>
          <p className="text-black mb-4">
            Collaborate with us as an insurance company. Work together to
            provide innovative solutions.
          </p>

          <button
            onClick={() => {
              setFormData((prev) => ({ ...prev, userType: "company" }));
              setShowCompany(true);
            }}
            className="bg-[#f00000] hover:bg-black hover:text-red-500 text-white font-semibold py-2 px-4 rounded-md w-full hover:cursor-pointer"
          >
            Click Here
          </button>
        </div>
      </div>

      {/* Vendor Modal */}
      {showVendor && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
            <h2 className="text-xl font-semibold text-[#f00000] mb-4">
              Vendor Inquiry
            </h2>

            <form onSubmit={sendInquiry} className="space-y-4">
              <input type="hidden" name="userType" value={formData.userType} />
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                placeholder="Name"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                placeholder="Email"
                required
              />
              <input
                name="businessNumber"
                value={formData.businessNumber}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                placeholder="Business Number"
              />

              {/* Vendor Type Dropdown */}
              <select
                name="vendorType"
                value={formData.vendorType}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              >
                <option value="">Select Vendor Type</option>
                <option value="lab">Lab</option>
                <option value="brand">Brand</option>
                <option value="supplier">Supplier</option>
              </select>

              <input
                type="file"
                name="uploadDocument"
                accept=".pdf"
                onChange={(e) => setDocument(e.target.files[0])}
                className="w-full border border-gray-300 rounded-md p-2 mb-3"
                required
              />

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                placeholder="Message"
              ></textarea>

              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  onClick={() => setShowVendor(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 bg-[#f00000] text-white rounded hover:bg-red-700 hover:cursor-pointer"
                >
                  Submit
                </button>
              </div>
            </form>

            {/* Overlay Loader */}
            {loading && (
              <div className="absolute inset-0 bg-white/70 flex items-center justify-center rounded-lg">
                <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Company Modal */}
      {showCompany && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
            <h2 className="text-xl font-semibold text-[#f00000] mb-4">
              Company Inquiry
            </h2>

            <form onSubmit={sendInquiry} className="space-y-4">
              <input type="hidden" name="userType" value={formData.userType} />
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                placeholder="Name"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                placeholder="Email"
                required
              />
              <input
                name="registrationNumber"
                value={formData.registrationNumber}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                placeholder="Registration Number"
              />
              <input
                type="file"
                name="uploadDocument"
                accept=".pdf"
                onChange={(e) => setDocument(e.target.files[0])}
                className="w-full border border-gray-300 rounded-md p-2 mb-3"
                required
              />

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                placeholder="Message"
              ></textarea>

              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  onClick={() => setShowCompany(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#f00000] text-white rounded hover:bg-red-700 hover:cursor-pointer"
                >
                  Submit
                </button>
              </div>
            </form>

            {/* Overlay Loader */}
            {loading && (
              <div className="absolute inset-0 bg-white/70 flex items-center justify-center rounded-lg">
                <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactPage;
