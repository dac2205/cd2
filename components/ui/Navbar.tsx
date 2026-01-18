import Link from 'next/link';
import { Home, BookOpen, Users, Award } from 'lucide-react';
import UserMenu from "@/components/auth/UserMenu";

export default function Navbar() {
    return (
        <nav style={{
            backgroundColor: 'hsl(var(--background) / 0.95)',
            backdropFilter: 'blur(4px)',
            borderBottom: '1px solid hsl(var(--border))',
            position: 'sticky',
            top: 0,
            zIndex: 50,
            padding: '0.75rem 0'
        }}>
            <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Link href="/" style={{ fontSize: '1.25rem', fontWeight: 700, textDecoration: 'none', color: 'hsl(var(--foreground))' }}>
                    Customer Decode
                </Link>

                <div style={{ display: 'flex', gap: '1.5rem' }}>
                    <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', color: 'hsl(var(--foreground))' }}>
                        <Home size={18} /> Home
                    </Link>
                    <Link href="/theory" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', color: 'hsl(var(--foreground))' }}>
                        <BookOpen size={18} /> Theory
                    </Link>
                    <Link href="/brands" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', color: 'hsl(var(--foreground))' }}>
                        <Users size={18} /> Brands
                    </Link>
                    <Link href="/competency" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', color: 'hsl(var(--foreground))' }}>
                        <Award size={18} /> Competency
                    </Link>
                    <UserMenu />
                </div>
            </div>
        </nav>
    );
}
