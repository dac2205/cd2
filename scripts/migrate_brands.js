
const fs = require('fs');
const path = require('path');

const brandsDir = path.resolve(process.cwd(), 'data/brands');

if (!fs.existsSync(brandsDir)) {
    console.error('Brands directory not found:', brandsDir);
    process.exit(1);
}

const brands = fs.readdirSync(brandsDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

console.log(`Found ${brands.length} brands. Converting to brand.json...`);

brands.forEach(brand => {
    const brandDir = path.join(brandsDir, brand);
    const metaPath = path.join(brandDir, 'meta.json');
    const descPath = path.join(brandDir, 'description.json');
    const brandJsonPath = path.join(brandDir, 'brand.json');

    let brandData = {};

    // Read Meta
    if (fs.existsSync(metaPath)) {
        try {
            const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
            brandData = { ...brandData, ...meta };
        } catch (e) {
            console.error(`Error reading meta.json for ${brand}`, e);
        }
    }

    // Read Description
    if (fs.existsSync(descPath)) {
        try {
            const desc = JSON.parse(fs.readFileSync(descPath, 'utf8'));
            // Assuming description.json is an array of strings
            brandData.description = desc;
        } catch (e) {
            console.error(`Error reading description.json for ${brand}`, e);
        }
    }

    // Write brand.json
    fs.writeFileSync(brandJsonPath, JSON.stringify(brandData, null, 4));
    console.log(`  -> Created brand.json for ${brand}`);

    // Cleanup
    if (fs.existsSync(metaPath)) fs.unlinkSync(metaPath);
    if (fs.existsSync(descPath)) fs.unlinkSync(descPath);
});

console.log('Migration complete.');
