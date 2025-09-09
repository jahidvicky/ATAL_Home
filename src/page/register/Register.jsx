import React, { useState } from "react";
import API from "../../API/Api";
import Swal from "sweetalert2";

function Register() {
    const [confirmPassword, setConfirmPassword] = useState("");
    const [prescriptionFile, setPrescriptionFile] = useState(null);
    const [strength, setStrength] = useState(0);
    const [strengthLabel, setStrengthLabel] = useState("Weak");
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        mobilePhone: "",
        smsOptIn: false,
        email: "",
        password: "",
        twoFactorAuth: "Email",
        street: "",
        city: "",
        province: "",
        postalCode: "",
        country: "",
        prefEmail: false,
        prefSms: false,
        prefPhone: false,
        marketingOptIn: false,
    });

    const checkStrength = (pwd) => {
        let score = 0;
        if (pwd.length >= 6) score++;
        if (/[A-Z]/.test(pwd)) score++;
        if (/[0-9]/.test(pwd)) score++;
        if (/[^A-Za-z0-9]/.test(pwd)) score++;
        setStrength(score);
        setStrengthLabel(
            score <= 1 ? "Weak" : score === 2 ? "Medium" : score === 3 ? "Strong" : "Very Strong"
        );
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === "checkbox") {
            setForm((prev) => ({ ...prev, [name]: checked }));
        } else if (name === "password") {
            setForm((prev) => ({ ...prev, password: value }));
            checkStrength(value);
        } else {
            setForm((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleFileChange = (e) => {
        setPrescriptionFile(e.target.files?.[0] || null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.password !== confirmPassword) {
            Swal.fire({
                toast: true,
                position: "top-end",
                icon: "error",
                title: "Passwords do not match.",
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true
            });
            // alert("Passwords do not match.");
            return;
        }

        try {
            const data = new FormData();

            // flat fields
            data.append("firstName", form.firstName);
            data.append("lastName", form.lastName);
            data.append("dateOfBirth", form.dateOfBirth);
            data.append("mobilePhone", form.mobilePhone);
            data.append("smsOptIn", String(form.smsOptIn));
            data.append("email", form.email);
            data.append("password", form.password);
            data.append("twoFactorAuth", form.twoFactorAuth);
            data.append("marketingOptIn", String(form.marketingOptIn));

            // address (nested format for backend schema)
            data.append("address[street]", form.street);
            data.append("address[city]", form.city);
            data.append("address[province]", form.province || "");
            data.append("address[postalCode]", form.postalCode);
            data.append("address[country]", form.country || "");

            //  communicationPreference (nested format)
            data.append("communicationPreference[email]", String(form.prefEmail));
            data.append("communicationPreference[sms]", String(form.prefSms));
            data.append("communicationPreference[phone]", String(form.prefPhone));

            if (prescriptionFile) {
                data.append("prescriptionFile", prescriptionFile);
            }

            const res = await API.post(
                "/customer-register",
                data,
                { headers: { "Content-Type": "multipart/form-data" } }
            );
            Swal.fire({
                toast: true,
                position: "top-end",
                icon: "success",
                title: "Registration successful!",
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true
            });
            // alert("Registration successful!");
            // console.log(res.data);

            // reset
            setForm({
                firstName: "",
                lastName: "",
                dateOfBirth: "",
                mobilePhone: "",
                smsOptIn: false,
                email: "",
                password: "",
                twoFactorAuth: "Email",
                street: "",
                city: "",
                province: "",
                postalCode: "",
                country: "",
                prefEmail: false,
                prefSms: false,
                prefPhone: false,
                marketingOptIn: false,
            });
            setConfirmPassword("");
            setPrescriptionFile(null);
            setStrength(0);
            setStrengthLabel("Weak");
        } catch (err) {
            console.error(err);
            const msg = err?.response?.data?.message || "Registration failed. Please try again.";
            Swal.fire({
                toast: true,
                position: "top-end",
                icon: "info",
                title: msg,
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true
            });
            // alert(msg);
        }
    };

    return (
        <div className="mx-auto p-6 mt-10 mb-10 bg-white shadow-md rounded-lg">
            <h2 className="text-3xl font-bold text-center mb-6">
                Looks like you're new here!
            </h2>

            <form onSubmit={handleSubmit} encType="multipart/form-data">
                {/* Personal Info */}
                <h2 className="text-xl font-bold mb-4">Personal Info</h2>
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                        <label className="block text-sm font-medium mb-1">First name</label>
                        <input
                            type="text"
                            name="firstName"
                            value={form.firstName}
                            onChange={handleChange}
                            placeholder="First name"
                            className="w-full border border-gray-300 rounded-md p-2"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Last name</label>
                        <input
                            type="text"
                            name="lastName"
                            value={form.lastName}
                            onChange={handleChange}
                            placeholder="Last name"
                            className="w-full border border-gray-300 rounded-md p-2"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Date of birth</label>
                        <input
                            type="date"
                            name="dateOfBirth"
                            value={form.dateOfBirth}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md p-2"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Mobile phone</label>
                        <input
                            type="tel"
                            name="mobilePhone"
                            value={form.mobilePhone}
                            onChange={handleChange}
                            placeholder="000-000-0000"
                            className="w-full border border-gray-300 rounded-md p-2"
                            required
                        />
                        <div className="flex items-center mt-2">
                            <input
                                type="checkbox"
                                name="smsOptIn"
                                checked={form.smsOptIn}
                                onChange={handleChange}
                                className="mr-2"
                            />
                            <span className="text-sm">Opt-in for SMS/WhatsApp updates</span>
                        </div>
                    </div>
                </div>

                {/* Login & Security */}
                <h2 className="text-xl font-bold mb-4">Login & Security</h2>
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="Email"
                            className="w-full border border-gray-300 rounded-md p-2"
                            required
                        />

                        <label className="block text-sm font-medium mt-4">Confirm Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm Password"
                            className="w-full border border-gray-300 rounded-md mt-1 p-2"
                            required
                        />

                        {form.password && (
                            <>
                                <p className="mt-2 text-sm">
                                    Password Strength:{" "}
                                    <strong
                                        className={
                                            strength <= 1
                                                ? "text-red-500"
                                                : strength === 2
                                                    ? "text-yellow-500"
                                                    : strength === 3
                                                        ? "text-green-500"
                                                        : "text-blue-600"
                                        }
                                    >
                                        {strengthLabel}
                                    </strong>
                                </p>
                                <input
                                    type="range"
                                    min="0"
                                    max="4"
                                    value={strength}
                                    readOnly
                                    className={`w-56 h-2 rounded-lg appearance-none cursor-default
                    ${strength <= 1 ? "bg-red-400" : ""}
                    ${strength === 2 ? "bg-yellow-400" : ""}
                    ${strength === 3 ? "bg-green-400" : ""}
                    ${strength === 4 ? "bg-blue-400" : ""}`}
                                />
                            </>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="Password"
                            className="w-full border border-gray-300 rounded-md p-2"
                            required
                        />
                        <div className="mt-5">
                            <p className="block text-sm font-medium mb-1">
                                Two factor authentication
                            </p>
                            <label className="mr-4">
                                <input
                                    type="radio"
                                    name="twoFactorAuth"
                                    value="Email"
                                    checked={form.twoFactorAuth === "Email"}
                                    onChange={handleChange}
                                    className="mr-2"
                                />
                                Email
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="twoFactorAuth"
                                    value="SMS"
                                    checked={form.twoFactorAuth === "SMS"}
                                    onChange={handleChange}
                                    className="mr-2"
                                />
                                SMS
                            </label>
                        </div>
                    </div>
                </div>

                {/* Address */}
                <h2 className="text-xl font-bold mb-4">Address</h2>
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                        <label className="block text-sm font-medium mb-1">Street Address</label>
                        <input
                            type="text"
                            name="street"
                            value={form.street}
                            onChange={handleChange}
                            placeholder="Street Address"
                            className="w-full border border-gray-300 rounded-md p-2"
                            required
                        />
                        <label className="block text-sm font-medium mb-1 mt-4">City</label>
                        <input
                            type="text"
                            name="city"
                            value={form.city}
                            onChange={handleChange}
                            placeholder="City"
                            className="w-full border border-gray-300 rounded-md p-2"
                            required
                        />
                        <label className="block text-sm font-medium mb-1 mt-4">Postal Code</label>
                        <input
                            type="text"
                            name="postalCode"
                            value={form.postalCode}
                            onChange={handleChange}
                            placeholder="Postal code"
                            className="w-full border border-gray-300 rounded-md p-2"
                            required
                        />
                    </div>

                    <div className="mt-5">
                        <p className="block text-sm font-medium mb-1">Communication Preference</p>
                        <div className="mb-4">
                            <label className="mr-5">
                                <input
                                    type="checkbox"
                                    name="prefEmail"
                                    checked={form.prefEmail}
                                    onChange={handleChange}
                                    className="mr-2"
                                />
                                <span className="text-sm">Email</span>
                            </label>
                            <label className="mr-5">
                                <input
                                    type="checkbox"
                                    name="prefSms"
                                    checked={form.prefSms}
                                    onChange={handleChange}
                                    className="mr-2"
                                />
                                <span className="text-sm">SMS</span>
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    name="prefPhone"
                                    checked={form.prefPhone}
                                    onChange={handleChange}
                                    className="mr-2"
                                />
                                <span className="text-sm">Phone</span>
                            </label>
                        </div>

                        <p className="block text-sm font-medium mb-1">Marketing opt-in</p>
                        <div className="mb-4">
                            <input
                                type="checkbox"
                                name="marketingOptIn"
                                checked={form.marketingOptIn}
                                onChange={handleChange}
                                className="mr-2"
                            />
                            <span className="text-sm">I agree to receive promotional offers</span>
                        </div>

                        <p className="block text-sm font-medium mb-1 mt-8">Prescription upload</p>
                        <input
                            type="file"
                            onChange={handleFileChange}
                            className="w-full border border-gray-300 rounded-md p-2"
                            accept=".pdf,.jpg,.jpeg,.png"
                        />
                    </div>
                </div>

                <div className="pt-6">
                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700"
                    >
                        Sign Up
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Register;
