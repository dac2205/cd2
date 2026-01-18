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
        e.preventDefault(); // Prevent link navigation
        e.stopPropagation();

        setFavorites((prev) => {
            let newFavorites;
            if (prev.includes(slug)) {
                newFavorites = prev.filter((s) => s !== slug);
            } else {
                if (prev.length >= 3) {
                    // Optional: Add visual feedback like a toast here if needed
                    return prev;
                }
                newFavorites = [...prev, slug];
            }
            localStorage.setItem("brand_favorites", JSON.stringify(newFavorites));
            return newFavorites;
        });
    };

    const sortedBrands = [...initialBrands].sort((a, b) => {
        const aFav = favorites.includes(a.slug);
        const bFav = favorites.includes(b.slug);
        if (aFav && !bFav) return -1;
        if (!aFav && bFav) return 1;
        return 0; // Maintain original order otherwise
    });

    // Hydration mismatch prevention: render standard list until mounted on client
    if (!mounted) {
        return (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
                {initialBrands.map((brand) => (
                    <Card key={brand.slug} style={{ height: '100%', transition: 'transform 0.2s', cursor: 'pointer' }}>
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
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
            {sortedBrands.map((brand) => {
                const isFavorite = favorites.includes(brand.slug);
                return (
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
                                {/* "View Analysis" removed per requirements */}
                            </CardContent>
                        </Card>
                    </Link>
                );
            })}
        </div>
    );
}
