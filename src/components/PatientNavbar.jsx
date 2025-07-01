import React from "react";
import { useNavigate } from "react-router-dom";
import { getData, removeData } from "../utils/localStorage";

const PatientNavbar = () => {
    const user = getData("loggedInUser");
    const navigate = useNavigate();

    const handleLogout = () => {
        removeData("loggedInUser");
        navigate("/login");
    };

    const handleHome = () => {
        navigate("/");
    };

    return (
        <nav className="bg-[#2C1E1E] text-white shadow sticky top-0 z-50 font-sans">
            <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center cursor:pointer">
                {/* Logo / Title */}
                <div className="flex items-center gap-3" >
                    <div className="w-8 h-8 bg-[#A67B5B] rounded-full flex items-center justify-center font-bold text-white text-sm">
                        <button onClick={handleHome}>🦷</button>
                    </div>
                    <button className="text-xl font-bold tracking-wide" onClick={handleHome}>Dental Management</button>
                </div>

                {/* Right Side */}
                <div className="flex items-center gap-4">
                    <div className="text-sm text-[#F7F1E1] hidden sm:block">
                        <span className="font-medium">{user?.email}</span>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 text-sm bg-[#A67B5B] hover:bg-[#A67B5B]/80 font-bold text-white rounded-md shadow transition-all duration-200 cursor:pointer"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default PatientNavbar;
