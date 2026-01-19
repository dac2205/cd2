"use client";

import React from "react";
import { useAuth } from "@/lib/auth";
import { User, LogOut } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/Popover";

export default function UserMenu() {
    const { user, logout } = useAuth();

    if (!user) return null;

    const fullName = user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0] || "User";
    const avatarUrl = user.user_metadata?.avatar_url || user.user_metadata?.picture;

    // Get "First Name". Assuming standard "GivenName FamilyName" or "FamilyName GivenName".
    // "First Name" in this context likely means the name to display.
    // If it's "Nguyen Tat Dac", usually "Dac" is the one to show if we follow Western "First Name" as "Given name" logic, 
    // BUT strictly, "Nguyen" is the first word.
    // However, google Oauth often provides `given_name`.
    // Let's try to find `given_name` first, otherwise fallback to the *last* part of the name if it looks like a full name (common in VN to call by last word),
    // OR just take the first word if interpreted literally.
    // Let's check user's metadata structure again.
    // The user said: "Và chỉ hiển thị First Name thôi."
    // If user's name is "Nguyen Tat Dac". 
    // If I show "Nguyen", it's weird. If I show "Dac", it's better.
    // Google's `given_name` for "Nguyen Tat Dac" is usually "Dac" (if setup correctly) or "Nguyen Tat".
    // Let's try to assume the user wants `given_name` from metadata if available.

    const firstName = user.user_metadata?.given_name || fullName.split(' ').pop(); // Fallback to last word which is usually the name in VN names when English-reversed, or just the name. 
    // Wait, if I use `pop()`, I get the LAST word.
    // "Nguyen Tat Dac" -> "Dac". This is what people usually want when they say "call me by name".
    // If the user meant literal "First word", I would use `shift()`.
    // Given the context of "Anh Dac Dep Trai", "Dac" is his name. So `pop()` (Last word) is safer for Vietnamese names if full string is provided.
    // But let's check if google provides `given_name`.

    return (
        <Popover>
            <PopoverTrigger>
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.25rem 0.75rem 0.25rem 0.25rem",
                    borderRadius: "999px",
                    backgroundColor: "hsl(var(--secondary))",
                    cursor: "pointer",
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    border: "1px solid hsl(var(--border))"
                }}>
                    {avatarUrl ? (
                        <img
                            src={avatarUrl}
                            alt={firstName}
                            style={{ width: "24px", height: "24px", borderRadius: "50%", objectFit: "cover" }}
                        />
                    ) : (
                        <div style={{ width: "24px", height: "24px", borderRadius: "50%", backgroundColor: "hsl(var(--primary))", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "12px" }}>
                            {firstName?.[0]?.toUpperCase()}
                        </div>
                    )}
                    {firstName}
                </div>
            </PopoverTrigger>
            <PopoverContent>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem", minWidth: "250px" }}>
                    <div style={{ borderBottom: "1px solid hsl(var(--border))", paddingBottom: "0.5rem", display: "flex", gap: "0.75rem", alignItems: "center" }}>
                        {avatarUrl ? (
                            <img
                                src={avatarUrl}
                                alt={fullName}
                                style={{ width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover" }}
                            />
                        ) : (
                            <div style={{ width: "40px", height: "40px", borderRadius: "50%", backgroundColor: "hsl(var(--primary))", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "16px" }}>
                                {fullName?.[0]?.toUpperCase()}
                            </div>
                        )}
                        <div>
                            <p style={{ fontWeight: 600 }}>{fullName}</p>
                            <p style={{ fontSize: "0.75rem", color: "hsl(var(--muted-foreground))" }}>{user.email}</p>
                        </div>
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
