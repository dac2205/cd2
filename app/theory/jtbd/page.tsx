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

export default function JTBDPage() {
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
                    <h1 style={{ marginBottom: "1rem", fontSize: "3rem" }}>Jobs to be Done (JTBD)</h1>
                    <p className="text-subtext" style={{ fontSize: "1.25rem" }}>Lý thuyết về Động lực Mua hàng</p>
                </div>

                <div className="card-wood" style={{ padding: "2rem", marginBottom: "3rem" }}>
                    <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Khái niệm Cốt lõi</h2>
                    <p style={{ fontSize: "1.125rem", lineHeight: "1.6", marginBottom: "1.5rem" }}>
                        JTBD (Công việc cần hoàn thành) là lý thuyết cho rằng mọi người không chỉ đơn thuần mua sản phẩm; họ "thuê" chúng để đạt được sự tiến bộ (progress) trong cuộc sống của mình.
                    </p>
                </div>

                <div className="card-wood" style={{ padding: "2rem", marginBottom: "3rem", borderLeft: "4px solid hsl(var(--primary))" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
                        <h2 style={{ fontSize: "2rem", margin: 0 }}>Trigger (Điểm Kích hoạt)</h2>
                        <Popover>
                            <PopoverTrigger style={{ cursor: "pointer", color: "hsl(var(--primary))" }}>
                                <HelpCircle size={24} />
                            </PopoverTrigger>
                            <PopoverContent>
                                <p>Sự kiện hoặc tình huống cụ thể đẩy khách hàng từ trạng thái thụ động sang chủ động tìm kiếm giải pháp.</p>
                            </PopoverContent>
                        </Popover>
                    </div>
                    <p style={{ fontSize: "1.125rem", lineHeight: "1.6", marginBottom: "2rem" }}>
                        Mấu chốt của JTBD không phải là khách hàng là ai (Persona), mà là <strong>KHI NÀO</strong> họ cần giải pháp (Setting/Context).
                    </p>

                    <Accordion type="single" collapsible>
                        <AccordionItem value="trigger-1">
                            <AccordionTrigger style={{ fontSize: "1.125rem", fontWeight: 600 }}>
                                Ví dụ 1: Mua Nệm mới
                            </AccordionTrigger>
                            <AccordionContent>
                                <div style={{ padding: "1rem", backgroundColor: "hsl(var(--background))", borderRadius: "8px" }}>
                                    <p><strong>Trigger:</strong> Không phải vì nệm cũ bị hỏng, mà là vì "Vợ tôi mới có bầu tháng thứ 4 và bắt đầu đau lưng".</p>
                                    <p style={{ marginTop: "0.5rem" }}>→ Lúc này, ưu tiên chuyển từ "Đẹp/Rẻ" sang "Hỗ trợ cột sống/Thoáng khí".</p>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="trigger-2">
                            <AccordionTrigger style={{ fontSize: "1.125rem", fontWeight: 600 }}>
                                Ví dụ 2: Ứng dụng Học tiếng Anh
                            </AccordionTrigger>
                            <AccordionContent>
                                <div style={{ padding: "1rem", backgroundColor: "hsl(var(--background))", borderRadius: "8px" }}>
                                    <p><strong>Trigger:</strong> Vừa nhận được email từ sếp: "Tháng sau chúng ta sẽ đón đoàn khách từ Singapore, em phụ trách tiếp đón nhé".</p>
                                    <p style={{ marginTop: "0.5rem" }}>→ Nhu cầu chuyển từ "Học từ từ" sang "Giao tiếp cấp tốc/Tự tin".</p>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </div>
        </div>
    );
}
