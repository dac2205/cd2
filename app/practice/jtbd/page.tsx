import Link from "next/link";
import { ArrowRight, Brain, Target, Users, Zap, Layers, Activity } from "lucide-react";
import { Card } from "@/components/ui/Card";

const exercises = [
    {
        id: "jtbd-01",
        title: "1. Tư duy nền tảng",
        desc: "Hire/Fire, Product vs Job, Persona vs Situation",
        icon: <Brain className="w-6 h-6 text-purple-500" />,
        color: "group-hover:text-purple-500"
    },
    {
        id: "jtbd-02",
        title: "2. 3 Lớp Jobs",
        desc: "Functional - Emotional - Social",
        icon: <Layers className="w-6 h-6 text-blue-500" />,
        color: "group-hover:text-blue-500"
    },
    {
        id: "jtbd-03",
        title: "3. Cấu trúc Job Statement",
        desc: "When - I want - So I can",
        icon: <Users className="w-6 h-6 text-green-500" />,
        color: "group-hover:text-green-500"
    },
    {
        id: "jtbd-04",
        title: "4. The Four Forces",
        desc: "Push, Pull, Anxiety, Habit",
        icon: <Activity className="w-6 h-6 text-orange-500" />,
        color: "group-hover:text-orange-500"
    },
    {
        id: "jtbd-05",
        title: "5. Pain & Triggers",
        desc: "Struggle, Trigger, Context",
        icon: <Zap className="w-6 h-6 text-yellow-500" />,
        color: "group-hover:text-yellow-500"
    },
    {
        id: "jtbd-06",
        title: "6. Advanced Systems",
        desc: "Core/Related Jobs, Job Map, Strategy",
        icon: <Target className="w-6 h-6 text-red-500" />,
        color: "group-hover:text-red-500"
    }
];

export default function PracticePage() {
    return (
        <div className="container mx-auto max-w-5xl px-4 py-12" style={{ backgroundColor: 'hsl(45 50% 96%)' }}>
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold mb-4 tracking-tight" style={{ color: 'hsl(25 25% 24%)', fontFamily: 'Crimson Pro, serif' }}>Thực hành JTBD</h1>
                <p className="text-lg max-w-2xl mx-auto" style={{ color: 'hsl(25 25% 24% / 0.8)' }}>
                    6 bài tập được thiết kế để chuyển hóa lý thuyết thành phản xạ. Đi từ nhận thức cơ bản đến chiến lược nâng cao.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {exercises.map((ex) => (
                    <Link href={`/practice/jtbd/${ex.id}`} key={ex.id} className="group no-underline block">
                        <Card className="h-full p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1" style={{
                            backgroundColor: 'hsl(45 50% 96%)',
                            borderColor: 'hsl(28 42% 43% / 0.15)',
                            borderRadius: '12px'
                        }}>
                            <div className="mb-4 p-3 rounded-2xl w-fit group-hover:scale-110 transition-transform" style={{ backgroundColor: 'hsl(38 60% 81%)' }}>
                                {ex.icon}
                            </div>
                            <h3 className={`text-xl font-bold mb-2 transition-colors ${ex.color}`} style={{ color: 'hsl(25 25% 24%)' }}>
                                {ex.title}
                            </h3>
                            <p className="text-sm leading-relaxed mb-6" style={{ color: 'hsl(25 25% 24% / 0.7)' }}>
                                {ex.desc}
                            </p>
                            <div className="flex items-center text-sm font-semibold mt-auto" style={{ color: 'hsl(33 62% 45%)' }}>
                                Luyện tập ngay <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}
