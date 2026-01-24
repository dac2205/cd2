
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
    const brandJsonPath = path.join(brandDir, 'brand.json');
    const jtbdPath = path.join(brandDir, 'jtbd.json');
    const quizDir = path.join(brandDir, 'quiz');

    // Create quiz subdir if not exists
    if (!fs.existsSync(quizDir)) {
        fs.mkdirSync(quizDir, { recursive: true });
    }

    if (fs.existsSync(jtbdPath)) {
        console.log(`Processing brand: ${brand}`);
        try {
            // Read brand description for context
            let brandDescription = [];
            if (fs.existsSync(brandJsonPath)) {
                const brandData = JSON.parse(fs.readFileSync(brandJsonPath, 'utf8'));
                brandDescription = brandData.description || [];
            }

            const jtbdData = JSON.parse(fs.readFileSync(jtbdPath, 'utf8'));
            const allQuestions = [];

            const categories = [
                { key: 'functional', answer: 'Functional Job' },
                { key: 'emotional', answer: 'Emotional Job' },
                { key: 'social', answer: 'Social Job' }
            ];

            const fixedOptions = ["Functional Job", "Emotional Job", "Social Job"];
            let questionIdCounter = 0;

            categories.forEach(cat => {
                if (jtbdData[cat.key] && Array.isArray(jtbdData[cat.key])) {
                    jtbdData[cat.key].forEach((item) => {
                        const addQuestion = (content) => {
                            if (content && typeof content === 'string' && content.trim() !== '') {
                                const correctAnswerIndex = fixedOptions.indexOf(cat.answer);
                                allQuestions.push({
                                    // temporary ID, will assign real ID later
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

            // Helper to shuffle
            const shuffle = (array) => {
                const newArr = [...array];
                for (let i = newArr.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
                }
                return newArr;
            };

            // Scoring helper
            const getLengthScore = (text) => {
                const wordCount = text.split(/\s+/).length;
                if (wordCount >= 12 && wordCount <= 15) return 0;
                if (wordCount < 12) return 12 - wordCount;
                return wordCount - 15;
            };

            // Generate 1 quiz with 20 questions (5 + 5 + 10)
            const TARGET_COUNT = 20;
            const NUM_QUIZZES = 1;

            for (let qIdx = 1; qIdx <= NUM_QUIZZES; qIdx++) {
                // 1. Sort by length score to prioritize good length
                allQuestions.sort((a, b) => getLengthScore(a.question) - getLengthScore(b.question));

                // 2. Take top pool (e.g. 40 candidates) to allow variation
                const candidatePool = allQuestions.slice(0, 50);

                // 3. Shuffle pool
                const shuffledCandidates = shuffle(candidatePool);

                // 4. Select top questions based on target count
                const selectedQuestions = shuffledCandidates.slice(0, TARGET_COUNT);

                // 5. Assign IDs
                const finalQuestions = selectedQuestions.map((q, idx) => ({
                    ...q,
                    id: `${brand}-q${qIdx}-${idx + 1}`
                }));

                if (finalQuestions.length > 0) {
                    const outPath = path.join(quizDir, `quiz_${qIdx}.json`);
                    fs.writeFileSync(outPath, JSON.stringify(finalQuestions, null, 4));
                    console.log(`  -> Generated quiz_${qIdx}.json with ${finalQuestions.length} questions.`);
                } else {
                    console.log(`  -> Not enough data for quiz_${qIdx}.json`);
                }
            }

        } catch (err) {
            console.error(`  -> Error processing ${brand}:`, err.message);
        }
    }
});
