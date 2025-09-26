import { useEffect, useState } from "react";
import axios from "axios";

const ClaimHistory = ({ token }) => {
  const [claims, setClaims] = useState([]);

  useEffect(() => {
    axios.get("/api/insurance-claims/customer/history", { headers: { Authorization: `Bearer ${token}` }})
      .then(res => setClaims(res.data.data));
  }, [token]);

  return (
    <div className="p-4 bg-white rounded shadow w-3/4 mx-auto mt-4">
      <h2 className="text-xl font-bold mb-3">My Claim History</h2>
      {claims.length === 0 ? <p>No claims found.</p> :
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Policy</th>
            <th className="p-2 border">Claim Amount</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Submitted</th>
          </tr>
        </thead>
        <tbody>
          {claims.map(c => (
            <tr key={c._id}>
              <td className="border p-2">{c.policy?.companyName}</td>
              <td className="border p-2">{c.claimAmount}</td>
              <td className="border p-2">
                {c.status === "approved" && <span className="text-green-600">Approved</span>}
                {c.status === "rejected" && <span className="text-red-600">Rejected</span>}
                {c.status === "pending" && <span className="text-yellow-600">Pending</span>}
              </td>
              <td className="border p-2">{new Date(c.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>}
    </div>
  );
};

export default ClaimHistory;
