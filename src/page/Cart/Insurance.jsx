import React, { useEffect, useState } from 'react'
import API from '../../API/Api'

const Insurance = () => {
  const [companyName, setCompanyName] = useState([])

  const getCompany = async () => {
    try {
      const res = await API.get("/getAllCompany")
      setCompanyName(res.data.companies)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCompany()
  }, [])

  return (
    <>
      <div>
        <label className="text-lg font-semibold pr-2">Select your Insurance company :</label>
        <select className="text-lg focus:outline-none focus:border-black border border-black rounded">
          <option>Select your Insurance company</option>
          {companyName.map((data, idx) => (
            <option key={idx}>{data.companyName}</option>
          ))}
        </select>
      </div>
    </>
  )
}

export default Insurance