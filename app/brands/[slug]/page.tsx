import { notFound } from "next/navigation";
import { getBrandContent, getAllBrands } from "@/lib/brands";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { ArrowRight, BookOpen, Users, Lightbulb, CheckCircle } from "lucide-react";
import React from "react";

// Force static generation for known brands
export async function generateStaticParams() {
    const brands = getAllBrands();
    return brands.map((brand) => ({
        slug: brand.slug,
    }));
}

export default async function BrandPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const brand = await getBrandContent(slug);

    if (!brand) {
        notFound();
    }

    const sections = [
        {
            id: "jtbd",
            title: "Jobs to be Done",
            description: "The functional and emotional jobs the customer is hiring for.",
            icon: <BookOpen className="text-primary" />
        },
        {
            id: "audience",
            title: "Audience Segments",
            description: "Who they are, demographics, and psychographics.",
            icon: <Users className="text-primary" />
        },
        {
            id: "insights",
            title: "Customer Insights",
            description: "Deep psychological truths and behavioral patterns.",
            icon: <Lightbulb className="text-primary" />
        },
        {
            id: "quiz",
            title: "Brand Quiz",
            description: "Test your understanding of this brand's decoding.",
            icon: <CheckCircle className="text-primary" />
        }
    ];

    return (
        <div className="container animate-slide-in">
            <div style={{ marginBottom: "3rem", textAlign: "center" }}>
                <p className="text-subtext" style={{ fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "1rem" }}>
                    Brand Analysis Hub
                </p>
                <h1 style={{ marginBottom: "0.5rem", fontSize: "2.5rem" }}>{brand.meta.name}</h1>
                <p style={{ fontSize: "1.25rem", color: "hsl(var(--ink-brown) / 0.7)" }}>Owner: {brand.meta.owner}</p>

                {brand.introduction && (
                    <div style={{ marginTop: "2rem", maxWidth: "800px", margin: "2rem auto 0", textAlign: "left", backgroundColor: "hsl(var(--paper-white))", padding: "2rem", borderRadius: "12px", border: "1px solid hsl(var(--border))" }}>
                        <div className="prose" dangerouslySetInnerHTML={{ __html: brand.introduction }} />
                    </div>
                )}
            </div>

            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "2rem",
                maxWidth: "1000px",
                margin: "0 auto"
            }}>
                {sections.map((section) => (
                    <Link key={section.id} href={`/brands/${slug}/${section.id}`} style={{ textDecoration: "none" }}>
                        <Card className="hover-warm-glow" style={{ height: "100%", transition: "transform 0.2s" }}>
                            <CardHeader>
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                                    {section.icon}
                                    <ArrowRight size={20} style={{ color: "hsl(var(--ink-brown) / 0.4)" }} />
                                </div>
                                <CardTitle style={{ fontSize: "1.5rem" }}>{section.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p style={{ color: "hsl(var(--ink-brown) / 0.7)" }}>{section.description}</p>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}
