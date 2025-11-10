import React, { useEffect, useState } from 'react';
import API, { IMAGE_URL } from '../../API/Api';
import { useNavigate } from 'react-router-dom';

const BrandSection = () => {
    const [selectedCategory, setSelectedCategory] = useState(''); // Auto-selected after fetch
    const [brandsByCategory, setBrandsByCategory] = useState({});
    const [fade, setFade] = useState(false);
    const navigate = useNavigate();

    // ✅ Fetch and group brands
    const fetchBrand = async () => {
        try {
            const res = await API.get("/getBrand");
            const data = res.data.data || [];

            // Group brands by `type`
            const grouped = data.reduce((acc, item) => {
                if (!acc[item.type]) acc[item.type] = [];
                acc[item.type].push(item);
                return acc;
            }, {});

            setBrandsByCategory(grouped);

            // Auto-select first category (Sunglasses preferred)
            const order = ['Sunglasses', 'Contact Lenses'];
            const sortedCategories = Object.keys(grouped).sort(
                (a, b) => order.indexOf(a) - order.indexOf(b)
            );

            if (sortedCategories.length > 0) {
                setSelectedCategory(sortedCategories[0]);
            }
        } catch (error) {
            console.error("Error fetching brands:", error);
        }
    };

    useEffect(() => {
        fetchBrand();
    }, []);

    // ✅ Keep Sunglasses before Contact Lenses
    const categories = Object.keys(brandsByCategory).sort((a, b) => {
        const order = ['Sunglasses', 'Contact Lenses'];
        return order.indexOf(a) - order.indexOf(b);
    });

    // ✅ Fade transition
    const handleCategoryChange = (category) => {
        if (category === selectedCategory) return;
        setFade(true);
        setTimeout(() => {
            setSelectedCategory(category);
            setFade(false);
        }, 300);
    };

    // ✅ Handle Brand Click → Navigate to products
    const handleBrandClick = async (brand) => {
        try {
            const res = await API.get(`/brand/${brand._id}`);
            const products = res.data?.products || [];

            if (products.length === 0) {
                alert(`No products found for ${brand.brand}`);
                return;
            }

            // Use first product to navigate to correct category/subcategory
            const firstProduct = products[0];
            const subCategoryName = firstProduct.subCategoryName || "AllProducts";
            const catId = firstProduct.cat_id;
            const subCatId = firstProduct.subCat_id;

            navigate(`/allproduct/${subCategoryName}/${catId}/${subCatId}`, {
                state: {
                    brandId: brand._id,
                    brandName: brand.brand,
                },
            });
        } catch (err) {
            console.error("Error fetching brand products:", err);
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-6 font-sans">
            <h2 className="text-3xl font-semibold mb-4 text-center">
                Top brands for your eyes
            </h2>

            {/* Tabs */}
            <div className="flex justify-center gap-4 mb-6">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => handleCategoryChange(category)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition 
              ${selectedCategory === category
                                ? 'bg-red-600 hover:bg-red-700 text-white scale-105 shadow-md'
                                : 'bg-gray-300 text-gray-900 hover:bg-gray-400'
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Brand Grid */}
            <div
                className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 
                    transition-opacity duration-500 ${fade ? 'opacity-0' : 'opacity-100'}`}
            >
                {brandsByCategory[selectedCategory]?.map((brand, index) => (
                    <div
                        key={index}
                        className="bg-white border border-red-500 rounded-lg shadow-sm p-4 text-center 
                       hover:shadow-md hover:scale-105 transition-transform duration-300 cursor-pointer"
                        onClick={() => handleBrandClick(brand)}
                    >
                        {brand.image && (
                            <img
                                src={
                                    brand.image.startsWith("http")
                                        ? brand.image
                                        : `${IMAGE_URL}${brand.image}`
                                }
                                alt={brand.brand}
                                className="w-20 h-10 object-contain mx-auto mb-2"
                            />
                        )}
                        <span className="text-sm font-semibold text-gray-800">
                            {brand.brand}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BrandSection;
