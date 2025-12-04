// SendCouponToFriendPage.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import ReferImg from "../assets/refer/refer.avif";
import API from "../API/Api";

export default function ReferCoupon() {
  const [friendName, setFriendName] = useState("");
  const [friendEmail, setFriendEmail] = useState("");
  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [message, setMessage] = useState("");
  const [couponCode] = useState("ATAL20");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!friendEmail.trim()) {
      setError("Please enter your friend's email.");
      return;
    }
    if (!validateEmail(friendEmail)) {
      setError("Please enter a valid friend's email address.");
      return;
    }

    setLoading(true);
    try {
      await API.post("/save-discount-email", {
        email: friendEmail,
        discountCode: couponCode,
      });

      setSuccess(true);
      // Clear UX fields but keep coupon visible
      setFriendName("");
      setFriendEmail("");
      setMessage("");
    } catch (err) {
      console.error("Send coupon error:", err);
      // Try to surf for an error message returned by API
      const msg = err?.response?.data?.message || "Could not send coupon. Please try again later.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFriendName("");
    setFriendEmail("");
    setSenderName("");
    setSenderEmail("");
    setMessage("");
    setError("");
    setSuccess(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-12">
      <div className="max-w-6xl w-full bg-white rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left: Image / Illustration */}
        <div className="hidden md:block">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="h-full"
          >
            <img src={ReferImg} alt="Gift visual" className="w-full h-full object-contain" />
          </motion.div>
        </div>

        {/* Right: Form */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <motion.div
            initial={{ y: 8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.45 }}
            className="max-w-xl mx-auto"
          >
            <div className="mb-4">
              <h1 className="text-3xl font-extrabold tracking-tight text-[#f00000]">
                Send a 20% Coupon to a Friend
              </h1>
              <p className="text-gray-600 mt-2">
                Share the love — enter your friend's email and we'll send them the coupon code instantly.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div>
                <label className="block text-sm font-medium text-gray-700">Friend’s name</label>
                <input
                  value={friendName}
                  onChange={(e) => setFriendName(e.target.value)}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm p-3 focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="Name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Friend’s email <span className="text-red-500">*</span></label>
                <input
                  type="email"
                  value={friendEmail}
                  onChange={(e) => setFriendEmail(e.target.value)}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm p-3 focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="friend@example.com"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Your name (optional)</label>
                  <input
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm p-3 focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="From who?"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Your email (optional)</label>
                  <input
                    type="email"
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm p-3 focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              {error && <p className="text-sm text-red-600">{error}</p>}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 disabled:opacity-60"
                >
                  {loading ? "Sending..." : "Send Coupon"}
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full border border-gray-300 py-3 rounded-lg hover:bg-gray-100"
                >
                  Reset
                </button>
              </div>
            </form>

            {success && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 border-l-4 border-green-500 bg-green-50 rounded-md"
              >
                <p className="text-green-800 font-medium">Coupon sent successfully!</p>
                <p className="text-sm text-gray-700 mt-1">Your friend should receive the email shortly.</p>
              </motion.div>
            )}

            <p className="text-xs text-gray-400 mt-6">
              By sending this coupon you agree to our terms and to only send to recipients who’ve opted in to receive emails.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
