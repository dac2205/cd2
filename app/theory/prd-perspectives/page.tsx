'use client';

import { useState } from "react";

const prdPerspectives = {
    conanFactory: {
        name: "🤖 Conan Content Factory",
        color: "hsl(var(--primary))",
        prdType: "Digital Product PRD",
        prdFocus: "User experience, content quality, AI workflows",
        perspectives: {
            userStories: {
                nameEn: "User Stories",
                nameVi: "Câu chuyện người dùng",
                example: "As a content creator, I want AI to generate first drafts so that I can focus on editing and brand voice"
            },
            technicalSpecs: {
                nameEn: "Technical Specifications",
                nameVi: "Đặc tả kỹ thuật",
                example: "Prompt templates, LLM model selection, API rate limits, token budgets"
            },
            qualityMetrics: {
                nameEn: "Quality Metrics",
                nameVi: "Chỉ số chất lượng",
                example: "Editorial rubric score, hallucination rate, brand voice consistency, engagement metrics"
            },
            workflow: {
                nameEn: "Workflow Requirements",
                nameVi: "Yêu cầu quy trình",
                example: "Idea → Structure → Draft → Edit → Format → Publish (with human review gates)"
            },
            constraints: {
                nameEn: "Constraints & Limitations",
                nameVi: "Ràng buộc & Giới hạn",
                example: "Token limits, API costs, human review capacity, publishing schedule"
            }
        }
    },
    carFactory: {
        name: "🚗 VinFast Auto Factory",
        color: "hsl(var(--accent))",
        prdType: "Manufacturing PRD",
        prdFocus: "Safety standards, production efficiency, quality control",
        perspectives: {
            userStories: {
                nameEn: "User Stories",
                nameVi: "Câu chuyện người dùng",
                example: "As a customer, I want a car that meets international safety standards so that my family is protected"
            },
            technicalSpecs: {
                nameEn: "Technical Specifications",
                nameVi: "Đặc tả kỹ thuật",
                example: "Engine torque, battery capacity, crash test ratings, material specifications"
            },
            qualityMetrics: {
                nameEn: "Quality Metrics",
                nameVi: "Chỉ số chất lượng",
                example: "Defect rate per 1000 units, ISO compliance, safety test pass rate, warranty claims"
            },
            workflow: {
                nameEn: "Workflow Requirements",
                nameVi: "Yêu cầu quy trình",
                example: "Parts → Body assembly → Paint → Final assembly → QC → Delivery"
            },
            constraints: {
                nameEn: "Constraints & Limitations",
                nameVi: "Ràng buộc & Giới hạn",
                example: "Supply chain dependencies, production capacity, regulatory compliance, capital costs"
            }
        }
    },
    newspaper: {
        name: "📰 Thanh Niên Newspaper",
        color: "hsl(var(--secondary))",
        prdType: "Editorial PRD",
        prdFocus: "Journalistic integrity, timeliness, reader engagement",
        perspectives: {
            userStories: {
                nameEn: "User Stories",
                nameVi: "Câu chuyện người dùng",
                example: "As a reader, I want accurate and timely news so that I can stay informed about current events"
            },
            technicalSpecs: {
                nameEn: "Technical Specifications",
                nameVi: "Đặc tả kỹ thuật",
                example: "Article word count, photo resolution, print quality, distribution channels"
            },
            qualityMetrics: {
                nameEn: "Quality Metrics",
                nameVi: "Chỉ số chất lượng",
                example: "Fact-check accuracy, editorial standards compliance, readership numbers, correction rate"
            },
            workflow: {
                nameEn: "Workflow Requirements",
                nameVi: "Yêu cầu quy trình",
                example: "News tip → Investigation → Writing → Editing → Legal review → Publication"
            },
            constraints: {
                nameEn: "Constraints & Limitations",
                nameVi: "Ràng buộc & Giới hạn",
                example: "Publication deadlines, journalist availability, legal restrictions, printing costs"
            }
        }
    }
};

const perspectiveLabels = [
    { key: 'userStories', labelEn: 'User Stories', labelVi: 'Câu chuyện người dùng' },
    { key: 'technicalSpecs', labelEn: 'Technical Specifications', labelVi: 'Đặc tả kỹ thuật' },
    { key: 'qualityMetrics', labelEn: 'Quality Metrics', labelVi: 'Chỉ số chất lượng' },
    { key: 'workflow', labelEn: 'Workflow Requirements', labelVi: 'Yêu cầu quy trình' },
    { key: 'constraints', labelEn: 'Constraints & Limitations', labelVi: 'Ràng buộc & Giới hạn' }
];

export default function PRDPerspectivesPage() {
    const [selectedFactories, setSelectedFactories] = useState<string[]>(['conanFactory', 'carFactory', 'newspaper']);

    const toggleFactory = (factory: string) => {
        if (selectedFactories.includes(factory)) {
            if (selectedFactories.length > 1) {
                setSelectedFactories(selectedFactories.filter(f => f !== factory));
            }
        } else {
            setSelectedFactories([...selectedFactories, factory]);
        }
    };

    const getSelectedFactoryData = () => {
        return selectedFactories.map(key => ({
            key,
            ...prdPerspectives[key as keyof typeof prdPerspectives]
        }));
    };

    return (
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem 1rem' }}>
            <h1 style={{
                fontSize: '2.5rem',
                fontWeight: 'bold',
                marginBottom: '1rem',
                color: 'hsl(var(--foreground))',
                textAlign: 'center'
            }}>
                PRD Perspectives Comparison
            </h1>

            <p style={{
                fontSize: '1.125rem',
                color: 'hsl(var(--muted-foreground))',
                marginBottom: '2rem',
                lineHeight: '1.75',
                textAlign: 'center',
                maxWidth: '900px',
                margin: '0 auto 2rem'
            }}>
                So sánh các góc nhìn và định dạng PRD (Product Requirement Document) qua 3 loại factory khác nhau
            </p>

            {/* Core Concept */}
            <div style={{
                backgroundColor: 'hsl(var(--primary) / 0.1)',
                padding: '2rem',
                borderRadius: '0.75rem',
                border: '2px solid hsl(var(--primary))',
                marginBottom: '3rem'
            }}>
                <h2 style={{
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    marginBottom: '1rem',
                    color: 'hsl(var(--primary))'
                }}>
                    💡 What is a PRD?
                </h2>
                <p style={{
                    fontSize: '1.125rem',
                    lineHeight: '1.8',
                    color: 'hsl(var(--foreground))',
                    marginBottom: '1rem'
                }}>
                    <strong>Product Requirement Document (PRD)</strong> là tài liệu định nghĩa <em>cái gì</em> cần được xây dựng, <em>tại sao</em> cần xây dựng, và <em>thành công</em> được đo lường như thế nào.
                </p>
                <p style={{
                    fontSize: '1rem',
                    lineHeight: '1.6',
                    color: 'hsl(var(--muted-foreground))'
                }}>
                    Mỗi ngành công nghiệp có cách tiếp cận PRD khác nhau, nhưng tất cả đều trả lời 5 câu hỏi cốt lõi: <strong>User Stories</strong> (ai cần gì?), <strong>Technical Specs</strong> (làm thế nào?), <strong>Quality Metrics</strong> (đo lường ra sao?), <strong>Workflow</strong> (quy trình nào?), và <strong>Constraints</strong> (giới hạn gì?).
                </p>
            </div>

            {/* Factory Selection */}
            <div style={{
                display: 'flex',
                gap: '1rem',
                justifyContent: 'center',
                marginBottom: '3rem',
                flexWrap: 'wrap'
            }}>
                {Object.entries(prdPerspectives).map(([key, factory]) => (
                    <button
                        key={key}
                        onClick={() => toggleFactory(key)}
                        style={{
                            padding: '0.75rem 1.5rem',
                            borderRadius: '0.5rem',
                            border: selectedFactories.includes(key)
                                ? `2px solid ${factory.color}`
                                : '2px solid hsl(var(--border))',
                            backgroundColor: selectedFactories.includes(key)
                                ? factory.color
                                : 'hsl(var(--background))',
                            color: selectedFactories.includes(key)
                                ? 'white'
                                : 'hsl(var(--foreground))',
                            cursor: 'pointer',
                            fontWeight: 600,
                            fontSize: '1rem',
                            transition: 'all 0.2s',
                            opacity: selectedFactories.includes(key) ? 1 : 0.6
                        }}
                    >
                        {factory.name}
                    </button>
                ))}
            </div>

            {/* PRD Types Overview */}
            <div style={{
                marginBottom: '3rem'
            }}>
                <h2 style={{
                    fontSize: '1.75rem',
                    fontWeight: 'bold',
                    marginBottom: '1.5rem',
                    color: 'hsl(var(--foreground))',
                    textAlign: 'center'
                }}>
                    PRD Types & Focus Areas
                    <div style={{ fontSize: '1rem', fontWeight: 'normal', color: 'hsl(var(--muted-foreground))', marginTop: '0.5rem' }}>
                        Các loại PRD và trọng tâm
                    </div>
                </h2>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                    gap: '1.5rem'
                }}>
                    {getSelectedFactoryData().map(factory => (
                        <div key={factory.key} style={{
                            backgroundColor: factory.key === 'conanFactory' ? 'hsl(var(--primary) / 0.05)' : 'hsl(var(--secondary))',
                            padding: '1.5rem',
                            borderRadius: '0.75rem',
                            border: `2px solid ${factory.key === 'conanFactory' ? factory.color : 'hsl(var(--border))'}`,
                            borderLeft: `6px solid ${factory.color}`
                        }}>
                            <h3 style={{
                                fontSize: '1.25rem',
                                fontWeight: 'bold',
                                marginBottom: '0.5rem',
                                color: factory.color
                            }}>
                                {factory.name}
                            </h3>
                            <div style={{
                                fontSize: '1rem',
                                fontWeight: 600,
                                marginBottom: '0.5rem',
                                color: 'hsl(var(--foreground))'
                            }}>
                                {factory.prdType}
                            </div>
                            <div style={{
                                fontSize: '0.9375rem',
                                color: 'hsl(var(--muted-foreground))',
                                lineHeight: '1.6'
                            }}>
                                <strong>Focus:</strong> {factory.prdFocus}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 5 Perspectives Comparison Table */}
            <div style={{
                overflowX: 'auto',
                marginBottom: '3rem'
            }}>
                <h2 style={{
                    fontSize: '1.75rem',
                    fontWeight: 'bold',
                    marginBottom: '1.5rem',
                    color: 'hsl(var(--foreground))',
                    textAlign: 'center'
                }}>
                    5 Core PRD Perspectives
                    <div style={{ fontSize: '1rem', fontWeight: 'normal', color: 'hsl(var(--muted-foreground))', marginTop: '0.5rem' }}>
                        5 góc nhìn cốt lõi trong PRD
                    </div>
                </h2>

                <table style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    backgroundColor: 'hsl(var(--background))',
                    border: '2px solid hsl(var(--border))',
                    borderRadius: '0.5rem',
                    overflow: 'hidden'
                }}>
                    <thead>
                        <tr style={{
                            backgroundColor: 'hsl(var(--secondary))',
                            borderBottom: '2px solid hsl(var(--border))'
                        }}>
                            <th style={{
                                padding: '1.25rem',
                                textAlign: 'center',
                                fontWeight: 'bold',
                                fontSize: '1.125rem',
                                color: 'hsl(var(--foreground))',
                                minWidth: '180px'
                            }}>
                                <div>Perspective</div>
                                <div style={{ fontSize: '0.875rem', fontWeight: 'normal', color: 'hsl(var(--muted-foreground))', marginTop: '0.25rem' }}>
                                    Góc nhìn
                                </div>
                            </th>
                            {getSelectedFactoryData().map(factory => (
                                <th key={factory.key} style={{
                                    padding: '1.25rem',
                                    textAlign: 'center',
                                    fontWeight: 'bold',
                                    fontSize: '1.125rem',
                                    color: factory.key === 'conanFactory' ? factory.color : 'hsl(var(--foreground))',
                                    minWidth: '300px',
                                    backgroundColor: factory.key === 'conanFactory' ? 'hsl(var(--primary) / 0.1)' : 'transparent'
                                }}>
                                    {factory.name}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {perspectiveLabels.map((perspective, index) => (
                            <tr key={perspective.key} style={{
                                borderBottom: index < perspectiveLabels.length - 1 ? '1px solid hsl(var(--border))' : 'none',
                            }}>
                                <td style={{
                                    padding: '1.25rem',
                                    verticalAlign: 'top',
                                    backgroundColor: 'hsl(var(--secondary) / 0.3)'
                                }}>
                                    <div style={{ fontWeight: 'bold', fontSize: '1rem', color: 'hsl(var(--foreground))' }}>
                                        {perspective.labelEn}
                                    </div>
                                    <div style={{ fontSize: '0.875rem', color: 'hsl(var(--muted-foreground))', marginTop: '0.25rem' }}>
                                        {perspective.labelVi}
                                    </div>
                                </td>
                                {getSelectedFactoryData().map(factory => {
                                    const item = factory.perspectives[perspective.key as keyof typeof factory.perspectives];
                                    return (
                                        <td key={factory.key} style={{
                                            padding: '1.25rem',
                                            verticalAlign: 'top',
                                            backgroundColor: factory.key === 'conanFactory' ? 'hsl(var(--primary) / 0.05)' : 'transparent'
                                        }}>
                                            <div style={{
                                                fontSize: '0.9375rem',
                                                color: 'hsl(var(--foreground))',
                                                lineHeight: '1.6',
                                                fontStyle: 'italic'
                                            }}>
                                                "{item.example}"
                                            </div>
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Key Insights */}
            <div style={{
                backgroundColor: 'hsl(var(--secondary))',
                padding: '2rem',
                borderRadius: '0.75rem',
                border: '2px solid hsl(var(--border))'
            }}>
                <h2 style={{
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    marginBottom: '1.5rem',
                    color: 'hsl(var(--foreground))'
                }}>
                    Key Insights
                </h2>

                <div style={{ display: 'grid', gap: '1.25rem' }}>
                    <div style={{
                        backgroundColor: 'hsl(var(--background))',
                        padding: '1.25rem',
                        borderRadius: '0.5rem',
                        borderLeft: '4px solid hsl(var(--primary))'
                    }}>
                        <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: 'hsl(var(--foreground))' }}>
                            PRD format thay đổi theo ngành, nhưng 5 góc nhìn luôn giống nhau
                        </h3>
                        <p style={{ fontSize: '0.9375rem', color: 'hsl(var(--muted-foreground))', lineHeight: '1.6' }}>
                            Dù là xe hơi, báo giấy, hay AI content, mọi PRD đều phải trả lời: Ai cần gì? Làm thế nào? Đo lường ra sao? Quy trình nào? Giới hạn gì?
                        </p>
                    </div>

                    <div style={{
                        backgroundColor: 'hsl(var(--background))',
                        padding: '1.25rem',
                        borderRadius: '0.5rem',
                        borderLeft: '4px solid hsl(var(--primary))'
                    }}>
                        <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: 'hsl(var(--foreground))' }}>
                            User Stories = Điểm xuất phát của mọi PRD
                        </h3>
                        <p style={{ fontSize: '0.9375rem', color: 'hsl(var(--muted-foreground))', lineHeight: '1.6' }}>
                            Không có user story rõ ràng = không biết đang giải quyết vấn đề gì. VinFast cần "xe an toàn", Thanh Niên cần "tin chính xác", Conan cần "content chất lượng với tốc độ cao".
                        </p>
                    </div>

                    <div style={{
                        backgroundColor: 'hsl(var(--background))',
                        padding: '1.25rem',
                        borderRadius: '0.5rem',
                        borderLeft: '4px solid hsl(var(--primary))'
                    }}>
                        <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: 'hsl(var(--foreground))' }}>
                            Quality Metrics phải đo được, không được mơ hồ
                        </h3>
                        <p style={{ fontSize: '0.9375rem', color: 'hsl(var(--muted-foreground))', lineHeight: '1.6' }}>
                            "Chất lượng cao" là mơ hồ. "Defect rate {'<'} 2 per 1000 units" (VinFast), "Correction rate {'<'} 0.5%" (Thanh Niên), "Editorial score {'>'} 8/10" (Conan) là cụ thể.
                        </p>
                    </div>

                    <div style={{
                        backgroundColor: 'hsl(var(--background))',
                        padding: '1.25rem',
                        borderRadius: '0.5rem',
                        borderLeft: '4px solid hsl(var(--primary))'
                    }}>
                        <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: 'hsl(var(--foreground))' }}>
                            Constraints = Ranh giới của khả thi
                        </h3>
                        <p style={{ fontSize: '0.9375rem', color: 'hsl(var(--muted-foreground))', lineHeight: '1.6' }}>
                            PRD tốt phải nói rõ giới hạn: VinFast bị giới hạn bởi supply chain, Thanh Niên bị giới hạn bởi deadline, Conan bị giới hạn bởi token budget và human review capacity.
                        </p>
                    </div>

                    <div style={{
                        backgroundColor: 'hsl(var(--background))',
                        padding: '1.25rem',
                        borderRadius: '0.5rem',
                        borderLeft: '4px solid hsl(var(--primary))'
                    }}>
                        <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: 'hsl(var(--foreground))' }}>
                            Workflow Requirements = Production Line của PRD
                        </h3>
                        <p style={{ fontSize: '0.9375rem', color: 'hsl(var(--muted-foreground))', lineHeight: '1.6' }}>
                            PRD phải định nghĩa rõ workflow: từ input → stations → quality gates → output. Không có workflow rõ ràng = không thể scale.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
