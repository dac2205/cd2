"use client";

import { useState } from "react";
import type { Metadata } from "next";

// Note: metadata export doesn't work in client components, will need to move to layout or create wrapper
// For now, adding via next/head in component

type BrandId = "conan-school" | "inside-school" | "pitstop" | "pho-100" | "vitamind" | "true-juice" | "pushthroo" | "queen" | "aurora-english";

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
    "conan-school": {
        name: "Conan School",
        step1: {
            trigger: "Cảm giác đoán mò về khách hàng",
            quote: "Mình làm content nhưng không biết khách hàng thực sự muốn gì. Cứ đoán mãi mà sợ sai."
        },
        step2: {
            jtbdTitle: "Customer Clarity (Rõ ràng về Khách hàng)",
            situation: "Đang làm marketing nhưng đoán về khách hàng, cần framework rõ ràng để hiểu insight thực."
        },
        step3: {
            outcome: "Rõ ràng về insight khách hàng, tự tin tạo content, thu hút đúng khách",
            justification: "Customer Decode framework chuẩn, không phải tự nghĩ → hiểu đúng, thu hút đúng."
        }
    },
    "inside-school": {
        name: "Inside School",
        step1: {
            trigger: "Cảm giác bị cảm xúc điều khiển",
            quote: "Mình không biết mình đang cảm thấy gì. Cứ drama liên tục mà không biết vấn đề ở đâu."
        },
        step2: {
            jtbdTitle: "Emotion Clarity (Rõ ràng về Cảm xúc)",
            situation: "Bị cảm xúc điều khiển, drama liên tục, cần framework để hiểu và quản lý cảm xúc."
        },
        step3: {
            outcome: "Rõ ràng về cảm xúc, tự tin quản lý, mối quan hệ lành mạnh",
            justification: "Emotion Control Panel framework chuẩn tâm lý học → hiểu đúng, quản lý đúng."
        }
    },
    "pitstop": {
        name: "Pitstop",
        step1: {
            trigger: "Cảm giác ngập trong thông tin",
            quote: "Học nhiều quá nhưng vẫn mơ hồ. Không biết mình nên tập trung vào đâu."
        },
        step2: {
            jtbdTitle: "Strategic Clarity (Rõ ràng Chiến lược)",
            situation: "Ngập thông tin nhưng thiếu clarity, cần framework chuẩn thế giới để rõ ràng về chiến lược."
        },
        step3: {
            outcome: "Rõ ràng về chiến lược, tự tin thực thi, đo được tiến bộ",
            justification: "Framework Harvard/McKinsey/Google, không phải tự nghĩ → rõ ràng, nhanh, đo được."
        }
    },
    "pho-100": {
        name: "Phở 100",
        step1: {
            trigger: "Cảm giác mệt mỏi khi phải nghĩ 'sáng nay ăn gì'",
            quote: "Mỗi sáng đều phải nghĩ ăn gì, ăn ở đâu. Mình muốn có quán quen để không phải nghĩ nữa."
        },
        step2: {
            jtbdTitle: "Reliable Daily Breakfast Spot (Quán quen Ăn sáng Hàng ngày)",
            situation: "Ăn sáng hàng ngày, cần quán quen tin cậy để không phải nghĩ ngợi, tiết kiệm năng lượng cho việc quan trọng hơn."
        },
        step3: {
            outcome: "Có quán quen tin cậy, không phải nghĩ 'sáng nay ăn gì', tiết kiệm năng lượng quyết định",
            justification: "Chất lượng ổn định 100%, vị quen thuộc, không bao giờ thất vọng → an tâm ăn hàng ngày."
        }
    },
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
    },
    "queen": {
        name: "Queen",
        step1: {
            trigger: "Cảm giác stress khi chọn quà",
            quote: "Lướt Shopee 2 tiếng mà vẫn không chốt được món nào vì quá nhiều lựa chọn loạn xạ."
        },
        step2: {
            jtbdTitle: "Cần chọn quà nhanh trong 5 phút",
            situation: "Sắp đến 20/10, sếp giao mua quà cho đối tác nữ VIP, ngân sách cao nhưng deadline gấp, tôi không có thời gian đi tìm."
        },
        step3: {
            outcome: "Chọn xong quà nhanh gọn, quà được gói đẹp sang trọng, người nhận 'Wow' ngay khi mở hộp",
            justification: "Hàng tuyển chọn kỹ lưỡng, gói đẹp, có thiệp viết tay → tiết kiệm thời gian mà vẫn tinh tế."
        }
    },
    "aurora-english": {
        name: "Aurora English",
        step1: {
            trigger: "Cảm giác mất vị thế vì tiếng Anh kém",
            quote: "Ngồi trong cuộc họp với đối tác nước ngoài, tôi muốn phát biểu ý kiến nhưng sợ nói sai ngữ pháp nên đành im lặng."
        },
        step2: {
            jtbdTitle: "Cần lấy lại căn bản để giao tiếp tự nhiên",
            situation: "Đã học tiếng Anh 12 năm phổ thông + Đại học nhưng vẫn bị 'điếc' và 'câm' tiếng Anh, cần xây dựng lại nền tảng vững chắc."
        },
        step3: {
            outcome: "Có thể mở miệng nói tiếng Anh mà không cần dịch trong đầu, tự tin thuyết trình",
            justification: "Phương pháp hiểu bản chất ngôn ngữ, không học vẹt → tìm lại niềm vui học tập."
        }
    }
};

export default function PurchaseJourneyPage() {
    const [selectedBrand, setSelectedBrand] = useState<BrandId | null>(null);

    const handleBrandToggle = (brandId: BrandId) => {
        setSelectedBrand(prev => prev === brandId ? null : brandId);
    };

    return (
        <div className="container animate-slide-in">
            <div style={{ padding: "4rem 0", maxWidth: "1400px", margin: "0 auto" }}>
                {/* Header */}
                <div style={{ textAlign: "center", marginBottom: "3rem" }}>
                    <h1 style={{ marginBottom: "1rem", fontSize: "2.5rem" }}>
                        Purchase Journey
                    </h1>
                    <p className="text-subtext" style={{ fontSize: "1.25rem", marginBottom: "2rem" }}>
                        Needs → JTBD → Decision
                    </p>
                    <p style={{ fontSize: "1rem", lineHeight: "1.6", maxWidth: "700px", margin: "0 auto" }}>
                        Hiểu rõ 3 bước này giúp bạn <strong>decode chính xác</strong> tại sao khách hàng quyết định mua, và tại sao họ <strong>không</strong> mua.
                    </p>
                </div>

                {/* Brand Selector */}
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    marginBottom: "3rem",
                    gap: "1rem"
                }}>
                    {/* Row 1: New Brands (Conan, Inside, Pitstop, Phở 100) */}
                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        flexWrap: "wrap",
                        gap: "1rem"
                    }}>
                        {(["conan-school", "inside-school", "pitstop", "pho-100"] as BrandId[]).map((brandId) => (
                            <button
                                key={brandId}
                                onClick={() => handleBrandToggle(brandId)}
                                className="brand-selector-button"
                                data-selected={selectedBrand === brandId}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.5rem",
                                    padding: "0.75rem 1.25rem",
                                    borderRadius: "8px",
                                    border: "2px solid hsl(var(--border))",
                                    backgroundColor: selectedBrand === brandId
                                        ? "hsl(var(--primary) / 0.1)"
                                        : "hsl(var(--background))",
                                    cursor: "pointer",
                                    transition: "all 0.2s ease",
                                    fontWeight: selectedBrand === brandId ? 600 : 400,
                                    color: selectedBrand === brandId
                                        ? "hsl(var(--primary))"
                                        : "hsl(var(--foreground))",
                                    fontSize: "1rem"
                                }}
                            >
                                {brandExamples[brandId].name}
                            </button>
                        ))}
                    </div>

                    {/* Row 2: Existing Brands */}
                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        flexWrap: "wrap",
                        gap: "1rem"
                    }}>
                        {(["vitamind", "true-juice", "pushthroo", "queen", "aurora-english"] as BrandId[]).map((brandId) => (
                            <button
                                key={brandId}
                                onClick={() => handleBrandToggle(brandId)}
                                className="brand-selector-button"
                                data-selected={selectedBrand === brandId}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.5rem",
                                    padding: "0.75rem 1.25rem",
                                    borderRadius: "8px",
                                    border: "2px solid hsl(var(--border))",
                                    backgroundColor: selectedBrand === brandId
                                        ? "hsl(var(--primary) / 0.1)"
                                        : "hsl(var(--background))",
                                    cursor: "pointer",
                                    transition: "all 0.2s ease",
                                    fontWeight: selectedBrand === brandId ? 600 : 400,
                                    color: selectedBrand === brandId
                                        ? "hsl(var(--primary))"
                                        : "hsl(var(--foreground))",
                                    fontSize: "1rem"
                                }}
                            >
                                {brandExamples[brandId].name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Brand Example Cards - Conditional */}
                {selectedBrand && (
                    <div style={{
                        marginBottom: "3rem",
                        animation: "fadeIn 0.3s ease-in"
                    }}>
                        <div style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr 1fr",
                            gap: "1.5rem"
                        }}>
                            {/* Example Step 1 */}
                            <ExampleCard
                                stepNumber={1}
                                title={brandExamples[selectedBrand].step1.trigger}
                                content={`"${brandExamples[selectedBrand].step1.quote}"`}
                                color="primary"
                            />

                            {/* Example Step 2 */}
                            <ExampleCard
                                stepNumber={2}
                                title={brandExamples[selectedBrand].step2.jtbdTitle}
                                content={`"${brandExamples[selectedBrand].step2.situation}"`}
                                color="secondary"
                            />

                            {/* Example Step 3 */}
                            <ExampleCard
                                stepNumber={3}
                                title="Kết quả & Biện minh"
                                content={
                                    <>
                                        <div style={{ marginBottom: "0.75rem" }}>
                                            <strong>Kết quả:</strong> {brandExamples[selectedBrand].step3.outcome}
                                        </div>
                                        <div>
                                            <strong>Biện minh:</strong> "{brandExamples[selectedBrand].step3.justification}"
                                        </div>
                                    </>
                                }
                                color="accent"
                            />
                        </div>
                    </div>
                )}

                {/* 3-Step Cards - Theory Only */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                    gap: "1.5rem",
                    marginBottom: "3rem"
                }}>
                    {/* Step 1 */}
                    <StepCard
                        stepNumber={1}
                        title="Needs được kích hoạt"
                        subtitle="Có một cảm giác 'không ổn' xuất hiện"
                        characteristics={[
                            "Xảy ra trong vô thức",
                            "Thường là cảm xúc âm (thiếu, sợ, mệt, mất kiểm soát)",
                            "Người dùng không nói rõ được"
                        ]}
                        insight="Nếu bước này không xảy ra → không có mua."
                        color="primary"
                    />

                    {/* Step 2 */}
                    <StepCard
                        stepNumber={2}
                        title="Đóng khung thành JTBD"
                        subtitle="Người dùng gán cho cảm xúc đó một 'việc cần làm'"
                        characteristics={[
                            "Bắt đầu có ngôn ngữ",
                            "Gắn với bối cảnh + tiến trình + kết quả mong muốn",
                            "Cho phép so sánh các lựa chọn"
                        ]}
                        insight="User chưa chọn sản phẩm hay dịch vụ cụ thể nào, nhưng đã chọn xong cái job."
                        color="secondary"
                    />

                    {/* Step 3 */}
                    <StepCard
                        stepNumber={3}
                        title="Hợp lý hoá & cam kết mua"
                        subtitle="User chọn giải pháp cụ thể cho JTBD đó"
                        characteristics={[
                            "Logic bắt đầu vào cuộc",
                            "So sánh tính năng, giá, tiện lợi",
                            "Quyết định được tự biện minh"
                        ]}
                        insight="Mua xảy ra ở đây, nhưng động lực nằm ở bước 1."
                        color="accent"
                    />
                </div>


                {/* Summary Section - 3 Cards */}
                <div style={{ marginBottom: "2rem" }}>
                    <h3 style={{ fontSize: "1.5rem", marginBottom: "1.5rem", textAlign: "center" }}>
                        Sơ đồ tổng quan
                    </h3>
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                        gap: "1.5rem"
                    }}>
                        <div className="card-wood" style={{
                            padding: "1.5rem",
                            textAlign: "center",
                            backgroundColor: "hsl(var(--primary) / 0.05)",
                            borderTop: "3px solid hsl(var(--primary))"
                        }}>
                            <div style={{
                                fontSize: "2rem",
                                marginBottom: "0.5rem"
                            }}>1</div>
                            <div style={{
                                fontSize: "1.1rem",
                                fontWeight: 600,
                                color: "hsl(var(--primary))"
                            }}>
                                Needs rung
                            </div>
                        </div>

                        <div className="card-wood" style={{
                            padding: "1.5rem",
                            textAlign: "center",
                            backgroundColor: "hsl(var(--secondary) / 0.05)",
                            borderTop: "3px solid hsl(var(--secondary))"
                        }}>
                            <div style={{
                                fontSize: "2rem",
                                marginBottom: "0.5rem"
                            }}>2</div>
                            <div style={{
                                fontSize: "1.1rem",
                                fontWeight: 600,
                                color: "hsl(var(--secondary))"
                            }}>
                                JTBD được gọi tên
                            </div>
                        </div>

                        <div className="card-wood" style={{
                            padding: "1.5rem",
                            textAlign: "center",
                            backgroundColor: "hsl(var(--accent) / 0.05)",
                            borderTop: "3px solid hsl(var(--accent))"
                        }}>
                            <div style={{
                                fontSize: "2rem",
                                marginBottom: "0.5rem"
                            }}>3</div>
                            <div style={{
                                fontSize: "1.1rem",
                                fontWeight: 600,
                                color: "hsl(var(--accent))"
                            }}>
                                Giải pháp được chọn
                            </div>
                        </div>
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

            <style jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .brand-selector-button:not([data-selected="true"]):hover {
                    border-color: hsl(var(--primary) / 0.5) !important;
                }
            `}</style>
        </div>
    );
}

interface StepCardProps {
    stepNumber: number;
    title: string;
    subtitle: string;
    characteristics: string[];
    insight: string;
    color: "primary" | "secondary" | "accent";
}

function StepCard({
    stepNumber,
    title,
    subtitle,
    characteristics,
    insight,
    color
}: StepCardProps) {
    return (
        <div className="card-wood" style={{
            padding: "1.5rem",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            gap: "1rem"
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
                marginBottom: "0.5rem",
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
                marginBottom: "0.5rem",
                color: "hsl(var(--ink-brown) / 0.8)",
                lineHeight: "1.4"
            }}>
                {subtitle}
            </p>

            {/* Characteristics */}
            <ul style={{
                fontSize: "0.85rem",
                margin: 0,
                paddingLeft: "1.25rem",
                lineHeight: "1.6",
                color: "hsl(var(--ink-brown) / 0.7)",
                flex: 1
            }}>
                {characteristics.map((char, idx) => (
                    <li key={idx}>{char}</li>
                ))}
            </ul>

            {/* Insight Badge */}
            <div style={{
                backgroundColor: `hsl(var(--${color}) / 0.1)`,
                padding: "0.5rem 0.75rem",
                borderRadius: "6px",
                fontSize: "0.75rem",
                fontWeight: 600,
                color: `hsl(var(--${color}))`,
                marginTop: "auto"
            }}>
                📌 {insight}
            </div>
        </div>
    );
}

interface ExampleCardProps {
    stepNumber: number;
    title: string;
    content: React.ReactNode;
    color: "primary" | "secondary" | "accent";
}

function ExampleCard({
    stepNumber,
    title,
    content,
    color
}: ExampleCardProps) {
    return (
        <div className="card-wood" style={{
            padding: "1.5rem",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            borderLeft: `4px solid hsl(var(--${color}))`,
            backgroundColor: `hsl(var(--${color}) / 0.05)`
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
            <h4 style={{
                fontSize: "1.1rem",
                marginBottom: "0.5rem",
                color: `hsl(var(--${color}))`,
                paddingRight: "3rem",
                fontWeight: 600,
                lineHeight: "1.3"
            }}>
                {title}
            </h4>

            {/* Content */}
            <div style={{
                fontSize: "0.9rem",
                lineHeight: "1.6",
                color: "hsl(var(--ink-brown) / 0.8)",
                fontStyle: "italic",
                flex: 1
            }}>
                {content}
            </div>
        </div>
    );
}
