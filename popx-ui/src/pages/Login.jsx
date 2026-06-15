import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (
      user &&
      user.email === email &&
      user.password === password
    ) {
      navigate("/account");
    } else {
      setError("Invalid Email or Password");
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F8F9] flex justify-center">
      <div className="w-full max-w-md px-4 py-5">

        {/* Heading */}
        <h1 className="text-2xl font-bold text-[#1D2226] leading-tight">
          Signin to your
          <br />
          PopX account
        </h1>

        <p className="text-[#919191] mt-2 text-sm leading-6">
          Lorem Ipsum is simply dummy text of the printing
          and typesetting industry.
        </p>

        {/* Form */}
        <div className="mt-6 space-y-4">

          {/* Email */}
          <div className="relative">
            <label className="absolute -top-2.5 left-3 bg-[#F7F8F9] px-1 text-xs text-[#6C25FF]">
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm outline-none"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="absolute -top-2.5 left-3 bg-[#F7F8F9] px-1 text-xs text-[#6C25FF]">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm outline-none"
            />
          </div>

          {error && (
            <p className="text-red-500 text-xs">
              {error}
            </p>
          )}

          <button
            onClick={handleLogin}
            className="w-full h-12 bg-[#CBCBCB] text-white rounded-md font-semibold"
          >
            Login
          </button>

        </div>
      </div>
    </div>
  );
}

export default Login;