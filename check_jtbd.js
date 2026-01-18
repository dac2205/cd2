const fs = require('fs');
const path = require('path');

const brandsDir = 'data/brands';
const brands = fs.readdirSync(brandsDir).filter(f => fs.statSync(path.join(brandsDir, f)).isDirectory());

console.log('Checking JTBD completeness for keys: situation, context, triggers, desiredOutcome');

brands.forEach(brand => {
    const jtbdPath = path.join(brandsDir, brand, 'jtbd.json');
    if (!fs.existsSync(jtbdPath)) {
        console.log(`[MISSING FILE] ${brand}`);
        return;
    }

    try {
        const jtbd = JSON.parse(fs.readFileSync(jtbdPath, 'utf8'));
        let missingCount = 0;
        let totalItems = 0;

        ['functional', 'emotional', 'social', 'other'].forEach(cat => {
            if (jtbd[cat]) {
                jtbd[cat].forEach(item => {
                    totalItems++;
                    const keys = ['situation', 'context', 'triggers', 'desiredOutcome'];
                    const missing = keys.filter(k => !item[k]);
                    if (missing.length > 0) missingCount++;
                });
            }
        });

        if (missingCount > 0) {
            console.log(`[INCOMPLETE] ${brand}: ${missingCount}/${totalItems} items missing fields`);
        } else {
            console.log(`[OK] ${brand}`);
        }
    } catch (e) {
        console.log(`[ERROR] ${brand}: ${e.message}`);
    }
});
