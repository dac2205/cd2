"use client";

import React from "react";
import { BrandEssence } from "@/lib/types";
import { Sparkles, Target, TrendingUp, Shield, Cog, Award, Info } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/Popover";

interface BrandEssenceDisplayProps {
    essence: BrandEssence;
}

type EssenceExplanation = {
    concept: string;
    description: string;
    goodExample: string;
    badExample: string;
}

const ESSENCE_EXPLANATIONS: Record<string, EssenceExplanation> = {
    coreBelief: {
        concept: "Core Belief (Niềm tin cốt lõi)",
        description: "Triết lý nền tảng của brand - quan điểm về thế giới mà brand tin tưởng. Phải đủ mạnh để có người đồng ý và có người phản đối (polarizing).",
        goodExample: "✅ \"Chữa lành không cần phức tạp, chỉ cần đúng lúc và đủ an toàn\" (VitaMind) - Rõ ràng, có quan điểm, phản đối sự phức tạp hóa.",
        badExample: "❌ \"Chúng tôi bán sản phẩm wellness\" - Không có quan điểm, không có niềm tin gì cả, chỉ mô tả sản phẩm."
    },
    uniquePromise: {
        concept: "Unique Promise (Lời hứa độc nhất)",
        description: "Lợi ích lớn nhất và duy nhất mà khách hàng nhận được - điều làm brand khác biệt hoàn toàn so với đối thủ. Không phải danh sách tính năng.",
        goodExample: "✅ \"Quà trong 5 phút, người nhận rơi nước mắt\" (Queen) - Cụ thể, đo lường được (5 phút), kết quả cảm xúc rõ ràng (rơi nước mắt).",
        badExample: "❌ \"Chúng tôi có nhiều sản phẩm để lựa chọn\" - Không unique, không có promise gì cả, mọi shop đều nói thế."
    },
    transformation: {
        concept: "Transformation (Câu chuyện chuyển hóa)",
        description: "Hành trình từ trạng thái cũ (Before) sang trạng thái mới (After). Sử dụng ngôn ngữ cảm xúc và hình ảnh rõ ràng, không chung chung.",
        goodExample: "✅ \"Từ Panic → Precision\" (PushThroo) - Ngắn gọn, đối lập rõ ràng, dễ hình dung, có cảm xúc mạnh.",
        badExample: "❌ \"Bạn sẽ cảm thấy tốt hơn\" - Mơ hồ, không có before/after rõ ràng, không có hình ảnh cụ thể."
    },
    enemy: {
        concept: "Enemy (Kẻ thù/Rào cản)",
        description: "Điều mà brand đứng ra chống lại - có thể là hành vi, văn hóa, hoặc thất bại của thị trường. Tạo sự đồng cảm và định vị rõ ràng.",
        goodExample: "✅ \"Toxic Positivity\" (VitaMind) - Cụ thể, dễ hình dung, nhiều người đồng cảm, tạo sự phân biệt rõ ràng.",
        badExample: "❌ \"Sản phẩm kém chất lượng\" - Quá chung chung, ai cũng nói thế, không tạo được sự khác biệt."
    },
    signatureMethod: {
        concept: "Signature Method (Phương pháp đặc trưng)",
        description: "Quy trình, framework, hoặc cơ chế độc quyền để thực hiện lời hứa. Phải có tên riêng và cấu trúc rõ ràng, không chỉ mô tả chung chung.",
        goodExample: "✅ \"5 Moments Framework\" (VitaMind) - Có tên riêng, có số liệu (5), có cấu trúc (Moments), dễ nhớ và truyền đạt.",
        badExample: "❌ \"Quy trình đặc biệt của chúng tôi\" - Không có tên, không có cấu trúc, ai cũng có thể nói thế."
    },
    socialProof: {
        concept: "Social Proof (Điểm neo chứng thực)",
        description: "Nguồn gốc uy tín - tại sao khách hàng nên tin bạn. Không chỉ là testimonial, mà là nền tảng authority (khoa học, chuyên gia, con số, thành tích).",
        goodExample: "✅ \"Founded by Forbes 30 Under 30\" (PushThroo) - Cụ thể, có thể verify, tạo uy tín ngay lập tức.",
        badExample: "❌ \"Nhiều khách hàng yêu thích chúng tôi\" - Mơ hồ, không verify được, ai cũng nói thế."
    }
};

const BRAND_PLATFORM_EXPLANATION = {
    title: "Brand Platform là gì?",
    description: "Bộ khung nền tảng định hình toàn bộ thương hiệu: từ niềm tin cốt lõi, cách nhìn thế giới, vấn đề thương hiệu chống lại, cho đến lời hứa, phương pháp, và kết quả mà người học/người dùng sẽ đạt được.",
    purpose: "Hệ điều hành tư duy của thương hiệu - thứ đứng phía sau mọi quyết định về nội dung, giảng dạy, trải nghiệm, và truyền thông.",
    components: [
        "Core Belief - Niềm tin cốt lõi",
        "Unique Promise - Lời hứa độc nhất",
        "Transformation - Câu chuyện chuyển hóa",
        "Enemy - Kẻ thù/Rào cản",
        "Signature Method - Phương pháp đặc trưng",
        "Social Proof - Điểm neo chứng thực"
    ]
};

const BrandPlatformPopover = () => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <button
                    style={{
                        background: "none",
                        border: "none",
                        padding: "0.25rem",
                        cursor: "pointer",
                        color: "hsl(var(--ink-brown) / 0.25)",
                        transition: "all 0.2s ease",
                        display: "inline-flex",
                        alignItems: "center",
                        marginLeft: "0.5rem"
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = "hsl(var(--ink-brown) / 0.5)"}
                    onMouseLeave={(e) => e.currentTarget.style.color = "hsl(var(--ink-brown) / 0.25)"}
                    aria-label="Learn more about Brand Platform"
                >
                    <Info size={18} />
                </button>
            </PopoverTrigger>
            <PopoverContent style={{ width: "420px", maxWidth: "90vw", zIndex: 9999 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem", padding: "0.5rem" }}>
                    <div>
                        <h4 style={{
                            fontSize: "0.9375rem",
                            fontWeight: "700",
                            marginBottom: "0.5rem",
                            color: "hsl(var(--primary))"
                        }}>
                            {BRAND_PLATFORM_EXPLANATION.title}
                        </h4>
                        <p style={{
                            fontSize: "0.875rem",
                            lineHeight: "1.6",
                            color: "hsl(var(--ink-brown))",
                            marginBottom: "0.75rem"
                        }}>
                            {BRAND_PLATFORM_EXPLANATION.description}
                        </p>
                        <p style={{
                            fontSize: "0.8125rem",
                            lineHeight: "1.5",
                            color: "hsl(var(--ink-brown) / 0.8)",
                            fontStyle: "italic",
                            padding: "0.75rem",
                            borderRadius: "6px",
                            backgroundColor: "hsl(var(--ink-brown) / 0.03)",
                            borderLeft: "3px solid hsl(var(--primary))"
                        }}>
                            {BRAND_PLATFORM_EXPLANATION.purpose}
                        </p>
                    </div>

                    <div>
                        <h5 style={{
                            fontSize: "0.8125rem",
                            fontWeight: "600",
                            marginBottom: "0.5rem",
                            color: "hsl(var(--ink-brown) / 0.7)",
                            textTransform: "uppercase",
                            letterSpacing: "0.05em"
                        }}>
                            6 Thành phần cốt lõi:
                        </h5>
                        <ul style={{
                            fontSize: "0.8125rem",
                            lineHeight: "1.6",
                            color: "hsl(var(--ink-brown))",
                            paddingLeft: "1.25rem",
                            margin: 0
                        }}>
                            {BRAND_PLATFORM_EXPLANATION.components.map((component, index) => (
                                <li key={index} style={{ marginBottom: "0.25rem" }}>
                                    {component}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
};

const EssencePopover = ({ essenceKey }: { essenceKey: string }) => {
    const explanation = ESSENCE_EXPLANATIONS[essenceKey];
    if (!explanation) return null;

    return (
        <Popover>
            <PopoverTrigger asChild>
                <button
                    style={{
                        background: "none",
                        border: "none",
                        padding: "0.25rem",
                        cursor: "pointer",
                        color: "hsl(var(--ink-brown) / 0.25)",
                        transition: "all 0.2s ease",
                        display: "inline-flex",
                        alignItems: "center",
                        marginLeft: "0.25rem"
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = "hsl(var(--ink-brown) / 0.5)"}
                    onMouseLeave={(e) => e.currentTarget.style.color = "hsl(var(--ink-brown) / 0.25)"}
                    aria-label={`Learn more about ${explanation.concept}`}
                >
                    <Info size={16} />
                </button>
            </PopoverTrigger>
            <PopoverContent style={{ width: "400px", maxWidth: "90vw", zIndex: 9999 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem", padding: "0.5rem" }}>
                    <div>
                        <h4 style={{
                            fontSize: "0.875rem",
                            fontWeight: "700",
                            marginBottom: "0.5rem",
                            color: "hsl(var(--primary))"
                        }}>
                            {explanation.concept}
                        </h4>
                        <p style={{
                            fontSize: "0.875rem",
                            lineHeight: "1.5",
                            color: "hsl(var(--ink-brown))"
                        }}>
                            {explanation.description}
                        </p>
                    </div>

                    <div style={{
                        padding: "0.75rem",
                        borderRadius: "6px",
                        backgroundColor: "hsl(142, 76%, 96%)",
                        borderLeft: "3px solid hsl(142, 76%, 36%)"
                    }}>
                        <p style={{
                            fontSize: "0.8125rem",
                            lineHeight: "1.5",
                            color: "hsl(var(--ink-brown))",
                            margin: 0
                        }}>
                            {explanation.goodExample}
                        </p>
                    </div>

                    <div style={{
                        padding: "0.75rem",
                        borderRadius: "6px",
                        backgroundColor: "hsl(0, 84%, 97%)",
                        borderLeft: "3px solid hsl(0, 84%, 60%)"
                    }}>
                        <p style={{
                            fontSize: "0.8125rem",
                            lineHeight: "1.5",
                            color: "hsl(var(--ink-brown))",
                            margin: 0
                        }}>
                            {explanation.badExample}
                        </p>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
};

export default function BrandEssenceDisplay({ essence }: BrandEssenceDisplayProps) {
    const essenceItems = [
        {
            key: "coreBelief",
            label: "Core Belief",
            value: essence.coreBelief,
            icon: <Sparkles size={20} />,
            color: "hsl(var(--primary))"
        },
        {
            key: "uniquePromise",
            label: "Unique Promise",
            value: essence.uniquePromise,
            icon: <Target size={20} />,
            color: "hsl(25, 95%, 53%)" // Orange
        },
        {
            key: "transformation",
            label: "Transformation",
            value: essence.transformation,
            icon: <TrendingUp size={20} />,
            color: "hsl(142, 76%, 36%)" // Green
        },
        {
            key: "enemy",
            label: "Enemy",
            value: essence.enemy,
            icon: <Shield size={20} />,
            color: "hsl(0, 84%, 60%)" // Red
        },
        {
            key: "signatureMethod",
            label: "Signature Method",
            value: essence.signatureMethod,
            icon: <Cog size={20} />,
            color: "hsl(217, 91%, 60%)" // Blue
        },
        {
            key: "socialProof",
            label: "Social Proof",
            value: essence.socialProof,
            icon: <Award size={20} />,
            color: "hsl(280, 67%, 55%)" // Purple
        }
    ];

    return (
        <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.5rem",
            marginTop: "3rem"
        }}>
            {essenceItems.map((item) => (
                <div
                    key={item.key}
                    style={{
                        padding: "1.5rem",
                        borderRadius: "12px",
                        border: "1px solid hsl(var(--ink-brown) / 0.1)",
                        backgroundColor: "hsl(var(--paper))",
                        transition: "all 0.3s ease",
                    }}
                    className="hover-warm-glow"
                >
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        marginBottom: "0.75rem"
                    }}>
                        <div style={{ color: item.color }}>
                            {item.icon}
                        </div>
                        <h3 style={{
                            fontSize: "0.875rem",
                            fontWeight: "600",
                            textTransform: "uppercase",
                            letterSpacing: "0.05em",
                            color: "hsl(var(--ink-brown) / 0.6)",
                            flex: 1
                        }}>
                            {item.label}
                        </h3>
                        <EssencePopover essenceKey={item.key} />
                    </div>
                    <p style={{
                        fontSize: "1rem",
                        lineHeight: "1.6",
                        color: "hsl(var(--ink-brown))"
                    }}>
                        {item.value}
                    </p>
                </div>
            ))}
        </div>
    );
}

export { BrandPlatformPopover };
