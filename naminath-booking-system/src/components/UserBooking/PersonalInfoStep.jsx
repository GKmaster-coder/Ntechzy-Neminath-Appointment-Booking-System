import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const PersonalInfoStep = ({ formData, onInputChange, onNext }) => {
  // Validation Schema
  const validationSchema = Yup.object({
    name: Yup.string()
      .trim()
      .min(3, "Full name must be at least 3 characters")
      .required("Full name is required"),
    phoneNo: Yup.string()
      .matches(/^[6-9]\d{9}$/, "Enter a valid 10-digit phone number")
      .required("Phone number is required"),
    email: Yup.string()
      .email("Enter a valid email address")
      .required("Email is required"),
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      name: formData.name || "",
      phoneNo: formData.phoneNo || "",
      email: formData.email || "",
    },
    validationSchema,
    onSubmit: (values) => {
      onInputChange({ target: { name: "name", value: values.name } });
      onInputChange({ target: { name: "phoneNo", value: values.phoneNo } });
      onInputChange({ target: { name: "email", value: values.email } });
      onNext();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4 sm:space-y-6">
      <div className="text-center">
        <h3 className="text-xl sm:text-2xl font-semibold text-[#C00000] mb-2">
          Personal Information
        </h3>
        <p className="text-red-600 text-sm sm:text-base">
          Please provide your basic details
        </p>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
            Full Name *
          </label>
          <input
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f8d816] transition-all text-sm sm:text-base ${
              formik.touched.name && formik.errors.name
                ? "border-red-500"
                : "border-gray-300"
            }`}
            placeholder="Enter your full name"
          />
          {formik.touched.name && formik.errors.name && (
            <p className="text-red-600 text-sm mt-1">{formik.errors.name}</p>
          )}
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            name="phoneNo"
            value={formik.values.phoneNo}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f8d816] transition-all text-sm sm:text-base ${
              formik.touched.phoneNo && formik.errors.phoneNo
                ? "border-red-500"
                : "border-gray-300"
            }`}
            placeholder="Enter your phone number"
          />
          {formik.touched.phoneNo && formik.errors.phoneNo && (
            <p className="text-red-600 text-sm mt-1">{formik.errors.phoneNo}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
            Email *
          </label>
          <input
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f8d816] transition-all text-sm sm:text-base ${
              formik.touched.email && formik.errors.email
                ? "border-red-500"
                : "border-gray-300"
            }`}
            placeholder="Enter your email address"
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-600 text-sm mt-1">{formik.errors.email}</p>
          )}
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-[#f8d816] text-[#222] py-3 sm:py-4 rounded-lg font-semibold hover:bg-[#e6c714] transition-colors shadow-md text-sm sm:text-base"
      >
        Next: Select Date & Time
      </button>
    </form>
  );
};

export default PersonalInfoStep;
