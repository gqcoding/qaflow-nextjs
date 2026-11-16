'use client';

import { useEffect, useMemo, useState } from 'react';
import { PageHeader } from '@/components/page-header';
import { Activity, ArrowDownRight, ArrowUpRight, Download, FileCheck2, Target, Users } from 'lucide-react';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

type DashboardPayload = {
  generatedAt: string;
  summary: { averageScore: number; scoreChange: number; totalEvaluations: number; evaluationsChange: number; agentsMonitored: number; agentsChange: number; coachingNeeded: number };
  weekly: { week: string; score: number; evaluations: number }[];
  programs: { name: string; score: number; target: number; evaluations: number }[];
  recentEvaluations: { id: string; agent: string; evaluator: string; program: string; date: string; score: number; result: string }[];
};

function MetricCard({ icon: Icon, value, label, note, positive = true }: { icon: typeof Target; value: string; label: string; note: string; positive?: boolean }) {
  return <div className="metric-card"><span className="metric-icon"><Icon size={19} /></span><div className="metric-value">{value}</div><div className="metric-label">{label}</div><div className={positive ? 'metric-note positive' : 'metric-note'}>{note}</div></div>;
}

export function DashboardClient() {
  const [data, setData] = useState<DashboardPayload | null>(null);
  const [error, setError] = useState('');
  const [period, setPeriod] = useState('Last 30 days');

  useEffect(() => {
    const controller = new AbortController();
    async function loadDashboard() {
      try {
        const response = await fetch('/api/dashboard', { signal: controller.signal, cache: 'no-store' });
        if (!response.ok) throw new Error('Dashboard data could not be loaded.');
        const payload = await response.json() as DashboardPayload;
        setData(payload);
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') setError(err.message);
      }
    }
    void loadDashboard();
    return () => controller.abort();
  }, []);

  const chartData = useMemo(() => data?.weekly.map(item => ({ ...item, target: 90 })) ?? [], [data]);

  function exportCsv() {
    if (!data) return;
    const header = ['Evaluation ID', 'Agent', 'Evaluator', 'Program', 'Date', 'Score', 'Result'];
    const rows = data.recentEvaluations.map(item => [item.id, item.agent, item.evaluator, item.program, item.date, item.score, item.result]);
    const csv = [header, ...rows].map(row => row.map(value => `"${String(value).replaceAll('"', '""')}"`).join(',')).join('\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }));
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'qaflow-evaluations.csv';
    anchor.click();
    URL.revokeObjectURL(url);
  }

  return (
    <>
      <PageHeader eyebrow="WORKSPACE / OVERVIEW" title="Quality overview" description="A clear view of quality performance and team health." />
      <div className="dashboard-toolbar"><div className="live-label"><span className="live-dot" /> Live demo data</div><div className="toolbar-actions"><select value={period} onChange={event => setPeriod(event.target.value)} aria-label="Select reporting period"><option>Last 30 days</option><option>Last 7 days</option><option>Quarter to date</option></select><button className="secondary-button" onClick={exportCsv} disabled={!data}><Download size={16} /> Export CSV</button></div></div>
      {!data && !error && <div className="loading-state"><span className="spinner" /> Loading dashboard metrics…</div>}
      {error && <div className="error-state" role="alert"><strong>Unable to load the dashboard</strong><p>{error}</p><button className="primary-button" onClick={() => { setError(''); setData(null); window.location.reload(); }}>Retry</button></div>}
      {data && <>
        <section className="metrics-grid">
          <MetricCard icon={Target} value={`${data.summary.averageScore}%`} label="Average QA score" note={`+${data.summary.scoreChange}% vs. previous period`} />
          <MetricCard icon={FileCheck2} value={data.summary.totalEvaluations.toLocaleString()} label="Total evaluations" note={`+${data.summary.evaluationsChange}% evaluation volume`} />
          <MetricCard icon={Users} value={String(data.summary.agentsMonitored)} label="Agents monitored" note={`+${data.summary.agentsChange} added this period`} />
          <MetricCard icon={Activity} value={String(data.summary.coachingNeeded)} label="Coaching needed" note="Agents below 90% target" positive={false} />
        </section>
        <section className="dashboard-grid">
          <div className="panel chart-panel">
            <div className="panel-heading"><div><h2>Quality performance</h2><p>Weekly average QA score · {period}</p></div><span className="chart-legend"><i /> QA score <i className="legend-target" /> 90% target</span></div>
            <div className="chart-wrap"><ResponsiveContainer width="100%" height="100%"><LineChart data={chartData} margin={{ top: 12, right: 12, left: -20, bottom: 0 }}><CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#edf0f4" /><XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fill: '#8b95a5', fontSize: 12 }} /><YAxis domain={[80, 100]} axisLine={false} tickLine={false} tick={{ fill: '#8b95a5', fontSize: 12 }} /><Tooltip contentStyle={{ border: '1px solid #e7eaf0', borderRadius: 12, fontSize: 12 }} /><Line type="monotone" dataKey="score" name="QA score" stroke="#6558d3" strokeWidth={3} dot={{ r: 4, fill: '#6558d3', strokeWidth: 0 }} activeDot={{ r: 6 }} /><Line type="monotone" dataKey="target" name="Target" stroke="#aeb6c4" strokeDasharray="5 5" dot={false} strokeWidth={1.5} /></LineChart></ResponsiveContainer></div>
          </div>
          <div className="panel program-panel"><div className="panel-heading"><div><h2>Program scorecard</h2><p>Performance by business line</p></div></div><div className="program-list">{data.programs.map(program => <div className="program-item" key={program.name}><div className="program-top"><strong>{program.name}</strong><b>{program.score}%</b></div><div className="progress-track"><div className="progress-fill" style={{ width: `${program.score}%` }} /></div><div className="program-meta"><span>{program.evaluations} evaluations</span><span className={program.score >= program.target ? 'target-met' : 'target-missed'}>{program.score >= program.target ? 'Target met' : 'Below target'}</span></div></div>)}</div></div>
        </section>
        <section className="panel recent-panel"><div className="panel-heading"><div><h2>Recent evaluations</h2><p>Latest quality reviews across your programs</p></div><span className="small-muted">Last updated {new Date(data.generatedAt).toLocaleTimeString()}</span></div><div className="table-scroll"><table><thead><tr><th>Evaluation ID</th><th>Agent</th><th>Program</th><th>Date</th><th>Score</th><th>Result</th></tr></thead><tbody>{data.recentEvaluations.map(item => <tr key={item.id}><td className="id-cell">{item.id}</td><td><strong>{item.agent}</strong></td><td>{item.program}</td><td>{item.date}</td><td><strong>{item.score}%</strong></td><td><span className={`status ${item.result.toLowerCase()}`}>{item.result}</span></td></tr>)}</tbody></table></div></section>
        <div className="footer-note">QAFlow <span>•</span> Demo workspace · All names and scores are fictional</div>
      </>}
    </>
  );
}
