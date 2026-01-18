"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Brand } from "@/lib/types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Heart } from "lucide-react";

interface BrandListProps {
    initialBrands: Brand[];
}

export default function BrandList({ initialBrands }: BrandListProps) {
    const [favorites, setFavorites] = useState<string[]>([]);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const stored = localStorage.getItem("brand_favorites");
        if (stored) {
            try {
                setFavorites(JSON.parse(stored));
            } catch (e) {
                console.error("Failed to parse favorites", e);
            }
        }
    }, []);

    const toggleFavorite = (e: React.MouseEvent, slug: string) => {
        e.preventDefault();
        e.stopPropagation();

        setFavorites((prev) => {
            let newFavorites;
            if (prev.includes(slug)) {
                newFavorites = prev.filter((s) => s !== slug);
            } else {
                if (prev.length >= 3) {
                    window.alert("Chỉ được chọn tối đa 3 brands yêu thích. Hãy bỏ một brand đi để thêm brand mới.");
                    return prev;
                }
                newFavorites = [...prev, slug];
            }
            localStorage.setItem("brand_favorites", JSON.stringify(newFavorites));
            return newFavorites;
        });
    };

    const favoriteBrands = initialBrands.filter(b => favorites.includes(b.slug));
    // Sort favorites by the order they were added (or just by slug if order doesn't matter much, 
    // but preserving inclusion order in favorites array might be nice. 
    // For simplicity, we just filter. If we want them sorted by how they are in the favorites array:
    // favoriteBrands.sort((a, b) => favorites.indexOf(a.slug) - favorites.indexOf(b.slug));

    const otherBrands = initialBrands.filter(b => !favorites.includes(b.slug));

    const renderCard = (brand: Brand, isFavorite: boolean) => (
        <Link key={brand.slug} href={`/brands/${brand.slug}`} style={{ textDecoration: 'none' }}>
            <Card style={{ height: '100%', transition: 'transform 0.2s', cursor: 'pointer', position: 'relative' }}>
                <div
                    onClick={(e) => toggleFavorite(e, brand.slug)}
                    style={{
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem',
                        zIndex: 10,
                        cursor: 'pointer',
                        padding: '4px',
                    }}
                >
                    <Heart
                        size={20}
                        fill={isFavorite ? "#ef4444" : "none"}
                        color={isFavorite ? "#ef4444" : "currentColor"}
                        className="text-muted-foreground hover:text-red-500 transition-colors"
                    />
                </div>
                <CardHeader>
                    <CardTitle style={{ paddingRight: '2rem' }}>{brand.meta.name}</CardTitle>
                    <p style={{ fontSize: '0.875rem', color: 'hsl(var(--ink-brown) / 0.6)' }}>
                        {brand.meta.owner}
                    </p>
                </CardHeader>
                <CardContent>
                    {/* Content removed */}
                </CardContent>
            </Card>
        </Link>
    );

    if (!mounted) {
        // Server-side / Hydration fallback: just show all in one grid
        return (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
                {initialBrands.map((brand) => (
                    <Card key={brand.slug} style={{ height: '100%', transition: 'transform 0.2s' }}>
                        <CardHeader>
                            <CardTitle>{brand.meta.name}</CardTitle>
                            <p style={{ fontSize: '0.875rem', color: 'hsl(var(--ink-brown) / 0.6)' }}>
                                {brand.meta.owner}
                            </p>
                        </CardHeader>
                    </Card>
                ))}
            </div>
        );
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

            {/* Favorites Section */}
            {favoriteBrands.length > 0 && (
                <div className="animate-in fade-in slide-in-from-top-4 duration-500">
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
                        {favoriteBrands.map(brand => renderCard(brand, true))}
                    </div>

                    <div style={{
                        marginTop: '3rem',
                        marginBottom: '1rem',
                        width: '100%',
                        height: '1px',
                        backgroundColor: 'hsl(var(--border))',
                        position: 'relative'
                    }}>
                        {/* Optional: Add a text label on the divider if desired, but user just said "short separator" */}
                    </div>
                </div>
            )}

            {/* Other Brands Section */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
                {otherBrands.map(brand => renderCard(brand, false))}
            </div>

        </div>
    );
}
