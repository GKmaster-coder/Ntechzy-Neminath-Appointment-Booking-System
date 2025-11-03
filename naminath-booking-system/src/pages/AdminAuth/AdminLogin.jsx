import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearAuthState } from "../../store/slices/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

const AdminLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, success, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (success && user) {
      navigate("/admin/dashboard");
    }
  }, [success, user, navigate]);

  // ✅ Yup validation schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  // ✅ Formik setup
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema,
    onSubmit: (values) => {
      dispatch(loginUser(values));
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fff7e6] px-4 sm:px-6">
      <div className="bg-white shadow-lg rounded-xl border-t-8 border-[#FFD700] p-6 sm:p-8 w-full max-w-md">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-[#C00000]">
          Admin Login
        </h2>

        {error && <p className="text-red-600 text-center">{error}</p>}
        {success && <p className="text-green-600 text-center">{success}</p>}

        <form onSubmit={formik.handleSubmit} className="space-y-4 sm:space-y-5">
          {/* Email Input */}
          <div>
            <input
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Email"
              className={`w-full border rounded-lg px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#FFD700] ${
                formik.touched.email && formik.errors.email
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-600 text-sm mt-1">{formik.errors.email}</p>
            )}
          </div>

          {/* Password Input */}
          <div>
            <input
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Password"
              className={`w-full border rounded-lg px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#FFD700] ${
                formik.touched.password && formik.errors.password
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-600 text-sm mt-1">
                {formik.errors.password}
              </p>
            )}
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#C00000] text-white py-2 rounded-lg font-semibold hover:bg-[#a00000] disabled:opacity-50 transition-all"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center mt-5 text-[#333] text-sm sm:text-base">
          Don’t have an account?{" "}
          <Link
            to="/admin/signup"
            className="text-[#C00000] font-semibold hover:underline"
          >
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
