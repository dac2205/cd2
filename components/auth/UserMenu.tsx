"use client";

import React, { useState } from "react";
import { useAuth } from "@/lib/auth";
import { User, LogOut, Edit2 } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/Popover";

export default function UserMenu() {
    const { user, logout, updateUser } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(user?.name || "");
    const [email, setEmail] = useState(user?.email || "");

    if (!user) return null;

    const handleSave = () => {
        updateUser(name, email);
        setIsEditing(false);
    };

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
                    {user.name}
                </div>
            </PopoverTrigger>
            <PopoverContent>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem", minWidth: "250px" }}>
                    {!isEditing ? (
                        <>
                            <div style={{ borderBottom: "1px solid hsl(var(--border))", paddingBottom: "0.5rem" }}>
                                <p style={{ fontWeight: 600 }}>{user.name}</p>
                                <p style={{ fontSize: "0.75rem", color: "hsl(var(--muted-foreground))" }}>{user.email}</p>
                            </div>
                            <button
                                onClick={() => {
                                    setName(user.name);
                                    setEmail(user.email);
                                    setIsEditing(true);
                                }}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.5rem",
                                    background: "none",
                                    border: "none",
                                    cursor: "pointer",
                                    padding: "0.5rem 0",
                                    color: "hsl(var(--foreground))",
                                    fontSize: "0.875rem"
                                }}
                            >
                                <Edit2 size={16} /> Edit Profile
                            </button>
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
                        </>
                    ) : (
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                            <div>
                                <label style={{ display: "block", fontSize: "0.75rem", marginBottom: "0.25rem" }}>Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    style={{ width: "100%", padding: "0.25rem", border: "1px solid hsl(var(--border))", borderRadius: "0.25rem" }}
                                />
                            </div>
                            <div>
                                <label style={{ display: "block", fontSize: "0.75rem", marginBottom: "0.25rem" }}>Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    style={{ width: "100%", padding: "0.25rem", border: "1px solid hsl(var(--border))", borderRadius: "0.25rem" }}
                                />
                            </div>
                            <div style={{ display: "flex", gap: "0.5rem", justifyContent: "flex-end" }}>
                                <button
                                    onClick={() => setIsEditing(false)}
                                    style={{ padding: "0.25rem 0.5rem", fontSize: "0.75rem", cursor: "pointer", background: "none", border: "1px solid hsl(var(--border))", borderRadius: "0.25rem" }}
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSave}
                                    style={{ padding: "0.25rem 0.5rem", fontSize: "0.75rem", cursor: "pointer", backgroundColor: "hsl(var(--primary))", color: "white", border: "none", borderRadius: "0.25rem" }}
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </PopoverContent>
        </Popover>
    );
}
