import React, { useEffect, useState } from "react";
import API, { IMAGE_URL } from "../../API/Api";
import Swal from "sweetalert2";

function UpdateProfile() {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [prescriptionFile, setPrescriptionFile] = useState(null);
  const [strength, setStrength] = useState(0);
  const [profileImage, setProfileImage] = useState(null);
  const [profilePreview, setProfilePreview] = useState(null);
  const [strengthLabel, setStrengthLabel] = useState("Weak");

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    mobilePhone: "",
    email: "",
    password: "",
    street: "",
    city: "",
    postalCode: "",
  });

  const userId = localStorage.getItem("user");

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

  const handleProfileImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file); // This is the file you will upload
      setProfilePreview(URL.createObjectURL(file)); // This is for immediate preview
    }
  };

  const getUser = async () => {
    try {
      const res = await API.get(`/customer/${userId}`);
      if (res?.data?.data) {
        const user = res.data.data;

        let formattedDob = "";
        if (user.dateOfBirth) {
          formattedDob = new Date(user.dateOfBirth).toISOString().split("T")[0];
        }

        setForm({
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          dateOfBirth: formattedDob || "",
          mobilePhone: user.mobilePhone || "",
          email: user.email || "",
          password: "",
          street: user.address?.street || "",
          city: user.address?.city || "",
          postalCode: user.address?.postalCode || "",
        });

        if (user.profileImage) {
          setProfileImage(user.profileImage);
          setProfilePreview(`${IMAGE_URL}${user.profileImage}`);
        }

        if (user.prescriptionFile) {
          setPrescriptionFile(`${IMAGE_URL}${user.prescriptionFile}`);
        }
      }
    } catch (err) {
      console.error("Error fetching user:", err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

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
      data.append("email", form.email);
      if (form.password) data.append("password", form.password);
      data.append("address[street]", form.street);
      data.append("address[city]", form.city);
      data.append("address[postalCode]", form.postalCode);

      if (prescriptionFile instanceof File)
        data.append("prescriptionFile", prescriptionFile);
      if (profileImage instanceof File)
        data.append("profileImage", profileImage);

      await API.put(`/updateCustomer/${userId}`, data);

      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Customer Profile Updated successfully!",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      });

      setPrescriptionFile(null);
      setConfirmPassword("");
    } catch (err) {
      console.error(err);

      // Mobile duplication handling
      let msg = "Profile update failed. Please try again.";
      if (err?.response?.data?.message) {
        msg = err.response.data.message;
      }

      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        title: msg,
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      });
    }
  };

  return (
    <div className="w-5xl mx-auto p-6 sm:p-10 mt-10 mb-10 bg-white shadow-lg rounded-2xl">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-red-600">
        Update Your Profile
      </h2>

      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="space-y-8"
      >
        {/* Personal Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4 border-b pb-2 text-gray-700">
            Personal Info
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-600">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-red-400 outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-600">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-red-400 outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-600">
                Date of Birth
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={form.dateOfBirth}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-red-400 outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-600">
                Profile Image
              </label>
              <input
                type="file"
                onChange={handleProfileImage}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-red-400 outline-none"
                accept="image/*"
              />
              {profileImage && (
                <div className="mt-3">
                  <img
                    src={profilePreview || `${IMAGE_URL}${profileImage}`}
                    alt="Profile Preview"
                    className="w-24 h-24 object-cover rounded-full border shadow"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Login & Security */}
        <div>
          <h3 className="text-lg font-semibold mb-4 border-b pb-2 text-gray-700">
            Login & Security
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-600">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-red-400 outline-none"
                required
              />

              <label className="block text-sm font-medium mb-1 text-gray-600 mt-3">
                Mobile Phone
              </label>
              <input
                type="tel"
                name="mobilePhone"
                value={form.mobilePhone}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-red-400 outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-600">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-red-400 outline-none"
              />
              <label className="block text-sm font-medium mt-3 mb-1 text-gray-600">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-red-400 outline-none"
              />
              {form.password && (
                <div className="mt-3">
                  <p className="text-sm">
                    Password Strength:{" "}
                    <span
                      className={`font-semibold ${
                        strength <= 1
                          ? "text-red-500"
                          : strength === 2
                          ? "text-yellow-500"
                          : strength === 3
                          ? "text-green-500"
                          : "text-blue-600"
                      }`}
                    >
                      {strengthLabel}
                    </span>
                  </p>
                  <input
                    type="range"
                    min="0"
                    max="4"
                    value={strength}
                    readOnly
                    className={`w-full h-2 rounded-lg mt-2 appearance-none cursor-default ${
                      strength <= 1
                        ? "bg-red-400"
                        : strength === 2
                        ? "bg-yellow-400"
                        : strength === 3
                        ? "bg-green-400"
                        : "bg-blue-400"
                    }`}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Address */}
        <div>
          <h3 className="text-lg font-semibold mb-4 border-b pb-2 text-gray-700">
            Address
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-600">
                Street Address
              </label>
              <input
                type="text"
                name="street"
                value={form.street}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-red-400 outline-none"
                required
              />
              <label className="block text-sm font-medium mb-1 mt-4 text-gray-600">
                City
              </label>
              <input
                type="text"
                name="city"
                value={form.city}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-red-400 outline-none"
                required
              />
            </div>
            <div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-600">
                  Prescription Upload
                </label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-red-400 outline-none"
                  accept=".pdf,image/*"
                />
                {prescriptionFile && (
                  <div className="mt-2 text-sm text-gray-500">
                    {prescriptionFile instanceof File ? (
                      <p>Selected: {prescriptionFile.name}</p>
                    ) : (
                      <a
                        href={prescriptionFile}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        View Uploaded Prescription
                      </a>
                    )}
                  </div>
                )}
              </div>
              <label className="block text-sm font-medium mb-1 mt-4 text-gray-600">
                Postal Code
              </label>
              <input
                type="text"
                name="postalCode"
                value={form.postalCode}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-red-400 outline-none"
                required
              />
            </div>
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition hover:cursor-pointer"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateProfile;
