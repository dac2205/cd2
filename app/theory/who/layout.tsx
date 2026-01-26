import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Defining the Who - Chân dung Khách hàng",
    description: "Chân dung, Phân khúc và Sự thấu cảm (Empathy). Học cách define 'Who' một cách chính xác và sâu sắc.",
    keywords: ["customer persona", "audience segmentation", "empathy", "target audience"],
    openGraph: {
        title: "Defining the Who - Chân dung Khách hàng | Conan School",
        description: "Chân dung, Phân khúc và Sự thấu cảm (Empathy)",
    }
};

export default function WhoLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
