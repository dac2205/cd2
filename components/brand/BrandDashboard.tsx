"use client";

import React, { useState } from "react";
import { BrandContent } from "@/lib/types";
import { BookOpen, Users, Lightbulb, CheckCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import JTBDView from "@/components/jtbd/JTBDView";
import AudienceView from "@/components/audience/AudienceView";
import InsightsExplorer from "@/components/insights/InsightsExplorer";
import QuizView from "@/components/quiz/QuizView";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";

interface BrandDashboardProps {
    brand: BrandContent;
    slug: string;
    jtbdHtmlData?: Record<string, string>;
}

type SectionType = 'jtbd' | 'audience' | 'insights' | 'quiz';

export default function BrandDashboard({ brand, slug, jtbdHtmlData }: BrandDashboardProps) {
    const [activeSection, setActiveSection] = useState<SectionType>('jtbd');

    const sections = [
        {
            id: 'jtbd' as SectionType,
            title: "Jobs to be Done",
            icon: BookOpen,
            color: "hsl(var(--ink-brown))"
        },
        {
            id: 'audience' as SectionType,
            title: "Audience",
            icon: Users,
            color: "hsl(var(--primary))"
        },
        {
            id: 'insights' as SectionType,
            title: "Insights",
            icon: Lightbulb,
            color: "hsl(var(--accent))"
        },
        {
            id: 'quiz' as SectionType,
            title: "Quiz",
            icon: CheckCircle,
            color: "hsl(var(--secondary))"
        }
    ];

    const ActiveIcon = sections.find(s => s.id === activeSection)?.icon || BookOpen;

    return (
        <div className="container animate-slide-in">
            {/* Header Area */}
            <div style={{ marginBottom: "2rem", textAlign: "left" }}>
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-ink-brown/60 hover:text-ink-brown transition-colors no-underline mb-6 text-sm"
                >
                    <ArrowLeft size={16} /> Back to Brands
                </Link>

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                    <div>
                        <p className="text-subtext uppercase tracking-widest text-sm mb-2 font-bold opacity-70">
                            Brand Analysis
                        </p>
                        <h1 className="text-5xl font-serif font-bold text-ink-brown mb-2">{brand.meta.name}</h1>
                        <p className="text-xl text-ink-brown/70">Owner: {brand.meta.owner}</p>
                    </div>
                </div>

                {brand.introduction && (
                    <div className="card-wood p-8 mb-12 max-w-4xl">
                        <div className="prose text-lg leading-relaxed text-ink-brown/90" dangerouslySetInnerHTML={{ __html: brand.introduction }} />
                    </div>
                )}
            </div>

            {/* Navigation Tabs */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                {sections.map((section) => {
                    const isActive = activeSection === section.id;
                    const Icon = section.icon;
                    return (
                        <button
                            key={section.id}
                            onClick={() => setActiveSection(section.id)}
                            className={`
                                relative p-6 rounded-xl border-2 transition-all duration-300 flex flex-col items-center gap-3 text-center group
                                ${isActive ? 'bg-paper-white shadow-md transform -translate-y-1' : 'bg-transparent hover:bg-white/50 border-transparent'}
                            `}
                            style={{
                                borderColor: isActive ? section.color : 'transparent'
                            }}
                        >
                            <Icon
                                size={28}
                                className={`transition-colors duration-300 ${isActive ? '' : 'text-ink-brown/40 group-hover:text-ink-brown/70'}`}
                                style={{ color: isActive ? section.color : undefined }}
                            />
                            <span
                                className={`font-serif text-lg font-semibold transition-colors duration-300 ${isActive ? 'text-ink-brown' : 'text-ink-brown/50 group-hover:text-ink-brown/80'}`}
                            >
                                {section.title}
                            </span>

                            {isActive && (
                                <div
                                    className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px]"
                                    style={{ borderTopColor: section.color }}
                                />
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Content Display */}
            <div className="min-h-[500px]">
                <div className="mb-8 flex items-center gap-3 animate-in fade-in slide-in-from-left-4">
                    <ActiveIcon
                        size={32}
                        style={{ color: sections.find(s => s.id === activeSection)?.color }}
                    />
                    <h2 className="text-3xl font-serif text-ink-brown">
                        {sections.find(s => s.id === activeSection)?.title}
                    </h2>
                </div>

                <div key={activeSection} className="animate-in fade-in zoom-in-95 duration-300">
                    {activeSection === 'jtbd' && (
                        <JTBDView
                            data={brand.structuredJTBD}
                            htmlData={jtbdHtmlData}
                        />
                    )}

                    {activeSection === 'audience' && (
                        brand.structuredAudience ? (
                            <AudienceView data={brand.structuredAudience} />
                        ) : (
                            <div className="card-wood p-8">
                                <div className="prose text-lg text-ink-brown" dangerouslySetInnerHTML={{ __html: brand.audience }} />
                            </div>
                        )
                    )}

                    {activeSection === 'insights' && (
                        brand.structuredInsights && brand.structuredInsights.length > 0 ? (
                            <InsightsExplorer insights={brand.structuredInsights} />
                        ) : (
                            <div className="card-wood p-8">
                                <div className="prose text-lg text-ink-brown" dangerouslySetInnerHTML={{ __html: brand.insights }} />
                            </div>
                        )
                    )}

                    {activeSection === 'quiz' && (
                        <QuizView questions={brand.quiz} />
                    )}
                </div>
            </div>
        </div>
    );
}
