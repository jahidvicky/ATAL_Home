import React, { useEffect, useMemo, useState } from "react";
import API, { IMAGE_URL } from "../../API/Api";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import RecentlyView from "../collections/RecentlyView";
import StockAvailability from "../collections/StockAvailability";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import OurPromise from "../Cart/OurPromise";


// ADDED: SweetAlert2 toast mixin for consistent toasts
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true,
});


// ADDED: filter and sort UI helpers
// Reason: Reproduce Clearly PLP with left filters + top sort; client-side filtering projection
const initialFilters = {
  brands: new Set(),
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


function Product() {
  const { catId, subCategory, subCatId } = useParams();


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


  // ADDED: filter/sort states and drawer state
  const [filters, setFilters] = useState(initialFilters);
  const [sort, setSort] = useState("popular");
  const [isFilterOpen, setIsFilterOpen] = useState(false);


  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      setErrorMsg("");


      if (!category || !subcategory) {
        setErrorMsg("Category or Subcategory missing in navigation state.");
        console.warn("PLP missing ids", { category, subcategory });
        setIsLoading(false);
        return;
      }


      if (!isObjectId(category) || !isObjectId(subcategory)) {
        console.warn("PLP ids present but not 24-hex yet", {
          category,
          subcategory,
          catLen: category.length,
          subLen: subcategory.length,
        });
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
      console.error(
        "PLP fetch error:",
        e?.response?.status,
        e?.response?.data || e.message
      );
      setErrorMsg(e?.response?.data?.message || "Failed to load products.");
    } finally {
      setIsLoading(false);
    }
  };


  const fetchWishlist = async () => {
    try {
      const userId2 = localStorage.getItem("user");
      if (!userId2) return;
      const res = await API.get(`/getWishlist/${userId2}`);
      const valid = res.data?.products?.filter((p) => p.productId) || [];
      setWishlist(valid.map((p) => p.productId._id));
    } catch (e) { }
  };


  useEffect(() => {
    fetchProducts();
    fetchWishlist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [catId, subCatId]);


  // ADDED: derived facets and filtered/sorted projection feeding pagination
  const facetData = useMemo(() => {
    const norm = (s) => String(s || "").toLowerCase().trim();
    const brands = new Set();
    const shapes = new Set();
    const colors = new Set();
    const materials = new Set();
    let min = Infinity, max = -Infinity;

    products.forEach((p) => {
      if (p.brand || p.product_brand) brands.add(norm(p.brand || p.product_brand));
      if (p.frame_shape) shapes.add(norm(p.frame_shape));
      if (p.color || p.frame_color) colors.add(norm(p.color || p.frame_color));
      if (p.material || p.frame_material) materials.add(norm(p.material || p.frame_material));
      const price = Number(p.product_sale_price || p.product_price || 0);
      if (!Number.isNaN(price)) { min = Math.min(min, price); max = Math.max(max, price); }
    });

    if (!Number.isFinite(min)) { min = 0; max = 9999; }

    return {
      brands: Array.from(brands).sort(),
      shapes: Array.from(shapes).sort(),
      colors: Array.from(colors).sort(),
      materials: Array.from(materials).sort(),
      min, max
    };
  }, [products]);

  const matchesFilters = (p) => {
    const brand = String(p.brand || p.product_brand || "").toLowerCase().trim();
    const shape = String(p.frame_shape || "").toLowerCase().trim();
    const color = String(p.color || p.frame_color || "").toLowerCase().trim();
    const material = String(p.material || p.frame_material || "").toLowerCase().trim();
    const price = Number(p.product_sale_price || p.product_price || 0);

    if (filters.brands.size && !filters.brands.has(brand)) return false;
    if (filters.shapes.size && !filters.shapes.has(shape)) return false;
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

  // ADDED: reset page when filters/sort change to keep UX tidy
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


  // ADDED: Set for O(1) wishlist checks; recomputed when wishlist changes
  const wishSet = useMemo(() => new Set(wishlist), [wishlist]);


  const toggleWishlist = async (productId) => {
    const userId2 = localStorage.getItem("user");
    if (!userId2) {
      Toast.fire({ icon: "info", title: "Please sign in to use wishlist" });
      return;
    }
    // Optimistic update with rollback on failure
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
      // Rollback on error
      setWishlist(prev);
      console.error("Wishlist toggle failed:", err);
      Toast.fire({ icon: "error", title: "Wishlist update failed" });
    }
  };


  const primaryImage = (data) => {
    const src = data?.product_image_collection?.[0] || data?.product_image || "";
    if (!src) return "";
    return src.startsWith("http") ? src : `${IMAGE_URL}${src}`;
  };


  // ADDED: Filter sections as an inline component to avoid external files
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
              setFilters((prev) => ({ ...prev, [setKey]: toggleSet(prev[setKey], value) }))
            }
            aria-checked={on}
          />
          <span className="text-sm capitalize">{label}</span>
        </label>
      );
    };
    return (
      <div>
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


  return (
    <div className="bg-white">
      {/* Header */}
      {/* REPLACED VISUALS ONLY: Promo + controls band to match Clearly; functionality preserved */}
      <div className="w-full border-b border-gray-200 bg-red-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div >
            <div className="text-[33px] ml-130 tracking-wide font-semibold uppercase text-white">{subCategory}</div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <label htmlFor="sort" className="sr-only">Sort by</label>
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

      {/* Original header metrics kept */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <h1 className="text-2xl font-bold capitalize">{subCategoryName || "Products"}</h1>
        <p className="text-sm text-gray-500 mt-1">
          {isLoading ? "Loading…" : `${filteredProducts.length} Results`}
        </p>
        {errorMsg && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 mt-3">
            {errorMsg}
          </div>
        )}
      </div>

      {/* Filters: overlay + drawer mobile */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 ${isFilterOpen ? "block" : "hidden"}`}
        onClick={() => setIsFilterOpen(false)}
        aria-hidden="true"
      />
      <aside
        id="filters-drawer"
        role="dialog"
        aria-modal="true"
        className={`fixed z-50 inset-y-0 left-0 w-80 bg-white border-r border-gray-200 transform transition-transform duration-200 ${isFilterOpen ? "translate-x-0" : "-translate-x-full"} lg:hidden`}
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
          <FilterSections filters={filters} setFilters={setFilters} facetData={facetData} />
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

      {/* Grid + desktop sidebar layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 pb-8">
        <div className="lg:grid lg:grid-cols-[16rem_1fr] lg:gap-8">
          {/* Desktop sticky sidebar */}
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
              <FilterSections filters={filters} setFilters={setFilters} facetData={facetData} />
            </div>
          </aside>

          {/* Main column */}
          <div>
            {isLoading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="rounded-xl border border-gray-200 p-4">
                    <div className="h-36 bg-gray-100 rounded mb-4 animate-pulse" />
                    <div className="h-4 w-3/4 bg-gray-100 rounded mb-2 animate-pulse" />
                    <div className="h-4 w-1/2 bg-gray-100 rounded animate-pulse" />
                  </div>
                ))}
              </div>
            ) : pageSlice.length === 0 ? (
              <div className="text-center text-gray-600 py-16">No products found.</div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                {pageSlice.map((data) => {
                  const img = primaryImage(data);
                  const inWishlist = wishSet.has(data._id);
                  const isInStock = (data.stockAvailability ?? 0) > 0;


                  return (
                    <div
                      key={data._id}
                      className="relative bg-white rounded-xl border border-red-500 shadow-sm hover:shadow-md transition-shadow p-4 flex flex-col group"
                    >
                      {/* Wishlist */}
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
                          <AiFillHeart className="text-red-500 text-2xl" />
                        ) : (
                          <AiOutlineHeart className="text-gray-500 text-2xl" />
                        )}
                      </button>


                      {/* Stock chip */}
                      <div className="absolute top-3 right-15">
                        <StockAvailability data={data.stockAvailability} />
                      </div>


                      {/* Image */}
                      <Link
                        to={`/product/${data._id}/${data.subCategoryName}/${data.subCat_id}`}
                        className="block"
                      >
                        {img ? (
                          <img
                            src={img}
                            // alt={data.product_name}
                            className="w-full h-36 object-contain mb-2 mt-4 pt-6 transition-transform duration-200 group-hover:scale-103"
                            loading="lazy"
                            decoding="async"
                          />
                        ) : (
                          <div className="w-full h-36 bg-gray-100 rounded mb-4" />
                        )}
                      </Link>


                      {/* Title */}
                      <Link
                        to={`/product/${data._id}/${data.subCategoryName}/${data.subCat_id}`}
                        className="hover:underline"
                      >
                        <h2 className="font-semibold text-gray-800 text-base line-clamp-2 min-h-[10px]">
                          {data.product_name}
                        </h2>
                      </Link>


                      {/* Price + CTA */}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-600"></span>
                          {data.product_price &&
                            data.product_sale_price &&
                            data.product_price !== data.product_sale_price ? (
                            <>
                              <span className="text-gray-400 line-through">
                                ${data.product_price}
                              </span>
                              <span className="text-red-600 font-semibold">
                                ${data.product_sale_price}
                              </span>
                            </>
                          ) : (
                            <span className="text-gray-900 font-semibold">
                              ${data.product_sale_price || data.product_price}
                            </span>
                          )}
                        </div>
                        {isInStock ? (
                          <Link
                            to={`/product/${data._id}/${data.subCategoryName}/${data.subCat_id}`}
                          >
                            <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg text-sm">
                              Buy
                            </button>
                          </Link>
                        ) : (
                          <button
                            disabled
                            className="bg-gray-400 text-white px-3 py-1 rounded-lg text-sm cursor-not-allowed"
                          >
                            Out of Stock
                          </button>
                        )}
                      </div>
                    </div>
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
                    length: Math.max(1, Math.ceil(filteredProducts.length / pageSize)),
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
      {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> */}
      <RecentlyView />
      {/* </div> */}

      <div>
        <OurPromise />
      </div>
    </div>
  );
}


export default Product;

