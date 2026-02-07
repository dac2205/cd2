'use client';

import { useState } from "react";

const productionLineData = {
    conanFactory: {
        name: "🤖 Conan Content Factory",
        color: "hsl(var(--primary))",
        components: {
            inputFeed: {
                nameEn: "Input Feed",
                nameVi: "Đầu vào",
                description: "Insight, raw thought, transcript, data, prompt block"
            },
            stations: {
                nameEn: "Stations / Worksteps",
                nameVi: "Công đoạn",
                description: "Idea gen → Structuring → Writing → Formatting → Platform adaptation"
            },
            transformationLogic: {
                nameEn: "Transformation Logic",
                nameVi: "Logic biến đổi",
                description: "Prompt logic, framework viết, brand voice, angle rules"
            },
            qualityGates: {
                nameEn: "Quality Gates",
                nameVi: "Cổng kiểm soát",
                description: "Editorial rubric, tone check, logic check, hallucination check"
            },
            throughput: {
                nameEn: "Throughput & Bottleneck",
                nameVi: "Tốc độ & Điểm nghẽn",
                description: "Prompt yếu / human review nghẽn → scale chết"
            },
            output: {
                nameEn: "Output",
                nameVi: "Đầu ra",
                description: "Content publish-ready (post, reel, carousel, thread…)"
            }
        }
    },
    carFactory: {
        name: "🚗 VinFast Auto Factory",
        color: "hsl(var(--accent))",
        components: {
            inputFeed: {
                nameEn: "Input Feed",
                nameVi: "Đầu vào",
                description: "Linh kiện, module, pin, khung"
            },
            stations: {
                nameEn: "Stations / Worksteps",
                nameVi: "Công đoạn",
                description: "Body → Paint → Assembly → Final check"
            },
            transformationLogic: {
                nameEn: "Transformation Logic",
                nameVi: "Logic biến đổi",
                description: "SOP kỹ thuật, torque, tiêu chuẩn an toàn"
            },
            qualityGates: {
                nameEn: "Quality Gates",
                nameVi: "Cổng kiểm soát",
                description: "QC giữa line, test cuối"
            },
            throughput: {
                nameEn: "Throughput & Bottleneck",
                nameVi: "Tốc độ & Điểm nghẽn",
                description: "Robot chậm → cả line chậm"
            },
            output: {
                nameEn: "Output",
                nameVi: "Đầu ra",
                description: "Xe đạt chuẩn xuất xưởng"
            }
        }
    },
    newspaper: {
        name: "📰 Thanh Niên Newspaper",
        color: "hsl(var(--secondary))",
        components: {
            inputFeed: {
                nameEn: "Input Feed",
                nameVi: "Đầu vào",
                description: "Tin thô, nguồn tin, phóng sự, ảnh"
            },
            stations: {
                nameEn: "Stations / Worksteps",
                nameVi: "Công đoạn",
                description: "Phóng viên → Biên tập → Trình bày → In ấn"
            },
            transformationLogic: {
                nameEn: "Transformation Logic",
                nameVi: "Logic biến đổi",
                description: "Quy chuẩn báo chí, fact-check, headline rules"
            },
            qualityGates: {
                nameEn: "Quality Gates",
                nameVi: "Cổng kiểm soát",
                description: "Tổng biên tập duyệt, pháp lý"
            },
            throughput: {
                nameEn: "Throughput & Bottleneck",
                nameVi: "Tốc độ & Điểm nghẽn",
                description: "Biên tập nghẽn → báo ra trễ"
            },
            output: {
                nameEn: "Output",
                nameVi: "Đầu ra",
                description: "Số báo phát hành"
            }
        }
    }
};

const componentLabels = [
    { key: 'inputFeed', labelEn: 'Input Feed', labelVi: 'Đầu vào' },
    { key: 'stations', labelEn: 'Stations / Worksteps', labelVi: 'Công đoạn' },
    { key: 'transformationLogic', labelEn: 'Transformation Logic', labelVi: 'Logic biến đổi' },
    { key: 'qualityGates', labelEn: 'Quality Gates', labelVi: 'Cổng kiểm soát' },
    { key: 'throughput', labelEn: 'Throughput & Bottleneck', labelVi: 'Tốc độ & Điểm nghẽn' },
    { key: 'output', labelEn: 'Output', labelVi: 'Đầu ra' }
];

export default function ProductionLinePage() {
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
            ...productionLineData[key as keyof typeof productionLineData]
        }));
    };

    const infographics = [
        {
            key: 'conanFactory',
            title: '🤖 Conan Content Factory Production Line',
            titleVi: 'Dây chuyền sản xuất của Conan Content Factory',
            image: '/infographics/conan_production_line.png'
        },
        {
            key: 'carFactory',
            title: '🚗 VinFast Auto Factory Production Line',
            titleVi: 'Dây chuyền sản xuất của VinFast Auto Factory',
            image: '/infographics/vinfast_production_line.png'
        },
        {
            key: 'newspaper',
            title: '📰 Thanh Niên Newspaper Production Line',
            titleVi: 'Dây chuyền sản xuất của Thanh Niên Newspaper',
            image: '/infographics/newspaper_production_line.png'
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
                Production Line Comparison
            </h1>

            <p style={{
                fontSize: '1.125rem',
                color: 'hsl(var(--muted-foreground))',
                marginBottom: '1rem',
                lineHeight: '1.75',
                textAlign: 'center',
                maxWidth: '900px',
                margin: '0 auto 2rem'
            }}>
                So sánh chi tiết dây chuyền sản xuất (Production Line) của 3 thế hệ factory khác nhau
            </p>

            {/* Key Concept */}
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
                    💡 Core Concept
                </h2>
                <p style={{
                    fontSize: '1.125rem',
                    lineHeight: '1.8',
                    color: 'hsl(var(--foreground))',
                    marginBottom: '1rem'
                }}>
                    <strong>"AI không biến bạn thành thiên tài viết lách. AI biến content thành một dây chuyền sản xuất có thể thiết kế, đo lường và tối ưu."</strong>
                </p>
                <p style={{
                    fontSize: '1rem',
                    lineHeight: '1.6',
                    color: 'hsl(var(--muted-foreground))'
                }}>
                    Bạn đang thấy 3 thế hệ của cùng một khái niệm PRODUCTION LINE: VinFast (physical manufacturing), Thanh Niên (media content trước AI), và Conan Content Factory (digital + AI manufacturing).
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
                {Object.entries(productionLineData).map(([key, factory]) => (
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

            {/* Production Line Infographics */}
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
                    Production Line Diagrams
                    <div style={{ fontSize: '1rem', fontWeight: 'normal', color: 'hsl(var(--muted-foreground))', marginTop: '0.5rem' }}>
                        Sơ đồ dây chuyền sản xuất (Click để phóng to)
                    </div>
                </h2>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                    gap: '2rem'
                }}>
                    {infographics.filter(info => selectedFactories.includes(info.key)).map(info => (
                        <div key={info.key} style={{
                            backgroundColor: 'hsl(var(--secondary))',
                            padding: '1.5rem',
                            borderRadius: '0.75rem',
                            border: '2px solid hsl(var(--border))'
                        }}>
                            <h3 style={{
                                fontSize: '1.25rem',
                                fontWeight: 'bold',
                                marginBottom: '0.5rem',
                                color: 'hsl(var(--foreground))'
                            }}>
                                {info.title}
                            </h3>
                            <p style={{
                                fontSize: '0.875rem',
                                color: 'hsl(var(--muted-foreground))',
                                marginBottom: '1rem'
                            }}>
                                {info.titleVi}
                            </p>
                            <img
                                src={info.image}
                                alt={info.title}
                                onClick={() => setModalImage(info.image)}
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    borderRadius: '0.5rem',
                                    cursor: 'pointer',
                                    transition: 'transform 0.2s',
                                    border: '1px solid hsl(var(--border))'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Comparison Table */}
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
                    6 Core Components
                    <div style={{ fontSize: '1rem', fontWeight: 'normal', color: 'hsl(var(--muted-foreground))', marginTop: '0.5rem' }}>
                        6 thành phần cốt lõi của Production Line
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
                            Input càng chuẩn hóa → Line chạy càng mượt
                        </h3>
                        <p style={{ fontSize: '0.9375rem', color: 'hsl(var(--muted-foreground))', lineHeight: '1.6' }}>
                            VinFast cần linh kiện đạt chuẩn, Thanh Niên cần tin đã verify, Conan cần prompt block có cấu trúc. Không có input chuẩn = không có production line.
                        </p>
                    </div>

                    <div style={{
                        backgroundColor: 'hsl(var(--background))',
                        padding: '1.25rem',
                        borderRadius: '0.5rem',
                        borderLeft: '4px solid hsl(var(--primary))'
                    }}>
                        <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: 'hsl(var(--foreground))' }}>
                            Đây là dây chuyền thật, không phải checklist
                        </h3>
                        <p style={{ fontSize: '0.9375rem', color: 'hsl(var(--muted-foreground))', lineHeight: '1.6' }}>
                            Stations/Worksteps phải có thứ tự cố định, logic biến đổi rõ ràng. Không thể "nhảy bước" hay "làm loạn" được.
                        </p>
                    </div>

                    <div style={{
                        backgroundColor: 'hsl(var(--background))',
                        padding: '1.25rem',
                        borderRadius: '0.5rem',
                        borderLeft: '4px solid hsl(var(--primary))'
                    }}>
                        <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: 'hsl(var(--foreground))' }}>
                            Không có Quality Gates = Spam Generator
                        </h3>
                        <p style={{ fontSize: '0.9375rem', color: 'hsl(var(--muted-foreground))', lineHeight: '1.6' }}>
                            VinFast có QC giữa line, Thanh Niên có tổng biên tập, Conan phải có editorial rubric + hallucination check. Không có gate = không phải factory.
                        </p>
                    </div>

                    <div style={{
                        backgroundColor: 'hsl(var(--background))',
                        padding: '1.25rem',
                        borderRadius: '0.5rem',
                        borderLeft: '4px solid hsl(var(--primary))'
                    }}>
                        <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: 'hsl(var(--foreground))' }}>
                            Đừng tối ưu sai chỗ
                        </h3>
                        <p style={{ fontSize: '0.9375rem', color: 'hsl(var(--muted-foreground))', lineHeight: '1.6' }}>
                            Bottleneck quyết định tốc độ toàn bộ dây chuyền. Tối ưu chỗ không phải bottleneck = lãng phí effort. Tìm đúng điểm nghẽn, fix đúng chỗ.
                        </p>
                    </div>

                    <div style={{
                        backgroundColor: 'hsl(var(--background))',
                        padding: '1.25rem',
                        borderRadius: '0.5rem',
                        borderLeft: '4px solid hsl(var(--primary))'
                    }}>
                        <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: 'hsl(var(--foreground))' }}>
                            "Đăng được" ≠ "Đạt chuẩn xuất xưởng"
                        </h3>
                        <p style={{ fontSize: '0.9375rem', color: 'hsl(var(--muted-foreground))', lineHeight: '1.6' }}>
                            Output phải publish-ready, không phải "có thể đăng". Xe VinFast phải đạt chuẩn an toàn, báo Thanh Niên phải qua pháp lý, content Conan phải pass editorial rubric.
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
                            alt="Enlarged production line diagram"
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
