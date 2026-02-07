'use client';

import { useState } from "react";

const warehouseData = {
    conanFactory: {
        name: "🤖 Conan Content Factory",
        color: "hsl(var(--primary))",
        warehouse: {
            name: {
                nameEn: "Content Library / Knowledge Base",
                nameVi: "Thư viện nội dung / Cơ sở tri thức"
            },
            whatStored: {
                nameEn: "What is Stored",
                nameVi: "Lưu trữ gì",
                description: "Prompt templates, brand voice guidelines, content frameworks, past successful content, research data, customer insights"
            },
            organization: {
                nameEn: "Organization System",
                nameVi: "Hệ thống tổ chức",
                description: "Tagged by topic, format, platform, JTBD, customer segment. Searchable database with version control"
            },
            inputToLine: {
                nameEn: "Input to Production Line",
                nameVi: "Đầu vào cho dây chuyền",
                description: "Pull relevant templates, frameworks, and reference content based on content brief → Feed into AI prompts"
            },
            qualityControl: {
                nameEn: "Quality Control",
                nameVi: "Kiểm soát chất lượng",
                description: "Editorial rubric scores, performance metrics (engagement, conversion), brand voice consistency checks"
            },
            bottleneck: {
                nameEn: "Potential Bottleneck",
                nameVi: "Điểm nghẽn tiềm ẩn",
                description: "Outdated templates, poor tagging → hard to find → slow content creation. Need regular audits and updates"
            }
        }
    },
    carFactory: {
        name: "🚗 VinFast Auto Factory",
        color: "hsl(var(--accent))",
        warehouse: {
            name: {
                nameEn: "Parts Warehouse / Inventory",
                nameVi: "Kho linh kiện / Hàng tồn kho"
            },
            whatStored: {
                nameEn: "What is Stored",
                nameVi: "Lưu trữ gì",
                description: "Engine components, batteries, chassis parts, electronic modules, paint materials, interior components"
            },
            organization: {
                nameEn: "Organization System",
                nameVi: "Hệ thống tổ chức",
                description: "SKU-based inventory management, organized by part number, supplier, production line requirement. FIFO/LIFO systems"
            },
            inputToLine: {
                nameEn: "Input to Production Line",
                nameVi: "Đầu vào cho dây chuyền",
                description: "Just-in-time (JIT) delivery to assembly stations based on production schedule → Minimize inventory holding costs"
            },
            qualityControl: {
                nameEn: "Quality Control",
                nameVi: "Kiểm soát chất lượng",
                description: "Incoming parts inspection, supplier quality ratings, defect tracking, ISO compliance verification"
            },
            bottleneck: {
                nameEn: "Potential Bottleneck",
                nameVi: "Điểm nghẽn tiềm ẩn",
                description: "Supply chain delays, wrong parts delivered, quality issues from suppliers → entire production line stops"
            }
        }
    },
    newspaper: {
        name: "📰 Thanh Niên Newspaper",
        color: "hsl(var(--secondary))",
        warehouse: {
            name: {
                nameEn: "News Archive / Photo Library",
                nameVi: "Kho tin tức / Thư viện ảnh"
            },
            whatStored: {
                nameEn: "What is Stored",
                nameVi: "Lưu trữ gì",
                description: "Past articles, photo archives, source contacts, research materials, fact-check records, legal documents"
            },
            organization: {
                nameEn: "Organization System",
                nameVi: "Hệ thống tổ chức",
                description: "Categorized by topic, date, journalist, section (politics, sports, culture). Digital archive with metadata tagging"
            },
            inputToLine: {
                nameEn: "Input to Production Line",
                nameVi: "Đầu vào cho dây chuyền",
                description: "Journalists pull background info, reference photos, past coverage → Context for new stories"
            },
            qualityControl: {
                nameEn: "Quality Control",
                nameVi: "Kiểm soát chất lượng",
                description: "Source verification, photo rights management, fact-check against archives, plagiarism detection"
            },
            bottleneck: {
                nameEn: "Potential Bottleneck",
                nameVi: "Điểm nghẽn tiềm ẩn",
                description: "Poor archive organization → journalists can't find reference materials → slower story development"
            }
        }
    }
};

const componentLabels = [
    { key: 'whatStored', labelEn: 'What is Stored', labelVi: 'Lưu trữ gì' },
    { key: 'organization', labelEn: 'Organization System', labelVi: 'Hệ thống tổ chức' },
    { key: 'inputToLine', labelEn: 'Input to Production Line', labelVi: 'Đầu vào cho dây chuyền' },
    { key: 'qualityControl', labelEn: 'Quality Control', labelVi: 'Kiểm soát chất lượng' },
    { key: 'bottleneck', labelEn: 'Potential Bottleneck', labelVi: 'Điểm nghẽn tiềm ẩn' }
];

export default function WarehouseComparisonPage() {
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
            ...warehouseData[key as keyof typeof warehouseData]
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
                Warehouse Comparison
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
                So sánh Warehouse (Kho) của 3 loại factory: Content Library, Parts Inventory, và News Archive
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
                    📦 Why Warehouse Matters
                </h2>
                <p style={{
                    fontSize: '1.125rem',
                    lineHeight: '1.8',
                    color: 'hsl(var(--foreground))',
                    marginBottom: '1rem'
                }}>
                    <strong>Warehouse không chỉ là nơi lưu trữ.</strong> Warehouse tốt = production line chạy mượt. Warehouse tồi = production line nghẽn.
                </p>
                <p style={{
                    fontSize: '1rem',
                    lineHeight: '1.6',
                    color: 'hsl(var(--muted-foreground))'
                }}>
                    Mọi factory đều cần warehouse để: <strong>(1) Lưu trữ nguyên liệu/tài nguyên</strong>, <strong>(2) Tổ chức để dễ tìm</strong>, <strong>(3) Cung cấp đúng lúc cho production line</strong>, <strong>(4) Kiểm soát chất lượng đầu vào</strong>, và <strong>(5) Tránh bottleneck do thiếu hàng hoặc tìm không ra</strong>.
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
                {Object.entries(warehouseData).map(([key, factory]) => (
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

            {/* Warehouse Names */}
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
                    Warehouse Types
                    <div style={{ fontSize: '1rem', fontWeight: 'normal', color: 'hsl(var(--muted-foreground))', marginTop: '0.5rem' }}>
                        Các loại kho
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
                                marginBottom: '0.25rem',
                                color: 'hsl(var(--foreground))'
                            }}>
                                {factory.warehouse.name.nameEn}
                            </div>
                            <div style={{
                                fontSize: '0.875rem',
                                color: 'hsl(var(--muted-foreground))'
                            }}>
                                {factory.warehouse.name.nameVi}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 5 Components Comparison Table */}
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
                    5 Core Warehouse Components
                    <div style={{ fontSize: '1rem', fontWeight: 'normal', color: 'hsl(var(--muted-foreground))', marginTop: '0.5rem' }}>
                        5 thành phần cốt lõi của Warehouse
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
                                    minWidth: '300px',
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
                                    verticalAlign: 'top',
                                    backgroundColor: 'hsl(var(--secondary) / 0.3)'
                                }}>
                                    <div style={{ fontWeight: 'bold', fontSize: '1rem', color: 'hsl(var(--foreground))' }}>
                                        {component.labelEn}
                                    </div>
                                    <div style={{ fontSize: '0.875rem', color: 'hsl(var(--muted-foreground))', marginTop: '0.25rem' }}>
                                        {component.labelVi}
                                    </div>
                                </td>
                                {getSelectedFactoryData().map(factory => {
                                    const item = factory.warehouse[component.key as keyof typeof factory.warehouse];
                                    if (typeof item === 'object' && 'description' in item) {
                                        return (
                                            <td key={factory.key} style={{
                                                padding: '1.25rem',
                                                verticalAlign: 'top',
                                                backgroundColor: factory.key === 'conanFactory' ? 'hsl(var(--primary) / 0.05)' : 'transparent'
                                            }}>
                                                <div style={{
                                                    fontSize: '0.9375rem',
                                                    color: 'hsl(var(--foreground))',
                                                    lineHeight: '1.6'
                                                }}>
                                                    {item.description}
                                                </div>
                                            </td>
                                        );
                                    }
                                    return null;
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
                            Warehouse tốt = Tìm nhanh, lấy đúng, cung cấp kịp thời
                        </h3>
                        <p style={{ fontSize: '0.9375rem', color: 'hsl(var(--muted-foreground))', lineHeight: '1.6' }}>
                            VinFast cần JIT (Just-in-Time) delivery, Thanh Niên cần archive có metadata tốt, Conan cần content library có tagging rõ ràng. Tổ chức kém = tìm mãi không ra = production line chậm.
                        </p>
                    </div>

                    <div style={{
                        backgroundColor: 'hsl(var(--background))',
                        padding: '1.25rem',
                        borderRadius: '0.5rem',
                        borderLeft: '4px solid hsl(var(--primary))'
                    }}>
                        <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: 'hsl(var(--foreground))' }}>
                            Quality control ở warehouse = Ngăn lỗi từ đầu nguồn
                        </h3>
                        <p style={{ fontSize: '0.9375rem', color: 'hsl(var(--muted-foreground))', lineHeight: '1.6' }}>
                            VinFast kiểm tra linh kiện khi nhập kho, Thanh Niên verify nguồn tin, Conan audit prompt templates. Lỗi vào warehouse = lỗi ra sản phẩm cuối.
                        </p>
                    </div>

                    <div style={{
                        backgroundColor: 'hsl(var(--background))',
                        padding: '1.25rem',
                        borderRadius: '0.5rem',
                        borderLeft: '4px solid hsl(var(--primary))'
                    }}>
                        <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: 'hsl(var(--foreground))' }}>
                            Warehouse bottleneck = Production line bottleneck
                        </h3>
                        <p style={{ fontSize: '0.9375rem', color: 'hsl(var(--muted-foreground))', lineHeight: '1.6' }}>
                            Supply chain delay (VinFast), poor archive search (Thanh Niên), outdated templates (Conan) đều dẫn đến cùng kết quả: production line phải chờ hoặc dùng input kém chất lượng.
                        </p>
                    </div>

                    <div style={{
                        backgroundColor: 'hsl(var(--background))',
                        padding: '1.25rem',
                        borderRadius: '0.5rem',
                        borderLeft: '4px solid hsl(var(--primary))'
                    }}>
                        <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: 'hsl(var(--foreground))' }}>
                            Digital warehouse ≠ Tự động tốt
                        </h3>
                        <p style={{ fontSize: '0.9375rem', color: 'hsl(var(--muted-foreground))', lineHeight: '1.6' }}>
                            Conan và Thanh Niên có digital warehouse nhưng vẫn cần human curation: tagging, updating, archiving. Không maintain = warehouse trở thành bãi rác digital.
                        </p>
                    </div>

                    <div style={{
                        backgroundColor: 'hsl(var(--background))',
                        padding: '1.25rem',
                        borderRadius: '0.5rem',
                        borderLeft: '4px solid hsl(var(--primary))'
                    }}>
                        <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: 'hsl(var(--foreground))' }}>
                            Warehouse design phản ánh production philosophy
                        </h3>
                        <p style={{ fontSize: '0.9375rem', color: 'hsl(var(--muted-foreground))', lineHeight: '1.6' }}>
                            VinFast dùng JIT (minimize inventory), Thanh Niên dùng comprehensive archive (maximize reference), Conan dùng versioned templates (balance reuse & innovation). Không có "one size fits all".
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
