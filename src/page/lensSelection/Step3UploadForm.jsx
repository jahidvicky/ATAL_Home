import React, { useState } from "react";

const Step3UploadForm = ({ goBack, onContinue }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <>
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">Upload your prescription</h2>
      <p className="text-sm text-gray-500 mb-4">
        Upload an image or PDF of your prescription provided by your doctor.
      </p>

      <div className="border-dashed border-2 border-gray-300 rounded-lg p-6 text-center bg-white shadow">
        {!file ? (
          <>
            <input
              type="file"
              id="upload"
              accept="image/*,application/pdf"
              className="hidden"
              onChange={handleFileChange}
            />
            <label
              htmlFor="upload"
              className="cursor-pointer text-blue-600 hover:text-blue-800 font-medium"
            >
              Click to upload
            </label>
            <p className="text-xs text-gray-400 mt-2">JPG, PNG, or PDF (max 5MB)</p>
          </>
        ) : (
          <div>
            <img src={file} alt="Preview" className="mx-auto max-h-48 rounded mb-4" />
            <button onClick={() => setFile(null)} className="text-red-500 underline text-sm">
              Remove file
            </button>
          </div>
        )}
      </div>

      <button
        onClick={onContinue}
        className="mt-6 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
      >
        Continue
      </button>

      <button onClick={goBack} className="mt-6 text-blue-500 underline">← Back</button>
    </>
  );
};

export default Step3UploadForm;
