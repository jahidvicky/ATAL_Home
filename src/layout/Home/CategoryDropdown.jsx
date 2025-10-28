import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import API from "../../API/Api";

const HeaderCategoryMenu = () => {
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState({});
    const [menuVisible, setMenuVisible] = useState(false);
    const [hoveredCategory, setHoveredCategory] = useState(null);
    const timeoutRef = useRef(null);
    const location = useLocation();

    useEffect(() => {
        fetchCategories();
    }, []);

    // Reset menu when route changes (fixes second time issue)
    useEffect(() => {
        setMenuVisible(false);
        setHoveredCategory(null);
    }, [location.pathname]);

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
                [categoryId]: res.data?.subcategories || res.data,
            }));
        } catch (error) {
            console.error("Error fetching subcategories:", error);
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

    return (
        <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <span className="cursor-pointer text-white font-semibold tracking-wide hover:text-red-500 transition duration-300">
                CATEGORIES
            </span>

            {menuVisible && (
                <div className="absolute left-0 top-full mt-3 bg-white text-gray-800 border border-gray-200 rounded-xl shadow-xl flex z-50 min-h-[200px]">
                    {/* Categories */}
                    <ul className="min-w-[220px] border-r border-gray-100 py-2">
                        {categories.map((cat) => (
                            <li
                                key={cat._id}
                                className={`px-5 py-2 text-sm font-medium cursor-pointer transition duration-200 ${hoveredCategory === cat._id
                                        ? "bg-gray-100 text-red-600"
                                        : "hover:bg-gray-50"
                                    }`}
                                onMouseEnter={() => {
                                    setHoveredCategory(cat._id);
                                    if (!subcategories[cat._id]) fetchSubcategories(cat._id);
                                }}
                            >
                                {cat.categoryName}
                            </li>
                        ))}
                    </ul>

                    {/* Subcategories */}
                    {hoveredCategory && subcategories[hoveredCategory] && (
                        <ul className="min-w-[220px] py-2 bg-gray-50">
                            {subcategories[hoveredCategory].length > 0 ? (
                                subcategories[hoveredCategory].map((sub) => (
                                    <li
                                        key={sub._id}
                                        className="px-5 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-600 transition duration-200 cursor-pointer"
                                    >
                                        <Link
                                            to="/allproduct"
                                            className="hover:cursor-pointer block w-full"
                                            state={{
                                                category: sub.cat_id,
                                                subcategory: sub._id,
                                                subCategoryName: sub.subCategoryName,
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
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
};

export default HeaderCategoryMenu;
