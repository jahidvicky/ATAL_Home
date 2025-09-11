import React from 'react'
import API, { IMAGE_URL } from '../../API/Api';
import { useState } from 'react';
import { useEffect } from 'react';


const Frameshape = () => {
  const [frame, setframe] = useState([])

  //Get Api
  const fetchFrameShape = async () => {
    try {
      const response = await API.get("/getFrameShapes")

      setframe(response.data.frameShapesData)
    } catch (error) {
      console.log(error)
    }
  }



  useEffect(() => {
    fetchFrameShape()
  }, [])

  return (
    <div>
      <div className="bg-ray text-center py-10">
        <h2 className="text-3xl font-semibold">Shop by Frame Shape</h2>
        <hr className="md:w-86 mt-2 mb-4 md:ml-126 mx-12 border-black"></hr>
        <p className="text-gray-700 text-xl mx-6">
          Choose the perfect frames for your face or your style.
        </p>
        <div className="flex justify-between md:mx-26 mt-6 flex-wrap gap-y-4 mx-12">
          {frame.map((data, idx) => (
            <div key={idx}>

              <img src={IMAGE_URL + data.image} className='hover:scale-120 hover:cursor-pointer' loading='lazy' decoding='async'
                alt={data.frameName} />
              <h1 className='mt-2'>{data.frameName}</h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Frameshape