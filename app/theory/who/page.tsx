import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from '@/components/ui/Accordion';

export default function DefiningWhoPage() {
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
                    <h1 style={{ marginBottom: "1rem", fontSize: "3rem" }}>Defining the Who</h1>
                    <p className="text-subtext" style={{ fontSize: "1.25rem" }}>Định hình Chân dung Khách hàng</p>
                </div>

                <div className="card-wood" style={{ padding: "2rem", marginBottom: "3rem" }}>
                    <div style={{ marginBottom: "2rem", borderRadius: "12px", overflow: "hidden", border: "1px solid hsl(var(--border))" }}>
                        <img
                            src="/images/theory/who.png"
                            alt="Defining the Who"
                            style={{ width: "100%", height: "auto", display: "block" }}
                        />
                    </div>
                    <p style={{ fontSize: "1.125rem", lineHeight: "1.6" }}>
                        Bước đầu tiên của AI Factory là xác định rõ chúng ta đang phục vụ ai. "Bán cho tất cả mọi người" là con đường nhanh nhất dẫn đến thất bại.
                    </p>
                </div>

                <div style={{ display: "grid", gap: "2rem" }}>
                    <div className="card-wood" style={{ padding: "1.5rem" }}>
                        <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem", color: "hsl(var(--ink-brown))" }}>1. Audience Segments (Phân khúc Khán giả)</h3>
                        <p style={{ marginBottom: "1rem", lineHeight: "1.6" }}>
                            Thay vì cố gắng bán cho "Everyone" (tất cả mọi người), chúng ta chia thị trường thành các nhóm nhỏ dựa trên Demographics (nhân khẩu học) và Psychographics (tâm lý học). Điều này giúp thông điệp trở nên Relevant (liên quan) hơn.
                        </p>
                    </div>

                    <div className="card-wood" style={{ padding: "1.5rem" }}>
                        <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem", color: "hsl(var(--ink-brown))" }}>2. Personas (Chân dung Đại diện)</h3>
                        <p style={{ marginBottom: "1rem", lineHeight: "1.6" }}>
                            Persona là một nhân vật hư cấu đại diện cho một Segment cụ thể. Nó giúp team marketing có Empathy (sự thấu cảm) sâu sắc hơn, hình dung rõ ràng họ đang nói chuyện với ai, thay vì chỉ nhìn vào số liệu khô khan.
                        </p>
                    </div>

                    <div className="card-wood" style={{ padding: "1.5rem" }}>
                        <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem", color: "hsl(var(--ink-brown))" }}>3. Empathy Map (Bản đồ Thấu cảm)</h3>
                        <p style={{ marginBottom: "1rem", lineHeight: "1.6" }}>
                            Một công cụ giúp đi sâu vào tâm trí khách hàng bằng cách đặt câu hỏi: Họ Think & Feel (nghĩ và cảm thấy) gì? Họ See (thấy) gì? Họ Say & Do (nói và làm) gì? Mục tiêu là tìm ra Pain points (nỗi đau) và Gains (mong muốn).
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
