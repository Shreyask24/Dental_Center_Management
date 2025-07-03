import { createContext, useContext, useState } from "react";
import { getData } from "../utils/localStorage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const stored = localStorage.getItem("loggedInUser");
        return stored ? JSON.parse(stored) : null;
    });

    const login = (email, password) => {
        const allUsers = getData("users") || [];

        const matchedUser = allUsers.find(
            (u) => u.email === email && u.password === password
        );

        if (matchedUser) {
            localStorage.setItem("loggedInUser", JSON.stringify(matchedUser));
            setUser(matchedUser);
            return { success: true };
        }

        return {
            success: false,
            message: "Invalid credentials",
        };
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
