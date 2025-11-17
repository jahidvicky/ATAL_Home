import React, { useEffect, useMemo, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { IMAGE_URL } from "../../../API/Api";

function MegaMenuPanel({ open, onClose, activeKey, dataByKey, grouped }) {
    const panelRef = useRef(null);
    const navigate = useNavigate();

    /* Close on outside click */
    useEffect(() => {
        const handleClick = (e) => {
            if (panelRef.current && !panelRef.current.contains(e.target)) {
                onClose?.();
            }
        };

        if (open) {
            document.addEventListener("mousedown", handleClick);
            document.addEventListener("touchstart", handleClick);
        }

        return () => {
            document.removeEventListener("mousedown", handleClick);
            document.removeEventListener("touchstart", handleClick);
        };
    }, [open]);

    /* Escape close */
    useEffect(() => {
        const onKey = (e) => e.key === "Escape" && onClose?.();
        if (open) window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open]);

    const menu = dataByKey[activeKey];

    /* Fetch subcategories for left column */
    const activeSubcategories = useMemo(() => {
        if (!activeKey || !grouped.length) return [];

        const categoryNameMap = {
            glasses: "glasses",
            sunglasses: "sunglasses",
            contact_lenses: "contact_lenses",
        };

        const targetName = categoryNameMap[activeKey];
        if (!targetName) return [];

        const matchedCategory = grouped.find(
            (cat) => cat.categoryName.toLowerCase() === targetName.toLowerCase()
        );

        if (!matchedCategory) return [];

        return [...matchedCategory.subCategories].sort((a, b) =>
            a.name.localeCompare(b.name)
        );
    }, [activeKey, grouped]);

    const panelMotion = {
        initial: { opacity: 0, y: -10 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -10 },
        transition: { duration: 0.2 },
    };

    /* SPECIAL TITLES */
    const specialCases = [
        "Shop By Face Shape",
        "Shop by Category",
        "Shop By Lens Type",
        "Shop by Frame Shape",
        "Shop by Our Picks",
        "Shop by Lens Category",
    ];

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    {...panelMotion}
                    ref={panelRef}
                    className="absolute left-1/2 -translate-x-1/2 top-full bg-white shadow-2xl border z-50 w-[1100px] max-w-[96vw]"
                >
                    <div className="grid grid-cols-[340px_380px_1fr]">

                        {/* LEFT COLUMN */}
                        <div className="p-6 border-r overflow-y-auto max-h-[500px]">
                            <h3 className="font-semibold text-[16px] mb-6">
                                {activeKey
                                    ? activeKey.charAt(0).toUpperCase() + activeKey.slice(1)
                                    : "Shop"}
                            </h3>

                            {activeSubcategories.length > 0 ? (
                                <ul className="space-y-4">
                                    {activeSubcategories.map((sub) => {
                                        const categoryNameMap = {
                                            glasses: "glasses",
                                            sunglasses: "sunglasses",
                                            contact_lenses: "contact_lenses",
                                        };

                                        const targetName = categoryNameMap[activeKey];
                                        const matchedCategory = grouped.find(
                                            (cat) =>
                                                cat.categoryName.toLowerCase() ===
                                                targetName.toLowerCase()
                                        );

                                        return (
                                            <li
                                                key={sub.id}
                                                className="flex items-center gap-4 p-2 rounded-lg hover:bg-red-600 hover:text-white cursor-pointer transition"
                                                onClick={() => {
                                                    onClose?.();
                                                    navigate(
                                                        `/allproduct/${sub.name}/${matchedCategory.categoryId}/${sub.id}`
                                                    );
                                                }}
                                            >
                                                <img
                                                    src={
                                                        sub.image.startsWith("http")
                                                            ? sub.image
                                                            : IMAGE_URL + sub.image
                                                    }
                                                    className="w-12 h-12 rounded-full object-cover"
                                                    alt={sub.name}
                                                />
                                                <span className="text-[15px]">
                                                    {sub.name}
                                                </span>
                                            </li>
                                        );
                                    })}
                                </ul>
                            ) : (
                                <p className="text-gray-500 text-sm">
                                    No subcategories available
                                </p>
                            )}

                            <div className="mt-8">
                                <button className="bg-black py-3 px-8 rounded-lg text-white hover:bg-gray-900">
                                    View All
                                </button>
                            </div>
                        </div>

                        {/* ================== MIDDLE COLUMN ================== */}
                        <div className="p-6 bg-gray-100 overflow-y-auto max-h-[500px]">
                            {menu?.columns?.map((col) => (
                                <div key={col.title} className="mb-6">

                                    <h4 className="font-bold uppercase text-[14px] mb-2">
                                        {col.title}
                                    </h4>

                                    <ul className="space-y-1">

                                        {/* CASE 1: Dynamic Column (Brands) */}
                                        {col.dynamic ? (
                                            col.links?.length > 0 ? (
                                                col.links.map((item) => (
                                                    <li key={item._id || item.name}>
                                                        <button
                                                            onClick={() => {
                                                                onClose?.();
                                                                navigate(
                                                                    `/brands/${item.slug || item.name}`,
                                                                    { state: item }
                                                                );
                                                            }}
                                                            className="text-[14px] hover:text-red-500 block py-1 text-left w-full"
                                                        >
                                                            {item.name}
                                                        </button>
                                                    </li>
                                                ))
                                            ) : (
                                                <li className="text-[13px] text-gray-500">
                                                    Loading...
                                                </li>
                                            )
                                        ) : (
                                            /* CASE 2: Static Column with special logic */

                                            col.links.map((l) => (
                                                <li key={l.label}>
                                                    {specialCases.includes(col.title) ? (
                                                        <button
                                                            onClick={() => {
                                                                onClose?.();

                                                                if (col.id === 101) {
                                                                    navigate(
                                                                        `/glasses/${l.faceShape}`
                                                                    );
                                                                }

                                                                if (col.id === 102) {
                                                                    navigate(
                                                                        `/glasses/gender/${l.gender}`
                                                                    );
                                                                }

                                                                if (col.id === 103) {
                                                                    navigate(
                                                                        `/glasses/lens_type/${l.lens_type}`
                                                                    );
                                                                }
                                                                if (col.id === 201) {
                                                                    navigate(`/sunglasses/collection/${l.collection}`);

                                                                }

                                                                if (col.id === 202) {
                                                                    navigate(
                                                                        `/sunglasses/lens_type/${l.lens_type}`
                                                                    );
                                                                }

                                                                if (col.id === 203) {
                                                                    navigate(
                                                                        `/sunglasses/frame_shape/${l.frame_shape}`
                                                                    );
                                                                }

                                                                if (col.id === 301) {
                                                                    navigate(
                                                                        `/contact_lenses/category/${l.lens_cat}/${l.catId}`
                                                                    );
                                                                }

                                                            }}
                                                            className="text-[14px] hover:text-red-500 block py-1 text-left w-full"
                                                        >
                                                            {l.label}
                                                        </button>
                                                    ) : (
                                                        <Link
                                                            to={l.to}
                                                            state={l.state}
                                                            onClick={() => onClose?.()}
                                                            className="text-[14px] hover:text-red-500 block py-1"
                                                        >
                                                            {l.label}
                                                        </Link>
                                                    )}
                                                </li>
                                            ))
                                        )}

                                    </ul>
                                </div>
                            ))}
                        </div>

                        {/* RIGHT COLUMN */}
                        <div className="p-6 bg-[#fafafa] border-l">
                            {menu?.promo?.image && (
                                <img
                                    src={menu.promo.image}
                                    className="w-full h-[300px] rounded-sm object-cover"
                                    alt="promo"
                                />
                            )}

                            <h5 className="font-semibold text-[16px] mt-4">
                                {menu?.promo?.headline}
                            </h5>

                            <p className="text-[14px] text-gray-600 mt-1">
                                {menu?.promo?.text}
                            </p>

                            {menu?.promo?.ctaLabel && (
                                <Link
                                    to={menu.promo.ctaTo}
                                    onClick={() => onClose?.()}
                                    className="inline-block mt-3 bg-black text-white px-4 py-2 text-sm rounded-lg"
                                >
                                    {menu.promo.ctaLabel}
                                </Link>
                            )}
                        </div>

                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default MegaMenuPanel;
