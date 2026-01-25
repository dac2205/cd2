import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TheoryPage() {
    const sections = [
        {
            title: "Defining the Who",
            description: "Chân dung, Phân khúc và Sự thấu cảm (Empathy).",
            href: "/theory/who",
            color: "hsl(var(--ink-brown))"
        },
        {
            title: "Motivation & Behavior",
            description: "Mô hình hành vi và động lực khách hàng.",
            href: "/theory/motivation",
            color: "hsl(var(--ink-brown))"
        },
        {
            title: "Jobs to be Done (JTBD)",
            description: "Lý thuyết cốt lõi về động lực thúc đẩy hành động mua hàng.",
            href: "/theory/jtbd",
            color: "hsl(var(--secondary))"
        },
        {
            title: "JTBD vs Needs",
            description: "So sánh JTBD với tư duy Needs truyền thống qua ví dụ thực tế.",
            href: "/theory/jtbd-vs-needs",
            color: "hsl(var(--primary))"
        },
        {
            title: "3-Step Purchase Journey",
            description: "3 bước cốt lõi dẫn tới quyết định mua: Needs → JTBD → Decision.",
            href: "/theory/purchase-journey",
            color: "hsl(var(--primary))"
        },
        {
            title: "Decision Timeline",
            description: "11 mốc quyết định của khách hàng từ Status Quo đến Loyalty.",
            href: "/theory/decision-timeline",
            color: "hsl(var(--accent))"
        },
        {
            title: "The Struggle Stack",
            description: "Tháp đấu tranh tâm lý từ thụ động đến hành động.",
            href: "/theory/struggle-stack",
            color: "hsl(var(--secondary))"
        },
        {
            title: "Insight Structure",
            description: "Giải phẫu một Insight: Tension, Core & Trigger.",
            href: "/theory/insights",
            color: "hsl(var(--ink-brown))"
        }
    ];

    return (
        <div className="container animate-slide-in">
            <div style={{ padding: "4rem 0", maxWidth: "1400px", margin: "0 auto" }}>
                <div style={{ textAlign: "center", marginBottom: "4rem" }}>
                    <h1 style={{ marginBottom: "1rem", fontSize: "3rem" }}>Theory of Customer Decode</h1>
                    <p className="text-subtext" style={{ fontSize: "1.25rem" }}>Select a concept to explore in depth</p>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "2rem" }}>
                    {sections.map((section, index) => (
                        <Link
                            key={index}
                            href={section.href}
                            className="card-wood hover-warm-glow"
                            style={{
                                padding: "2rem",
                                textDecoration: "none",
                                display: "flex",
                                flexDirection: "column",
                                height: "100%",
                                borderTop: `4px solid ${section.color}`
                            }}
                        >
                            <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem", color: section.color }}>{section.title}</h2>
                            <p style={{ color: "hsl(var(--ink-brown))", lineHeight: "1.6" }}>{section.description}</p>
                            <div style={{ marginTop: "auto", paddingTop: "1.5rem", fontWeight: 600, color: section.color, display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                Explore <ArrowLeft size={16} style={{ transform: "rotate(180deg)" }} />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
