'use client';

import { PageHeader } from '@/components/page-header';
import { weekly, agents } from '@/lib/data';
import { Download, FileBarChart, Target, Award, AlertTriangle } from 'lucide-react';

export default function ReportsPage() {
  const average = (agents.reduce((sum, agent) => sum + agent.score, 0) / agents.length).toFixed(1);
  const below = agents.filter(agent => agent.score < 90).length;
  return (
    <>
      <PageHeader eyebrow="WORKSPACE / INSIGHTS" title="Reports & insights" description="Turn quality results into clear actions for your operation." />
      <div className="report-intro"><div><span className="report-icon"><FileBarChart /></span><div><h2>Monthly quality summary</h2><p>November 1–30, 2026 · Consolidated workspace report</p></div></div><button className="primary-button" onClick={() => window.print()}><Download size={16} /> Export report</button></div>
      <section className="metrics-grid report-metrics">
        <div className="metric-card"><span className="metric-icon"><Target /></span><div className="metric-value">{average}%</div><div className="metric-label">Average QA score</div><div className="metric-note">Across all active agents</div></div>
        <div className="metric-card"><span className="metric-icon"><Award /></span><div className="metric-value">{weekly.filter(week => week.score >= 90).length}/{weekly.length}</div><div className="metric-label">Weeks meeting target</div><div className="metric-note">90% quality threshold</div></div>
        <div className="metric-card"><span className="metric-icon"><AlertTriangle /></span><div className="metric-value">{below}</div><div className="metric-label">Agents below target</div><div className="metric-note">Recommended for coaching</div></div>
      </section>
      <div className="panel report-panel"><div className="panel-heading"><div><h2>Performance by week</h2><p>Progress against the 90% quality target</p></div></div><div className="report-week-list">{weekly.map(week => <div className="week-row" key={week.week}><span>{week.week}</span><div className="progress-track"><div className="progress-fill" style={{ width: `${week.score}%` }} /></div><strong>{week.score}%</strong><span className={week.score >= 90 ? 'status passed' : 'status coaching'}>{week.score >= 90 ? 'On target' : 'Below target'}</span></div>)}</div></div>
      <div className="info-strip"><strong>Recommended next step</strong><span>Review the two agents below target, validate their critical error drivers, and document coaching follow-up within the next evaluation cycle.</span></div>
      <div className="footer-note">QAFlow <span>•</span> Demo workspace · Sample data for educational use</div>
    </>
  );
}
