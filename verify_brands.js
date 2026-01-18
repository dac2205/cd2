
const fs = require('fs');
const path = require('path');

const brands = [
    'true-juice',
    'inside-school',
    'queen',
    'aurora-english',
    'jamte',
    'duoc-su-van-bao',
    'ngoc-cis',
    'kien-tao-sieu-nhan',
    'cao-huy',
    'vitamind',
    'dung-happy',
    'mai-am',
    'nam-art'
];

const baseDir = '/Users/dac/ConanCode/conan.school websites/customer-decode-2/data/brands';

let allPas = true;

brands.forEach(brand => {
    console.log(`Checking ${brand}...`);

    // Check Insights
    const insightsPath = path.join(baseDir, brand, 'insights.json');
    try {
        if (fs.existsSync(insightsPath)) {
            const content = JSON.parse(fs.readFileSync(insightsPath, 'utf8'));
            console.log(`  - Insights: ${content.length} (Target: 5)`);
            if (content.length !== 5) {
                console.error(`    [FAIL] Insights count mismatch for ${brand}`);
                allPas = false;
            }
        }
    } catch (e) {
        console.error(`  [ERROR] Invalid JSON in ${insightsPath}: ${e.message}`);
        allPas = false;
    }

    // Check JTBD
    const jtbdPath = path.join(baseDir, brand, 'jtbd.json');
    try {
        if (fs.existsSync(jtbdPath)) {
            const content = JSON.parse(fs.readFileSync(jtbdPath, 'utf8'));
            const categories = ['functional', 'emotional', 'social', 'other'];
            categories.forEach(cat => {
                const count = content[cat] ? content[cat].length : 0;
                console.log(`  - JTBD [${cat}]: ${count} (Target: >=3)`);
                if (count < 3) {
                    console.error(`    [FAIL] JTBD ${cat} count mismatch for ${brand}`);
                    allPas = false;
                }
            });
        }
    } catch (e) {
        console.error(`  [ERROR] Invalid JSON in ${jtbdPath}: ${e.message}`);
        allPas = false;
    }
});

if (allPas) {
    console.log('\nAll checks passed!');
} else {
    console.log('\nVerification FAILED.');
    process.exit(1);
}
