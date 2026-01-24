"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface BrandDescriptionProps {
    paragraphs: string[];
}

export default function BrandDescription({ paragraphs }: BrandDescriptionProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    if (!paragraphs || paragraphs.length === 0) return null;

    return (
        <div className="bg-white/50 backdrop-blur-sm border border-ink/10 rounded-2xl p-8 text-left shadow-sm">
            {/* First Paragraph - Always Visible */}
            <p className="text-lg text-ink leading-relaxed font-serif mb-4">
                {paragraphs[0]}
            </p>

            {/* Expanded Content */}
            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="space-y-4">
                    {paragraphs.slice(1).map((para, idx) => (
                        <p key={idx} className="text-lg text-ink leading-relaxed font-serif">
                            {para}
                        </p>
                    ))}
                </div>
            </div>

            {/* Toggle Button */}
            {paragraphs.length > 1 && (
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="flex items-center gap-2 text-primary font-bold mt-4 hover:opacity-80 transition-opacity mx-auto md:mx-0"
                >
                    {isExpanded ? (
                        <>
                            Thu gọn <ChevronUp size={20} />
                        </>
                    ) : (
                        <>
                            Xem thêm <ChevronDown size={20} />
                        </>
                    )}
                </button>
            )}
        </div>
    );
}
