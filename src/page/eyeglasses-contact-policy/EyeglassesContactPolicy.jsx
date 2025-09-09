import React from "react";

export default function EyeglassesContactPolicy() {
    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="mx-auto bg-white shadow-lg overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-black via-red-600 to-black py-20 text-center">
                    <h1 className="text-5xl font-bold text-white">Eyeglasses & Contact Lenses Policy</h1>
                    <hr className="border-white w-200 mt-3 ml-70" />
                </div>

                {/* Content */}
                <div className="p-8 text-gray-800 space-y-8 mx-15">

                    {/* Shipping & Payment Terms */}
                    <section>
                        <h2 className="text-3xl font-semibold text-red-600 text-center">Shipping & Payment Terms</h2>
                        <hr className="border-red-600 w-94 mx-auto my-2" />

                        {/* Prescription Glasses */}
                        <h3 className="text-xl font-semibold mt-6">Prescription Glasses</h3>
                        <p>
                            Production time for prescription lenses depends on the lens type and prescription complexity,
                            ranging from several business days. Once crafted and quality-checked, lenses are mounted into your
                            selected frame and shipped using your chosen delivery method.
                        </p>
                        <p>You will receive an email confirmation with a tracking number when your order ships.</p>

                        {/* Contact Lenses */}
                        <h3 className="text-xl font-semibold mt-6">Contact Lenses</h3>
                        <p>Processing times vary by lens type:</p>
                        <ul className="list-disc list-inside space-y-1">
                            <li>Common brands may be in stock</li>
                            <li>Specialized lenses (e.g., toric/astigmatism, RGP, multifocal) may require custom manufacturing</li>
                        </ul>
                        <p>Once in stock, orders ship within 1–2 business days.</p>
                        <p className="mt-2">
                            You will be notified via email of any delays or quality assurance issues that may impact delivery time.
                        </p>
                        <p>For shipping FAQs, please visit the Shipping FAQ Section.</p>

                        {/* Payment Options */}
                        <h3 className="text-xl font-semibold mt-6">Payment Options</h3>
                        <ul className="list-disc list-inside space-y-1">
                            <li>Visa</li>
                            <li>Mastercard</li>
                            <li>American Express</li>
                            <li>PayPal</li>
                        </ul>
                        <p>
                            You may place your order online or over the phone at 1-866-242-3545.
                            Only one coupon code is permitted per order.
                        </p>
                        <p>Title and risk of ownership pass to the customer upon shipment.</p>
                    </section>

                    {/* Subscription Service */}
                    <section>
                        <h2 className="text-3xl font-semibold text-red-600 text-center">Subscription Service</h2>
                        <hr className="border-red-600 w-74 mx-auto my-2 mb-7" />
                        <p>
                            Atal Optical Subscription is a convenient auto-reorder program for contact lenses, customized to your preferred frequency.
                        </p>

                        <h3 className="text-xl font-semibold mt-4">Key Terms:</h3>
                        <ul className="list-disc list-inside space-y-1">
                            <li>You authorize Atal Optical to place and charge repeat orders based on your selected plan.</li>
                            <li>Subscription includes 15% off retail price and free shipping on every order.</li>
                            <li>Payment is only collected upon order processing.</li>
                            <li>Subscription continues until paused or cancelled via your online account or by calling 1-866-242-3545.</li>
                        </ul>

                        <h3 className="text-xl font-semibold mt-4">You Can:</h3>
                        <ul className="list-disc list-inside space-y-1">
                            <li>Modify your delivery schedule</li>
                            <li>Pause your subscription</li>
                            <li>Cancel at any time</li>
                        </ul>

                        <p className="mt-2">
                            If your payment method fails, we’ll retry and notify you by email. Failure to resolve may result in temporary suspension of service.
                            Reactivating a cancelled subscription may result in updated pricing or discount amounts.
                        </p>

                        <p>
                            The Subscription discount cannot be combined with other offers or third-party benefits.
                            Delivery schedules are subject to product availability. Custom-made lenses may be delayed due to manufacturer timelines.
                            You will not be charged until your order is shipped, and you may cancel prior to dispatch.
                        </p>

                        <p>You’ll receive an order confirmation email with tracking info once your order ships.</p>
                        <p>All returns for subscription items are subject to our Returns Policy.</p>
                    </section>

                    {/* Prescription Requirements */}
                    <section>
                        <h2 className="text-3xl font-semibold text-red-600 text-center">Prescription Requirements</h2>
                        <hr className="border-red-600 w-94 mx-auto my-2 mb-5" />
                        <p>
                            When ordering, you confirm that you have a valid optical prescription issued by a licensed Eye Care Professional.
                        </p>
                        <p>Note: Contact lens and eyeglasses prescriptions are not interchangeable. Please ensure you use the correct prescription details for your specific order.</p>
                    </section>

                    {/* Trademarks */}
                    <section>
                        <h2 className="text-3xl font-semibold text-red-600 text-center">Trademarks and Intellectual Property</h2>
                        <hr className="border-red-600 w-130 mx-auto my-2 mb-5" />
                        <p>
                            All trademarks, logos, and service names used on this Site are the intellectual property of Atal Optical Inc., unless otherwise noted.
                        </p>
                        <p>This includes but is not limited to:</p>
                        <ul className="list-disc list-inside space-y-1">
                            <li>Atal Optical™</li>
                            <li>The Optical Experts™</li>
                            <li>Icons, graphics, product names, and brand slogans</li>
                        </ul>
                        <p>
                            These trademarks may not be used, reproduced, or associated with third-party goods or services without our express written consent.
                        </p>
                        <p>Third-party trademarks mentioned remain the property of their respective owners.</p>
                    </section>

                </div>
            </div>
        </div>
    );
}
