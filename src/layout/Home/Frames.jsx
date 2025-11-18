import "./FlipCard.css";
import { useEffect, useState } from "react";
import API from "../../API/Api";
import { Link } from "react-router-dom";

import contactLens from "../../assets/frame/contactlens.jpg";
import men from "../../assets/frame/menframe.jpg";
import women from "../../assets/frame/woman.jpg";

const Frames = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const getAllProducts = async () => {
    try {
      const res = await API.get("/getAllProduct");
      const products = res.data.products || [];

      setAllProducts(products);

      // --- Build 3 category boxes dynamically ---
      const menProducts = products.filter(
        (p) =>
          p.gender?.toLowerCase() === "men" ||
          p.gender?.toLowerCase() === "unisex"
      );

      const womenProducts = products.filter(
        (p) =>
          p.gender?.toLowerCase() === "women" ||
          p.gender?.toLowerCase() === "unisex"
      );

      const lensProducts = products.filter(
        (p) => p.cat_id === "6915735feeb23fa59c7d532b"
      )

      const categoryData = [
        {
          name: "Men's Frames",
          slug: "men",
          description: "Men's Frames are designed to combine durability, comfort, and style, making them a perfect fit for everyday wear. At Atal Optical, we offer a wide selection of men's eyeglass frames—from classic and professional styles to bold, modern designs. Crafted with high-quality materials such as titanium, stainless steel, and lightweight acetate, our frames ensure both strength and comfort for long-lasting use.",
          image: men,
          products: menProducts,
        },
        {
          name: "Women's Frames",
          slug: "women",
          description: "Women's Frames bring together elegance, comfort, and individuality, offering styles that enhance both vision and personal expression. At Atal Optical, our collection of women’s eyeglass frames ranges from sleek, minimalist designs to bold, fashion-forward statements. Crafted with high-quality materials like lightweight acetate, titanium, and stainless steel, these frames ensure durability without compromising on comfort.",
          image: women,
          products: womenProducts,
        },
        {
          name: "Contact Lenses",
          slug: "contact-lens",
          description: "Contact Lenses are a convenient and effective alternative to traditional eyeglasses, offering clear vision without the need for frames. They sit directly on the eye's surface and are available in a wide range of types, including daily disposables, extended wear, toric lenses for astigmatism, and multifocal lenses for presbyopia.",
          image: contactLens,
          products: lensProducts,
        },
      ];

      setCategories(categoryData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div className="py-16 md:pl-12 mb-14 mx-6 md:mx-0">
      <h1 className="text-3xl font-bold text-center">
        <span>Shop by</span>
        <span className="text-[#f00000]"> Category</span>
      </h1>

      <hr className="w-72 mx-auto mb-10 mt-2 border-black"></hr>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {categories.map((item, index) => (
          <Link
            key={index}
            to={`/categoryProducts/${item.slug}`}
            state={{ products: item.products }}
            className="hover:cursor-pointer"
          >
            <div className="flip-card">
              <div className="flip-card-inner">
                <div className="flip-card-front overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>

                <div className="flip-card-back bg-[#f00000] text-white p-6 rounded-xl flex items-center justify-center font-medium">
                  {item.description}
                </div>
              </div>

              <div className="flex justify-center mb-10 font-semibold text-3xl">
                {item.name}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Frames;
