import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import API, { IMAGE_URL } from "../../API/Api";
import Swal from "sweetalert2";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import Insurance from "./Insurance";

const ContactLensPage = () => {
  const location = useLocation();
  const { ID } = location.state;
  const [product, setProduct] = useState({});
  const [mainImage, setMainImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [selectedColor, setSelectedColor] = useState([]);
    const [selectedPolicy, setSelectedPolicy] = useState(null);

  const [formData, setFormData] = useState({
    // od_selected: true,
    // os_selected: true,
    od_sphere: "",
    od_addition: "Low",
    os_sphere: "",
    os_addition: "Low",
    quantity_od: 1,
    quantity_os: 1,
    purchase_type: "One-time",
  });

  const sphereOptions = [
    "-9.00",
    "-8.75",
    "-8.50",
    "-8.25",
    "-8.00",
    "-7.75",
    "-7.50",
    "-7.25",
    "-7.00",
    "-6.75",
    "-6.50",
    "-6.25",
    "-6.00",
    "-5.75",
    "-5.50",
    "-5.25",
    "-5.00",
    "-4.75",
    "-4.50",
    "-4.25",
    "-4.00",
    "-3.75",
    "-3.50",
    "-3.25",
    "-3.00",
    "-2.75",
    "-2.50",
    "-2.25",
    "-2.00",
    "-1.75",
    "-1.50",
    "-1.25",
    "-1.00",
    "-0.75",
    "-0.50",
    "-0.25",
    "+0.25",
    "+0.50",
    "+0.75",
    "+1.00",
    "+1.25",
    "+1.50",
    "+1.75",
    "+2.00",
    "+2.25",
    "+2.50",
    "+2.75",
    "+3.00",
    "+3.25",
    "+3.50",
    "+3.75",
    "+4.00",
    "+4.25",
    "+4.50",
    "+4.75",
    "+5.00",
    "+5.25",
    "+5.50",
    "+5.75",
    "+6.00",
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
      price: product.product_sale_price,
      image: mainImage,
      subCat_id: product.subCat_id,
      selectedColor: selectedColor,
      quantity: 1, // default quantity
       policy: selectedPolicy || null,
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

  // Fetch wishlist
  const fetchWishlist = async () => {
    try {
      const userId2 = localStorage.getItem("user");
      const res = await API.get(`/getWishlist/${userId2}`);
      setWishlist(res.data?.products.map((p) => p.productId._id) || []);
    } catch (err) {
      console.error("Failed to fetch wishlist:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchWishlist();
  }, []);

  return (
    <>
      <div>
        <div className="mt-14">
          <div className="flex flex-col md:flex-row gap-10">
            <div className="flex flex-col ml-10 gap-2">
              {galleryImages.map((img, index) => (
                <button key={index} onMouseEnter={() => setMainImage(img)}>
                  <img
                    src={img}
                    alt={`frame-${index}`}
                    className={`w-[100px] hover:cursor-pointer rounded ${
                      mainImage === img ? "ring-2 ring-green-700" : ""
                    }`}
                  />{" "}
                </button>
              ))}{" "}
            </div>
            {mainImage && (
              <div className="flex-1 border-r-1 border-black">
                {" "}
                <img
                  src={mainImage}
                  alt="Ray-Ban Glasses"
                  className="w-full mx-auto mt-10 hover:cursor-pointer"
                />{" "}
              </div>
            )}
            {/* Product Info */}{" "}
            <div className="flex-1 space-y-4 mr-6">
              {" "}
              <div className="flex items-center justify-between">
                {" "}
                <div>
                  {" "}
                  <h2 className="text-3xl font-semibold capitalize">
                    {" "}
                    {product.product_name}{" "}
                  </h2>{" "}
                </div>{" "}
                <div
                  className="text-3xl font-semibold"
                  onClick={() => toggleWishlist(product._id)}
                >
                  {" "}
                  {wishlist.includes(product._id) ? (
                    <AiFillHeart className="fill-red-500 hover:cursor-pointer text-4xl" />
                  ) : (
                    <AiOutlineHeart className="fill-gray-500 hover:cursor-pointer text-4xl" />
                  )}{" "}
                </div>{" "}
              </div>
              {/* Color */}
              <div>
                <label className="font-medium text-xl mb-2 mt-5 block">
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
            ${
              selectedColor === color.trim()
                ? "border-2 border-red-500"
                : "border border-gray-300"
            }
          `}
                      ></span>
                    ))}
                </div>
              </div>
              <form onSubmit={handleSubmit} className="space-y-6">
                {" "}
                {/* Right Eye */}
                <div className="p-6 bg-white rounded-2xl shadow-md max-w-2xl mx-auto">
                  <h2 className="text-xl font-semibold mb-4">
                    Select Your Prescription
                  </h2>

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
                    {/* OD Right Eye */}
                    <div
                      className={`p-4 rounded-lg border ${
                        formData.od_selected
                          ? "opacity-100"
                          : "opacity-50 pointer-events-none"
                      }`}
                    >
                      <h3 className="font-semibold mb-2">OD (Right Eye)</h3>
                      <label className="block text-sm font-medium mb-1">
                        Power / Sphere
                      </label>
                      <select
                        name="od_sphere"
                        value={formData.od_sphere}
                        onChange={handleSelect}
                        disabled={!formData.od_selected}
                        className="border p-2 rounded-lg w-full focus:ring-2 focus:ring-blue-500 mb-3"
                      >
                        <option value="">Select Power</option>
                        {sphereOptions.map((power) => (
                          <option key={power} value={power}>
                            {power}
                          </option>
                        ))}
                      </select>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium">
                            BC
                          </label>
                          <input
                            type="text"
                            value="8.4"
                            disabled
                            className="w-full border p-2 rounded-lg bg-gray-100"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">
                            DIA
                          </label>
                          <input
                            type="text"
                            value="14.2"
                            disabled
                            className="w-full border p-2 rounded-lg bg-gray-100"
                          />
                        </div>
                      </div>
                    </div>

                    {/* OS Left Eye */}
                    <div
                      className={`p-4 rounded-lg border ${
                        formData.os_selected
                          ? "opacity-100"
                          : "opacity-50 pointer-events-none"
                      }`}
                    >
                      <h3 className="font-semibold mb-2">OS (Left Eye)</h3>
                      <label className="block text-sm font-medium mb-1">
                        Power / Sphere
                      </label>
                      <select
                        name="os_sphere"
                        value={formData.os_sphere}
                        onChange={handleSelect}
                        disabled={!formData.os_selected}
                        className="border p-2 rounded-lg w-full focus:ring-2 focus:ring-blue-500 mb-3"
                      >
                        <option value="">Select Power</option>
                        {sphereOptions.map((power) => (
                          <option key={power} value={power}>
                            {power}
                          </option>
                        ))}
                      </select>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium">
                            BC
                          </label>
                          <input
                            type="text"
                            value="8.4"
                            disabled
                            className="w-full border p-2 rounded-lg bg-gray-100"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">
                            DIA
                          </label>
                          <input
                            type="text"
                            value="14.2"
                            disabled
                            className="w-full border p-2 rounded-lg bg-gray-100"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
                {/* Date of Prescription */}
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Date of Prescription
                  </label>
                  <input
                    type="date"
                    name="prescriptionDate"
                    value={formData.prescriptionDate}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                {/* Doctor Name */}
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Doctor Name
                  </label>
                  <input
                    type="text"
                    name="doctorName"
                    value={formData.doctorName}
                    onChange={handleChange}
                    placeholder="Enter doctor's name"
                    className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <hr />
                {/* Purchase Type */}
                <div>
                  <label
                    name="purchase_type"
                    className="block text-sm font-medium mb-1"
                  >
                    Purchase Type
                  </label>
                  <select
                    id="purchase_type"
                    name="purchase_type"
                    value={formData.purchase_type}
                    onChange={handleChange}
                    className="border p-2 rounded-lg w-full focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="One-time">One-time Purchase</option>
                    <option value="Subscription">
                      Automatic Delivery (Unsubscribe anytime)
                    </option>
                  </select>
                </div>
                <hr />
              </form>
              <div>
                <Insurance onPolicySelect={setSelectedPolicy}/>
              </div>
              {/* Price and Add to Cart Button */}
              <div className="space-y-2 mt-4 bg-gray-200">
                <div className="flex items-center justify-between">
                  <p className="text-lg font-bold m-5">Lens</p>
                  <div className="flex">
                    <p className="text-lg font-bold mr-8 line-through">
                      ${product.product_price} CAD
                    </p>
                    <p className="text-lg font-bold mr-8">
                      ${product.product_sale_price} CAD
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleAddToCart}
                  className="bg-red-600 text-white px-42 py-3 mb-4 rounded hover:bg-red-800 ml-10 text-xl border-1 border-black hover:cursor-pointer"
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
              <strong>LENS TYPE: </strong>
              {product.contact_type}
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
          <p className="mt-4 text-lg">{product.product_description}</p>
        </div>
      </div>

      <div className="bg-stone-900"></div>
    </>
  );
};

export default ContactLensPage;
