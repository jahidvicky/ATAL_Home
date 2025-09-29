import { useState } from "react";
import axios from "axios";
import Insurance from "./Insurance";

const SubmitClaim = ({ token }) => {
  const [form, setForm] = useState({
    policy: "",
    purchaseId: "",
    claimAmount: ""
  });

  const handleSubmit = async e => {
    e.preventDefault();
    await axios.post("/api/insurance-claims", form, { headers: { Authorization: `Bearer ${token}` }});
    alert("Claim submitted!");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow w-1/2">
      <h2 className="text-xl font-bold mb-3">Submit Insurance Claim</h2>
      <Insurance onSelect={val => setForm({...form, policy: val})}/>
      <input placeholder="Purchase ID" className="border p-2 w-full mb-2 mt-2"
        value={form.purchaseId} onChange={e => setForm({...form, purchaseId: e.target.value})}/>
      <input placeholder="Claim Amount" className="border p-2 w-full mb-2"
        value={form.claimAmount} onChange={e => setForm({...form, claimAmount: e.target.value})}/>
      <button className="bg-blue-500 text-white px-4 py-2 rounded">Submit Claim</button>
    </form>
  );
};

export default SubmitClaim;
