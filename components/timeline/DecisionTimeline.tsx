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
    const [activeCase, setActiveCase] = useState<string>(cases[0].id);

    const activeCaseData = cases.find(c => c.id === activeCase);

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

            {/* Case Tabs */}
            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "1rem",
                marginBottom: "3rem",
                maxWidth: "800px",
                margin: "0 auto 3rem"
            }}>
                {cases.map((caseItem) => {
                    const isActive = activeCase === caseItem.id;
                    return (
                        <button
                            key={caseItem.id}
                            onClick={() => setActiveCase(caseItem.id)}
                            className="hover-warm-glow"
                            style={{
                                padding: "1.5rem",
                                border: `2px solid ${isActive ? "hsl(var(--primary))" : "hsl(var(--border))"}`,
                                borderRadius: "12px",
                                backgroundColor: isActive ? "hsl(var(--paper-white))" : "transparent",
                                color: isActive ? "hsl(var(--primary))" : "hsl(var(--ink-brown) / 0.6)",
                                cursor: "pointer",
                                transition: "all 0.3s ease",
                                textAlign: "center"
                            }}
                        >
                            <div style={{ fontWeight: "700", fontSize: "1.125rem", marginBottom: "0.25rem" }}>
                                {caseItem.name}
                            </div>
                            <div style={{ fontSize: "0.875rem", opacity: 0.8 }}>
                                {caseItem.subtitle}
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* Active Case Info */}
            {activeCaseData && (
                <div style={{
                    textAlign: "center",
                    marginBottom: "2rem",
                    padding: "1rem",
                    backgroundColor: "hsl(var(--paper-white))",
                    borderRadius: "8px",
                    maxWidth: "600px",
                    margin: "0 auto 3rem"
                }}>
                    <p style={{ fontSize: "1rem", color: "hsl(var(--ink-brown) / 0.7)" }}>
                        <strong>Customer:</strong> {activeCaseData.customer}
                    </p>
                </div>
            )}

            {/* Timeline Stages */}
            <div style={{ maxWidth: "900px", margin: "0 auto" }}>
                {stages.map((stage, index) => (
                    <div key={stage.id}>
                        {/* Stage Card */}
                        <div className="card-wood" style={{
                            padding: "2rem",
                            marginBottom: index < stages.length - 1 ? "1rem" : "0"
                        }}>
                            {/* Stage Header */}
                            <div style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "1rem",
                                marginBottom: "1rem"
                            }}>
                                <div style={{
                                    fontSize: "2.5rem",
                                    lineHeight: 1
                                }}>
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
                                        fontSize: "1.5rem",
                                        marginBottom: "0.25rem",
                                        color: "hsl(var(--ink-brown))"
                                    }}>
                                        {stage.title}
                                    </h3>
                                    <div style={{
                                        fontSize: "0.875rem",
                                        color: "hsl(var(--ink-brown) / 0.6)",
                                        fontStyle: "italic"
                                    }}>
                                        {stage.name}
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            <p style={{
                                fontSize: "1rem",
                                lineHeight: "1.6",
                                color: "hsl(var(--ink-brown) / 0.8)",
                                marginBottom: "1rem"
                            }}>
                                {stage.description}
                            </p>

                            {/* Insight */}
                            <div style={{
                                padding: "1rem",
                                backgroundColor: "hsl(var(--primary) / 0.05)",
                                borderLeft: "4px solid hsl(var(--primary))",
                                borderRadius: "4px",
                                marginBottom: "1.5rem"
                            }}>
                                <div style={{
                                    fontSize: "0.75rem",
                                    fontWeight: "700",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.05em",
                                    color: "hsl(var(--primary))",
                                    marginBottom: "0.25rem"
                                }}>
                                    📌 JTBD Insight
                                </div>
                                <p style={{
                                    fontSize: "0.95rem",
                                    fontWeight: "600",
                                    color: "hsl(var(--ink-brown))",
                                    margin: 0
                                }}>
                                    {stage.insight}
                                </p>
                            </div>

                            {/* Example */}
                            <div style={{
                                padding: "1rem",
                                backgroundColor: "hsl(var(--accent) / 0.05)",
                                borderRadius: "8px"
                            }}>
                                <div style={{
                                    fontSize: "0.75rem",
                                    fontWeight: "700",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.05em",
                                    color: "hsl(var(--accent))",
                                    marginBottom: "0.5rem"
                                }}>
                                    💡 Example: {activeCaseData?.name}
                                </div>
                                <p style={{
                                    fontSize: "1rem",
                                    lineHeight: "1.6",
                                    color: "hsl(var(--ink-brown))",
                                    margin: 0,
                                    fontStyle: "italic"
                                }}>
                                    "{stage.examples[activeCase]}"
                                </p>
                            </div>
                        </div>

                        {/* Connector Arrow */}
                        {index < stages.length - 1 && (
                            <div style={{
                                display: "flex",
                                justifyContent: "center",
                                marginBottom: "1rem"
                            }}>
                                <ChevronDown
                                    size={32}
                                    style={{ color: "hsl(var(--primary))" }}
                                />
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Bottom Note */}
            <div className="card-wood" style={{
                padding: "2rem",
                marginTop: "3rem",
                maxWidth: "900px",
                margin: "3rem auto 0",
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
