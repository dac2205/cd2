import { notFound } from "next/navigation";
import QuizExercise from "@/components/practice/QuizExercise";
import { promises as fs } from 'fs';
import path from 'path';
import { Exercise } from "@/components/practice/QuizTypes";
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

// Get Data
async function getExercise(slug: string): Promise<Exercise | null> {
    try {
        const filePath = path.join(process.cwd(), 'data/exercises', `${slug}.json`);
        const fileContents = await fs.readFile(filePath, 'utf8');
        return JSON.parse(fileContents);
    } catch (error) {
        return null;
    }
}

export default async function ExercisePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const exercise = await getExercise(slug);

    if (!exercise) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-paper-white text-ink-brown py-12 md:py-20">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="mb-12">
                    <Link href="/practice/jtbd" className="inline-flex items-center text-honey-oak hover:text-ink-brown mb-8 transition-colors text-sm font-bold uppercase tracking-wider group">
                        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Quay lại danh sách
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-serif font-medium mb-4 text-ink-brown leading-tight">{exercise.title}</h1>
                    <p className="text-lg text-ink-brown/80 leading-relaxed max-w-2xl font-light italic font-serif">
                        "{exercise.description}"
                    </p>
                </div>

                <div className="bg-white rounded-3xl p-1 shadow-2xl shadow-ink-brown/10 border border-maple-cream">
                    <div className="bg-paper-white rounded-[22px] border border-maple-cream p-6 md:p-10 min-h-[500px]">
                        <QuizExercise exercise={exercise} />
                    </div>
                </div>
            </div>
        </div>
    );
}
