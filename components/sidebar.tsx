'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Activity, BarChart3, ClipboardCheck, LayoutDashboard, Users } from 'lucide-react';

const links = [
  { href: '/', label: 'Overview', icon: LayoutDashboard },
  { href: '/agents', label: 'Agents', icon: Users },
  { href: '/evaluations', label: 'Evaluations', icon: ClipboardCheck },
  { href: '/reports', label: 'Reports', icon: BarChart3 },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      <Link className="brand" href="/">
        <span className="brand-mark"><Activity size={20} /></span>
        <span>QA<span className="brand-light">Flow</span></span>
      </Link>
      <div className="nav-caption">WORKSPACE</div>
      <nav className="nav-links" aria-label="Main navigation">
        {links.map(({ href, label, icon: Icon }) => {
          const active = href === '/' ? pathname === '/' : pathname.startsWith(href);
          return (
            <Link className={active ? 'nav-link active' : 'nav-link'} href={href} key={href} aria-current={active ? 'page' : undefined}>
              <Icon size={18} strokeWidth={1.8} />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="sidebar-bottom">
        <div className="sidebar-avatar">QA</div>
        <div><strong>QA Workspace</strong><span>Demo account</span></div>
      </div>
    </aside>
  );
}
