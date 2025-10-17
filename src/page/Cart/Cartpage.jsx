import React, { useState } from "react";
import OurPromise from "./OurPromise";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import Insurance from "./Insurance";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import API, { IMAGE_URL } from "../../API/Api";
import Swal from "sweetalert2";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import ContactLensPage from "./ContactLensPage";
import { Link } from "react-router-dom";

const Cartpage = () => {
  const location = useLocation();
  const { ID, subcategory } = location.state;
  const [product, setProduct] = useState({});
  const [mainImage, setMainImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  // const [subCategory, setSubCategory] = useState([]);
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [lensDetails, setLensDetails] = useState(null);
  const isLensSelected = !!lensDetails; // true if lens is already

  // --- STEP 1: Price helper and computed frame/original prices ---
  const parsePrice = (p) => {
    if (p === undefined || p === null || p === "") return 0;
    const n = Number(String(p).replace(/[^0-9.-]+/g, ""));
    return Number.isFinite(n) ? n : 0;
  };

  const originalPrice = parsePrice(
    product.product_price ?? product.product_sale_price ?? 0
  );

  const [selectedSize, setSelectedSize] = useState([]);
  const [selectedColor, setSelectedColor] = useState([]);

  const totalPrice = selectedPolicy
    ? Number(product.product_sale_price)
    : Number(product.product_sale_price);

  const dispatch = useDispatch();
  const product1 = {
    id: ID,
    name: product.product_name,
    selectedSize,
    selectedColor,
    price: product.discountedPrice ?? product.product_sale_price,
    originalPrice,
    image: mainImage,
    lens: lensDetails || null,
    policy: selectedPolicy || null,
    subCat_id: subcategory,
  };

  const fetchProducts = async () => {
    try {
      const res = await API.get(`/getproductbyid/${ID}`);
      const prod = res.data.product || {};

      setProduct(prod);
      if (prod.product_image_collection?.length > 0) {
        setMainImage(`${IMAGE_URL + prod.product_image_collection[0]}`);
        setGalleryImages(
          prod.product_image_collection.map((img) => `${IMAGE_URL + img}`)
        );
      }
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  };

  useEffect(() => {
    const storedLens = localStorage.getItem("lensSelectionDetails");
    if (storedLens) {
      setLensDetails(JSON.parse(storedLens));
    }
  }, []);

  // Example in Cartpage.jsx
  const lensSelectionDetails = JSON.parse(
    localStorage.getItem("lensSelectionDetails")
  );

  // Safely get the total price
  const lensTotalPrice = lensSelectionDetails?.totalPrice || 0;

  // Toggle wishlist (add/remove)
  const toggleWishlist = async (productId) => {
    const userId2 = localStorage.getItem("user");
    try {
      if (wishlist.includes(productId)) {
        await API.delete("/removeWishlist", {
          data: { userId: userId2, productId },
        });
        setWishlist((prev) => prev.filter((id) => id !== productId));
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "error",
          title: "Removed from wishlist",
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
        });
      } else {
        await API.post("/addWishlist", { userId: userId2, productId });
        setWishlist((prev) => [...prev, productId]);
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: "Added in wishlist",
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
        });
      }
    } catch (err) {
      console.error("Wishlist toggle failed:", err);
    }
  };

  const fetchWishlist = async () => {
    try {
      const userId2 = localStorage.getItem("user");
      const res = await API.get(`/getWishlist/${userId2}`);

      const validProducts =
        res.data?.products?.filter((p) => p.productId) || [];
      setWishlist(validProducts.map((p) => p.productId._id));
    } catch (err) {
      console.error("Failed to fetch wishlist:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchWishlist();
    // fetchProductCategory();
  }, []);

  const toggleSize = (size) => {
    // If the clicked size is already selected, deselect it
    if (selectedSize === size) {
      setSelectedSize(null);
    } else {
      // Select the clicked size
      setSelectedSize(size);
    }
  };

  const contactLensSubCatId = "68caa86cd72068a7d3a0f0bf"; // your Contact Lenses ID

  return (
    <>
      {subcategory === contactLensSubCatId ? (
        <ContactLensPage />
      ) : (
        <div>
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
                  </div>
                  <div
                    className="text-3xl font-semibold"
                    onClick={() => toggleWishlist(product._id)}
                  >
                    {wishlist.includes(product._id) ? (
                      <AiFillHeart className="fill-red-500 hover:cursor-pointer text-4xl" />
                    ) : (
                      <AiOutlineHeart className="fill-gray-500 hover:cursor-pointer text-4xl" />
                    )}
                  </div>
                </div>

                <div>
                  <label className="text-xl font-medium">Size:</label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {(product.product_size || []).map((size) =>
                      size
                        .replace(/,/g, "") // remove commas
                        .split("")
                        .map((letter, idx) => {
                          const key = size + idx; // unique key
                          const isSelected = selectedSize === letter; // only one selected at a time
                          return (
                            <div
                              key={key}
                              onClick={() => toggleSize(letter)}
                              className={`px-4 py-2 border rounded cursor-pointer text-center transition-all ${isSelected
                                ? "bg-red-500 text-white border-red-500"
                                : "bg-white text-black border-gray-300 hover:border-red-500"
                                }`}
                            >
                              {letter}
                            </div>
                          );
                        })
                    )}
                  </div>
                  <div className="mt-2">
                    <p>
                      Selected Size:{" "}
                      {Array.isArray(selectedSize)
                        ? selectedSize
                        : selectedSize || "None"}
                    </p>
                  </div>
                </div>

                {/* Color */}
                <div>
                  <label className="font-medium text-xl mb-2 block">
                    Available Colors
                  </label>
                  <div className="flex space-x-2 mt-1">
                    {(product.product_color || [])
                      .flatMap((c) => c.split(",")) // split comma-separated string into array
                      .map((color, index) => (
                        <span
                          key={index}
                          onClick={() => setSelectedColor(color.trim())} // trim extra spaces
                          style={{ backgroundColor: color.trim() }}
                          className={`w-6 h-6 rounded-full cursor-pointer transition-all
            ${selectedColor === color.trim()
                              ? "border-2 border-red-500"
                              : "border border-gray-300"
                            }
          `}
                        ></span>
                      ))}
                  </div>
                </div>

                {lensDetails && (
                  <div className="mt-6 p-4 border rounded bg-gray-50 relative">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-semibold">Selected Lenses</h3>

                      <div className="flex ">
                        <Link to="lens-selection-flow" state={{ ID: ID }}>
                          <button className="text-gray-500 text-sm font-sm hover:underline transition-colors px-2 py-2 hover:cursor-pointer">
                            Edit
                          </button>
                        </Link>

                        <button
                          onClick={() => {
                            localStorage.removeItem("lensSelectionDetails");
                            setLensDetails(null);
                            Swal.fire({
                              toast: true,
                              position: "top-end",
                              icon: "info",
                              title: "Lens selection removed!",
                              showConfirmButton: false,
                              timer: 1500,
                            });
                          }}
                          className="text-red-600 text-sm font-sm hover:underline transition-colors px-2 py-2 hover:cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    </div>

                    <p>
                      <strong>Vision Need:</strong>{" "}
                      {lensDetails.lens.selectedLens}
                    </p>
                    <p>
                      <strong>Prescription:</strong>{" "}
                      {lensDetails.lens.selectedLens ===
                        "Non-prescription lenses"
                        ? "Not required"
                        : lensDetails.lens.prescriptionMethod || "Not provided"}
                    </p>
                    <p>
                      <strong>Lens Type:</strong>{" "}
                      {lensDetails.lens.lensType?.name || "Clear lenses"}{" "}
                      {lensDetails.lens.lensType?.price && (
                        <span className="text-blue-600">
                          {lensDetails.lens.lensType.price}
                        </span>
                      )}
                    </p>
                    {lensDetails.lens.lensType?.name === "Sun lenses" &&
                      lensDetails.lens.tint && (
                        <p>
                          <strong>Tint:</strong> {lensDetails.lens.tint.name}{" "}
                          <span className="text-blue-600">
                            {lensDetails.lens.tint.price}
                          </span>
                        </p>
                      )}
                    {lensDetails.lens.thickness && (
                      <p>
                        <strong>Thickness:</strong>{" "}
                        {lensDetails.lens.thickness.name}{" "}
                        <span className="text-blue-600">
                          {lensDetails.lens.thickness.price}
                        </span>
                      </p>
                    )}
                    {lensDetails.lens.enhancement && (
                      <p>
                        <strong>Finishings:</strong>{" "}
                        {lensDetails.lens.enhancement.name}{" "}
                        <span className="text-blue-600">
                          {lensDetails.lens.enhancement.price}
                        </span>
                      </p>
                    )}

                    {/* Lens Total Price */}
                    <p className="mt-2 font-semibold">
                      <strong>Lens Total:</strong> ${lensTotalPrice.toFixed(2)}
                    </p>
                  </div>
                )}

                {/* Insurance */}
                <Insurance onPolicySelect={setSelectedPolicy} />

                {/* Price and Add to Cart Button */}
                <div className="space-y-2 mt-4 bg-gray-200">
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-bold m-5">FRAME</p>
                    <div className="flex">
                      <p className="text-lg font-bold mr-8 line-through">
                        ${product.product_price} CAD
                      </p>
                      <p className="text-lg font-bold mr-8">
                        $
                        {product.discountedPrice
                          ? product.discountedPrice
                          : product.product_sale_price}{" "}
                        CAD
                      </p>
                    </div>
                  </div>

                  <Link to="lens-selection-flow" state={{ ID: ID }}>
                    <button
                      className={`${isLensSelected
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-black hover:bg-gray-900"
                        } text-white px-42 py-3 mb-4 rounded ml-10 text-xl border-1 border-black w-115 hover:cursor-pointer`}
                      disabled={isLensSelected}
                    >
                      {isLensSelected ? "Lens Selected" : "SELECT LENS"}
                    </button>
                  </Link>

                  {product.stockAvailability > 0 ? (
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
                      className="bg-red-600 text-white px-42 py-3 mb-4 rounded hover:bg-red-800 ml-10 text-xl border-1 border-black hover:cursor-pointer"
                    >
                      ADD TO CART
                    </button>
                  ) : (
                    <button
                      disabled
                      className="bg-gray-400 text-white px-42 py-3 mb-4 rounded ml-10 text-xl border-1 border-gray-300 cursor-not-allowed"
                    >
                      OUT OF STOCK
                    </button>
                  )}
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
                {product.product_frame_material || product.frame_material}
              </li>
              <li>
                <strong>Frame Shape: </strong>
                {product.product_frame_shape || product.frame_shape}
              </li>
              <li>
                <strong>Frame Colour: </strong>
                {product.product_frame_color || product.frame_color}
              </li>
              <li>
                <strong>Fit: </strong>
                {product.product_frame_fit || product.frame_fit}
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
        </div>
      )}

      <div className="bg-stone-900"></div>
      <OurPromise />
    </>
  );
};

export default Cartpage;
