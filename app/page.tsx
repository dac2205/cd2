import { getAllBrands } from "@/lib/brands";
import BrandList from "@/components/BrandList";

export default function Home() {
  const brands = getAllBrands();

  return (
    <div className="container animate-slide-in min-h-screen py-10">
      <div className="mb-12 text-center md:text-left">
        <p className="text-honey-oak text-sm font-bold uppercase tracking-[0.2em] mb-2 font-sans">
          Conan School
        </p>
        <h1 className="text-5xl md:text-6xl font-serif font-medium mb-4 text-ink-brown">Customer Decode</h1>
        <p className="text-ink-brown/80 text-lg md:text-xl font-light max-w-2xl leading-relaxed">
          Explore detailed customer insights, jobs to be done, and audience analysis for various brands.
        </p>
      </div>

      <div className="checkerboard-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className={`checkerboard-cell ${i % 2 === 0 ? 'opacity-50' : ''}`} />
        ))}
      </div>

      <BrandList initialBrands={brands} />
    </div>
  );
}
