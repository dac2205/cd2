"use client";

import React, { useState, useEffect } from "react";
import { Question } from "@/components/practice/QuizTypes";
import { cn } from "@/lib/utils";
import { CheckCircle2, XCircle, ArrowRight, RotateCcw, Trophy, Sparkles, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

interface BrandTaskRunnerProps {
    questions: Question[];
    title: string;
    backLink: string;
}

export default function BrandTaskRunner({ questions, title, backLink }: BrandTaskRunnerProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const [score, setScore] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
    const [shuffledInternalIndices, setShuffledInternalIndices] = useState<number[]>([]);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (questions.length > 0 && currentIndex < questions.length) {
            setIsAnimating(true);
            const timer = setTimeout(() => setIsAnimating(false), 300);

            const currentQ = questions[currentIndex];
            const indices = currentQ.options.map((_, i) => i);
            // Shuffle
            const shuffled = [...indices].sort(() => Math.random() - 0.5);

            setShuffledInternalIndices(shuffled);
            setShuffledOptions(shuffled.map(i => currentQ.options[i]));

            setSelectedOption(null);
            setShowFeedback(false);

            return () => clearTimeout(timer);
        }
    }, [currentIndex, questions]);

    const handleSelectOption = (shuffledIndex: number) => {
        if (showFeedback) return;
        const originalIndex = shuffledInternalIndices[shuffledIndex];
        setSelectedOption(originalIndex);
        setShowFeedback(true);

        if (originalIndex === questions[currentIndex].correctAnswer) {
            setScore(s => s + 1);
        }
    };

    const handleNext = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(c => c + 1);
        } else {
            setIsFinished(true);
        }
    };

    const restart = () => {
        setIsFinished(false);
        setCurrentIndex(0);
        setScore(0);
        setSelectedOption(null);
        setShowFeedback(false);
    };

    if (!questions.length) return <div className="text-center py-12">Loading task data...</div>;

    if (isFinished) {
        const passRate = (score / questions.length) * 100;
        return (
            <div className="max-w-xl mx-auto py-12 animate-slide-in">
                <div className="text-center space-y-6">
                    <div className="mb-8 flex justify-center">
                        <div className="relative">
                            <div className="absolute inset-0 bg-honey-oak/20 rounded-full blur-xl scale-150"></div>
                            <Trophy className="w-24 h-24 text-honey-oak relative z-10 animate-bounce" />
                        </div>
                    </div>

                    <h2 className="text-4xl font-serif font-bold text-ink-brown mb-2">
                        Task Complete!
                    </h2>

                    <div className="bg-paper-white/50 backdrop-blur-sm rounded-2xl p-6 border border-maple-cream inline-block min-w-[300px]">
                        <p className="text-ink-brown/80 text-lg mb-2 uppercase tracking-widest text-xs font-bold">Accuracy</p>
                        <div className="text-5xl font-mono font-bold text-ink-brown mb-4">
                            {Math.round(passRate)}%
                        </div>
                        <p className="text-ink-brown/60 text-sm">
                            Correct: <span className="font-bold text-ink-brown">{score}/{questions.length}</span>
                        </p>
                    </div>

                    <div className="flex flex-col gap-4 max-w-xs mx-auto pt-8">
                        <Link href={backLink}>
                            <Button variant="outline" className="w-full h-14 text-lg rounded-xl border-2 border-ink-brown text-ink-brown hover:bg-ink-brown hover:text-white transition-all">
                                <ArrowLeft className="mr-2 w-5 h-5" /> Back to Menu
                            </Button>
                        </Link>
                        <Button variant="ghost" onClick={restart} className="w-full rounded-xl text-ink-brown/70 hover:text-ink-brown hover:bg-maple-cream/50">
                            Run Again
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    const currentQ = questions[currentIndex];

    return (
        <div className={`max-w-3xl mx-auto transition-opacity duration-300 ${isAnimating ? 'opacity-50' : 'opacity-100'}`}>
            {/* Header */}
            <div className="mb-10 flex items-end justify-between border-b pb-6 border-maple-cream">
                <div className="space-y-2">
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-honey-oak">
                        {title}
                    </span>
                    <div className="flex items-baseline gap-2 text-ink-brown">
                        <span className="text-3xl font-mono font-bold">0{currentIndex + 1}</span>
                        <span className="text-lg text-ink-brown/60 font-mono">/ 0{questions.length}</span>
                    </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center gap-2 px-4 py-2 bg-maple-cream/30 rounded-full border border-maple-cream">
                        <Sparkles className="w-4 h-4 text-honey-oak" />
                        <span className="font-mono font-bold text-ink-brown">{score}00 XP</span>
                    </div>
                </div>
            </div>

            {/* Question Card */}
            <div className="min-h-[400px] flex flex-col">
                <h2 className="text-2xl md:text-3xl font-serif font-medium mb-10 leading-relaxed text-ink-brown">
                    {currentQ.question}
                </h2>

                {/* Options */}
                <div className="space-y-4 flex-1">
                    {shuffledOptions.map((option, index) => {
                        const originalIndex = shuffledInternalIndices[index];
                        const isSelected = selectedOption === originalIndex;
                        const isCorrect = originalIndex === currentQ.correctAnswer;

                        let containerClasses = "w-full text-left p-5 md:p-6 rounded-2xl border-2 transition-all duration-300 relative group overflow-hidden";
                        let textClasses = "text-lg md:text-xl relative z-10 transition-colors duration-300";
                        let icon = null;

                        if (showFeedback) {
                            if (isCorrect) {
                                containerClasses += " bg-[#E8F5E9] border-[#4CAF50] shadow-sm";
                                textClasses += " text-[#1B5E20] font-medium";
                                icon = <CheckCircle2 className="absolute right-6 top-1/2 -translate-y-1/2 w-6 h-6 text-[#4CAF50]" />;
                            } else if (isSelected) {
                                containerClasses += " bg-[#FFEBEE] border-[#EF5350]";
                                textClasses += " text-[#C62828]";
                                icon = <XCircle className="absolute right-6 top-1/2 -translate-y-1/2 w-6 h-6 text-[#EF5350]" />;
                            } else {
                                containerClasses += " border-transparent bg-gray-50 opacity-40 grayscale";
                                textClasses += " text-gray-400";
                            }
                        } else {
                            if (isSelected) {
                                containerClasses += " bg-honey-oak/10 border-honey-oak shadow-md -translate-y-0.5";
                                textClasses += " text-ink-brown";
                            } else {
                                containerClasses += " bg-white border-maple-cream hover:border-honey-oak hover:shadow-lg hover:-translate-y-1";
                                textClasses += " text-ink-brown/80 group-hover:text-ink-brown";
                            }
                        }

                        return (
                            <button
                                key={index}
                                onClick={() => handleSelectOption(index)}
                                disabled={showFeedback}
                                className={containerClasses}
                            >
                                <span className={textClasses}>{option}</span>
                                {icon}
                            </button>
                        );
                    })}
                </div>

                {/* Feedback Area */}
                {showFeedback && (
                    <div className="mt-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className={cn(
                            "p-6 md:p-8 rounded-2xl border-l-4 shadow-lg mb-8 relative overflow-hidden",
                            selectedOption === currentQ.correctAnswer
                                ? "bg-[#F1F8E9] border-[#4CAF50] text-[#33691E]"
                                : "bg-[#FFF3E0] border-[#FF9800] text-[#E65100]"
                        )}>
                            <div className="relative z-10">
                                <p className="font-bold uppercase tracking-wider text-xs mb-3 opacity-70">
                                    Analysis
                                </p>
                                <p className="text-lg md:text-xl leading-relaxed font-serif">
                                    {selectedOption === currentQ.correctAnswer
                                        ? currentQ.feedback.correct
                                        : currentQ.feedback.incorrect}
                                </p>
                            </div>
                            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-current opacity-5 rounded-full blur-2xl"></div>
                        </div>

                        <Button
                            onClick={handleNext}
                            className="w-full h-16 text-xl font-medium rounded-2xl bg-ink-brown hover:bg-ink-brown/90 text-paper-white shadow-xl shadow-ink-brown/30 transition-all hover:-translate-y-1 hover:scale-[1.01]"
                        >
                            {currentIndex === questions.length - 1 ? "Finish Task" : "Next Situation"} <ArrowRight className="ml-3 w-6 h-6" />
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
