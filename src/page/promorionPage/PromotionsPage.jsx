import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function PromotionsPage() {
  const promotions = [
    {
      title: "Buy 1 Get 1 Free",
      desc: "Get two stylish sunglasses for the price of one. Limited stock available!",
    },
    {
      title: "40% Off Designer Sunglasses",
      desc: "Save big on luxury designer brands. Look premium without overspending.",
    },
    {
      title: "Summer Sale - Up to 50% Off",
      desc: "Perfect sunglasses for the season with unbeatable discounts.",
    },
    {
      title: "Kids' Sunglasses Discount",
      desc: "Durable, protective, and stylish eyewear for children at special prices.",
    },
    {
      title: "Polarized Lenses Offer",
      desc: "Exclusive deals on polarized sunglasses for crystal-clear outdoor vision.",
    },
    {
      title: "Blue Light Sunglasses Deal",
      desc: "Protect your eyes from digital screens with discounts on blue light sunglasses.",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-black via-red-600 to-black py-20 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold text-white"
        >
          OUR PROMOTIONS
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center text-lg mt-3 text-gray-100"
        >
          Exclusive savings on sunglasses, lenses, and designer frames. Don't miss
          out on our limited-time offers!
        </motion.p>
        <hr className="border-white w-220 mt-3 mx-auto" />
      </div>

      {/* Promotions Grid */}
      <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {promotions.map((promo, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="rounded-2xl shadow-lg p-6 border border-red-600"
          >
            <h2 className="text-xl font-semibold text-red-600 flex items-center">
              <ArrowRight className="w-5 h-5 mr-2 text-red-600" /> {promo.title}
            </h2>
            <p className="mt-3">{promo.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Why Shop Section */}
      <div className="bg-black py-12 text-center mb-15">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-red-600">Why Shop Our Promotions?</h2>
        <div className="flex flex-wrap justify-center gap-6 text-black font-semibold">
          <span className="bg-white px-4 py-2 rounded-full shadow">Free Shipping</span>
          <span className="bg-white px-4 py-2 rounded-full shadow">Easy Returns</span>
          <span className="bg-white px-4 py-2 rounded-full shadow">100% UV Protection</span>
          <span className="bg-white px-4 py-2 rounded-full shadow">Authentic Brands</span>
        </div>
      </div>

    </div>
  );
}
