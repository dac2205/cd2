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
                    toast.info("Đã đạt giới hạn 3 brands yêu thích", {
                        description: "Bạn cần bỏ một brand cũ để thêm brand mới.",
                        style: { background: '#EFF6FF', color: '#1E40AF', border: '1px solid #DBEAFE' } // Blue theme
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
    const favoritedBrands = initialBrands.filter(b => favorites.includes(b.slug));
    const otherBrands = initialBrands.filter(b => !favorites.includes(b.slug));

    const renderCard = (brand: Brand, isFavorite: boolean) => (
        <Link key={brand.slug} href={`/brands/${brand.slug}`} className="block group no-underline h-full">
            <Card className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-paper-white border-caramel-walnut/15 rounded-xl shadow-sm relative overflow-hidden">
                <div
                    className="absolute top-0 w-full flex justify-center pt-2 z-10"
                >
                    <div
                        onClick={(e) => toggleFavorite(e, brand.slug)}
                        className="cursor-pointer p-2 hover:bg-black/5 rounded-full transition-colors flex items-center justify-center"
                    >
                        <Heart
                            size={20}
                            fill={isFavorite ? "#ef4444" : "none"}
                            color={isFavorite ? "#ef4444" : "currentColor"}
                            className="text-ink-brown/40 hover:text-red-500 transition-colors"
                        />
                    </div>
                </div>
                <CardHeader className="pt-10">
                    <CardTitle className=" text-xl text-ink-brown font-serif">{brand.meta.name}</CardTitle>
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
        <div className="space-y-12 animate-slide-in">
            {/* Favorited Brands Section - Only show if there are favorites */}
            {favoritedBrands.length > 0 && (
                <div suppressHydrationWarning>
                    <div className="flex items-center gap-4 mb-8">
                        <Heart className="fill-red-500 text-red-500" size={24} />
                        <h2 className="text-2xl font-serif font-bold text-ink-brown">Thương hiệu yêu thích</h2>
                        <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-bold">
                            {favoritedBrands.length}/3
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {favoritedBrands.map(brand => renderCard(brand, true))}
                    </div>

                    {/* Separator */}
                    <div className="border-t border-ink-brown/10 my-12" />
                </div>
            )}

            {/* Other Brands Section */}
            <div>
                {favoritedBrands.length > 0 && (
                    <h2 className="text-2xl font-serif font-bold text-ink-brown mb-8 text-left">Khám phá các thương hiệu khác</h2>
                )}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {otherBrands.map(brand => renderCard(brand, false))}
                </div>
            </div>
        </div>
    );
}
