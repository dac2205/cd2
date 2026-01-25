"use client";

import { useState } from "react";
import { Info } from "lucide-react";
import * as Popover from "@radix-ui/react-popover";

type BrandId = "vitamind" | "true-juice" | "pushthroo";
type ViewMode = "compact" | "full";

interface BrandExample {
    name: string;
    step1: {
        trigger: string;
        quote: string;
    };
    step2: {
        jtbdTitle: string;
        situation: string;
    };
    step3: {
        outcome: string;
        justification: string;
    };
}

const brandExamples: Record<BrandId, BrandExample> = {
    "vitamind": {
        name: "VitaMind",
        step1: {
            trigger: "Cảm giác mất kiểm soát",
            quote: "Dạo này mình xuống sức thật. Mình không muốn tiếp tục như thế này."
        },
        step2: {
            jtbdTitle: "Instant Calm (Bình tĩnh Tức thì)",
            situation: "Đang chuẩn bị thuyết trình hoặc vừa cãi nhau xong tim đập nhanh, cần lấy lại bình tĩnh trong 3 phút."
        },
        step3: {
            outcome: "Nhịp tim ổn định trở lại, đầu óc minh mẫn, kiểm soát được hành vi",
            justification: "Cái này nhanh, tiện, không cần nghỉ → hợp với mình."
        }
    },
    "true-juice": {
        name: "True Juice",
        step1: {
            trigger: "Cảm giác cơ thể nhiễm độc",
            quote: "Sau những ngày lễ tết ăn uống quá đà, bụng dạ ậm ạch khó tiêu."
        },
        step2: {
            jtbdTitle: "Digestive Rest (Gut Health)",
            situation: "Sau những ngày lễ tết ăn uống quá đà, bụng dạ ậm ạch khó tiêu, cần cho hệ tiêu hóa nghỉ ngơi."
        },
        step3: {
            outcome: "Bụng nhẹ, tiêu hóa thông suốt, cảm giác 'body zero' sảng khoái",
            justification: "100% enzyme tươi sống, ép lạnh thủy lực, không đường → an toàn và hiệu quả."
        }
    },
    "pushthroo": {
        name: "PushThroo",
        step1: {
            trigger: "Cảm giác mất kiểm soát công việc",
            quote: "Mình biết rõ cần làm gì nhưng vẫn bị kéo vào vòng xoáy trì hoãn và phân tâm."
        },
        step2: {
            jtbdTitle: "Break Panic-Driven Procrastination",
            situation: "Có deadline quan trọng nhưng cứ bị phân tâm, cần một hệ thống thách thức mình thay vì dỗ dành."
        },
        step3: {
            outcome: "Precision-driven momentum, formidable execution, resilience được xây dựng",
            justification: "AI thách thức thực sự, không dỗ dành, có accountability → đúng cái mình cần."
        }
    }
};

export default function PurchaseJourneyPage() {
    const [selectedBrand, setSelectedBrand] = useState<BrandId>("vitamind");
    const [viewMode, setViewMode] = useState<ViewMode>("compact");
    const example = brandExamples[selectedBrand];

    return (
        <div className="container animate-slide-in">
            <div style={{ padding: "4rem 0", maxWidth: "1400px", margin: "0 auto" }}>
                {/* Header */}
                <div style={{ textAlign: "center", marginBottom: "3rem" }}>
                    <h1 style={{ marginBottom: "1rem", fontSize: "2.5rem" }}>
                        3 Bước Dẫn Tới Quyết Định Mua
                    </h1>
                    <p className="text-subtext" style={{ fontSize: "1.25rem", marginBottom: "2rem" }}>
                        Needs → JTBD → Decision
                    </p>
                    <p style={{ fontSize: "1rem", lineHeight: "1.6", maxWidth: "700px", margin: "0 auto" }}>
                        Hiểu rõ 3 bước này giúp bạn <strong>decode chính xác</strong> tại sao khách hàng quyết định mua — và tại sao họ <strong>không</strong> mua.
                    </p>
                </div>

                {/* Controls Row */}
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "3rem",
                    flexWrap: "wrap",
                    gap: "1rem"
                }}>
                    {/* Brand Selector */}
                    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                        {(Object.keys(brandExamples) as BrandId[]).map((brandId) => (
                            <button
                                key={brandId}
                                onClick={() => setSelectedBrand(brandId)}
                                style={{
                                    padding: "0.75rem 1.5rem",
                                    borderRadius: "8px",
                                    border: selectedBrand === brandId
                                        ? "2px solid hsl(var(--primary))"
                                        : "2px solid hsl(var(--border))",
                                    backgroundColor: selectedBrand === brandId
                                        ? "hsl(var(--primary) / 0.1)"
                                        : "hsl(var(--background))",
                                    color: selectedBrand === brandId
                                        ? "hsl(var(--primary))"
                                        : "hsl(var(--foreground))",
                                    fontWeight: selectedBrand === brandId ? 600 : 400,
                                    cursor: "pointer",
                                    transition: "all 0.2s ease",
                                    fontSize: "1rem"
                                }}
                            >
                                {brandExamples[brandId].name}
                            </button>
                        ))}
                    </div>

                    {/* View Mode Toggle */}
                    <div style={{
                        display: "flex",
                        gap: "0.5rem",
                        backgroundColor: "hsl(var(--muted) / 0.3)",
                        padding: "0.25rem",
                        borderRadius: "8px"
                    }}>
                        <button
                            onClick={() => setViewMode("compact")}
                            style={{
                                padding: "0.5rem 1rem",
                                borderRadius: "6px",
                                border: "none",
                                backgroundColor: viewMode === "compact"
                                    ? "hsl(var(--background))"
                                    : "transparent",
                                color: "hsl(var(--foreground))",
                                fontWeight: viewMode === "compact" ? 600 : 400,
                                cursor: "pointer",
                                transition: "all 0.2s ease",
                                fontSize: "0.9rem",
                                boxShadow: viewMode === "compact" ? "0 1px 3px rgba(0,0,0,0.1)" : "none"
                            }}
                        >
                            Compact
                        </button>
                        <button
                            onClick={() => setViewMode("full")}
                            style={{
                                padding: "0.5rem 1rem",
                                borderRadius: "6px",
                                border: "none",
                                backgroundColor: viewMode === "full"
                                    ? "hsl(var(--background))"
                                    : "transparent",
                                color: "hsl(var(--foreground))",
                                fontWeight: viewMode === "full" ? 600 : 400,
                                cursor: "pointer",
                                transition: "all 0.2s ease",
                                fontSize: "0.9rem",
                                boxShadow: viewMode === "full" ? "0 1px 3px rgba(0,0,0,0.1)" : "none"
                            }}
                        >
                            Full
                        </button>
                    </div>
                </div>

                {/* 3-Step Cards - Fixed 3 columns */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    gap: "1.5rem",
                    marginBottom: "3rem"
                }}>
                    {/* Step 1 */}
                    <StepCard
                        stepNumber={1}
                        title="Needs được kích hoạt"
                        subtitle="Có một cảm giác 'không ổn' xuất hiện"
                        description="Chưa có sản phẩm. Chưa có giải pháp. Chưa có so sánh."
                        characteristics={[
                            "Xảy ra trong <strong>vô thức</strong>",
                            "Thường là <strong>cảm xúc âm</strong> (thiếu, sợ, mệt, mất kiểm soát)",
                            "Người dùng <strong>không nói rõ được</strong>"
                        ]}
                        exampleBrand={example.name}
                        exampleContent={`"${example.step1.quote}"`}
                        insight="Nếu bước này không xảy ra → không có mua."
                        color="primary"
                        viewMode={viewMode}
                    />

                    {/* Step 2 */}
                    <StepCard
                        stepNumber={2}
                        title="Đóng khung thành JTBD"
                        subtitle="Người dùng gán cho cảm xúc đó một 'việc cần làm'"
                        description="Lần đầu tiên quyết định có hình dạng."
                        characteristics={[
                            "Bắt đầu <strong>có ngôn ngữ</strong>",
                            "Gắn với <strong>bối cảnh + tiến trình + kết quả mong muốn</strong>",
                            "Cho phép so sánh các lựa chọn"
                        ]}
                        exampleBrand={example.name}
                        exampleContent={
                            <>
                                <strong>{example.step2.jtbdTitle}</strong>
                                <br />
                                <span style={{ fontStyle: "italic" }}>"{example.step2.situation}"</span>
                            </>
                        }
                        insight="User chưa chọn sản phẩm, nhưng đã chọn xong cái job."
                        color="secondary"
                        viewMode={viewMode}
                    />

                    {/* Step 3 */}
                    <StepCard
                        stepNumber={3}
                        title="Hợp lý hoá & cam kết mua"
                        subtitle="User chọn giải pháp cụ thể cho JTBD đó"
                        description="Logic bắt đầu vào cuộc."
                        characteristics={[
                            "Logic bắt đầu vào cuộc",
                            "So sánh tính năng, giá, tiện lợi",
                            "Quyết định được <strong>tự biện minh</strong>"
                        ]}
                        exampleBrand={example.name}
                        exampleContent={`"${example.step3.justification}"`}
                        insight="Mua xảy ra ở đây, nhưng động lực nằm ở bước 1."
                        color="accent"
                        viewMode={viewMode}
                    />
                </div>

                {/* Summary Section */}
                <div className="card-wood" style={{ padding: "2rem", marginBottom: "2rem" }}>
                    <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem", textAlign: "center" }}>
                        Sơ đồ tổng quan
                    </h3>
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "1rem",
                        fontSize: "1.25rem",
                        fontWeight: 600,
                        padding: "2rem"
                    }}>
                        <div>Needs rung</div>
                        <div style={{ fontSize: "2rem", color: "hsl(var(--secondary))" }}>↓</div>
                        <div>JTBD được gọi tên</div>
                        <div style={{ fontSize: "2rem", color: "hsl(var(--secondary))" }}>↓</div>
                        <div>Giải pháp được chọn</div>
                    </div>
                </div>

                {/* Key Insight */}
                <div style={{
                    backgroundColor: "hsl(var(--primary) / 0.05)",
                    border: "2px solid hsl(var(--primary))",
                    borderRadius: "12px",
                    padding: "2rem",
                    textAlign: "center"
                }}>
                    <p style={{
                        fontSize: "1.25rem",
                        lineHeight: "1.8",
                        fontWeight: 500,
                        margin: 0
                    }}>
                        💡 <strong>Điểm mấu chốt:</strong><br />
                        Khách hàng không mua vì sản phẩm tốt.<br />
                        Họ mua khi Needs được kích hoạt đúng lúc,<br />
                        và JTBD cho phép họ hành động mà không thấy sai.
                    </p>
                </div>
            </div>
        </div>
    );
}

interface StepCardProps {
    stepNumber: number;
    title: string;
    subtitle: string;
    description: string;
    characteristics: string[];
    exampleBrand: string;
    exampleContent: React.ReactNode;
    insight: string;
    color: "primary" | "secondary" | "accent";
    viewMode: ViewMode;
}

function StepCard({
    stepNumber,
    title,
    subtitle,
    description,
    characteristics,
    exampleBrand,
    exampleContent,
    insight,
    color,
    viewMode
}: StepCardProps) {
    return (
        <div className="card-wood" style={{
            padding: "1.5rem",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            minHeight: viewMode === "compact" ? "auto" : "400px"
        }}>
            {/* Step Number Badge */}
            <div style={{
                position: "absolute",
                top: "1rem",
                right: "1rem",
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                backgroundColor: `hsl(var(--${color}) / 0.1)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: "1rem",
                color: `hsl(var(--${color}))`
            }}>
                {stepNumber}
            </div>

            {/* Title */}
            <h2 style={{
                fontSize: "1.25rem",
                marginBottom: "0.75rem",
                color: `hsl(var(--${color}))`,
                paddingRight: "3rem",
                lineHeight: "1.3"
            }}>
                {title}
            </h2>

            {/* Subtitle */}
            <p style={{
                fontSize: "0.9rem",
                fontWeight: 600,
                marginBottom: viewMode === "compact" ? "0" : "0.75rem",
                color: "hsl(var(--ink-brown) / 0.8)",
                lineHeight: "1.4"
            }}>
                {subtitle}
            </p>

            {/* Full mode content */}
            {viewMode === "full" && (
                <>
                    <p style={{ fontSize: "0.85rem", marginBottom: "0.75rem", lineHeight: "1.5", color: "hsl(var(--ink-brown) / 0.7)" }}>
                        {description}
                    </p>

                    {/* Example */}
                    <div style={{
                        borderLeft: `3px solid hsl(var(--${color}))`,
                        paddingLeft: "0.75rem",
                        marginBottom: "0.75rem",
                        fontSize: "0.85rem"
                    }}>
                        <p style={{ fontStyle: "italic", color: "hsl(var(--ink-brown) / 0.6)", marginBottom: "0.25rem" }}>
                            Ví dụ {exampleBrand}:
                        </p>
                        <div style={{ fontSize: "0.9rem", lineHeight: "1.4" }}>
                            {exampleContent}
                        </div>
                    </div>

                    {/* Spacer to push info icon to bottom */}
                    <div style={{ flex: 1 }} />

                    {/* Info Icon with Popover */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "0.75rem" }}>
                        <div style={{
                            backgroundColor: `hsl(var(--${color}) / 0.1)`,
                            padding: "0.5rem 0.75rem",
                            borderRadius: "6px",
                            fontSize: "0.75rem",
                            fontWeight: 600,
                            color: `hsl(var(--${color}))`,
                            flex: 1
                        }}>
                            📌 {insight}
                        </div>

                        <Popover.Root>
                            <Popover.Trigger asChild>
                                <button
                                    style={{
                                        marginLeft: "0.5rem",
                                        width: "32px",
                                        height: "32px",
                                        borderRadius: "50%",
                                        border: `1px solid hsl(var(--${color}) / 0.3)`,
                                        backgroundColor: "hsl(var(--background))",
                                        color: `hsl(var(--${color}))`,
                                        cursor: "pointer",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        transition: "all 0.2s ease",
                                        flexShrink: 0
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = `hsl(var(--${color}) / 0.1)`;
                                        e.currentTarget.style.transform = "scale(1.1)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = "hsl(var(--background))";
                                        e.currentTarget.style.transform = "scale(1)";
                                    }}
                                >
                                    <Info size={16} />
                                </button>
                            </Popover.Trigger>
                            <Popover.Portal>
                                <Popover.Content
                                    className="force-popover-style"
                                    sideOffset={5}
                                    style={{
                                        backgroundColor: "hsl(var(--background))",
                                        border: "1px solid hsl(var(--border))",
                                        borderRadius: "8px",
                                        padding: "1rem",
                                        maxWidth: "300px",
                                        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                                        zIndex: 1000
                                    }}
                                >
                                    <div style={{ marginBottom: "0.75rem" }}>
                                        <p style={{ fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.5rem", color: `hsl(var(--${color}))` }}>
                                            Đặc điểm chi tiết:
                                        </p>
                                        <ul style={{ fontSize: "0.75rem", margin: 0, paddingLeft: "1.25rem", lineHeight: "1.6" }}>
                                            {characteristics.map((char, idx) => (
                                                <li key={idx} dangerouslySetInnerHTML={{ __html: char }} />
                                            ))}
                                        </ul>
                                    </div>
                                    <div style={{
                                        fontSize: "0.75rem",
                                        padding: "0.5rem",
                                        backgroundColor: "hsl(var(--muted) / 0.3)",
                                        borderRadius: "4px",
                                        lineHeight: "1.5"
                                    }}>
                                        {description}
                                    </div>
                                    <Popover.Arrow style={{ fill: "hsl(var(--background))" }} />
                                </Popover.Content>
                            </Popover.Portal>
                        </Popover.Root>
                    </div>
                </>
            )}
        </div>
    );
}
