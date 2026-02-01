import { notFound } from "next/navigation";
import { getBrandContent, getAllBrands } from "@/lib/brands";
import Link from "next/link";
import { ArrowLeft, CheckCircle, HelpCircle } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/Popover";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import InsightsExplorer from "@/components/insights/InsightsExplorer";
import JTBDView from "@/components/jtbd/JTBDView";
import AudienceView from "@/components/audience/AudienceView";
import QuizView from "@/components/quiz/QuizView";
import ProtectedSection from "@/components/auth/ProtectedSection";

export async function generateStaticParams() {
    const brands = getAllBrands();
    const sections = ["jtbd", "audience", "insights", "quiz"];

    return brands.flatMap((brand) =>
        sections.map((section) => ({
            slug: brand.slug,
            section: section,
        }))
    );
}

export default async function BrandSectionPage({ params }: { params: Promise<{ slug: string; section: string }> }) {
    const { slug, section } = await params;
    const brand = await getBrandContent(slug);

    if (!brand) {
        notFound();
    }

    const sectionTitles: Record<string, string> = {
        jtbd: "Jobs to be Done",
        audience: "Audience Segments",
        insights: "Customer Insights",
        quiz: "Brand Quiz"
    };

    if (!sectionTitles[section]) {
        notFound();
    }



    return (
        <div className="container animate-slide-in">
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
                <h1 style={{ marginBottom: "0.5rem" }}>{sectionTitles[section]}</h1>
                <p className="text-subtext" style={{ fontSize: "1.125rem" }}>Phase: {brand.meta.name}</p>
            </div>

            <div style={{ padding: "1rem 0" }}>
                {section === "jtbd" && (
                    <JTBDView data={brand.structuredJTBD} />
                )}

                {section === "audience" && brand.structuredAudience && (
                    <ProtectedSection section="audience">
                        <AudienceView data={brand.structuredAudience} />
                    </ProtectedSection>
                )}

                {section === "insights" && brand.structuredInsights && (
                    <InsightsExplorer insights={brand.structuredInsights} />
                )}

                {section === "quiz" && (
                    <QuizView quizzes={brand.quizzes} brandName={brand.meta.name} />
                )}
            </div>
        </div>
    );
}
