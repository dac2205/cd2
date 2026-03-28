import { notFound } from "next/navigation";
import { getBrandContent, getAllBrands } from "@/lib/brands";
import BrandDashboard from "@/components/brand/BrandDashboard";

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

    // Helper to parse JTBD content into 4 sections for the Tabbed View
    const parseJTBDToTabs = () => {
        if (!brand.jtbd) return undefined;
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

    const jtbdHtmlData = !brand.structuredJTBD ? parseJTBDToTabs() : undefined;

    return (
        <BrandDashboard
            brand={brand}
            slug={slug}
            jtbdHtmlData={jtbdHtmlData}
        />
    );
}
