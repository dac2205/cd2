"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

const CORRECT_PASSWORD = "Conan@123";
const AUTH_STORAGE_KEY = "cd2_authenticated";

interface AuthContextType {
    isAuthenticated: boolean;
    login: (password: string) => boolean;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        // Check localStorage for existing auth
        const stored = localStorage.getItem(AUTH_STORAGE_KEY);
        if (stored === "true") {
            setIsAuthenticated(true);
        }
        setIsLoading(false);
    }, []);

    useEffect(() => {
        // Protect routes
        if (!isLoading) {
            if (!isAuthenticated && pathname !== "/login") {
                router.push("/login");
            } else if (isAuthenticated && pathname === "/login") {
                router.push("/");
            }
        }
    }, [isAuthenticated, isLoading, pathname, router]);

    const login = (password: string): boolean => {
        if (password === CORRECT_PASSWORD) {
            setIsAuthenticated(true);
            localStorage.setItem(AUTH_STORAGE_KEY, "true");
            router.push("/");
            return true;
        }
        return false;
    };

    const logout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem(AUTH_STORAGE_KEY);
        router.push("/login");
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, isLoading }}>
            {isLoading ? (
                <div style={{
                    height: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "hsl(var(--background))",
                    color: "hsl(var(--foreground))"
                }}>
                    Loading...
                </div>
            ) : (
                children
            )}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
