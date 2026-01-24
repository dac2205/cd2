"use client";

import React, { useState } from "react";

interface Brand {
    id: string;
    name: string;
    subtitle: string;
}

interface ComparisonExample {
    jtbd: string;
    needs: string;
}

interface Comparison {
    category: string;
    jtbd: string;
    needs: string;
    commentary: string;
    examples: Record<string, ComparisonExample>;
}

interface JTBDvsNeedsProps {
    brands: Brand[];
    comparisons: Comparison[];
}

export default function JTBDvsNeeds({ brands, comparisons }: JTBDvsNeedsProps) {
    const [selectedBrand, setSelectedBrand] = useState<string>(brands[0].id);

    const activeBrand = brands.find(b => b.id === selectedBrand);

    return (
        <div className="animate-slide-in">
            {/* Header */}
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
                <h1 style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>
                    JTBD vs Needs
                </h1>
                <p className="text-subtext" style={{ fontSize: "1.25rem" }}>
                    Understanding the Fundamental Difference
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
                    Select a brand to see examples:
                </h3>
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                    gap: "1rem"
                }}>
                    {brands.map((brand) => {
                        const isSelected = selectedBrand === brand.id;
                        return (
                            <button
                                key={brand.id}
                                onClick={() => setSelectedBrand(brand.id)}
                                className="hover-warm-glow"
                                style={{
                                    padding: "1.5rem",
                                    border: `2px solid ${isSelected ? "hsl(var(--primary))" : "hsl(var(--border))"}`,
                                    borderRadius: "8px",
                                    cursor: "pointer",
                                    backgroundColor: isSelected ? "hsl(var(--primary) / 0.05)" : "transparent",
                                    transition: "all 0.2s ease",
                                    textAlign: "left"
                                }}
                            >
                                <div style={{ fontWeight: "700", fontSize: "1rem", marginBottom: "0.25rem" }}>
                                    {brand.name}
                                </div>
                                <div style={{ fontSize: "0.875rem", color: "hsl(var(--ink-brown) / 0.6)" }}>
                                    {brand.subtitle}
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Active Brand Info */}
            {activeBrand && (
                <div style={{
                    textAlign: "center",
                    marginBottom: "2rem",
                    padding: "1rem",
                    backgroundColor: "hsl(var(--paper-white))",
                    borderRadius: "8px"
                }}>
                    <p style={{ fontSize: "1rem", color: "hsl(var(--ink-brown) / 0.7)" }}>
                        <strong>Viewing examples for:</strong> {activeBrand.name}
                    </p>
                </div>
            )}

            {/* Comparison Table */}
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
                                backgroundColor: "hsl(var(--primary) / 0.1)",
                                borderRadius: "8px 0 0 8px",
                                minWidth: "250px",
                                fontWeight: "700",
                                color: "hsl(var(--primary))"
                            }}>
                                JTBD Perspective
                            </th>
                            <th style={{
                                textAlign: "left",
                                padding: "1rem",
                                backgroundColor: "hsl(var(--accent) / 0.1)",
                                minWidth: "250px",
                                fontWeight: "700",
                                color: "hsl(var(--accent))"
                            }}>
                                Needs Perspective
                            </th>
                            <th style={{
                                textAlign: "left",
                                padding: "1rem",
                                backgroundColor: "hsl(var(--secondary) / 0.1)",
                                borderRadius: "0 8px 8px 0",
                                minWidth: "300px",
                                fontWeight: "700",
                                color: "hsl(var(--secondary))"
                            }}>
                                Why It Matters
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {comparisons.map((comparison, index) => (
                            <React.Fragment key={index}>
                                <tr>
                                    <td colSpan={3} style={{
                                        padding: "1.5rem 1rem 0.5rem",
                                        fontWeight: "700",
                                        fontSize: "1.125rem",
                                        color: "hsl(var(--ink-brown))",
                                        backgroundColor: "hsl(var(--paper-white))",
                                        borderRadius: "8px 8px 0 0"
                                    }}>
                                        {comparison.category}
                                    </td>
                                </tr>
                                <tr>
                                    {/* JTBD Column */}
                                    <td style={{
                                        padding: "1.5rem",
                                        backgroundColor: "hsl(var(--primary) / 0.03)",
                                        verticalAlign: "top",
                                        border: "1px solid hsl(var(--border))",
                                        borderRight: "none",
                                        borderRadius: "0 0 0 8px"
                                    }}>
                                        <div style={{
                                            fontSize: "0.875rem",
                                            fontWeight: "600",
                                            color: "hsl(var(--primary))",
                                            marginBottom: "0.75rem"
                                        }}>
                                            Framework:
                                        </div>
                                        <p style={{
                                            fontSize: "0.95rem",
                                            lineHeight: "1.6",
                                            color: "hsl(var(--ink-brown))",
                                            marginBottom: "1rem",
                                            fontStyle: "italic"
                                        }}>
                                            "{comparison.jtbd}"
                                        </p>
                                        <div style={{
                                            fontSize: "0.875rem",
                                            fontWeight: "600",
                                            color: "hsl(var(--primary))",
                                            marginBottom: "0.5rem"
                                        }}>
                                            Example ({activeBrand?.name}):
                                        </div>
                                        <p style={{
                                            fontSize: "0.95rem",
                                            lineHeight: "1.6",
                                            color: "hsl(var(--ink-brown))",
                                            margin: 0
                                        }}>
                                            {comparison.examples[selectedBrand]?.jtbd}
                                        </p>
                                    </td>

                                    {/* Needs Column */}
                                    <td style={{
                                        padding: "1.5rem",
                                        backgroundColor: "hsl(var(--accent) / 0.03)",
                                        verticalAlign: "top",
                                        border: "1px solid hsl(var(--border))",
                                        borderLeft: "none",
                                        borderRight: "none"
                                    }}>
                                        <div style={{
                                            fontSize: "0.875rem",
                                            fontWeight: "600",
                                            color: "hsl(var(--accent))",
                                            marginBottom: "0.75rem"
                                        }}>
                                            Framework:
                                        </div>
                                        <p style={{
                                            fontSize: "0.95rem",
                                            lineHeight: "1.6",
                                            color: "hsl(var(--ink-brown))",
                                            marginBottom: "1rem",
                                            fontStyle: "italic"
                                        }}>
                                            "{comparison.needs}"
                                        </p>
                                        <div style={{
                                            fontSize: "0.875rem",
                                            fontWeight: "600",
                                            color: "hsl(var(--accent))",
                                            marginBottom: "0.5rem"
                                        }}>
                                            Example ({activeBrand?.name}):
                                        </div>
                                        <p style={{
                                            fontSize: "0.95rem",
                                            lineHeight: "1.6",
                                            color: "hsl(var(--ink-brown))",
                                            margin: 0
                                        }}>
                                            {comparison.examples[selectedBrand]?.needs}
                                        </p>
                                    </td>

                                    {/* Commentary Column */}
                                    <td style={{
                                        padding: "1.5rem",
                                        backgroundColor: "hsl(var(--secondary) / 0.03)",
                                        verticalAlign: "top",
                                        border: "1px solid hsl(var(--border))",
                                        borderLeft: "none",
                                        borderRadius: "0 0 8px 0"
                                    }}>
                                        <div style={{
                                            fontSize: "0.875rem",
                                            fontWeight: "600",
                                            color: "hsl(var(--secondary))",
                                            marginBottom: "0.75rem"
                                        }}>
                                            💡 Commentary:
                                        </div>
                                        <p style={{
                                            fontSize: "0.95rem",
                                            lineHeight: "1.6",
                                            color: "hsl(var(--ink-brown))",
                                            margin: 0
                                        }}>
                                            {comparison.commentary}
                                        </p>
                                    </td>
                                </tr>
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>

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
                    🧠 Key Takeaway
                </h3>
                <p style={{
                    margin: 0,
                    color: "hsl(var(--ink-brown) / 0.8)",
                    lineHeight: "1.8",
                    fontSize: "1rem"
                }}>
                    <strong>JTBD</strong> focuses on the <strong>progress</strong> customers want to make in their lives,
                    while <strong>Needs</strong> focuses on what customers <strong>lack</strong>.
                    JTBD is a timeline of transformation, Needs is a snapshot of gaps.
                    JTBD creates emotional connection through storytelling, Needs creates rational comparison through features.
                </p>
            </div>
        </div>
    );
}
