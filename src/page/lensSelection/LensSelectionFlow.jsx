// import React, { useState } from "react";
// import FramePreview from "./FramePreview";
// import Step1LensSelection from "./Step1LensSelection";
// import Step2PrescriptionMethod from "./Step2PrescriptionMethod";
// import Step3ManualForm from "./Step3ManualForm";
// import Step3UploadForm from "./Step3UploadForm";
// import Step4LensTypeSelection from "./Step4LensTypeSelection";
// import Step5TintSelection from "./Step5TintSelection";
// import Step6LensThicknessSelection from "./Step6LensThicknessSelection";

// const LensSelectionFlow = () => {
//   const [step, setStep] = useState(1);
//   const [selectedLens, setSelectedLens] = useState(null);
//   const [lensType, setLensType] = useState(null);
//   const [tint, setTint] = useState(null);
//   const [thickness, setThickness] = useState(null);

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       {/* Left side: Frame preview */}
//       <FramePreview />

//       {/* Right side: Step content */}
//       <div className="w-1/2 bg-gray-50 p-8">
//         {/* Step 1: Lens selection */}
//         {step === 1 && (
//           <Step1LensSelection
//             selectedLens={selectedLens}
//             onSelect={(lens) => {
//               setSelectedLens(lens);
//               setStep(2);
//             }}
//           />
//         )}

//         {/* Step 2: Prescription method */}
//         {step === 2 && (
//           <Step2PrescriptionMethod
//             onManual={() => setStep(3)}
//             onSaved={() => setStep(4)}
//             goBack={() => setStep(1)}
//           />
//         )}

//         {/* Step 3: Manual prescription */}
//         {step === 3 && (
//           <Step3ManualForm
//             goBack={() => setStep(2)}
//             onContinue={() => setStep(5)}
//           />
//         )}

//         {/* Step 4: Upload prescription */}
//         {step === 4 && (
//           <Step3UploadForm
//             goBack={() => setStep(2)}
//             onContinue={() => setStep(5)}
//           />
//         )}

//         {/* Step 5: Lens type selection */}
//         {step === 5 && (
//           <Step4LensTypeSelection
//             goBack={() => setStep(2)}
//             onSelectLensType={(type) => {
//               setLensType(type);
//               if (type === "Sun lenses") {
//                 setStep(6); // → go to tint selection
//               } else {
//                 setStep(7); // → skip tint, go directly to thickness
//               }
//             }}
//           />
//         )}

//         {/* Step 6: Tint selection (only for Sun lenses) */}
//         {step === 6 && lensType === "Sun lenses" && (
//           <Step5TintSelection
//             selectedTint={tint}
//             onSelect={(t) => setTint(t)}
//             onApply={() => setStep(7)}
//             goBack={() => setStep(5)}
//           />
//         )}

//         {/* Step 7: Thickness selection */}
//         {step === 7 && (
//           <Step6LensThicknessSelection
//             goBack={() => {
//               if (lensType === "Sun lenses") {
//                 setStep(6); // back to tint
//               } else {
//                 setStep(5); // back to lens type
//               }
//             }}
//             onSelectThickness={(t) => {
//               setThickness(t);
//               setStep(8); // → go summary
//             }}
//           />
//         )}

//         {/* Step 8: Summary */}
//         {step === 8 && (
//           <div>
//             <h2 className="text-2xl font-semibold text-gray-700 mb-6">
//               🎉 Order Summary
//             </h2>
//             <p>Lens Need: {selectedLens}</p>
//             <p>Lens Type: {lensType}</p>
//             {tint && <p>Tint: {tint}</p>}
//             {thickness && <p>Thickness: {thickness}</p>}

//             <button
//               onClick={() => setStep(1)}
//               className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-lg"
//             >
//               Start Over
//             </button>
//           </div>
//         )}

//         {/* Price section */}
//         <div className="mt-8 flex justify-between items-center text-xl font-semibold">
//           <span>Frame price:</span>
//           <div className="flex items-center space-x-2">
//             <span className="text-blue-500">$27.60</span>
//             <span className="line-through text-gray-500 text-base">$69.99</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LensSelectionFlow;


import React, { useState } from "react";
import FramePreview from "./FramePreview";
import Step1LensSelection from "./Step1LensSelection";
import Step2PrescriptionMethod from "./Step2PrescriptionMethod";
import Step3ManualForm from "./Step3ManualForm";
import Step3UploadForm from "./Step3UploadForm";
import Step4LensTypeSelection from "./Step4LensTypeSelection";
import Step5TintSelection from "./Step5TintSelection";
import Step6LensThicknessSelection from "./Step6LensThicknessSelection";
import Step7EnhancementsSelection from "./Step7EnhancementsSelection"; // ✅ new import

const LensSelectionFlow = () => {
  const [step, setStep] = useState(1);
  const [selectedLens, setSelectedLens] = useState(null);
  const [lensType, setLensType] = useState(null);
  const [tint, setTint] = useState(null);
  const [thickness, setThickness] = useState(null);
  const [enhancement, setEnhancement] = useState(null); // ✅ new state

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Left side: Frame preview */}
      <FramePreview />

      {/* Right side: Step content */}
      <div className="w-1/2 bg-gray-50 p-8">
        {/* Step 1: Lens selection */}
        {step === 1 && (
          <Step1LensSelection
            selectedLens={selectedLens}
            onSelect={(lens) => {
              setSelectedLens(lens);
              setStep(2);
            }}
          />
        )}

        {/* Step 2: Prescription method */}
        {step === 2 && (
          <Step2PrescriptionMethod
            onManual={() => setStep(3)}
            onSaved={() => setStep(4)}
            goBack={() => setStep(1)}
          />
        )}

        {/* Step 3: Manual prescription */}
        {step === 3 && (
          <Step3ManualForm
            goBack={() => setStep(2)}
            onContinue={() => setStep(5)}
          />
        )}

        {/* Step 4: Upload prescription */}
        {step === 4 && (
          <Step3UploadForm
            goBack={() => setStep(2)}
            onContinue={() => setStep(5)}
          />
        )}

        {/* Step 5: Lens type selection */}
        {step === 5 && (
          <Step4LensTypeSelection
            goBack={() => setStep(2)}
            onSelectLensType={(type) => {
              setLensType(type);
              if (type === "Sun lenses") {
                setStep(6); // → go to tint selection
              } else {
                setStep(7); // → skip tint, go directly to thickness
              }
            }}
          />
        )}

        {/* Step 6: Tint selection (only for Sun lenses) */}
        {step === 6 && lensType === "Sun lenses" && (
          <Step5TintSelection
            selectedTint={tint}
            onSelect={(t) => setTint(t)}
            onApply={() => setStep(7)}
            goBack={() => setStep(5)}
          />
        )}

        {/* Step 7: Thickness selection */}
        {step === 7 && (
          <Step6LensThicknessSelection
            goBack={() => {
              if (lensType === "Sun lenses") {
                setStep(6); // back to tint
              } else {
                setStep(5); // back to lens type
              }
            }}
            onSelectThickness={(t) => {
              setThickness(t);
              setStep(8); // → go enhancements
            }}
          />
        )}

        {/* Step 8: Enhancements */}
        {step === 8 && (
          <Step7EnhancementsSelection
            selectedEnhancement={enhancement}
            onSelect={(e) => setEnhancement(e)}
            goBack={() => setStep(7)}
            onContinue={() => setStep(9)}
          />
        )}

        {/* Step 9: Summary */}
        {step === 9 && (
          <div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">
              🎉 Order Summary
            </h2>
            <p>Lens Need: {selectedLens}</p>
            <p>Lens Type: {lensType}</p>
            {tint && <p>Tint: {tint}</p>}
            {thickness && <p>Thickness: {thickness}</p>}
            {enhancement && <p>Enhancement: {enhancement}</p>}

            <button
              onClick={() => setStep(1)}
              className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-lg"
            >
              Start Over
            </button>
          </div>
        )}

        {/* Price section */}
        <div className="mt-8 flex justify-between items-center text-xl font-semibold">
          <span>Frame price:</span>
          <div className="flex items-center space-x-2">
            <span className="text-blue-500">$27.60</span>
            <span className="line-through text-gray-500 text-base">$69.99</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LensSelectionFlow;
