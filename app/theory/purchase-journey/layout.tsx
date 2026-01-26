import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Purchase Journey - 3 Bước Mua hàng",
    description: "Hiểu rõ 3 bước purchase journey: Needs được kích hoạt → JTBD được gọi tên → Giải pháp được chọn. Khám phá với ví dụ thực tế từ 9 brands.",
    keywords: ["purchase journey", "customer journey", "JTBD", "needs", "decision making"],
    openGraph: {
        title: "Purchase Journey - 3 Bước Mua hàng | Conan School",
        description: "Hiểu rõ 3 bước purchase journey với ví dụ thực tế từ 9 brands",
    }
};

export default function PurchaseJourneyLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
