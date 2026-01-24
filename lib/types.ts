export interface BrandMeta {
    id: string;
    name: string;
    owner: string;
}

export interface QuizQuestion {
    id: string;
    question: string;
    options: string[];
    correctAnswer: number; // Index of the correct option
    explanation?: string;
}

export interface Insight {
    id: string;
    title: string;
    tension: string;
    belief: string; // The underlying customer belief driving the insight
    core: string; // Core Insight
    hooks: string[]; // Changed from single hook to array
    angle: string; // Unique Angle
    reframe: string;
    promise: string;
    rtb: string; // Reason to Believe
    mechanism: string;
}

export interface JobItem {
    id: string;
    title: string;
    description: string;
    situation?: string;
    context?: string;
    triggers?: string[];
    desiredOutcome?: string[];
}

export interface JTBDData {
    functional: JobItem[];
    emotional: JobItem[];
    social: JobItem[];
    other: JobItem[];
}

export interface AudienceSegment {
    id: string;
    title: string;
    isPrimary: boolean;
    description: string; // Markdown supported
    painPoints: string[];
}

export interface BrandContent {
    meta: BrandMeta;
    introduction: string; // New introduction field
    jtbd: string;     // HTML/Markdown content
    structuredJTBD?: JTBDData;
    audience: string; // HTML/Markdown content
    structuredAudience?: AudienceSegment[];
    insights: string; // HTML/Markdown content
    structuredInsights?: Insight[];
    quiz: QuizQuestion[];
    description?: string[];
}

export interface Brand {
    slug: string;
    meta: BrandMeta;
}
