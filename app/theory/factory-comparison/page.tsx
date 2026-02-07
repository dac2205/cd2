'use client';

import { useState } from "react";
import type { Metadata } from "next";

const factoryData = {
    conanFactory: {
        name: "🤖 Conan Content Factory",
        shortName: "Conan Factory",
        color: "hsl(var(--primary))",
        components: {
            warehouse: {
                nameEn: "Content Warehouse",
                nameVi: "Kho nội dung",
                description: "Insight, idea, prompt templates, brand guidelines"
            },
            productionLine: {
                nameEn: "Content Production Line",
                nameVi: "Dây chuyền sản xuất nội dung",
                description: "AI workflows: Research → Draft → Edit → Format → Publish"
            },
            qualityControl: {
                nameEn: "Editorial QC",
                nameVi: "Kiểm định biên tập",
                description: "Brand voice, tone, logic, fact-checking, plagiarism"
            },
            planning: {
                nameEn: "Content Planning",
                nameVi: "Kế hoạch nội dung",
                description: "Content calendar, campaign timeline, distribution schedule"
            },
            automation: {
                nameEn: "AI Agents",
                nameVi: "Tác nhân AI",
                description: "Research agent, writing agent, SEO agent, image generation"
            },
            bottleneck: {
                nameEn: "Bottleneck",
                nameVi: "Điểm nghẽn",
                description: "Prompt engineering, human review, distribution channels"
            }
        }
    },
    carFactory: {
        name: "🚗 VinFast Auto Factory",
        shortName: "VinFast",
        color: "hsl(var(--accent))",
        components: {
            warehouse: {
                nameEn: "Parts Warehouse",
                nameVi: "Kho linh kiện",
                description: "Kho chứa động cơ, khung xe, bánh xe, điện tử"
            },
            productionLine: {
                nameEn: "Assembly Line",
                nameVi: "Dây chuyền lắp ráp",
                description: "Assembly line từ khung xe → động cơ → nội thất → sơn"
            },
            qualityControl: {
                nameEn: "Quality Control",
                nameVi: "Kiểm định chất lượng",
                description: "Test độ bền, an toàn, tiêu chuẩn ISO"
            },
            planning: {
                nameEn: "Production Planning",
                nameVi: "Kế hoạch sản xuất",
                description: "Sản xuất bao nhiêu xe, model nào, khi nào giao"
            },
            automation: {
                nameEn: "Assembly Robots",
                nameVi: "Robot lắp ráp",
                description: "Máy hàn, sơn, lắp ráp tự động"
            },
            bottleneck: {
                nameEn: "Bottleneck",
                nameVi: "Công đoạn nghẽn",
                description: "Thiếu chip, chậm sơn, QC chưa pass"
            }
        }
    },
    newspaper: {
        name: "📰 Thanh Niên Newspaper",
        shortName: "Newspaper",
        color: "hsl(var(--secondary))",
        components: {
            warehouse: {
                nameEn: "Content Archive",
                nameVi: "Kho tin bài",
                description: "Tin tức đã viết, ảnh, nguồn tin, archive"
            },
            productionLine: {
                nameEn: "Editorial Process",
                nameVi: "Quy trình biên tập",
                description: "Phóng viên → Biên tập viên → Trình bày → In ấn"
            },
            qualityControl: {
                nameEn: "Editorial Review",
                nameVi: "Biên tập viên",
                description: "Kiểm tra sự thật, chính tả, đạo đức báo chí"
            },
            planning: {
                nameEn: "Publishing Schedule",
                nameVi: "Kế hoạch xuất bản",
                description: "Chủ đề số báo, deadline, phân công phóng viên"
            },
            automation: {
                nameEn: "Printing Press",
                nameVi: "Máy in offset",
                description: "In hàng loạt, tự động cắt, đóng gói"
            },
            bottleneck: {
                nameEn: "Bottleneck",
                nameVi: "Điểm nghẽn",
                description: "Phóng viên thiếu, deadline gấp, máy in hỏng"
            }
        }
    }
};

const componentLabels = [
    { key: 'warehouse', labelEn: 'Warehouse / Inventory', labelVi: 'Kho nguyên liệu' },
    { key: 'productionLine', labelEn: 'Production Line', labelVi: 'Dây chuyền sản xuất' },
    { key: 'qualityControl', labelEn: 'Quality Control', labelVi: 'Kiểm định chất lượng' },
    { key: 'planning', labelEn: 'Planning & Scheduling', labelVi: 'Kế hoạch & Lịch trình' },
    { key: 'automation', labelEn: 'Automation', labelVi: 'Tự động hóa' },
    { key: 'bottleneck', labelEn: 'Bottleneck', labelVi: 'Điểm nghẽn' }
];

export default function FactoryComparisonPage() {
    const [selectedFactories, setSelectedFactories] = useState<string[]>(['conanFactory', 'carFactory', 'newspaper']);
    const [modalImage, setModalImage] = useState<string | null>(null);

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
            ...factoryData[key as keyof typeof factoryData]
        }));
    };

    const infographics = [
        {
            key: 'conanFactory',
            title: '🤖 Conan Content Factory Components',
            titleVi: 'Các thành phần của Conan Content Factory',
            image: '/infographics/conan_factory_components.png'
        },
        {
            key: 'carFactory',
            title: '🚗 VinFast Auto Factory Components',
            titleVi: 'Các thành phần của VinFast Auto Factory',
            image: '/infographics/vinfast_factory_components.png'
        }
    ];

    return (
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem 1rem' }}>
            <h1 style={{
                fontSize: '2.5rem',
                fontWeight: 'bold',
                marginBottom: '1rem',
                color: 'hsl(var(--foreground))',
                textAlign: 'center'
            }}>
                Factory Comparison
            </h1>

            <p style={{
                fontSize: '1.125rem',
                color: 'hsl(var(--muted-foreground))',
                marginBottom: '2rem',
                lineHeight: '1.75',
                textAlign: 'center',
                maxWidth: '800px',
                margin: '0 auto 2rem'
            }}>
                So sánh kiến trúc của các loại "nhà máy" khác nhau. Chọn 2 hoặc 3 factory để so sánh.
            </p>

            {/* Factory Selection */}
            <div style={{
                display: 'flex',
                gap: '1rem',
                justifyContent: 'center',
                marginBottom: '3rem',
                flexWrap: 'wrap'
            }}>
                {Object.entries(factoryData).map(([key, factory]) => (
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

            {/* Comparison Table */}
            <div style={{
                overflowX: 'auto',
                marginBottom: '3rem'
            }}>
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
                                <div>Component</div>
                                <div style={{ fontSize: '0.875rem', fontWeight: 'normal', color: 'hsl(var(--muted-foreground))', marginTop: '0.25rem' }}>
                                    Thành phần
                                </div>
                            </th>
                            {getSelectedFactoryData().map(factory => (
                                <th key={factory.key} style={{
                                    padding: '1.25rem',
                                    textAlign: 'center',
                                    fontWeight: 'bold',
                                    fontSize: '1.125rem',
                                    color: factory.key === 'conanFactory' ? factory.color : 'hsl(var(--foreground))',
                                    minWidth: '250px',
                                    backgroundColor: factory.key === 'conanFactory' ? 'hsl(var(--primary) / 0.1)' : 'transparent'
                                }}>
                                    {factory.name}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {componentLabels.map((component, index) => (
                            <tr key={component.key} style={{
                                borderBottom: index < componentLabels.length - 1 ? '1px solid hsl(var(--border))' : 'none',
                            }}>
                                <td style={{
                                    padding: '1.25rem',
                                    verticalAlign: 'top'
                                }}>
                                    <div style={{ fontWeight: 'bold', fontSize: '1rem', color: 'hsl(var(--foreground))' }}>
                                        {component.labelEn}
                                    </div>
                                    <div style={{ fontSize: '0.875rem', color: 'hsl(var(--muted-foreground))', marginTop: '0.25rem' }}>
                                        {component.labelVi}
                                    </div>
                                </td>
                                {getSelectedFactoryData().map(factory => {
                                    const comp = factory.components[component.key as keyof typeof factory.components];
                                    return (
                                        <td key={factory.key} style={{
                                            padding: '1.25rem',
                                            verticalAlign: 'top',
                                            backgroundColor: factory.key === 'conanFactory' ? 'hsl(var(--primary) / 0.05)' : 'transparent'
                                        }}>
                                            <div style={{ fontWeight: 600, marginBottom: '0.25rem', color: factory.key === 'conanFactory' ? factory.color : 'hsl(var(--foreground))' }}>
                                                {comp.nameEn}
                                            </div>
                                            <div style={{ fontSize: '0.875rem', color: 'hsl(var(--muted-foreground))', marginBottom: '0.5rem' }}>
                                                {comp.nameVi}
                                            </div>
                                            <div style={{ fontSize: '0.9375rem', color: 'hsl(var(--muted-foreground))', lineHeight: '1.6' }}>
                                                {comp.description}
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
                            Tư duy hệ thống giống nhau
                        </h3>
                        <p style={{ fontSize: '0.9375rem', color: 'hsl(var(--muted-foreground))', lineHeight: '1.6' }}>
                            Cả 3 đều có: Warehouse (kho) → Production Line (dây chuyền) → QC (kiểm định) → Planning (kế hoạch) → Automation (tự động hóa) → Bottleneck (điểm nghẽn)
                        </p>
                    </div>

                    <div style={{
                        backgroundColor: 'hsl(var(--background))',
                        padding: '1.25rem',
                        borderRadius: '0.5rem',
                        borderLeft: '4px solid hsl(var(--primary))'
                    }}>
                        <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: 'hsl(var(--foreground))' }}>
                            AI Factory = Newspaper 2.0
                        </h3>
                        <p style={{ fontSize: '0.9375rem', color: 'hsl(var(--muted-foreground))', lineHeight: '1.6' }}>
                            AI Content Factory về bản chất là "tờ báo số" với AI thay thế phóng viên/biên tập viên, nhưng vẫn cần human oversight cho brand voice và fact-checking
                        </p>
                    </div>

                    <div style={{
                        backgroundColor: 'hsl(var(--background))',
                        padding: '1.25rem',
                        borderRadius: '0.5rem',
                        borderLeft: '4px solid hsl(var(--primary))'
                    }}>
                        <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: 'hsl(var(--foreground))' }}>
                            Bottleneck quyết định tốc độ
                        </h3>
                        <p style={{ fontSize: '0.9375rem', color: 'hsl(var(--muted-foreground))', lineHeight: '1.6' }}>
                            VinFast bị nghẽn ở chip/QC, Báo giấy bị nghẽn ở phóng viên/deadline, AI Factory bị nghẽn ở prompt engineering và human review
                        </p>
                    </div>

                    <div style={{
                        backgroundColor: 'hsl(var(--background))',
                        padding: '1.25rem',
                        borderRadius: '0.5rem',
                        borderLeft: '4px solid hsl(var(--primary))'
                    }}>
                        <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: 'hsl(var(--foreground))' }}>
                            Automation ≠ Loại bỏ con người
                        </h3>
                        <p style={{ fontSize: '0.9375rem', color: 'hsl(var(--muted-foreground))', lineHeight: '1.6' }}>
                            Robot không thay thế hoàn toàn thợ lắp ráp. AI không thay thế hoàn toàn writer. Máy in không thay thế hoàn toàn thợ in. Con người chuyển từ "làm" sang "giám sát và xử lý ngoại lệ"
                        </p>
                    </div>
                </div>
            </div>

            {/* Image Modal */}
            {modalImage && (
                <div
                    onClick={() => setModalImage(null)}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.9)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1000,
                        cursor: 'pointer',
                        padding: '2rem'
                    }}
                >
                    <div style={{
                        position: 'relative',
                        maxWidth: '90vw',
                        maxHeight: '90vh'
                    }}>
                        <img
                            src={modalImage}
                            alt="Enlarged infographic"
                            style={{
                                maxWidth: '100%',
                                maxHeight: '90vh',
                                objectFit: 'contain',
                                borderRadius: '0.5rem'
                            }}
                        />
                        <button
                            onClick={() => setModalImage(null)}
                            style={{
                                position: 'absolute',
                                top: '-1rem',
                                right: '-1rem',
                                backgroundColor: 'white',
                                color: 'black',
                                border: 'none',
                                borderRadius: '50%',
                                width: '2.5rem',
                                height: '2.5rem',
                                fontSize: '1.5rem',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: 'bold',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
                            }}
                        >
                            ×
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
