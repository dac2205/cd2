export interface Question {
    id: number;
    question: string;
    options: string[];
    correctAnswer: number; // Index 0-3
    feedback: {
        correct: string;
        incorrect: string;
    };
}

export interface Level {
    level: number;
    title: string;
    questions: Question[];
}

export interface Exercise {
    id: string;
    title: string;
    description: string;
    levels: Level[];
}
