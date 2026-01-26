import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Struggle Stack - Tháp Đấu tranh",
    description: "Tháp đấu tranh tâm lý từ thụ động đến hành động. Hiểu các tầng struggle để tạo message đúng lúc, đúng chỗ.",
    keywords: ["struggle stack", "customer struggle", "buying triggers", "psychological barriers"],
    openGraph: {
        title: "Struggle Stack - Tháp Đấu tranh | Conan School",
        description: "Tháp đấu tranh tâm lý từ thụ động đến hành động",
    }
};

export default function StruggleStackLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
