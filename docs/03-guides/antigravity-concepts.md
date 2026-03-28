# AntiGravity Concepts: Workflows, Rules, Skills & More

Tài liệu này giải thích các khái niệm cốt lõi trong môi trường làm việc với AI Agent (AntiGravity).

## Phần 1: Bộ 3 cốt lõi (The Core Trio)

Phân biệt 3 công cụ điều hướng hành vi chính của Agent.

| Khái niệm | Định nghĩa | Mục đích | Ví dụ | Vị trí file |
| :--- | :--- | :--- | :--- | :--- |
| **Workflows** | Các bước thực hiện tuần tự để hoàn thành một tác vụ cụ thể. | Hướng dẫn "Làm thế nào" (How-to). Giúp chuẩn hóa quy trình lặp đi lặp lại. | - Quy trình tạo trang mới (Scaffold Page)<br>- Quy trình Deploy<br>- Quy trình thêm Brand mới | `.agent/workflows/*.md` |
| **Rules** | Các quy tắc, ràng buộc bắt buộc phải tuân thủ. | Định nghĩa "Được làm gì / Không được làm gì" (Do's & Don'ts). Đảm bảo tính nhất quán và chất lượng. | - Luôn sử dụng Tailwind CSS<br>- Không hardcode API key<br>- Cấu trúc thư mục bắt buộc | `.agent/rules.md` (hoặc User Rules) |
| **Skills** | Một tập hợp các hướng dẫn, script và tri thức chuyên sâu để giải quyết vấn đề phức tạp. | Trang bị "Năng lực" (Capability). Giúp AI hiểu sâu về một lĩnh vực cụ thể để tự chủ hành động. | - Kỹ năng Refactor UI theo Design System<br>- Kỹ năng tối ưu SEO<br>- Kỹ năng Debug database | `.agent/skills/*/SKILL.md` |

---

## Phần 2: 5 Thành phần cốt lõi mở rộng (The "Big 5")

Ngoài Workflows, Rules, và Skills, để vận hành Agent hiệu quả tối đa, AntiGravity thường sử dụng 5 thành phần sau. Đây là các tài nguyên giúp Agent "thông minh" và "tự giác" hơn.

| Khái niệm | Định nghĩa | Tầm quan trọng | Lưu trữ ở đâu? |
| :--- | :--- | :--- | :--- |
| **1. Artifacts** | Các tài liệu "sản phẩm" do Agent tạo ra trong quá trình làm việc: `task.md` (theo dõi việc), `implementation_plan.md` (kế hoạch), `walkthrough.md` (báo cáo). | Giúp minh bạch hóa suy nghĩ của AI (Chain of Thought). Bạn có thể kiểm soát và review trước khi AI thực thi. | Mặc định: `.agent/brain/<session_id>/`<br>Lâu dài: Nên lưu các bản quan trọng vào `docs/artifacts/` hoặc `docs/changelogs/`. |
| **2. Knowledge Base** | Kho tri thức "tĩnh" của dự án: Architecture, Design System, DB Schema, API Docs. | Là "bộ nhớ dài hạn" giúp AI hiểu ngữ cảnh dự án mà không cần hỏi lại nhiều lần. | `docs/` (theo cấu trúc: `00-standards`, `01-architecture`, `02-schemas`...) |
| **3. Templates** | Các mẫu code hoặc cấu trúc file chuẩn (Boilerplate) mà bạn muốn AI sử dụng. | Giúp AI sinh code nhanh và chuẩn cấu trúc ngay từ đầu. | `.agent/templates/` hoặc `.github/ISSUE_TEMPLATE/`. |
| **4. Lessons Learned** | Ghi chép về các lỗi sai trong quá khứ, các "mẹo" đặc thù của dự án. | Là "bộ nhớ kinh nghiệm". Giúp AI tránh lặp lại sai lầm cũ (`memory.md`). | `.agent/memory.md` hoặc `docs/guides/lessons-learned.md`. |
| **5. Prompts / Personas** | Các chỉ dẫn về vai trò, giọng văn, hoặc phong cách làm việc đặc thù (VD: "Đóng vai Senior Frontend Dev khó tính"). | Định hình "tính cách" và "góc nhìn" chuyên gia cho Agent khi giải quyết vấn đề cụ thể. | `.agent/prompts/` hoặc khai báo ngay trong `SKILL.md`. |

---

## Tóm tắt chiến lược lưu trữ

1.  **`.agent/`**: Đây là thư mục cấu hình dành cho AI (The AI's Brain Extension). Chứa: Workflows, Rules, Skills, Templates, Prompts.
2.  **`docs/`**: Đây là thư mục tri thức dự án (The Project Library). Chứa: Standards, Architecture, Guides.
3.  **Bộ nhớ tạm (`.agent/brain/`)**: Nơi AI nháp và lưu trạng thái phiên làm việc.
