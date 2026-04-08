import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    //  Check token validity on app load
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            const decoded = jwtDecode(token);
            if (decoded.exp * 1000 < Date.now()) {
                logout();
                return;
            }
            setIsAuthenticated(true);
            setUser({
                id: localStorage.getItem("user"),
                email: decoded.email,
            });
        } catch {
            logout();
        }
    }, []);

    const login = (token, customerData) => {
        localStorage.setItem("token", token);
        localStorage.setItem("user", customerData.id);
        setIsAuthenticated(true);
        setUser(customerData);
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("checkoutDraft");
        setIsAuthenticated(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);