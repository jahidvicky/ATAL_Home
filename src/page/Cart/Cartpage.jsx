import React, { useState, useEffect, useMemo } from "react";
import OurPromise from "./OurPromise";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import Insurance from "./Insurance";
import { useParams, Link } from "react-router-dom";
import API, { IMAGE_URL } from "../../API/Api";
import Swal from "sweetalert2";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import ContactLensPage from "./ContactLensPage";

const Cartpage = () => {
  const { ID, subCategory, subCatId } = useParams();

  // Product + wishlist
  const [product, setProduct] = useState({});
  const [wishlist, setWishlist] = useState([]);

  // PDP state
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  // Lens + insurance
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [lensDetails, setLensDetails] = useState(null);
  const isLensSelected = !!lensDetails;

  // Gallery
  const [galleryImages, setGalleryImages] = useState([]); // array of URLs
  const [mainImage, setMainImage] = useState(null);        // URL string

  const dispatch = useDispatch();

  // Helpers
  const parsePrice = (p) => {
    if (p === undefined || p === null || p === "") return 0;
    const n = Number(String(p).replace(/[^0-9.-]+/g, ""));
    return Number.isFinite(n) ? n : 0;
  }; // Ensures numeric price parsing for UI and cart math. [web:59]

  const originalPrice = parsePrice(product.product_price ?? product.product_sale_price ?? 0); // Keeps a reliable original price for strike-through. [web:59]

  const normalizeUrl = (path) => {
    if (!path) return "";
    return path.startsWith("http")
      ? path
      : `${IMAGE_URL.replace(/\/+$/, "")}/${String(path).replace(/^\/+/, "")}`;
  }; // Prevents double slashes and builds absolute URLs for images. [web:59]

  // Build color -> images map from product_variants
  const colorToImages = useMemo(() => {
    const map = new Map();
    const variants = Array.isArray(product?.product_variants) ? product.product_variants : [];
    variants.forEach((v) => {
      const key = String(v?.colorName || "").toLowerCase().trim();
      const imgs = Array.isArray(v?.images) ? v.images.map(normalizeUrl).filter(Boolean) : [];
      if (key && imgs.length) map.set(key, imgs);
    });
    return map;
  }, [product]); // Drives gallery when a color is chosen. [web:59]

  // Base gallery if no color chosen: product_image_collection fallback
  const baseGallery = useMemo(() => {
    const imgs = Array.isArray(product?.product_image_collection)
      ? product.product_image_collection.map(normalizeUrl).filter(Boolean)
      : [];
    return imgs;
  }, [product]); // Provides thumbnails when variants aren’t selected. [web:59]

  // When product or color changes, set gallery + main image
  useEffect(() => {
    const colorKey = String(selectedColor || "").toLowerCase().trim();
    const colorImgs = colorKey ? colorToImages.get(colorKey) : null;
    const nextGallery = colorImgs?.length ? colorImgs : baseGallery;
    setGalleryImages(nextGallery);
    setMainImage(nextGallery?.[0] || null);
  }, [selectedColor, colorToImages, baseGallery]); // Keeps hero synced with selected color. [web:59]

  // Fetch product + wishlist
  const fetchProducts = async () => {
    try {
      const res = await API.get(`/getproductbyid/${ID}`);
      const prod = res.data.product || {};
      setProduct(prod);
      // Initialize gallery from product_image_collection until a color is picked
      const initial = Array.isArray(prod?.product_image_collection)
        ? prod.product_image_collection.map(normalizeUrl).filter(Boolean)
        : [];
      if (initial.length) {
        setGalleryImages(initial);
        setMainImage(initial[0]);
      }
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  }; // Loads PDP data and primes gallery. [web:59]

  const fetchWishlist = async () => {
    try {
      const userId2 = localStorage.getItem("user");
      if (!userId2) return;
      const res = await API.get(`/getWishlist/${userId2}`);
      const valid = res.data?.products?.filter((p) => p.productId) || [];
      setWishlist(valid.map((p) => p.productId._id));
    } catch (err) {
      console.error("Failed to fetch wishlist:", err);
    }
  }; // Hydrates local wishlist IDs to render filled heart. [web:59]

  useEffect(() => {
    fetchProducts();
    fetchWishlist();
  }, [ID]); // Refreshes when routing to a new product. [web:59]

  // Lens selection restore
  useEffect(() => {
    const storedLens = localStorage.getItem("lensSelectionDetails");
    if (storedLens) setLensDetails(JSON.parse(storedLens));
  }, []); // Restores persisted lens flow details. [web:59]

  const lensSelectionDetails = JSON.parse(localStorage.getItem("lensSelectionDetails") || "null"); // Safe parse for optional lens details. [web:59]
  const lensTotalPrice = lensSelectionDetails?.totalPrice || 0; // Displays lens price summary when selected. [web:59]

  // Wishlist toggle
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
  }; // Keeps PDP heart in sync with backend preference. [web:59]

  // Size selection (single)
  const toggleSize = (size) => {
    setSelectedSize((curr) => (curr === size ? null : size));
  }; // Allows deselecting the same size; only one active. [web:59]

  // Add to cart payload
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
    subCat_id: subCatId,
    vendorID: product.vendorID || product.vendorId || null,
  }; // Captures PDP selections for checkout and order lines. [web:59]

  // Constants
  const contactLensSubCatId = "68caa86cd72068a7d3a0f0bf"; // Route switch for lenses PDP. [web:59]

  // Color swatches list from product_variants
  const variantColors = useMemo(() => {
    const arr = Array.isArray(product?.product_variants) ? product.product_variants : [];
    return arr
      .map((v) => String(v?.colorName || "").toLowerCase().trim())
      .filter(Boolean);
  }, [product]); // Drives swatch rendering and keys. [web:59]

  // Default pick first color if available and none selected
  useEffect(() => {
    if (!selectedColor && variantColors.length) {
      setSelectedColor(variantColors[0]);
    }
  }, [variantColors, selectedColor]); // Ensures hero and thumbnails show a color by default. [web:59]

  // UI blocks (accordion for details)
  const DetailRow = ({ label, value }) => (
    <li className="flex gap-2">
      <strong className="min-w-40">{label}</strong>
      <span>{value || "-"}</span>
    </li>
  );

  if (subCatId === contactLensSubCatId) {
    return <ContactLensPage />;
  }

  return (
    <>
      <div className="mt-10 px-4 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left column: gallery */}
          <div className="grid grid-cols-[96px_1fr] gap-4">
            {/* Thumbs */}
            <div className="flex flex-col gap-3 overflow-auto max-h-[520px] pr-1">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onMouseEnter={() => setMainImage(img)}
                  onFocus={() => setMainImage(img)}
                  className={`rounded-lg border ${mainImage === img ? "border-red-600 ring-2 ring-red-200" : "border-gray-200"} overflow-hidden`}
                >
                  <img
                    src={img}
                    alt={`thumb-${idx}`}
                    className="w-[90px] h-[90px] object-contain bg-white"
                    loading="lazy"
                    decoding="async"
                  />
                </button>
              ))}
            </div>

            {/* Hero */}
            <div className="relative rounded-xl bg-[#f6fbff] p-4 border border-gray-200">
              <div className="absolute top-3 right-3">
                <button
                  onClick={() => toggleWishlist(product._id)}
                  aria-pressed={wishlist.includes(product._id)}
                  aria-label={wishlist.includes(product._id) ? "Remove from wishlist" : "Add to wishlist"}
                  className="p-2 rounded-full bg-white shadow border"
                >
                  {wishlist.includes(product._id) ? (
                    <AiFillHeart className="text-red-500 text-2xl" />
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

          {/* Right column: info and purchase */}
          <div className="space-y-5">
            {/* Title + Gender */}
            <div>
              <h1 className="text-2xl font-semibold">{product.product_name}</h1>
              {!!product.gender && <p className="text-sm text-gray-500 mt-1">{product.gender}</p>}
            </div>

            {/* Color swatches (radiogroup) */}
            {variantColors.length > 0 && (
              <fieldset role="radiogroup" aria-label="Choose frame color" className="mt-2">
                <div className="flex items-center gap-2">
                  {variantColors.map((c) => {
                    const checked = selectedColor === c;
                    const id = `color-${c}`;
                    return (
                      <label
                        key={c}
                        htmlFor={id}
                        className={`h-7 w-7 rounded-full border ${checked ? "ring-2 ring-offset-1 ring-black border-black" : "border-gray-300"}`}
                        title={c}
                        style={{ backgroundColor: c }}
                      >
                        <input
                          id={id}
                          type="radio"
                          name="color-swatch"
                          value={c}
                          checked={checked}
                          onChange={(e) => setSelectedColor(e.target.value)}
                          className="sr-only"
                          aria-checked={checked}
                        />
                      </label>
                    );
                  })}
                </div>
              </fieldset>
            )}

            {/* Size selector */}
            <div>
              <label className="text-sm font-medium">Size</label>
              <div className="flex gap-2 mt-2">
                {(product.product_size || []).map((size) => {
                  // Some data appears as ["M"] or comma strings; normalize to tokens
                  const tokens = String(size).replace(/,/g, "").split("").filter(Boolean);
                  return tokens.map((token, idx) => {
                    const key = `${size}-${idx}`;
                    const active = selectedSize === token;
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => toggleSize(token)}
                        className={`px-4 py-2 rounded border text-sm ${active ? "bg-black text-white border-black" : "bg-white text-black border-gray-300 hover:border-black"}`}
                        aria-pressed={active}
                        aria-label={`Select size ${token}`}
                      >
                        {token}
                      </button>
                    );
                  });
                })}
              </div>
              <p className="text-xs text-gray-500 mt-1">Selected: {selectedSize || "None"}</p>
            </div>

            {/* Price + CTAs */}
            <div className="rounded-xl border border-gray-200">
              <div className="flex items-center justify-between px-4 py-3">
                <p className="text-base font-semibold">Frame</p>
                <div className="flex items-center gap-3">
                  {!!product.product_price && product.product_price > product.product_sale_price && (
                    <span className="line-through text-gray-400">${Number(product.product_price).toFixed(2)}</span>
                  )}
                  <span className="text-lg font-bold">${Number(product.product_sale_price ?? product.product_price ?? 0).toFixed(2)}</span>
                </div>
              </div>

              <div className="px-4 pb-4">
                <Link to="lens-selection-flow" state={{ ID }}>
                  <button
                    className={`${isLensSelected ? "bg-gray-400 cursor-not-allowed" : "bg-black hover:bg-gray-900"} text-white w-full rounded-md py-3 text-sm`}
                    disabled={isLensSelected}
                  >
                    {isLensSelected ? "Lens Selected" : "Select lenses"}
                  </button>
                </Link>

                {product.stockAvailability > 0 ? (
                  <button
                    onClick={() => {
                      if (!product) return;
                      if (!selectedSize || !selectedColor) {
                        Swal.fire({ icon: "warning", title: "Please select size and color!", toast: true, position: "top-end", showConfirmButton: false, timer: 1800, timerProgressBar: true });
                        return;
                      }
                      dispatch(addToCart({
                        id: ID,
                        name: product.product_name,
                        selectedSize,
                        selectedColor,
                        price: product.discountedPrice ?? product.product_sale_price,
                        originalPrice,
                        image: mainImage,
                        lens: lensDetails || null,
                        policy: selectedPolicy || null,
                        subCat_id: subCatId,
                        vendorID: product.vendorID || product.vendorId || null,
                      }));
                      Swal.fire({ toast: true, position: "top-end", icon: "success", title: "Product added to cart!", showConfirmButton: false, timer: 1500 });
                    }}
                    className="mt-3 bg-red-600 hover:bg-red-700 text-white w-full rounded-md py-3 text-sm"
                  >
                    Add To Cart
                  </button>
                ) : (
                  <button disabled className="mt-3 bg-gray-400 text-white w-full rounded-md py-3 text-sm cursor-not-allowed">
                    Out of stock
                  </button>
                )}
              </div>
            </div>

            {/* Lens summary */}
            {lensDetails && (
              <div className="mt-4 p-4 border rounded bg-gray-50">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">Selected lenses</h3>
                  <div className="flex gap-2">
                    <Link to="lens-selection-flow" state={{ ID }}>
                      <button className="text-gray-600 text-sm hover:underline">Edit</button>
                    </Link>
                    <button
                      className="text-red-600 text-sm hover:underline"
                      onClick={() => {
                        localStorage.removeItem("lensSelectionDetails");
                        setLensDetails(null);
                        Swal.fire({ toast: true, position: "top-end", icon: "info", title: "Lens selection removed", showConfirmButton: false, timer: 1500 });
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>

                <p><strong>Vision need:</strong> {lensDetails.lens?.selectedLens || "-"}</p>
                <p><strong>Prescription:</strong> {lensDetails.lens?.selectedLens === "Non-prescription lenses" ? "Not required" : lensDetails.lens?.prescriptionMethod || "Not provided"}</p>
                <p><strong>Lens type:</strong> {lensDetails.lens?.lensType?.name || "Clear lenses"} {lensDetails.lens?.lensType?.price ? <span className="text-blue-600">{lensDetails.lens.lensType.price}</span> : null}</p>
                {lensDetails.lens?.lensType?.name === "Sun lenses" && lensDetails.lens?.tint && (
                  <p><strong>Tint:</strong> {lensDetails.lens.tint.name} <span className="text-blue-600">{lensDetails.lens.tint.price}</span></p>
                )}
                {lensDetails.lens?.thickness && (
                  <p><strong>Thickness:</strong> {lensDetails.lens.thickness.name} <span className="text-blue-600">{lensDetails.lens.thickness.price}</span></p>
                )}
                {lensDetails.lens?.enhancement && (
                  <p><strong>Finishings:</strong> {lensDetails.lens.enhancement.name} <span className="text-blue-600">{lensDetails.lens.enhancement.price}</span></p>
                )}
                <p className="mt-2 font-semibold"><strong>Lens Total:</strong> ${Number(lensTotalPrice).toFixed(2)}</p>
              </div>
            )}

            {/* Insurance */}
            <Insurance onPolicySelect={setSelectedPolicy} />
          </div>
        </div>

        {/* About this product */}
        <div className="mt-6 ml-10">
          <h3 className="text-2xl font-semibold mb-6">ABOUT THIS PRODUCT</h3>
          <ul className="text-lg space-y-1">
            <DetailRow label="Frame Material:" value={product.product_frame_material || product.frame_material} />
            <DetailRow label="Frame Shape:" value={product.product_frame_shape || product.frame_shape} />
            <DetailRow label="Frame Colour:" value={product.product_frame_color || product.frame_color} />
            <DetailRow label="Fit:" value={product.product_frame_fit || product.frame_fit} />
            <DetailRow label="Gender:" value={product.gender} />
          </ul>
          {product.product_description && (
            <p className="mt-4 text-lg">{product.product_description}</p>
          )}
        </div>

        {/* Lens promo tiles (optional) */}
        {product.product_lens_image1 && product.product_lens_image2 && (
          <div className="py-12">
            <div className="mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Lens Tile 1 */}
              <div className="text-center">
                <img
                  src={normalizeUrl(product.product_lens_image1)}
                  alt={product.product_lens_title1}
                  className="mx-auto mb-6 object-cover hover:scale-105 transition-transform duration-300"
                />
                <h4 className="text-3xl font-semibold mb-4">
                  {product.product_lens_title1}
                </h4>
                <p className="text-lg">{product.product_lens_description1}</p>
              </div>

              {/* Lens Tile 2 */}
              <div className="text-center">
                <img
                  src={normalizeUrl(product.product_lens_image2)}
                  alt={product.product_lens_title2}
                  className="mx-auto mb-6 object-cover hover:scale-105 transition-transform duration-300"
                />
                <h4 className="text-3xl font-semibold mb-4">
                  {product.product_lens_title2}
                </h4>
                <p className="text-lg">{product.product_lens_description2}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="bg-stone-900"></div>
      <OurPromise />
    </>
  );
};

export default Cartpage;
