"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import mixpanel from "mixpanel-browser";

interface User {
    name: string;
    email: string;
}

interface AuthContextType {
    user: User | null;
    login: (email: string) => void;
    logout: () => void;
    updateUser: (name: string, email: string) => void;
    isAuthenticated: boolean;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        // Initial check from local storage
        const storedUser = localStorage.getItem("app_user");
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                console.error("Failed to parse user from local storage", e);
                localStorage.removeItem("app_user");
            }
        }
        setIsLoading(false);
    }, []);

    useEffect(() => {
        // Protect routes
        if (!isLoading) {
            if (!user && pathname !== "/login") {
                router.push("/login");
            }
        }
    }, [user, isLoading, pathname, router]);

    const login = (email: string) => {
        // Default name is the part before @
        const name = email.split("@")[0];
        const newUser = { email, name };
        setUser(newUser);
        localStorage.setItem("app_user", JSON.stringify(newUser));
        mixpanel.identify(email);
        mixpanel.people.set({ $name: name, $email: email });
        mixpanel.track("Sign In", { login_method: "email" });
        router.push("/");
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("app_user");
        mixpanel.reset();
        router.push("/login");
    };

    const updateUser = (name: string, email: string) => {
        const newUser = { name, email };
        setUser(newUser);
        localStorage.setItem("app_user", JSON.stringify(newUser));
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, updateUser, isAuthenticated: !!user, isLoading }}>
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
