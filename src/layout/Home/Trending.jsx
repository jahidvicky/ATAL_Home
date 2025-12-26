import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { FiArrowRight } from "react-icons/fi";
import API, { IMAGE_URL } from "../../API/Api";
import { Link } from "react-router-dom";
import { useRecentlyViewed } from "../../page/collections/RecentlyViewedContext";

const Trending = () => {
  const [reviews, setReviews] = useState([]);
  const { handleProductClick } = useRecentlyViewed();

  const fetchTrendingProducts = async () => {
    try {
      const res = await API.get("/getTrendingProduct");
      setReviews(res.data.products || []);
    } catch (err) {
      console.error("Failed to fetch trending products:", err);
    }
  };

  useEffect(() => {
    fetchTrendingProducts();
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
    // Always return a valid element
    customPaging: () => <button></button>,

    // Limit visible dots to 4
    appendDots: dots => (
      <ul>
        {dots.slice(0, 5)}
      </ul>
    ),
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  const resolveImgSrc = (img) => {
    if (!img) return null;
    return img.startsWith("http") ? img : `${IMAGE_URL}${img}`;
  };

  const getStockStatus = (item) => {
    const qty =
      item.availableStock ??
      item.availableQty ??
      item.finishedStock ??
      item.stockAvailability ??
      0;

    return qty > 0;
  };


  return (
    <section className="py-12 md:px-24 px-6 bg-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-black ml-2">
          Currently Trending
        </h2>

        {reviews.length > 0 && (
          <Link to="/products/collection/trending">
            <button className="flex items-center gap-4 text-white font-medium bg-[#f00000] px-4 py-2 rounded mr-1 hover:bg-black transition-colors duration-300 hover:cursor-pointer">
              FIND MORE
              <span className="bg-white text-black p-1 rounded-full">
                <FiArrowRight size={16} />
              </span>
            </button>
          </Link>
        )}
      </div>

      {/* If no trending products */}
      {reviews.length === 0 ? (
        <p className="text-center text-gray-500 text-lg py-10">
          No Trending Products Available Right Now
        </p>
      ) : (
        <Slider {...settings}>
          {reviews.map((item, index) => (
            <div
              key={index}
              className="px-2 mb-4"
              onClick={() => handleProductClick(item)}
            >
              <Link to={`/product/${item._id}/${item.subCategoryName}/${item.subCat_id}`}>
                <div className="border border-red-600 rounded-lg shadow-2xl hover:shadow-red-500 transition-all text-center p-4 h-full hover:cursor-pointer shadow-white relative">

                  {/* Stock Badge */}
                  {(
                    (item?.availableStock ??
                      item?.availableQty ??
                      item?.finishedStock ??
                      item?.stockAvailability ??
                      0) > 0
                  ) ? (
                    <span className="absolute top-3 left-3 bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      In stock
                    </span>
                  ) : (
                    <span className="absolute top-3 left-3 bg-gray-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      Out of stock
                    </span>
                  )}

                  {/* Image: prefer variant image, then product_image_collection, then fallback */}
                  {(() => {
                    const variantImg = item.product_variants?.[0]?.images?.[0] || null;
                    const collectionImg = item.product_image_collection?.[0] || null;
                    const imgToShow = variantImg || collectionImg;

                    if (!imgToShow) {
                      return (
                        <div className="w-full h-36 flex items-center justify-center text-gray-400">
                          No Images
                        </div>
                      );
                    }

                    const finalSrc = resolveImgSrc(imgToShow);

                    return (
                      <img
                        src={finalSrc}
                        alt={item.product_name}
                        className="w-full h-45 object-contain mb-4 hover:scale-103 transition-transform duration-200 p-1"
                        loading="lazy"
                      />
                    );
                  })()}

                  {/* Name */}
                  <p className="text-lg font-semibold tracking-wide text-[#f00000] capitalize line-clamp-1">
                    {item.product_name}
                  </p>
                </div>

              </Link>
            </div>
          ))}
        </Slider>
      )}
    </section>
  );
};

export default Trending;
