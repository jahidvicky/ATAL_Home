import React, { useState, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import { useParams } from "react-router-dom";
import API, { IMAGE_URL } from "../../API/Api";
import Swal from "sweetalert2";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import Insurance from "./Insurance";

const ContactLensPage = () => {
  const { ID } = useParams();
  const [product, setProduct] = useState({});
  const [mainImage, setMainImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [selectedColor, setSelectedColor] = useState([]);
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [selectedPack, setSelectedPack] = useState(null);

  const [formData, setFormData] = useState({
    od_selected: true,
    os_selected: true,
    od_sphere: "",
    od_addition: "Low",
    os_sphere: "",
    os_addition: "Low",
    quantity_od: 1,
    quantity_os: 1,
    purchase_type: "One-time",
  });

  const sphereOptions = [
    "-9.00", "-8.75", "-8.50", "-8.25", "-8.00", "-7.75", "-7.50", "-7.25", "-7.00", "-6.75",
    "-6.50", "-6.25", "-6.00", "-5.75", "-5.50", "-5.25", "-5.00", "-4.75", "-4.50", "-4.25",
    "-4.00", "-3.75", "-3.50", "-3.25", "-3.00", "-2.75", "-2.50", "-2.25", "-2.00", "-1.75",
    "-1.50", "-1.25", "-1.00", "-0.75", "-0.50", "-0.25", "+0.25", "+0.50", "+0.75", "+1.00",
    "+1.25", "+1.50", "+1.75", "+2.00", "+2.25", "+2.50", "+2.75", "+3.00", "+3.25", "+3.50",
    "+3.75", "+4.00", "+4.25", "+4.50", "+4.75", "+5.00", "+5.25", "+5.50", "+5.75", "+6.00",
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelect = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      icon: "success",
      title: "Done!",
      text: "Form Submitted! Check console for data.\n\nProduct: ACUVUE® OASYS MAX 1-Day Multifocal 90\nBase Curve: 8.4 mm\nDiameter: 14.3 mm\nMaterial: Senofilcon A\nWater Content: 38%\nLens Type: Daily Multifocal",
      timer: 2000,
      showConfirmButton: false,
    });
  };

  const dispatch = useDispatch();
  const handleAddToCart = () => {
    const cartItem = {
      id: product._id,
      name: product.product_name,
      price:
        selectedPack !== null
          ? Number(lensPacks[selectedPack].salePrice)
          : Number(product.product_sale_price ?? product.product_price ?? 0),

      oldPrice:
        selectedPack !== null
          ? Number(lensPacks[selectedPack].oldPrice)
          : Number(product.product_price ?? 0),

      pack: selectedPack !== null ? lensPacks[selectedPack] : null,


      pack: selectedPack !== null ? lensPacks[selectedPack] : null,
      image: mainImage,
      cat_id: product.cat_id,
      subCat_id: product.subCat_id,
      selectedColor: selectedColor,
      quantity: 1,
      policy: selectedPolicy || null,
      vendorID: product.vendorID || product.vendorId || null,
      lens: {
        prescription: {
          od_sphere: formData.od_sphere,
          od_addition: formData.od_addition,
          os_sphere: formData.os_sphere,
          os_addition: formData.os_addition,
          od_selected: formData.od_selected || false,
          os_selected: formData.os_selected || false,
          prescriptionDate: formData.prescriptionDate,
          doctorName: formData.doctorName,
          purchase_type: formData.purchase_type,
        },
        totalPrice: product.product_sale_price,
      },
    };

    dispatch(addToCart(cartItem));

    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: "Product added to cart!",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const normalizeUrl = (path) => {
    if (!path) return "";
    return path.startsWith("http")
      ? path
      : `${IMAGE_URL.replace(/\/+$/, "")}/${String(path).replace(/^\/+/, "")}`;
  }; // Build absolute URLs and avoid double slashes. [web:59]

  const fetchProducts = async () => {
    try {
      const res = await API.get(`/getproductbyid/${ID}`);
      const prod = res.data.product || {};
      setProduct(prod);

      //  UNIVERSAL image loader
      let images = [];

      // 1. Variant images
      if (prod.product_variants?.[0]?.images?.length) {
        images = prod.product_variants[0].images.map((img) => normalizeUrl(img));
      }

      // 2. product_image_collection
      if (images.length === 0 && prod.product_image_collection?.length) {
        images = prod.product_image_collection.map((img) => normalizeUrl(img));
      }

      // 3. single product_image
      if (images.length === 0 && prod.product_image) {
        images = [normalizeUrl(prod.product_image)];
      }

      // 4. final set
      setGalleryImages(images);
      setMainImage(images[0] || null);

      // 5. last fallback
      if (!images.length) {
        setGalleryImages(["/no-image.png"]);
        setMainImage("/no-image.png");
      }

    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  };


  // Toggle wishlist (add/remove)
  const toggleWishlist = async (productId) => {
    const userId2 = localStorage.getItem("user");
    try {
      if (wishlist.includes(productId)) {
        await API.delete("/removeWishlist", { data: { userId: userId2, productId } });
        setWishlist((prev) => prev.filter((id) => id !== productId));
        Swal.fire({ toast: true, position: "top-end", icon: "error", title: "Removed from wishlist", showConfirmButton: false, timer: 1500, timerProgressBar: true });
      } else {
        await API.post("/addWishlist", { userId: userId2, productId });
        setWishlist((prev) => [...prev, productId]);
        Swal.fire({ toast: true, position: "top-end", icon: "success", title: "Added in wishlist", showConfirmButton: false, timer: 1500, timerProgressBar: true });
      }
    } catch (err) {
      console.error("Wishlist toggle failed:", err);
    }
  }; // Heart button matches Cartpage behavior. [web:59]

  // Fetch wishlist
  const fetchWishlist = async () => {
    try {
      const userId2 = localStorage.getItem("user");
      const res = await API.get(`/getWishlist/${userId2}`);
      setWishlist(res.data?.products.map((p) => p.productId._id) || []);
    } catch (err) {
      console.error("Failed to fetch wishlist:", err);
    }
  }; // Hydrate liked state for PDP icon. [web:59]

  const lensPacks = useMemo(() => {
    return Array.isArray(product.contactLens_packs)
      ? product.contactLens_packs
      : [];
  }, [product]);

  useEffect(() => {
    fetchProducts();
    fetchWishlist();
  }, []);

  // Colors from product.product_color (comma separated or array)
  const availableColors = useMemo(() => {
    const raw = Array.isArray(product.product_color)
      ? product.product_color
      : typeof product.product_color === "string"
        ? [product.product_color]
        : [];
    return raw
      .flatMap((c) => String(c).split(","))
      .map((c) => c.trim())
      .filter(Boolean);
  }, [product]); // Drives color circles identical to Cartpage. [web:59]

  return (
    <>
      <div className="mt-10 px-4 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left column: gallery (thumbnails + hero) */}
          <div className="grid grid-cols-[96px_1fr] gap-4">
            {/* Thumbnails */}
            <div className="flex flex-col gap-3 overflow-auto max-h-[520px] pr-1">
              {galleryImages.map((img, index) => (
                <button
                  key={index}
                  onMouseEnter={() => setMainImage(img)}
                  onFocus={() => setMainImage(img)}
                  className={`rounded-lg border ${mainImage === img ? "border-red-600 ring-2 ring-red-200" : "border-gray-200"
                    } overflow-hidden`}
                >
                  <img
                    src={img}
                    alt={`frame-${index}`}
                    className="w-[90px] h-[90px] object-contain bg-white"
                    loading="lazy"
                    decoding="async"
                  />
                </button>
              ))}
            </div>

            {/* Hero */}
            <div className="relative rounded-xl bg-[#f6fbff] max-h-115 p-4 border border-gray-200">
              <div className="absolute top-3 right-3">
                <button
                  onClick={() => toggleWishlist(product._id)}
                  aria-pressed={wishlist.includes(product._id)}
                  aria-label={wishlist.includes(product._id) ? "Remove from wishlist" : "Add to wishlist"}
                  className="p-2 rounded-full bg-white shadow border"
                >
                  {wishlist.includes(product._id) ? (
                    <AiFillHeart className="text-[#f00000] text-2xl" />
                  ) : (
                    <AiOutlineHeart className="text-gray-500 text-2xl" />
                  )}
                </button>
              </div>

              {mainImage && (
                <img
                  src={mainImage}
                  alt={product.product_name}
                  className="w-full h-[420px] object-contain select-none"
                />
              )}
            </div>
          </div>

          {/* Right column: details + form + CTAs */}
          <div className="space-y-6">
            {/* Title */}
            <div className="flex items-start justify-between">
              <h2 className="text-2xl font-semibold capitalize">{product.product_name}</h2>
            </div>

            {/* Available Colors (same interaction as Cartpage; no renaming) */}
            {availableColors.length > 0 && (
              <div>
                <label className="font-medium text-sm mb-2 block">Available Colors</label>
                <div className="flex space-x-2 mt-1">
                  {availableColors.map((color, index) => (
                    <span
                      key={index}
                      onClick={() => setSelectedColor(color)}
                      style={{ backgroundColor: color }}
                      className={`w-6 h-6 rounded-full cursor-pointer transition-all ${selectedColor === color ? "border-2 border-red-500" : "border border-gray-300"
                        }`}
                      role="radio"
                      aria-checked={selectedColor === color}
                      aria-label={color}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Contact Lens Pack Section */}
            {lensPacks.length > 0 && (
              <div className="p-6 bg-white rounded-2xl shadow-md mt-6">
                <h2 className="text-base font-semibold mb-4">Choose Pack Size</h2>

                <div className="space-y-3">
                  {lensPacks.map((pack, index) => (
                    <div
                      key={index}
                      onClick={() => setSelectedPack(index)}
                      className={`border rounded-xl p-4 cursor-pointer transition-all ${selectedPack === index
                        ? "border-red-600 bg-red-50"
                        : "border-gray-300 bg-white"
                        }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-semibold text-lg">{pack.packSize} Pack</p>

                          {pack.isBestValue && (
                            <span className="text-xs px-2 py-1 bg-yellow-400 text-black rounded ml-2">
                              BEST VALUE
                            </span>
                          )}
                        </div>

                        <div className="text-right">
                          {pack.oldPrice > pack.salePrice && (
                            <p className="line-through text-gray-500 text-sm">
                              {pack.oldPrice}
                            </p>
                          )}
                          <p className="text-xl font-bold">₹{pack.salePrice}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}


            {/* Prescription form (same logic, re-styled) */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="p-6 bg-white rounded-2xl shadow-md">
                <h2 className="text-base font-semibold mb-4">Select Your Prescription</h2>

                {/* Eye Selection */}
                <div className="flex gap-6 mb-6">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="od_selected"
                      checked={formData.od_selected}
                      onChange={handleSelect}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                    />
                    OD (Right)
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="os_selected"
                      checked={formData.os_selected}
                      onChange={handleSelect}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                    />
                    OS (Left)
                  </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* OD */}
                  <div className={`p-4 rounded-lg border ${formData.od_selected ? "opacity-100" : "opacity-50 pointer-events-none"}`}>
                    <h3 className="font-semibold mb-2">OD (Right Eye)</h3>
                    <label className="block text-sm font-medium mb-1">Power / Sphere</label>
                    <select
                      name="od_sphere"
                      value={formData.od_sphere}
                      onChange={handleSelect}
                      disabled={!formData.od_selected}
                      className="border p-2 rounded-lg w-full focus:ring-2 focus:ring-blue-500 mb-3"
                    >
                      <option value="">Select Power</option>
                      {sphereOptions.map((power) => (
                        <option key={power} value={power}>{power}</option>
                      ))}
                    </select>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium">BC</label>
                        <input type="text" value="8.4" disabled className="w-full border p-2 rounded-lg bg-gray-100" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">DIA</label>
                        <input type="text" value="14.2" disabled className="w-full border p-2 rounded-lg bg-gray-100" />
                      </div>
                    </div>
                  </div>

                  {/* OS */}
                  <div className={`p-4 rounded-lg border ${formData.os_selected ? "opacity-100" : "opacity-50 pointer-events-none"}`}>
                    <h3 className="font-semibold mb-2">OS (Left Eye)</h3>
                    <label className="block text-sm font-medium mb-1">Power / Sphere</label>
                    <select
                      name="os_sphere"
                      value={formData.os_sphere}
                      onChange={handleSelect}
                      disabled={!formData.os_selected}
                      className="border p-2 rounded-lg w-full focus:ring-2 focus:ring-blue-500 mb-3"
                    >
                      <option value="">Select Power</option>
                      {sphereOptions.map((power) => (
                        <option key={power} value={power}>{power}</option>
                      ))}
                    </select>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium">BC</label>
                        <input type="text" value="8.4" disabled className="w-full border p-2 rounded-lg bg-gray-100" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">DIA</label>
                        <input type="text" value="14.2" disabled className="w-full border p-2 rounded-lg bg-gray-100" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <hr className="border-gray-200" />

              {/* Date of Prescription */}
              <div className="mb-4">
                <label className="block text-lg font-medium mb-2">
                  Date of Prescription
                </label>
                <input
                  type="date"
                  name="prescriptionDate"
                  value={formData.prescriptionDate}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 text-base"
                />
              </div>

              {/* Doctor Name */}
              <div className="mb-4">
                <label className="block text-lg font-medium mb-2">
                  Doctor Name
                </label>
                <input
                  type="text"
                  name="doctorName"
                  value={formData.doctorName}
                  onChange={handleChange}
                  placeholder="Enter doctor's name"
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 text-base"
                />
              </div>

              <hr className="border-gray-300" />

              {/* Purchase Type */}
              <div className="mb-4">
                <label className="block text-lg font-medium mb-2">
                  Purchase Type
                </label>
                <select
                  id="purchase_type"
                  name="purchase_type"
                  value={formData.purchase_type}
                  onChange={handleChange}
                  className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 text-base"
                >
                  <option value="One-time">One-time Purchase</option>
                  <option value="Subscription">Automatic Delivery (Unsubscribe anytime)</option>
                </select>
              </div>

              <hr className="my-4 border-gray-300" />
            </form>


            {/* Insurance Section */}
            <div>
              <Insurance onPolicySelect={setSelectedPolicy} />
            </div>

            {/* Price and Add to Cart Section */}
            <div className="space-y-2 mt-6 bg-gray-200 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <p className="text-lg font-bold m-2">Lens</p>
                <div className="flex items-center">

                  <div className="flex items-center">

                    {/* OLD PRICE (strike-through) */}
                    {selectedPack !== null ? (
                      lensPacks[selectedPack].oldPrice > lensPacks[selectedPack].salePrice && (
                        <p className="text-lg font-bold mr-8 line-through text-gray-500">
                          ₹{lensPacks[selectedPack].oldPrice}
                        </p>
                      )
                    ) : (
                      product.product_price > product.product_sale_price && (
                        <p className="text-lg font-bold mr-8 line-through text-gray-500">
                          ₹{Number(product.product_price).toFixed(2)}
                        </p>
                      )
                    )}

                    {/* FINAL PRICE */}
                    <p className="text-lg font-bold mr-8 text-black">
                      ₹
                      {selectedPack !== null
                        ? lensPacks[selectedPack].salePrice
                        : Number(product.product_sale_price ?? product.product_price ?? 0).toFixed(2)}
                    </p>

                  </div>


                  <p className="text-lg font-bold mr-8 text-black">
                    ${Number(product.product_sale_price ?? product.product_price ?? 0).toFixed(2)}
                  </p>
                </div>
              </div>
              <button
                onClick={handleAddToCart}
                className="bg-[#f00000] w-full sm:w-[100%] md:w-[100%] lg:w-[100%] xl:w-[100%] text-white px-6 py-4 mt-6 mb-2 rounded-lg hover:bg-red-700 font-semibold text-lg sm:text-xl border border-black transition-all duration-200 mx-auto block"
              >
                ADD TO CART
              </button>
            </div>
          </div>

          {/* Promo bar */}
          <div className="bg-blue-100 text-blue-900 p-3 font-semibold rounded">
            COMPLETE YOUR RAY-BAN WITH 50% OFF ALL LENSES
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="mt-10 ml-10">
        <h3 className="text-2xl font-semibold mb-6">ABOUT THIS PRODUCT</h3>
        <ul className="text-lg space-y-1">
          <li>
            <strong>LENS TYPE: </strong>
            {product.lens_type}
          </li>
          <li>
            <strong>MATERIAL: </strong>
            {product.material}
          </li>
          <li>
            <strong>MANUFACTURER: </strong>
            {product.manufacturer}
          </li>
          <li>
            <strong>WATER % OF CONTENT: </strong>
            {product.water_content}
          </li>
          <li>
            <strong>Gender: </strong>
            {product.gender}
          </li>
        </ul>
        {product.product_description && (
          <p className="mt-4 mb-10 text-lg">{product.product_description}</p>
        )}
      </div>

      <div className="bg-stone-900"></div>
    </>
  );
};

export default ContactLensPage;
