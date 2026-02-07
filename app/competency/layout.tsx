import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Competency Framework",
    description: "Hệ thống đo năng lực AI Factory - biết mình đang ở đâu, cần học gì, đo được tiến bộ.",
    keywords: ["competency framework", "skill assessment", "learning path"],
    openGraph: {
        title: "Competency Framework | Conan School",
        description: "Hệ thống đo năng lực AI Factory",
    }
};

export default function CompetencyLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
