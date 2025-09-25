import React, { useState } from "react";

const Step3ManualForm = ({ goBack, onContinue }) => {
  const [form, setForm] = useState({
    odSph: "",
    odCyl: "",
    osSph: "",
    osCyl: "",
    pdLeft: "",
    pdRight: "",
    date: "",
    doctor: "",
  });

  const [errors, setErrors] = useState({});

  const sphOptions = [
    "-6.00",
    "-5.75",
    "-5.50",
    "-5.25",
    "-5.00",
    "-4.75",
    "-4.50",
    "-4.25",
    "-4.00",
    "-3.75",
    "-3.50",
    "-3.25",
    "-3.00",
    "-2.75",
    "-2.50",
    "-2.25",
    "-2.00",
    "-1.75",
    "-1.50",
    "-1.25",
    "-1.00",
    "-0.75",
    "-0.50",
    "-0.25",
    "0.00",
    "+0.25",
    "+0.50",
    "+0.75",
    "+1.00",
    "+1.25",
    "+1.50",
    "+1.75",
    "+2.00",
    "+2.25",
    "+2.50",
    "+2.75",
    "+3.00",
    "+3.25",
    "+3.50",
    "+3.75",
    "+4.00",
    "+4.25",
    "+4.50",
    "+4.75",
    "+5.00",
    "+5.25",
    "+5.50",
    "+5.75",
    "+6.00",
  ];

  const cylOptions = [
    "0.00",
    "-0.25",
    "-0.50",
    "-0.75",
    "-1.00",
    "-1.25",
    "-1.50",
    "-1.75",
    "-2.00",
    "-2.25",
    "-2.50",
    "-2.75",
    "-3.00",
    "+0.25",
    "+0.50",
    "+0.75",
    "+1.00",
    "+1.25",
    "+1.50",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    let newErrors = {};
    if (!form.odSph) newErrors.odSph = "Required";
    if (!form.osSph) newErrors.osSph = "Required";
    if (!form.pdLeft || !form.pdRight) newErrors.pd = "Required";
    if (!form.date) newErrors.date = "Required";
    if (!form.doctor) newErrors.doctor = "Required";
    return newErrors;
  };

  const handleSubmit = () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    onContinue(form); //  pass form back to parent
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">
        Enter your prescription
      </h2>

      {/* Prescription table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-2 border">Eye</th>
              <th className="p-2 border">SPH (Sphere)</th>
              <th className="p-2 border">CYL (Cylinder)</th>
              <th className="p-2 border">Axis</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 border">OD (Right)</td>
              <td className="p-2 border">
                <select
                  name="odSph"
                  value={form.odSph}
                  onChange={handleChange}
                  className="w-24 border p-1 rounded hover:cursor-pointer"
                >
                  <option value="">Select</option>
                  {sphOptions.map((val) => (
                    <option className="hover:cursor-pointer" key={val} value={val}>
                      {val}
                    </option>
                  ))}
                </select>
                {errors.odSph && (
                  <p className="text-red-500 text-xs">{errors.odSph}</p>
                )}
              </td>
              <td className="p-2 border">
                <select
                  name="odCyl"
                  value={form.odCyl}
                  onChange={handleChange}
                  className="w-24 border p-1 rounded hover:cursor-pointer"
                >
                  <option value="">Select</option>
                  {cylOptions.map((val) => (
                    <option key={val} value={val}>
                      {val}
                    </option>
                  ))}
                </select>
              </td>
              <td className="p-2 border">None</td>
            </tr>

            <tr>
              <td className="p-2 border">OS (Left)</td>
              <td className="p-2 border">
                <select
                  name="osSph"
                  value={form.osSph}
                  onChange={handleChange}
                  className="w-24 border p-1 rounded hover:cursor-pointer"
                >
                  <option value="">Select</option>
                  {sphOptions.map((val) => (
                    <option key={val} value={val}>
                      {val}
                    </option>
                  ))}
                </select>
                {errors.osSph && (
                  <p className="text-red-500 text-xs">{errors.osSph}</p>
                )}
              </td>
              <td className="p-2 border">
                <select
                  name="osCyl"
                  value={form.osCyl}
                  onChange={handleChange}
                  className="w-24 border p-1 rounded hover:cursor-pointer"
                >
                  <option value="">Select</option>
                  {cylOptions.map((val) => (
                    <option key={val} value={val}>
                      {val}
                    </option>
                  ))}
                </select>
              </td>
              <td className="p-2 border">None</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* PD Left + Right */}
      <div className="mt-4">
        <label className="block text-sm text-gray-600 mb-2">
          Pupillary Distance (PD)
        </label>
        <div className="flex space-x-4">
          <input
            type="number"
            name="pdLeft"
            value={form.pdLeft}
            onChange={handleChange}
            placeholder="Left"
            className="border rounded p-2 w-20 hover:cursor-pointer"
          />
          <input
            type="number"
            name="pdRight"
            value={form.pdRight}
            onChange={handleChange}
            placeholder="Right"
            className="border rounded p-2 w-20 hover:cursor-pointer"
          />
        </div>
        {errors.pd && <p className="text-red-500 text-xs">{errors.pd}</p>}
      </div>

      {/* Date + Doctor */}
      <div className="mt-4 flex space-x-4">
        <label className="flex-1">
    <span className="block text-sm font-medium mb-1">Date of Prescription*</span>
    <input
      type="date"
      id="date"
      name="date"
      value={form.date}
      onChange={handleChange}
      className="border p-2 rounded w-full hover:cursor-pointer"
    />
  </label>
        <input
          type="text"
          name="doctor"
          value={form.doctor}
          onChange={handleChange}
          placeholder="Doctor's Name*"
          className="border p-2 rounded flex-1 hover:cursor-pointer h-10.5 mt-6"
        />
      </div>
      {errors.date && (
        <p className="text-red-500 text-xs mt-1">{errors.date}</p>
      )}
      {errors.doctor && (
        <p className="text-red-500 text-xs mt-1">{errors.doctor}</p>
      )}

      {/* Buttons */}
      <button
        onClick={handleSubmit}
        className="mt-6 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full hover:cursor-pointer"
      >
        Continue
      </button>
      <button
        onClick={goBack}
        className="hover:cursor-pointer px-6 py-2 border border-gray-400 rounded-lg text-gray-700 hover:bg-gray-100 mt-3 w-full"
      >
        Back
      </button>
    </div>
  );
};

export default Step3ManualForm;
