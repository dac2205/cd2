"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

type BrandId = "vitamind" | "true-juice" | "pushthroo";

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
    const example = brandExamples[selectedBrand];

    return (
        <div className="container animate-slide-in">
            <div style={{ padding: "4rem 0", maxWidth: "1200px", margin: "0 auto" }}>
                {/* Header */}
                <div style={{ textAlign: "center", marginBottom: "3rem" }}>
                    <h1 style={{ marginBottom: "1rem", fontSize: "2.5rem" }}>
                        3 Bước Cốt Lõi Dẫn Tới Quyết Định Mua
                    </h1>
                    <p className="text-subtext" style={{ fontSize: "1.25rem", marginBottom: "2rem" }}>
                        Needs → JTBD → Decision
                    </p>
                    <p style={{ fontSize: "1rem", lineHeight: "1.6", maxWidth: "700px", margin: "0 auto" }}>
                        Rất gọn. Nếu <strong>bóc đúng bản chất hành vi mua</strong>, thì <strong>chỉ cần 3 bước</strong> là đủ — thêm bước nào nữa là… bắt đầu làm học viên rối 😄
                    </p>
                </div>

                {/* Brand Selector */}
                <div style={{
                    display: "flex",
                    gap: "1rem",
                    justifyContent: "center",
                    marginBottom: "3rem",
                    flexWrap: "wrap"
                }}>
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

                {/* 3-Step Cards */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                    gap: "1.5rem",
                    marginBottom: "3rem"
                }}>
                    {/* Step 1 */}
                    <div className="card-wood" style={{ padding: "2rem", position: "relative" }}>
                        <div style={{
                            position: "absolute",
                            top: "1rem",
                            right: "1rem",
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                            backgroundColor: "hsl(var(--primary) / 0.1)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: 700,
                            color: "hsl(var(--primary))"
                        }}>
                            1
                        </div>

                        <h2 style={{
                            fontSize: "1.5rem",
                            marginBottom: "1rem",
                            color: "hsl(var(--primary))",
                            paddingRight: "3rem"
                        }}>
                            Needs được kích hoạt
                        </h2>

                        <p style={{
                            fontSize: "0.95rem",
                            fontWeight: 600,
                            marginBottom: "1rem",
                            color: "hsl(var(--ink-brown) / 0.8)"
                        }}>
                            👉 Có một cảm giác "không ổn" xuất hiện
                        </p>

                        <p style={{ fontSize: "0.9rem", marginBottom: "1rem", lineHeight: "1.6" }}>
                            Chưa có sản phẩm. Chưa có giải pháp. Chưa có so sánh.
                        </p>

                        <div style={{
                            backgroundColor: "hsl(var(--muted) / 0.5)",
                            padding: "1rem",
                            borderRadius: "8px",
                            marginBottom: "1rem"
                        }}>
                            <p style={{ fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.5rem" }}>
                                Đặc điểm:
                            </p>
                            <ul style={{ fontSize: "0.85rem", margin: 0, paddingLeft: "1.25rem", lineHeight: "1.6" }}>
                                <li>Xảy ra trong <strong>vô thức</strong></li>
                                <li>Thường là <strong>cảm xúc âm</strong> (thiếu, sợ, mệt, mất kiểm soát)</li>
                                <li>Người dùng <strong>không nói rõ được</strong></li>
                            </ul>
                        </div>

                        <div style={{
                            borderLeft: "3px solid hsl(var(--primary))",
                            paddingLeft: "1rem",
                            marginBottom: "1rem"
                        }}>
                            <p style={{ fontSize: "0.85rem", fontStyle: "italic", color: "hsl(var(--ink-brown) / 0.7)" }}>
                                Ví dụ với {example.name}:
                            </p>
                            <p style={{ fontSize: "0.95rem", fontStyle: "italic", marginTop: "0.5rem" }}>
                                "{example.step1.quote}"
                            </p>
                        </div>

                        <div style={{
                            backgroundColor: "hsl(var(--primary) / 0.1)",
                            padding: "0.75rem",
                            borderRadius: "6px",
                            fontSize: "0.85rem",
                            fontWeight: 600,
                            color: "hsl(var(--primary))"
                        }}>
                            📌 Nếu bước này <strong>không xảy ra</strong> → không có mua.
                        </div>
                    </div>

                    {/* Arrow */}
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gridColumn: "auto"
                    }} className="hidden-mobile">
                        <ArrowRight size={32} style={{ color: "hsl(var(--secondary))" }} />
                    </div>

                    {/* Step 2 */}
                    <div className="card-wood" style={{ padding: "2rem", position: "relative" }}>
                        <div style={{
                            position: "absolute",
                            top: "1rem",
                            right: "1rem",
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                            backgroundColor: "hsl(var(--secondary) / 0.1)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: 700,
                            color: "hsl(var(--secondary))"
                        }}>
                            2
                        </div>

                        <h2 style={{
                            fontSize: "1.5rem",
                            marginBottom: "1rem",
                            color: "hsl(var(--secondary))",
                            paddingRight: "3rem"
                        }}>
                            Đóng khung thành JTBD
                        </h2>

                        <p style={{
                            fontSize: "0.95rem",
                            fontWeight: 600,
                            marginBottom: "1rem",
                            color: "hsl(var(--ink-brown) / 0.8)"
                        }}>
                            👉 Người dùng <strong>gán cho cảm xúc đó một "việc cần làm"</strong>
                        </p>

                        <p style={{ fontSize: "0.9rem", marginBottom: "1rem", lineHeight: "1.6" }}>
                            Lần đầu tiên quyết định <strong>có hình dạng</strong>.
                        </p>

                        <div style={{
                            backgroundColor: "hsl(var(--muted) / 0.5)",
                            padding: "1rem",
                            borderRadius: "8px",
                            marginBottom: "1rem"
                        }}>
                            <p style={{ fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.5rem" }}>
                                Đặc điểm:
                            </p>
                            <ul style={{ fontSize: "0.85rem", margin: 0, paddingLeft: "1.25rem", lineHeight: "1.6" }}>
                                <li>Bắt đầu <strong>có ngôn ngữ</strong></li>
                                <li>Gắn với <strong>bối cảnh + tiến trình + kết quả mong muốn</strong></li>
                                <li>Cho phép so sánh các lựa chọn</li>
                            </ul>
                        </div>

                        <div style={{
                            borderLeft: "3px solid hsl(var(--secondary))",
                            paddingLeft: "1rem",
                            marginBottom: "1rem"
                        }}>
                            <p style={{ fontSize: "0.85rem", fontStyle: "italic", color: "hsl(var(--ink-brown) / 0.7)" }}>
                                Ví dụ với {example.name}:
                            </p>
                            <p style={{ fontSize: "0.95rem", fontWeight: 600, marginTop: "0.5rem" }}>
                                {example.step2.jtbdTitle}
                            </p>
                            <p style={{ fontSize: "0.9rem", fontStyle: "italic", marginTop: "0.5rem" }}>
                                "{example.step2.situation}"
                            </p>
                        </div>

                        <div style={{
                            backgroundColor: "hsl(var(--secondary) / 0.1)",
                            padding: "0.75rem",
                            borderRadius: "6px",
                            fontSize: "0.85rem",
                            fontWeight: 600,
                            color: "hsl(var(--secondary))"
                        }}>
                            📌 Ở bước này: User <strong>chưa chọn sản phẩm</strong>, nhưng đã <strong>chọn xong cái job</strong>.
                        </div>
                    </div>

                    {/* Arrow */}
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gridColumn: "auto"
                    }} className="hidden-mobile">
                        <ArrowRight size={32} style={{ color: "hsl(var(--accent))" }} />
                    </div>

                    {/* Step 3 */}
                    <div className="card-wood" style={{ padding: "2rem", position: "relative" }}>
                        <div style={{
                            position: "absolute",
                            top: "1rem",
                            right: "1rem",
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                            backgroundColor: "hsl(var(--accent) / 0.1)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: 700,
                            color: "hsl(var(--accent))"
                        }}>
                            3
                        </div>

                        <h2 style={{
                            fontSize: "1.5rem",
                            marginBottom: "1rem",
                            color: "hsl(var(--accent))",
                            paddingRight: "3rem"
                        }}>
                            Hợp lý hoá & cam kết mua
                        </h2>

                        <p style={{
                            fontSize: "0.95rem",
                            fontWeight: 600,
                            marginBottom: "1rem",
                            color: "hsl(var(--ink-brown) / 0.8)"
                        }}>
                            👉 User chọn <strong>giải pháp cụ thể</strong> cho JTBD đó
                        </p>

                        <p style={{ fontSize: "0.9rem", marginBottom: "1rem", lineHeight: "1.6" }}>
                            Logic bắt đầu vào cuộc.
                        </p>

                        <div style={{
                            backgroundColor: "hsl(var(--muted) / 0.5)",
                            padding: "1rem",
                            borderRadius: "8px",
                            marginBottom: "1rem"
                        }}>
                            <p style={{ fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.5rem" }}>
                                Đặc điểm:
                            </p>
                            <ul style={{ fontSize: "0.85rem", margin: 0, paddingLeft: "1.25rem", lineHeight: "1.6" }}>
                                <li>Logic bắt đầu vào cuộc</li>
                                <li>So sánh tính năng, giá, tiện lợi</li>
                                <li>Quyết định được <strong>tự biện minh</strong></li>
                            </ul>
                        </div>

                        <div style={{
                            borderLeft: "3px solid hsl(var(--accent))",
                            paddingLeft: "1rem",
                            marginBottom: "1rem"
                        }}>
                            <p style={{ fontSize: "0.85rem", fontStyle: "italic", color: "hsl(var(--ink-brown) / 0.7)" }}>
                                Ví dụ với {example.name}:
                            </p>
                            <p style={{ fontSize: "0.95rem", fontStyle: "italic", marginTop: "0.5rem" }}>
                                "{example.step3.justification}"
                            </p>
                        </div>

                        <div style={{
                            backgroundColor: "hsl(var(--accent) / 0.1)",
                            padding: "0.75rem",
                            borderRadius: "6px",
                            fontSize: "0.85rem",
                            fontWeight: 600,
                            color: "hsl(var(--accent))"
                        }}>
                            📌 Mua xảy ra ở đây, nhưng <strong>động lực nằm ở bước 1</strong>.
                        </div>
                    </div>
                </div>

                {/* Summary Section */}
                <div className="card-wood" style={{ padding: "2rem", marginBottom: "2rem" }}>
                    <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem", textAlign: "center" }}>
                        Một sơ đồ cực dễ nhớ (rất hợp để dạy)
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
                        <strong>Không ai mua vì sản phẩm.</strong><br />
                        Họ mua vì một Needs được gọi đúng tên,<br />
                        và một JTBD cho phép họ hành động mà không thấy sai.
                    </p>
                </div>
            </div>

            <style jsx>{`
                @media (max-width: 768px) {
                    .hidden-mobile {
                        display: none !important;
                    }
                }
            `}</style>
        </div>
    );
}
