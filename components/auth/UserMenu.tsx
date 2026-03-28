"use client";

import React from "react";
import { useAuth } from "@/lib/auth";
import { LogOut } from "lucide-react";

export default function UserMenu() {
    const { isAuthenticated, logout } = useAuth();

    if (!isAuthenticated) return null;

    return (
        <button
            onClick={logout}
            title="Đăng xuất"
            style={{
                display: "flex",
                alignItems: "center",
                gap: "0.375rem",
                padding: "0.25rem 0.75rem",
                borderRadius: "999px",
                backgroundColor: "hsl(var(--secondary))",
                cursor: "pointer",
                fontSize: "0.8rem",
                fontWeight: 500,
                border: "1px solid hsl(var(--border))",
                color: "hsl(var(--foreground))"
            }}
        >
            <LogOut size={14} />
            Logout
        </button>
    );
}
