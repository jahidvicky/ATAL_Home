import React, { useState, useEffect } from "react";
import API, { IMAGE_URL } from "../../API/Api";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";

const InsuranceClaim = () => {
    const [incidentDate, setIncidentDate] = useState("");
    const [description, setDescription] = useState("");
    const [deductibleAmount, setDeductibleAmount] = useState("");
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [existingClaim, setExistingClaim] = useState(null);

    const location = useLocation();
    const { order } = location.state;

    // Check if claim already exists for this order
    useEffect(() => {
        const fetchClaimStatus = async () => {
            try {
                const res = await API.get("/getClaimByOrder", {
                    params: { orderId: order._id, userId: order.userId },
                });

                if (res.data?.claim) {
                    setExistingClaim(res.data.claim);
                }
            } catch (err) {
                console.log("No existing claim or error:", err.message);
            }
        };

        fetchClaimStatus();
    }, [order]);

    // Submit new claim
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append("orderId", order._id);
        formData.append("userId", order.userId);
        formData.append("incidentDate", incidentDate);
        formData.append("description", description);
        formData.append("deductibleAmount", deductibleAmount);

        Array.from(photos).forEach((photo) => {
            formData.append("photos", photo);
        });

        try {
            const res = await API.post("/submitClaim", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            Swal.fire("Success", "Claim submitted successfully", "success");
            setExistingClaim(res.data.claim); // Update UI with submitted claim
        } catch (err) {
            Swal.fire("Error", "Failed to submit claim", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-2xl border border-gray-200 mt-10 mb-10">
            {/* If claim already exists, show status */}
            {existingClaim ? (
                <>
                    <h2 className="text-2xl font-bold text-center text-green-700 mb-6">
                        Claim Status
                    </h2>

                    <div className="space-y-4">
                        <p>
                            <strong>Order ID:</strong> {existingClaim.orderId}
                        </p>
                        <p>
                            <strong>Incident Date:</strong> {existingClaim.incidentDate}
                        </p>
                        <p>
                            <strong>Description:</strong> {existingClaim.description}
                        </p>
                        <p>
                            <strong>Deductible Amount:</strong> ₹{existingClaim.deductibleAmount}
                        </p>
                        <p>
                            <strong>Status:</strong>{" "}
                            <span
                                className={`px-3 py-1 rounded text-white ${existingClaim.status === "Approved"
                                    ? "bg-green-600"
                                    : existingClaim.status === "Rejected"
                                        ? "bg-red-600"
                                        : "bg-yellow-500"
                                    }`}
                            >
                                {existingClaim.status}
                            </span>
                        </p>

                        {/* Photos if available */}
                        {existingClaim.photos?.length > 0 && (
                            <div>
                                <strong>Uploaded Photos:</strong>
                                <div className="flex gap-2 mt-2 overflow-x-auto">
                                    {existingClaim.photos.map((photo, idx) => (
                                        <img
                                            key={idx}
                                            src={`${IMAGE_URL}/${photo}`}
                                            alt={`Claim ${idx}`}
                                            className="w-35 h-25 object-cover rounded-lg cursor-pointer hover:scale-105 transition"
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </>
            ) : (
                <>
                    {/*  If no claim exists, show form */}
                    <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
                        Submit Insurance Claim
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Order ID */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">
                                Order ID
                            </label>
                            <input
                                type="text"
                                value={order._id}
                                readOnly
                                className="border border-gray-300 bg-gray-100 text-gray-600 p-2 w-full rounded cursor-not-allowed"
                            />
                        </div>

                        {/* User ID */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">
                                User ID
                            </label>
                            <input
                                type="text"
                                value={order.userId}
                                readOnly
                                className="border border-gray-300 bg-gray-100 text-gray-600 p-2 w-full rounded cursor-not-allowed"
                            />
                        </div>

                        {/* Incident Date */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">
                                Incident Date
                            </label>
                            <input
                                type="date"
                                value={incidentDate}
                                onChange={(e) => setIncidentDate(e.target.value)}
                                required
                                className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">
                                Incident Description
                            </label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                                placeholder="Describe the incident in detail..."
                                className="border border-gray-300 p-2 w-full rounded h-28 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                            ></textarea>
                        </div>

                        {/* Deductible Amount */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">
                                Deductible Amount
                            </label>
                            <input
                                type="number"
                                value={deductibleAmount}
                                onChange={(e) => setDeductibleAmount(e.target.value)}
                                required
                                className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>

                        {/* Upload Photos */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">
                                Upload Photos (optional)
                            </label>
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={(e) => setPhotos(e.target.files)}
                                className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-3 text-white rounded-lg transition ${loading
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700"
                                }`}
                        >
                            {loading ? "Submitting..." : "Submit Claim"}
                        </button>
                    </form>
                </>
            )}
        </div>
    );
};

export default InsuranceClaim;
