import React, { useEffect, useMemo, useState } from "react";
import API, { IMAGE_URL } from "../../API/Api";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import RecentlyView from "../collections/RecentlyView";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import OurPromise from "../Cart/OurPromise";
import { useLocation } from "react-router-dom";

// Toast setup
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true,
});

// Initial filters
const initialFilters = {
  brands: new Set(),
  genders: new Set(),
  shapes: new Set(),
  colors: new Set(),
  materials: new Set(),
  priceMin: 0,
  priceMax: 9999,
};

const toggleSet = (s, v) => {
  const n = new Set(s);
  n.has(v) ? n.delete(v) : n.add(v);
  return n;
};

const resolveImg = (src = "") => {
  if (!src) return "/no-image.png";
  if (src.startsWith("http://") || src.startsWith("https://")) return src;
  const base = IMAGE_URL.endsWith("/") ? IMAGE_URL : `${IMAGE_URL}/`;
  const cleanSrc = src.replace(/^\/+/, "");
  return base + cleanSrc;
};

// ProductCard Component
function ProductCard({
  data,
  img,
  inWishlist,
  toggleWishlist,
  isInStock,
}) {
  const [activeVar, setActiveVar] = React.useState(null);
  const [slideIdx, setSlideIdx] = React.useState(0);
  const slideTimerRef = React.useRef(null);

  const primary = React.useMemo(() => {
    const v0 = data?.product_variants?.[0]?.images?.[0];
    const c0 = data?.product_image_collection?.[0];
    const fallback = img;
    return resolveImg(v0 || c0 || fallback || "");
  }, [data, img]);

  const baseImgs = React.useMemo(() => {
    const allImgs = [
      ...(data?.product_image_collection || []),
      ...(data?.product_variants?.[0]?.images || []),
    ].filter(Boolean);
    return allImgs.length ? allImgs.map(resolveImg) : [primary];
  }, [data, primary]);

  const images = React.useMemo(() => {
    const srcs = activeVar?.images?.length ? activeVar.images : baseImgs;
    return srcs.map(resolveImg);
  }, [activeVar, baseImgs]);

  const currentImg = images[slideIdx] || images[0] || primary;

  const startSlide = (imgs) => {
    if (!imgs || imgs.length < 2) return;
    if (slideTimerRef.current) clearInterval(slideTimerRef.current);
    setSlideIdx(0);
    slideTimerRef.current = setInterval(() => {
      setSlideIdx((i) => (i + 1) % imgs.length);
    }, 1200);
  };

  const stopSlide = () => {
    if (slideTimerRef.current) clearInterval(slideTimerRef.current);
    slideTimerRef.current = null;
    setSlideIdx(0);
  };

  React.useEffect(() => () => {
    if (slideTimerRef.current) clearInterval(slideTimerRef.current);
  }, []);

  const onSwatchEnter = (variant) => {
    setActiveVar(variant);
    startSlide(variant?.images || []);
  };

  const onCardLeave = () => {
    setActiveVar(null);
    stopSlide();
  };

  const variants = Array.isArray(data.product_variants) ? data.product_variants : [];

  return (
    <div
      className="relative bg-white border border-red-600 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-4 text-center cursor-pointer"
      onMouseLeave={onCardLeave}
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          toggleWishlist(data._id);
        }}
        aria-pressed={inWishlist}
        aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
        className="absolute top-2 right-2 p-1 rounded-full bg-white/90 border border-gray-200 shadow hover:bg-white"
      >
        {inWishlist ? (
          <AiFillHeart className="text-[#f00000] text-xl" />
        ) : (
          <AiOutlineHeart className="text-gray-500 text-xl" />
        )}
      </button>

      {data.product_price > data.product_sale_price && (
        <div className="absolute top-2 left-2 bg-gray-200 text-[#f00000] text-xs font-semibold px-2 py-1 rounded-full z-10">
          {Math.round(
            ((data.product_price - data.product_sale_price) / data.product_price) * 100
          )}
          % OFF
        </div>
      )}

      <Link to={`/product/${data._id}/${data.subCategoryName}/${data.subCat_id}`}>
        <img
          key={currentImg}
          src={currentImg}
          alt={data.product_name}
          className="w-full h-32 object-contain mb-3 mt-4 transition-transform duration-300 hover:scale-105
                     motion-safe:transition-opacity motion-safe:duration-300 motion-safe:ease-out
                     motion-safe:animate-[fadeIn_220ms_ease-out]"
          loading="lazy"
          decoding="async"
        />
      </Link>

      {data.gender && <p className="text-sm text-gray-400">{data.gender}</p>}

      <p className="text-base font-semibold text-gray-900 capitalize mb-1">
        {data.product_name}
      </p>

      <div className="flex justify-center items-center gap-2 mb-1">
        {data.product_price > data.product_sale_price && (
          <span className="text-gray-400 line-through text-sm">
            ${Number(data.product_price).toFixed(2)}
          </span>
        )}
        <span className="text-gray-900 font-bold">
          ${Number(data.product_sale_price ?? data.product_price ?? 0).toFixed(2)}
        </span>
      </div>

      <div className="mb-2">
        <span className={`text-sm font-medium ${isInStock ? "text-green-600" : "text-gray-500"}`}>
          {isInStock ? "In stock" : "Out of stock"}
        </span>
      </div>

      {variants.length > 0 && (
        <div className="flex justify-center gap-2 mt-2">
          {variants.map((variant, i) => (
            <span
              key={i}
              title={variant.colorName}
              onMouseEnter={() => onSwatchEnter(variant)}
              onFocus={() => onSwatchEnter(variant)}
              onMouseLeave={onCardLeave}
              onBlur={onCardLeave}
              className={`w-5 h-5 rounded-full border transition-all duration-200 
                          ${activeVar?.colorName === variant.colorName
                  ? "border-black ring-2 ring-black/10 scale-110"
                  : "border-gray-300 hover:scale-105"}`}
              style={{
                backgroundColor: variant.colorName?.toLowerCase().trim() || "gray",
              }}
              role="button"
              tabIndex={0}
              aria-label={`Preview ${variant.colorName}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// FilterSections Component
const FilterSections = ({ filters, setFilters, facetData }) => {
  const Section = ({ title, children }) => (
    <div className="py-3 border-b last:border-b-0">
      <h4 className="font-medium text-sm mb-2">{title}</h4>
      {children}
    </div>
  );

  const Check = ({ label, setKey, value }) => {
    const on = filters[setKey].has(value);
    return (
      <label className="flex items-center gap-2 py-1 cursor-pointer">
        <input
          type="checkbox"
          className="h-4 w-4 rounded border-gray-300"
          checked={on}
          onChange={() =>
            setFilters((prev) => ({
              ...prev,
              [setKey]: toggleSet(prev[setKey], value),
            }))
          }
        />
        <span className="text-sm capitalize">{label}</span>
      </label>
    );
  };

  return (
    <div>
      {facetData.brands.length > 0 && (
        <Section title="Brand">
          <div className="max-h-40 overflow-auto pr-1">
            {facetData.brands.map((b) => (
              <Check key={b} label={b} setKey="brands" value={b} />
            ))}
          </div>
        </Section>
      )}

      {facetData.genders.length > 0 && (
        <Section title="Gender">
          <div className="flex flex-col gap-1">
            {facetData.genders.map((g) => (
              <Check key={g} label={g} setKey="genders" value={g} />
            ))}
          </div>
        </Section>
      )}

      <Section title="Shape">
        <div className="max-h-40 overflow-auto pr-1">
          {facetData.shapes.map((s) => (
            <Check key={s} label={s} setKey="shapes" value={s} />
          ))}
        </div>
      </Section>

      <Section title="Color">
        <div className="max-h-40 overflow-auto pr-1">
          {facetData.colors.map((c) => (
            <Check key={c} label={c} setKey="colors" value={c} />
          ))}
        </div>
      </Section>

      <Section title="Material">
        <div className="max-h-40 overflow-auto pr-1">
          {facetData.materials.map((m) => (
            <Check key={m} label={m} setKey="materials" value={m} />
          ))}
        </div>
      </Section>
    </div>
  );
};

// Main Product Component
function Product() {
  const { subCategory, subCatId, shape, gender, lens_type, frame_shape, collection, catId, lens_cat, contactBrandId, slug, collectionName, frameShape, categoryName, categoryId, BrandId, allBrands } = useParams();

  const location = useLocation();
  const brandId = location.state?.brandId || null;
  const brandName = location.state?.brandName || null;

  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 24;

  const normalizeId = (v) =>
    typeof v === "string" ? v.normalize("NFKC").trim() : "";

  const isObjectId = (v) => /^[a-f0-9]{24}$/i.test(v);

  const category = normalizeId(catId);
  const subcategory = normalizeId(subCatId);
  const subCategoryName = subCategory;

  const [filters, setFilters] = useState(initialFilters);
  const [sort, setSort] = useState("popular");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  //  CRITICAL FIX: Fetch Products with proper dependency array
  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      setErrorMsg("");
      setProducts([]); // Clear previous products IMMEDIATELY


      // ========== NEW: Handle View All Category Request ==========  
      if (categoryId && categoryName) {
        try {
          setIsLoading(true);

          const res = await API.get(`/getProductByCatId/${categoryId}`);
          const list = res.data?.data || [];

          setProducts(list);
          setPage(1);
        } catch (e) {
          console.log(e);
          setErrorMsg("Failed to load category products");
        } finally {
          setIsLoading(false);
        }

        return; // VERY IMPORTANT
      }


      if (BrandId) {
        try {
          const res = await API.get(`/brand/${BrandId}`);
          const list = res.data?.products || [];
          setProducts(list);
          setPage(1);
        } catch (e) {
          console.log(e);
          setErrorMsg("Failed to load brand products");
        } finally {
          setIsLoading(false);
        }
        return;
      }



      if (shape) {
        try {
          const res = await API.get("/getallproduct");
          const fullList = res.data?.products || res.data || [];

          const filtered = fullList.filter((p) => {
            return (
              String(p.face_shape)?.toLowerCase() === shape.toLowerCase()
            );
          });

          setProducts(filtered);
          setPage(1);
        } catch (e) {
          console.log(e);
          setErrorMsg("Failed to load products");
        } finally {
          setIsLoading(false);
        }
        return;
      }


      if (allBrands === "allProduct") {
        try {
          const res = await API.get("/getallproduct");
          const fullList = res.data?.products || res.data || [];

          const filtered = fullList.filter((p) => p.
            brand_id
          );
          setProducts(filtered);
          setPage(1);
        } catch (e) {
          console.log(e);
          setErrorMsg("Failed to load products");
        } finally {
          setIsLoading(false);
        }
        return;
      }


      if (gender) {
        try {
          const res = await API.get("/getallproduct");
          const fullList = res.data?.products || res.data || [];
          console.log(fullList);


          const filtered = fullList.filter((p) => {
            return (
              String(p.gender)?.toLowerCase() === gender.toLowerCase()
            );
          });

          setProducts(filtered);
          setPage(1);
        } catch (e) {
          console.log(e);
          setErrorMsg("Failed to load products");
        } finally {
          setIsLoading(false);
        }
        return;
      }

      if (lens_type) {
        try {
          const res = await API.get("/getallproduct");
          const fullList = res.data?.products || res.data || [];
          const filtered = fullList.filter((p) => {
            return (
              String(p.subCategoryName)?.toLowerCase() === lens_type.toLowerCase()
            );
          });

          setProducts(filtered);
          setPage(1);
        } catch (e) {
          console.log(e);
          setErrorMsg("Failed to load products");
        } finally {
          setIsLoading(false);
        }
        return;

      }

      if (frame_shape) {
        try {
          const res = await API.get("/getallproduct");
          const fullList = res.data?.products || res.data || [];

          const filtered = fullList.filter((p) =>
            String(p.frame_shape)?.toLowerCase() === frame_shape.toLowerCase() &&
            String(p.cat_id) === "6915705d9ceac0cdda41c83f"
          );

          setProducts(filtered);
          setPage(1);
        } catch (e) {
          console.log(e);
          setErrorMsg("Failed to load products");
        } finally {
          setIsLoading(false);
        }
        return;
      }


      if (frameShape) {
        try {
          const res = await API.get("/getallproduct");
          const fullList = res.data?.products || res.data || [];

          const filtered = fullList.filter((p) =>
            String(p.frame_shape)?.toLowerCase() === frameShape.toLowerCase()
          );

          setProducts(filtered);
          setPage(1);
        } catch (e) {
          console.log(e);
          setErrorMsg("Failed to load products");
        } finally {
          setIsLoading(false);
        }
        return;
      }

      if (contactBrandId) {
        try {
          const res = await API.get("/getallproduct");
          const fullList = res.data?.products || res.data || [];

          const filtered = fullList.filter((p) =>
            String(p.brand_id) === contactBrandId
            &&
            String(p.cat_id) === "6915735feeb23fa59c7d532b"
          );
          setProducts(filtered);
          setPage(1);
        } catch (e) {
          console.log(e);
          setErrorMsg("Failed to load products");
        } finally {
          setIsLoading(false);
        }
        return;
      }



      if (collection) {
        try {
          const res = await API.get("/getallproduct");
          const fullList = res.data?.products || res.data || [];

          let filtered = [];

          if (collection === "best-seller") {
            filtered = fullList.filter((p) => p.isBestSeller === true);
          }
          else if (collection === "trending") {
            filtered = fullList.filter((p) => p.isTrending === true);
          }
          else {
            filtered = fullList.filter((p) => String(p.brand_id) === collection);
          }

          setProducts(filtered);
          setPage(1);
        } catch (e) {
          console.log(e);
          setErrorMsg("Failed to load products");
        } finally {
          setIsLoading(false);
        }
        return;
      }



      if (lens_cat) {
        try {
          const res = await API.get("/getallproduct");
          const fullList = res.data?.products || res.data || [];

          const cleanedLens = lens_cat.trim().toLowerCase();

          const filtered = fullList.filter((p) => {
            const type = String(p.lens_type || "").trim().toLowerCase();
            const catIdMatch = String(p.cat_id) === "6915735feeb23fa59c7d532b";

            // DAILY
            if (cleanedLens === "daily") {
              return type === "daily" && catIdMatch;
            }

            // WEEKLY or BIWEEKLY
            if (cleanedLens === "weekly" || cleanedLens === "biweekly") {
              return (
                (type.includes("week") || type.includes("bi")) &&
                catIdMatch
              );
            }

            // MONTHLY
            if (cleanedLens === "monthly") {
              return type === "monthly" && catIdMatch;
            }

            return false;
          });

          setProducts(filtered);
          setPage(1);
        } catch (e) {
          console.log(e);
          setErrorMsg("Failed to load products");
        } finally {
          setIsLoading(false);
        }
        return;
      }



      // ========== New CategoryProducts Filter ============
      if (slug) {
        try {
          const res = await API.get("/getAllProduct");
          const fullList = res.data?.products || [];

          let filtered = [];

          // Allowed categories for Men/Women
          const allowedCatIds = [
            "6915705d9ceac0cdda41c83f",
            "69157332eeb23fa59c7d5326",
          ];

          // MEN
          if (slug === "men") {
            filtered = fullList.filter(
              (p) =>
                allowedCatIds.includes(p.cat_id) &&
                (p.gender?.toLowerCase() === "men" ||
                  p.gender?.toLowerCase() === "unisex")
            );
          }

          // WOMEN
          if (slug === "women") {
            filtered = fullList.filter(
              (p) =>
                allowedCatIds.includes(p.cat_id) &&
                (p.gender?.toLowerCase() === "women" ||
                  p.gender?.toLowerCase() === "unisex")
            );
          }

          // CONTACT LENS BY catId
          if (slug === "contact-lens") {
            filtered = fullList.filter(
              (p) => p.cat_id === "6915735feeb23fa59c7d532b"
            );
          }

          setProducts(filtered);
          setPage(1);

        } catch (e) {
          console.log(e);
          setErrorMsg("Failed to load products");
        } finally {
          setIsLoading(false);
        }

        return; // IMPORTANT
      }




      if (collectionName) {
        try {
          const res = await API.get("/getAllProduct");
          const fullList = res.data?.products || [];

          let filtered = [];

          // CATEGORY IDs
          const GLASSES = "69157332eeb23fa59c7d5326";
          const SUNGLASSES = "6915705d9ceac0cdda41c83f";

          switch (collectionName) {
            case "glasses":
              filtered = fullList.filter((p) => p.cat_id === GLASSES);
              break;

            case "sunglasses":
              filtered = fullList.filter((p) => p.cat_id === SUNGLASSES);
              break;

            case "transitions":
              filtered = fullList.filter(
                (p) => p.subCategoryName?.toLowerCase() === "transitions"
              );
              break;

            case "blue-violet":
              filtered = fullList.filter(
                (p) => p.subCategoryName?.toLowerCase() === "blue violet"
              );
              break;

            case "progressive":
              filtered = fullList.filter(
                (p) => p.subCategoryName?.toLowerCase() === "progressive"
              );
              break;

            case "kids":
              filtered = fullList.filter(
                (p) => p.subCategoryName?.toLowerCase() === "kids"
              );
              break;

            // OLD LOGIC
            case "men":
              filtered = fullList.filter(
                (p) =>
                  p.gender?.toLowerCase() === "men" ||
                  p.gender?.toLowerCase() === "unisex"
              );
              break;

            case "women":
              filtered = fullList.filter(
                (p) =>
                  p.gender?.toLowerCase() === "women" ||
                  p.gender?.toLowerCase() === "unisex"
              );
              break;

            case "contact-lens":
              filtered = fullList.filter(
                (p) => p.cat_id === "6915735feeb23fa59c7d532b"
              );
              break;
          }


          setProducts(filtered);
          setPage(1);
        } catch (e) {
          console.log(e);
          setErrorMsg("Failed to load products");
        } finally {
          setIsLoading(false);
        }

        return;
      }





      if (brandId) {
        const res = await API.get(`/brand/${brandId}`);
        const list = res.data?.products || [];
        setProducts(list);
        setPage(1);
        return;
      }

      if (!category || !subcategory) {
        setErrorMsg("Category or Subcategory missing in navigation state.");
        setIsLoading(false);
        return;
      }

      if (!isObjectId(category) || !isObjectId(subcategory)) {
        setErrorMsg("Invalid categoryId or subCategoryId.");
        setIsLoading(false);
        return;
      }

      const url = `/products/${category}/${subcategory}`;
      const res = await API.get(url);

      const data = res?.data;
      const list = Array.isArray(data)
        ? data
        : Array.isArray(data?.products)
          ? data.products
          : Array.isArray(data?.data)
            ? data.data
            : [];

      setProducts(list);
      setPage(1);
    } catch (e) {
      console.error("PLP fetch error:", e);
      setErrorMsg(e?.response?.data?.message || "Failed to load products.");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch Wishlist
  const fetchWishlist = async () => {
    try {
      const userId2 = localStorage.getItem("user");
      if (!userId2) return;
      const res = await API.get(`/getWishlist/${userId2}`);
      const valid = res.data?.products?.filter((p) => p.productId) || [];
      setWishlist(valid.map((p) => p.productId._id));
    } catch (e) { }
  };

  //  CRITICAL FIX: Proper dependency array with catId, subCatId, and brandId
  useEffect(() => {
    fetchProducts();
    fetchWishlist();
  }, [catId, subCatId, brandId, shape, gender, lens_type, frame_shape, collection, lens_cat, contactBrandId, slug, collectionName, frameShape, categoryId, categoryName, BrandId, allBrands]);

  // Facets + Filters
  const facetData = useMemo(() => {
    const norm = (s) => String(s || "").toLowerCase().trim();
    const brands = new Set();
    const genders = new Set();
    const shapes = new Set();
    const colors = new Set();
    const materials = new Set();
    let min = Infinity,
      max = -Infinity;

    products.forEach((p) => {
      const brandName =
        p?.brand_id?.brand ||
        p?.brand ||
        p?.product_brand ||
        "";
      if (brandName) brands.add(brandName.trim());

      const gender = p.gender?.trim();
      if (gender) genders.add(gender);

      if (p.frame_shape) shapes.add(p.frame_shape.trim());
      if (p.face_shape) shapes.add(p.face_shape.trim());
      if (p.frame_color) colors.add(p.frame_color.trim());
      if (p.frame_material) materials.add(p.frame_material.trim());

      const price = Number(p.product_sale_price || p.product_price || 0);
      if (!Number.isNaN(price)) {
        min = Math.min(min, price);
        max = Math.max(max, price);
      }
    });

    if (!Number.isFinite(min)) {
      min = 0;
      max = 9999;
    }

    return {
      brands: Array.from(brands).sort(),
      genders: Array.from(genders).sort(),
      shapes: Array.from(shapes).sort(),
      colors: Array.from(colors).sort(),
      materials: Array.from(materials).sort(),
      min,
      max,
    };
  }, [products]);

  // Filter and Sort
  const matchesFilters = (p) => {
    const brand =
      p?.brand_id?.brand?.trim() ||
      p?.brand?.trim() ||
      p?.product_brand?.trim() ||
      "";
    const gender = (p.gender || "").trim().toLowerCase();
    const shape = String(p.frame_shape || "").trim();
    const face_shape = String(p.face_shape || "").trim();
    const color = String(p.frame_color || "").trim();
    const material = String(p.frame_material || "").trim();
    const price = Number(p.product_sale_price || p.product_price || 0);

    if (filters.brands.size && !filters.brands.has(brand)) return false;
    if (filters.genders.size && ![...filters.genders].some(g => g.toLowerCase() === gender)) return false;
    if (filters.shapes.size && !filters.shapes.has(shape)) return false;
    if (filters.face_shape && !filters.face_shape.has(face_shape)) return false;
    if (filters.colors.size && !filters.colors.has(color)) return false;
    if (filters.materials.size && !filters.materials.has(material)) return false;
    if (price < filters.priceMin || price > filters.priceMax) return false;
    return true;
  };

  const applySort = (arr) => {
    switch (sort) {
      case "low":
        return [...arr].sort(
          (a, b) =>
            (a.product_sale_price || a.product_price || 0) -
            (b.product_sale_price || b.product_price || 0)
        );
      case "high":
        return [...arr].sort(
          (a, b) =>
            (b.product_sale_price || b.product_price || 0) -
            (a.product_sale_price || a.product_price || 0)
        );
      case "new":
        return [...arr].sort(
          (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
        );
      default:
        return arr;
    }
  };

  const filteredProducts = useMemo(
    () => applySort(products.filter(matchesFilters)),
    [products, filters, sort]
  );

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / pageSize));
  const pageSlice = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredProducts.slice(start, start + pageSize);
  }, [filteredProducts, page]);

  useEffect(() => {
    setPage(1);
  }, [
    sort,
    filters.priceMin,
    filters.priceMax,
    JSON.stringify([...filters.brands]),
    JSON.stringify([...filters.shapes]),
    JSON.stringify([...filters.colors]),
    JSON.stringify([...filters.materials]),
  ]);

  const wishSet = useMemo(() => new Set(wishlist), [wishlist]);

  // Wishlist Toggle
  const toggleWishlist = async (productId) => {
    const userId2 = localStorage.getItem("user");
    if (!userId2) {
      Toast.fire({ icon: "info", title: "Please sign in to use wishlist" });
      return;
    }
    const isIn = wishSet.has(productId);
    const prev = wishlist;
    const next = isIn ? prev.filter((id) => id !== productId) : [...prev, productId];
    setWishlist(next);
    try {
      if (isIn) {
        await API.delete("/removeWishlist", { data: { userId: userId2, productId } });
        Toast.fire({ icon: "success", title: "Removed from wishlist" });
      } else {
        await API.post("/addWishlist", { userId: userId2, productId });
        Toast.fire({ icon: "success", title: "Added to wishlist" });
      }
    } catch (err) {
      setWishlist(prev);
      Toast.fire({ icon: "error", title: "Wishlist update failed" });
    }
  };

  const primaryImage = (data) => {
    const src =
      data?.product_variants?.[0]?.images?.[0] ||
      data?.product_image_collection?.[0] ||
      data?.product_image ||
      "";
    return resolveImg(src);
  };

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="w-full border-b border-gray-200 bg-[#f00000]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div>
            <div className="text-[33px] ml-130 tracking-wide font-semibold uppercase text-white">
              {brandName ? brandName : subCategory}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <label htmlFor="sort" className="sr-only">
                Sort by
              </label>
              <select
                id="sort"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="px-3 py-1.5 border border-gray-300 rounded text-sm bg-white"
                aria-label="Sort products"
              >
                <option value="popular">Most popular</option>
                <option value="low">Price: Low to high</option>
                <option value="high">Price: High to low</option>
                <option value="new">New arrivals</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Header Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <h1 className="text-2xl font-bold capitalize">
          {brandName
            ? `${brandName} – ${subCategoryName || ""}`
            : subCategoryName || "Products"}
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          {isLoading ? "Loading…" : `${filteredProducts.length} Results`}
        </p>
        {errorMsg && (
          <div className="bg-[#f00000] border border-red-200 text-[#f00000] rounded-lg p-3 mt-3">
            {errorMsg}
          </div>
        )}
      </div>

      {/* Mobile Filter Drawer */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 ${isFilterOpen ? "block" : "hidden"
          }`}
        onClick={() => setIsFilterOpen(false)}
        aria-hidden="true"
      />
      <aside
        id="filters-drawer"
        role="dialog"
        aria-modal="true"
        className={`fixed z-50 inset-y-0 left-0 w-80 bg-white border-r border-gray-200 transform transition-transform duration-200 ${isFilterOpen ? "translate-x-0" : "-translate-x-full"
          } lg:hidden`}
      >
        <div className="p-4 flex items-center justify-between border-b">
          <h3 className="text-base font-semibold">Filters</h3>
          <button
            className="text-sm px-2 py-1 rounded border"
            onClick={() => setIsFilterOpen(false)}
            aria-label="Close filters"
          >
            Close
          </button>
        </div>
        <div className="p-4 overflow-y-auto h-full">
          <FilterSections
            filters={filters}
            setFilters={setFilters}
            facetData={facetData}
          />
          <div className="mt-4 flex items-center gap-2">
            <button
              onClick={() => setIsFilterOpen(false)}
              className="flex-1 bg-black text-white rounded px-3 py-2 text-sm"
            >
              Apply
            </button>
            <button
              onClick={() => setFilters(initialFilters)}
              className="flex-1 border rounded px-3 py-2 text-sm"
            >
              Clear all
            </button>
          </div>
        </div>
      </aside>

      {/* Grid + Sidebar Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 pb-8">
        <div className="lg:grid lg:grid-cols-[16rem_1fr] lg:gap-8">
          {/* Sidebar */}
          <aside className="hidden lg:block lg:sticky lg:top-20 lg:self-start lg:w-64 lg:shrink-0">
            <div className="border border-black rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-base font-semibold">Filters</h3>
                <button
                  onClick={() => setFilters(initialFilters)}
                  className="text-sm underline"
                >
                  Clear
                </button>
              </div>
              <FilterSections
                filters={filters}
                setFilters={setFilters}
                facetData={facetData}
              />
            </div>
          </aside>

          {/* Product Grid */}
          <div>
            {isLoading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-gray-200 p-4"
                  >
                    <div className="h-36 bg-gray-100 rounded mb-4 animate-pulse" />
                    <div className="h-4 w-3/4 bg-gray-100 rounded mb-2 animate-pulse" />
                    <div className="h-4 w-1/2 bg-gray-100 rounded animate-pulse" />
                  </div>
                ))}
              </div>
            ) : pageSlice.length === 0 ? (
              <div className="text-center text-gray-600 py-16">
                No products found.
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                {pageSlice.map((data) => {
                  const img = primaryImage(data);
                  const inWishlist = wishSet.has(data._id);
                  const isInStock = (data.stockAvailability ?? 0) > 0;

                  return (
                    <ProductCard
                      key={data._id}
                      data={data}
                      img={img}
                      inWishlist={inWishlist}
                      toggleWishlist={toggleWishlist}
                      isInStock={isInStock}
                    />
                  );
                })}
              </div>
            )}

            {/* Pagination */}
            {!isLoading && filteredProducts.length > pageSize && (
              <div className="flex items-center justify-center gap-2 mt-6">
                <button
                  className="p-2 rounded border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  aria-label="Previous page"
                >
                  <FaChevronLeft />
                </button>
                <div className="flex items-center gap-1">
                  {Array.from({
                    length: Math.max(
                      1,
                      Math.ceil(filteredProducts.length / pageSize)
                    ),
                  }).map((_, i) => {
                    const n = i + 1;
                    const isActive = n === page;
                    return (
                      <button
                        key={n}
                        onClick={() => setPage(n)}
                        className={`px-3 py-1 rounded border ${isActive
                          ? "bg-black text-white border-black"
                          : "border-gray-300 hover:bg-gray-50"
                          }`}
                        aria-current={isActive ? "page" : undefined}
                      >
                        {n}
                      </button>
                    );
                  })}
                </div>
                <button
                  className="p-2 rounded border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
                  onClick={() => setPage((p) => p + 1)}
                  disabled={page * pageSize >= filteredProducts.length}
                  aria-label="Next page"
                >
                  <FaChevronRight />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recently Viewed */}
      <RecentlyView />

      {/* Our Promise */}
      <OurPromise />
    </div>
  );
}

export default Product;
