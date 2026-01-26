import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "JTBD vs Needs - So sánh",
    description: "So sánh JTBD với tư duy Needs truyền thống qua ví dụ thực tế. Hiểu sự khác biệt cốt lõi giữa hai framework.",
    keywords: ["JTBD vs needs", "customer needs", "jobs theory", "framework comparison"],
    openGraph: {
        title: "JTBD vs Needs - So sánh | Conan School",
        description: "So sánh JTBD với tư duy Needs truyền thống qua ví dụ thực tế",
    }
};

export default function JTBDvsNeedsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
