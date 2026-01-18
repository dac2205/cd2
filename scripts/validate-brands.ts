import fs from 'fs';
import path from 'path';

// --- Configuration ---
const BRANDS_DIR = path.join(process.cwd(), 'data', 'brands');

// --- Types & Interfaces ---
interface ValidationResult {
    brand: string;
    status: 'PASS' | 'FAIL' | 'WARN';
    errors: string[];
    warnings: string[];
}

// --- Helpers ---
const exists = (filePath: string) => fs.existsSync(filePath);

const readJson = (filePath: string) => {
    try {
        return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch (e) {
        return null;
    }
};

const colors = {
    green: (msg: string) => `\x1b[32m${msg}\x1b[0m`,
    red: (msg: string) => `\x1b[31m${msg}\x1b[0m`,
    yellow: (msg: string) => `\x1b[33m${msg}\x1b[0m`,
    blue: (msg: string) => `\x1b[34m${msg}\x1b[0m`,
    bold: (msg: string) => `\x1b[1m${msg}\x1b[0m`,
};

// --- Validators ---

function validateBrand(brandSlug: string): ValidationResult {
    const brandDir = path.join(BRANDS_DIR, brandSlug);
    const result: ValidationResult = {
        brand: brandSlug,
        status: 'PASS',
        errors: [],
        warnings: []
    };

    if (!fs.statSync(brandDir).isDirectory()) {
        return result; // Skip files, theoretically shouldn't happen if we loop correctly
    }

    // 1. Validate meta.json
    const metaPath = path.join(brandDir, 'meta.json');
    if (!exists(metaPath)) {
        result.errors.push('Missing meta.json');
    } else {
        const meta = readJson(metaPath);
        if (!meta) {
            result.errors.push('Invalid JSON in meta.json');
        } else {
            if (!meta.id) result.errors.push('meta.json missing "id"');
            if (meta.id !== brandSlug) result.errors.push(`meta.json "id" (${meta.id}) does not match folder name (${brandSlug})`);
            if (!meta.name) result.errors.push('meta.json missing "name"');
            if (!meta.owner) result.errors.push('meta.json missing "owner"');
        }
    }

    // 2. Validate Audience
    const audienceJsonPath = path.join(brandDir, 'audience.json');
    if (!exists(audienceJsonPath)) {
        result.errors.push('Missing audience.json');
    } else {
        const audience = readJson(audienceJsonPath);
        if (!audience) {
            result.errors.push('Invalid JSON in audience.json');
        } else if (!Array.isArray(audience)) {
            result.errors.push('audience.json should be an array of segments');
        }
        // Could dig deeper into segment structure if strictness needed
    }

    // 3. Validate JTBD
    const jtbdPath = path.join(brandDir, 'jtbd.json');
    if (!exists(jtbdPath)) {
        result.errors.push('Missing jtbd.json');
    } else {
        const jtbd = readJson(jtbdPath);
        if (!jtbd) {
            result.errors.push('Invalid JSON in jtbd.json');
        } else {
            ['functional', 'emotional', 'social', 'other'].forEach(category => {
                if (!jtbd[category]) {
                    result.errors.push(`jtbd.json missing category "${category}"`);
                } else if (!Array.isArray(jtbd[category])) {
                    result.errors.push(`jtbd.json category "${category}" is not an array`);
                } else if (jtbd[category].length < 3) {
                    result.errors.push(`jtbd.json category "${category}" has fewer than 3 items`);
                } else {
                    // Check for placeholders
                    const hasPlaceholder = jtbd[category].some((item: any) =>
                        item.title?.includes("Chưa có thông tin") ||
                        item.description?.includes("Chưa có thông tin")
                    );
                    if (hasPlaceholder) {
                        result.warnings.push(`jtbd.json category "${category}" contains placeholder content`);
                    }

                    // Strict Field Check
                    jtbd[category].forEach((item: any, idx: number) => {
                        const requiredFields = ['id', 'title', 'description', 'situation', 'context', 'triggers', 'desiredOutcome'];
                        const missing = requiredFields.filter(k => !item[k] || (Array.isArray(item[k]) && item[k].length === 0));
                        if (missing.length > 0) {
                            result.errors.push(`jtbd.json category "${category}" item [${idx}] missing: ${missing.join(', ')}`);
                        }
                    });
                }
            });
        }
    }

    // 4. Validate Insights
    const insightsPath = path.join(brandDir, 'insights.json');
    if (!exists(insightsPath)) {
        result.errors.push('Missing insights.json');
    } else {
        const insights = readJson(insightsPath);
        if (!insights) {
            result.errors.push('Invalid JSON in insights.json');
        } else if (!Array.isArray(insights)) {
            result.errors.push('insights.json should be an array');
        } else {
            insights.forEach((insight: any, idx: number) => {
                const missing = ['title', 'tension', 'belief', 'core', 'angle', 'reframe', 'promise', 'rtb', 'mechanism'].filter(f => !insight[f]);
                if (missing.length > 0) {
                    result.errors.push(`insight[${idx}] missing fields: ${missing.join(', ')}`);
                }
                if (!insight.hooks || !Array.isArray(insight.hooks) || insight.hooks.length < 1) {
                    result.errors.push(`insight[${idx}] missing or empty "hooks" array`);
                }
            });
        }
    }

    // 5. Validate Quiz
    const quizPath = path.join(brandDir, 'quiz.json');
    if (!exists(quizPath)) {
        result.errors.push('Missing quiz.json');
    } else {
        const quiz = readJson(quizPath);
        if (!quiz) {
            result.errors.push('Invalid JSON in quiz.json');
        } else if (!Array.isArray(quiz)) {
            result.errors.push('quiz.json should be an array');
        } else if (quiz.length === 0) {
            result.warnings.push('quiz.json is empty');
        }
    }

    // 6. Validate Introduction
    if (!exists(path.join(brandDir, 'introduction.md'))) {
        result.errors.push('Missing introduction.md');
    }

    // Determine status
    if (result.errors.length > 0) result.status = 'FAIL';
    else if (result.warnings.length > 0) result.status = 'WARN';

    return result;
}

// --- Main Execution ---

console.log(colors.bold('\n🤖 BRAND DATA VALIDATOR BOT 🤖\n'));
console.log('Checking brands in: ' + BRANDS_DIR + '\n');

if (!exists(BRANDS_DIR)) {
    console.error(colors.red('CRITICAL: Brands directory not found!'));
    process.exit(1);
}

const brands = fs.readdirSync(BRANDS_DIR).filter(file => fs.statSync(path.join(BRANDS_DIR, file)).isDirectory());
const results = brands.map(validateBrand);

// Print Results
results.forEach(res => {
    let statusIcon = '✅';
    if (res.status === 'FAIL') statusIcon = '❌';
    if (res.status === 'WARN') statusIcon = '⚠️ ';

    const statusColor = res.status === 'PASS' ? colors.green
        : res.status === 'FAIL' ? colors.red
            : colors.yellow;

    console.log(`${statusIcon} ${colors.bold(res.brand.padEnd(20))} [${statusColor(res.status)}]`);

    res.errors.forEach(err => console.log(colors.red(`    - ERROR: ${err}`)));
    res.warnings.forEach(warn => console.log(colors.yellow(`    - WARN:  ${warn}`)));
});

// Summary
const total = results.length;
const passed = results.filter(r => r.status === 'PASS').length;
const warned = results.filter(r => r.status === 'WARN').length;
const failed = results.filter(r => r.status === 'FAIL').length;

console.log('\n----------------------------------------');
console.log(colors.bold('SUMMARY:'));
console.log(`Total Brands: ${total}`);
console.log(colors.green(`PASS:         ${passed}`));
console.log(colors.yellow(`WARN:         ${warned}`));
console.log(colors.red(`FAIL:         ${failed}`));
console.log('----------------------------------------\n');

if (failed > 0) process.exit(1);
