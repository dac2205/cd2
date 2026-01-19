# 5 Prompts Cho Thực Thi Code (Coding & Execution)

Bộ prompt này tập trung vào giai đoạn **coding**, đảm bảo code được viết ra tuân thủ thiết kế, dễ bảo trì và ít lỗi.

## Prompt 1: Implement Feature từ Tài Liệu (The Builder)
**Mục đích:** Code bám sát tài liệu thiết kế đã duyệt.

> "Tôi đã có tài liệu thiết kế tại `docs/01-architecture/[tên-file].md`. Hãy giúp tôi hiện thực hóa nó:
> 1.  Đọc kỹ tài liệu trên và file `docs/02-schemas/[liên-quan].md`.
> 2.  Liệt kê các file code cần tạo mới hoặc chỉnh sửa.
> 3.  Viết code từng bước (Step-by-step), ưu tiên tạo khung (skeleton) và interface trước, sau đó mới đến logic chi tiết.
> 4.  Đảm bảo code tuân thủ các quy tắc trong `docs/03-guides/ui-guidelines.md` (nếu có UI)."

## Prompt 2: Refactor Code theo Pattern (The Cleaner)
**Mục đích:** Dọn dẹp code cũ cho sạch đẹp và chuẩn chỉ.

> "File code [TÊN_FILE] hiện tại đang quá dài và xử lý nhiều logic lộn xộn.
> Hãy refactor nó theo nguyên tắc S.O.L.I.D và Separation of Concerns (Tách biệt mối quan tâm):
> 1.  Tách các logic xử lý dữ liệu ra khỏi UI Component (đưa vào Custom Hook hoặc Service file).
> 2.  Đặt tên biến và hàm lại cho rõ nghĩa (Semantic Naming).
> 3.  Thêm Type/Interface rõ ràng (nếu là TypeScript).
> Hãy làm từng phần nhỏ để đảm bảo không làm hỏng tính năng hiện tại."

## Prompt 3: Debugging Hệ Thống (The Detective)
**Mục đích:** Tìm và sửa lỗi theo quy trình logic, không đoán mò.

> "Tôi đang gặp lỗi [MÔ_TẢ_LỖI] tại tính năng [TÊN_TÍNH_NĂNG].
> Hãy giúp tôi debug theo quy trình sau:
> 1.  Phân vùng lỗi: Lỗi do Frontend, Backend, hay Data? (Yêu cầu tôi cung cấp log nếu cần).
> 2.  Dựng lại hiện trường: Hướng dẫn tôi cách reproduce lỗi nếu chưa rõ.
> 3.  Đề xuất 3 giả thuyết về nguyên nhân lỗi, xếp theo độ khả thi.
> 4.  Đưa ra giải pháp sửa cho giả thuyết cao nhất và hướng dẫn verify sau khi sửa."

## Prompt 4: Viết Unit Test & Integration Test (The Tester)
**Mục đích:** Viết test tự động để bảo vệ code.

> "Tôi vừa code xong function [TÊN_HÀM] trong file [TÊN_FILE].
> Hãy giúp tôi viết Unit Test cho nó (sử dụng Jest/Vitest):
> 1.  Viết test case cho trường hợp chạy đúng (Success path).
> 2.  Viết test case cho các input sai hoặc biên (Failure/Edge cases).
> 3.  Đảm bảo che phủ (coverage) được các nhánh logic quan trọng.
> Code test cần dễ đọc và độc lập."

## Prompt 5: Self-Review & Chuẩn Bị Pull Request (The Gatekeeper)
**Mục đích:** Rà soát lại lần cuối trước khi merge code.

> "Tôi chuẩn bị push code cho tính năng [TÊN]. Hãy review giúp tôi:
> 1.  Kiểm tra xem có hard-code string/magic number nào không? (Nên đưa vào constant hoặc config).
> 2.  Kiểm tra xem có biến môi trường (Env vars) nào mới cần thêm vào `.env.example` không?
> 3.  Tạo nội dung Commit Message chuẩn (theo Conventional Commits) và mô tả Pull Request tóm tắt những gì đã thay đổi.
> 4.  Rà soát file thừa hoặc console.log chưa xóa."
