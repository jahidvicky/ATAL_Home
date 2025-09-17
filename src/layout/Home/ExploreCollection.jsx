import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import API, { IMAGE_URL } from "../../API/Api";

const ExploreCollection = () => {
  const [ourCollection, setOurCollection] = useState([]);
  const [heading, setHeading] = useState("");

  const getOurCollection = async () => {
    try {
      const res = await API.get(
        "/getSubCatByCatId/68caa6abd72068a7d3a0f090"
      );
      setOurCollection(res.data.subcategories);
      setHeading(res.data.subcategories[0].cat_sec);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getOurCollection();
  }, []);


  return (
    <section className="py-16 md:px-26 px-6 bg-white text-center">
      <h2 className="text-3xl font-bold mb-2">Our
        <span className="text-red-600"> Collections</span>
      </h2>
      <hr className="w-80 mx-auto mb-4 border-black"></hr>
      <p className="text-gray-600 mb-10">
        Hand-picked styles for every vision and personality.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 hover:cursor-pointer">
        {ourCollection.map((item, index) => (
          <Link
            key={index}
            to="/allproduct"
            state={{
              category: item.cat_id,
              subcategory: item._id,
            }}
          >
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl shadow hover:shadow-lg transition-all"
            >
              <img
                src={IMAGE_URL + item.image}
                alt={item.description}
                loading="lazy"
                decoding="async"
                className="w-full h-78 object-cover transform group-hover:scale-105 transition duration-300"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-red-600 bg-opacity-50 text-white py-3 text-lg font-semibold">
                {item.description}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ExploreCollection;
