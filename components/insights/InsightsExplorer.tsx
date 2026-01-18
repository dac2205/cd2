"use client";

import React, { useState } from "react";
import { Insight } from "@/lib/types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Badge, Check, GitCompare, X, ArrowLeft, ChevronDown } from "lucide-react";

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
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const toggleSelection = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        if (selectedIds.includes(id)) {
            setSelectedIds(selectedIds.filter((sid) => sid !== id));
        } else {
            if (selectedIds.length < 2) {
                setSelectedIds([...selectedIds, id]);
            }
        }
    };

    const toggleExpand = (id: string) => {
        setExpandedId(expandedId === id ? null : id);
    };

    const isComparing = selectedIds.length === 2;
    const compareData = isComparing
        ? insights.filter(i => selectedIds.includes(i.id))
        : [];

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

    // Clusters for Comparison & Sequenced View
    const clusters = [
        {
            title: "The Psychology (Problem)",
            color: "hsl(var(--ink-brown) / 0.1)",
            fields: [
                { key: "tension", label: "Tension", color: "hsl(var(--ink-brown))" },
                { key: "belief", label: "Belief", color: "hsl(var(--secondary))" }
            ]
        },
        {
            title: "The Strategy (Solution)",
            color: "hsl(var(--primary) / 0.1)",
            borderColor: "hsl(var(--primary))",
            fields: [
                { key: "core", label: "Core Insight", color: "hsl(var(--primary))" },
                { key: "reframe", label: "Reframe", color: "hsl(var(--ink-brown))" },
                { key: "angle", label: "Unique Angle", color: "hsl(var(--secondary))" }
            ]
        },
        {
            title: "The Execution (Promise)",
            color: "hsl(var(--accent) / 0.1)",
            fields: [
                { key: "promise", label: "Promise", color: "hsl(var(--primary))" },
                { key: "mechanism", label: "Mechanism", color: "hsl(var(--ink-brown))" },
                { key: "rtb", label: "RTB", color: "hsl(var(--ink-brown))" },
                { key: "hook", label: "Hooks", color: "hsl(var(--accent))" }
            ]
        }
    ];

    if (isComparing) {
        return (
            <div className="animate-slide-in">
                <div style={{ marginBottom: "2rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                        <button
                            onClick={() => setSelectedIds([])}
                            style={{
                                display: "flex", alignItems: "center", gap: "0.5rem",
                                padding: "0.5rem 1rem",
                                backgroundColor: "hsl(var(--background))",
                                border: "1px solid hsl(var(--border))",
                                borderRadius: "8px",
                                cursor: "pointer",
                                fontSize: "0.875rem",
                                fontWeight: 600
                            }}
                        >
                            <ArrowLeft size={16} /> Back to List
                        </button>
                        <h2 style={{ margin: 0 }}>Comparing 2 Insights</h2>
                    </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "150px 1fr 1fr", gap: "1rem", alignItems: "start" }}>
                    {/* Header Row */}
                    <div style={{ fontWeight: "bold" }}></div>
                    {compareData.map(insight => (
                        <div key={insight.id} style={{
                            fontWeight: "bold",
                            textAlign: "center",
                            fontSize: "1.25rem",
                            color: "hsl(var(--primary))",
                            padding: "1rem",
                            backgroundColor: "hsl(var(--paper-white))",
                            borderRadius: "12px",
                            border: "1px solid hsl(var(--border))"
                        }}>
                            {insight.title}
                        </div>
                    ))}

                    {/* Clusters */}
                    {clusters.map((cluster, cIdx) => (
                        <React.Fragment key={cIdx}>
                            <div style={{
                                gridColumn: "1 / -1",
                                marginTop: "2rem",
                                padding: "0.5rem 1rem",
                                backgroundColor: cluster.color,
                                borderRadius: "8px",
                                color: "hsl(var(--ink-brown))",
                                fontWeight: 800,
                                textTransform: "uppercase",
                                fontSize: "0.875rem",
                                letterSpacing: "0.05em"
                            }}>
                                {cluster.title}
                            </div>

                            {cluster.fields.map(field => (
                                <React.Fragment key={field.key}>
                                    <div style={{
                                        fontWeight: 600,
                                        color: field.color,
                                        padding: "1rem 0",
                                        fontSize: "0.875rem",
                                        textAlign: "right",
                                        display: "flex",
                                        justifyContent: "flex-end",
                                        alignItems: "flex-start",
                                        marginTop: "0.25rem"
                                    }}>
                                        {renderLabelWithPopover(field.key, field.label, field.color)}
                                    </div>
                                    {compareData.map(insight => (
                                        <div key={`${insight.id}-${field.key}`} style={{
                                            padding: "1rem",
                                            backgroundColor: "hsl(var(--paper-white))",
                                            borderRadius: "8px",
                                            border: "1px solid hsl(var(--border))",
                                            fontSize: "0.95rem",
                                            lineHeight: "1.6"
                                        }}>
                                            {field.key === "hook" && Array.isArray(insight.hooks) ? (
                                                <ul style={{ listStyle: "inside", padding: 0, margin: 0 }}>
                                                    {insight.hooks.map((h, i) => (
                                                        <li key={i} style={{ marginBottom: "0.5rem" }}>{h}</li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                insight[field.key as keyof Insight]
                                            )}
                                        </div>
                                    ))}
                                </React.Fragment>
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
                    Tap to view details. Select 2 items to compare.
                </p>
                {selectedIds.length > 0 && (
                    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                        <span style={{
                            fontSize: "0.875rem",
                            backgroundColor: "hsl(var(--secondary))",
                            color: "white",
                            padding: "0.25rem 0.75rem",
                            borderRadius: "999px"
                        }}>
                            {selectedIds.length} Selected
                        </span>
                        {selectedIds.length === 2 && (
                            <button
                                style={{
                                    display: "flex", alignItems: "center", gap: "0.5rem",
                                    padding: "0.5rem 1rem",
                                    backgroundColor: "hsl(var(--primary))",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "8px",
                                    cursor: "pointer",
                                    fontWeight: 600
                                }}
                                onClick={() => {/* Comparison mode tracks state automatically */ }}
                            >
                                <GitCompare size={16} /> Compare Now
                            </button>
                        )}
                    </div>
                )}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                {insights.map((insight) => {
                    const isSelected = selectedIds.includes(insight.id);
                    const isExpanded = expandedId === insight.id;

                    return (
                        <div
                            key={insight.id}
                            className={`card-wood ${isExpanded ? "expanded" : ""}`}
                            style={{
                                cursor: isExpanded ? "default" : "pointer",
                                transition: "all 0.3s ease",
                                border: isSelected ? "2px solid hsl(var(--secondary))" : undefined
                            }}
                            onClick={() => !isExpanded && toggleExpand(insight.id)}
                        >
                            {/* Card Header / Summary */}
                            <div style={{
                                padding: "1.5rem 2rem",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                borderBottom: isExpanded ? "1px solid hsl(var(--border))" : "none"
                            }}>
                                <div>
                                    <h3 style={{
                                        fontSize: isExpanded ? "1.5rem" : "1.25rem",
                                        fontWeight: 700,
                                        color: isExpanded ? "hsl(var(--primary))" : "hsl(var(--ink-brown))",
                                        marginBottom: "0.25rem"
                                    }}>
                                        {insight.title}
                                    </h3>
                                    {!isExpanded && (
                                        <p style={{ color: "hsl(var(--ink-brown) / 0.6)", fontStyle: "italic", margin: 0 }}>
                                            "{insight.tension.substring(0, 100)}..."
                                        </p>
                                    )}
                                </div>

                                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                                    <div
                                        onClick={(e) => toggleSelection(e, insight.id)}
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "0.5rem",
                                            padding: "0.5rem",
                                            borderRadius: "8px",
                                            backgroundColor: isSelected ? "hsl(var(--secondary) / 0.1)" : "transparent",
                                            cursor: "pointer"
                                        }}
                                    >
                                        <div style={{
                                            width: "20px",
                                            height: "20px",
                                            borderRadius: "4px",
                                            border: `2px solid ${isSelected ? "hsl(var(--secondary))" : "hsl(var(--border))"}`,
                                            backgroundColor: isSelected ? "hsl(var(--secondary))" : "transparent",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center"
                                        }}>
                                            {isSelected && <Check size={14} color="white" />}
                                        </div>
                                        <span style={{ fontSize: "0.875rem", fontWeight: 600, color: isSelected ? "hsl(var(--secondary))" : "hsl(var(--ink-brown) / 0.5)" }}>
                                            Compare
                                        </span>
                                    </div>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); toggleExpand(insight.id); }}
                                        style={{
                                            background: "none",
                                            border: "none",
                                            cursor: "pointer",
                                            color: "hsl(var(--ink-brown) / 0.5)",
                                            display: "flex",
                                            alignItems: "center"
                                        }}
                                    >
                                        {isExpanded ? <X size={24} /> : <ChevronDown size={24} />}
                                    </button>
                                </div>
                            </div>

                            {/* Expanded Content */}
                            {isExpanded && (
                                <div className="animate-slide-in" style={{ padding: "2rem" }}>
                                    <div style={{ display: "grid", gap: "2rem" }}>
                                        {clusters.map((cluster, cIdx) => (
                                            <div key={cIdx} style={{
                                                padding: "1.5rem",
                                                backgroundColor: cIdx === 1 ? "hsl(var(--paper-white))" : "transparent",
                                                borderRadius: "16px",
                                                border: cIdx === 1 ? "1px solid hsl(var(--primary) / 0.2)" : "none"
                                            }}>
                                                <h4 style={{
                                                    fontSize: "0.875rem",
                                                    textTransform: "uppercase",
                                                    letterSpacing: "0.1em",
                                                    color: cluster.borderColor || "hsl(var(--ink-brown) / 0.5)",
                                                    marginBottom: "1.5rem",
                                                    borderBottom: "1px solid hsl(var(--border))",
                                                    paddingBottom: "0.5rem",
                                                    width: "max-content"
                                                }}>
                                                    {cluster.title}
                                                </h4>

                                                <div style={{ display: "grid", gridTemplateColumns: cIdx === 2 ? "1fr 1fr" : "1fr", gap: "1.5rem" }}>
                                                    {cluster.fields.map((field) => (
                                                        <div key={field.key} style={{
                                                            gridColumn: field.key === "hook" ? "1 / -1" : "auto",
                                                            position: "relative",
                                                            paddingLeft: "1.5rem",
                                                            borderLeft: `3px solid ${field.color}`
                                                        }}>
                                                            <div style={{ marginBottom: "0.5rem" }}>
                                                                {renderLabelWithPopover(field.key, field.label, field.color)}
                                                            </div>
                                                            {field.key === "core" ? (
                                                                <p style={{ fontSize: "1.25rem", fontWeight: 600, color: "hsl(var(--primary))", lineHeight: "1.5" }}>
                                                                    {insight.core}
                                                                </p>
                                                            ) : field.key === "hook" ? (
                                                                <ul style={{ padding: 0, margin: 0, listStyle: "none", display: "grid", gap: "0.75rem" }}>
                                                                    {insight.hooks.map((h, i) => (
                                                                        <li key={i} style={{
                                                                            fontSize: i === 0 ? "1.25rem" : "1rem",
                                                                            fontWeight: i === 0 ? 600 : 400,
                                                                            fontStyle: "italic"
                                                                        }}>
                                                                            "{h}"
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            ) : (
                                                                <p style={{ fontSize: "1rem", lineHeight: "1.6", color: "hsl(var(--ink-brown))" }}>
                                                                    {insight[field.key as keyof Insight]}
                                                                </p>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div style={{ textAlign: "center", marginTop: "2rem" }}>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); toggleExpand(insight.id); }}
                                            style={{
                                                padding: "0.75rem 2rem",
                                                backgroundColor: "hsl(var(--background))",
                                                border: "1px solid hsl(var(--border))",
                                                borderRadius: "99px",
                                                cursor: "pointer",
                                                fontSize: "0.875rem",
                                                fontWeight: 600,
                                                color: "hsl(var(--ink-brown) / 0.7)"
                                            }}
                                        >
                                            Close Details
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
