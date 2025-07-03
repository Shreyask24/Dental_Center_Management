import React from "react";
import { useNavigate } from "react-router-dom";
import { getData, removeData } from "../utils/localStorage";

const PatientNavbar = () => {
    const user = getData("loggedInUser");
    const navigate = useNavigate();

    const goToHome = () => navigate("/");

    const handleLogout = () => {
        removeData("loggedInUser");
        navigate("/login");
    };

    return (
        <nav className="bg-[#2C1E1E] text-white sticky top-0 z-50 font-sans">
            <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">

                <div className="flex items-center gap-3">
                    <button
                        onClick={goToHome}
                        className="w-8 h-8 bg-[#A67B5B] rounded-full flex items-center justify-center font-bold text-white text-sm"
                        aria-label="Home"
                    >
                        🦷
                    </button>
                    <button
                        onClick={goToHome}
                        className="text-xl font-bold tracking-wide"
                    >
                        Dental Management
                    </button>
                </div>

                <div className="flex items-center gap-4">
                    {user?.email && (
                        <span className="text-sm text-[#F7F1E1] hidden sm:block font-medium">
                            {user.email}
                        </span>
                    )}
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 text-sm bg-[#A67B5B] hover:bg-[#A67B5B]/80 font-bold text-white rounded-md transition duration-200"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default PatientNavbar;
