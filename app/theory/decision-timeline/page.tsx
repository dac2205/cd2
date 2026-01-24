import DecisionTimeline from "@/components/timeline/DecisionTimeline";
import timelineData from "@/data/decision-timeline.json";

export const metadata = {
    title: "Decision Timeline - JTBD Framework",
    description: "Understand the customer decision journey through 11 stages of the JTBD Decision Timeline"
};

export default function DecisionTimelinePage() {
    return (
        <div className="container">
            <DecisionTimeline
                cases={timelineData.cases}
                stages={timelineData.stages}
            />
        </div>
    );
}
