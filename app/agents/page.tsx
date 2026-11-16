import { PageHeader } from '@/components/page-header';
import { agents } from '@/lib/data';
import { ArrowDownRight, ArrowUpRight, Users } from 'lucide-react';

export default function AgentsPage() {
  const average = (agents.reduce((total, agent) => total + agent.score, 0) / agents.length).toFixed(1);
  return (
    <>
      <PageHeader eyebrow="WORKSPACE / PEOPLE" title="Agent performance" description="Monitor quality results, review volume, and coaching needs across your team." />
      <section className="metrics-grid">
        <div className="metric-card"><span className="metric-icon"><Users /></span><div className="metric-value">{agents.length}</div><div className="metric-label">Active demo agents</div><div className="metric-note">Across 3 programs</div></div>
        <div className="metric-card"><span className="metric-icon"><ArrowUpRight /></span><div className="metric-value">{average}%</div><div className="metric-label">Average QA score</div><div className="metric-note">Team-wide average</div></div>
        <div className="metric-card"><span className="metric-icon"><ArrowDownRight /></span><div className="metric-value">{agents.filter(agent => agent.status === 'Coaching').length}</div><div className="metric-label">Coaching focus</div><div className="metric-note">Below 90% target</div></div>
      </section>
      <section className="panel recent-panel">
        <div className="panel-heading"><div><h2>Agent scorecards</h2><p>Individual quality performance and evaluation volume</p></div><span className="small-muted">Sample data</span></div>
        <div className="table-scroll"><table><thead><tr><th>Agent</th><th>Program</th><th>Evaluations</th><th>QA score</th><th>WoW trend</th><th>Status</th></tr></thead><tbody>{agents.map(agent => <tr key={agent.id}><td><div className="agent-cell"><span className="agent-avatar">{agent.name.split(' ').map(part => part[0]).join('')}</span><div><strong>{agent.name}</strong><small>{agent.id}</small></div></div></td><td>{agent.program}</td><td>{agent.evaluations}</td><td><strong>{agent.score.toFixed(1)}%</strong></td><td className={agent.trend >= 0 ? 'trend-positive' : 'trend-negative'}>{agent.trend >= 0 ? '+' : ''}{agent.trend.toFixed(1)}%</td><td><span className={agent.status === 'On track' ? 'status passed' : 'status coaching'}>{agent.status}</span></td></tr>)}</tbody></table></div>
      </section>
      <div className="footer-note">QAFlow <span>•</span> Demo workspace · All names and scores are fictional</div>
    </>
  );
}
