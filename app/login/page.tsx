"use client";

import React, { useState } from "react";
import { useAuth } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Lock } from "lucide-react";

export default function LoginPage() {
    const { login } = useAuth();
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        const success = login(password);
        if (!success) {
            setError("Mật khẩu không đúng. Vui lòng thử lại.");
            setPassword("");
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
                    <CardDescription>Nhập mật khẩu để truy cập hệ thống.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Nhập mật khẩu..."
                            autoFocus
                            style={{
                                width: "100%",
                                padding: "0.75rem",
                                border: `1px solid ${error ? "hsl(var(--destructive))" : "hsl(var(--border))"}`,
                                borderRadius: "0.375rem",
                                backgroundColor: "hsl(var(--background))",
                                color: "hsl(var(--foreground))",
                                fontSize: "0.875rem",
                                outline: "none",
                                boxSizing: "border-box"
                            }}
                        />
                        {error && (
                            <p style={{
                                color: "hsl(var(--destructive))",
                                fontSize: "0.8rem",
                                margin: 0
                            }}>
                                {error}
                            </p>
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
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "0.5rem"
                            }}
                        >
                            <Lock size={16} />
                            Đăng nhập
                        </button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
