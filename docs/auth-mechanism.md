# Cơ Chế Authentication Hiện Tại (Stable)

Tài liệu này mô tả cơ chế đăng nhập đang hoạt động ổn định trên `cd2.conan.school`. 
Hiện tại trang `www.conan.school` đang gặp lỗi **Login Loop** (lặp lại trang đăng nhập vô tận), nguyên nhân khả năng cao là do **Race Condition** trong AuthProvider hoặc do cấu hình Cookie không ổn định.

Chúng tôi đã khắc phục thành công trên `cd2` bằng cách quay về giải pháp đơn giản và chắc chắn hơn.

## 1. Tổng Quan
- **Provider:** Supabase Auth (Google OAuth).
- **Storage:** **LocalStorage** (Mặc định). 
  - *Lưu ý: Chúng ta tạm thời ĐÃ TẮT tính năng Shared Auth qua Cookie vì nó gây lỗi loop. Hiện tại mỗi subdomain sẽ phải login riêng lẻ.*
- **Redirect:** Xử lý tại Client-side (trong `AuthProvider`), không dùng Middleware để chặn route (giảm thiểu rủi ro redirect loop do server/client lệch pha).

## 2. Các File Quan Trọng

### A. `lib/supabase.ts` (Cấu hình Client)
Sử dụng cấu hình mặc định, **không** dùng custom cookie storage.

```typescript
import { createClient } from '@supabase/supabase-js';

const getSupabaseUrl = () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (url && (url.startsWith('https://') || url.startsWith('http://'))) {
        return url;
    }
    return 'https://placeholder.supabase.co';
};

const supabaseUrl = getSupabaseUrl();
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseKey);
```

### B. `lib/auth.tsx` (AuthProvider - QUAN TRỌNG)
Đây là nơi đã fix lỗi **Login Loop**. 
**Nguyên nhân lỗi cũ:** Gọi `getSession()` và `onAuthStateChange()` cùng lúc. Khi mạng chậm hoặc redirect từ Google về, `getSession` có thể trả về null trước khi `onAuthStateChange` kịp nhận token -> Code tưởng chưa login -> Redirect về Login -> Loop.

**Code đã fix (Áp dụng ngay cho `www`):**

```typescript
"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "./supabase"; // Import client từ file trên
import { User as SupabaseUser } from "@supabase/supabase-js";

interface AuthContextType {
    user: SupabaseUser | null;
    login: () => void;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<SupabaseUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        let mounted = true;

        // CHỈ SỬ DỤNG onAuthStateChange để nghe sự kiện.
        // Không tự gọi getSession() riêng lẻ để tránh race condition.
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (_event, session) => {
                if (mounted) {
                    if (session?.user) {
                        setUser(session.user);
                    } else {
                        setUser(null);
                    }
                    setIsLoading(false); // Chỉ tắt loading khi Supabase đã chốt trạng thái
                }
            }
        );

        return () => {
            mounted = false;
            subscription.unsubscribe();
        };
    }, []);

    // Logic bảo vệ Route
    useEffect(() => {
        if (!isLoading) {
            if (!user && pathname !== "/login") {
                router.push("/login");
            } else if (user && pathname === "/login") {
                router.push("/");
            }
        }
    }, [user, isLoading, pathname, router]);

    const login = async () => {
        // Logic check domain để redirect (tùy chọn)
        const getRedirectUrl = () => {
             const hostname = window.location.hostname;
             const protocol = window.location.protocol;
             if (hostname === 'conan.school') {
                 return `${protocol}//www.conan.school/`;
             }
             return `${window.location.origin}/`;
        };

        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: getRedirectUrl(),
            }
        });
        if (error) console.error("Login error:", error);
    };

    const logout = async () => {
        await supabase.auth.signOut();
        router.push("/login");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoading }}>
            {isLoading ? <div>Loading...</div> : children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) throw new Error("useAuth must be used within an AuthProvider");
    return context;
}
```

## 3. Khắc phục lỗi trên www.conan.school

Để sửa lỗi loop trên `www`, team cần làm theo thứ tự:
1.  **Revert về LocalStorage:** Bỏ đoạn code `cookieStorage` trong file khởi tạo Supabase (giống mục 2A).
2.  **Cập nhật AuthProvider:** Copy y nguyên logic `useEffect` với `onAuthStateChange` ở mục 2B.
3.  **Kiểm tra Middleware:** Nếu `www` có file `middleware.ts` đang chặn route, hãy tạm thời tắt nó hoặc đảm bảo nó không xung đột với logic client-side redirect.

Sau khi làm các bước trên, trang `www` sẽ hoạt động ổn định như `cd2`.
