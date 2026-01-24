"use client";

import React, { useState, useEffect, useRef } from "react";
import { QuizQuestion } from "@/lib/types";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/Popover";
import { HelpCircle, ChevronLeft, ArrowRight, CheckCircle2, XCircle, Trophy, Clock, User } from "lucide-react";
import confetti from "canvas-confetti";

import { useAuth } from "@/lib/auth"; // Import useAuth

interface QuizViewProps {
    quizzes: { id: string, questions: QuizQuestion[] }[];
}

export default function QuizView({ quizzes }: QuizViewProps) {
    const { user } = useAuth(); // Get user from auth context
    const userDisplayName = user?.user_metadata?.full_name || user?.email || "Bạn";

    // --- Configuration ---
    const ROUNDS = [
        { id: 1, count: 5, label: "Khởi động" },
        { id: 2, count: 5, label: "Tăng tốc" },
        { id: 3, count: 10, label: "Về đích" }
    ];

    // --- State: Game Flow ---
    const [gameState, setGameState] = useState<'selection' | 'playing'>('selection');

    // --- State: Data ---
    const [questions, setQuestions] = useState<QuizQuestion[]>([]); // Selected Quiz Questions
    const [activeQuizId, setActiveQuizId] = useState<string>("");
    const [sessionQuestions, setSessionQuestions] = useState<QuizQuestion[]>([]); // Shuffled & Processed
    const [currentRound, setCurrentRound] = useState(1);
    const [roundQuestions, setRoundQuestions] = useState<QuizQuestion[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    // --- State: Answers & UI ---
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [answers, setAnswers] = useState<Record<string, number>>({});
    const [isConfirmed, setIsConfirmed] = useState(false);

    // --- State: Progression ---
    const [roundComplete, setRoundComplete] = useState(false);
    const [quizComplete, setQuizComplete] = useState(false);

    // --- State: Review Mode ---
    const [showDetails, setShowDetails] = useState(false);


    // --- Logic: Randomization ---
    const shuffleArray = <T,>(array: T[]): T[] => {
        const newArr = [...array];
        for (let i = newArr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
        }
        return newArr;
    };

    const initSession = () => {
        if (!quizzes || quizzes.length === 0) return;

        // Select a random quiz if we haven't or just re-select
        const randomQuizIndex = Math.floor(Math.random() * quizzes.length);
        const selectedQuiz = quizzes[randomQuizIndex];
        const selectedQuestions = selectedQuiz.questions;

        setActiveQuizId(selectedQuiz.id);

        // 1. Process Questions: Shuffle Options & Fix Answer Index
        const processedQuestions = selectedQuestions.map(q => {
            const originalOptions = q.options || ["Functional Job", "Emotional Job", "Social Job"];

            // Create pairs of [optionText, originalIndex]
            const optionPairs = originalOptions.map((opt, idx) => ({ txt: opt, originalIdx: idx }));

            // Shuffle
            const shuffledPairs = shuffleArray(optionPairs);

            // Reconstruct options array
            const newOptions = shuffledPairs.map(p => p.txt);

            // Find new correct index
            // The original Correct Index (e.g. 0) needs to be found in the shuffled pairs
            // We look for the pair where pair.originalIdx === q.correctAnswer
            const newCorrectAnswer = shuffledPairs.findIndex(p => p.originalIdx === q.correctAnswer);

            return {
                ...q,
                options: newOptions,
                correctAnswer: newCorrectAnswer
            };
        });

        // 2. Shuffle the Questions Order
        const shuffledQuestions = shuffleArray(processedQuestions);

        setSessionQuestions(shuffledQuestions);
        setGameState('playing');
        setCurrentRound(1);
        setCurrentIndex(0);
        setAnswers({});
        setRoundComplete(false);
        setQuizComplete(false);
        setIsConfirmed(false);
        setSelectedOption(null);
    };


    // --- Effects ---

    // 1. Initialize Round (Watch Session Questions & Round Change)
    useEffect(() => {
        if (gameState !== 'playing' || sessionQuestions.length === 0) return;

        // Slice logic
        let start = 0;
        if (currentRound === 2) start = 5;
        if (currentRound === 3) start = 10;
        const count = ROUNDS.find(r => r.id === currentRound)?.count || 5;
        const end = start + count;

        setRoundQuestions(sessionQuestions.slice(start, end));
        setCurrentIndex(0);
        setSelectedOption(null);
        setIsConfirmed(false);
        setRoundComplete(false);
        setShowDetails(false);
    }, [currentRound, sessionQuestions, gameState]);




    // --- Helpers ---
    const calculateScore = (currentQList: QuizQuestion[]) => {
        let correct = 0;
        currentQList.forEach(q => {
            if (answers[q.id] === q.correctAnswer) correct++;
        });
        return {
            correct,
            total: currentQList.length,
            percent: Math.round((correct / currentQList.length) * 100)
        };
    };

    // --- Handlers ---
    const handleOptionSelect = (optionIndex: number) => {
        if (isConfirmed) return;
        setSelectedOption(optionIndex);
    };

    const handleConfirm = () => {
        if (selectedOption === null) return;

        setIsConfirmed(true);
        setAnswers(prev => ({ ...prev, [currentQuestion!.id]: selectedOption }));

        // Check correctness immediately for Sudden Death
        // currentQuestion.correctAnswer is already the *shuffled* index
        const isCorrect = selectedOption === currentQuestion.correctAnswer;

        // Wait and move to next question regardless of correctness
        setTimeout(() => {
            handleNext();
        }, 500);
    };

    const handleNext = () => {
        if (currentIndex < roundQuestions.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setSelectedOption(null);
            setIsConfirmed(false);
        } else {
            // End of round
            if (currentRound < 3) {
                setRoundComplete(true);
            } else {
                setQuizComplete(true);
            }
        }
    };

    const handleStartNextRound = () => {
        setCurrentRound(prev => prev + 1);
    };

    const handleRestart = () => {
        // Full Restart = Re-init Session (Re-shuffle everything)
        initSession();
    };


    // --- Guard ---
    if (!quizzes || quizzes.length === 0) return <div className="text-center p-8 text-subtext">Đang tải...</div>;

    // --- Render: Selection Screen ---
    if (gameState === 'selection') {
        return (
            <div className="max-w-3xl mx-auto py-12 px-4 animate-slide-in">
                <div className="card-wood p-12 text-center shadow-2xl">
                    <Trophy size={64} className="mx-auto text-primary mb-6" />
                    <h1 className="text-4xl font-serif font-bold text-ink mb-4">Thử thách Job Definition</h1>
                    <p className="text-ink-light text-xl mb-12 max-w-lg mx-auto leading-relaxed">
                        Bạn đã sẵn sàng để kiểm tra kiến thức về <br />
                        <strong>Functional</strong>, <strong>Emotional</strong> và <strong>Social Jobs</strong> chưa?
                    </p>

                    <div className="space-y-4">
                        <button
                            onClick={initSession}
                            className="w-full md:w-auto bg-black text-white px-12 py-4 rounded-full font-bold text-lg hover:bg-gray-900 transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
                        >
                            Bắt đầu ngay
                        </button>
                        <div className="text-sm text-ink-light/60 mt-4">
                            Gồm 3 vòng thi • 20 câu hỏi • Yêu cầu chính xác 100% <br />
                            (Random from {quizzes.length} available quizzes)
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    // --- Render: Active Game ---
    const currentQuestion = roundQuestions[currentIndex];
    if (!currentQuestion && !roundComplete && !quizComplete) return null;


    // --- Render: Score Summary (Reusable) ---
    const RoundSummary = ({ isFinal = false }) => {
        const qList = isFinal ? sessionQuestions : roundQuestions; // Use sessionQuestions for total 
        const stats = calculateScore(qList);
        const nextRound = ROUNDS.find(r => r.id === currentRound + 1);

        // Strict Mastery Logic: Must be 100%
        const isPerfect = stats.percent === 100;
        const isFailed = !isPerfect;

        // Confetti only on perfection
        useEffect(() => {
            if (isPerfect) {
                confetti({
                    particleCount: 150,
                    spread: 70,
                    origin: { y: 0.6 },
                    colors: ['#EF4444', '#3B82F6', '#10B981', '#F59E0B']
                });
            }
        }, []);

        return (
            <div className="max-w-3xl mx-auto animate-slide-in">
                {/* Main Message Card */}
                <div className="card-wood p-8 md:p-12 text-center mb-8">
                    {isPerfect ? (
                        <Trophy size={64} className="mx-auto text-yellow-500 mb-6 drop-shadow-md" />
                    ) : (
                        <Trophy size={64} className="mx-auto text-primary mb-6" />
                    )}

                    <h2 className="text-3xl font-bold mb-4 text-ink font-serif">
                        {isPerfect
                            ? (isFinal ? `Xuất sắc, ${userDisplayName}!` : `Tuyệt vời, ${userDisplayName}!`)
                            : `Chúc mừng ${userDisplayName} đã đạt ${stats.percent}%`
                        }
                    </h2>

                    {isPerfect ? (
                        <p className="text-lg text-ink-light mb-8">Bạn đã vượt qua vòng này.</p>
                    ) : (
                        <p className="text-ink-light mb-8 text-lg">
                            Tuy nhiên, bạn cần đạt <strong>100%</strong> để mở khóa vòng tiếp theo.
                        </p>
                    )}

                    {/* Actions - Now ABOVE the detailed results */}
                    <div className="flex justify-center mb-4">
                        {isFailed ? (
                            <button
                                onClick={handleRestart}
                                className="bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-900 shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                            >
                                <Clock size={20} /> Làm lại (Round 1)
                            </button>
                        ) : (
                            isFinal ? (
                                <button
                                    onClick={handleRestart}
                                    className="bg-primary text-white px-8 py-3 rounded-full font-medium hover:opacity-90 shadow-lg hover:shadow-xl transition-all font-bold"
                                >
                                    Chơi lại tìm hiểu Brand khác
                                </button>
                            ) : (
                                <button
                                    onClick={handleStartNextRound}
                                    className="bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-900 shadow-lg hover:shadow-xl transition-all flex items-center gap-2 font-bold"
                                >
                                    Tiếp tục Vòng {nextRound?.id} <ArrowRight size={20} />
                                </button>
                            )
                        )}
                    </div>
                </div>

                {/* Results Card (Separate) */}
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-ink/5 shadow-sm">
                    <h3 className="text-xl font-bold text-ink mb-6 flex items-center gap-2">
                        {isPerfect ? "Kết quả hoàn hảo!" : "Kết quả chi tiết"}
                    </h3>

                    {/* Always show score, even if perfect */}
                    <div className="text-xl text-ink-light mb-4 font-medium">
                        Điểm số: <span className={isPerfect ? "text-primary text-2xl font-bold" : "text-ink text-2xl font-bold"}>
                            {stats.correct}
                        </span> / {stats.total} câu ({stats.percent}%)
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-4 bg-gray-100 rounded-full mb-8 overflow-hidden">
                        <div
                            className={`h-full transition-all duration-1000 ease-out ${isPerfect ? 'bg-green-500' : 'bg-orange-400'}`} // Removed Red
                            style={{ width: `${stats.percent}%` }}
                        />
                    </div>

                    {/* Toggle Button */}
                    <button
                        onClick={() => setShowDetails(!showDetails)}
                        className="text-ink-light hover:text-primary underline mb-6 text-sm font-medium block"
                    >
                        {showDetails ? "Ẩn danh sách câu hỏi" : "Xem lại danh sách câu hỏi"}
                    </button>

                    {/* Details List - No Scrollbar (Expanded) */}
                    {showDetails && (
                        <div className="text-left space-y-4 animate-slide-in">
                            {qList.map((q, idx) => {
                                const isRt = answers[q.id] === q.correctAnswer;
                                const options = q.options || [];
                                return (
                                    <div key={q.id} className="flex items-start gap-4 p-4 rounded-xl bg-white border border-ink/5">
                                        {isRt ? (
                                            <CheckCircle2 size={20} className="text-green-500 shrink-0 mt-0.5" />
                                        ) : (
                                            <XCircle size={20} className="text-orange-400 shrink-0 mt-0.5" /> // Orange instead of Red
                                        )}
                                        <div className="flex-1">
                                            <p className="text-base font-medium text-ink mb-2">
                                                <span className="text-ink-light mr-2 font-mono text-sm">#{idx + 1}</span>
                                                {q.question}
                                            </p>

                                            <div className="space-y-1 text-sm">
                                                {!isRt && (
                                                    <p className="text-orange-500">
                                                        Bạn chọn: <span className="font-medium opacity-90">{options[answers[q.id]]}</span>
                                                    </p>
                                                )}
                                                <p className="text-primary/90">
                                                    Đáp án: <span className="font-semibold">{options[q.correctAnswer]}</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </div>
            </div>
        );
    };

    if (quizComplete) return <RoundSummary isFinal={true} />;
    if (roundComplete) return <RoundSummary isFinal={false} />;

    // --- Render: Question ---
    const options = currentQuestion.options || ["Functional Job", "Emotional Job", "Social Job"];

    return (
        <div className="max-w-4xl mx-auto py-8 px-4 relative">
            {/* Header: Progress & Hint */}
            <div className="flex items-center justify-between mb-12 mt-8">
                <div className="flex items-center gap-3">
                    <span className="bg-primary/10 px-4 py-1.5 rounded-full text-sm font-bold text-primary tracking-wide uppercase">
                        Vòng {currentRound} / 3
                    </span>
                    <span className="text-ink-light/40 font-medium ml-2 text-lg">
                        Câu {currentIndex + 1} <span className="text-sm">/</span> {roundQuestions.length}
                    </span>
                </div>

                <Popover>
                    <PopoverTrigger className="flex items-center gap-2 text-ink-light/60 hover:text-primary transition-colors cursor-pointer text-sm font-medium group">
                        <div className="w-8 h-8 rounded-full bg-ink/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                            <HelpCircle size={18} />
                        </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 p-5 text-sm text-ink bg-white/95 backdrop-blur-md border border-ink/10 shadow-xl rounded-xl">
                        <h4 className="font-bold mb-3 text-primary text-base">Gợi ý phân loại</h4>
                        <ul className="space-y-3">
                            <li className="flex gap-2">
                                <span className="w-2 h-2 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                                <div><strong>Functional:</strong> Giải quyết công việc cụ thể, thực tế.</div>
                            </li>
                            <li className="flex gap-2">
                                <span className="w-2 h-2 rounded-full bg-pink-400 mt-1.5 shrink-0" />
                                <div><strong>Emotional:</strong> Cảm xúc cá nhân (tự tin, an tâm, vui vẻ).</div>
                            </li>
                            <li className="flex gap-2">
                                <span className="w-2 h-2 rounded-full bg-purple-400 mt-1.5 shrink-0" />
                                <div><strong>Social:</strong> Cách người khác nhìn nhận mình (địa vị, hình ảnh).</div>
                            </li>
                        </ul>
                    </PopoverContent>
                </Popover>
            </div>

            {/* Content */}
            <div className="min-h-[160px] flex flex-col justify-center items-center text-center mb-10">
                <h2 className="text-2xl md:text-3xl font-serif leading-relaxed text-ink font-medium">
                    {currentQuestion.question}
                </h2>
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
                {options.map((option, idx) => {
                    const isSelected = selectedOption === idx;
                    return (
                        <button
                            key={idx}
                            onClick={() => handleOptionSelect(idx)}
                            disabled={isConfirmed} // Lock while confirming/transitioning
                            className={`
                                py-5 px-6 rounded-2xl border-2 text-lg font-medium transition-all duration-200
                                flex items-center justify-center text-center min-h-[88px] relative overflow-hidden group
                                ${isSelected
                                    ? 'border-primary bg-primary/5 text-primary shadow-md scale-[1.02]'
                                    : 'border-ink/10 bg-white text-ink-light hover:border-primary/40 hover:bg-white hover:-translate-y-1 hover:shadow-sm'}
                            `}
                        >
                            <span className="relative z-10">{option}</span>
                            {/* Hover effect background */}
                            {!isSelected && <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />}
                        </button>
                    )
                })}
            </div>

            {/* Footer / Controls */}
            <div className="flex justify-center h-20 items-start">
                <button
                    onClick={handleConfirm}
                    disabled={selectedOption === null || isConfirmed}
                    className={`
                        px-12 py-4 rounded-full font-bold text-lg transition-all duration-300 transform shadow-xl
                        flex items-center gap-3
                        ${selectedOption !== null && !isConfirmed
                            ? 'bg-black text-white translate-y-0 opacity-100 hover:bg-gray-900 hover:scale-105'
                            : 'bg-gray-200 text-gray-400 translate-y-4 opacity-0 pointer-events-none'}
                    `}
                >
                    Xác nhận
                </button>
            </div>
        </div>
    );
}
