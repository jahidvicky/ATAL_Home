import React, { useEffect, useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import Swal from "sweetalert2";
import { useSelector, useDispatch } from 'react-redux';

const Payment = () => {
    const cartItems = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();


    const subtotal = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );
    // shipping add  
    const tax = subtotal * 0.05;
    const discount = 200;
    const shipping = 150;
    const total = subtotal + tax + shipping - discount;
    return (
        <div className="flex justify-center items-center min-h-[80vh] bg-gray-50">
            <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
                {/* Title */}
                <h2 className="text-2xl font-bold mb-6 text-center text-red-600">
                    Complete Your Payment
                </h2>

                {/* Order Summary */}
                <div className="bg-gray-100 p-4 rounded-lg mb-6">
                    <h3 className="text-lg font-semibold mb-2">Order Summary</h3>

                    <div className="space-y-2 text-gray-700">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>₹{subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Shipping</span>
                            <span>₹{shipping.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Tax</span>
                            <span>₹{tax.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-green-600">
                            <span>Discount</span>
                            <span>-₹{discount.toFixed(2)}</span>
                        </div>
                        <div className="border-t pt-2 flex justify-between font-bold text-red-600 text-lg">
                            <span>Total</span>
                            <span>₹{total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                {/* PayPal Buttons */}
                <PayPalButtons
                    style={{ layout: "vertical", color: "gold", shape: "rect", label: "paypal" }}
                    createOrder={(data, actions) => {
                        return actions.order.create({
                            purchase_units: [
                                {
                                    amount: {
                                        value: total.toFixed(2), // Actual Total PayPal ko bhejna
                                        currency_code: "USD", // or "INR" if supported
                                    },
                                },
                            ],
                        });
                    }}
                    onApprove={(data, actions) => {
                        return actions.order.capture().then((details) => {
                            Swal.fire({
                                toast: true,
                                position: "top-end",
                                icon: "success",
                                title: `Transaction completed by ${details.payer.name.given_name}`,
                                showConfirmButton: false,
                                timer: 1500,
                                timerProgressBar: true,
                            });
                        });
                    }}
                    onError={(err) => {
                        console.error("PayPal Checkout Error:", err);
                    }}
                />
            </div>
        </div>
    );
};

export default Payment;
