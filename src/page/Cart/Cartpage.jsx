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
import lensWidth from "../../assets/product-measurement/Lenswidt.jpeg";
import lensHeight from "../../assets/product-measurement/Lensheigh.jpeg";
import bridgeWidth from "../../assets/product-measurement/Bridgewidt.jpeg";
import templeLength from "../../assets/product-measurement/Templelengt.jpeg";

const Cartpage = () => {
  const { ID, subCategory, subCatId } = useParams();

  const [product, setProduct] = useState({});
  const userLocation = localStorage.getItem("userLocation") || "east";

  const isAvailable = (product) => {
    // 1️⃣ If inventory exists, use true location stock
    if (Array.isArray(product?.inventory) && product.inventory.length) {
      return product.inventory
        .filter(i => String(i.location).toLowerCase() === userLocation)
        .some(i =>
          (i.rawStock || 0) +
          (i.inProcessing || 0) +
          (i.finishedStock || 0) -
          (i.orderedStock || 0) > 0
        );
    }

    // 2️⃣ Fallback when inventory is NOT sent in API
    const locations = Array.isArray(product?.productLocation)
      ? product.productLocation.map(l => String(l).toLowerCase())
      : product?.productLocation
        ? [String(product.productLocation).toLowerCase()]
        : [];

    const qty =
      product?.availableQty ??
      product?.availableStock ??
      product?.finishedStock ??
      0;

    return locations.includes(userLocation) && qty > 0;
  };


  const inStock = isAvailable(product);


  const [wishlist, setWishlist] = useState([]);

  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [lensDetails, setLensDetails] = useState(null);
  const isLensSelected = !!lensDetails;

  const [galleryImages, setGalleryImages] = useState([]);
  const [mainImage, setMainImage] = useState(null);

  const dispatch = useDispatch();

  const parsePrice = (p) => {
    if (p === undefined || p === null || p === "") return 0;
    const n = Number(String(p).replace(/[^0-9.-]+/g, ""));
    return Number.isFinite(n) ? n : 0;
  };

  const originalPrice = parsePrice(
    product.product_price ?? product.product_sale_price ?? 0
  );

  const normalizeUrl = (path) => {
    if (!path) return "";
    return path.startsWith("http")
      ? path
      : `${IMAGE_URL.replace(/\/+$/, "")}/${String(path).replace(/^\/+/, "")}`;
  };

  const colorToImages = useMemo(() => {
    const map = new Map();
    const variants = Array.isArray(product?.product_variants)
      ? product.product_variants
      : [];
    variants.forEach((v) => {
      const key = String(v?.colorName || "")
        .toLowerCase()
        .trim();
      const imgs = Array.isArray(v?.images)
        ? v.images.map(normalizeUrl).filter(Boolean)
        : [];
      if (key && imgs.length) map.set(key, imgs);
    });
    return map;
  }, [product]);

  const baseGallery = useMemo(() => {
    const imgs = Array.isArray(product?.product_image_collection)
      ? product.product_image_collection.map(normalizeUrl).filter(Boolean)
      : [];
    return imgs;
  }, [product]);

  useEffect(() => {
    const colorKey = String(selectedColor || "")
      .toLowerCase()
      .trim();
    const colorImgs = colorKey ? colorToImages.get(colorKey) : null;
    const nextGallery = colorImgs?.length ? colorImgs : baseGallery;
    setGalleryImages(nextGallery);
    setMainImage(nextGallery?.[0] || null);
  }, [selectedColor, colorToImages, baseGallery]);

  const fetchProducts = async () => {
    try {
      const res = await API.get(`/getproductbyid/${ID}`);
      const prod = res.data.product || {};

      setProduct(prod);

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
  };

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
  };

  useEffect(() => {
    fetchProducts();
    fetchWishlist();
  }, [ID]);

  useEffect(() => {
    const storedLens = localStorage.getItem("lensSelectionDetails");
    if (storedLens) setLensDetails(JSON.parse(storedLens));
  }, []);

  useEffect(() => {
    if (!product) return;

    if (product.product_size?.length === 1) {
      setSelectedSize(product.product_size[0]);
    }
    if (product.product_variants?.length === 1) {
      setSelectedColor(product.product_variants[0].colorName);
    }
  }, [product]);

  const lensSelectionDetails = JSON.parse(
    localStorage.getItem("lensSelectionDetails") || "null"
  );
  const lensTotalPrice = lensSelectionDetails?.totalPrice || 0;

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
        });
      }
    } catch (err) {
      console.error("Wishlist toggle failed:", err);
    }
  };

  const toggleSize = (size) => {
    setSelectedSize((curr) => (curr === size ? null : size));
  };

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
    cat_id: product.cat_id,
    subCat_id: subCatId,
    vendorID: product.vendorID || product.vendorId || null,
  };

  const variantColors = useMemo(() => {
    const arr = Array.isArray(product?.product_variants)
      ? product.product_variants
      : [];
    return arr
      .map((v) =>
        String(v?.colorName || "")
          .toLowerCase()
          .trim()
      )
      .filter(Boolean);
  }, [product]);

  useEffect(() => {
    if (!selectedColor && variantColors.length) {
      setSelectedColor(variantColors[0]);
    }
  }, [variantColors, selectedColor]);

  // UPDATED DETAIL ROW
  const DetailRow = ({ label, value }) => (
    <div className="min-w-[220px]">
      <p className="font-semibold text-gray-900">{label}</p>
      <p className="text-gray-700">{value || "-"}</p>
    </div>
  );

  const isSunglasses =
    product?.cat_id === "6915705d9ceac0cdda41c83f" ||
    product?.cat_sec?.toLowerCase() === "sunglasses";

  if (product.cat_id === "6915735feeb23fa59c7d532b") {
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
                  className={`rounded-lg border ${
                    mainImage === img
                      ? "border-red-600 ring-2 ring-red-200"
                      : "border-gray-200"
                  } overflow-hidden`}
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
            <div className="relative rounded-xl bg-[#f6fbff] p-4 border border-gray-200 flex justify-center items-center">
              <div className="absolute top-3 right-3">
                <button
                  onClick={() => toggleWishlist(product._id)}
                  aria-pressed={wishlist.includes(product._id)}
                  aria-label={
                    wishlist.includes(product._id)
                      ? "Remove from wishlist"
                      : "Add to wishlist"
                  }
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

          {/* Right column: info and purchase */}
          <div className="space-y-5">
            {/* Title + Gender */}
            <div>
              <h1 className="text-2xl font-semibold">{product.product_name}</h1>
              {!!product.gender && (
                <p className="text-sm text-gray-500 mt-1">
                  {subCatId === "6915763ceeb23fa59c7d5342" &&
                  subCategory === "Kids"
                    ? "Kids"
                    : product.gender}
                </p>
              )}
            </div>

            {/* Color swatches */}
            {variantColors.length > 0 && (
              <fieldset
                role="radiogroup"
                aria-label="Choose frame color"
                className="mt-2"
              >
                <div className="flex items-center gap-2">
                  {variantColors.map((c) => {
                    const checked = selectedColor === c;
                    const id = `color-${c}`;
                    return (
                      <label
                        key={c}
                        htmlFor={id}
                        className={`h-7 w-7 rounded-full border hover:cursor-pointer ${
                          checked
                            ? "ring-2 ring-offset-1 ring-black border-black"
                            : "border-gray-300"
                        }`}
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
                  const tokens = String(size)
                    .replace(/,/g, "")
                    .split("")
                    .filter(Boolean);
                  return tokens.map((token, idx) => {
                    const key = `${size}-${idx}`;
                    const active = selectedSize === token;
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => toggleSize(token)}
                        className={`px-4 py-2 rounded border text-sm ${
                          active
                            ? "bg-black text-white border-black"
                            : "bg-white text-black border-gray-300 hover:border-black"
                        }`}
                        aria-pressed={active}
                        aria-label={`Select size ${token}`}
                      >
                        {token}
                      </button>
                    );
                  });
                })}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Selected: {selectedSize || "None"}
              </p>
            </div>

            {/* Price + CTAs */}
            <div className="rounded-xl border border-gray-200">
              <div className="flex items-center justify-between px-4 py-3">
                <p className="text-base font-semibold">Frame</p>
                <div className="flex items-center gap-3">
                  {!!product.product_price &&
                    product.product_price > product.product_sale_price && (
                      <span className="line-through text-gray-400">
                        ${Number(product.product_price).toFixed(2)}
                      </span>
                    )}
                  <span className="text-lg font-bold">
                    $
                    {Number(
                      product.product_sale_price ?? product.product_price ?? 0
                    ).toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="px-4 pb-4">
                {!isSunglasses && (
                  <Link to="lens-selection-flow" state={{ ID }}>
                    <button
                      className={`${
                        isLensSelected
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-black hover:bg-gray-900"
                      } text-white w-full rounded-md py-3 text-sm`}
                      disabled={isLensSelected}
                    >
                      {isLensSelected ? "Lens Selected" : "Select lenses"}
                    </button>
                  </Link>
                )}

                {inStock ? (
                  <button
                    onClick={() => {
                      if (!product) return;

                      const hasSize = product.product_size?.length > 0;
                      const hasColor = product.product_variants?.length > 0;

                      const multiSize = product.product_size?.length > 1;
                      const multiColor = product.product_variants?.length > 1;

                      if (
                        multiSize &&
                        multiColor &&
                        (!selectedSize || !selectedColor)
                      ) {
                        Swal.fire({
                          icon: "warning",
                          title: "Please select size and color!",
                          toast: true,
                          position: "top-end",
                          showConfirmButton: false,
                          timer: 1800,
                        });
                        return;
                      }

                      if (multiSize && !selectedSize) {
                        Swal.fire({
                          icon: "warning",
                          title: "Please select size!",
                          toast: true,
                          position: "top-end",
                          showConfirmButton: false,
                          timer: 1800,
                        });
                        return;
                      }

                      if (multiColor && !selectedColor) {
                        Swal.fire({
                          icon: "warning",
                          title: "Please select color!",
                          toast: true,
                          position: "top-end",
                          showConfirmButton: false,
                          timer: 1800,
                        });
                        return;
                      }

                      // REAL location-based available qty
                      const userLocation = localStorage.getItem("userLocation") || "east";

                      let availableQty = 0;

                      // 1️⃣ Use real inventory if API returned it
                      if (Array.isArray(product?.inventory) && product.inventory.length) {
                        const locationInventory = product.inventory.find(
                          i => String(i.location).toLowerCase() === userLocation
                        );

                        if (locationInventory) {
                          availableQty =
                            (locationInventory.rawStock || 0) +
                            (locationInventory.inProcessing || 0) +
                            (locationInventory.finishedStock || 0) -
                            (locationInventory.orderedStock || 0);
                        }
                      }

                      // 2️⃣ Fallback when inventory is NOT included in product response
                      if (availableQty === 0) {
                        const locations = Array.isArray(product?.productLocation)
                          ? product.productLocation.map(l => String(l).toLowerCase())
                          : product?.productLocation
                            ? [String(product.productLocation).toLowerCase()]
                            : [];

                        if (locations.includes(userLocation)) {
                          availableQty =
                            product?.availableQty ??
                            product?.availableStock ??
                            product?.finishedStock ??
                            0;
                        }
                      }

                      // check how many already in cart
                      const cart = JSON.parse(
                        localStorage.getItem("cartItems") || "[]"
                      );
                      const existing = cart.find((c) => c.id === ID);
                      const currentQty = existing?.quantity ?? 0;

                      if (currentQty + 1 > availableQty) {
                        Swal.fire({
                          icon: "warning",
                          title: `Only ${availableQty} left in stock`,
                          toast: true,
                          position: "top-end",
                          showConfirmButton: false,
                          timer: 1800,
                        });
                        return;
                      }

                      dispatch(
                        addToCart({
                          id: ID,
                          name: product.product_name,
                          selectedSize: selectedSize || null,
                          selectedColor: selectedColor || null,
                          price:
                            product.discountedPrice ??
                            product.product_sale_price,
                          originalPrice,
                          image: mainImage,
                          lens: lensDetails || null,
                          policy: selectedPolicy || null,
                          cat_id: product.cat_id,
                          subCat_id: subCatId,
                          vendorID:
                            product.vendorID || product.vendorId || null,
                        })
                      );

                      Swal.fire({
                        toast: true,
                        icon: "success",
                        title: "Product added to cart!",
                        position: "top-end",
                        showConfirmButton: false,
                        timer: 1500,
                      });
                    }}
                    className="mt-3 bg-[#f00000] hover:bg-red-700 text-white w-full rounded-md py-3 text-sm"
                  >
                    Add To Cart
                  </button>
                ) : (
                  <button
                    disabled
                    className="mt-3 bg-gray-400 text-white w-full rounded-md py-3 text-sm cursor-not-allowed"
                  >
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
                      <button className="text-gray-600 text-sm hover:underline">
                        Edit
                      </button>
                    </Link>
                    <button
                      className="text-[#f00000] text-sm hover:underline"
                      onClick={() => {
                        localStorage.removeItem("lensSelectionDetails");
                        setLensDetails(null);
                        Swal.fire({
                          toast: true,
                          position: "top-end",
                          icon: "info",
                          title: "Lens selection removed",
                          showConfirmButton: false,
                          timer: 1500,
                        });
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>

                <p>
                  <strong>Vision need:</strong>{" "}
                  {lensDetails.lens?.selectedLens || "-"}
                </p>
                <p>
                  <strong>Prescription:</strong>{" "}
                  {lensDetails.lens?.selectedLens === "Non-prescription lenses"
                    ? "Not required"
                    : lensDetails.lens?.prescriptionMethod || "Not provided"}
                </p>
                <p>
                  <strong>Lens type:</strong>{" "}
                  {lensDetails.lens?.lensType?.name || "Clear lenses"}{" "}
                  {lensDetails.lens?.lensType?.price ? (
                    <span className="text-blue-600">
                      {lensDetails.lens.lensType.price}
                    </span>
                  ) : null}
                </p>

                {lensDetails.lens?.lensType?.name === "Sun lenses" &&
                  lensDetails.lens?.tint && (
                    <p>
                      <strong>Tint:</strong> {lensDetails.lens.tint.name}{" "}
                      <span className="text-blue-600">
                        {lensDetails.lens.tint.price}
                      </span>
                    </p>
                  )}

                {lensDetails.lens?.thickness && (
                  <p>
                    <strong>Thickness:</strong>{" "}
                    {lensDetails.lens.thickness.name}{" "}
                    <span className="text-blue-600">
                      {lensDetails.lens.thickness.price}
                    </span>
                  </p>
                )}

                {lensDetails.lens?.enhancement && (
                  <p>
                    <strong>Finishings:</strong>{" "}
                    {lensDetails.lens.enhancement.name}{" "}
                    <span className="text-blue-600">
                      {lensDetails.lens.enhancement.price}
                    </span>
                  </p>
                )}

                <p className="mt-2 font-semibold">
                  <strong>Lens Total:</strong> $
                  {Number(lensTotalPrice).toFixed(2)}
                </p>
              </div>
            )}

            {/* Insurance */}
            <Insurance onPolicySelect={setSelectedPolicy} />
          </div>
        </div>

        {/* ===================== ABOUT THIS PRODUCT ===================== */}
        <div className="mt-16 ml-10">
          {/* TITLE + ICON */}
          <div className="flex items-center gap-3 mb-2">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d="M3 12h3l2 5h6l2-5h3" stroke="black" strokeWidth="1.5" />
              <circle cx="8" cy="12" r="3" stroke="black" strokeWidth="1.5" />
              <circle cx="16" cy="12" r="3" stroke="black" strokeWidth="1.5" />
            </svg>

            <h3 className="text-2xl font-semibold">Frame description</h3>
          </div>

          {/* Divider */}
          <div className="border-b border-gray-300 mb-8"></div>

          {/* GRID LIKE SCREENSHOT */}
          <div className="flex flex-wrap gap-x-24 gap-y-10">
            <DetailRow
              label="Frame material:"
              value={product.product_frame_material || product.frame_material}
            />
            <DetailRow
              label="Frame shape:"
              value={product.product_frame_shape || product.frame_shape}
            />
            <DetailRow
              label="Frame colour:"
              value={product.product_frame_color || product.frame_color}
            />
            <DetailRow label="Frame Fit:" value={product.frame_fit} />
            <DetailRow label="Face Shape:" value={product.face_shape} />
            {/* <DetailRow label="Gender:" value={product.gender} /> */}
            <DetailRow
              label="Gender:"
              value={
                subCatId === "6915763ceeb23fa59c7d5342" &&
                subCategory === "Kids"
                  ? "Kids"
                  : product.gender
              }
            />
          </div>
        </div>

        {/* ===================== PRODUCT MEASUREMENT ===================== */}
        <div className="mt-16 ml-10">
          {/* TITLE + ICON */}
          {(product.lens_width ||
            product.lens_hieght ||
            product.bridge_width ||
            product.temple_length) && (
            <>
              <div className="flex items-center gap-3 mb-2">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path d="M3 12h18M12 3v18" stroke="black" strokeWidth="1.5" />
                </svg>

                <h3 className="text-2xl font-semibold">Product measurement</h3>
              </div>

              <div className="border-b border-gray-300 mb-10"></div>
            </>
          )}

          {/* MEASUREMENTS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-10">
            {/* Lens Width */}
            {product.lens_width && (
              <div className="flex flex-col items-center text-center">
                <img
                  src={lensWidth}
                  alt="Lens Width"
                  className="w-[180px] h-auto object-contain"
                />
                <p className="font-semibold text-[15px] mt-2">Lens width:</p>
                <p className="text-[14px] text-gray-700">
                  {product.lens_width} mm
                </p>
              </div>
            )}

            {/* Lens Height */}
            {product.lens_hieght && (
              <div className="flex flex-col items-center text-center">
                <img
                  src={lensHeight}
                  alt="Lens Height"
                  className="w-[180px] h-auto object-contain"
                />
                <p className="font-semibold text-[15px] mt-2">Lens height:</p>
                <p className="text-[14px] text-gray-700">
                  {product.lens_hieght} mm
                </p>
              </div>
            )}

            {/* Bridge Width */}
            {product.bridge_width && (
              <div className="flex flex-col items-center text-center">
                <img
                  src={bridgeWidth}
                  alt="Bridge Width"
                  className="w-[180px] h-auto object-contain"
                />
                <p className="font-semibold text-[15px] mt-2">Bridge width:</p>
                <p className="text-[14px] text-gray-700">
                  {product.bridge_width} mm
                </p>
              </div>
            )}

            {/* Temple Length */}
            {product.temple_length && (
              <div className="flex flex-col items-center text-center">
                <img
                  src={templeLength}
                  alt="Temple Length"
                  className="w-[180px] h-auto object-contain"
                />
                <p className="font-semibold text-[15px] mt-2">Temple length:</p>
                <p className="text-[14px] text-gray-700">
                  {product.temple_length} mm
                </p>
              </div>
            )}
          </div>
        </div>

        {product.product_description && (
          <div className="mt-16 ml-10 max-w-7xl">
            <h3 className="text-2xl font-semibold mb-3">Description</h3>
            <div className="border-b border-gray-300 mb-4"></div>

            <p className="text-lg leading-relaxed text-gray-800">
              {product.product_description}
            </p>
          </div>
        )}
      </div>

      {/* ===================== LENS PROMO TILES ===================== */}
      {product.product_lens_image1 && product.product_lens_image2 && (
        <div className="py-12">
          <div className="mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Lens Tile 1 */}
            <div className="text-center">
              <img
                src={normalizeUrl(product.product_lens_image1)}
                alt={product.product_lens_title1}
                className="mx-auto mb-6 object-cover hover:scale-105 transition-transform duration-300 max-h-[260px]"
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
                className="mx-auto mb-6 object-cover hover:scale-105 transition-transform duration-300 max-h-[260px]"
              />
              <h4 className="text-3xl font-semibold mb-4">
                {product.product_lens_title2}
              </h4>
              <p className="text-lg">{product.product_lens_description2}</p>
            </div>
          </div>
        </div>
      )}

      {/* Footer separator */}
      <div className="bg-stone-900"></div>

      {/* Our Promise Section */}
      <OurPromise />
    </>
  );
};

export default Cartpage;
