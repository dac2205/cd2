import { getAllBrands } from "@/lib/brands";
import BrandList from "@/components/BrandList";

export default function Home() {
  const brands = getAllBrands();

  return (
    <div className="container animate-slide-in py-16 text-center">
      <div className="mb-16">
        <h1 className="mb-4 text-ink-brown font-serif text-5xl font-bold tracking-tight">Customer Decode</h1>
        <p className="text-xl max-w-2xl mx-auto text-ink-brown/80">
          Explore detailed customer insights, jobs to be done, and audience analysis for various brands.
        </p>
      </div>

      <BrandList initialBrands={brands} />
    </div>
  );
}
