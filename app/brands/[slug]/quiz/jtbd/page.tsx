import { notFound } from "next/navigation";
import { getBrandContent, getAllBrands } from "@/lib/brands";
import BrandTaskRunner from "@/components/tasks/BrandTaskRunner";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Question } from "@/components/practice/QuizTypes";

export async function generateStaticParams() {
    const brands = getAllBrands();
    return brands.map((brand) => ({
        slug: brand.slug,
    }));
}

export default async function BrandJTBDTaskPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const brand = await getBrandContent(slug);

    if (!brand || !brand.structuredJTBD) {
        return (
            <div className="container py-12">
                <h1 className="text-2xl font-bold mb-4">No JTBD Data Found</h1>
                <p className="mb-4">Dữ liệu Jobs to be Done cho thương hiệu này chưa được cập nhật (missing jtbd.json).</p>
                <Link href={`/brands/${slug}/quiz`} className="text-blue-600 hover:underline">
                    Back to Tasks
                </Link>
            </div>
        );
    }

    // Transform JTBD to Questions
    const questions: Question[] = [];
    const jtbd = brand.structuredJTBD;

    let idCounter = 1;

    const createQuestion = (item: any, type: string, correctAnswerIndex: number): Question => {
        // Find a good question context.
        const contextText = item.situation
            ? `Tình huống: "${item.situation}"`
            : `Yếu tố: "${item.description}"`;

        return {
            id: idCounter++,
            question: `${contextText} - Đây là loại Job nào?`,
            options: ["Functional Job", "Emotional Job", "Social Job"],
            correctAnswer: correctAnswerIndex,
            feedback: {
                correct: `Chính xác! ${item.title}: ${item.description || item.situation}. Đây là thuộc tính của ${type}.`,
                incorrect: `Chưa đúng. ${item.title}: ${item.description || item.situation}. Đây là thuộc tính của ${type}.`
            }
        };
    };

    // Functional (Index 0)
    jtbd.functional?.forEach((item: any) => questions.push(createQuestion(item, "Functional Job", 0)));
    // Emotional (Index 1)
    jtbd.emotional?.forEach((item: any) => questions.push(createQuestion(item, "Emotional Job", 1)));
    // Social (Index 2)
    jtbd.social?.forEach((item: any) => questions.push(createQuestion(item, "Social Job", 2)));

    // Shuffle questions
    const shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);

    return (
        <div className="container animate-slide-in py-12">
            <div className="mb-8">
                <Link
                    href={`/brands/${slug}/quiz`}
                    className="inline-flex items-center gap-2 text-ink-brown/60 hover:text-ink-brown transition-colors mb-6 text-sm no-underline font-medium"
                >
                    <ArrowLeft size={16} /> Back to Menu
                </Link>
            </div>

            <BrandTaskRunner
                questions={shuffledQuestions}
                title={`${brand.meta.name}: 3 Job Layers`}
                backLink={`/brands/${slug}/quiz`}
            />
        </div>
    );
}
