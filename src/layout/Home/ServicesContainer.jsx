import React, { useState, useEffect } from 'react'
import { FaArrowRight } from "react-icons/fa";
import ServicesContaineHead from './service-head-cont/ServicesContainerHead'
import { useNavigate } from 'react-router-dom';
import API, { IMAGE_URL } from '../../API/Api';

const ServicesContainer = () => {
  const [eyeServices, setEyeServices] = useState([]);
  const navigate = useNavigate();

  // Define routes for each service heading
  const serviceRoutes = {
    "Eye Wear Glasses": "/eye-services/eye-wear-glass",
    "Contact Lens": "/eye-services/contact-lens",
    "Eye Exam": "/eye-services/eye-exam",
    "Promotions": "/eye-services/promotions",
    "Brands": "/eye-services/brands",
    "Optometrists": "/eye-services/optometrists",
    "Insurance Claims": "/eye-services/insurance-claims",
    "Blue Light Technology": "/eye-services/blue-light-technology",
  };

  // Fetch service data
  const fetchEyeServices = async () => {
    try {
      const response = await API.get("/getEyeService");
      setEyeServices(response.data.EyeServiceData || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEyeServices();
  }, []);

  return (
    <>
      {eyeServices.map((data, index) => (
        <ServicesContaineHead
          key={index}
          icon={IMAGE_URL + data.image}
          headText={data.heading}
          content={data.description}
          arrow={
            <FaArrowRight
              className="cursor-pointer hover:text-white transition"
              onClick={() =>
                navigate(serviceRoutes[data.heading] || "/eye-services")
              }
            />
          }
        />
      ))}
    </>
  );
};

export default ServicesContainer;
