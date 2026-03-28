import Link from "next/link";
import { ArrowRight, Brain, Target, Users, Zap, Layers, Activity } from "lucide-react";
import { Card } from "@/components/ui/Card";

const exercises = [
    {
        id: "jtbd-01",
        title: "1. Tư duy nền tảng",
        desc: "Hire/Fire, Product vs Job, Persona vs Situation",
        icon: <Brain className="w-6 h-6 text-ink-brown" />,
        color: "text-ink-brown"
    },
    {
        id: "jtbd-02",
        title: "2. 3 Lớp Jobs",
        desc: "Functional - Emotional - Social",
        icon: <Layers className="w-6 h-6 text-zinc-600" />,
        color: "text-zinc-700"
    },
    {
        id: "jtbd-03",
        title: "3. Cấu trúc Job Statement",
        desc: "When - I want - So I can",
        icon: <Users className="w-6 h-6 text-zinc-600" />,
        color: "text-zinc-700"
    },
    {
        id: "jtbd-04",
        title: "4. The Four Forces",
        desc: "Push, Pull, Anxiety, Habit",
        icon: <Activity className="w-6 h-6 text-zinc-600" />,
        color: "text-zinc-700"
    },
    {
        id: "jtbd-05",
        title: "5. Pain & Triggers",
        desc: "Struggle, Trigger, Context",
        icon: <Zap className="w-6 h-6 text-zinc-600" />,
        color: "text-zinc-700"
    },
    {
        id: "jtbd-06",
        title: "6. Advanced Systems",
        desc: "Core/Related Jobs, Job Map, Strategy",
        icon: <Target className="w-6 h-6 text-zinc-600" />,
        color: "text-zinc-700"
    }
];

export default function PracticePage() {
    return (
        <div className="min-h-screen bg-[#FDFBF7] text-[#3E2723]"> {/* paper-white fallback */}
            <div className="container mx-auto max-w-6xl px-4 py-20">
                <div className="text-center mb-24 space-y-6">
                    <span className="text-sm font-bold tracking-[0.2em] uppercase text-[#9B6B3C] mb-4 block">Experimental Lab</span>
                    <h1 className="text-5xl md:text-6xl font-serif font-medium mb-6 tracking-tight text-[#3E2723]">
                        Thực hành JTBD
                    </h1>
                    <p className="text-xl max-w-2xl mx-auto text-[#6D4C41] leading-relaxed font-serif italic">
                        "Khách hàng không mua sản phẩm, họ thuê giải pháp."
                    </p>
                    <p className="text-base text-[#3E2723]/60 max-w-xl mx-auto">
                        6 bài tập được thiết kế để chuyển hóa lý thuyết thành phản xạ. Đi từ nhận thức cơ bản đến chiến lược nâng cao.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {exercises.map((ex) => (
                        <Link href={`/practice/jtbd/${ex.id}`} key={ex.id} className="group no-underline block h-full">
                            <div className="h-full p-8 transition-all duration-300 hover:-translate-y-2 bg-white border border-[#E0D0C1] rounded-xl hover:shadow-xl hover:shadow-[#D7CCC8]/30 flex flex-col items-start relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-[#F5F5DC]/30 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150 duration-500 ease-out"></div>

                                <div className="mb-6 p-4 rounded-xl w-fit bg-[#F5F5DC] group-hover:bg-[#E0D0C1] transition-colors">
                                    {ex.icon}
                                </div>
                                <h3 className={`text-2xl font-serif font-medium mb-3 text-[#3E2723]`}>
                                    {ex.title}
                                </h3>
                                <p className="text-base leading-relaxed mb-8 text-[#5D4037] flex-1">
                                    {ex.desc}
                                </p>
                                <div className="flex items-center text-sm font-bold tracking-wide uppercase text-[#9B6B3C] mt-auto">
                                    Start Case <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
