"use client";

import React, { useState, useEffect } from "react";
import { CompetencyFramework } from "@/lib/competency-types";
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "@/components/ui/Accordion";
import { Check } from "lucide-react";

interface CompetencyViewProps {
    framework: CompetencyFramework;
}

export default function CompetencyView({ framework }: CompetencyViewProps) {
    // Store selections as { skillId: levelNumber }
    const [selections, setSelections] = useState<Record<string, number>>({});
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        const saved = localStorage.getItem("competency-data");
        if (saved) {
            try {
                setSelections(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse competency data", e);
            }
        }
    }, []);

    const handleSelect = (skillId: string, level: number) => {
        const newSelections = { ...selections, [skillId]: level };
        setSelections(newSelections);
        localStorage.setItem("competency-data", JSON.stringify(newSelections));
    };

    if (!isClient) {
        return <div className="container" style={{ padding: "4rem 0" }}>Loading...</div>;
    }

    return (
        <div className="container animate-slide-in">
            <div style={{ padding: "3rem 0 1rem", textAlign: "center" }}>
                <h1 style={{ marginBottom: "0.5rem" }}>{framework.title}</h1>
                <p className="text-subtext" style={{ fontSize: "1.125rem" }}>Version {framework.version}</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', paddingBottom: '4rem' }}>
                {framework.areas.map((area) => (
                    <div key={area.id} className="card-wood">
                        <div className="card-wood-header" style={{ padding: '1.5rem' }}>
                            <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>{area.name}</h2>
                            <p style={{ color: 'hsl(var(--ink-brown) / 0.8)' }}>{area.description}</p>
                        </div>

                        <div style={{ padding: '1.5rem' }}>
                            {area.competencies.map((comp) => (
                                <div key={comp.id} style={{ marginBottom: '2rem' }}>
                                    <div style={{ marginBottom: '1rem', borderLeft: '4px solid hsl(var(--primary))', paddingLeft: '1rem' }}>
                                        <h3 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>{comp.name}</h3>
                                        <p className="text-subtext">{comp.description}</p>
                                    </div>

                                    <Accordion type="multiple" className="w-full">
                                        {comp.skills.map((skill) => (
                                            <AccordionItem key={skill.id} value={skill.id}>
                                                <AccordionTrigger style={{ fontSize: '1.125rem' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', width: '100%' }}>
                                                        <span>{skill.name}</span>
                                                        {selections[skill.id] && (
                                                            <span style={{
                                                                fontSize: '0.75rem',
                                                                backgroundColor: 'hsl(var(--primary))',
                                                                color: 'white',
                                                                padding: '0.1rem 0.5rem',
                                                                borderRadius: '999px'
                                                            }}>
                                                                Level {selections[skill.id]}
                                                            </span>
                                                        )}
                                                    </div>
                                                </AccordionTrigger>
                                                <AccordionContent>
                                                    <div style={{ padding: '1rem', backgroundColor: 'hsl(var(--background))', borderRadius: '8px' }}>
                                                        <p style={{ marginBottom: '1.5rem', fontStyle: 'italic', fontSize: '1rem' }}>{skill.description}</p>

                                                        {/* Horizontal Level Grid */}
                                                        <div style={{
                                                            display: 'grid',
                                                            gridTemplateColumns: 'repeat(5, 1fr)',
                                                            gap: '0.5rem'
                                                        }}>
                                                            {skill.levels.map((level) => {
                                                                const isSelected = selections[skill.id] === level.level;
                                                                const isCompleted = selections[skill.id] && selections[skill.id] > level.level;

                                                                return (
                                                                    <div
                                                                        key={level.level}
                                                                        onClick={() => handleSelect(skill.id, level.level)}
                                                                        style={{
                                                                            border: `1px solid ${isSelected ? 'hsl(var(--primary))' : 'hsl(var(--border))'}`,
                                                                            borderRadius: '6px',
                                                                            backgroundColor: isSelected ? 'hsl(var(--primary) / 0.05)' : 'hsl(var(--paper-white))',
                                                                            padding: '0.75rem',
                                                                            cursor: 'pointer',
                                                                            transition: 'all 0.2s',
                                                                            position: 'relative',
                                                                            height: '100%'
                                                                        }}
                                                                        className="hover-warm-glow"
                                                                    >
                                                                        <div style={{
                                                                            display: 'flex',
                                                                            justifyContent: 'space-between',
                                                                            alignItems: 'center',
                                                                            marginBottom: '0.5rem'
                                                                        }}>
                                                                            <span style={{
                                                                                fontWeight: 700,
                                                                                color: isSelected ? 'hsl(var(--primary))' : 'hsl(var(--ink-brown) / 0.5)'
                                                                            }}>
                                                                                L{level.level}
                                                                            </span>
                                                                            {isSelected && <Check size={16} color="hsl(var(--primary))" />}
                                                                        </div>

                                                                        <div style={{ fontWeight: 600, color: 'hsl(var(--ink-brown))', fontSize: '0.9rem', marginBottom: '0.25rem', lineHeight: 1.2 }}>
                                                                            {level.description}
                                                                        </div>
                                                                        <div style={{ fontSize: '0.75rem', color: 'hsl(var(--ink-brown) / 0.7)', lineHeight: 1.3 }}>
                                                                            {level.criteria}
                                                                        </div>
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                    </div>
                                                </AccordionContent>
                                            </AccordionItem>
                                        ))}
                                    </Accordion>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
