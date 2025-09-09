import React from "react";
import Slider from "react-slick";
import { FiArrowRight } from "react-icons/fi";
import { useState } from "react";
import { useEffect } from "react";
import API, { IMAGE_URL } from "../../API/Api";
import { Link } from "react-router-dom";

const Trending = () => {
  const [reviews, setReviews] = useState([{}]);
  const fetchReviews = async () => {
    try {
      const res = await API.get("/getProducts/currently trending/trending");

      setReviews(res.data || []);
    } catch (err) {
      console.error("Failed to fetch reviews:", err);
    }
  };
  useEffect(() => {
    fetchReviews();
  }, []);

  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className="py-12 md:px-24 px-6 bg-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-black ml-2">
          Currently Trending
        </h2>
        <Link to="/allproduct"
          state={{
            category: reviews[0].cat_sec,
            subcategory: reviews[0].subCategoryName
          }}>
          <button className="flex items-center gap-4 text-white font-medium bg-red-600 px-4 py-2 rounded mr-1 hover:bg-black transition-colors duration-300 hover:cursor-pointer">
            FIND MORE
            <span className="bg-white text-black p-1 rounded-full">
              <FiArrowRight size={16} className="hover:rotate-[-40deg]" />
            </span>
          </button>
        </Link>
      </div>

      <Slider {...settings}>
        {reviews.map((item, index) => (
          <div key={index} className="px-2 mb-4">
            <Link to="/cart" state={{ ID: item._id }}>
              <div className="border border-red-600 rounded-lg shadow-2xl hover:shadow-red-500 transition-all text-center p-4 h-full hover:cursor-pointer shadow-white">
                {item.product_image_collection &&
                  item.product_image_collection.length > 0 ? (
                  <img
                    src={
                      item.product_image_collection[0].startsWith("http")
                        ? item.product_image_collection[0]
                        : `${IMAGE_URL + item.product_image_collection[0]}`
                    }
                    alt={item.product_name}
                    className="w-full h-36 object-contain mb-4 hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                )
                  : (
                    "No Images"
                  )
                }
                <p className="text-xl font-semibold tracking-wide text-red-600 capitalize">
                  {item.product_name}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default Trending;
