import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function MotivationPage() {
    return (
        <div className="container animate-slide-in">
            <div style={{ padding: "3rem 0", maxWidth: "800px", margin: "0 auto" }}>
                <Link
                    href="/theory"
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        color: "hsl(var(--ink-brown) / 0.6)",
                        textDecoration: "none",
                        marginBottom: "1rem",
                        fontSize: "0.875rem"
                    }}
                >
                    <ArrowLeft size={16} /> Back to Theory
                </Link>

                <div style={{ textAlign: "center", marginBottom: "4rem" }}>
                    <h1 style={{ marginBottom: "1rem", fontSize: "3rem" }}>Motivation & Behavior</h1>
                    <p className="text-subtext" style={{ fontSize: "1.25rem" }}>Động cơ & Hành vi</p>
                </div>

                <div className="card-wood" style={{ padding: "2rem", marginBottom: "3rem" }}>
                    <div style={{ marginBottom: "2rem", borderRadius: "12px", overflow: "hidden", border: "1px solid hsl(var(--border))" }}>
                        <img
                            src="/images/theory/motivation.png"
                            alt="Motivation and Behavior"
                            style={{ width: "100%", height: "auto", display: "block" }}
                        />
                    </div>
                </div>

                <div style={{ display: "grid", gap: "2rem" }}>
                    <div className="card-wood" style={{ padding: "1.5rem" }}>
                        <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem", color: "hsl(var(--ink-brown))" }}>Mental Model (Mô hình Tư duy)</h3>
                        <p style={{ marginBottom: "1rem", lineHeight: "1.6" }}>
                            Là cách khách hàng nhận thức thế giới vận hành. Nếu sản phẩm của bạn đi ngược lại Mental Model của họ, sẽ xảy ra Friction (ma sát). Marketing giỏi là Align (căn chỉnh) giải pháp vào đúng Perception (nhận thức) hiện có của họ.
                        </p>
                    </div>

                    {/* Links to deep dives */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                        <Link href="/theory/jtbd" className="card-wood hover-warm-glow" style={{ padding: "1.5rem", textDecoration: "none", display: "block" }}>
                            <h3 style={{ fontSize: "1.25rem", color: "hsl(var(--primary))", marginBottom: "0.5rem" }}>Jobs to be Done →</h3>
                            <p style={{ fontSize: "0.875rem", color: "hsl(var(--ink-brown))" }}>Lý thuyết cốt lõi về việc "thuê" sản phẩm.</p>
                        </Link>
                        <Link href="/theory/struggle-stack" className="card-wood hover-warm-glow" style={{ padding: "1.5rem", textDecoration: "none", display: "block" }}>
                            <h3 style={{ fontSize: "1.25rem", color: "hsl(var(--primary))", marginBottom: "0.5rem" }}>The Struggle Stack →</h3>
                            <p style={{ fontSize: "0.875rem", color: "hsl(var(--ink-brown))" }}>Chuỗi khó khăn từ thụ động đến chủ động.</p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
