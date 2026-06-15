import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F7F8F9] flex justify-center">
      <div className="w-full max-w-md min-h-screen px-4 py-5 flex flex-col justify-end">

        <div className="mb-4">
          <h1 className="text-2xl font-bold text-[#1D2226]">
            Welcome to PopX
          </h1>

          <p className="text-[#919191] mt-2 text-sm leading-6">
            Create your account, explore PopX features,
            and get started in a few simple steps.
          </p>
        </div>

        <button
          onClick={() => navigate("/create-account")}
          className="w-full h-12 bg-[#6C25FF] text-white rounded-md font-semibold hover:bg-[#5c1ff0] transition"
        >
          Create Account
        </button>

        <button
          onClick={() => navigate("/login")}
          className="w-full h-12 mt-3 bg-[#E6D8FF] text-[#1D2226] rounded-md font-semibold"
        >
          Already Registered? Login
        </button>

      </div>
    </div>
  );
}

export default LandingPage;