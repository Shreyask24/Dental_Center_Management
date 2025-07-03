import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getData, removeData } from "../utils/localStorage";

const AdminNavbar = () => {
    const user = getData("loggedInUser");
    const navigate = useNavigate();

    const handleLogout = () => {
        removeData("loggedInUser");
        navigate("/login");
    };

    const getLinkClasses = ({ isActive }) =>
        isActive
            ? "text-[#A67B5B] font-semibold border-b-2 border-[#A67B5B] pb-1"
            : "text-[#F7F1E1] hover:text-[#DCC8A5]";

    return (
        <nav className="bg-[#2C1E1E] text-white sticky top-0 z-50 font-sans">
            <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#A67B5B] rounded-full flex items-center justify-center text-sm font-bold">
                        <NavLink to="/">🦷</NavLink>
                    </div>
                    <NavLink to="/" className="text-xl font-bold tracking-wide">
                        Dental Management
                    </NavLink>
                </div>

                <div className="hidden md:flex gap-6 text-sm">
                    <NavLink to="/" className={getLinkClasses}>
                        Dashboard
                    </NavLink>
                    <NavLink to="/patients" className={getLinkClasses}>
                        Manage Patients
                    </NavLink>
                    <NavLink to="/incidents" className={getLinkClasses}>
                        Manage Appointments
                    </NavLink>
                    <NavLink to="/calendar" className={getLinkClasses}>
                        Calendar
                    </NavLink>
                </div>

                <div className="flex items-center gap-4">
                    {user?.email && (
                        <span className="text-sm text-[#F7F1E1] hidden sm:block">
                            {user.email}
                        </span>
                    )}
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-[#A67B5B] text-sm font-semibold rounded hover:bg-[#8C6449] transition"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default AdminNavbar;
