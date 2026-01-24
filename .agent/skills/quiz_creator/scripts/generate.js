
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

console.log(`Found ${brands.length} brands.`);

brands.forEach(brand => {
    const brandDir = path.join(brandsDir, brand);
    const jtbdPath = path.join(brandDir, 'jtbd.json');
    const quizPath = path.join(brandDir, 'quiz.json');

    if (fs.existsSync(jtbdPath)) {
        console.log(`Processing brand: ${brand}`);
        try {
            const jtbdData = JSON.parse(fs.readFileSync(jtbdPath, 'utf8'));
            const quizQuestions = [];

            const categories = [
                { key: 'functional', answer: 'Functional Job' },
                { key: 'emotional', answer: 'Emotional Job' },
                { key: 'social', answer: 'Social Job' }
            ];

            const fixedOptions = ["Functional Job", "Emotional Job", "Social Job"];

            let questionCount = 0;

            categories.forEach(cat => {
                if (jtbdData[cat.key] && Array.isArray(jtbdData[cat.key])) {
                    jtbdData[cat.key].forEach((item, index) => {
                        const addQuestion = (content) => {
                            if (content && typeof content === 'string' && content.trim() !== '') {
                                const correctAnswerIndex = fixedOptions.indexOf(cat.answer);
                                quizQuestions.push({
                                    id: (questionCount++).toString(),
                                    question: content.trim(),
                                    options: fixedOptions,
                                    correctAnswer: correctAnswerIndex,
                                    explanation: `Đây là ví dụ về ${cat.answer}.`
                                });
                            }
                        };

                        addQuestion(item.description);
                        addQuestion(item.situation);
                        if (Array.isArray(item.triggers)) item.triggers.forEach(addQuestion);
                        if (Array.isArray(item.desiredOutcome)) item.desiredOutcome.forEach(addQuestion);
                    });
                }
            });

            // Scoring helper: penalize distance from 12-15 words range
            const getLengthScore = (text) => {
                const wordCount = text.split(/\s+/).length;
                if (wordCount >= 12 && wordCount <= 15) return 0; // Perfect
                if (wordCount < 12) return 12 - wordCount;
                return wordCount - 15;
            };

            // Limit to 20 questions (Round 1: 5 + Round 2: 5 + Round 3: 10)
            const TARGET_COUNT = 20;

            // Sort by Length Score (Lower is better)
            quizQuestions.sort((a, b) => getLengthScore(a.question) - getLengthScore(b.question));

            // Take top candidates (e.g. up to 150% of target to allow some variation if we have enough data)
            // But user said "Create... 20 questions".
            // Let's just take the best 20 directly if we want strict adherence to the *best* length.
            // However, to keep it "random" if there are many good ones, we can take all "good" ones and shuffle.

            // Let's define "Good" as score < 5 (roughly 8-20 words).
            // Actually, simply:
            // 1. Sort by score.
            // 2. Take top 40 (or all if < 40).
            // 3. Shuffle these top 40.
            // 4. Take first 20.
            const candidates = quizQuestions.slice(0, 40);

            // Shuffle candidates using Fisher-Yates
            for (let i = candidates.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [candidates[i], candidates[j]] = [candidates[j], candidates[i]];
            }

            const selectedQuestions = candidates.slice(0, TARGET_COUNT);

            if (selectedQuestions.length > 0) {
                fs.writeFileSync(quizPath, JSON.stringify(selectedQuestions, null, 4));
                console.log(`  -> Generated ${selectedQuestions.length} questions for ${brand} (selected from ${quizQuestions.length} candidates)`);
            } else {
                console.log(`  -> No questions generated for ${brand}`);
            }

        } catch (err) {
            console.error(`  -> Error processing ${brand}:`, err.message);
        }
    }
});
