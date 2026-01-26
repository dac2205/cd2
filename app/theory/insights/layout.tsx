import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Insight Structure - Cấu trúc Insight",
    description: "Giải phẫu một Insight: Tension, Core & Trigger. Học cách xây dựng insight mạnh mẽ và actionable.",
    keywords: ["customer insight", "insight structure", "tension", "trigger", "core insight"],
    openGraph: {
        title: "Insight Structure - Cấu trúc Insight | Conan School",
        description: "Giải phẫu một Insight: Tension, Core & Trigger",
    }
};

export default function InsightsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
