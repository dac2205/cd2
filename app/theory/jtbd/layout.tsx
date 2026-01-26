import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Jobs to be Done (JTBD)",
    description: "Lý thuyết cốt lõi về JTBD - động lực thúc đẩy hành động mua hàng. Hiểu tại sao khách hàng 'thuê' sản phẩm để hoàn thành công việc của họ.",
    keywords: ["JTBD", "jobs to be done", "customer motivation", "hiring products"],
    openGraph: {
        title: "Jobs to be Done (JTBD) | Conan School",
        description: "Lý thuyết cốt lõi về JTBD - động lực thúc đẩy hành động mua hàng",
    }
};

export default function JTBDLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
