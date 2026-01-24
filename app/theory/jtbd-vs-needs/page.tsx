import JTBDvsNeeds from "@/components/comparison/JTBDvsNeeds";
import comparisonData from "@/data/jtbd-vs-needs.json";

export const metadata = {
    title: "JTBD vs Needs - Understanding the Difference",
    description: "Compare JTBD (Jobs to be Done) framework with traditional Needs-based thinking through real brand examples"
};

export default function JTBDvsNeedsPage() {
    return (
        <div className="container">
            <JTBDvsNeeds
                brands={comparisonData.brands}
                comparisons={comparisonData.comparisons}
            />
        </div>
    );
}
