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
      score <= 1
        ? "Weak"
        : score === 2
        ? "Medium"
        : score === 3
        ? "Strong"
        : "Very Strong"
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
        timerProgressBar: true,
      });
      return;
    }

    try {
      const data = new FormData();

      data.append("firstName", form.firstName);
      data.append("lastName", form.lastName);
      data.append("dateOfBirth", form.dateOfBirth);
      data.append("mobilePhone", form.mobilePhone);
      data.append("smsOptIn", String(form.smsOptIn));
      data.append("email", form.email);
      data.append("password", form.password);
      data.append("twoFactorAuth", form.twoFactorAuth);
      data.append("marketingOptIn", String(form.marketingOptIn));

      data.append("address[street]", form.street);
      data.append("address[city]", form.city);
      data.append("address[province]", form.province || "");
      data.append("address[postalCode]", form.postalCode);
      data.append("address[country]", form.country || "");

      data.append("communicationPreference[email]", String(form.prefEmail));
      data.append("communicationPreference[sms]", String(form.prefSms));
      data.append("communicationPreference[phone]", String(form.prefPhone));

      if (prescriptionFile) {
        data.append("prescriptionFile", prescriptionFile);
      }

      const res = await API.post("/customer-register", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Registration successful!",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      });

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
      let msg = "Registration failed. Please try again.";

      if (err.response) {
        const { status, data } = err.response;
        if (status === 400 || status === 409) {
          msg =
            data.message ||
            "User already registered with this email or phone number.";
        } else if (status === 500 && data?.message?.includes("duplicate")) {
          msg = "User already registered with this email or phone number.";
        } else if (data?.message) {
          msg = data.message;
        }
      }

      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        title: msg,
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
    }
  };

  return (
    <div className="mx-auto p-8 mt-12 mb-12 max-w-4xl bg-white shadow-xl rounded-2xl border-t-8 border-red-600">
      <h2 className="text-3xl font-extrabold text-center text-red-700 mb-6">
        Create Your Account
      </h2>
      <p className="text-center text-gray-600 mb-8">
        Join us to access exclusive features and services
      </p>

      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="space-y-10"
         autoComplete="off" 
      >
        {/* Personal Info */}
        <section>
          <h3 className="text-lg font-semibold text-red-700 border-b-2 border-red-200 pb-1 mb-4">
            Personal Information
          </h3>
          <div className="grid grid-cols-2 gap-6">
            {[
              { label: "First Name", name: "firstName", type: "text" },
              { label: "Last Name", name: "lastName", type: "text" },
              { label: "Date of Birth", name: "dateOfBirth", type: "date" },
              { label: "Mobile Phone", name: "mobilePhone", type: "tel" },
            ].map((field, idx) => (
              <div key={idx}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  value={form[field.name]}
                  onChange={handleChange}
                  className="w-full border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 rounded-lg p-2.5"
                  required
                />
              </div>
            ))}
          </div>

          <div className="mt-3">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                name="smsOptIn"
                checked={form.smsOptIn}
                onChange={handleChange}
                className="text-red-600 focus:ring-red-500"
              />
              Opt-in for SMS/WhatsApp updates
            </label>
          </div>
        </section>

        {/* Login & Security */}
        <section>
          <h3 className="text-lg font-semibold text-red-700 border-b-2 border-red-200 pb-1 mb-4">
            Login & Security
          </h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="example@gmail.com"
                autoComplete="off" 
                className="w-full border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 rounded-lg p-2.5"
                required
              />

              <label className="block text-sm font-medium mt-4 text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                 autoComplete="new-password" 
                className="w-full border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 rounded-lg mt-1 p-2.5"
                required
              />

              {form.password && (
                <>
                  <p className="mt-3 text-sm">
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
                  <div className="mt-2 h-2 w-full rounded-full bg-gray-200 overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${
                        strength <= 1
                          ? "bg-red-500 w-1/4"
                          : strength === 2
                          ? "bg-yellow-500 w-1/2"
                          : strength === 3
                          ? "bg-green-500 w-3/4"
                          : "bg-blue-500 w-full"
                      }`}
                    />
                  </div>
                </>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter Password"
                 autoComplete="new-password" 
                className="w-full border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 rounded-lg p-2.5"
                required
              />

              <p className="block text-sm font-medium mb-1 mt-5 text-gray-700">
                Two Factor Authentication
              </p>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="twoFactorAuth"
                    value="Email"
                    checked={form.twoFactorAuth === "Email"}
                    onChange={handleChange}
                    className="text-red-600 focus:ring-red-500"
                  />
                  Email
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="twoFactorAuth"
                    value="SMS"
                    checked={form.twoFactorAuth === "SMS"}
                    onChange={handleChange}
                    className="text-red-600 focus:ring-red-500"
                  />
                  SMS
                </label>
              </div>
            </div>
          </div>
        </section>

        {/* Address */}
        <section>
          <h3 className="text-lg font-semibold text-red-700 border-b-2 border-red-200 pb-1 mb-4">
            Address & Preferences
          </h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              {[
                { label: "Street Address", name: "street" },
                { label: "City", name: "city" },
                { label: "Postal Code", name: "postalCode" },
              ].map((field, idx) => (
                <div key={idx} className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {field.label}
                  </label>
                  <input
                    type="text"
                    name={field.name}
                    value={form[field.name]}
                    onChange={handleChange}
                    className="w-full border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 rounded-lg p-2.5"
                    required
                  />
                </div>
              ))}
            </div>

            <div>
              <p className="block text-sm font-medium mb-2 text-gray-700">
                Communication Preference
              </p>
              {["prefEmail", "prefSms", "prefPhone"].map((pref) => (
                <label key={pref} className="block mb-2 text-sm">
                  <input
                    type="checkbox"
                    name={pref}
                    checked={form[pref]}
                    onChange={handleChange}
                    className="text-red-600 focus:ring-red-500 mr-2"
                  />
                  {pref.replace("pref", "")}
                </label>
              ))}

              <p className="block text-sm font-medium mb-1 mt-4 text-gray-700">
                Marketing Opt-in
              </p>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  name="marketingOptIn"
                  checked={form.marketingOptIn}
                  onChange={handleChange}
                  className="text-red-600 focus:ring-red-500"
                />
                I agree to receive promotional offers
              </label>

              <p className="block text-sm font-medium mb-1 mt-6 text-gray-700">
                Prescription Upload
              </p>
              <input
                type="file"
                onChange={handleFileChange}
                className="w-full border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 rounded-lg p-2.5 text-sm"
                accept=".pdf,.jpg,.jpeg,.png"
              />
            </div>
          </div>
        </section>

        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold text-lg shadow-md hover:bg-red-700 transition-all duration-300"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
