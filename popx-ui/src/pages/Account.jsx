import { useEffect, useState } from "react";

function Account() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("user"));

    if (data) {
      setUser(data);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#F7F8F9] flex justify-center">
      <div className="w-full max-w-md min-h-screen bg-[#F7F8F9]">

        {/* Header */}
        <div className="bg-white px-4 py-4 shadow-sm">
          <h1 className="text-lg font-semibold text-[#1D2226]">
            Account Settings
          </h1>
        </div>

        {/* Profile Section */}
        <div className="bg-white px-4 py-4 mt-1 flex items-center gap-3">

          <div className="relative">
            <img
              src={`https://ui-avatars.com/api/?name=${
                user?.name || "User"
              }&background=6C25FF&color=fff&size=128`}
              alt="profile"
              className="w-14 h-14 rounded-full"
            />

            <div className="absolute bottom-0 right-0 w-4 h-4 bg-[#6C25FF] rounded-full border-2 border-white"></div>
          </div>

          <div>
            <h2 className="font-semibold text-sm text-[#1D2226]">
              {user?.name}
            </h2>

            <p className="text-xs text-gray-500">
              {user?.email}
            </p>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white px-4 py-4 mt-1">
          <p className="text-sm text-[#4B5563] leading-6">
            Hello {user?.name}, welcome to your PopX account.
            Use this page to review and update your profile
            information, company details, and notification
            preferences.
          </p>
        </div>

        {/* Bottom Dotted Area Like Screenshot */}
        <div className="border-b border-dashed border-gray-300 mt-2"></div>

      </div>
    </div>
  );
}

export default Account;