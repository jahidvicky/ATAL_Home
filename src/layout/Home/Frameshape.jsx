import React from 'react'
import API, { IMAGE_URL } from '../../API/Api';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';


const Frameshape = () => {
  const [subCategory, setSubCategory] = useState([]);

  const getSubCategoryById = async () => {
    try {
      const subCat = await API.get("/getSubCatByCatId/68c8f082a02c3f5cdffeb182")
      setSubCategory(subCat.data.subcategories)
    } catch (err) {
      console.log(err)
    }
  }


  useEffect(() => {
    getSubCategoryById();
  }, [])

  return (
    <div>
      <div className="bg-ray text-center py-10">
        <h2 className="text-3xl font-semibold">Shop by Frame Shape</h2>
        <hr className="w-86 mt-2 mb-4 mx-auto border-black"></hr>
        <p className="text-gray-700 text-xl mx-6">
          Choose the perfect frames for your face or your style.
        </p>
        <div className="flex justify-between md:mx-26 mt-6 flex-wrap gap-y-4 mx-12">
          {subCategory.map((data, idx) => (
            <Link to="/allProduct"
              key={idx}
              state={{
                category: data.cat_sec,
                subcategory: data.subCategoryName
              }}
            >
              <div key={idx}>
                <img src={IMAGE_URL + data.image} className='hover:scale-120 hover:cursor-pointer' loading='lazy' decoding='async'
                  alt={data.subCategoryName} />
                <h1 className='mt-2'>{data.subCategoryName}</h1>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Frameshape