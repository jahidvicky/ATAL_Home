import React from "react";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const OrderPlaced = () => {
    const navigate = useNavigate();
    const goToHome = () => {
        navigate("/")
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
            {/* Animated Circle with Tick */}
            <div className="flex items-center justify-center w-32 h-32 rounded-full border-4 border-red-600 bg-black animate-bounce">
                <CheckCircle className="w-20 h-20 text-red-600" />
            </div>

            {/* Success Text */}
            <h1 className="mt-6 text-4xl font-bold text-red-600 drop-shadow-lg">
                Order Placed!
            </h1>
            <p className="mt-3 text-lg text-gray-300">
                Thank you for shopping with us. Your order has been confirmed.
            </p>

            {/* Button to go back */}
            <button onClick={goToHome} className="mt-6 px-6 py-3 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-semibold shadow-lg transition">
                Continue Shopping
            </button>
        </div>
    );
};

export default OrderPlaced;
