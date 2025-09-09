import React from 'react'

const Insurance = () => {
  return (
    <>
         <div>
              <label className="text-lg font-semibold">Select your Insurance company :</label>
              <select className="text-lg focus:outline-none focus:border-black">
                <option>Select your Insurance company</option>
                <option>ABC PVT LTD</option>
                <option>XYZ PVT LTD</option>
                <option>TATA PVT LTD</option>
                <option>KLM PVT LTD</option>
              </select>
            </div>
    </>
  )
}

export default Insurance