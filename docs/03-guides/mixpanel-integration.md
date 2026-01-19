# Hướng Dẫn Tích Hợp Mixpanel Analytics

Tài liệu này mô tả cách hệ thống `cd2` tích hợp Mixpanel để theo dõi hành vi người dùng. 
Bạn có thể áp dụng nguyên mẫu này cho các project khác.

## 1. Cơ Chế Hoạt Động

*   **Thư viện:** `mixpanel-browser`.
*   **Phạm vi:** Client-side Only (Next.js Client Components).
*   **Điểm khởi tạo:** `MixpanelScript.tsx` được nhúng vào `layout.tsx`.
*   **Định danh (Identify):** Thực hiện ngay khi User đăng nhập thành công trong `AuthProvider`.

## 2. Chi Tiết Triển Khai

### Bước 1: Cài đặt
```bash
npm install mixpanel-browser
```

### Bước 2: Tạo Component Khởi Tạo (`components/analytics/MixpanelScript.tsx`)

File này chịu trách nhiệm khởi động Mixpanel 1 lần duy nhất khi App load.

```typescript
"use client";

import { useEffect } from 'react';
import mixpanel from 'mixpanel-browser';

export default function MixpanelScript() {
    useEffect(() => {
        // Thay token bằng Project Token của bạn
        mixpanel.init('YOUR_MIXPANEL_TOKEN', {
            debug: process.env.NODE_ENV === 'development',
            track_pageview: true, // Tự động track page view
            persistence: 'localStorage', // Lưu user ID vào localStorage
        });
    }, []);

    return null;
}
```

### Bước 3: Nhúng vào Root Layout (`app/layout.tsx`)

```typescript
import MixpanelScript from "@/components/analytics/MixpanelScript";

export default function RootLayout({ children }) {
    return (
        <html>
            <body>
                <MixpanelScript />
                {children}
            </body>
        </html>
    );
}
```

### Bước 4: Tích hợp vào Quy trình Login (`lib/auth.tsx`)

Đây là bước quan trọng nhất để gắn kết nối người dùng ẩn danh (Guest) với tài khoản thật (User ID) sau khi họ login.

```typescript
import mixpanel from "mixpanel-browser";

// ... trong AuthProvider ...

// Hàm định danh user
const identifyMixpanel = (user: SupabaseUser) => {
    // 1. Gán ID của user trong DB cho Mixpanel
    mixpanel.identify(user.id);
    
    // 2. Cập nhật thông tin profile (People Properties)
    mixpanel.people.set({
        $email: user.email,
        $name: user.user_metadata?.full_name || user.email,
        last_login: new Date().toISOString(),
        // Thêm các trường khác nếu cần (Plan, Role, etc.)
    });
};

// Gọi hàm này ngay khi Login thành công hoặc session được khôi phục
// Ví dụ: trong onAuthStateChange
if (session?.user) {
    identifyMixpanel(session.user);
} else {
    mixpanel.reset(); // Reset khi logout để tránh track nhầm sang user cũ
}
```

## 3. Các Sự Kiện (Events) Đang Track

Hiện tại `cd2` đang track các điểm sau:

| Tên Event | Vị trí | Dữ liệu kèm theo |
| :--- | :--- | :--- |
| **Page View** | Tự động | URL, Referrer |
| **Login Error** | `lib/auth.tsx` | `{ error: string }` |
| **$identify** | `lib/auth.tsx` | User Profile (Email, Name, Last Login) |

## 4. Lưu Ý Quan Trọng khi mang sang Project Khác

1.  **Token:** Nhớ thay `YOUR_MIXPANEL_TOKEN` trong `MixpanelScript.tsx`.
2.  **Environment:** Chỉ nên bật `debug: true` ở môi trường Dev để dễ soi lỗi.
3.  **Client Component:** Vì Mixpanel chạy trên trình duyệt, đảm bảo các file import nó đều có `"use client"`.
