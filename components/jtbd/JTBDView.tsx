"use client";

import React, { useState } from "react";
import { JTBDData, JobItem } from "@/lib/types";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/Popover";
import { BookOpen, Heart, Users, Sparkles, HelpCircle, ChevronDown, ChevronUp } from "lucide-react";

interface JTBDViewProps {
    data?: JTBDData;
    htmlData?: Record<TabType, string>;
}

type TabType = 'functional' | 'emotional' | 'social' | 'other';

const DEFINITIONS = {
    "Functional Jobs": "Việc cần làm - Nhiệm vụ thực tế khách hàng muốn hoàn thành.",
    "Emotional Jobs": "Cảm xúc mong muốn - Khách hàng muốn cảm thấy thế nào khi thực hiện công việc đó.",
    "Social Jobs": "Hình ảnh xã hội - Khách hàng muốn người khác nhìn nhận mình ntn.",
    "Other Jobs": "Việc liên quan - Các công việc phụ trợ hoặc mục tiêu dài hạn.",
    "Situation": "Tình huống - Hoàn cảnh cụ thể thời điểm công việc nảy sinh.",
    "Context": "Bối cảnh - Nền tảng rộng hơn hoặc các ràng buộc xung quanh.",
    "Triggers": "Yếu tố kích hoạt - Sự kiện thúc đẩy người dùng hành động NGAY LÚC NÀY.",
    "Desired Outcomes": "Kết quả mong muốn - Thước đo thành công. Làm sao biết công việc đã xong?"
};

const ConceptTooltip = ({ title, description, color = "hsl(var(--ink-brown) / 0.6)" }: { title: string, description: string, color?: string }) => (
    <Popover>
        <PopoverTrigger asChild>
            <span className="cursor-pointer hover:opacity-80 transition-opacity inline-flex items-center" style={{ marginLeft: "0.5rem" }}>
                <HelpCircle size={14} color={color} />
            </span>
        </PopoverTrigger>
        <PopoverContent style={{ width: "300px", zIndex: 9999 }}>
            <div style={{ padding: "0.5rem" }}>
                <h4 style={{ fontSize: "0.875rem", fontWeight: 700, marginBottom: "0.25rem", color: "hsl(var(--primary))" }}>{title}</h4>
                <p style={{ fontSize: "0.875rem", lineHeight: "1.5", color: "hsl(var(--ink-brown))" }}>{description}</p>
            </div>
        </PopoverContent>
    </Popover>
);

const JobCard = ({ job }: { job: JobItem }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const hasDeepDive = job.situation || job.context || (job.triggers && job.triggers.length > 0) || (job.desiredOutcome && job.desiredOutcome.length > 0);

    return (
        <div className="card-wood" style={{
            padding: "2.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem"
        }}>
            <div>
                <h3 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>{job.title}</h3>
                <p style={{ fontSize: "1.125rem", lineHeight: "1.6", color: "hsl(var(--ink-brown) / 0.8)" }}>
                    {job.description}
                </p>
            </div>

            {hasDeepDive && (
                <div style={{ marginTop: "0.5rem" }}>
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            fontSize: "0.875rem",
                            fontWeight: 600,
                            color: "hsl(var(--primary))",
                            cursor: "pointer",
                            background: "none",
                            border: "none",
                            padding: 0
                        }}
                    >
                        {isExpanded ? "Collapse Details" : "View Deep Dive"}
                        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>

                    {isExpanded && (
                        <div className="animate-slide-in" style={{
                            marginTop: "1.5rem",
                            paddingTop: "1.5rem",
                            borderTop: "1px dashed hsl(var(--border))",
                            display: "grid",
                            gap: "1.5rem"
                        }}>
                            {/* Situation & Context */}
                            {(job.situation || job.context) && (
                                <div style={{ display: "grid", gap: "1rem" }}>
                                    {job.situation && (
                                        <div>
                                            <div style={{ display: "flex", alignItems: "center", marginBottom: "0.25rem" }}>
                                                <span style={{ fontSize: "0.75rem", textTransform: "uppercase", fontWeight: 700, color: "hsl(var(--ink-brown) / 0.5)", letterSpacing: "0.05em" }}>Situation</span>
                                                <ConceptTooltip title="Situation" description={DEFINITIONS["Situation"]} />
                                            </div>
                                            <p style={{ fontSize: "0.95rem", fontStyle: "italic", color: "hsl(var(--ink-brown))" }}>"{job.situation}"</p>
                                        </div>
                                    )}
                                    {job.context && (
                                        <div>
                                            <div style={{ display: "flex", alignItems: "center", marginBottom: "0.25rem" }}>
                                                <span style={{ fontSize: "0.75rem", textTransform: "uppercase", fontWeight: 700, color: "hsl(var(--ink-brown) / 0.5)", letterSpacing: "0.05em" }}>Context</span>
                                                <ConceptTooltip title="Context" description={DEFINITIONS["Context"]} />
                                            </div>
                                            <p style={{ fontSize: "0.95rem", color: "hsl(var(--ink-brown))" }}>{job.context}</p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Triggers */}
                            {job.triggers && job.triggers.length > 0 && (
                                <div>
                                    <div style={{ display: "flex", alignItems: "center", marginBottom: "0.25rem" }}>
                                        <span style={{ fontSize: "0.75rem", textTransform: "uppercase", fontWeight: 700, color: "hsl(var(--accent))", letterSpacing: "0.05em" }}>Triggers</span>
                                        <ConceptTooltip title="Triggers" description={DEFINITIONS["Triggers"]} color="hsl(var(--accent))" />
                                    </div>
                                    <ul style={{ margin: 0, paddingLeft: "1.25rem", color: "hsl(var(--ink-brown) / 0.8)", fontSize: "0.95rem" }}>
                                        {job.triggers.map((t, idx) => (
                                            <li key={idx} style={{ marginBottom: "0.25rem" }}>{t}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Desired Outcomes */}
                            {job.desiredOutcome && job.desiredOutcome.length > 0 && (
                                <div>
                                    <div style={{ display: "flex", alignItems: "center", marginBottom: "0.25rem" }}>
                                        <span style={{ fontSize: "0.75rem", textTransform: "uppercase", fontWeight: 700, color: "hsl(var(--primary))", letterSpacing: "0.05em" }}>Desired Outcomes</span>
                                        <ConceptTooltip title="Desired Outcomes" description={DEFINITIONS["Desired Outcomes"]} color="hsl(var(--primary))" />
                                    </div>
                                    <ul style={{ margin: 0, paddingLeft: "1.25rem", color: "hsl(var(--ink-brown) / 0.8)", fontSize: "0.95rem" }}>
                                        {job.desiredOutcome.map((o, idx) => (
                                            <li key={idx} style={{ marginBottom: "0.25rem" }}>{o}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default function JTBDView({ data, htmlData }: JTBDViewProps) {
    const [activeTab, setActiveTab] = useState<TabType>('functional');

    const tabs: { key: TabType; label: string; icon: React.ElementType; color: string }[] = [
        { key: "functional", label: "Functional Jobs", icon: BookOpen, color: "hsl(var(--ink-brown))" },
        { key: "emotional", label: "Emotional Jobs", icon: Heart, color: "hsl(var(--primary))" },
        { key: "social", label: "Social Jobs", icon: Users, color: "hsl(var(--accent))" },
    ];

    const currentJobs = data?.[activeTab] || [];
    const currentHtml = htmlData?.[activeTab];

    return (
        <div className="animate-slide-in">
            {/* Tabs */}
            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "1rem",
                marginBottom: "3rem"
            }}>
                {tabs.map((tab) => {
                    const isActive = activeTab === tab.key;
                    const Icon = tab.icon;
                    return (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className="hover-warm-glow"
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "0.75rem",
                                padding: "1.5rem",
                                border: `2px solid ${isActive ? tab.color : "hsl(var(--border))"}`,
                                borderRadius: "12px",
                                backgroundColor: isActive ? "hsl(var(--paper-white))" : "transparent",
                                color: isActive ? tab.color : "hsl(var(--ink-brown) / 0.6)",
                                cursor: "pointer",
                                transition: "all 0.3s ease",
                                position: "relative"
                            }}
                        >
                            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                <Icon size={24} />
                                <div onClick={(e) => e.stopPropagation()}>
                                    <ConceptTooltip
                                        title={tab.label}
                                        description={DEFINITIONS[tab.label as keyof typeof DEFINITIONS] || ""}
                                        color={isActive ? tab.color : "hsl(var(--ink-brown) / 0.4)"}
                                    />
                                </div>
                            </div>
                            <span style={{ fontWeight: 600, fontSize: "1rem" }}>{tab.label}</span>
                        </button>
                    )
                })}
            </div>

            {/* Content Area */}
            <div style={{ minHeight: "300px" }}>
                <div style={{ marginBottom: "2rem", textAlign: "center" }}>
                    <h2 style={{
                        fontSize: "2rem",
                        color: tabs.find(t => t.key === activeTab)?.color,
                        marginBottom: "0.5rem",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.5rem"
                    }}>
                        {tabs.find(t => t.key === activeTab)?.label}
                    </h2>
                    <p className="text-subtext">3 Key Jobs requiring attention</p>
                </div>

                {currentJobs.length > 0 ? (
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                        gap: "2rem"
                    }}>
                        {currentJobs.map((job) => (
                            <JobCard key={job.id} job={job} />
                        ))}
                    </div>
                ) : currentHtml ? (
                    <div className="card-wood" style={{ padding: "2.5rem" }}>
                        <div className="prose" dangerouslySetInnerHTML={{ __html: currentHtml }} />
                    </div>
                ) : (
                    <div style={{ textAlign: "center", padding: "3rem", color: "hsl(var(--ink-brown) / 0.5)" }}>
                        No data available for this section.
                    </div>
                )}
            </div>
        </div>
    );
}
