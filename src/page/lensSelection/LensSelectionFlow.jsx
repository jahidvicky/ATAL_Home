import React, { useState, useEffect } from "react";
import FramePreview from "./FramePreview";
import Step1LensSelection from "./Step1LensSelection";
import Step2PrescriptionMethod from "./Step2PrescriptionMethod";
import Step3ManualForm from "./Step3ManualForm";
import Step3UploadForm from "./Step3UploadForm";
import Step4LensTypeSelection from "./Step4LensTypeSelection";
import Step5TintSelection from "./Step5TintSelection";
import Step6LensThicknessSelection from "./Step6LensThicknessSelection";
import Step7EnhancementsSelection from "./Step7EnhancementsSelection";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const LensSelectionFlow = () => {
  const navigate = useNavigate();

  // Load from localStorage if available
  const loadData = (key, fallback) => {
    try {
      const stored = localStorage.getItem("lensFlow_" + key);
      return stored ? JSON.parse(stored) : fallback;
    } catch {
      return fallback;
    }
  };

  const [step, setStep] = useState(loadData("step", 1));
  const [selectedLens, setSelectedLens] = useState(
    loadData("selectedLens", null)
  );
  const [prescriptionMethod, setPrescriptionMethod] = useState(
    loadData("prescriptionMethod", null)
  );
  const [lensType, setLensType] = useState(loadData("lensType", null));
  const [tint, setTint] = useState(loadData("tint", null));
  const [thickness, setThickness] = useState(loadData("thickness", null));
  const [enhancement, setEnhancement] = useState(loadData("enhancement", null));
  const [prescription, setPrescription] = useState(
    loadData("prescription", null)
  );
  const [showPrescription, setShowPrescription] = useState(false);
  const [product, setProduct] = useState(loadData("product", null));

  const location = useLocation();
  const { ID, previousLens } = location.state || {};

  const dispatch = useDispatch();

  const parsePrice = (val) => {
    if (!val) return 0;
    if (val === "Included") return 0;
    return parseFloat(val.replace("$", "")) || 0;
  };

  // --- Lens price only ---
  const lensPrice =
    parsePrice(lensType?.price) +
    parsePrice(tint?.price) +
    parsePrice(thickness?.price) +
    parsePrice(enhancement?.price);

  // // Persist to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem("lensFlow_step", JSON.stringify(step));
    localStorage.setItem("lensFlow_selectedLens", JSON.stringify(selectedLens));
    localStorage.setItem(
      "lensFlow_prescriptionMethod",
      JSON.stringify(prescriptionMethod)
    );
    localStorage.setItem("lensFlow_lensType", JSON.stringify(lensType));
    localStorage.setItem("lensFlow_tint", JSON.stringify(tint));
    localStorage.setItem("lensFlow_thickness", JSON.stringify(thickness));
    localStorage.setItem("lensFlow_enhancement", JSON.stringify(enhancement));
    localStorage.setItem("lensFlow_prescription", JSON.stringify(prescription));
    localStorage.setItem("lensFlow_product", JSON.stringify(product));
  }, [
    step,
    selectedLens,
    prescriptionMethod,
    lensType,
    tint,
    thickness,
    enhancement,
    prescription,
    product,
  ]);

  // Handle Add to Cart
  const handleAddToCart = () => {
    if (!product) return; // safety check

    const lensSelectionDetails = {
      lens: {
        selectedLens,
        prescriptionMethod,
        prescription,
        lensType,
        tint,
        thickness,
        enhancement,
        price: lensPrice,
      },
      totalPrice: lensPrice,
    };

    localStorage.setItem(
      "lensSelectionDetails",
      JSON.stringify(lensSelectionDetails)
    );

    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: "Lens selection saved!",
      showConfirmButton: false,
      timer: 1500,
    });

    navigate(-1);

    // Reset flow
    setStep(1);
    setSelectedLens(null);
    setPrescriptionMethod(null);
    setLensType(null);
    setTint(null);
    setThickness(null);
    setEnhancement(null);
    setPrescription(null);
    setShowPrescription(false);
    setProduct(null);

    Object.keys(localStorage)
      .filter((key) => key.startsWith("lensFlow_"))
      .forEach((key) => localStorage.removeItem(key));
  };

  const handleFrameLoaded = (prod) => {
    setProduct(prod);
  };

  useEffect(() => {
    if (previousLens?.lens) {
      setSelectedLens(previousLens.lens.selectedLens || null);
      setPrescriptionMethod(previousLens.lens.prescriptionMethod || null);
      setPrescription(previousLens.lens.prescription || null);
      setLensType(previousLens.lens.lensType || null);
      setTint(previousLens.lens.tint || null);
      setThickness(previousLens.lens.thickness || null);
      setEnhancement(previousLens.lens.enhancement || null);
    }
  }, [previousLens]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Left: Frame Preview */}
      <FramePreview onProductLoaded={handleFrameLoaded} />

      {/* Right: Lens Selection Steps */}
      <div className="w-1/2 bg-gray-50 p-8">
        {step === 1 && (
          <Step1LensSelection
            selectedLens={selectedLens}
            onSelect={(lens) => {
              setSelectedLens(lens);
              setStep(lens === "Non-prescription lenses" ? 5 : 2);
            }}
          />
        )}

        {step === 2 && (
          <Step2PrescriptionMethod
            preSelectedMethod={previousLens?.lens?.prescriptionMethod}
            onManual={() => {
              setPrescriptionMethod("Manually added");
              setStep(3);
            }}
            onSaved={() => {
              setPrescriptionMethod("Uploaded");
              setStep(4);
            }}
            goBack={() => setStep(1)}
          />
        )}

        {step === 3 && (
          <Step3ManualForm
            preFilledData={prescription}
            goBack={() => setStep(2)}
            onContinue={(data) => {
              setPrescription(data);
              setStep(5);
            }}
          />
        )}

        {step === 4 && (
          <Step3UploadForm
            preFilledData={prescription}
            goBack={() => setStep(2)}
            onContinue={(data) => {
              setPrescription(data);
              setStep(5);
            }}
          />
        )}

        {step === 5 && (
          <Step4LensTypeSelection
            preSelectedType={lensType}
            goBack={() =>
              setStep(selectedLens === "Non-prescription lenses" ? 1 : 2)
            }
            onSelectLensType={(type) => {
              setLensType(type);
              setStep(type.name === "Sun lenses" ? 6 : 7);
            }}
          />
        )}

        {step === 6 && lensType?.name === "Sun lenses" && (
          <Step5TintSelection
            selectedTint={tint}
            onSelect={(t) => setTint(t)}
            onApply={() => setStep(7)}
            goBack={() => setStep(5)}
          />
        )}

        {step === 7 && (
          <Step6LensThicknessSelection
            preSelectedThickness={thickness}
            goBack={() => setStep(lensType?.name === "Sun lenses" ? 6 : 5)}
            onSelectThickness={(t) => {
              setThickness(t);
              setStep(8);
            }}
          />
        )}

        {step === 8 && (
          <Step7EnhancementsSelection
            selectedEnhancement={enhancement}
            onSelect={(e) => setEnhancement(e)}
            goBack={() => setStep(7)}
            onContinue={() => setStep(9)}
          />
        )}

        {step === 9 && (
          <div>
            <h2 className="text-2xl font-bold text-red-600 mb-6">Review</h2>

            {/* Lenses Only */}
            <div className="mb-6 space-y-2 text-gray-700">
              <p>
                <strong>Vision Need:</strong> {selectedLens}
              </p>
              <p>
                <strong>Prescription:</strong>{" "}
                {selectedLens === "Non-prescription lenses"
                  ? "Not required"
                  : prescriptionMethod || "Not provided"}
              </p>
              <p>
                <strong>Lens Type:</strong> {lensType?.name || "Clear lenses"}{" "}
                {lensType?.price && (
                  <span className="text-blue-600">{lensType.price}</span>
                )}
              </p>
              {lensType?.name === "Sun lenses" && tint && (
                <p>
                  <strong>Tint:</strong> {tint.name}{" "}
                  <span className="text-blue-600">{tint.price}</span>
                </p>
              )}
              {thickness && (
                <p>
                  <strong>Thickness:</strong> {thickness.name}{" "}
                  <span className="text-blue-600">{thickness.price}</span>
                </p>
              )}
              {enhancement && (
                <p>
                  <strong>Finishings:</strong> {enhancement.name}{" "}
                  <span className="text-blue-600">{enhancement.price}</span>
                </p>
              )}
            </div>

            {/* TOTAL */}
            <div className="border-t pt-4 mt-4 flex justify-between items-center text-xl font-semibold">
              <span>Lenses Total:</span>
              <span className="text-green-600 font-bold">
                ${lensPrice.toFixed(2)}
              </span>
            </div>

            {/* Actions */}
            <div className="mt-8 flex justify-between">
              <button
                onClick={() => setStep(8)}
                className="hover:cursor-pointer px-6 py-2 border border-gray-400 rounded-lg text-gray-700 hover:bg-gray-100"
              >
                Back
              </button>
              <button
                onClick={handleAddToCart}
                className="bg-red-600 text-white px-12 py-3 rounded hover:bg-red-800 text-xl border-1 border-black hover:cursor-pointer"
              >
                Confirm Lens Selection
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LensSelectionFlow;
