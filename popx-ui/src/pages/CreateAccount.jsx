import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateAccount() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    company: "",
    agency: "Yes",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const handleSubmit = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full Name is required";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone Number is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email Address is required";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    localStorage.setItem("user", JSON.stringify(formData));
    navigate("/account");
  };

  return (
    <div className="min-h-screen bg-[#F7F8F9] flex justify-center">
      <div className="w-full max-w-md min-h-screen px-4 py-5 flex flex-col">

        {/* Heading */}
        <h1 className="text-2xl font-bold text-[#1D2226] leading-tight">
          Create your
          <br />
          PopX account
        </h1>

        {/* Form */}
        <div className="mt-5 space-y-4">

          {/* Full Name */}
          <div className="relative">
            <label className="absolute -top-2.5 left-3 bg-[#F7F8F9] px-1 text-xs text-[#6C25FF]">
              Full Name <span className="text-red-500">*</span>
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter full name"
              className={`w-full rounded-md px-3 py-2.5 text-sm border outline-none ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
            />

            {errors.name && (
              <p className="text-red-500 text-xs mt-1">
                {errors.name}
              </p>
            )}
          </div>

          {/* Phone */}
          <div className="relative">
            <label className="absolute -top-2.5 left-3 bg-[#F7F8F9] px-1 text-xs text-[#6C25FF]">
              Phone Number <span className="text-red-500">*</span>
            </label>

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              className={`w-full rounded-md px-3 py-2.5 text-sm border outline-none ${
                errors.phone ? "border-red-500" : "border-gray-300"
              }`}
            />

            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">
                {errors.phone}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="relative">
            <label className="absolute -top-2.5 left-3 bg-[#F7F8F9] px-1 text-xs text-[#6C25FF]">
              Email Address <span className="text-red-500">*</span>
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email address"
              className={`w-full rounded-md px-3 py-2.5 text-sm border outline-none ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />

            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <label className="absolute -top-2.5 left-3 bg-[#F7F8F9] px-1 text-xs text-[#6C25FF]">
              Password <span className="text-red-500">*</span>
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              className={`w-full rounded-md px-3 py-2.5 text-sm border outline-none ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
            />

            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password}
              </p>
            )}
          </div>

          {/* Company */}
          <div className="relative">
            <label className="absolute -top-2.5 left-3 bg-[#F7F8F9] px-1 text-xs text-[#6C25FF]">
              Company Name
            </label>

            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Enter company name"
              className="w-full rounded-md px-3 py-2.5 text-sm border border-gray-300 outline-none"
            />
          </div>

          {/* Agency */}
          <div>
            <p className="text-sm font-medium text-[#1D2226] mb-2">
              Are you an Agency?
              <span className="text-red-500 ml-1">*</span>
            </p>

            <div className="flex gap-6">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="agency"
                  value="Yes"
                  checked={formData.agency === "Yes"}
                  onChange={handleChange}
                  className="accent-[#6C25FF]"
                />
                Yes
              </label>

              <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="agency"
                  value="No"
                  checked={formData.agency === "No"}
                  onChange={handleChange}
                  className="accent-[#6C25FF]"
                />
                No
              </label>
            </div>
          </div>
        </div>

        {/* Button */}
        <button
          onClick={handleSubmit}
          className="w-full h-12 mt-6 mb-4 rounded-md bg-[#6C25FF] text-white font-semibold hover:bg-[#5c1ff0] transition"
        >
          Create Account
        </button>
      </div>
    </div>
  );
}

export default CreateAccount;