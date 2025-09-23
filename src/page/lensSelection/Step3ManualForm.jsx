import React from "react";

const Step3ManualForm = ({ goBack, onContinue }) => (
  <>
    <h2 className="text-2xl font-semibold text-gray-700 mb-6">Enter your prescription manually</h2>

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
            <td className="p-2 border"><input className="w-20 border p-1 rounded" defaultValue="0.00" /></td>
            <td className="p-2 border"><input className="w-20 border p-1 rounded" defaultValue="0.00" /></td>
            <td className="p-2 border">None</td>
          </tr>
          <tr>
            <td className="p-2 border">OS (Left)</td>
            <td className="p-2 border"><input className="w-20 border p-1 rounded" defaultValue="0.00" /></td>
            <td className="p-2 border"><input className="w-20 border p-1 rounded" defaultValue="0.00" /></td>
            <td className="p-2 border">None</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div className="mt-4">
      <label className="block text-sm text-gray-600 mb-2">Pupillary distance</label>
      <select className="border rounded p-2 w-40">
        <option>63</option>
        <option>62</option>
        <option>61</option>
      </select>
    </div>

    <div className="mt-4 flex space-x-4">
      <input type="text" placeholder="Date of Prescription*" className="border p-2 rounded flex-1" />
      <input type="text" placeholder="Doctor's Name*" className="border p-2 rounded flex-1" />
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

export default Step3ManualForm;
