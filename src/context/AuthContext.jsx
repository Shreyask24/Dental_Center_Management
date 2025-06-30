import { createContext, useContext, useState, useEffect } from "react";
import { getData } from "../utils/localStorage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("loggedInUser")));

    const login = (email, password) => {
        const users = getData("users");
        const matched = users.find(u => u.email === email && u.password === password);
        if (matched) {
            localStorage.setItem("loggedInUser", JSON.stringify(matched));
            setUser(matched);
            return { success: true };
        }
        return { success: false, message: "Invalid credentials" };
    };

    const logout = () => {
        localStorage.removeItem("loggedInUser");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
