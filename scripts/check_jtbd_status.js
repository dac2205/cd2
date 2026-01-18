const fs = require('fs');
const path = require('path');

const brandsDir = path.join(process.cwd(), 'data/brands');
const brands = fs.readdirSync(brandsDir).filter(f => fs.statSync(path.join(brandsDir, f)).isDirectory());

console.log(`Checking ${brands.length} brands...`);

brands.forEach(brand => {
    const jtbdPath = path.join(brandsDir, brand, 'jtbd.json');
    if (!fs.existsSync(jtbdPath)) {
        console.log(`[MISSING FILE] ${brand}: No jtbd.json`);
        return;
    }

    try {
        const data = JSON.parse(fs.readFileSync(jtbdPath, 'utf8'));
        const cats = ['functional', 'emotional', 'social'];
        const issues = [];
        cats.forEach(cat => {
            if (!data[cat] || data[cat].length < 3) {
                issues.push(`${cat}: ${data[cat] ? data[cat].length : 0}`);
            }
        });

        if (issues.length > 0) {
            console.log(`[INCOMPLETE] ${brand}: ${issues.join(', ')}`);
        } else {
            // console.log(`[OK] ${brand}`);
        }

    } catch (e) {
        console.log(`[ERROR] ${brand}: Invalid JSON`);
    }
});
