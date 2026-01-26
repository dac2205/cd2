export default function robots() {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/login', '/agtest'],
            },
        ],
        sitemap: 'https://cd2.conan.school/sitemap.xml',
    };
}
