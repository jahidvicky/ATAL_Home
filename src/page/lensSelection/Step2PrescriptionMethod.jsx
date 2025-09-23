import React from "react";

const Step2PrescriptionMethod = ({ onManual, onSaved, goBack }) => (
  <>
    <h2 className="text-2xl font-semibold text-gray-700 mb-6">Enter your prescription</h2>
    <p className="text-sm text-gray-500 mb-4">We'll create a lens tailor-made to your vision needs.</p>

    <div className="space-y-4">
      <button
        className="w-full text-left border rounded-lg p-4 hover:bg-gray-100 transition-all border-gray-300"
        onClick={onManual}
      >
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
          <div>
            <h3 className="text-lg font-medium text-gray-700">Enter it manually</h3>
            <p className="text-sm text-gray-500 mt-1">
              This is our quickest and most popular method. We will then recommend the most suitable lens type.
            </p>
          </div>
        </div>
      </button>

      <button
        className="w-full text-left border rounded-lg p-4 hover:bg-gray-100 transition-all border-gray-300"
        onClick={onSaved}
      >
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
          <div>
            <h3 className="text-lg font-medium text-gray-700">Use saved prescription</h3>
            <p className="text-sm text-gray-500 mt-1">
              Shopped here before? Upload or select your prescription.
            </p>
          </div>
        </div>
      </button>
    </div>

    <button onClick={goBack} className="mt-6 text-blue-500 underline">← Back</button>
  </>
);

export default Step2PrescriptionMethod;
