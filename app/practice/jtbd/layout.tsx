import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Practice JTBD",
    description: "Thực hành phân tích JTBD với các brand thực tế. Học cách identify và structure JTBD từ customer insights.",
    keywords: ["JTBD practice", "customer analysis", "practical examples"],
    openGraph: {
        title: "Practice JTBD | Conan School",
        description: "Thực hành phân tích JTBD với các brand thực tế",
    }
};

export default function PracticeJTBDLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
