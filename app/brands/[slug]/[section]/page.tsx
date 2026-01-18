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

    // Helper to parse JTBD content into 4 sections for the Tabbed View
    const parseJTBDToTabs = () => {
        // This parses the HTML content split by <h2> tags to map to our tabs
        const parts = brand.jtbd.split("<h2>");

        const mapping: Record<string, string> = {
            "Functional Jobs": "functional",
            "Emotional Jobs": "emotional",
            "Social Jobs": "social",
            "Other Jobs": "other"
        };

        const result: Record<string, string> = {};

        Object.keys(mapping).forEach(title => {
            const part = parts.find(p => p.includes(title));
            if (part) {
                // Extract content after the header
                // part looks like: "Functional Jobs</h2><p>..." or just "Functional Jobs</h2>..."
                // We want everything after "</h2>"
                const content = part.substring(part.indexOf("</h2>") + 5);
                result[mapping[title]] = content;
            }
        });

        return result;
    };

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
                    <JTBDView
                        data={brand.structuredJTBD}
                        htmlData={!brand.structuredJTBD ? parseJTBDToTabs() : undefined}
                    />
                )}

                {section === "audience" && (
                    brand.structuredAudience ? (
                        <AudienceView data={brand.structuredAudience} />
                    ) : (
                        <div className="card-wood" style={{ padding: "2rem" }}>
                            <div className="prose" dangerouslySetInnerHTML={{ __html: brand.audience }} />
                        </div>
                    )
                )}

                {section === "insights" && (
                    brand.structuredInsights && brand.structuredInsights.length > 0 ? (
                        <InsightsExplorer insights={brand.structuredInsights} />
                    ) : (
                        <div className="card-wood" style={{ padding: "2rem" }}>
                            <div className="prose" dangerouslySetInnerHTML={{ __html: brand.insights }} />
                        </div>
                    )
                )}

                {section === "quiz" && (
                    <QuizView questions={brand.quiz} />
                )}
            </div>
        </div>
    );
}
