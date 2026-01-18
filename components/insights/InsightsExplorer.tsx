"use client";

import React, { useState } from "react";
import { Insight } from "@/lib/types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Badge, Check, GitCompare, X } from "lucide-react";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/Popover";
import { HelpCircle } from "lucide-react";

interface InsightsExplorerProps {
    insights: Insight[];
}

const definitions: Record<string, { title: string; bullets: string[] }> = {
    tension: {
        title: "Tension (Điểm Căng thẳng)",
        bullets: [
            "Khoảng cách mâu thuẫn giữa 'Current Self' (họ đang là ai) và 'Ideal Self' (họ muốn là ai).",
            "Tạo ra năng lượng tâm lý thúc đẩy hành động (mua hàng/thay đổi).",
            "Nếu không có Tension, khách hàng sẽ hài lòng với hiện tại và không mua."
        ]
    },
    belief: {
        title: "Belief (Niềm tin Cốt lõi)",
        bullets: [
            "Niềm tin sâu sắc (thường là sai lầm hoặc giới hạn) mà khách hàng đang nắm giữ.",
            "Là nguyên nhân gốc rễ tạo ra Tension.",
            "Muốn thay đổi hành vi, phải thay đổi Belief này trước."
        ]
    },
    core: {
        title: "Core Insight (Sự thật Ngầm hiểu)",
        bullets: [
            "Một sự thật ẩn sâu (Hidden Truth) giải thích 'Tại sao' (Why) khách hàng hành động.",
            "Không phải data hay quan sát bề mặt, mà là động cơ tâm lý bên dưới.",
            "Khi nghe xong, khách hàng phải thốt lên: 'Sao bạn hiểu tôi thế?'."
        ]
    },
    hook: {
        title: "Hooks (Điểm Gây chú ý)",
        bullets: [
            "3 câu chào mời ngắn gọn, hấp dẫn để 'móc' sự chú ý.",
            "Thường đánh trúng vào nỗi đau hoặc khao khát lớn nhất.",
            "Phải đủ mạnh để khách hàng dừng lướt (Stop Scrolling)."
        ]
    },
    angle: {
        title: "Unique Angle (Góc nhìn Độc đáo)",
        bullets: [
            "Góc tiếp cận vấn đề khác biệt so với thị trường.",
            "Giúp thương hiệu tránh việc cạnh tranh trực diện với đối thủ lớn.",
            "Mang lại cảm giác mới mẻ (Freshness) cho giải pháp cũ."
        ]
    },
    reframe: {
        title: "Reframe (Tái định nghĩa)",
        bullets: [
            "Thay đổi cách khách hàng nhìn nhận vấn đề của chính họ.",
            "Chuyển từ tư duy lối mòn sang lăng kính mới có lợi cho giải pháp của bạn.",
            "Ví dụ: Từ 'Chi phí' (Cost) sang 'Đầu tư' (Investment)."
        ]
    },
    promise: {
        title: "Promise (Lời hứa Thương hiệu)",
        bullets: [
            "Kết quả chuyển hóa (Transformation) cụ thể mà bạn cam kết mang lại.",
            "Phải giải quyết trực tiếp Tension đã nêu ở trên.",
            "Cần rõ ràng, đánh vào cảm xúc hoặc lợi ích lý tính."
        ]
    },
    rtb: {
        title: "RTB (Reason to Believe)",
        bullets: [
            "Bằng chứng hoặc lý do logic để khách hàng tin vào Lời hứa (Promise).",
            "Có thể là chứng chỉ, công nghệ, người sáng lập, hoặc quy trình độc quyền.",
            "Trả lời câu hỏi: 'Tại sao tôi nên tin bạn?'."
        ]
    },
    mechanism: {
        title: "Mechanism (Cơ chế hoạt động)",
        bullets: [
            "Cách thức cụ thể mà giải pháp vận hành để tạo ra kết quả.",
            "Làm cho giải pháp trở nên hữu hình và đáng tin cậy hơn.",
            "Ví dụ: Công thức X, Quy trình 3 bước, Công nghệ Y..."
        ]
    }
};

export default function InsightsExplorer({ insights }: InsightsExplorerProps) {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const toggleSelection = (id: string) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(selectedIds.filter((sid) => sid !== id));
        } else {
            if (selectedIds.length < 2) {
                setSelectedIds([...selectedIds, id]);
            }
        }
    };

    const isComparing = selectedIds.length === 2;
    const compareData = isComparing
        ? insights.filter(i => selectedIds.includes(i.id))
        : [];

    const fields: { key: keyof Insight; label: string; color: string }[] = [
        { key: "tension", label: "Tension", color: "hsl(var(--ink-brown))" },
        { key: "belief", label: "Belief", color: "hsl(var(--secondary))" },
        { key: "core", label: "Core Insight", color: "hsl(var(--primary))" },
        { key: "hooks", label: "Hooks", color: "hsl(var(--accent))" },
        { key: "angle", label: "Unique Angle", color: "hsl(var(--secondary))" },
        { key: "reframe", label: "Reframe", color: "hsl(var(--ink-brown))" },
        { key: "promise", label: "Promise", color: "hsl(var(--primary))" },
        { key: "rtb", label: "RTB", color: "hsl(var(--ink-brown))" },
        { key: "mechanism", label: "Mechanism", color: "hsl(var(--ink-brown))" },
    ];

    const renderLabelWithPopover = (fieldKey: string, label: string, color: string) => {
        const def = definitions[fieldKey];
        if (!def) return <span style={{ color }}>{label}</span>;

        return (
            <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", cursor: "pointer" }}>
                <Popover>
                    <PopoverTrigger style={{ display: "flex", alignItems: "center", gap: "0.25rem", color: color, fontWeight: 700 }}>
                        {label} <HelpCircle size={14} />
                    </PopoverTrigger>
                    <PopoverContent style={{ width: "300px" }}>
                        <div style={{ padding: "0.5rem" }}>
                            <h4 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "0.5rem", color: "hsl(var(--primary))" }}>{def.title}</h4>
                            <ul style={{ paddingLeft: "1rem", margin: 0 }}>
                                {def.bullets.map((bullet, idx) => (
                                    <li key={idx} style={{ fontSize: "0.875rem", marginBottom: "0.25rem", color: "hsl(var(--ink-brown))" }}>{bullet}</li>
                                ))}
                            </ul>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
        );
    };

    if (isComparing) {
        return (
            <div className="animate-slide-in">
                <div style={{ marginBottom: "2rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <h2>So sánh 2 Insight</h2>
                    <button
                        onClick={() => setSelectedIds([])}
                        style={{
                            display: "flex", alignItems: "center", gap: "0.5rem",
                            padding: "0.5rem 1rem",
                            backgroundColor: "hsl(var(--background))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px",
                            cursor: "pointer"
                        }}
                    >
                        <X size={16} /> Thoát so sánh
                    </button>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "200px 1fr 1fr", gap: "1rem" }}>
                    <div style={{ fontWeight: "bold" }}></div>
                    {compareData.map(insight => (
                        <div key={insight.id} style={{ fontWeight: "bold", textAlign: "center", fontSize: "1.25rem", color: "hsl(var(--primary))" }}>
                            {insight.title}
                        </div>
                    ))}

                    {fields.map(field => (
                        <React.Fragment key={field.key}>
                            <div style={{
                                fontWeight: 600,
                                color: field.color,
                                borderBottom: "1px solid hsl(var(--border))",
                                padding: "1rem 0"
                            }}>
                                {renderLabelWithPopover(field.key, field.label, field.color)}
                            </div>
                            {compareData.map(insight => (
                                <div key={`${insight.id}-${field.key}`} style={{
                                    borderBottom: "1px solid hsl(var(--border))",
                                    padding: "1rem",
                                    backgroundColor: "hsl(var(--paper-white))"
                                }}>
                                    {insight[field.key]}
                                </div>
                            ))}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="animate-slide-in">
            <div style={{ marginBottom: "2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <p style={{ color: "hsl(var(--ink-brown) / 0.7)" }}>
                    Phân tích Insight Cốt lõi. Chọn tối đa 2 mục để so sánh.
                </p>
                {selectedIds.length > 0 && (
                    <span style={{
                        fontSize: "0.875rem",
                        backgroundColor: "hsl(var(--secondary))",
                        color: "white",
                        padding: "0.25rem 0.75rem",
                        borderRadius: "999px"
                    }}>
                        {selectedIds.length} Đã chọn
                    </span>
                )}
            </div>

            <div style={{ display: "grid", gap: "2rem" }}>
                {insights.map((insight) => {
                    const isSelected = selectedIds.includes(insight.id);
                    return (
                        <div key={insight.id} className="card-wood" style={{ position: "relative" }}>
                            <div
                                style={{
                                    position: "absolute",
                                    top: "1.5rem",
                                    right: "1.5rem",
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.5rem",
                                    zIndex: 10
                                }}
                                onClick={() => toggleSelection(insight.id)}
                            >
                                <div style={{
                                    width: "24px",
                                    height: "24px",
                                    borderRadius: "4px",
                                    border: `2px solid ${isSelected ? "hsl(var(--primary))" : "hsl(var(--border))"}`,
                                    backgroundColor: isSelected ? "hsl(var(--primary))" : "transparent",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    transition: "all 0.2s"
                                }}>
                                    {isSelected && <Check size={16} color="white" />}
                                </div>
                                <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "hsl(var(--ink-brown) / 0.7)" }}>So sánh</span>
                            </div>

                            <div style={{ padding: "2rem" }}>
                                <h2 style={{ fontSize: "1.75rem", marginBottom: "2rem", paddingRight: "5rem" }}>{insight.title}</h2>

                                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>

                                    {/* Tension */}
                                    <div style={{ padding: "1.5rem", backgroundColor: "hsl(var(--paper-white))", borderRadius: "12px", border: "1px solid hsl(var(--border))" }}>
                                        <h4 style={{ color: "hsl(var(--ink-brown) / 0.6)", fontSize: "0.875rem", textTransform: "uppercase", marginBottom: "0.5rem" }}>
                                            {renderLabelWithPopover("tension", "Tension", "hsl(var(--ink-brown) / 0.6)")}
                                        </h4>
                                        <p style={{ fontSize: "1.125rem", fontStyle: "italic", lineHeight: "1.6" }}>"{insight.tension}"</p>
                                    </div>

                                    {/* Core Insight */}
                                    <div style={{ padding: "1.5rem", backgroundColor: "hsl(var(--paper-white))", borderRadius: "12px", border: "1px solid hsl(var(--primary))", boxShadow: "0 4px 12px -2px rgba(0,0,0,0.05)" }}>
                                        <h4 style={{ color: "hsl(var(--primary))", fontSize: "0.875rem", textTransform: "uppercase", fontWeight: 700, marginBottom: "0.5rem" }}>
                                            {renderLabelWithPopover("core", "Core Insight", "hsl(var(--primary))")}
                                        </h4>
                                        <p style={{ fontSize: "1.25rem", fontWeight: 600, lineHeight: "1.5" }}>{insight.core}</p>
                                    </div>

                                    {/* Hooks - Spanning full width if possible or just normal card */}
                                    <div style={{ padding: "1.5rem", backgroundColor: "hsl(var(--background))", borderRadius: "12px", border: "1px solid hsl(var(--accent))", gridColumn: "1 / -1" }}>
                                        <h4 style={{ color: "hsl(var(--accent))", fontSize: "0.875rem", textTransform: "uppercase", fontWeight: 700, marginBottom: "0.5rem" }}>
                                            {renderLabelWithPopover("hook", "Hooks", "hsl(var(--accent))")}
                                        </h4>
                                        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "0.75rem" }}>
                                            {insight.hooks.map((h, idx) => (
                                                <li key={idx} style={{
                                                    fontSize: idx === 0 ? "1.5rem" : "1.125rem",
                                                    fontFamily: idx === 0 ? "var(--font-heading)" : "inherit",
                                                    color: idx === 0 ? "inherit" : "hsl(var(--ink-brown) / 0.8)",
                                                    padding: "0.5rem 0",
                                                    borderBottom: idx < insight.hooks.length - 1 ? "1px dashed hsl(var(--border))" : "none"
                                                }}>
                                                    {h}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Other Fields */}
                                    {fields.slice(3).map(field => (
                                        <div key={field.key} style={{ padding: "1.5rem", backgroundColor: "hsl(var(--paper-white))", borderRadius: "12px", border: "1px solid hsl(var(--border))" }}>
                                            <div style={{ marginBottom: "0.5rem" }}>
                                                <h4 style={{ color: "hsl(var(--ink-brown) / 0.7)", fontSize: "0.875rem", textTransform: "uppercase", fontWeight: 600 }}>
                                                    {renderLabelWithPopover(field.key, field.label, "hsl(var(--ink-brown) / 0.7)")}
                                                </h4>
                                            </div>
                                            <p style={{ fontSize: "1rem", lineHeight: "1.6" }}>{insight[field.key as keyof Insight]}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
