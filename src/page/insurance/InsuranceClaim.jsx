import React, { useState } from "react";
import API from "../../API/Api";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";

const InsuranceClaim = () => {
    const [incidentDate, setIncidentDate] = useState("");
    const [description, setDescription] = useState("");
    const [deductibleAmount, setDeductibleAmount] = useState("");
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(false);

    const location = useLocation();
    const { order } = location.state;

    console.log(order);


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
            await API.post("/submitClaim", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            Swal.fire("✅ Success", "Claim submitted successfully", "success");

            // Reset fields
            setIncidentDate("");
            setDescription("");
            setDeductibleAmount("");
            setPhotos([]);
        } catch (err) {
            Swal.fire("❌ Error", "Failed to submit claim", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-2xl border border-gray-200 mt-10">
            <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
                🛡️ Submit Insurance Claim
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Order ID */}
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Order ID</label>
                    <input
                        type="text"
                        value={order._id}
                        readOnly
                        className="border border-gray-300 bg-gray-100 text-gray-600 p-2 w-full rounded cursor-not-allowed"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-2">USER ID</label>
                    <input
                        type="text"
                        value={order.userId}
                        readOnly
                        className="border border-gray-300 bg-gray-100 text-gray-600 p-2 w-full rounded cursor-not-allowed"
                    />
                </div>

                {/* Incident Date */}
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Incident Date</label>
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
                    <label className="block text-gray-700 font-medium mb-2">Incident Description</label>
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
                    <label className="block text-gray-700 font-medium mb-2">Deductible Amount</label>
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
                    <label className="block text-gray-700 font-medium mb-2">Upload Photos (optional)</label>
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
                    className={`w-full py-3 text-white rounded-lg transition ${loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
                        }`}
                >
                    {loading ? "Submitting..." : "Submit Claim"}
                </button>
            </form>
        </div>
    );
};

export default InsuranceClaim;
