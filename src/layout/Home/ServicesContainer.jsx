import React from 'react'
import ServicesContaineHead from './service-head-cont/ServicesContainerHead'
import { FaArrowRight } from "react-icons/fa";
import API, { IMAGE_URL } from '../../API/Api';
import { useState } from 'react';
import { useEffect } from 'react';

const ServicesContainer = () => {
  const [eyeServices, setEyeServices] = useState([])

  //Get API
  const fetchEyeServices = async () => {
    try {
      const response = await API.get("/getEyeService")
      setEyeServices(response.data.EyeServiceData)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchEyeServices()
  }, [])


  return (
    <>
      {eyeServices.map((data, index) => (
        <ServicesContaineHead
          key={index}
          icon={IMAGE_URL + data.image}
          headText={data.heading}
          content={data.description}
          arrow={<FaArrowRight />}
        />

      ))}

    </>
  )
}

export default ServicesContainer