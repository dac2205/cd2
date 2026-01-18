import { getAllBrands } from "@/lib/brands";
import BrandList from "@/components/BrandList";

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

      <BrandList initialBrands={brands} />
    </div>
  );
}
