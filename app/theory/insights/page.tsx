import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from '@/components/ui/Accordion';

export default function InsightsPage() {
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
                    <h1 style={{ marginBottom: "1rem", fontSize: "3rem" }}>Insight Structure</h1>
                    <p className="text-subtext" style={{ fontSize: "1.25rem" }}>Cấu trúc của một Insight</p>
                </div>

                <div className="card-wood" style={{ padding: "2rem", marginBottom: "3rem" }}>
                    <div style={{ marginBottom: "2rem", borderRadius: "12px", overflow: "hidden", border: "1px solid hsl(var(--border))" }}>
                        <img
                            src="/images/theory/insight.png"
                            alt="Insight Structure"
                            style={{ width: "100%", height: "auto", display: "block" }}
                        />
                    </div>
                    <p style={{ fontSize: "1.125rem", lineHeight: "1.6" }}>
                        Insight không phải là data hay observation (quan sát). Insight là lý do "Why" (tại sao) ẩn sâu bên dưới hành vi, thường chứa đựng một mâu thuẫn hoặc một sự thật hiển nhiên nhưng bị bỏ qua.
                    </p>
                </div>

                <div style={{ display: "grid", gap: "2rem" }}>
                    <div className="card-wood" style={{ padding: "1.5rem", borderLeft: "4px solid hsl(var(--accent))" }}>
                        <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem", color: "hsl(var(--accent))" }}>1. Tension (Điểm Căng thẳng)</h3>
                        <p style={{ marginBottom: "1rem", lineHeight: "1.6" }}>
                            Khoảng cách giữa Current Self (con người hiện tại) và Ideal Self (con người mong muốn). Tension tạo ra năng lượng để hành động. <strong>Không có Tension, không có Sale.</strong>
                        </p>
                    </div>

                    <div className="card-wood" style={{ padding: "1.5rem", borderLeft: "4px solid hsl(var(--primary))" }}>
                        <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem", color: "hsl(var(--primary))" }}>2. Trigger (Điểm Kích hoạt)</h3>
                        <p style={{ marginBottom: "1rem", lineHeight: "1.6" }}>
                            Sự kiện hoặc tín hiệu (Internal hoặc External) thúc đẩy khách hàng hành động ngay lập tức. Without a trigger, desire (mong muốn) chỉ là tiềm năng.
                        </p>
                        <Link href="/theory/jtbd" style={{ color: "hsl(var(--primary))", textDecoration: "underline", fontWeight: 600 }}>
                            See more about Triggers in JTBD →
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
