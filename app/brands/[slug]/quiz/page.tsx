import { notFound } from "next/navigation";
import { getBrandContent, getAllBrands } from "@/lib/brands";
import Link from "next/link";
import { ArrowLeft, PlayCircle } from "lucide-react";

export async function generateStaticParams() {
    const brands = getAllBrands();
    return brands.map((brand) => ({
        slug: brand.slug,
    }));
}

export default async function BrandQuizIndexPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const brand = await getBrandContent(slug);

    if (!brand) {
        notFound();
    }

    return (
        <div className="container animate-slide-in py-8">
            <div style={{ marginBottom: "2rem" }}>
                <Link
                    href={`/brands/${slug}`}
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        color: "hsl(var(--ink-brown) / 0.6)",
                        textDecoration: "none",
                        marginBottom: "1rem",
                        fontSize: "0.875rem"
                    }}
                >
                    <ArrowLeft size={16} /> Back to {brand.meta.name}
                </Link>
                <h1 style={{ marginBottom: "0.5rem" }} className="text-3xl font-serif font-bold text-[#3E2723]">Brand Tasks</h1>
                <p className="text-[#5D4037] text-lg">Practice & Apply: {brand.meta.name}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* JTBD Quiz Card */}
                <div className="bg-white rounded-2xl border border-[#E0D0C1] hover:border-[#D7CCC8] hover:shadow-lg transition-all cursor-pointer relative group overflow-hidden">
                    <div className="p-8">
                        <div className="flex items-start justify-between mb-6">
                            <div className="p-4 bg-[#FFF8E1] rounded-2xl text-[#DDA15E]">
                                <PlayCircle size={32} />
                            </div>
                        </div>
                        <h3 className="text-2xl font-serif font-bold text-[#3E2723] mb-3 group-hover:text-[#DDA15E] transition-colors">
                            3 Job Layers Classification
                        </h3>
                        <p className="text-[#5D4037] mb-8 text-base leading-relaxed">
                            Phân loại các nhiệm vụ (Jobs) của {brand.meta.name} vào 3 tầng: Functional, Emotional, và Social.
                        </p>

                        <Link href={`/brands/${slug}/quiz/jtbd`} className="absolute inset-0 z-10">
                            <span className="sr-only">Start Task</span>
                        </Link>

                        <div className="flex items-center text-sm font-bold text-[#DDA15E] uppercase tracking-wider group-hover:translate-x-2 transition-transform">
                            Start Task <ArrowLeft className="rotate-180 ml-2 w-4 h-4" />
                        </div>
                    </div>
                    {/* Background decoration */}
                    <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#F5F5DC] rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500"></div>
                </div>
            </div>
        </div>
    );
}
