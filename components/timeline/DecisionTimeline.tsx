"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface TimelineCase {
    id: string;
    name: string;
    subtitle: string;
    customer: string;
}

interface TimelineStage {
    id: number;
    emoji: string;
    name: string;
    title: string;
    description: string;
    insight: string;
    examples: Record<string, string>;
}

interface DecisionTimelineProps {
    cases: TimelineCase[];
    stages: TimelineStage[];
}

export default function DecisionTimeline({ cases, stages }: DecisionTimelineProps) {
    const [selectedBrands, setSelectedBrands] = useState<string[]>([cases[0].id]);

    const toggleBrand = (brandId: string) => {
        if (selectedBrands.includes(brandId)) {
            // Unselect if already selected
            setSelectedBrands(selectedBrands.filter(id => id !== brandId));
        } else {
            // Add if less than 2 brands selected
            if (selectedBrands.length < 2) {
                setSelectedBrands([...selectedBrands, brandId]);
            } else {
                // Replace first brand if already 2 selected
                setSelectedBrands([selectedBrands[1], brandId]);
            }
        }
    };

    const brand1 = cases.find(c => c.id === selectedBrands[0]);
    const brand2 = selectedBrands.length > 1 ? cases.find(c => c.id === selectedBrands[1]) : null;

    return (
        <div className="animate-slide-in">
            {/* Header */}
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
                <h1 style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>
                    Decision Timeline
                </h1>
                <p className="text-subtext" style={{ fontSize: "1.25rem" }}>
                    Customer Decision Journey - JTBD Framework
                </p>
            </div>

            {/* Brand Selection */}
            <div style={{
                marginBottom: "3rem",
                padding: "2rem",
                backgroundColor: "hsl(var(--paper-white))",
                borderRadius: "12px",
                border: "1px solid hsl(var(--border))"
            }}>
                <h3 style={{
                    fontSize: "1.125rem",
                    marginBottom: "1rem",
                    color: "hsl(var(--ink-brown))"
                }}>
                    Select brands to compare (max 2):
                </h3>
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                    gap: "1rem"
                }}>
                    {cases.map((caseItem) => {
                        const isSelected = selectedBrands.includes(caseItem.id);
                        return (
                            <label
                                key={caseItem.id}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.75rem",
                                    padding: "1rem",
                                    border: `2px solid ${isSelected ? "hsl(var(--primary))" : "hsl(var(--border))"}`,
                                    borderRadius: "8px",
                                    cursor: "pointer",
                                    backgroundColor: isSelected ? "hsl(var(--primary) / 0.05)" : "transparent",
                                    transition: "all 0.2s ease"
                                }}
                                className="hover-warm-glow"
                            >
                                <input
                                    type="checkbox"
                                    checked={isSelected}
                                    onChange={() => toggleBrand(caseItem.id)}
                                    style={{
                                        width: "20px",
                                        height: "20px",
                                        cursor: "pointer"
                                    }}
                                />
                                <div>
                                    <div style={{ fontWeight: "700", fontSize: "1rem" }}>
                                        {caseItem.name}
                                    </div>
                                    <div style={{ fontSize: "0.875rem", color: "hsl(var(--ink-brown) / 0.6)" }}>
                                        {caseItem.subtitle}
                                    </div>
                                </div>
                            </label>
                        );
                    })}
                </div>
            </div>

            {/* Timeline Table */}
            {selectedBrands.length > 0 && (
                <div style={{ overflowX: "auto" }}>
                    <table style={{
                        width: "100%",
                        borderCollapse: "separate",
                        borderSpacing: "0 1rem"
                    }}>
                        <thead>
                            <tr>
                                <th style={{
                                    textAlign: "left",
                                    padding: "1rem",
                                    backgroundColor: "hsl(var(--paper-white))",
                                    borderRadius: "8px 0 0 8px",
                                    minWidth: "350px",
                                    fontWeight: "700",
                                    color: "hsl(var(--ink-brown))"
                                }}>
                                    Stage Information
                                </th>
                                {brand1 && (
                                    <th style={{
                                        textAlign: "left",
                                        padding: "1rem",
                                        backgroundColor: "hsl(var(--primary) / 0.1)",
                                        borderRadius: brand2 ? "0" : "0 8px 8px 0",
                                        minWidth: "300px",
                                        fontWeight: "700",
                                        color: "hsl(var(--primary))"
                                    }}>
                                        {brand1.name}
                                    </th>
                                )}
                                {brand2 && (
                                    <th style={{
                                        textAlign: "left",
                                        padding: "1rem",
                                        backgroundColor: "hsl(var(--accent) / 0.1)",
                                        borderRadius: "0 8px 8px 0",
                                        minWidth: "300px",
                                        fontWeight: "700",
                                        color: "hsl(var(--accent))"
                                    }}>
                                        {brand2.name}
                                    </th>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {stages.map((stage, index) => (
                                <React.Fragment key={stage.id}>
                                    <tr>
                                        {/* Stage Info Column */}
                                        <td style={{
                                            padding: "2rem",
                                            backgroundColor: "hsl(var(--paper-white))",
                                            borderRadius: "8px 0 0 8px",
                                            verticalAlign: "top",
                                            border: "1px solid hsl(var(--border))",
                                            borderRight: "none"
                                        }}>
                                            <div style={{
                                                display: "flex",
                                                alignItems: "flex-start",
                                                gap: "1rem",
                                                marginBottom: "1rem"
                                            }}>
                                                <div style={{ fontSize: "2rem", lineHeight: 1 }}>
                                                    {stage.emoji}
                                                </div>
                                                <div style={{ flex: 1 }}>
                                                    <div style={{
                                                        fontSize: "0.75rem",
                                                        fontWeight: "700",
                                                        textTransform: "uppercase",
                                                        letterSpacing: "0.05em",
                                                        color: "hsl(var(--ink-brown) / 0.5)",
                                                        marginBottom: "0.25rem"
                                                    }}>
                                                        Stage {stage.id}
                                                    </div>
                                                    <h3 style={{
                                                        fontSize: "1.25rem",
                                                        marginBottom: "0.25rem",
                                                        color: "hsl(var(--ink-brown))"
                                                    }}>
                                                        {stage.title}
                                                    </h3>
                                                    <div style={{
                                                        fontSize: "0.75rem",
                                                        color: "hsl(var(--ink-brown) / 0.6)",
                                                        fontStyle: "italic"
                                                    }}>
                                                        {stage.name}
                                                    </div>
                                                </div>
                                            </div>

                                            <p style={{
                                                fontSize: "0.95rem",
                                                lineHeight: "1.6",
                                                color: "hsl(var(--ink-brown) / 0.8)",
                                                marginBottom: "1rem"
                                            }}>
                                                {stage.description}
                                            </p>

                                            <div style={{
                                                padding: "0.75rem",
                                                backgroundColor: "hsl(var(--primary) / 0.05)",
                                                borderLeft: "3px solid hsl(var(--primary))",
                                                borderRadius: "4px"
                                            }}>
                                                <div style={{
                                                    fontSize: "0.7rem",
                                                    fontWeight: "700",
                                                    textTransform: "uppercase",
                                                    letterSpacing: "0.05em",
                                                    color: "hsl(var(--primary))",
                                                    marginBottom: "0.25rem"
                                                }}>
                                                    📌 JTBD Insight
                                                </div>
                                                <p style={{
                                                    fontSize: "0.875rem",
                                                    fontWeight: "600",
                                                    color: "hsl(var(--ink-brown))",
                                                    margin: 0
                                                }}>
                                                    {stage.insight}
                                                </p>
                                            </div>
                                        </td>

                                        {/* Brand 1 Example Column */}
                                        {brand1 && (
                                            <td style={{
                                                padding: "2rem",
                                                backgroundColor: "hsl(var(--primary) / 0.03)",
                                                borderRadius: brand2 ? "0" : "0 8px 8px 0",
                                                verticalAlign: "top",
                                                border: "1px solid hsl(var(--border))",
                                                borderLeft: "none",
                                                borderRight: brand2 ? "none" : "1px solid hsl(var(--border))"
                                            }}>
                                                <div style={{
                                                    fontSize: "0.75rem",
                                                    fontWeight: "700",
                                                    textTransform: "uppercase",
                                                    letterSpacing: "0.05em",
                                                    color: "hsl(var(--primary))",
                                                    marginBottom: "0.75rem"
                                                }}>
                                                    💡 Example
                                                </div>
                                                <p style={{
                                                    fontSize: "0.95rem",
                                                    lineHeight: "1.6",
                                                    color: "hsl(var(--ink-brown))",
                                                    margin: 0,
                                                    fontStyle: "italic"
                                                }}>
                                                    "{stage.examples[brand1.id]}"
                                                </p>
                                            </td>
                                        )}

                                        {/* Brand 2 Example Column */}
                                        {brand2 && (
                                            <td style={{
                                                padding: "2rem",
                                                backgroundColor: "hsl(var(--accent) / 0.03)",
                                                borderRadius: "0 8px 8px 0",
                                                verticalAlign: "top",
                                                border: "1px solid hsl(var(--border))",
                                                borderLeft: "none"
                                            }}>
                                                <div style={{
                                                    fontSize: "0.75rem",
                                                    fontWeight: "700",
                                                    textTransform: "uppercase",
                                                    letterSpacing: "0.05em",
                                                    color: "hsl(var(--accent))",
                                                    marginBottom: "0.75rem"
                                                }}>
                                                    💡 Example
                                                </div>
                                                <p style={{
                                                    fontSize: "0.95rem",
                                                    lineHeight: "1.6",
                                                    color: "hsl(var(--ink-brown))",
                                                    margin: 0,
                                                    fontStyle: "italic"
                                                }}>
                                                    "{stage.examples[brand2.id]}"
                                                </p>
                                            </td>
                                        )}
                                    </tr>

                                    {/* Connector Arrow */}
                                    {index < stages.length - 1 && (
                                        <tr>
                                            <td colSpan={selectedBrands.length + 1} style={{ textAlign: "center", padding: "0.5rem 0" }}>
                                                <ChevronDown size={32} style={{ color: "hsl(var(--primary))" }} />
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Bottom Note */}
            <div className="card-wood" style={{
                padding: "2rem",
                marginTop: "3rem",
                backgroundColor: "hsl(var(--secondary) / 0.05)"
            }}>
                <h3 style={{
                    fontSize: "1.25rem",
                    marginBottom: "1rem",
                    color: "hsl(var(--ink-brown))"
                }}>
                    🧠 Ghi nhớ quan trọng
                </h3>
                <ul style={{
                    margin: 0,
                    paddingLeft: "1.5rem",
                    color: "hsl(var(--ink-brown) / 0.8)",
                    lineHeight: "1.8"
                }}>
                    <li>JTBD không nằm ở Step 4-5 (search & so sánh)</li>
                    <li>Nó nằm ở Step 2-3 (struggle + trigger)</li>
                    <li>Interview mà không tái dựng đủ timeline → JTBD giả</li>
                    <li>JTBD là vòng lặp, không phải funnel</li>
                </ul>
            </div>
        </div>
    );
}
