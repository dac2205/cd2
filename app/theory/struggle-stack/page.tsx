import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from '@/components/ui/Accordion';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/Popover";
import { HelpCircle } from "lucide-react";

export default function StruggleStackPage() {
    return (
        <div className="container animate-slide-in">
            <div style={{ padding: "3rem 0", maxWidth: "800px", margin: "0 auto" }}>
                <Link
                    href="/theory"
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        color: "hsl(var(--ink-brown) / 0.6)",
                        textDecoration: "none",
                        marginBottom: "1rem",
                        fontSize: "0.875rem"
                    }}
                >
                    <ArrowLeft size={16} /> Back to Theory
                </Link>

                <div style={{ textAlign: "center", marginBottom: "4rem" }}>
                    <h1 style={{ marginBottom: "1rem", fontSize: "3rem" }}>The Struggle Stack</h1>
                    <p className="text-subtext" style={{ fontSize: "1.25rem" }}>Từ 'Chịu đựng' đến 'Hành động'</p>
                </div>

                <div className="card-wood" style={{ padding: "2rem", marginBottom: "3rem" }}>
                    <p style={{ fontSize: "1.125rem", lineHeight: "1.6" }}>
                        Một "Job" chỉ thực sự xuất hiện khi có sự đấu tranh (Struggle). Nếu khách hàng đang hài lòng, họ sẽ không mua gì cả.
                    </p>
                </div>

                <div style={{ display: "grid", gap: "2rem" }}>
                    {/* Level 1 */}
                    <div className="card-wood" style={{ padding: "1.5rem", borderLeft: "4px solid hsl(var(--secondary))" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                            <h3 style={{ fontSize: "1.5rem", color: "hsl(var(--ink-brown))" }}>1. Passive Struggle (Đấu tranh Thụ động)</h3>
                            <span style={{ backgroundColor: "hsl(var(--secondary))", color: "white", padding: "0.25rem 0.75rem", borderRadius: "999px", fontSize: "0.875rem" }}>Level 1</span>
                        </div>
                        <p style={{ marginBottom: "1rem" }}>"Tôi không thích điều này lắm, nhưng tôi có thể sống chung với nó."</p>
                        <Accordion type="single" collapsible>
                            <AccordionItem value="ex-1">
                                <AccordionTrigger>Ví dụ thực tế</AccordionTrigger>
                                <AccordionContent>
                                    <div style={{ padding: "1rem", backgroundColor: "hsl(var(--background))", borderRadius: "8px" }}>
                                        "Cái máy tính của tôi hơi chậm, mở file mất 10 giây, nhưng tôi vẫn làm việc được. Chưa cần thay."
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>

                    {/* Level 2 */}
                    <div className="card-wood" style={{ padding: "1.5rem", borderLeft: "4px solid hsl(var(--primary))" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                            <h3 style={{ fontSize: "1.5rem", color: "hsl(var(--primary))" }}>2. Active Struggle (Đấu tranh Chủ động)</h3>
                            <span style={{ backgroundColor: "hsl(var(--primary))", color: "white", padding: "0.25rem 0.75rem", borderRadius: "999px", fontSize: "0.875rem" }}>Level 2</span>
                        </div>
                        <p style={{ marginBottom: "1rem" }}>"Vấn đề này bắt đầu ảnh hưởng đến cuộc sống/công việc của tôi. Tôi cần tìm giải pháp."</p>
                        <Accordion type="single" collapsible>
                            <AccordionItem value="ex-2">
                                <AccordionTrigger>Ví dụ thực tế</AccordionTrigger>
                                <AccordionContent>
                                    <div style={{ padding: "1rem", backgroundColor: "hsl(var(--background))", borderRadius: "8px" }}>
                                        "Hôm nay sếp mắng vì gửi báo cáo chậm do máy tính treo. Tôi bắt đầu lên Google tìm 'laptop văn phòng giá rẻ'."
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>

                    {/* Level 3 */}
                    <div className="card-wood" style={{ padding: "1.5rem", borderLeft: "4px solid hsl(var(--accent))" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                            <h3 style={{ fontSize: "1.5rem", color: "hsl(var(--accent))" }}>3. Trigger Event (Sự kiện Kích hoạt)</h3>
                            <span style={{ backgroundColor: "hsl(var(--accent))", color: "white", padding: "0.25rem 0.75rem", borderRadius: "999px", fontSize: "0.875rem" }}>Level 3</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
                            <p>Khoảnh khắc "giọt nước tràn ly". Buộc phải hành động NGAY LẬP TỨC.</p>
                            <Popover>
                                <PopoverTrigger style={{ cursor: "pointer", color: "hsl(var(--accent))" }}>
                                    <HelpCircle size={20} />
                                </PopoverTrigger>
                                <PopoverContent>
                                    <p>Đây là thời điểm vàng để chốt sale (Close the deal).</p>
                                </PopoverContent>
                            </Popover>
                        </div>
                        <Accordion type="single" collapsible>
                            <AccordionItem value="ex-3">
                                <AccordionTrigger>Ví dụ thực tế</AccordionTrigger>
                                <AccordionContent>
                                    <div style={{ padding: "1rem", backgroundColor: "hsl(var(--background))", borderRadius: "8px" }}>
                                        "Máy tính sập nguồn hoàn toàn ngay trước giờ họp quan trọng. Tôi chạy ra cửa hàng mua ngay cái mới trong 30 phút."
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </div>
            </div>
        </div>
    );
}
