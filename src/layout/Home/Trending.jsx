import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { FiArrowRight } from "react-icons/fi";
import API, { IMAGE_URL } from "../../API/Api";
import { Link } from "react-router-dom";
import { useRecentlyViewed } from "../../page/collections/RecentlyViewedContext";
import StockAvailability from "../../page/collections/StockAvailability";

const Trending = () => {
  const [reviews, setReviews] = useState([{}]);
  const { handleProductClick } = useRecentlyViewed();
  const fetchReviews = async () => {
    try {
      const res = await API.get(
        "/products/68caa6d4d72068a7d3a0f097/68cae51cafa3c181c5dfeab5"
      );
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
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section className="py-12 md:px-24 px-6 bg-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-black ml-2">
          Currently Trending
        </h2>
        {reviews.length > 0 && (
          <Link
            to={`/allProduct/${reviews[0]?.subCategoryName}/${reviews[0]?.cat_id}/${reviews[0]?.subCat_id}`}
          >
            <button className="flex items-center gap-4 text-white font-medium bg-red-600 px-4 py-2 rounded mr-1 hover:bg-black transition-colors duration-300 hover:cursor-pointer">
              FIND MORE
              <span className="bg-white text-black p-1 rounded-full">
                <FiArrowRight size={16} className="hover:rotate-[-40deg]" />
              </span>
            </button>
          </Link>
        )}

      </div>

      <Slider {...settings}>
        {reviews.map((item, index) => (
          <div key={index}
            className="px-2 mb-4"
            onClick={() => handleProductClick(item)} >

            <Link
              to={`/product/${item._id}/${item.subCategoryName}/${item.subCat_id}`}>
              <div className="border border-red-600 rounded-lg shadow-2xl hover:shadow-red-500 transition-all text-center p-4 h-full hover:cursor-pointer shadow-white relative">
                <div className="absolute top-4 left-6 z-20">
                  <StockAvailability data={item.stockAvailability} />
                </div>

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
                ) : (
                  "No Images"
                )}
                <p className="text-lg font-semibold tracking-wide text-red-600 capitalize line-clamp-1"> {item.product_name}</p>
              </div>
            </Link>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default Trending;
