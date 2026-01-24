"use client";

import React from "react";
import { useAuth } from "@/lib/auth";
import { canAccessProtectedSection } from "@/lib/access-control";
import { Lock } from "lucide-react";

interface ProtectedSectionProps {
    section: string;
    children: React.ReactNode;
}

export default function ProtectedSection({ section, children }: ProtectedSectionProps) {
    const { user, isLoading, login } = useAuth();

    // Show loading state
    if (isLoading) {
        return (
            <div style={{
                textAlign: "center",
                padding: "3rem",
                color: "hsl(var(--ink-brown) / 0.6)"
            }}>
                <p>Loading...</p>
            </div>
        );
    }

    // Check access
    const hasAccess = canAccessProtectedSection(user?.email, section);

    if (!hasAccess) {
        return (
            <div className="card-wood" style={{
                textAlign: "center",
                padding: "3rem",
                maxWidth: "500px",
                margin: "2rem auto"
            }}>
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "1.5rem"
                }}>
                    <Lock size={48} style={{ color: "hsl(var(--ink-brown) / 0.4)" }} />
                </div>
                <h2 style={{
                    fontSize: "1.75rem",
                    marginBottom: "1rem",
                    color: "hsl(var(--ink-brown))"
                }}>
                    Protected Content
                </h2>
                <p style={{
                    fontSize: "1.125rem",
                    marginBottom: "1.5rem",
                    color: "hsl(var(--ink-brown) / 0.7)"
                }}>
                    This section is restricted to authorized users only.
                </p>

                {!user ? (
                    <button
                        onClick={login}
                        style={{
                            padding: "0.75rem 1.5rem",
                            fontSize: "1rem",
                            fontWeight: "600",
                            color: "hsl(var(--paper-white))",
                            backgroundColor: "hsl(var(--primary))",
                            border: "none",
                            borderRadius: "8px",
                            cursor: "pointer",
                            transition: "all 0.2s ease"
                        }}
                        className="hover-warm-glow"
                    >
                        Sign in to access
                    </button>
                ) : (
                    <p style={{
                        fontSize: "1rem",
                        color: "hsl(var(--ink-brown) / 0.6)",
                        fontStyle: "italic"
                    }}>
                        Your account ({user.email}) does not have access to this section.
                    </p>
                )}
            </div>
        );
    }

    return <>{children}</>;
}
