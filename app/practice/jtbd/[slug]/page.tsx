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
        <div className="min-h-screen bg-zinc-50 dark:bg-black py-12">
            <div className="container mx-auto px-4">
                <div className="mb-8 max-w-2xl mx-auto">
                    <Link href="/practice/jtbd" className="inline-flex items-center text-zinc-500 hover:text-zinc-900 mb-6 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Quay lại danh sách
                    </Link>
                    <h1 className="text-3xl font-bold mb-2">{exercise.title}</h1>
                    <p className="text-zinc-500">{exercise.description}</p>
                </div>

                <QuizExercise exercise={exercise} />
            </div>
        </div>
    );
}
