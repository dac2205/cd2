import fs from 'fs';
import path from 'path';
import { CompetencyFramework } from '@/lib/competency-types';
import CompetencyView from '@/components/competency/CompetencyView';

async function getFramework(): Promise<CompetencyFramework | null> {
    const filePath = path.join(process.cwd(), 'data/competency/framework.json');
    if (!fs.existsSync(filePath)) return null;
    const content = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(content) as CompetencyFramework;
}

export default async function CompetencyPage() {
    const framework = await getFramework();

    if (!framework) {
        return (
            <div className="container" style={{ padding: '4rem 0' }}>
                <h1>Framework not found</h1>
            </div>
        );
    }

    return <CompetencyView framework={framework} />;
}
