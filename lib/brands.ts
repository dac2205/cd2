import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import {
    Brand,
    BrandContent,
    BrandMeta,
    QuizQuestion,
    Insight,
    JTBDData,
    AudienceSegment
} from './types';

const brandsDirectory = path.join(process.cwd(), 'data/brands');

export function getAllBrands(): Brand[] {
    if (!fs.existsSync(brandsDirectory)) {
        return [];
    }

    const brandFolders = fs.readdirSync(brandsDirectory);

    const brands = brandFolders.map(slug => {
        const metaPath = path.join(brandsDirectory, slug, 'meta.json');
        if (!fs.existsSync(metaPath)) return null;

        const metaContent = fs.readFileSync(metaPath, 'utf8');
        try {
            const meta = JSON.parse(metaContent) as BrandMeta;
            return {
                slug,
                meta
            };
        } catch (e) {
            console.error(`Error parsing meta.json for ${slug}`, e);
            return null;
        }
    }).filter((brand): brand is Brand => brand !== null);

    return brands;
}

export async function getBrandContent(slug: string): Promise<BrandContent | null> {
    const brandDir = path.join(brandsDirectory, slug);
    if (!fs.existsSync(brandDir)) return null;

    // Read Meta
    const metaPath = path.join(brandDir, 'meta.json');
    const meta: BrandMeta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));

    // Load Structured Introduction/Description
    const descriptionPath = path.join(brandDir, 'description.json');
    let description: string[] | undefined = undefined;
    if (fs.existsSync(descriptionPath)) {
        try {
            description = JSON.parse(fs.readFileSync(descriptionPath, 'utf8'));
        } catch (e) {
            console.error("Error parsing description.json", e);
        }
    }

    // Load Quizzes from subfolder
    const quizDir = path.join(brandDir, 'quiz');
    const quizzes: { id: string, questions: QuizQuestion[] }[] = [];
    if (fs.existsSync(quizDir)) {
        const quizFiles = fs.readdirSync(quizDir).filter(f => f.endsWith('.json'));
        quizFiles.forEach(file => {
            try {
                const qContent = JSON.parse(fs.readFileSync(path.join(quizDir, file), 'utf8'));
                quizzes.push({
                    id: file.replace('.json', ''),
                    questions: qContent
                });
            } catch (e) {
                console.error(`Error parsing quiz ${file}`, e);
            }
        });
    }

    // Load Structured Insights
    const structuredInsightsPath = path.join(brandDir, 'insights.json');
    let structuredInsights: Insight[] | undefined = undefined;
    if (fs.existsSync(structuredInsightsPath)) {
        try {
            structuredInsights = JSON.parse(fs.readFileSync(structuredInsightsPath, 'utf8'));
        } catch (e) {
            console.error("Error parsing insights.json", e);
        }
    }

    // Load Structured JTBD
    const structuredJTBDPath = path.join(brandDir, 'jtbd.json');
    let structuredJTBD: JTBDData | undefined = undefined;
    if (fs.existsSync(structuredJTBDPath)) {
        try {
            structuredJTBD = JSON.parse(fs.readFileSync(structuredJTBDPath, 'utf8'));
        } catch (e) {
            console.error("Error parsing jtbd.json", e);
        }
    }

    // Load Structured Audience
    const structuredAudiencePath = path.join(brandDir, 'audience.json');
    let structuredAudience: AudienceSegment[] | undefined = undefined;
    if (fs.existsSync(structuredAudiencePath)) {
        try {
            structuredAudience = JSON.parse(fs.readFileSync(structuredAudiencePath, 'utf8'));
        } catch (e) {
            console.error("Error parsing audience.json", e);
        }
    }

    return {
        meta,
        structuredAudience,
        structuredInsights,
        structuredJTBD,
        description,
        quizzes
    };
}
