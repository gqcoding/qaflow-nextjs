'use client';

import { useMemo, useState } from 'react';
import { PageHeader } from '@/components/page-header';
import { evaluations } from '@/lib/data';
import { Search, Filter } from 'lucide-react';

export default function EvaluationsPage() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState('All results');
  const rows = useMemo(() => evaluations.filter(evaluation =>
    (evaluation.agent.toLowerCase().includes(query.toLowerCase()) || evaluation.id.toLowerCase().includes(query.toLowerCase())) &&
    (result === 'All results' || evaluation.result === result)
  ), [query, result]);

  return (
    <>
      <PageHeader eyebrow="WORKSPACE / QUALITY" title="Evaluations" description="Explore completed quality reviews and follow up on coaching outcomes." />
      <div className="toolbar">
        <div className="live-label"><Filter size={16} /> {rows.length} evaluations found</div>
        <div className="toolbar-actions">
          <div className="search-box"><Search size={16} /><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search by agent or ID…" aria-label="Search evaluations" /></div>
          <select value={result} onChange={event => setResult(event.target.value)} aria-label="Filter by result"><option>All results</option><option>Passed</option><option>Failed</option><option>Coaching</option></select>
        </div>
      </div>
      <div className="panel recent-panel">
        <div className="panel-heading"><div><h2>Evaluation log</h2><p>Review details from the latest audits</p></div><span className="small-muted">November 2026</span></div>
        <div className="table-scroll"><table><thead><tr><th>Evaluation ID</th><th>Agent</th><th>Evaluator</th><th>Program</th><th>Date</th><th>Score</th><th>Result</th></tr></thead><tbody>{rows.map(evaluation => <tr key={evaluation.id}><td className="id-cell">{evaluation.id}</td><td><strong>{evaluation.agent}</strong></td><td>{evaluation.evaluator}</td><td>{evaluation.program}</td><td>{evaluation.date}</td><td><strong>{evaluation.score}%</strong></td><td><span className={`status ${evaluation.result.toLowerCase()}`}>{evaluation.result}</span></td></tr>)}</tbody></table>{rows.length === 0 && <div className="empty-state">No evaluations match your filters. Try a different search.</div>}</div>
      </div>
      <div className="footer-note">QAFlow <span>•</span> Demo workspace · Sample data for educational use</div>
    </>
  );
}
