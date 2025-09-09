import React, { useState } from "react";
import { CiHeart } from "react-icons/ci";
import OurPromise from "./OurPromise";
import Size from "./Size";
import Color from "./Color";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import Insurance from "./Insurance";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import API, { IMAGE_URL } from "../../API/Api";
// import ReactImageMagnify from 'react-image-magnify';
import Swal from "sweetalert2";

const Cartpage = () => {
  const location = useLocation();
  const { ID } = location.state;
  const [product, setProduct] = useState({});
  const [mainImage, setMainImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);

  const dispatch = useDispatch();
  const product1 = {
    id: ID,
    name: product.product_name,
    price: product.product_sale_price,
    image: mainImage,
  };

  const fetchProducts = async () => {
    try {
      const res = await API.get(`/getproductbyid/${ID}`);
      const prod = res.data.product || {};
      setProduct(prod);
      if (prod.product_image_collection?.length > 0) {
        setMainImage(
          `${IMAGE_URL + prod.product_image_collection[0]}`
        );
        setGalleryImages(
          prod.product_image_collection.map(
            (img) =>
              `${IMAGE_URL + img}`
          )
        );
      }
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <>
      <div className="mt-14">
        <div className="flex flex-col md:flex-row gap-10">
          <div className="flex flex-col ml-10 gap-2">
            {galleryImages.map((img, index) => (
              <button key={index} onMouseEnter={() => setMainImage(img)}>
                <img
                  src={img}
                  alt={`frame-${index}`}
                  className={`w-[100px] hover:cursor-pointer rounded ${mainImage === img ? "ring-2 ring-green-700" : ""
                    }`}
                />
              </button>
            ))}
          </div>

          {mainImage && (
            <div className="flex-1 border-r-1 border-black">
              <img
                src={mainImage}
                alt="Ray-Ban Glasses"
                className="w-full mx-auto mt-10 hover:cursor-pointer"
              />
            </div>
          )}

          {/* Product Info */}
          <div className="flex-1 space-y-4 mr-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-semibold capitalize">
                  {product.product_name}
                </h2>
                <p className="text text-gray-600">{product.product_sku}</p>
              </div>
              <div className="text-3xl font-semibold">
                <CiHeart />
              </div>
            </div>

            {/* Size */}
            <Size />

            {/* Color */}
            <Color />

            {/* Insurance */}
            <Insurance />

            {/* Price and Add to Cart Button */}
            <div className="space-y-2 mt-4 bg-gray-200">
              <div className="flex items-center justify-between">
                <p className="text-lg font-bold m-5">FRAME</p>
                <div className="flex">
                  <p className="text-lg font-bold mr-8 line-through">
                    ${product.product_price}
                  </p>
                  <p className="text-lg font-bold mr-8">
                    ${product.product_sale_price}
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  dispatch(addToCart(product1));
                  Swal.fire({
                    toast: true,
                    position: "top-end",
                    icon: "success",
                    title: "Product added to cart!",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                }}
                className="bg-red-600 text-white px-42 py-3 mb-4 rounded hover:bg-red-800 ml-10 text-xl border-1 border-black"
              >
                ADD TO CART
              </button>
            </div>

            {/* Discount Info */}
            <div className="bg-blue-200 p-3 font-semibold">
              COMPLETE YOUR RAY-BAN WITH 50% OFF ALL LENSES
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}

      <div className="mt-6 ml-10">
        <h3 className="text-2xl font-semibold mb-6">ABOUT THIS PRODUCT</h3>
        <ul className="text-lg space-y-1">
          <li>
            <strong>Frame Material: </strong>
            {product.product_frame_material}
          </li>
          <li>
            <strong>Frame Shape: </strong>
            {product.product_frame_shape}
          </li>
          <li>
            <strong>Frame Colour: </strong>
            {product.product_frame_color}
          </li>
          <li>
            <strong>Fit: </strong>
            {product.product_frame_fit}
          </li>
          <li>
            <strong>Gender: </strong>
            {product.gender}
          </li>
        </ul>
        <p className="mt-4 text-lg">{product.product_description}</p>
      </div>
      {/* Lenses Info */}
      <div className="py-12">
        <div className="mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="text-center">
            <img
              src={`${IMAGE_URL + product.product_lens_image1}`}
              alt={product.product_lens_title1}
              className="mx-auto mb-6 object-cover hover:scale-105"
            />
            <h3 className="text-3xl font-semibold mb-4">
              {product.product_lens_title1}
            </h3>
            <p>{product.product_lens_description1}</p>
          </div>

          <div className="text-center">
            <img
              src={`${IMAGE_URL + product.product_lens_image2}`}
              alt={product.product_lens_title2}
              className="mx-auto mb-6 object-cover hover:scale-105"
            />
            <h3 className="text-3xl font-semibold mb-4">
              {product.product_lens_title2}
            </h3>
            <p>{product.product_lens_description1}</p>
          </div>
        </div>
      </div>

      <div className="bg-stone-900"></div>
      <OurPromise />
    </>
  );
};

export default Cartpage;
