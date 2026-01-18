"use client";

import React from "react";
import { AudienceSegment } from "@/lib/types";
import { Card } from "@/components/ui/Card";
import { Badge } from "lucide-react";

interface AudienceViewProps {
    data: AudienceSegment[];
}

export default function AudienceView({ data }: AudienceViewProps) {
    const primarySegments = data.filter(s => s.isPrimary);
    const secondarySegments = data.filter(s => !s.isPrimary);

    return (
        <div className="animate-slide-in">
            {/* Primary Segments */}
            <div style={{ marginBottom: "3rem" }}>
                <h2 style={{
                    fontSize: "1.5rem",
                    marginBottom: "1.5rem",
                    color: "hsl(var(--primary))",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem"
                }}>
                    <Badge size={24} /> Primary Audience (Nhóm Chính)
                </h2>
                <div style={{ display: "grid", gap: "2rem" }}>
                    {primarySegments.map(segment => (
                        <div key={segment.id} className="card-wood" style={{ padding: "2.5rem", borderLeft: "4px solid hsl(var(--primary))" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "1rem" }}>
                                <h3 style={{ fontSize: "2rem", color: "hsl(var(--ink-brown))" }}>{segment.title}</h3>
                                <span style={{
                                    backgroundColor: "hsl(var(--primary))",
                                    color: "white",
                                    padding: "0.25rem 0.75rem",
                                    borderRadius: "999px",
                                    fontSize: "0.875rem",
                                    fontWeight: 600
                                }}>
                                    PRIMARY
                                </span>
                            </div>
                            <div className="prose" style={{ marginBottom: "1.5rem", fontSize: "1.125rem" }}>
                                {segment.description}
                            </div>
                            <div>
                                <h4 style={{ fontSize: "1rem", fontWeight: 700, color: "hsl(var(--ink-brown) / 0.7)", marginBottom: "0.5rem" }}>
                                    Pain Points (Nỗi đau):
                                </h4>
                                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                                    {segment.painPoints.map((point, idx) => (
                                        <span key={idx} style={{
                                            backgroundColor: "hsl(var(--background))",
                                            padding: "0.5rem 1rem",
                                            borderRadius: "8px",
                                            border: "1px solid hsl(var(--border))",
                                            fontSize: "0.9rem"
                                        }}>
                                            {point}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Secondary Segments */}
            {secondarySegments.length > 0 && (
                <div>
                    <h2 style={{
                        fontSize: "1.5rem",
                        marginBottom: "1.5rem",
                        color: "hsl(var(--secondary))",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem"
                    }}>
                        Secondary Audience (Nhóm Phụ)
                    </h2>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
                        {secondarySegments.map(segment => (
                            <div key={segment.id} className="card-wood" style={{ padding: "2rem" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                                    <h3 style={{ fontSize: "1.5rem", color: "hsl(var(--ink-brown))" }}>{segment.title}</h3>
                                    <span style={{
                                        backgroundColor: "hsl(var(--secondary))",
                                        color: "white",
                                        padding: "0.25rem 0.75rem",
                                        borderRadius: "999px",
                                        fontSize: "0.75rem",
                                        fontWeight: 600
                                    }}>
                                        SECONDARY
                                    </span>
                                </div>
                                <div className="prose" style={{ marginBottom: "1rem", fontSize: "1rem", color: "hsl(var(--ink-brown) / 0.8)" }}>
                                    {segment.description}
                                </div>
                                <div>
                                    <h4 style={{ fontSize: "0.875rem", fontWeight: 700, color: "hsl(var(--ink-brown) / 0.6)", marginBottom: "0.5rem" }}>
                                        Paint Points:
                                    </h4>
                                    <ul style={{ paddingLeft: "1rem", margin: 0 }}>
                                        {segment.painPoints.map((point, idx) => (
                                            <li key={idx} style={{ fontSize: "0.9rem", color: "hsl(var(--ink-brown) / 0.8)", marginBottom: "0.25rem" }}>
                                                {point}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
