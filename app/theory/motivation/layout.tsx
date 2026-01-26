import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Motivation & Behavior - Động lực và Hành vi",
    description: "Mô hình hành vi và động lực khách hàng. Hiểu tại sao khách hàng hành động và cách thúc đẩy hành vi mua hàng.",
    keywords: ["customer motivation", "behavior model", "buying behavior", "customer psychology"],
    openGraph: {
        title: "Motivation & Behavior | Conan School",
        description: "Mô hình hành vi và động lực khách hàng",
    }
};

export default function MotivationLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
