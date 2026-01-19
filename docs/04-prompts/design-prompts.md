# 5 Prompts Cho Thiết Kế Hệ Thống & Tài Liệu Hóa

Bộ prompt này tập trung vào việc **tư duy hệ thống**, **chuẩn hóa dữ liệu**, và **xây dựng tài liệu** trước khi bắt tay vào code. Mục tiêu là đảm bảo mọi tính năng đều có plan rõ ràng.

## Prompt 1: Phân Tích & Cấu Trúc Hóa Yêu Cầu (The Architect)
**Mục đích:** Biến một yêu cầu mơ hồ thành cấu trúc tài liệu chuẩn trong folder `docs`.

> "Tôi có một yêu cầu về tính năng [TÊN_TÍNH_NĂNG]. Hãy đóng vai trò là Senior System Architect.
> 1.  Phân tích yêu cầu này và xác định xem nó cần những loại tài liệu nào trong folder `docs` (Architecture, Schemas, hay Guides).
> 2.  Phác thảo cấu trúc thư mục và file cần tạo.
> 3.  Viết nội dung dự thảo cho file Architecture (trong `docs/01-architecture`), tập trung vào sơ đồ luồng dữ liệu và quyết định công nghệ quan trọng.
> Đừng code vội, hãy giúp tôi hình dung hệ thống trước."

## Prompt 2: Chuẩn Hóa Dữ Liệu & Schema (The Data Standardizer)
**Mục đích:** Thiết kế Schema JSON chặt chẽ cho một đối tượng dữ liệu mới.

> "Chúng ta cần thêm một đối tượng dữ liệu mới là [TÊN_OBJECT] (ví dụ: Course, UserProfile).
> Hãy giúp tôi định nghĩa chuẩn dữ liệu (Schema) cho nó:
> 1.  Tạo file `docs/02-schemas/[tên-object].md` mô tả chi tiết các trường, kiểu dữ liệu, và ràng buộc (validation rules).
> 2.  Xác định các mối quan hệ (relations) với các đối tượng khác.
> 3.  Viết một ví dụ JSON mẫu tuân thủ schema này.
> Mục tiêu là schema này phải đủ chặt chẽ để viết script validate tự động sau này."

## Prompt 3: Quy Hoạch & Clean Up Tài Liệu (The Librarian)
**Mục đích:** Sắp xếp lại kho tài liệu khi nó trở nên lộn xộn.

> "Hiện tại folder `docs` đang có nhiều file rời rạc liên quan đến [CHỦ_ĐỀ].
> Hãy giúp tôi quy hoạch lại chúng theo tiêu chuẩn `00-standards`, `01-architecture`, `02-schemas`, `03-guides`, `04-prompts`.
> 1.  Đề xuất danh sách các file cần di chuyển/đổi tên.
> 2.  Gộp các nội dung trùng lặp vào một file Master Guide nếu cần.
> 3.  Tạo file `README.md` tại thư mục gốc `docs` để làm mục lục tra cứu nhanh."

## Prompt 4: Xây Dựng Tiêu Chuẩn Testing (The QA Lead)
**Mục đích:** Định nghĩa cách test một tính năng trước khi code.

> "Trước khi implement tính năng [TÊN_TÍNH_NĂNG], tôi cần bộ tiêu chuẩn kiểm thử (Test Plan). Hãy tạo file `docs/03-guides/testing-[tên-tính-năng].md`:
> 1.  Liệt kê các Test Cases quan trọng (Happy case, Edge case, Error case).
> 2.  Mô tả các bước thực hiện test thủ công (Manual Test Steps).
> 3.  Định nghĩa 'Definition of Done' (Khi nào thì tính năng này được coi là hoàn thành).
> Hãy viết dưới dạng checklist để tôi có thể tick vào khi kiểm tra."

## Prompt 5: Review Thiết Kế Hệ Thống (The Critic)
**Mục đích:** Phản biện và tìm lỗ hổng trong một thiết kế có sẵn.

> "Tôi vừa viết xong tài liệu thiết kế tại `docs/01-architecture/[tên-file].md`.
> Hãy đóng vai trò là một kỹ sư khó tính (Critical Engineer) để review nó:
> 1.  Chỉ ra 3 điểm rủi ro tiềm ẩn (về bảo mật, hiệu năng, hoặc khả năng mở rộng) trong thiết kế này.
> 2.  Đặt các câu hỏi 'What if' (Điều gì xảy ra nếu...) để thử thách thiết kế.
> 3.  Đề xuất giải pháp cải tiến để hệ thống bền vững hơn (Robustness)."
