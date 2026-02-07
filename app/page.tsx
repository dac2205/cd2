import { getAllBrands } from "@/lib/brands";
import BrandList from "@/components/BrandList";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trang chủ",
  description: "Khám phá customer insights, JTBD, và phân tích audience chi tiết cho các brands. Học cách thiết kế AI Factory với framework chuẩn thế giới.",
  openGraph: {
    title: "AI Factory | Conan School",
    description: "Khám phá customer insights, JTBD, và phân tích audience chi tiết cho các brands",
  }
};

export default function Home() {
  const brands = getAllBrands();

  return (
    <div className="container animate-slide-in py-16 text-center">
      <div className="mb-16">
        <h1 className="mb-4 text-ink-brown font-serif text-5xl font-bold tracking-tight">AI Factory</h1>
        <p className="text-xl max-w-2xl mx-auto text-ink-brown/80">
          Học cách thiết kế AI Factory - từ customer insights đến AI systems tự động hóa. Khám phá JTBD framework và phân tích audience chi tiết.
        </p>
      </div>

      <BrandList initialBrands={brands} />
    </div>
  );
}
