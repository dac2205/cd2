"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Brand } from "@/lib/types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Heart } from "lucide-react";
import { toast } from "sonner";

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
                    toast.error("Chỉ được chọn tối đa 3 brands yêu thích", {
                        description: "Hãy bỏ một brand đi để thêm brand mới."
                    });
                    return prev;
                }
                newFavorites = [...prev, slug];
            }
            localStorage.setItem("brand_favorites", JSON.stringify(newFavorites));
            return newFavorites;
        });
    };

    // Combine and sort brands: Favorites first
    const sortedBrands = [
        ...initialBrands.filter(b => favorites.includes(b.slug)),
        ...initialBrands.filter(b => !favorites.includes(b.slug))
    ];

    const renderCard = (brand: Brand, isFavorite: boolean) => (
        <Link key={brand.slug} href={`/brands/${brand.slug}`} className="block group no-underline h-full">
            <Card className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-paper-white border-caramel-walnut/15 rounded-xl shadow-sm relative overflow-hidden">
                <div
                    onClick={(e) => toggleFavorite(e, brand.slug)}
                    className="absolute top-4 right-4 z-10 cursor-pointer p-1 hover:bg-black/5 rounded-full transition-colors"
                >
                    <Heart
                        size={20}
                        fill={isFavorite ? "#ef4444" : "none"}
                        color={isFavorite ? "#ef4444" : "currentColor"}
                        className="text-ink-brown/40 hover:text-red-500 transition-colors"
                    />
                </div>
                <CardHeader>
                    <CardTitle className="pr-8 text-xl text-ink-brown font-serif">{brand.meta.name}</CardTitle>
                    <p className="text-sm text-ink-brown/60">
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
        // Server-side / Hydration fallback
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {initialBrands.map((brand) => (
                    <Card key={brand.slug} className="h-full bg-paper-white border-caramel-walnut/15 rounded-xl shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-ink-brown">{brand.meta.name}</CardTitle>
                            <p className="text-sm text-ink-brown/60">
                                {brand.meta.owner}
                            </p>
                        </CardHeader>
                    </Card>
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sortedBrands.map(brand => renderCard(brand, favorites.includes(brand.slug)))}
        </div>
    );
}
