"use client";

import { useState } from "react";
import { ChevronRight, FileText, Wrench, BookOpen, Brain, Play, CheckCircle } from "lucide-react";

type StepStatus = "pending" | "active" | "completed";

interface ExecutionStep {
    id: string;
    type: "workflow" | "skill" | "rule" | "knowledge";
    name: string;
    description: string;
    status: StepStatus;
    children?: ExecutionStep[];
}

export default function AgentTestPage() {
    const [currentStep, setCurrentStep] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    const executionFlow: ExecutionStep[] = [
        {
            id: "1",
            type: "workflow",
            name: "/feature-implementation",
            description: "User invokes workflow with slash command",
            status: "pending",
            children: [
                {
                    id: "1.1",
                    type: "rule",
                    name: "Check Authentication",
                    description: "Rule: Verify user is authenticated before proceeding",
                    status: "pending"
                },
                {
                    id: "1.2",
                    type: "knowledge",
                    name: "Load Project Context",
                    description: "Knowledge: Read existing codebase patterns and conventions",
                    status: "pending"
                },
                {
                    id: "1.3",
                    type: "skill",
                    name: "UI Engineering Specialist",
                    description: "Skill: Invoked to handle UI-related implementation",
                    status: "pending",
                    children: [
                        {
                            id: "1.3.1",
                            type: "knowledge",
                            name: "Tailwind v4 Config",
                            description: "Knowledge: Read Tailwind CSS configuration standards",
                            status: "pending"
                        },
                        {
                            id: "1.3.2",
                            type: "rule",
                            name: "Design System Rules",
                            description: "Rule: Apply Detective Wood design system constraints",
                            status: "pending"
                        }
                    ]
                },
                {
                    id: "1.4",
                    type: "workflow",
                    name: "Sub-workflow: Component Creation",
                    description: "Nested workflow for creating new components",
                    status: "pending",
                    children: [
                        {
                            id: "1.4.1",
                            type: "skill",
                            name: "Code Generator",
                            description: "Skill: Generate component boilerplate",
                            status: "pending"
                        },
                        {
                            id: "1.4.2",
                            type: "rule",
                            name: "Naming Conventions",
                            description: "Rule: Enforce file and component naming standards",
                            status: "pending"
                        }
                    ]
                }
            ]
        }
    ];

    const runSimulation = () => {
        setIsRunning(true);
        setCurrentStep(0);

        const totalSteps = countSteps(executionFlow);
        let step = 0;

        const interval = setInterval(() => {
            step++;
            setCurrentStep(step);

            if (step >= totalSteps) {
                clearInterval(interval);
                setIsRunning(false);
            }
        }, 800);
    };

    const countSteps = (steps: ExecutionStep[]): number => {
        return steps.reduce((count, step) => {
            return count + 1 + (step.children ? countSteps(step.children) : 0);
        }, 0);
    };

    const getStepStatus = (stepIndex: number): StepStatus => {
        if (stepIndex < currentStep) return "completed";
        if (stepIndex === currentStep) return "active";
        return "pending";
    };

    return (
        <div className="container animate-slide-in">
            <div style={{ padding: "4rem 0", maxWidth: "1200px", margin: "0 auto" }}>
                {/* Header */}
                <div style={{ textAlign: "center", marginBottom: "3rem" }}>
                    <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
                        Agent System Architecture
                    </h1>
                    <p className="text-subtext" style={{ fontSize: "1.25rem", marginBottom: "2rem" }}>
                        Workflows → Skills → Rules → Knowledge
                    </p>
                    <p style={{ maxWidth: "700px", margin: "0 auto 2rem", lineHeight: "1.6" }}>
                        Minh họa cách các thành phần của AI Agent system tương tác với nhau trong quá trình thực thi một task.
                    </p>

                    <button
                        onClick={runSimulation}
                        disabled={isRunning}
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            padding: "0.75rem 2rem",
                            fontSize: "1rem",
                            fontWeight: 600,
                            backgroundColor: isRunning ? "hsl(var(--muted))" : "hsl(var(--primary))",
                            color: "hsl(var(--primary-foreground))",
                            border: "none",
                            borderRadius: "8px",
                            cursor: isRunning ? "not-allowed" : "pointer",
                            transition: "all 0.2s ease"
                        }}
                    >
                        <Play size={20} />
                        {isRunning ? "Running..." : "Run Simulation"}
                    </button>
                </div>

                {/* Execution Flow Visualization */}
                <div className="card-wood" style={{ padding: "2rem", marginBottom: "3rem" }}>
                    <h2 style={{ fontSize: "1.5rem", marginBottom: "1.5rem" }}>
                        Execution Flow
                    </h2>
                    <ExecutionTree steps={executionFlow} currentStep={currentStep} stepCounter={{ value: 0 }} />
                </div>

                {/* Component Explanations */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "3rem" }}>
                    <ComponentCard
                        icon={<FileText size={24} />}
                        title="Workflows"
                        color="primary"
                        description="Định nghĩa quy trình làm việc từng bước. Workflows có thể gọi Skills, Rules, và Knowledge."
                        examples={[
                            "/feature-implementation",
                            "/ui_maintenance",
                            "/auth_maintenance"
                        ]}
                    />

                    <ComponentCard
                        icon={<Wrench size={24} />}
                        title="Skills"
                        color="secondary"
                        description="Chuyên môn cụ thể của agent. Skills có thể sử dụng Knowledge và tuân theo Rules."
                        examples={[
                            "UI Engineering Specialist",
                            "Authentication Specialist",
                            "Quiz Creator"
                        ]}
                    />

                    <ComponentCard
                        icon={<BookOpen size={24} />}
                        title="Rules"
                        color="accent"
                        description="Ràng buộc và quy tắc phải tuân theo. Rules được kiểm tra trước khi thực thi."
                        examples={[
                            "Design System Constraints",
                            "Naming Conventions",
                            "Security Policies"
                        ]}
                    />

                    <ComponentCard
                        icon={<Brain size={24} />}
                        title="Knowledge"
                        color="ink-brown"
                        description="Cơ sở tri thức và tài liệu tham khảo. Knowledge được load khi cần thiết."
                        examples={[
                            "Tailwind v4 Configuration",
                            "Project Architecture",
                            "API Documentation"
                        ]}
                    />
                </div>

                {/* Execution Order */}
                <div className="card-wood" style={{ padding: "2rem" }}>
                    <h2 style={{ fontSize: "1.5rem", marginBottom: "1.5rem" }}>
                        Thứ Tự Thực Thi
                    </h2>

                    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                        <ExecutionOrderStep
                            number={1}
                            title="User Request"
                            description="User gọi workflow bằng slash command (ví dụ: /feature-implementation)"
                        />

                        <ExecutionOrderStep
                            number={2}
                            title="Workflow Initialization"
                            description="Workflow được load và bắt đầu thực thi các bước đã định nghĩa"
                        />

                        <ExecutionOrderStep
                            number={3}
                            title="Rules Validation"
                            description="Kiểm tra các Rules liên quan (authentication, permissions, constraints)"
                        />

                        <ExecutionOrderStep
                            number={4}
                            title="Knowledge Loading"
                            description="Load Knowledge cần thiết (codebase context, documentation, standards)"
                        />

                        <ExecutionOrderStep
                            number={5}
                            title="Skill Invocation"
                            description="Gọi Skill phù hợp dựa trên task type (UI, Auth, Data, etc.)"
                        />

                        <ExecutionOrderStep
                            number={6}
                            title="Nested Execution"
                            description="Skill có thể gọi thêm Knowledge, Rules, hoặc thậm chí Workflows khác"
                        />

                        <ExecutionOrderStep
                            number={7}
                            title="Task Completion"
                            description="Hoàn thành task và trả kết quả về cho user"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

interface ExecutionTreeProps {
    steps: ExecutionStep[];
    currentStep: number;
    stepCounter: { value: number };
    depth?: number;
}

function ExecutionTree({ steps, currentStep, stepCounter, depth = 0 }: ExecutionTreeProps) {
    return (
        <div style={{ marginLeft: depth > 0 ? "2rem" : "0" }}>
            {steps.map((step) => {
                const stepIndex = stepCounter.value++;
                const status = stepIndex < currentStep ? "completed" : stepIndex === currentStep ? "active" : "pending";

                return (
                    <div key={step.id} style={{ marginBottom: "0.75rem" }}>
                        <ExecutionStepItem step={step} status={status} />
                        {step.children && (
                            <ExecutionTree
                                steps={step.children}
                                currentStep={currentStep}
                                stepCounter={stepCounter}
                                depth={depth + 1}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
}

interface ExecutionStepItemProps {
    step: ExecutionStep;
    status: StepStatus;
}

function ExecutionStepItem({ step, status }: ExecutionStepItemProps) {
    const getIcon = () => {
        switch (step.type) {
            case "workflow": return <FileText size={18} />;
            case "skill": return <Wrench size={18} />;
            case "rule": return <BookOpen size={18} />;
            case "knowledge": return <Brain size={18} />;
        }
    };

    const getColor = () => {
        switch (step.type) {
            case "workflow": return "primary";
            case "skill": return "secondary";
            case "rule": return "accent";
            case "knowledge": return "ink-brown";
        }
    };

    const color = getColor();

    return (
        <div style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            padding: "0.75rem 1rem",
            backgroundColor: status === "active"
                ? `hsl(var(--${color}) / 0.1)`
                : status === "completed"
                    ? "hsl(var(--muted) / 0.3)"
                    : "transparent",
            border: `1px solid ${status === "active" ? `hsl(var(--${color}))` : "hsl(var(--border))"}`,
            borderRadius: "8px",
            transition: "all 0.3s ease"
        }}>
            <div style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                backgroundColor: `hsl(var(--${color}) / 0.1)`,
                color: `hsl(var(--${color}))`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}>
                {status === "completed" ? <CheckCircle size={18} /> : getIcon()}
            </div>

            <div style={{ flex: 1 }}>
                <div style={{
                    fontWeight: 600,
                    fontSize: "0.95rem",
                    color: `hsl(var(--${color}))`
                }}>
                    {step.name}
                </div>
                <div style={{
                    fontSize: "0.85rem",
                    color: "hsl(var(--ink-brown) / 0.7)",
                    marginTop: "0.25rem"
                }}>
                    {step.description}
                </div>
            </div>

            {status === "active" && (
                <div style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: `hsl(var(--${color}))`,
                    animation: "pulse 2s ease-in-out infinite"
                }} />
            )}
        </div>
    );
}

interface ComponentCardProps {
    icon: React.ReactNode;
    title: string;
    color: string;
    description: string;
    examples: string[];
}

function ComponentCard({ icon, title, color, description, examples }: ComponentCardProps) {
    return (
        <div className="card-wood" style={{ padding: "1.5rem" }}>
            <div style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "1rem"
            }}>
                <div style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "12px",
                    backgroundColor: `hsl(var(--${color}) / 0.1)`,
                    color: `hsl(var(--${color}))`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    {icon}
                </div>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 600 }}>
                    {title}
                </h3>
            </div>

            <p style={{
                fontSize: "0.9rem",
                lineHeight: "1.6",
                marginBottom: "1rem",
                color: "hsl(var(--ink-brown) / 0.8)"
            }}>
                {description}
            </p>

            <div style={{
                backgroundColor: "hsl(var(--muted) / 0.3)",
                padding: "0.75rem",
                borderRadius: "6px"
            }}>
                <div style={{
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    marginBottom: "0.5rem",
                    color: "hsl(var(--ink-brown) / 0.7)"
                }}>
                    Examples:
                </div>
                {examples.map((example, idx) => (
                    <div key={idx} style={{
                        fontSize: "0.85rem",
                        fontFamily: "monospace",
                        color: `hsl(var(--${color}))`,
                        marginBottom: "0.25rem"
                    }}>
                        • {example}
                    </div>
                ))}
            </div>
        </div>
    );
}

interface ExecutionOrderStepProps {
    number: number;
    title: string;
    description: string;
}

function ExecutionOrderStep({ number, title, description }: ExecutionOrderStepProps) {
    return (
        <div style={{
            display: "flex",
            gap: "1rem",
            alignItems: "flex-start"
        }}>
            <div style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                backgroundColor: "hsl(var(--primary) / 0.1)",
                color: "hsl(var(--primary))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: "0.9rem",
                flexShrink: 0
            }}>
                {number}
            </div>

            <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: "1rem", marginBottom: "0.25rem" }}>
                    {title}
                </div>
                <div style={{
                    fontSize: "0.9rem",
                    color: "hsl(var(--ink-brown) / 0.7)",
                    lineHeight: "1.5"
                }}>
                    {description}
                </div>
            </div>
        </div>
    );
}
