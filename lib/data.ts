export type EvaluationResult = 'Passed' | 'Failed' | 'Coaching';

export type Agent = {
  id: string;
  name: string;
  program: string;
  score: number;
  evaluations: number;
  trend: number;
  status: 'On track' | 'Coaching';
};

export type Evaluation = {
  id: string;
  agent: string;
  evaluator: string;
  program: string;
  date: string;
  score: number;
  result: EvaluationResult;
};

export const agents: Agent[] = [
  { id: 'AG-001', name: 'Jordan Lee', program: 'Customer Care', score: 96.4, evaluations: 28, trend: 2.1, status: 'On track' },
  { id: 'AG-002', name: 'Taylor Morgan', program: 'Customer Care', score: 93.8, evaluations: 26, trend: 1.4, status: 'On track' },
  { id: 'AG-003', name: 'Alex Rivera', program: 'Retention', score: 91.2, evaluations: 25, trend: 0.8, status: 'On track' },
  { id: 'AG-004', name: 'Casey Brown', program: 'Retention', score: 88.6, evaluations: 24, trend: -1.7, status: 'Coaching' },
  { id: 'AG-005', name: 'Sam Patel', program: 'Technical Support', score: 86.9, evaluations: 22, trend: -2.3, status: 'Coaching' },
  { id: 'AG-006', name: 'Jamie Chen', program: 'Technical Support', score: 94.1, evaluations: 27, trend: 1.9, status: 'On track' },
];

export const evaluations: Evaluation[] = [
  { id: 'QA-26114', agent: 'Jordan Lee', evaluator: 'Avery Wilson', program: 'Customer Care', date: 'Nov 14, 2026', score: 98, result: 'Passed' },
  { id: 'QA-26113', agent: 'Taylor Morgan', evaluator: 'Avery Wilson', program: 'Customer Care', date: 'Nov 14, 2026', score: 95, result: 'Passed' },
  { id: 'QA-26112', agent: 'Casey Brown', evaluator: 'Riley Scott', program: 'Retention', date: 'Nov 13, 2026', score: 84, result: 'Coaching' },
  { id: 'QA-26111', agent: 'Alex Rivera', evaluator: 'Riley Scott', program: 'Retention', date: 'Nov 13, 2026', score: 92, result: 'Passed' },
  { id: 'QA-26110', agent: 'Sam Patel', evaluator: 'Morgan Reed', program: 'Technical Support', date: 'Nov 12, 2026', score: 78, result: 'Failed' },
  { id: 'QA-26109', agent: 'Jamie Chen', evaluator: 'Morgan Reed', program: 'Technical Support', date: 'Nov 12, 2026', score: 96, result: 'Passed' },
  { id: 'QA-26108', agent: 'Jordan Lee', evaluator: 'Avery Wilson', program: 'Customer Care', date: 'Nov 11, 2026', score: 95, result: 'Passed' },
  { id: 'QA-26107', agent: 'Casey Brown', evaluator: 'Riley Scott', program: 'Retention', date: 'Nov 10, 2026', score: 86, result: 'Coaching' },
  { id: 'QA-26106', agent: 'Sam Patel', evaluator: 'Morgan Reed', program: 'Technical Support', date: 'Nov 10, 2026', score: 82, result: 'Failed' },
];

export const weekly = [
  { week: 'Week 45', score: 88.2, evaluations: 118 },
  { week: 'Week 46', score: 89.7, evaluations: 124 },
  { week: 'Week 47', score: 91.4, evaluations: 132 },
  { week: 'Week 48', score: 92.1, evaluations: 139 },
  { week: 'Week 49', score: 93.6, evaluations: 145 },
];

export const programs = [
  { name: 'Customer Care', score: 95.1, target: 90, evaluations: 186 },
  { name: 'Retention', score: 89.9, target: 90, evaluations: 142 },
  { name: 'Technical Support', score: 90.5, target: 90, evaluations: 164 },
];

export const dashboardSummary = {
  averageScore: 91.8,
  scoreChange: 2.4,
  totalEvaluations: 492,
  evaluationsChange: 8.6,
  agentsMonitored: 48,
  agentsChange: 3,
  coachingNeeded: 7,
};
