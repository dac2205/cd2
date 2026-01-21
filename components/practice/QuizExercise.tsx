"use client";

import React, { useState, useEffect } from "react";
import { Exercise, Question } from "@/components/practice/QuizTypes";
import { cn } from "@/lib/utils";
import { CheckCircle2, XCircle, ArrowRight, RotateCcw, HelpCircle, Trophy } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from 'next/link';
// import Confetti from 'react-confetti'; // Optional for later

interface QuizExerciseProps {
    exercise: Exercise;
}

export default function QuizExercise({ exercise }: QuizExerciseProps) {
    // Rounds Logic:
    // Round 1: Level 1 questions (5)
    // Round 2: Level 2 questions (10)
    // Round 3: All 15 questions mixed (Review)

    const [currentRound, setCurrentRound] = useState<1 | 2 | 3>(1);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const [score, setScore] = useState(0);
    const [isRoundFinished, setIsRoundFinished] = useState(false);
    const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
    const [shuffledInternalIndices, setShuffledInternalIndices] = useState<number[]>([]); // To map shuffled options back to original indices

    // Initialize Round
    useEffect(() => {
        let roundQuestions: Question[] = [];
        if (currentRound === 1) {
            roundQuestions = exercise.levels.find(l => l.level === 1)?.questions || [];
        } else if (currentRound === 2) {
            roundQuestions = exercise.levels.find(l => l.level === 2)?.questions || [];
        } else {
            // Round 3: All questions
            const lev1 = exercise.levels.find(l => l.level === 1)?.questions || [];
            const lev2 = exercise.levels.find(l => l.level === 2)?.questions || [];
            roundQuestions = [...lev1, ...lev2].sort(() => Math.random() - 0.5); // Shuffle for Round 3
        }

        setQuestions(roundQuestions);
        setScore(0);
        setCurrentIndex(0);
        setIsRoundFinished(false);
        setSelectedOption(null);
        setShowFeedback(false);
    }, [currentRound, exercise]);

    // Shuffle Options for Current Question
    useEffect(() => {
        if (questions.length > 0 && currentIndex < questions.length) {
            const currentQ = questions[currentIndex];
            const indices = currentQ.options.map((_, i) => i);
            // Shuffle indices
            const shuffled = [...indices].sort(() => Math.random() - 0.5);

            setShuffledInternalIndices(shuffled);
            setShuffledOptions(shuffled.map(i => currentQ.options[i]));

            setSelectedOption(null);
            setShowFeedback(false);
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

    const handlNext = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(c => c + 1);
        } else {
            setIsRoundFinished(true);
        }
    };

    const handleNextRound = () => {
        if (currentRound < 3) {
            setCurrentRound(r => (r + 1) as any);
        }
    };

    const restart = () => {
        setCurrentRound(1);
    };

    if (!questions.length) return <div>Đang tải dữ liệu...</div>;

    const currentQ = questions[currentIndex];
    // Calculate Progress
    const progress = ((currentIndex) / questions.length) * 100;

    if (isRoundFinished) {
        const passRate = (score / questions.length) * 100;
        const isPass = passRate >= 80; // 80% to pass

        return (
            <div className="max-w-2xl mx-auto p-6 animate-slide-in">
                <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-zinc-200 dark:border-zinc-800 shadow-xl text-center">
                    <div className="mb-6 flex justify-center">
                        {isPass ? <Trophy className="w-16 h-16 text-yellow-500" /> : <RotateCcw className="w-16 h-16 text-blue-500" />}
                    </div>

                    <h2 className="text-3xl font-bold mb-2">
                        {currentRound === 3 ? "Hoàn thành xuất sắc!" : `Hoàn thành Vòng ${currentRound}`}
                    </h2>

                    <p className="text-zinc-500 mb-8">
                        Bạn trả lời đúng <span className="font-bold text-zinc-900 dark:text-zinc-100">{score}/{questions.length}</span> câu.
                    </p>

                    <div className="flex flex-col gap-4 max-w-xs mx-auto">
                        {currentRound < 3 ? (
                            <Button onClick={handleNextRound} className="w-full h-12 text-lg rounded-full">
                                Tiếp tục Vòng {currentRound + 1} <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        ) : (
                            <Link href="/practice/jtbd">
                                <Button variant="outline" className="w-full h-12 text-lg rounded-full">
                                    Về trang chủ bài tập
                                </Button>
                            </Link>
                        )}

                        <Button variant="ghost" onClick={restart} className="w-full rounded-full">
                            Làm lại từ đầu
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto p-4 sm:p-6">
            {/* Header */}
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <span className="text-sm font-medium text-zinc-500 uppercase tracking-wider">
                        Vòng {currentRound} • Câu {currentIndex + 1}/{questions.length}
                    </span>
                    <div className="h-1.5 w-32 bg-zinc-100 rounded-full mt-2 overflow-hidden">
                        <div className="h-full bg-blue-600 transition-all duration-300" style={{ width: `${progress}%` }} />
                    </div>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-full">
                    <Trophy className="w-4 h-4 text-yellow-500" />
                    <span className="font-bold text-sm">{score}</span>
                </div>
            </div>

            {/* Question Card */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 sm:p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm min-h-[400px] flex flex-col">
                <h2 className="text-xl sm:text-2xl font-semibold mb-8 leading-relaxed">
                    {currentQ.question}
                </h2>

                {/* Options */}
                <div className="space-y-3 flex-1">
                    {shuffledOptions.map((option, index) => {
                        const originalIndex = shuffledInternalIndices[index];
                        const isSelected = selectedOption === originalIndex;
                        const isCorrect = originalIndex === currentQ.correctAnswer;

                        let variantClass = "hover:bg-zinc-50 border-zinc-200 dark:border-zinc-700";

                        if (showFeedback) {
                            if (isCorrect) variantClass = "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800";
                            else if (isSelected) variantClass = "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800";
                            else variantClass = "opacity-50 grayscale";
                        } else if (isSelected) {
                            variantClass = "border-blue-500 bg-blue-50 dark:bg-blue-900/20";
                        }

                        return (
                            <button
                                key={index}
                                onClick={() => handleSelectOption(index)}
                                disabled={showFeedback}
                                className={cn(
                                    "w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center gap-4 group",
                                    variantClass
                                )}
                            >
                                <div className={cn(
                                    "w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors",
                                    showFeedback && isCorrect ? "border-green-500 bg-green-500 text-white" :
                                        showFeedback && isSelected ? "border-red-500 bg-red-500 text-white" :
                                            "border-zinc-300 group-hover:border-blue-400"
                                )}>
                                    {showFeedback && isCorrect && <CheckCircle2 className="w-4 h-4" />}
                                    {showFeedback && isSelected && !isCorrect && <XCircle className="w-4 h-4" />}
                                </div>
                                <span className="text-lg">{option}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Feedback Area */}
                {showFeedback && (
                    <div className="mt-8 animate-in fade-in slide-in-from-bottom-4">
                        <div className={cn(
                            "p-4 rounded-xl mb-6",
                            selectedOption === currentQ.correctAnswer
                                ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200"
                                : "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200"
                        )}>
                            <p className="font-semibold mb-1">
                                {selectedOption === currentQ.correctAnswer ? "Chính xác! 🎉" : "Chưa chính xác 😔"}
                            </p>
                            <p>
                                {selectedOption === currentQ.correctAnswer
                                    ? currentQ.feedback.correct
                                    : currentQ.feedback.incorrect}
                            </p>
                        </div>

                        <Button onClick={handlNext} className="w-full h-12 text-lg rounded-full animate-pulse shadow-lg shadow-blue-500/20">
                            {currentIndex === questions.length - 1 ? "Hoàn thành Vòng" : "Câu tiếp theo"} <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
