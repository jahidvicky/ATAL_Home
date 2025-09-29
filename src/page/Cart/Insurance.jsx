import { useEffect, useState } from "react";
import API from "../../API/Api"; // 👈 use your API instance

const Insurance = ({ onSelect }) => {
  const [policies, setPolicies] = useState([]);

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const res = await API.get("/getPolicies", { withCredentials: true });
        setPolicies(res.data.data);
        // console.log("data", res.data.data)
      } catch (error) {
        console.error("Error fetching policies:", error);
      }
    };

    fetchPolicies();
  }, []);

  return (
    <select
      className="p-2 w-full"
      onChange={(e) => onSelect(e.target.value)}
    >
      <option value="">Select Insurance Policy</option>
      {policies.map((p) => (
        <option key={p._id} value={p._id}>
          {p.policyDetails}
        </option>
      ))}
    </select>
  );
};

export default Insurance;
