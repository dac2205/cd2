# Cấu Trúc Thư Mục Docs & Quy Ước Đặt Tên

Tài liệu này quy định cách tổ chức folder `docs/` để đảm bảo tính hệ thống và dễ tra cứu cho dự án.

## 1. Cấu Trúc Thư Mục

Mọi tài liệu phải được phân loại vào một trong các thư mục được đánh số sau:

*   **`00-standards/`**: Chứa các quy chuẩn, quy ước chung của team (Code style, Naming convention, Architecture decision records - ADRs).
*   **`01-architecture/`**: Tài liệu thiết kế hệ thống, sơ đồ luồng dữ liệu (Data Flow), sơ đồ thực thể (ERD), cơ chế lõi (như Authentication).
*   **`02-schemas/`**: Định nghĩa cấu trúc dữ liệu (JSON Schemas, Interface definitions) cho các đối tượng nghiệp vụ (User, Brand, Course...).
*   **`03-guides/`**: Hướng dẫn thực hiện (How-to), quy trình (Workflows), tài liệu onboarding cho dev mới.
*   **`04-prompts/`**: Tập hợp các prompt tiêu chuẩn để làm việc với AI trong các giai đoạn Thiết kế và Code.

## 2. Quy Ước Đặt Tên File

*   **Ngôn ngữ:** Tiếng Anh hoặc Tiếng Việt (Thống nhất trong từng file).
*   **Format:** `kebab-case.md` (chữ thường, nối bằng gạch ngang).
*   **Ví dụ đúng:**
    *   `auth-mechanism.md`
    *   `brand-data-schema.md`
    *   `deployment-guide.md`
*   **Ví dụ sai:**
    *   `AuthMechanism.md` (PascalCase)
    *   `brand_data.md` (snake_case)
    *   `Tai Lieu Deploy.md` (Có dấu cách)

## 3. Quy Trình Cập Nhật

1.  Khi có tính năng mới lớn, **Project Lead** cần tạo file Architecture/Schema tương ứng trước khi Dev bắt đầu code.
2.  Khi logic code thay đổi làm sai lệch tài liệu, **Dev** có trách nhiệm cập nhật lại tài liệu ngay trong PR đó.
3.  Tài liệu cũ không còn dùng: Không xóa ngay, hãy move vào folder `archive/` (nếu cần) hoặc đánh dấu `[DEPRECATED]` ở đầu file.
