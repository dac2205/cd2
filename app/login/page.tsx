"use client";

import React, { useState } from "react";
import { useAuth } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Lock } from "lucide-react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login } = useAuth();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (password === "AnhDacDepTrai") {
            login(email);
        } else {
            setError("Mật khẩu không đúng. Vui lòng thử lại.");
        }
    };

    return (
        <div style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "hsl(var(--background))",
            padding: "1rem"
        }}>
            <Card style={{ width: "100%", maxWidth: "400px" }}>
                <CardHeader style={{ textAlign: "center" }}>
                    <div style={{
                        margin: "0 auto 1rem",
                        width: "3rem",
                        height: "3rem",
                        backgroundColor: "hsl(var(--primary) / 0.1)",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "hsl(var(--primary))"
                    }}>
                        <Lock size={24} />
                    </div>
                    <CardTitle>Đăng nhập</CardTitle>
                    <CardDescription>Nhập email và mật khẩu được cung cấp để truy cập hệ thống.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                        <div>
                            <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.875rem", fontWeight: 500 }}>Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="name@example.com"
                                style={{
                                    width: "100%",
                                    padding: "0.5rem",
                                    borderRadius: "0.375rem",
                                    border: "1px solid hsl(var(--border))",
                                    backgroundColor: "hsl(var(--background))"
                                }}
                            />
                        </div>
                        <div>
                            <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.875rem", fontWeight: 500 }}>Mật khẩu</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="••••••••"
                                style={{
                                    width: "100%",
                                    padding: "0.5rem",
                                    borderRadius: "0.375rem",
                                    border: "1px solid hsl(var(--border))",
                                    backgroundColor: "hsl(var(--background))"
                                }}
                            />
                        </div>

                        {error && (
                            <div style={{ color: "red", fontSize: "0.875rem" }}>{error}</div>
                        )}

                        <button
                            type="submit"
                            style={{
                                width: "100%",
                                padding: "0.75rem",
                                backgroundColor: "hsl(var(--primary))",
                                color: "white",
                                border: "none",
                                borderRadius: "0.375rem",
                                fontWeight: 500,
                                cursor: "pointer",
                                marginTop: "1rem"
                            }}
                        >
                            Đăng nhập
                        </button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
