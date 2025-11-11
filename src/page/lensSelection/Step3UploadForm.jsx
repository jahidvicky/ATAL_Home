import React, { useState } from "react";
import API from "../../API/Api";
const Step3UploadForm = ({ preFilledData, goBack, onContinue }) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploadInfo, setUploadInfo] = useState(preFilledData || null);
  const [uploading, setUploading] = useState(false);

  // Handle file select + upload
  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setFile(selectedFile);

    //  Show preview if image
    if (selectedFile.type.startsWith("image/")) {
      setPreview(URL.createObjectURL(selectedFile));
    } else {
      setPreview(null);
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      setUploading(true);

      const { data } = await API.post("/uploads", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (data.success) {
        setUploadInfo(data);
      } else {
        console.error("Upload failed:", data.message);
      }
    } catch (err) {
      console.error("Error uploading:", err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">
        Upload your prescription
      </h2>

      <div className="border-dashed border-2 border-gray-300 rounded-lg p-6 text-center">
        {!preview && !uploadInfo ? (
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
              Click to upload file
            </label>
          </>
        ) : (
          <div>
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="mx-auto max-h-48 rounded mb-4"
              />
            ) : (
              <p className="text-gray-600">File uploaded: {file?.name}</p>
            )}
            <button
              onClick={() => {
                setFile(null);
                setPreview(null);
                setUploadInfo(null);
              }}
              className="text-[#f00000] underline text-sm"
            >
              Remove file
            </button>
          </div>
        )}
      </div>

      {/*  Continue Button */}
      <button
        onClick={() => onContinue(uploadInfo)}
        disabled={!uploadInfo || uploading}
        className={`mt-6 w-full py-2 rounded ${uploadInfo
          ? "bg-green-600 text-white hover:bg-green-700"
          : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
      >
        {uploading ? "Uploading..." : "Continue"}
      </button>

      <button
        onClick={goBack}
        className="mt-2 w-full border border-gray-400 py-2 rounded-lg text-gray-700 hover:bg-gray-100"
      >
        Back
      </button>
    </div>
  );
};

export default Step3UploadForm;
