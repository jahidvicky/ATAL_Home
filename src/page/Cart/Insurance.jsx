import React, { useEffect, useState } from "react";
import API from "../../API/Api";

export default function Insurance({ onPolicySelect }) {
  const [policies, setPolicies] = useState([]);
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    API.get("/getPolicies")
      .then((res) => setPolicies(res.data.data || []))
      .catch((err) => console.error(err));
  }, []);

  const handleSelect = (policy) => {
    setSelectedPolicy(policy);
    onPolicySelect(policy);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">
        Add Insurance (Optional)
      </h3>

      {policies.length === 0 && (
        <p className="text-gray-500 text-sm">No policies available</p>
      )}

      <select
        className="w-full border border-gray-300 rounded-lg p-2 mb-4 hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e) => {
          const policy = policies.find((p) => p._id === e.target.value);
          handleSelect(policy);
        }}
        value={selectedPolicy?._id || ""}
      >
        <option value="" disabled>------------------ Select an insurance policy -----------------</option>
        {policies.map((p) => (
          <option key={p._id} value={p._id}>
            {p.name} — ${p.price} ({p.companyName})
          </option>
        ))}
      </select>

      {selectedPolicy && (
        <div className="mt-4 border-t border-gray-200 pt-4 flex justify-between items-center">
          <div>
            <p className="font-semibold text-lg text-gray-800">
              {selectedPolicy.name} — ${selectedPolicy.price}
            </p>
            <p className="text-sm text-gray-600">
              Valid: {selectedPolicy.durationDays} days
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="text-blue-600 text-sm font-semibold hover:underline hover:cursor-pointer"
          >
            Know More
          </button>
        </div>
      )}

      {/* Modal */}
      {showModal && selectedPolicy && (
        <div className="fixed inset-0 z-50 flex justify-center items-center">
          {/* Blurred background overlay */}
          <div
            className="absolute inset-0 bg-blur bg-opacity-30 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setShowModal(false)}
          ></div>

          {/* Modal content */}
          <div className="relative bg-white rounded-xl shadow-lg w-[90%] max-w-md p-6 transform transition-transform duration-300 ease-out animate-slide-up">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-500 text-xl font-bold hover:cursor-pointer hover:text-gray-800"
            >
              ×
            </button>

            <h2 className="text-2xl font-semibold mb-3 text-gray-800">
              {selectedPolicy.name}
            </h2>

            <p className="text-gray-700 mb-2">
              <strong>Coverage:</strong> {selectedPolicy.coverage}
            </p>

            <p className="text-gray-500 text-sm mb-2">
              <strong>Provided by:</strong> {selectedPolicy.companyName}
            </p>

            <p className="text-gray-700 mb-2">
              <strong>Price:</strong> ${selectedPolicy.price}
            </p>

            <p className="text-gray-700 mb-2">
              <strong>Validity:</strong> {selectedPolicy.durationDays} days
            </p>

            {selectedPolicy.deductibleRules?.length > 0 && (
              <div className="mt-4">
                <h4 className="font-semibold text-gray-800">Deductible Rules:</h4>
                <ul className="list-disc pl-5 text-sm text-gray-700 mt-1">
                  {selectedPolicy.deductibleRules.map((rule, idx) => (
                    <li key={idx}>
                      Days {rule.fromDay}–{rule.toDay}:{" "}
                      {rule.type === "percent"
                        ? `${rule.value}% deductible`
                        : `$${rule.value} deductible`}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition hover:cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tailwind animation for slide-up */}
      <style>
        {`
          @keyframes slide-up {
            0% { transform: translateY(50px); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
          }
          .animate-slide-up {
            animation: slide-up 0.3s ease-out forwards;
          }
        `}
      </style>
    </div>
  );
}



