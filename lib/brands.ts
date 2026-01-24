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

    // Helper to read and process markdown
    async function readMarkdown(filename: string): Promise<string> {
        const filePath = path.join(brandDir, filename);
        if (!fs.existsSync(filePath)) return '';
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const processedContent = await remark().use(html).process(fileContent);
        return processedContent.toString();
    }

    // Load Introduction
    const introduction = await readMarkdown('introduction.md');

    // Load standard markdown sections
    const [jtbd, audience, insights] = await Promise.all([
        readMarkdown('jtbd.md'),
        readMarkdown('audience.md'),
        readMarkdown('insights.md')
    ]);

    // Load Quiz
    const quizPath = path.join(brandDir, 'quiz.json');
    let quiz: QuizQuestion[] = [];
    if (fs.existsSync(quizPath)) {
        try {
            quiz = JSON.parse(fs.readFileSync(quizPath, 'utf8'));
        } catch (e) {
            console.error("Error parsing quiz.json", e);
        }
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
        introduction,
        jtbd,
        audience,
        structuredAudience,
        insights,
        quiz,
        structuredInsights,
        structuredJTBD,
        description
    };
}
