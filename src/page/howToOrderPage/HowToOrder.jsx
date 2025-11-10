import React from "react";
import { motion } from "framer-motion";

export default function HowToOrder() {
    const steps = [
        {
            title: "Step 1: Browse Products",
            description:
                "Explore our wide collection of sunglasses.",
        },
        {
            title: "Step 2: Select Your Sunglasses",
            description:
                "Click on the product you like to see detailed images, description, and specifications.",
        },
        {
            title: "Step 3: Add to Cart",
            description:
                "Once satisfied, click 'Add to Cart'. You can continue shopping or go directly to checkout.",
        },
        {
            title: "Step 4: Review Your Cart",
            description:
                "Open the cart from the top-right corner. Review product details, quantity, and price. Apply discount codes if you have one.",
        },
        {
            title: "Step 5: Proceed to Checkout",
            description:
                "Click 'Checkout'. Enter your shipping details including name, address, phone, and email.",
        },
        {
            title: "Step 6: Choose Payment Method",
            description:
                "Select your preferred payment option: Credit/Debit Card, PayPal.",
        },
        {
            title: "Step 7: Place Your Order",
            description:
                "Review your order summary carefully and click 'Place Order'.",
        },
        {
            title: "Step 8: Get Confirmation",
            description:
                "You'll receive an order confirmation email/SMS with your order number. Track your order in your account dashboard.",
        },
        {
            title: "Step 9: Delivery",
            description:
                "Your sunglasses will be carefully packed and shipped. Delivery usually takes, Overnight, Standard(5-7 Days), Express(2-3 Days) 3-7 working days depending on location.",
        },
    ];

    return (
        <div className="min-h-screen text-white py-12 px-6 flex justify-center">
            <div className="max-w-3xl w-full">
                {/* Title */}
                <motion.h1
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl font-bold text-center text-[#f00000] mb-12"
                >
                    How to Order
                    <hr className="border-red-600 w-80 mt-3 mx-auto" />
                </motion.h1>

                {/* Vertical line */}
                <div className="relative border-l-4 border-red-600 pl-6">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -40 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.15 }}
                            className="mb-10"
                        >
                            <div className="flex items-start">
                                {/* Number Circle */}
                                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#f00000] text-white font-bold mr-4 shadow-md">
                                    {index + 1}
                                </div>
                                {/* Text */}
                                <div>
                                    <h2 className="text-lg font-semibold text-[#f00000]">
                                        {step.title}
                                    </h2>
                                    <p className="text-sm leading-relaxed text-black">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
