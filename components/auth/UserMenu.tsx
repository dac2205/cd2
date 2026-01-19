"use client";

import React from "react";
import { useAuth } from "@/lib/auth";
import { User, LogOut } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/Popover";

export default function UserMenu() {
    const { user, logout } = useAuth();

    if (!user) return null;

    const displayName = user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0] || "User";

    return (
        <Popover>
            <PopoverTrigger>
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.5rem 1rem",
                    borderRadius: "999px",
                    backgroundColor: "hsl(var(--secondary))",
                    cursor: "pointer",
                    fontSize: "0.875rem",
                    fontWeight: 500
                }}>
                    <User size={16} />
                    {displayName}
                </div>
            </PopoverTrigger>
            <PopoverContent>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem", minWidth: "250px" }}>
                    <div style={{ borderBottom: "1px solid hsl(var(--border))", paddingBottom: "0.5rem" }}>
                        <p style={{ fontWeight: 600 }}>{displayName}</p>
                        <p style={{ fontSize: "0.75rem", color: "hsl(var(--muted-foreground))" }}>{user.email}</p>
                    </div>
                    <button
                        onClick={logout}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            padding: "0.5rem 0",
                            color: "hsl(var(--destructive))",
                            fontSize: "0.875rem"
                        }}
                    >
                        <LogOut size={16} /> Logout
                    </button>
                </div>
            </PopoverContent>
        </Popover>
    );
}
