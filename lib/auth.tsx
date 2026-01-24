"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import mixpanel from "mixpanel-browser";
import { supabase } from "./supabase";
import { User as SupabaseUser } from "@supabase/supabase-js";

interface AuthContextType {
    user: SupabaseUser | null;
    login: () => void;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<SupabaseUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        let mounted = true;

        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (_event, session) => {
                if (mounted) {
                    if (session?.user) {
                        setUser(session.user);
                        identifyMixpanel(session.user);
                    } else {
                        setUser(null);
                        mixpanel.reset();
                    }
                    setIsLoading(false);
                }
            }
        );

        return () => {
            mounted = false;
            subscription.unsubscribe();
        };
    }, []);

    const identifyMixpanel = (user: SupabaseUser) => {
        mixpanel.identify(user.id);
        mixpanel.people.set({
            $email: user.email,
            $name: user.user_metadata?.full_name || user.user_metadata?.name || user.email,
            last_login: new Date().toISOString()
        });
    };

    useEffect(() => {
        // Protect routes
        if (!isLoading) {
            if (!user && pathname !== "/login") {
                router.push("/login");
            } else if (user && pathname === "/login") {
                router.push("/");
            }
        }
    }, [user, isLoading, pathname, router]);

    const login = async () => {

        const getRedirectUrl = () => {
            const hostname = window.location.hostname;
            const protocol = window.location.protocol;

            // If logging in from root domain "conan.school", redirect to "www.conan.school"
            if (hostname === 'conan.school') {
                return `${protocol}//www.conan.school/`;
            }

            // Otherwise (cd2.conan.school, localhost, etc.), stay on current origin
            return `${window.location.origin}/`;
        };

        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: getRedirectUrl(),
            }
        });
        if (error) {
            console.error("Login error:", error);
            mixpanel.track("Login Error", { error: error.message });
        }
    };

    const logout = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) {
                console.error("Logout error:", error);
            }
        } catch (e) {
            console.error("Unexpected logout error:", e);
        } finally {
            // Always clear local state and redirect
            setUser(null);
            mixpanel.reset();
            router.push("/login");
            router.refresh();
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoading }}>
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
