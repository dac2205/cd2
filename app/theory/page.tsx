import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Theory of AI Factory",
    description: "Khám phá lý thuyết AI Factory: JTBD, Purchase Journey, Decision Timeline, Struggle Stack và các khái niệm cốt lõi.",
    openGraph: {
        title: "Theory of AI Factory | Conan School",
        description: "Khám phá lý thuyết AI Factory với framework chuẩn thế giới",
    }
};

const factoryConcepts = [
    {
        title: "PRODUCTION LINE (DÂY CHUYỀN SẢN XUẤT)",
        description: "Chuỗi công đoạn cố định, nơi giá trị được tạo ra.",
        insight: "Không phải ai thích làm gì thì làm, mà là làm đúng việc, đúng lúc, đúng vị trí."
    },
    {
        title: "ASSEMBLY (LẮP RÁP)",
        description: "Ô tô không \"được tạo ra\", mà được lắp từ các module.",
        insight: "Tư duy modular: mỗi bộ phận độc lập nhưng phải khớp hoàn hảo."
    },
    {
        title: "WAREHOUSE / INVENTORY",
        description: "Kho chứa nguyên liệu, linh kiện, bán thành phẩm.",
        insight: "Quyết định tốc độ và khả năng scale của nhà máy."
    },
    {
        title: "STANDARD OPERATING PROCEDURES (SOP)",
        description: "Quy trình chuẩn cho từng công đoạn.",
        insight: "Giảm phụ thuộc vào cá nhân, tăng độ ổn định."
    },
    {
        title: "QUALITY CONTROL (QC / QA)",
        description: "Hệ thống kiểm soát chất lượng ở nhiều \"cổng\".",
        insight: "Lỗi không bị phát hiện ở cuối, mà bị chặn sớm."
    },
    {
        title: "PRODUCTION PLANNING & SCHEDULING",
        description: "Quyết định sản xuất bao nhiêu, khi nào, theo thứ tự nào.",
        insight: "Tránh tắc nghẽn, tránh tồn kho chết."
    },
    {
        title: "JUST-IN-TIME (JIT)",
        description: "Linh kiện đến đúng lúc cần, không sớm, không muộn.",
        insight: "Tối ưu dòng chảy thay vì tích trữ."
    },
    {
        title: "THROUGHPUT & BOTTLENECK",
        description: "Tốc độ toàn nhà máy bị quyết định bởi công đoạn chậm nhất.",
        insight: "Tối ưu sai chỗ = vô ích."
    },
    {
        title: "AUTOMATION & ROBOTICS",
        description: "Máy làm việc lặp lại, con người xử lý ngoại lệ.",
        insight: "Máy cho tốc độ, người cho phán đoán."
    },
    {
        title: "CONTINUOUS IMPROVEMENT (KAIZEN)",
        description: "Nhà máy không \"xong\", mà luôn được tinh chỉnh.",
        insight: "Mỗi lỗi là một dữ liệu để cải tiến hệ thống."
    }
];

export default function TheoryPage() {
    // Priority topics - Factory comparison series
    const priorityTopics = [
        {
            title: "Factory Comparison",
            description: "So sánh AI Content Factory với VinFast Auto Factory và Thanh Niên Newspaper.",
            href: "/theory/factory-comparison",
            color: "hsl(var(--primary))"
        },
        {
            title: "Production Line Comparison",
            description: "So sánh chi tiết dây chuyền sản xuất của 3 thế hệ factory khác nhau.",
            href: "/theory/production-line",
            color: "hsl(var(--primary))"
        },
        {
            title: "PRD Perspectives",
            description: "So sánh các góc nhìn và định dạng PRD qua 3 loại factory khác nhau.",
            href: "/theory/prd-perspectives",
            color: "hsl(var(--secondary))"
        },
        {
            title: "Warehouse Comparison",
            description: "So sánh Warehouse (Kho) của 3 factory: Content Library, Parts Inventory, News Archive.",
            href: "/theory/warehouse-comparison",
            color: "hsl(var(--accent))"
        }
    ];

    // Other theory topics
    const otherTopics = [
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
                    <h1 style={{ marginBottom: "1rem", fontSize: "3rem" }}>Theory of AI Factory</h1>
                    <p className="text-subtext" style={{ fontSize: "1.25rem" }}>Khám phá các khái niệm cốt lõi để xây dựng AI Factory</p>
                </div>

                {/* Factory Concepts Introduction */}
                <div style={{
                    backgroundColor: "hsl(var(--secondary))",
                    padding: "2.5rem",
                    borderRadius: "0.75rem",
                    marginBottom: "4rem",
                    border: "2px solid hsl(var(--border))"
                }}>
                    <h2 style={{
                        fontSize: "1.75rem",
                        fontWeight: "bold",
                        marginBottom: "1rem",
                        color: "hsl(var(--foreground))"
                    }}>
                        10 Key Concepts của AI Factory
                    </h2>
                    <p style={{
                        fontSize: "1.0625rem",
                        color: "hsl(var(--muted-foreground))",
                        marginBottom: "2rem",
                        lineHeight: "1.75"
                    }}>
                        Dưới đây là 10 key concepts cốt lõi của nhà máy sản xuất ô tô, ở mức tư duy hệ thống (không phải kỹ thuật cơ khí), rất phù hợp để bạn dùng làm xương sống ẩn dụ cho AI / Content Factory:
                    </p>

                    <div style={{ display: "grid", gap: "1.25rem" }}>
                        {factoryConcepts.map((concept, index) => (
                            <div key={index} style={{
                                backgroundColor: "hsl(var(--background))",
                                padding: "1.5rem",
                                borderRadius: "0.5rem",
                                border: "1px solid hsl(var(--border))",
                                transition: "all 0.2s ease",
                            }}
                                className="hover-warm-glow"
                            >
                                <div style={{
                                    display: "flex",
                                    alignItems: "baseline",
                                    gap: "0.75rem",
                                    marginBottom: "0.75rem"
                                }}>
                                    <span style={{
                                        fontSize: "1.125rem",
                                        fontWeight: "bold",
                                        color: "hsl(var(--primary))",
                                        minWidth: "2rem"
                                    }}>
                                        {index + 1}.
                                    </span>
                                    <h3 style={{
                                        fontSize: "1.125rem",
                                        fontWeight: "bold",
                                        color: "hsl(var(--foreground))"
                                    }}>
                                        {concept.title}
                                    </h3>
                                </div>
                                <p style={{
                                    fontSize: "0.9375rem",
                                    color: "hsl(var(--muted-foreground))",
                                    marginBottom: "0.75rem",
                                    lineHeight: "1.6",
                                    paddingLeft: "2.75rem"
                                }}>
                                    {concept.description}
                                </p>
                                <p style={{
                                    fontSize: "0.9375rem",
                                    color: "hsl(var(--ink-brown))",
                                    fontWeight: 500,
                                    paddingLeft: "2.75rem",
                                    borderLeft: "3px solid hsl(var(--primary))",
                                    marginLeft: "2.75rem",
                                    lineHeight: "1.6"
                                }}>
                                    → {concept.insight}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Theory Topics */}
                <div style={{ marginBottom: "2rem" }}>
                    <h2 style={{ fontSize: "2rem", marginBottom: "1rem", textAlign: "center" }}>Core Theory Topics</h2>
                    <p className="text-subtext" style={{ fontSize: "1.125rem", textAlign: "center" }}>Select a concept to explore in depth</p>
                </div>

                {/* Priority Topics - Factory Comparison Series */}
                <div style={{ marginBottom: "3rem" }}>
                    <h3 style={{
                        fontSize: "1.5rem",
                        marginBottom: "1.5rem",
                        color: "hsl(var(--primary))",
                        fontWeight: "bold"
                    }}>
                        🏭 Factory Comparison Series
                    </h3>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
                        {priorityTopics.map((section, index) => (
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
                                    borderTop: `4px solid ${section.color}`,
                                    backgroundColor: "hsl(var(--primary) / 0.05)"
                                }}
                            >
                                <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem", color: section.color }}>{section.title}</h2>
                                <p style={{ color: "hsl(var(--ink-brown))", lineHeight: "1.6" }}>{section.description}</p>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Divider */}
                <div style={{
                    width: "100%",
                    height: "2px",
                    backgroundColor: "hsl(var(--border))",
                    marginBottom: "3rem",
                    position: "relative"
                }}>
                    <div style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        backgroundColor: "hsl(var(--background))",
                        padding: "0 1rem",
                        color: "hsl(var(--muted-foreground))",
                        fontSize: "0.875rem"
                    }}>
                        Other Theory Topics
                    </div>
                </div>

                {/* Other Topics */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
                    {otherTopics.map((section, index) => (
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
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
