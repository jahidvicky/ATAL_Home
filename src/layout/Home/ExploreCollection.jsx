import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../API/Api";

// IMAGES
import blue_violet from "../../assets/newcollection/blue-violet.avif";
import glasses from "../../assets/newcollection/glasses.avif";
import kids from "../../assets/newcollection/kids-glasses.avif";
import sunglasses from "../../assets/newcollection/sunglasses.avif";
import transition from "../../assets/newcollection/transition.avif";
import progressive from "../../assets/newcollection/progressive.avif";

const ExploreCollection = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [collections, setCollections] = useState([]);

  const getAllProducts = async () => {
    try {
      const res = await API.get("/getAllProduct");
      const products = res.data.products || [];

      // CATEGORY IDs
      const GLASSES = "69157332eeb23fa59c7d5326";
      const SUNGLASSES = "6915705d9ceac0cdda41c83f";

      // BUILD COLLECTIONS
      const collectionData = [
        {
          title: "Glasses",
          slug: "glasses",
          image: glasses,
          products: products.filter((p) => p.cat_id === GLASSES),
        },
        {
          title: "Sunglasses",
          slug: "sunglasses",
          image: sunglasses,
          products: products.filter((p) => p.cat_id === SUNGLASSES),
        },
        {
          title: "Transitions",
          slug: "transitions",
          image: transition,
          products: products.filter(
            (p) => p.subCategoryName?.toLowerCase() === "transitions"
          ),
        },
        {
          title: "Blue Violet",
          slug: "blue-violet",
          image: blue_violet,
          products: products.filter(
            (p) => p.subCategoryName?.toLowerCase() === "blue violet"
          ),
        },
        {
          title: "Progressive",
          slug: "progressive",
          image: progressive,
          products: products.filter(
            (p) => p.subCategoryName?.toLowerCase() === "progressive"
          ),
        },
        {
          title: "Kids",
          slug: "kids",
          image: kids,
          products: products.filter(
            (p) => p.subCategoryName?.toLowerCase() === "kids"
          ),
        },
      ];

      setCollections(collectionData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <section className="py-16 md:px-26 px-6 bg-white text-center">
      <h2 className="text-3xl font-bold mb-2">
        Our <span className="text-[#f00000]">Collections</span>
      </h2>
      <hr className="w-80 mx-auto mb-4 border-black" />
      <p className="text-gray-600 mb-10">
        Hand-picked styles for every vision and personality.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 hover:cursor-pointer">
        {collections.map((item, index) => (
          <Link
            key={index}
            to={`/collectionProducts/${item.slug}`}
            state={{ products: item.products }}
          >
            <div className="group relative overflow-hidden rounded-xl shadow hover:shadow-lg transition-all">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-78 object-cover transform group-hover:scale-105 transition duration-300"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-[#f00000] bg-opacity-50 text-white py-3 text-lg font-semibold">
                {item.title}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ExploreCollection;
