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
import { addToCart } from "../../redux/cartSlice";
import Swal from "sweetalert2";
import { IMAGE_URL } from "../../API/Api";
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
  const { ID } = location.state;

  const dispatch = useDispatch();

  const parsePrice = (val) => {
    if (!val) return 0;
    if (val === "Included") return 0;
    return parseFloat(val.replace("$", "")) || 0;
  };

  // --- dynamic totals ---
  const frameOldPrice = product?.old_price || 0;
  const framePrice = product?.product_sale_price || 0;

  const lensOldPrice =
    parsePrice(lensType?.oldPrice) +
    parsePrice(tint?.oldPrice) +
    parsePrice(thickness?.oldPrice) +
    parsePrice(enhancement?.oldPrice);

  const lensPrice =
    parsePrice(lensType?.price) +
    parsePrice(tint?.price) +
    parsePrice(thickness?.price) +
    parsePrice(enhancement?.price);

  const totalOld = frameOldPrice + lensOldPrice;
  const totalNew = framePrice + lensPrice;

  // Persist to localStorage whenever state changes
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
    const productItem = {
      id: ID,
      name: product?.product_name,
      price: totalNew,
      image: `${IMAGE_URL}${product.product_image_collection?.[0] || ""}`,
      framePrice,
      lensPrice,
      selectedLens,
      prescriptionMethod,
      prescription,
      lensType,
      tint,
      thickness,
      enhancement,
    };

    dispatch(addToCart(productItem));

    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: "Product added to cart!",
      showConfirmButton: false,
      timer: 1500,
    });

    navigate("/cart");

    // Reset flow after adding to cart
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

  // Do NOT reset when frame loads, just set product
  const handleFrameLoaded = (prod) => {
    setProduct(prod);
  };

  const product1 = {
    id: ID,
    name: product?.product_name,
    price: product?.product_sale_price,
    image: `${IMAGE_URL}${product?.product_image_collection?.[0] || ""}`,
  };

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
            goBack={() => setStep(2)}
            onContinue={(data) => {
              setPrescription(data);
              setStep(5);
            }}
          />
        )}

        {step === 4 && (
          <Step3UploadForm
            goBack={() => setStep(2)}
            onContinue={() => setStep(5)}
          />
        )}

        {step === 5 && (
          <Step4LensTypeSelection
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

            {/* Frame */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold flex justify-between items-center">
                <span>Frame:</span>
                <div className="flex items-center space-x-2">
                  <span className="line-through text-gray-500 text-sm">
                    ${frameOldPrice.toFixed(2)}
                  </span>
                  <span className="text-blue-600 font-semibold">
                    ${framePrice.toFixed(2)}
                  </span>
                </div>
              </h3>
              <p>{product?.product_name || "frame"}</p>
            </div>

            {/* Lenses */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold flex justify-between items-center">
                <span>Lenses:</span>
                <div className="flex items-center space-x-2">
                  <span className="line-through text-gray-500 text-sm">
                    ${lensOldPrice.toFixed(2)}
                  </span>
                  <span className="text-blue-600 font-semibold">
                    ${lensPrice.toFixed(2)}
                  </span>
                </div>
              </h3>

              {/* Prescription Dropdown */}
              {selectedLens !== "Non-prescription lenses" && (
                <div className="mb-4">
                  <button
                    onClick={() => setShowPrescription(!showPrescription)}
                    className="w-full flex items-center rounded p-2 hover:bg-gray-50"
                  >
                    <span className="font-medium mr-2">
                      Prescription Details
                    </span>
                    <span className="hover:cursor-pointer">{showPrescription ? "▲" : "▼"}</span>
                  </button>

                  {showPrescription && prescription && (
                    <div className="mt-3">
                      <table className="min-w-full border border-gray-200 text-sm">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="p-2 border">Eye</th>
                            <th className="p-2 border">SPH</th>
                            <th className="p-2 border">CYL</th>
                            <th className="p-2 border">Axis</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="p-2 border font-semibold">OD</td>
                            <td className="p-2 border">
                              {prescription?.odSph || "-"}
                            </td>
                            <td className="p-2 border">
                              {prescription?.odCyl || "None"}
                            </td>
                            <td className="p-2 border">
                              {prescription?.odAxis || "None"}
                            </td>
                          </tr>
                          <tr>
                            <td className="p-2 border font-semibold">OS</td>
                            <td className="p-2 border">
                              {prescription?.osSph || "-"}
                            </td>
                            <td className="p-2 border">
                              {prescription?.osCyl || "None"}
                            </td>
                            <td className="p-2 border">
                              {prescription?.osAxis || "None"}
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <div className="mt-3 text-sm text-gray-700 space-y-1">
                        <p>
                          <span className="font-medium">PD (Left):</span>{" "}
                          {prescription?.pdLeft || "N/A"}
                        </p>
                        <p>
                          <span className="font-medium">PD (Right):</span>{" "}
                          {prescription?.pdRight || "N/A"}
                        </p>
                        <p>
                          <span className="font-medium">Issue date:</span>{" "}
                          {prescription?.date || "N/A"}
                        </p>
                        <p>
                          <span className="font-medium">Doctor's name:</span>{" "}
                          {prescription?.doctor || "N/A"}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="space-y-2 text-gray-700">
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
            </div>

            {/* TOTAL */}
            <div className="border-t pt-4 mt-4 flex justify-between items-center text-xl font-semibold">
              <span>TOTAL:</span>
              <div className="flex items-center space-x-2">
                <span className="line-through text-gray-500 text-base">
                  ${totalOld.toFixed(2)}
                </span>
                <span className="text-green-600 font-bold">
                  ${totalNew.toFixed(2)}
                </span>
              </div>
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
                ADD TO CART
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LensSelectionFlow;
