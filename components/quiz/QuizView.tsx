"use client";

import React, { useState, useEffect } from "react";
import { QuizQuestion } from "@/lib/types";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/Popover";
import { HelpCircle } from "lucide-react";

interface QuizViewProps {
    questions: QuizQuestion[];
}

export default function QuizView({ questions }: QuizViewProps) {
    const [shuffledQuestions, setShuffledQuestions] = useState<QuizQuestion[]>([]);
    const [shuffledOptions, setShuffledOptions] = useState<Record<string, string[]>>({});

    useEffect(() => {
        // Shuffle questions
        const newQuestions = [...questions].sort(() => Math.random() - 0.5);
        setShuffledQuestions(newQuestions);

        // Shuffle options for each question
        const newOptions: Record<string, string[]> = {};
        newQuestions.forEach(q => {
            newOptions[q.id] = [...q.options].sort(() => Math.random() - 0.5);
        });
        setShuffledOptions(newOptions);
    }, [questions]);

    if (shuffledQuestions.length === 0) {
        return <div style={{ padding: "2rem", textAlign: "center" }}>Đang tải câu hỏi...</div>;
    }

    return (
        <div className="card-wood" style={{ padding: "2rem" }}>
            <div style={{ display: "grid", gap: "2rem" }}>
                {shuffledQuestions.map((q, index) => (
                    <div key={q.id} className="animate-slide-in" style={{
                        borderBottom: index < shuffledQuestions.length - 1 ? "1px solid hsl(var(--border))" : "none",
                        paddingBottom: index < shuffledQuestions.length - 1 ? "2rem" : "0"
                    }}>
                        <div style={{ display: "flex", alignItems: "start", justifyContent: "space-between", marginBottom: "1rem" }}>
                            <h3 style={{ fontSize: "1.25rem", margin: 0 }}>{index + 1}. {q.question}</h3>
                            <Popover>
                                <PopoverTrigger style={{ cursor: "pointer", color: "hsl(var(--primary))", display: "flex", alignItems: "center", gap: "0.25rem" }}>
                                    <HelpCircle size={18} /> <span style={{ fontSize: "0.875rem" }}>Gợi ý</span>
                                </PopoverTrigger>
                                <PopoverContent>
                                    <p style={{ fontSize: "0.875rem" }}>{q.explanation || "Chọn câu trả lời đúng nhất."}</p>
                                </PopoverContent>
                            </Popover>
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                            {shuffledOptions[q.id]?.map((option, optIndex) => (
                                <label key={optIndex} style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "1rem",
                                    padding: "1rem",
                                    borderRadius: "8px",
                                    backgroundColor: "hsl(var(--background))",
                                    cursor: "pointer",
                                    transition: "all 0.2s"
                                }} className="hover-warm-glow">
                                    <input type="radio" name={`question-${q.id}`} style={{ width: "1.25rem", height: "1.25rem", accentColor: "hsl(var(--primary))" }} />
                                    <span style={{ fontSize: "1rem" }}>{option}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                ))}
                <div style={{ marginTop: "2rem", display: "flex", justifyContent: "center" }}>
                    <button style={{
                        backgroundColor: "hsl(var(--primary))",
                        color: "white",
                        padding: "0.75rem 2rem",
                        borderRadius: "999px",
                        border: "none",
                        fontSize: "1rem",
                        fontWeight: 600,
                        cursor: "pointer"
                    }}>
                        Nộp bài
                    </button>
                </div>
            </div>
        </div>
    );
}
