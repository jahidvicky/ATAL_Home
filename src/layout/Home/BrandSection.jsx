import React, { useEffect, useState } from 'react';
import API, { IMAGE_URL } from '../../API/Api';

const BrandSection = () => {
    const [selectedCategory, setSelectedCategory] = useState('Sunglasses');
    const [brandsByCategory, setBrandsByCategory] = useState({});

    const fetchBrand = async () => {
        try {
            const res = await API.get("/getBrand");
            const data = res.data.data || [];

            // Group brands by category
            const grouped = data.reduce((acc, item) => {
                if (!acc[item.category]) acc[item.category] = [];
                acc[item.category].push(item);
                return acc;
            }, {});

            setBrandsByCategory(grouped);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchBrand();
    }, []);

    // Always show Sunglasses first, then Contact Lenses
    const categories = Object.keys(brandsByCategory).sort((a, b) => {
        const order = ['Sunglasses', 'Contact Lenses'];
        return order.indexOf(a) - order.indexOf(b);
    });

    return (
        <div className="max-w-6xl mx-auto p-6 font-sans">
            <h2 className="text-3xl font-semibold mb-4 text-center">Top brands for your eyes</h2>

            {/* Tabs */}
            <div className="flex justify-center gap-4 mb-6">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition 
              ${selectedCategory === category ? 'bg-[#f00000] text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Brand Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {brandsByCategory[selectedCategory]?.map((brand, index) => (
                    <div
                        key={index}
                        className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 text-center hover:shadow-md transition"
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
                        <span className="text-sm font-semibold text-gray-800">{brand.brand}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BrandSection;
