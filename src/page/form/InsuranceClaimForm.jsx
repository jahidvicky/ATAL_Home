import React, { useState } from "react";
import Swal from "sweetalert2";

export default function InsuranceClaimForm() {
  const [formData, setFormData] = useState({
    patient: { name: "", dob: "", contact: "" },
    order: { items: "", amount: "", date: "" },
    prescription: {
      sphere: "",
      cylinder: "",
      axis: "",
      add: "",
      pd: "",
      prescriber: "",
    },
    provider: {
      businessName: "",
      address: "",
      license: "",
      cra: "",
    },
    insurance: {
      insurer: "",
      policy: "",
      memberId: "",
      group: "",
    },
    assignment: false,
    signature: "",
    uploads: {
      receipt: null,
      prescription: null,
      insuranceCardFront: null,
      insuranceCardBack: null,
      priorAuth: null,
    },
  });

  // Handle text/checkbox inputs
  const handleChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  };

  // Handle file uploads
  const handleFileChange = (field, file) => {
    setFormData((prev) => ({
      ...prev,
      uploads: { ...prev.uploads, [field]: file },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("Submitting insurance claim:", formData);
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "info",
      title: "Form submitted",
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true
    });
    // alert("Form ready to submit. Replace with API call.");
  };

  return (
    <div className="flex justify-center p-6 bg-gray-100 min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-16 rounded-xl shadow-lg w-full space-y-6"
      >
        <h2 className="text-2xl font-bold text-center">
          Insurance Claim Form
        </h2>

        {/* Patient Details */}
        <section>
          <h3 className="text-xl font-semibold mb-2">Patient Details</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Full Name"
              value={formData.patient.name}
              onChange={(e) => handleChange("patient", "name", e.target.value)}
              className="border rounded p-2 w-full"
            />
            <input
              type="date"
              placeholder="DOB"
              value={formData.patient.dob}
              onChange={(e) => handleChange("patient", "dob", e.target.value)}
              className="border rounded p-2 w-full"
            />
            <input
              type="text"
              placeholder="Contact Info"
              value={formData.patient.contact}
              onChange={(e) => handleChange("patient", "contact", e.target.value)}
              className="border rounded p-2 w-full"
            />
          </div>
        </section>

        {/* Order Details */}
        <section>
          <h3 className="text-xl font-semibold mb-2">Order Details</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Items Ordered"
              value={formData.order.items}
              onChange={(e) => handleChange("order", "items", e.target.value)}
              className="border rounded p-2 w-full"
            />
            <input
              type="number"
              placeholder="Amount ($)"
              value={formData.order.amount}
              onChange={(e) => handleChange("order", "amount", e.target.value)}
              className="border rounded p-2 w-full"
            />
            <input
              type="date"
              placeholder="Date of Service"
              value={formData.order.date}
              onChange={(e) => handleChange("order", "date", e.target.value)}
              className="border rounded p-2 w-full "
            />
          </div>
        </section>

        {/* Prescription Details */}
        <section>
          <h3 className="text-xl font-semibold mb-2">Prescription Details</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Sphere"
              value={formData.prescription.sphere}
              onChange={(e) =>
                handleChange("prescription", "sphere", e.target.value)
              }
              className="border rounded p-2 w-full"
            />
            <input
              type="text"
              placeholder="Cylinder"
              value={formData.prescription.cylinder}
              onChange={(e) =>
                handleChange("prescription", "cylinder", e.target.value)
              }
              className="border rounded p-2 w-full"
            />
            <input
              type="text"
              placeholder="Axis"
              value={formData.prescription.axis}
              onChange={(e) =>
                handleChange("prescription", "axis", e.target.value)
              }
              className="border rounded p-2 w-full"
            />
            <input
              type="text"
              placeholder="Add"
              value={formData.prescription.add}
              onChange={(e) =>
                handleChange("prescription", "add", e.target.value)
              }
              className="border rounded p-2 w-full"
            />
            <input
              type="text"
              placeholder="PD"
              value={formData.prescription.pd}
              onChange={(e) =>
                handleChange("prescription", "pd", e.target.value)
              }
              className="border rounded p-2 w-full"
            />
            <input
              type="text"
              placeholder="Prescriber Name"
              value={formData.prescription.prescriber}
              onChange={(e) =>
                handleChange("prescription", "prescriber", e.target.value)
              }
              className="border rounded p-2 w-full"
            />
          </div>
        </section>

        {/* Provider Details (auto-filled) */}
        <section>
          <h3 className="text-xl font-semibold mb-2">Provider Details</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              value={formData.provider.businessName}

              className="border rounded p-2 w-full"
            />
            <input
              type="text"
              value={formData.provider.address}
              readOnly
              className="border rounded p-2 w-full"
            />
            <input
              type="text"
              value={formData.provider.license}
              readOnly
              className="border rounded p-2 w-full"
            />
            <input
              type="text"
              value={formData.provider.cra}
              readOnly
              className="border rounded p-2 w-full"
            />
          </div>
        </section>

        {/* Insurance Details */}
        <section>
          <h3 className="text-xl font-semibold mb-2">Insurance Details</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Insurer"
              value={formData.insurance.insurer}
              onChange={(e) =>
                handleChange("insurance", "insurer", e.target.value)
              }
              className="border rounded p-2 w-full"
            />
            <input
              type="text"
              placeholder="Policy Number"
              value={formData.insurance.policy}
              onChange={(e) =>
                handleChange("insurance", "policy", e.target.value)
              }
              className="border rounded p-2 w-full"
            />
            <input
              type="text"
              placeholder="Member ID"
              value={formData.insurance.memberId}
              onChange={(e) =>
                handleChange("insurance", "memberId", e.target.value)
              }
              className="border rounded p-2 w-full"
            />
            <input
              type="text"
              placeholder="Group Number"
              value={formData.insurance.group}
              onChange={(e) =>
                handleChange("insurance", "group", e.target.value)
              }
              className="border rounded p-2 w-full"
            />
          </div>
        </section>

        {/* Assignment of Benefits */}
        <section className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={formData.assignment}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, assignment: e.target.checked }))
            }
          />
          <span>I authorize assignment of benefits to the provider</span>
        </section>

        {/* E-Signature */}
        <section>
          <label className="block mb-1 font-medium">E-Signature</label>
          <input
            type="text"
            placeholder="Type full name"
            value={formData.signature}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, signature: e.target.value }))
            }
            className="border rounded p-2 w-full"
          />
        </section>

        {/* Uploads */}
        <section>
          <h3 className="text-xl font-semibold mb-2">Uploads</h3>
          <div className="grid gap-2">
            <input
              type="file"
              onChange={(e) => handleFileChange("receipt", e.target.files[0])}
            />
            <input
              type="file"
              onChange={(e) =>
                handleFileChange("prescription", e.target.files[0])
              }
            />
            <input
              type="file"
              onChange={(e) =>
                handleFileChange("insuranceCardFront", e.target.files[0])
              }
            />
            <input
              type="file"
              onChange={(e) =>
                handleFileChange("insuranceCardBack", e.target.files[0])
              }
            />
            <input
              type="file"
              onChange={(e) =>
                handleFileChange("priorAuth", e.target.files[0])
              }
            />
          </div>
        </section>

        {/* Submit */}
        <div className="flex justify-end gap-4">
          <button
            type="reset"
            onClick={() =>
              setFormData({
                patient: { name: "", dob: "", contact: "" },
                order: { items: "", amount: "", date: "" },
                prescription: {
                  sphere: "",
                  cylinder: "",
                  axis: "",
                  add: "",
                  pd: "",
                  prescriber: "",
                },
                provider: formData.provider,
                insurance: { insurer: "", policy: "", memberId: "", group: "" },
                assignment: false,
                signature: "",
                uploads: {
                  receipt: null,
                  prescription: null,
                  insuranceCardFront: null,
                  insuranceCardBack: null,
                  priorAuth: null,
                },
              })
            }
            className="px-4 py-2 border rounded"
          >
            Reset
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
