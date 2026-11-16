import { NextResponse } from 'next/server';
import { agents, dashboardSummary, evaluations, programs, weekly } from '@/lib/data';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    return NextResponse.json({
      generatedAt: new Date().toISOString(),
      summary: dashboardSummary,
      weekly,
      programs,
      agents: agents.slice(0, 5),
      recentEvaluations: evaluations.slice(0, 6),
    }, { status: 200 });
  } catch {
    return NextResponse.json({ error: 'Unable to load dashboard data.' }, { status: 500 });
  }
}
