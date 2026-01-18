import Link from "next/link";
import { getAllBrands } from "@/lib/brands";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const brands = getAllBrands();

  return (
    <div className="container animate-slide-in">
      <div style={{ padding: "4rem 0", textAlign: "center" }}>
        <h1 style={{ marginBottom: "1rem" }}>Customer Decode</h1>
        <p className="text-subtext" style={{ fontSize: "1.25rem", maxWidth: "600px", margin: "0 auto" }}>
          Explore detailed customer insights, jobs to be done, and audience analysis for various brands.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
        {brands.map((brand) => (
          <Link key={brand.slug} href={`/brands/${brand.slug}`} style={{ textDecoration: 'none' }}>
            <Card style={{ height: '100%', transition: 'transform 0.2s', cursor: 'pointer' }}>
              <CardHeader>
                <CardTitle>{brand.meta.name}</CardTitle>
                <p style={{ fontSize: '0.875rem', color: 'hsl(var(--ink-brown) / 0.6)' }}>
                  Owner: {brand.meta.owner}
                </p>
              </CardHeader>
              <CardContent>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'hsl(var(--primary))' }}>
                  <span>View Analysis</span>
                  <ArrowRight size={16} />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
