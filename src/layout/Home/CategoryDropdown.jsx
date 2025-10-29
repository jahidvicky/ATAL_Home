import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import API from "../../API/Api";

const HeaderCategoryMenu = () => {
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState({}); // stores fetched arrays
    const [menuVisible, setMenuVisible] = useState(false);
    const [hoveredCategory, setHoveredCategory] = useState(null);
    const [fetchedCategories, setFetchedCategories] = useState({}); // tracks which categories are fetched
    const timeoutRef = useRef(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const res = await API.get("/getcategories");
            setCategories(res.data?.categories || res.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const fetchSubcategories = async (categoryId) => {
        try {
            const res = await API.get(`/getSubCatByCatId/${categoryId}`);
            setSubcategories((prev) => ({
                ...prev,
                [categoryId]: res.data?.subcategories || [],
            }));
            setFetchedCategories((prev) => ({ ...prev, [categoryId]: true }));
        } catch (error) {
            console.error("Error fetching subcategories:", error);
            setSubcategories((prev) => ({ ...prev, [categoryId]: [] }));
            setFetchedCategories((prev) => ({ ...prev, [categoryId]: true }));
        }
    };

    const handleMouseEnter = () => {
        clearTimeout(timeoutRef.current);
        setMenuVisible(true);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setMenuVisible(false);
            setHoveredCategory(null);
        }, 200);
    };

    const handleCategoryHover = (cat) => {
        setHoveredCategory(cat._id);
        if (!fetchedCategories[cat._id]) {
            fetchSubcategories(cat._id);
        }
    };

    return (
        <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <span className="cursor-pointer text-white font-semibold tracking-wide hover:text-red-500 transition duration-300">
                CATEGORIES
            </span>

            <AnimatePresence>
                {menuVisible && (
                    <motion.div
                        initial={{ opacity: 0, scaleY: 0.9, y: -10 }}
                        animate={{ opacity: 1, scaleY: 1, y: 0 }}
                        exit={{ opacity: 0, scaleY: 0.9, y: -10 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="absolute left-0 top-full mt-3 bg-white text-gray-800 border border-gray-200 rounded-xl shadow-xl flex z-50 min-h-[200px] origin-top"
                    >
                        {/* Categories */}
                        <ul className="min-w-[220px] border-r border-gray-100 py-2">
                            {categories.map((cat) => (
                                <li
                                    key={cat._id}
                                    className={`px-5 py-2 text-sm font-medium cursor-pointer transition duration-200 ${hoveredCategory === cat._id
                                        ? "bg-gray-100 text-red-600"
                                        : "hover:bg-gray-50"
                                        }`}
                                    onMouseEnter={() => handleCategoryHover(cat)}
                                >
                                    {cat.categoryName}
                                </li>
                            ))}
                        </ul>

                        {/* Subcategories */}
                        {hoveredCategory && fetchedCategories[hoveredCategory] && (
                            <motion.ul
                                key={hoveredCategory}
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 10 }}
                                transition={{ duration: 0.2 }}
                                className="min-w-[220px] py-2 bg-gray-50"
                            >
                                {subcategories[hoveredCategory]?.length > 0 ? (
                                    subcategories[hoveredCategory].map((sub) => (
                                        <li
                                            key={sub._id}
                                            className="px-5 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-600 transition duration-200 cursor-pointer"
                                        >
                                            <Link
                                                to="/allproduct"
                                                className="block w-full"
                                                state={{
                                                    category: sub.cat_id,
                                                    subcategory: sub._id,
                                                    subCategoryName: sub.subCategoryName,
                                                }}
                                                onClick={() => {
                                                    setMenuVisible(false);
                                                    setHoveredCategory(null);
                                                }}
                                            >
                                                {sub.subCategoryName}
                                            </Link>
                                        </li>
                                    ))
                                ) : (
                                    <li className="px-5 py-2 text-gray-400 text-sm">
                                        No subcategories
                                    </li>
                                )}
                            </motion.ul>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default HeaderCategoryMenu;

