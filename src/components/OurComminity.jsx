import { useState, useRef } from "react";
import API from "../API/Api";
import Swal from "sweetalert2";

const OurCommunity = () => {
    const fileInputRef = useRef(null);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        street: "",
        city: "",
        postal: "",
        province: "",
        frameImages: [],
    });

    const [errors, setErrors] = useState({});

    /* ---------------- VALIDATION ---------------- */

    const validateField = (field, value) => {
        let error = "";

        if (field === "phone" && !/^\d{10}$/.test(value)) {
            error = "Phone number must be exactly 10 digits";
        }

        if (
            field === "postal" &&
            !/^[A-Za-z]\d[A-Za-z][ ]?\d[A-Za-z]\d$/.test(value)
        ) {
            error = "Postal code must be in A1A1A1 or A1A 1A1 format";
        }

        setErrors((prev) => ({ ...prev, [field]: error || undefined }));
    };

    const handleChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        validateField(field, value);
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setFormData((prev) => ({ ...prev, frameImages: files }));
        setErrors((prev) => ({
            ...prev,
            frameImages: files.length ? undefined : "Please upload at least one frame image",
        }));
    };

    const validateForm = () => {
        const newErrors = {};

        if (!/^\d{10}$/.test(formData.phone)) {
            newErrors.phone = "Phone number must be exactly 10 digits";
        }

        if (
            !/^[A-Za-z]\d[A-Za-z][ ]?\d[A-Za-z]\d$/.test(formData.postal)
        ) {
            newErrors.postal = "Postal code must be in A1A1A1 or A1A 1A1 format";
        }

        if (formData.frameImages.length === 0) {
            newErrors.frameImages = "Please upload at least one frame image";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    /* ---------------- SUBMIT ---------------- */

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const data = new FormData();
        data.append("name", formData.name);
        data.append("email", formData.email);
        data.append("phone", formData.phone);

        const fullAddress = `${formData.street}, ${formData.city}, ${formData.province}, ${formData.postal}, Canada`;
        data.append("address", fullAddress);
        data.append("postal", formData.postal);

        formData.frameImages.forEach((file) => {
            data.append("frameImages", file);
        });

        try {
            await API.post("/donate-frame", data);

            Swal.fire({
                icon: "success",
                title: "Thank You!",
                text: "Your donation is received. We’ll arrange a free doorstep pickup.",
            });

            setFormData({
                name: "",
                email: "",
                phone: "",
                street: "",
                city: "",
                postal: "",
                province: "",
                frameImages: [],
            });

            setErrors({});
            if (fileInputRef.current) fileInputRef.current.value = "";
        } catch (err) {
            Swal.fire(
                "Submission Failed",
                err.response?.data?.message || "Something went wrong",
                "error"
            );
        }
    };

    /* ---------------- UI ---------------- */

    return (
        <div className="max-w-6xl mx-auto p-10">
            <div className="grid md:grid-cols-2 gap-12 items-start">
                {/* ================= LEFT CONTENT ================= */}
                <div className="space-y-6 mt-22">
                    <h1 className="text-4xl font-bold text-[#f00000]">
                        Our Community
                    </h1>

                    <h2 className="text-2xl font-semibold">
                        Donate Your Frames. Change a Life.
                    </h2>

                    <p className="text-gray-700 leading-relaxed">
                        Donate unused or gently used frames and help someone see better.
                        At <b>Atal Optical</b>, we make the process simple, transparent,
                        and impactful with a <b>free doorstep pickup anywhere in Canada</b>.
                    </p>

                    <ul className="space-y-2 text-gray-700 font-medium">
                        <li>• Free doorstep pickup from your location</li>
                        <li>• Promote sustainability and reduce waste</li>
                        <li>• Safe, verified, and community-driven process</li>
                    </ul>

                    <div className="bg-green-50 border border-green-200 rounded-xl p-5">
                        <h4 className="font-semibold text-green-800 mb-2">
                            How Pickup Works
                        </h4>
                        <p className="text-green-700 text-sm leading-relaxed">
                            Once you submit the form, our team will review your donation and
                            contact you to schedule a <b>free pickup directly from your doorstep</b>.
                            No shipping, no extra effort required.
                        </p>
                    </div>
                </div>

                {/* ================= RIGHT FORM ================= */}
                <div className="bg-white shadow-xl rounded-2xl p-8 border">
                    <h3 className="text-2xl font-bold mb-6 text-[#f00000] text-center">
                        Frame Donation Form
                    </h3>

                    <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={(e) => handleChange("name", e.target.value)}
                            className="border p-3 rounded col-span-2"
                            required
                        />

                        <input
                            type="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                            className="border p-3 rounded col-span-2"
                            required
                        />

                        <input
                            type="tel"
                            placeholder="4161234567"
                            value={formData.phone}
                            onChange={(e) =>
                                handleChange(
                                    "phone",
                                    e.target.value.replace(/\D/g, "").slice(0, 10)
                                )
                            }
                            className={`border p-3 rounded col-span-2 ${errors.phone ? "border-red-500" : "border"
                                }`}
                            required
                        />
                        {errors.phone && (
                            <p className="text-red-600 text-sm col-span-2">{errors.phone}</p>
                        )}

                        <input
                            type="text"
                            placeholder="Street Address"
                            value={formData.street}
                            onChange={(e) => handleChange("street", e.target.value)}
                            className="border p-3 rounded col-span-2"
                            required
                        />

                        <input
                            type="text"
                            placeholder="City"
                            value={formData.city}
                            onChange={(e) => handleChange("city", e.target.value)}
                            className="border p-3 rounded"
                            required
                        />

                        <input
                            type="text"
                            placeholder="A1A 1A1"
                            value={formData.postal}
                            onChange={(e) =>
                                handleChange("postal", e.target.value.toUpperCase())
                            }
                            className={`border p-3 rounded ${errors.postal ? "border-red-500" : "border"
                                }`}
                            required
                        />
                        {errors.postal && (
                            <p className="text-red-600 text-sm col-span-2">
                                {errors.postal}
                            </p>
                        )}

                        <select
                            value={formData.province}
                            onChange={(e) => handleChange("province", e.target.value)}
                            className="border p-3 rounded col-span-2"
                            required
                        >
                            <option value="">Select Province</option>
                            {[
                                "Ontario",
                                "Alberta",
                                "British Columbia",
                                "Quebec",
                                "Manitoba",
                                "Saskatchewan",
                                "Nova Scotia",
                                "New Brunswick",
                                "Newfoundland",
                                "Prince Edward Island",
                                "Northwest Territories",
                                "Yukon",
                                "Nunavut",
                            ].map((p) => (
                                <option key={p} value={p}>{p}</option>
                            ))}
                        </select>

                        <div className="col-span-2 border-2 border-dashed rounded-xl p-6 text-center">
                            <input
                                ref={fileInputRef}
                                id="frameUpload"
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                            <label htmlFor="frameUpload" className="cursor-pointer text-gray-600">
                                Click to upload frame images
                            </label>
                        </div>

                        {errors.frameImages && (
                            <p className="text-red-600 text-sm col-span-2">
                                {errors.frameImages}
                            </p>
                        )}

                        <button
                            type="submit"
                            className="col-span-2 bg-[#f00000] text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition"
                        >
                            Donate Frames
                        </button>

                        <p className="col-span-2 text-xs text-center text-gray-500">
                            We only use your details to arrange pickup and verify the donation.
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default OurCommunity;
