import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Đăng nhập",
    description: "Đăng nhập vào AI Factory để truy cập nội dung học tập và thực hành.",
    robots: {
        index: false,
        follow: false,
    }
};

export default function LoginLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
