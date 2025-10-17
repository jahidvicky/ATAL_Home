import React, { useEffect, useState } from "react";
import API, { IMAGE_URL } from "../../API/Api";
import { useLocation } from "react-router-dom";

const FramePreview = ({ onProductLoaded }) => {
  const [product, setProduct] = useState(null);
  const location = useLocation();
  const { ID } = location.state;

  const fetchProducts = async () => {
    try {
      const res = await API.get(`/getproductbyid/${ID}`);
      const prod = res.data?.product || {};
      setProduct(prod);
      //  send product back to parent
      if (onProductLoaded) {
        onProductLoaded(prod);
      }
    } catch (err) {
      console.error("Failed to fetch product:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [ID]);

  return (
    <div className="w-1/2 flex flex-col justify-center items-center bg-white p-8 shadow-md">
      {/* First Image only */}
      {product?.product_image_collection?.[0] ? (
        <img
          src={`${IMAGE_URL}${product.product_image_collection[0]}`}
          alt={product?.product_name || "Frame"}
          className="w-72 h-auto"
        />
      ) : (
        <p>Loading...</p>
      )}

      {/* Product Info */}
      <div className="mt-4 text-sm text-gray-600">{product?.product_name}</div>
      <div className="text-xs text-gray-400">
        Frame size: {product?.product_frame_fit || "N/A"}
      </div>
      <div className="text-sm text-blue-600 font-semibold mt-2">
        Price: ${product?.product_sale_price || "0.00"}
      </div>
    </div>
  );
};

export default FramePreview;
