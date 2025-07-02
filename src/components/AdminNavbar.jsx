import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { getData, removeData } from '../utils/localStorage';

const AdminNavbar = () => {
    const user = getData("loggedInUser");
    const navigate = useNavigate();

    const handleLogout = () => {
        removeData("loggedInUser");
        navigate("/login");
    };

    const navLinkClasses = ({ isActive }) =>
        isActive
            ? "text-[#A67B5B] font-semibold border-b-2 border-[#A67B5B] pb-1"
            : "text-[#F7F1E1] hover:text-[#DCC8A5]";

    return (
        <nav className="bg-[#2C1E1E] shadow sticky top-0 z-50 font-sans">
            <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
                {/* Left Logo */}
                <div className="flex items-center gap-3" >
                    <div className="w-8 h-8 bg-[#A67B5B] rounded-full flex items-center justify-center font-bold text-white text-sm">
                        <NavLink to="/">🦷</NavLink>
                    </div>
                    <button className="text-xl font-bold tracking-wide text-white"><NavLink to="/">Dental Management</NavLink></button>
                </div>

                {/* Center Nav */}
                <div className="hidden md:flex gap-6 text-sm">
                    <NavLink to="/" className={navLinkClasses}>
                        Dashboard
                    </NavLink>
                    <NavLink to="/patients" className={navLinkClasses}>
                        Manage Patients
                    </NavLink>
                    <NavLink to="/incidents" className={navLinkClasses}>
                        Manage Appointments
                    </NavLink>
                    <NavLink to="/calendar" className={navLinkClasses}>
                        Calendar
                    </NavLink>
                </div>

                {/* Right logout */}
                <div className="flex items-center gap-4">
                    <span className="text-sm text-[#F7F1E1] hidden sm:block">
                        {user?.email}
                    </span>
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-[#A67B5B] text-white text-sm rounded hover:bg-[#8C6449]"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default AdminNavbar;
