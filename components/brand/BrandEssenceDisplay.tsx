"use client";

import React from "react";
import { BrandEssence } from "@/lib/types";
import { Sparkles, Target, TrendingUp, Shield, Cog, Award } from "lucide-react";

interface BrandEssenceDisplayProps {
    essence: BrandEssence;
}

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
                        gap: "0.75rem",
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
                            color: "hsl(var(--ink-brown) / 0.6)"
                        }}>
                            {item.label}
                        </h3>
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
