export interface SkillLevel {
    level: 1 | 2 | 3 | 4 | 5;
    description: string;
    criteria: string;
}

export interface Skill {
    id: string;
    name: string;
    description: string;
    levels: SkillLevel[];
}

export interface Competency {
    id: string;
    name: string;
    description: string;
    skills: Skill[];
}

export interface CompetencyArea {
    id: string;
    name: string;
    description: string;
    competencies: Competency[];
}

export interface CompetencyFramework {
    title: string;
    version: string;
    areas: CompetencyArea[];
}
