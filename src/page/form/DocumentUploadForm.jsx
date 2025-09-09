import React, { useState } from "react";
import Swal from "sweetalert2";

const DocumentUploadForm = () => {
  const [documents, setDocuments] = useState({
    eyeglassPrescription: null,
    pdMeasurement: null,
    insuranceCard: null,
    govID: null,
    contactLensPrescription: null,
    thirdPartyAuth: null,
    warrantyEvidence: null,
  });

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setDocuments({ ...documents, [name]: files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: "Documents submitted successfully!",
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-blue-100 py-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-2xl rounded-2xl p-8 w-full space-y-6 m-8"
      >
        <h2 className="text-3xl font-bold text-center text-red-600">
          Required Documents Upload
        </h2>
        <div className="grid grid-cols-2 gap-6">
          {/* Eyeglass / Contact Lens Prescription */}
          <div>
            <label className="block font-medium mb-2">
              Valid Eyeglass/Contact Lens Prescription *
            </label>
            <input
              type="file"
              name="eyeglassPrescription"
              onChange={handleFileChange}
              className="w-full border p-2 rounded-lg"
              required
            />
          </div>

          {/* PD Measurement */}
          <div>
            <label className="block font-medium mb-2">
              PD Measurement (or consent to remote measurement) *
            </label>
            <input
              type="file"
              name="pdMeasurement"
              onChange={handleFileChange}
              className="w-full border p-2 rounded-lg"
              required
            />
          </div>

          {/* Insurance Card */}
          <div>
            <label className="block font-medium mb-2">
              Insurance Card (Front & Back) *
            </label>
            <input
              type="file"
              name="insuranceCard"
              onChange={handleFileChange}
              className="w-full border p-2 rounded-lg"
              required
            />
          </div>

          {/* Government-issued ID (optional) */}
          <div>
            <label className="block font-medium mb-2">
              Government-issued Photo ID (optional, for fraud prevention)
            </label>
            <input
              type="file"
              name="govID"
              onChange={handleFileChange}
              className="w-full border p-2 rounded-lg"
            />
          </div>

          {/* Contact Lens Prescription */}
          <div>
            <label className="block font-medium mb-2">
              Contact Lens Prescription (if applicable)
            </label>
            <input
              type="file"
              name="contactLensPrescription"
              onChange={handleFileChange}
              className="w-full border p-2 rounded-lg"
            />
          </div>

          {/* Third-Party Authorization */}
          <div>
            <label className="block font-medium mb-2">
              Authorization Note + ID (for third-party pickup, if applicable)
            </label>
            <input
              type="file"
              name="thirdPartyAuth"
              onChange={handleFileChange}
              className="w-full border p-2 rounded-lg"
            />
          </div>

          {/* Warranty Claim Evidence */}
          <div>
            <label className="block font-medium mb-2">
              Warranty Claim Evidence (e.g., product photos)
            </label>
            <input
              type="file"
              name="warrantyEvidence"
              onChange={handleFileChange}
              className="w-full border p-2 rounded-lg"
            />
          </div>
        </div>
        {/* Submit */}
        <button
          type="submit"
          className="bg-red-600 text-white py-3 px-3 rounded-lg hover:bg-red-700 transition font-semibold text-lg"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default DocumentUploadForm;
