import React, { useState, useEffect } from "react";
import API, { IMAGE_URL } from "../../API/Api";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";

const InsuranceClaim = () => {
  const [description, setDescription] = useState("");
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [existingClaim, setExistingClaim] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null); // selected product
  const navigate = useNavigate();
  const location = useLocation();
  const { order } = location.state || {};

  //  Fetch existing claim
  useEffect(() => {
    const fetchClaimStatus = async () => {
      try {
        const res = await API.get("/getClaimByOrder", {
          params: { orderId: order._id, userId: order.userId },
        });
        if (res.data?.claim) setExistingClaim(res.data.claim);
      } catch (err) {
        console.log("No existing claim or error:", err.message);
      }
    };
    if (order) fetchClaimStatus();
  }, [order]);

  //  Submit new claim
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedProduct) {
      Swal.fire("Error", "Please select a product for the claim", "error");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("orderId", order._id);
    formData.append("userId", order.userId);
    formData.append("productId", selectedProduct._id);

    //  Include product details as JSON string
    formData.append(
      "productDetails",
      JSON.stringify({
        name: selectedProduct.name,
        price: selectedProduct.price,
        color: selectedProduct.product_color,
        size: selectedProduct.product_size,
        quantity: selectedProduct.quantity,
        image: selectedProduct.image,
        policy: selectedProduct.policy,
        lens: selectedProduct.lens,
        thickness: selectedProduct.thickness,
      })
    );

    formData.append("description", description);
    Array.from(photos).forEach((photo) => formData.append("photos", photo));

    try {
      const res = await API.post("/submitClaim", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      Swal.fire("Success", "Claim submitted successfully", "success");
      setExistingClaim(res.data.claim);
    } catch (err) {
      Swal.fire("Error", "Failed to submit claim", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => navigate("/order-history");

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center py-10">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl border border-gray-200 p-8">
        {/*  Back Button */}
        <div className="flex justify-start mb-6">
          <button
            onClick={handleBack}
            className="bg-gray-800 text-white font-semibold px-5 py-2 rounded-lg hover:bg-gray-900 transition-all hover:cursor-pointer"
          >
            ← Back
          </button>
        </div>

        {/*  If Claim Exists */}
        {existingClaim ? (
          <>
            <h2 className="text-3xl font-bold text-center text-black mb-6">
              Claim Details
            </h2>

            <div className="space-y-4 text-gray-800">
              <p>
                <strong>Order ID:</strong> {existingClaim.orderId}
              </p>
              <p>
                <strong>Product:</strong>{" "}
                {existingClaim.productDetails?.name || "N/A"}
              </p>
              <p>
                <strong>Claim Date:</strong>{" "}
                {new Date(existingClaim.createdAt).toLocaleDateString()}
              </p>
              {existingClaim.description && (
                <p>
                  <strong>Description:</strong> {existingClaim.description}
                </p>
              )}
              {existingClaim.claimAmount && (
                <p>
                  <strong>Claim Amount:</strong> ₹{existingClaim.claimAmount}
                </p>
              )}
              {existingClaim.notes && (
                <p>
                  <strong>Notes:</strong> {existingClaim.notes}
                </p>
              )}
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`px-3 py-1 rounded text-white font-semibold ${
                    existingClaim.status === "Approved"
                      ? "bg-green-600"
                      : existingClaim.status === "Rejected"
                      ? "bg-red-600"
                      : "bg-yellow-500"
                  }`}
                >
                  {existingClaim.status}
                </span>
              </p>
              {existingClaim.rejectionReason && (
                <p>
                  <strong>Reason:</strong> {existingClaim.rejectionReason}
                </p>
              )}

              {/*  Uploaded Photos */}
              {existingClaim.photos?.length > 0 && (
                <div>
                  <strong>Uploaded Photos:</strong>
                  <div className="flex gap-3 mt-2 overflow-x-auto">
                    {existingClaim.photos.map((photo, idx) => (
                      <img
                        key={idx}
                        src={`${IMAGE_URL}/${photo}`}
                        alt={`Claim ${idx}`}
                        className="w-32 h-24 object-cover rounded-lg border border-gray-300 hover:scale-105 transition-transform"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            {/*  Claim Form */}
            <h2 className="text-3xl font-bold text-center text-red-600 mb-6">
              Submit Insurance Claim
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Product Selection */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Select Product
                </label>
                <select
                  value={selectedProduct?._id || ""}
                  onChange={(e) => {
                    const product = order.cartItems.find(
                      (item) => item._id === e.target.value
                    );
                    setSelectedProduct(product);
                  }}
                  required
                  className="border border-gray-300 p-2 w-full rounded focus:ring-2 focus:ring-red-500 focus:outline-none"
                >
                  <option value="">-- Select Product --</option>
                  {order.cartItems.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.name} (₹{item.price})
                    </option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Claim Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  placeholder="Describe the incident in detail..."
                  className="border border-gray-300 p-3 w-full rounded-lg h-28 resize-none focus:ring-2 focus:ring-red-500 focus:outline-none"
                ></textarea>
              </div>

              {/* Upload Photos */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Upload Photos (optional)
                </label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => setPhotos(e.target.files)}
                  className="border border-gray-300 p-2 w-full rounded focus:ring-2 focus:ring-red-500 focus:outline-none"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 text-white text-lg font-semibold rounded-lg transition-all hover:cursor-pointer ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-red-600 hover:bg-black"
                }`}
              >
                {loading ? "Submitting..." : "Submit Claim"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default InsuranceClaim;
