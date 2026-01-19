# Hướng Dẫn Cấu Hình Shared Auth (SSO) cho www.conan.school

Tài liệu này hướng dẫn cách cấu hình Authentication để **chia sẻ trạng thái đăng nhập (Share Session)** giữa:
- `cd2.conan.school` (Next.js App)
- `www.conan.school` (Webflow hoặc Next.js App)

Cơ chế: Sử dụng **Cookie chung** trên domain `.conan.school`.

## 1. Cài đặt Dependencies

Nếu project chưa có Supabase client, vui lòng cài đặt:

```bash
npm install @supabase/supabase-js
```

## 2. Cấu Hình Biến Môi Trường (.env.local)

Đảm bảo project sử dụng **CHUNG** thông tin kết nối Supabase với project `cd2`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://rillcjittbzmzwggyeyr.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable__GNuRyKp_8FIb4Zr6aMpjg_kjNJ2ZlB
```

## 3. Cập nhật Code khởi tạo Supabase Client

Tìm file khởi tạo Supabase (ví dụ `lib/supabase.ts` hoặc `utils/supabase.js`) và thay thế bằng đoạn code sau.

**Quan trọng:** Đoạn code `cookieStorage` dưới đây sẽ đảm bảo cookie được lưu ở domain gốc `.conan.school`, giúp cả 2 web đều đọc được.

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

// --- QUAN TRỌNG: Custom Storage Provider dùng Cookie ---
const cookieStorage = {
    getItem: (key: string) => {
        if (typeof document === 'undefined') return null;
        const match = document.cookie.match(new RegExp('(^| )' + key + '=([^;]+)'));
        return match ? decodeURIComponent(match[2]) : null;
    },
    setItem: (key: string, value: string) => {
        if (typeof document === 'undefined') return;
        // Tự động set cookie cho domain cha .conan.school nếu đang chạy trên subdomain
        const hostname = window.location.hostname;
        let domainStr = '';
        if (hostname.endsWith('.conan.school')) {
            domainStr = '; domain=.conan.school'; 
        }
        // Set cookie 1 năm, SameSite=Lax để share được giữa các subdomain
        document.cookie = `${key}=${encodeURIComponent(value)}${domainStr}; path=/; max-age=31536000; SameSite=Lax; Secure`;
    },
    removeItem: (key: string) => {
        if (typeof document === 'undefined') return;
        const hostname = window.location.hostname;
        let domainStr = '';
        if (hostname.endsWith('.conan.school')) {
            domainStr = '; domain=.conan.school';
        }
        document.cookie = `${key}=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT${domainStr}; SameSite=Lax; Secure`;
    }
};

export const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
        storage: cookieStorage, // Dùng storage custom
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
    }
});
```

## 4. Kiểm Tra Trên Supabase Dashboard (Chỉ cần 1 người làm)

Vào [Supabase Dashboard](https://supabase.com/dashboard) -> **Authentication** -> **URL Configuration**.

Đảm bảo **Redirect URLs** đã bao gồm cả 2 domain:
- `https://cd2.conan.school/`
- `https://www.conan.school/`

---

**Kết quả:**
Khi user đăng nhập tại `cd2.conan.school`, cookie sẽ được set cho `.conan.school`. Khi user truy cập `www.conan.school`, code trên sẽ đọc được cookie đó và tự động restore session.
