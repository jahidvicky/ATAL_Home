import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Eye, EyeOff } from "lucide-react";
import API from "../../API/Api";
import Swal from "sweetalert2";

function Login() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [mode, setMode] = useState("login");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  //  Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //  Handle login submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await API.post("/customer-login", formData, {
        headers: { "Content-Type": "application/json" },
      });

      localStorage.setItem("user", res.data.customer.id);
      localStorage.setItem("token", res.data.token);
      isAuthenticated;

      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  //  Handle send OTP
  const handleSendOTP = async (e) => {
    e.preventDefault();
    if (!formData.email) {
      return Swal.fire("Error", "Please enter your email address.", "error");
    }

    try {
      setLoading(true);
      const res = await API.post(
        "/customer-forgot-password",
        { email: formData.email },
        { headers: { "Content-Type": "application/json" } }
      );
      Swal.fire("Success", res.data.message, "success");
      setMode("verify");
    } catch (err) {
      Swal.fire(
        "Error",
        err.response?.data?.message || "Failed to send OTP",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  //  Handle verify OTP and reset password
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    if (!otp || !newPassword) {
      return Swal.fire("Error", "Please fill all fields.", "error");
    }

    try {
      setLoading(true);
      const res = await API.post(
        "/customer-verify-otp",
        {
          email: formData.email,
          otp,
          newPassword,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      Swal.fire("Success", res.data.message, "success");
      setMode("login");
      setOtp("");
      setNewPassword("");
      setFormData({ email: "", password: "" });
    } catch (err) {
      Swal.fire("Error", err.response?.data?.message || "Invalid OTP", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center bg-gray-100 px-4">
      <form
        onSubmit={
          mode === "login"
            ? handleSubmit
            : mode === "forgot"
              ? handleSendOTP
              : handleVerifyOTP
        }
        className="bg-white shadow-lg rounded-xl w-full h-full max-w-[500px] max-h-[600px] sm:w-[90%] sm:h-auto p-8 mt-20 mb-20"
      >
        <h2 className="text-2xl font-bold text-center text-[#f00000] mb-6">
          {mode === "login"
            ? "Sign In"
            : mode === "forgot"
              ? "Forgot Password"
              : "Verify OTP"}
        </h2>

        {error && mode === "login" && (
          <p className="text-[#f00000] text-center mb-4">{error}</p>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
            placeholder="Enter your email"
          />
        </div>

        {mode === "login" && (
          <>
            <div className="mb-4 relative">
              <label className="block text-gray-700 font-semibold mb-1">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                autoComplete="new-password"
                autoCorrect="off"
                autoCapitalize="none"
                spellCheck="false"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-red-600"
                placeholder="Enter your password"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-9 transform -translate-y-1/2 text-gray-600 mt-3.5"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Forgot Password Link */}
            <div className="text-right mb-4">
              <span
                onClick={() => setMode("forgot")}
                className="text-[#f00000] text-sm hover:underline cursor-pointer"
              >
                Forgot Password?
              </span>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#f00000] hover:bg-black text-white py-2 rounded-lg font-semibold transition-colors"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            {/* Register Link */}
            <p className="text-center text-gray-600 mt-4">
              Don't have an account?{" "}
              <span
                onClick={() => navigate("/register")}
                className="text-[#f00000] hover:underline cursor-pointer"
              >
                Register
              </span>
            </p>
          </>
        )}

        {/* Forgot Password Mode */}
        {mode === "forgot" && (
          <>
            <p className="text-gray-600 mb-4 text-center">
              Enter your registered email to receive an OTP.
            </p>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#f00000] hover:bg-black text-white py-2 rounded-lg font-semibold transition-colors"
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>

            <p className="text-center text-gray-600 mt-4">
              Remembered your password?{" "}
              <span
                onClick={() => setMode("login")}
                className="text-[#f00000] hover:underline cursor-pointer"
              >
                Back to Login
              </span>
            </p>
          </>
        )}

        {/* OTP Verification Mode */}
        {mode === "verify" && (
          <>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-1">
                Enter OTP
              </label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength="6"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                placeholder="Enter the 6-digit OTP"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-1">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                placeholder="Enter new password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#f00000] hover:bg-black text-white py-2 rounded-lg font-semibold transition-colors"
            >
              {loading ? "Verifying..." : "Reset Password"}
            </button>

            <p className="text-center text-gray-600 mt-4">
              Didn’t receive OTP?{" "}
              <span
                onClick={handleSendOTP}
                className="text-[#f00000] hover:underline cursor-pointer"
              >
                Resend OTP
              </span>
            </p>
          </>
        )}
      </form>
    </div>
  );
}

export default Login;
