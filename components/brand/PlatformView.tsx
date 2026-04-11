"use client";

import React from "react";
import { BrandPlatform } from "@/lib/types";
import { Shield, Target, Sun, Flame, Anchor, Compass } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";

interface PlatformViewProps {
    platform?: BrandPlatform;
}

export default function PlatformView({ platform }: PlatformViewProps) {
    if (!platform) {
        return (
            <div className="card-wood p-12 text-center">
                <p className="text-ink-brown/50 italic mb-4">No brand platform data available yet.</p>
                <div className="h-2 w-24 bg-caramel-walnut/20 mx-auto rounded-full" />
            </div>
        );
    }

    const items = [
        {
            title: "Brand Archetype",
            content: platform.archetype,
            icon: Shield,
            color: "text-amber-700",
            bg: "bg-amber-50"
        },
        {
            title: "Vision",
            content: platform.vision,
            icon: Target,
            color: "text-blue-700",
            bg: "bg-blue-50"
        },
        {
            title: "Mission",
            content: platform.mission,
            icon: Compass,
            color: "text-emerald-700",
            bg: "bg-emerald-50"
        },
        {
            title: "Brand Essence",
            content: platform.essence,
            icon: Flame,
            color: "text-orange-700",
            bg: "bg-orange-50"
        }
    ].filter(item => item.content);

    return (
        <div className="space-y-12 animate-in fade-in duration-700">
            {/* Tagline / Hero area */}
            {platform.tagline && (
                <div className="text-center max-w-3xl mx-auto mb-16 px-4">
                    <div className="inline-block mb-4">
                        <div className="h-px w-12 bg-caramel-walnut/30 mx-auto mb-4" />
                        <span className="text-xs uppercase tracking-[0.3em] text-ink-brown/40 font-bold">Brand Tagline</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-serif text-ink-brown font-medium italic leading-tight">
                        "{platform.tagline}"
                    </h2>
                </div>
            )}

            {/* Grid of Platform Elements */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
                {items.map((item, index) => {
                    const Icon = item.icon;
                    return (
                        <div 
                            key={index} 
                            className="card-wood group hover-warm-glow transition-all duration-500 overflow-hidden border-none shadow-sm flex flex-col h-full"
                        >
                            <div className={`p-6 border-b border-caramel-walnut/10 flex items-center gap-4 ${item.bg}/30`}>
                                <div className={`p-3 rounded-xl ${item.bg} ${item.color} shadow-inner`}>
                                    <Icon size={24} />
                                </div>
                                <h3 className="text-xl font-serif font-bold text-ink-brown">{item.title}</h3>
                            </div>
                            <div className="p-8 flex-grow">
                                <p className="text-lg text-ink-brown/80 leading-relaxed font-sans">
                                    {item.content}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Core Values */}
            {platform.values && platform.values.length > 0 && (
                <div className="mt-16 pt-12 border-t border-caramel-walnut/10 px-4">
                    <div className="flex items-center gap-3 mb-8">
                        <Anchor className="text-caramel-walnut" size={28} />
                        <h3 className="text-2xl font-serif font-bold text-ink-brown">Core Values</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {platform.values.map((value, idx) => (
                            <div 
                                key={idx} 
                                className="bg-white/40 border border-caramel-walnut/10 p-6 rounded-xl hover:bg-white/60 transition-colors duration-300"
                            >
                                <div className="flex items-start gap-4">
                                    <span className="text-caramel-walnut/30 font-serif text-4xl font-bold leading-none">0{idx + 1}</span>
                                    <p className="text-lg text-ink-brown/90 font-medium pt-1">{value}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
