import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Decision Timeline - 11 Mốc Quyết định",
    description: "11 mốc quyết định của khách hàng từ Status Quo đến Loyalty. Hiểu rõ timeline để tối ưu marketing và sales.",
    keywords: ["decision timeline", "customer decision", "buying process", "customer journey"],
    openGraph: {
        title: "Decision Timeline - 11 Mốc Quyết định | Conan School",
        description: "11 mốc quyết định của khách hàng từ Status Quo đến Loyalty",
    }
};

export default function DecisionTimelineLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
