import React, { useState } from "react";
import API from "../../API/Api";
import Swal from "sweetalert2";

/* ─── Validators ─────────────────────────────────────────────────────────── */
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\+?[1-9]\d{6,14}$/;
const postalRegex = /^[A-Za-z0-9\s\-]{3,10}$/;
const strongPwdRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$/;

const getAge = (dob) => {
  if (!dob) return 0;
  const birth = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age;
};

const maxDob = (() => {
  const d = new Date();
  d.setFullYear(d.getFullYear() - 18);
  return d.toISOString().split("T")[0]; // users must be 18+
})();

/* ─── Initial state ──────────────────────────────────────────────────────── */
const initialForm = {
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  mobilePhone: "",
  email: "",
  password: "",
  street: "",
  city: "",
  province: "",
  postalCode: "",
  country: "",
};

const initialErrors = Object.fromEntries(Object.keys(initialForm).map((k) => [k, ""]));

/* ─── Component ──────────────────────────────────────────────────────────── */
function Register() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState(initialErrors);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPwdError, setConfirmPwdError] = useState("");
  const [prescriptionFile, setPrescriptionFile] = useState(null);
  const [strength, setStrength] = useState(0);
  const [strengthLabel, setStrengthLabel] = useState("");

  /* ── Password strength ── */
  const checkStrength = (pwd) => {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    setStrength(score);
    setStrengthLabel(
      score <= 1 ? "Weak" : score === 2 ? "Medium" : score === 3 ? "Strong" : "Very Strong"
    );
  };

  /* ── Per-field validation ── */
  const validateField = (name, value) => {
    switch (name) {
      case "firstName":
      case "lastName":
        return value.trim() ? "" : `${name === "firstName" ? "First" : "Last"} name is required.`;

      case "dateOfBirth":
        if (!value) return "Date of birth is required.";
        if (getAge(value) < 18) return "You must be at least 18 years old.";
        return "";

      case "mobilePhone":
        if (!value.trim()) return "Mobile phone is required.";
        if (!phoneRegex.test(value.trim()))
          return "Enter a valid phone number (7–15 digits, optional leading +).";
        return "";

      case "email":
        if (!value.trim()) return "Email is required.";
        if (!emailRegex.test(value.trim())) return "Enter a valid email address.";
        return "";

      case "password":
        if (!value) return "Password is required.";
        if (!strongPwdRegex.test(value))
          return "Min 8 chars, 1 uppercase, 1 number, 1 special character.";
        return "";

      case "street":
        return value.trim() ? "" : "Street address is required.";

      case "city":
        return value.trim() ? "" : "City is required.";

      case "postalCode":
        if (!value.trim()) return "Postal code is required.";
        if (!postalRegex.test(value.trim())) return "Enter a valid postal code.";
        return "";

      default:
        return "";
    }
  };

  /* ── Handlers ── */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setForm((prev) => ({ ...prev, [name]: newValue }));

    if (type !== "checkbox") {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, newValue) }));
    }

    if (name === "password") {
      checkStrength(value);
      if (confirmPassword) {
        setConfirmPwdError(value !== confirmPassword ? "Passwords do not match." : "");
      }
    }
  };

  const handleConfirmPassword = (e) => {
    const val = e.target.value;
    setConfirmPassword(val);
    setConfirmPwdError(val !== form.password ? "Passwords do not match." : "");
  };

  const handleFileChange = (e) => setPrescriptionFile(e.target.files?.[0] || null);

  /* ── Full-form validation on submit ── */
  const validateAll = () => {
    const requiredFields = [
      "firstName", "lastName", "dateOfBirth", "mobilePhone",
      "email", "password", "street", "city", "postalCode",
    ];
    const newErrors = { ...initialErrors };
    let valid = true;

    requiredFields.forEach((name) => {
      const err = validateField(name, form[name]);
      newErrors[name] = err;
      if (err) valid = false;
    });

    setErrors(newErrors);

    if (form.password !== confirmPassword) {
      setConfirmPwdError("Passwords do not match.");
      valid = false;
    }

    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateAll()) return;

    try {
      const data = new FormData();
      data.append("firstName", form.firstName);
      data.append("lastName", form.lastName);
      data.append("dateOfBirth", form.dateOfBirth);
      data.append("mobilePhone", form.mobilePhone);
      data.append("email", form.email);
      data.append("password", form.password);
      data.append("address[street]", form.street);
      data.append("address[city]", form.city);
      data.append("address[province]", form.province || "");
      data.append("address[postalCode]", form.postalCode);
      data.append("address[country]", form.country || "");
      if (prescriptionFile) data.append("prescriptionFile", prescriptionFile);

      await API.post("/customer-register", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      Swal.fire({
        toast: true, position: "top-end", icon: "success",
        title: "Registration successful!", showConfirmButton: false,
        timer: 1500, timerProgressBar: true,
      });

      setForm(initialForm);
      setErrors(initialErrors);
      setConfirmPassword("");
      setConfirmPwdError("");
      setPrescriptionFile(null);
      setStrength(0);
      setStrengthLabel("");
    } catch (err) {
      console.error(err);
      let msg = "Registration failed. Please try again.";
      if (err.response) {
        const { status, data } = err.response;
        if ([400, 409].includes(status) && data?.message) msg = data.message;
        else if (status === 500 && data?.message?.includes("duplicate"))
          msg = "User already registered with this email or phone number.";
        else if (data?.message) msg = data.message;
      }
      Swal.fire({
        toast: true, position: "top-end", icon: "error",
        title: msg, showConfirmButton: false,
        timer: 2500, timerProgressBar: true,
      });
    }
  };

  /* ── Helpers ── */
  const inputClass = (name) =>
    `w-full border rounded-lg p-2.5 focus:outline-none focus:ring-2 ${errors[name]
      ? "border-red-500 focus:ring-red-400"
      : "border-gray-300 focus:ring-red-500 focus:border-red-500"
    }`;

  const ErrorMsg = ({ name }) =>
    errors[name] ? <p className="mt-1 text-xs text-red-600">{errors[name]}</p> : null;

  const strengthMeta = {
    bar: strength <= 1 ? "w-1/4 bg-red-500" : strength === 2 ? "w-1/2 bg-yellow-500"
      : strength === 3 ? "w-3/4 bg-green-500" : "w-full bg-blue-500",
    label: strength <= 1 ? "text-red-500" : strength === 2 ? "text-yellow-500"
      : strength === 3 ? "text-green-500" : "text-blue-600",
  };

  /* ── Render ── */
  return (
    <div className="mx-auto p-8 mt-12 mb-12 max-w-4xl bg-white shadow-xl rounded-2xl border-t-8 border-red-600">
      <h2 className="text-3xl font-extrabold text-center text-[#f00000] mb-6">
        Create Your Account
      </h2>
      <p className="text-center text-gray-600 mb-8">
        Join us to access exclusive features and services
      </p>

      <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-10" autoComplete="off" noValidate>

        {/* ── Personal Information ── */}
        <section>
          <h3 className="text-lg font-semibold text-[#f00000] border-b-2 border-red-200 pb-1 mb-4">
            Personal Information
          </h3>
          <div className="grid grid-cols-2 gap-6">

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input type="text" name="firstName" value={form.firstName}
                onChange={handleChange} placeholder="John"
                className={inputClass("firstName")} required />
              <ErrorMsg name="firstName" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input type="text" name="lastName" value={form.lastName}
                onChange={handleChange} placeholder="Doe"
                className={inputClass("lastName")} required />
              <ErrorMsg name="lastName" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date of Birth <span className="text-xs text-gray-400">(must be 18+)</span>
              </label>
              <input type="date" name="dateOfBirth" value={form.dateOfBirth}
                onChange={handleChange} max={maxDob}
                className={inputClass("dateOfBirth")} required />
              <ErrorMsg name="dateOfBirth" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Phone</label>
              <input type="tel" name="mobilePhone" value={form.mobilePhone}
                onChange={handleChange} placeholder="+1234567890"
                className={inputClass("mobilePhone")} required />
              <ErrorMsg name="mobilePhone" />
            </div>
          </div>
        </section>

        {/* ── Login & Security ── */}
        <section>
          <h3 className="text-lg font-semibold text-[#f00000] border-b-2 border-red-200 pb-1 mb-4">
            Login &amp; Security
          </h3>
          <div className="grid grid-cols-2 gap-6">

            {/* Left column */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" name="email" value={form.email}
                  onChange={handleChange} placeholder="example@gmail.com"
                  autoComplete="off" className={inputClass("email")} required />
                <ErrorMsg name="email" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                <input type="password" value={confirmPassword}
                  onChange={handleConfirmPassword} placeholder="Re-enter password"
                  autoComplete="new-password"
                  className={`w-full border rounded-lg p-2.5 focus:outline-none focus:ring-2 ${confirmPwdError ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-red-500"
                    }`} required />
                {confirmPwdError && <p className="mt-1 text-xs text-red-600">{confirmPwdError}</p>}
              </div>
            </div>

            {/* Right column */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input type="password" name="password" value={form.password}
                  onChange={handleChange} placeholder="Enter password"
                  autoComplete="new-password" className={inputClass("password")} required />
                <ErrorMsg name="password" />

                {/* Strength bar */}
                {form.password && (
                  <div className="mt-2">
                    <p className="text-xs mb-1">
                      Strength:{" "}
                      <strong className={strengthMeta.label}>{strengthLabel}</strong>
                    </p>
                    <div className="h-2 w-full rounded-full bg-gray-200 overflow-hidden">
                      <div className={`h-full transition-all duration-300 ${strengthMeta.bar}`} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ── Address ── */}
        <section>
          <h3 className="text-lg font-semibold text-[#f00000] border-b-2 border-red-200 pb-1 mb-4">
            Address
          </h3>
          <div className="grid grid-cols-2 gap-6">

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                <input type="text" name="street" value={form.street}
                  onChange={handleChange} className={inputClass("street")} required />
                <ErrorMsg name="street" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                <input type="text" name="city" value={form.city}
                  onChange={handleChange} className={inputClass("city")} required />
                <ErrorMsg name="city" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                <input type="text" name="postalCode" value={form.postalCode}
                  onChange={handleChange} placeholder="e.g. 10001 or SW1A 1AA"
                  className={inputClass("postalCode")} required />
                <ErrorMsg name="postalCode" />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Province <span className="text-xs text-gray-400">(optional)</span>
                </label>
                <input type="text" name="province" value={form.province}
                  onChange={handleChange}
                  className="w-full border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 rounded-lg p-2.5" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Country <span className="text-xs text-gray-400">(optional)</span>
                </label>
                <input type="text" name="country" value={form.country}
                  onChange={handleChange}
                  className="w-full border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 rounded-lg p-2.5" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Prescription Upload <span className="text-xs text-gray-400">(optional)</span>
                </label>
                <input type="file" onChange={handleFileChange}
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-red-500"
                  accept=".pdf,.jpg,.jpeg,.png" />
              </div>
            </div>
          </div>
        </section>

        <div className="pt-4">
          <button type="submit"
            className="w-full bg-[#f00000] text-white py-3 rounded-lg font-semibold text-lg shadow-md hover:bg-red-700 transition-all duration-300">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;