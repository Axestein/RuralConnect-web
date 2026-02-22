'use client';

import {
  ClipboardCheck, Users, TrendingUp, AlertTriangle, CheckCircle,
  Clock, MapPin, MessageSquare, FileText, Bell, ChevronRight,
  ArrowUpRight, Activity, Zap, BarChart3, Calendar
} from 'lucide-react';
import Link from 'next/link';

const stats = [
  { label: 'Pending', value: '24', sub: '3 escalated', icon: <Clock size={18} />, color: '#d97706', bg: '#fffbeb', border: '#fde68a', strip: '#f59e0b' },
  { label: 'In Progress', value: '12', sub: '+2 since morning', icon: <TrendingUp size={18} />, color: '#2563eb', bg: '#eff6ff', border: '#bfdbfe', strip: '#3b82f6' },
  { label: 'Resolved Today', value: '8', sub: '↑ vs 6 yesterday', icon: <CheckCircle size={18} />, color: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0', strip: '#22c55e' },
  { label: 'High Priority', value: '5', sub: 'Needs attention', icon: <AlertTriangle size={18} />, color: '#dc2626', bg: '#fef2f2', border: '#fecaca', strip: '#ef4444' },
];

const pendingTasks = [
  { id: 'CMP-123', title: 'Water Pipeline Leak', location: 'Main Street', priority: 'High', time: '2h ago', category: 'Water Supply' },
  { id: 'CMP-124', title: 'Garbage Accumulation', location: 'Market Area', priority: 'Medium', time: '4h ago', category: 'Sanitation' },
  { id: 'CMP-125', title: 'Street Light Repair', location: 'Park Road', priority: 'Low', time: '1d ago', category: 'Electricity' },
  { id: 'CMP-126', title: 'Road Pothole Repair', location: 'Highway Rd', priority: 'High', time: '6h ago', category: 'Potholes' },
];

const priorityConfig = {
  High:   { bg: '#fef2f2', color: '#dc2626', border: '#fecaca' },
  Medium: { bg: '#fffbeb', color: '#d97706', border: '#fde68a' },
  Low:    { bg: '#eff6ff', color: '#2563eb', border: '#bfdbfe' },
};

const quickActions = [
  { title: 'Assign Tasks', icon: <Users size={22} />, href: '/officer/citizens', color: '#2563eb', bg: '#eff6ff', border: '#bfdbfe' },
  { title: 'Reports', icon: <FileText size={22} />, href: '/officer/reports', color: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0' },
  { title: 'Analytics', icon: <BarChart3 size={22} />, href: '/officer/analytics', color: '#7c3aed', bg: '#f5f3ff', border: '#ddd6fe' },
  { title: 'Citizens', icon: <MessageSquare size={22} />, href: '/officer/citizens', color: '#ea580c', bg: '#fff7ed', border: '#fed7aa' },
];

const performance = [
  { label: 'Resolution Rate', value: '78%', pct: 78, color: '#22c55e' },
  { label: 'Avg. Resolution Time', value: '2.3 days', pct: 65, color: '#3b82f6' },
  { label: 'Citizen Satisfaction', value: '4.2/5', pct: 84, color: '#8b5cf6' },
];

export default function OfficerDashboard() {
  return (
    <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif", background: '#f8fafc', minHeight: '100vh', color: '#0f172a' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Sora:wght@600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; }

        .card { background: #fff; border: 1px solid #e8edf3; border-radius: 16px; box-shadow: 0 1px 3px rgba(0,0,0,0.04); transition: all 0.25s cubic-bezier(0.4,0,0.2,1); }
        .card:hover { box-shadow: 0 10px 40px rgba(0,0,0,0.08); transform: translateY(-2px); border-color: #dde3ec; }

        .metric-card { background: #fff; border: 1px solid #e8edf3; border-radius: 20px; padding: 24px 28px; position: relative; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.04); transition: all 0.3s cubic-bezier(0.4,0,0.2,1); }
        .metric-card:hover { box-shadow: 0 16px 50px rgba(0,0,0,0.09); transform: translateY(-3px); border-color: #dde3ec; }

        .section-label { font-size: 11px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: #94a3b8; font-family: 'JetBrains Mono', monospace; }

        .badge { display: inline-flex; align-items: center; gap: 4px; padding: 3px 10px; border-radius: 100px; font-size: 11px; font-weight: 700; font-family: 'JetBrains Mono', monospace; }

        .btn-primary { background: #0f172a; border: 1px solid #0f172a; color: #fff; padding: 9px 18px; border-radius: 10px; font-size: 14px; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 8px; font-family: inherit; transition: all 0.2s; box-shadow: 0 1px 3px rgba(15,23,42,0.2); white-space: nowrap; text-decoration: none; }
        .btn-primary:hover { background: #1e293b; box-shadow: 0 4px 12px rgba(15,23,42,0.25); }

        .btn-secondary { background: #fff; border: 1px solid #e2e8f0; color: #374151; padding: 8px 14px; border-radius: 9px; font-size: 13px; font-weight: 500; cursor: pointer; display: flex; align-items: center; gap: 6px; font-family: inherit; transition: all 0.2s; box-shadow: 0 1px 2px rgba(0,0,0,0.05); text-decoration: none; white-space: nowrap; }
        .btn-secondary:hover { background: #f8fafc; border-color: #cbd5e1; }

        .btn-solid { background: #0f172a; color: #fff; border: 1px solid #0f172a; padding: 7px 14px; border-radius: 8px; font-size: 13px; font-weight: 600; cursor: pointer; font-family: inherit; transition: all 0.2s; }
        .btn-solid:hover { background: #1e293b; }

        .task-row { display: flex; align-items: center; justify-content: space-between; padding: 16px; border-radius: 12px; border: 1px solid #f1f5f9; background: #fff; transition: all 0.2s; gap: 16px; }
        .task-row:hover { border-color: #e2e8f0; background: #fafbff; box-shadow: 0 4px 16px rgba(0,0,0,0.05); }

        .progress-bar { height: 6px; border-radius: 100px; background: #f1f5f9; overflow: hidden; }
        .progress-fill { height: 100%; border-radius: 100px; }

        .quick-action-card { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px; padding: 20px 12px; border-radius: 14px; border: 1px solid #e8edf3; background: #fff; text-decoration: none; text-align: center; transition: all 0.25s cubic-bezier(0.4,0,0.2,1); box-shadow: 0 1px 3px rgba(0,0,0,0.04); cursor: pointer; }
        .quick-action-card:hover { box-shadow: 0 10px 32px rgba(0,0,0,0.09); transform: translateY(-2px); border-color: #dde3ec; }

        @keyframes fadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        .animate-in { animation: fadeUp 0.45s cubic-bezier(0.4,0,0.2,1) both; }
        .s1 { animation-delay: 0.05s; } .s2 { animation-delay: 0.1s; } .s3 { animation-delay: 0.15s; }
      `}</style>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 32px' }}>

        {/* Header */}
        <div className="animate-in" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '36px' }}>
          <div>
            <div className="section-label" style={{ marginBottom: '8px' }}>District Administration Portal</div>
            <h1 style={{ fontFamily: "'Sora', sans-serif", fontSize: '30px', fontWeight: 800, color: '#0f172a', margin: 0, letterSpacing: '-0.025em' }}>
              Officer Dashboard
            </h1>
            <p style={{ color: '#94a3b8', fontSize: '14px', marginTop: '6px' }}>
              Welcome back, <span style={{ color: '#0f172a', fontWeight: 600 }}>Vikram Singh</span> · Rural Development Department
            </p>
          </div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            {/* Notification */}
            <button style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#fff', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', position: 'relative', color: '#64748b', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', transition: 'all 0.2s' }}>
              <Bell size={16} />
              <span style={{ position: 'absolute', top: '7px', right: '7px', width: '7px', height: '7px', background: '#ef4444', borderRadius: '50%', border: '1.5px solid #fff', boxShadow: '0 0 5px rgba(239,68,68,0.5)' }} />
            </button>
            <Link href="/officer/complaints/board" className="btn-primary">
              <ClipboardCheck size={15} /> New Complaint
            </Link>
          </div>
        </div>

        {/* Today's Date Banner */}
        <div className="animate-in s1" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', padding: '10px 16px', background: '#fff', border: '1px solid #e8edf3', borderRadius: '12px', width: 'fit-content', boxShadow: '0 1px 2px rgba(0,0,0,0.04)' }}>
          <Calendar size={14} color="#6366f1" />
          <span style={{ fontSize: '13px', color: '#64748b', fontFamily: 'JetBrains Mono, monospace' }}>
            {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </span>
          <span style={{ width: '1px', height: '14px', background: '#e2e8f0' }} />
          <span style={{ fontSize: '13px', color: '#6366f1', fontWeight: 600, fontFamily: 'JetBrains Mono, monospace' }}>RDO-234</span>
        </div>

        {/* KPI Cards */}
        <div className="animate-in s1" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
          {stats.map((m, i) => (
            <div key={m.label} className="metric-card" style={{ animationDelay: `${i * 0.06}s` }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg, ${m.strip}88, ${m.strip})` }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 500 }}>{m.label}</span>
                <div style={{ width: '34px', height: '34px', borderRadius: '10px', background: m.bg, border: `1px solid ${m.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: m.color }}>
                  {m.icon}
                </div>
              </div>
              <div style={{ fontFamily: "'Sora', sans-serif", fontSize: '36px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.03em', lineHeight: 1, marginBottom: '12px' }}>
                {m.value}
              </div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '3px 10px', borderRadius: '100px', background: m.bg, color: m.color, border: `1px solid ${m.border}`, fontSize: '12px', fontWeight: 600, fontFamily: 'JetBrains Mono, monospace' }}>
                {m.sub}
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="animate-in s2" style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '20px' }}>

          {/* Pending Tasks */}
          <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
            <div style={{ padding: '22px 24px 18px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div className="section-label" style={{ marginBottom: '4px' }}>Active Queue</div>
                <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: '17px', fontWeight: 700, color: '#0f172a', margin: 0 }}>Pending Tasks</h2>
              </div>
              <Link href="/officer/complaints" style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', color: '#6366f1', textDecoration: 'none', fontWeight: 600 }}>
                View All <ArrowUpRight size={13} />
              </Link>
            </div>

            <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {pendingTasks.map((task) => {
                const pc = priorityConfig[task.priority as keyof typeof priorityConfig];
                return (
                  <div key={task.id} className="task-row">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1, minWidth: 0 }}>
                      {/* Priority icon */}
                      <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: pc.bg, border: `1px solid ${pc.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: pc.color, flexShrink: 0 }}>
                        <AlertTriangle size={16} />
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                          <span style={{ fontWeight: 700, color: '#0f172a', fontSize: '14px', fontFamily: "'Sora', sans-serif" }}>{task.title}</span>
                          <span className="badge" style={{ background: pc.bg, color: pc.color, border: `1px solid ${pc.border}`, flexShrink: 0 }}>
                            {task.priority}
                          </span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12px', color: '#94a3b8', fontFamily: 'JetBrains Mono, monospace' }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <MapPin size={11} /> {task.location}
                          </span>
                          <span style={{ color: '#e2e8f0' }}>·</span>
                          <span>{task.id}</span>
                          <span style={{ color: '#e2e8f0' }}>·</span>
                          <span>{task.time}</span>
                        </div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
                      <button className="btn-solid" style={{ fontSize: '12px', padding: '6px 12px' }}>Assign</button>
                      <button className="btn-secondary" style={{ fontSize: '12px', padding: '6px 12px' }}>Details</button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

            {/* Quick Actions */}
            <div className="card" style={{ padding: '22px 20px' }}>
              <div style={{ marginBottom: '16px' }}>
                <div className="section-label" style={{ marginBottom: '4px' }}>Shortcuts</div>
                <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: '16px', fontWeight: 700, color: '#0f172a', margin: 0 }}>Quick Actions</h2>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                {quickActions.map((action, i) => (
                  <Link key={i} href={action.href} className="quick-action-card">
                    <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: action.bg, border: `1px solid ${action.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: action.color }}>
                      {action.icon}
                    </div>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: '#374151' }}>{action.title}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Performance */}
            <div className="card" style={{ padding: '22px 20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                <div>
                  <div className="section-label" style={{ marginBottom: '4px' }}>This Month</div>
                  <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: '16px', fontWeight: 700, color: '#0f172a', margin: 0 }}>Performance</h2>
                </div>
                <Link href="/officer/analytics" style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#6366f1', textDecoration: 'none', fontWeight: 600 }}>
                  Details <ChevronRight size={12} />
                </Link>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {performance.map((p) => (
                  <div key={p.label}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '7px' }}>
                      <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 500 }}>{p.label}</span>
                      <span style={{ fontSize: '13px', fontFamily: 'JetBrains Mono, monospace', color: '#0f172a', fontWeight: 700 }}>{p.value}</span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${p.pct}%`, background: `linear-gradient(90deg, ${p.color}88, ${p.color})` }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Mini score */}
              <div style={{ marginTop: '18px', padding: '12px 14px', background: '#fafbff', border: '1px solid #f1f5f9', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 500 }}>Overall Score</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e' }} />
                  <span style={{ fontFamily: "'Sora', sans-serif", fontSize: '18px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>B+</span>
                </div>
              </div>
            </div>

            {/* Activity Feed */}
            <div className="card" style={{ padding: '22px 20px' }}>
              <div style={{ marginBottom: '16px' }}>
                <div className="section-label" style={{ marginBottom: '4px' }}>Live</div>
                <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: '16px', fontWeight: 700, color: '#0f172a', margin: 0 }}>Recent Activity</h2>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                {[
                  { text: 'CMP-119 marked resolved', time: '10 min ago', dot: '#22c55e' },
                  { text: 'New complaint in Rampur', time: '34 min ago', dot: '#f97316' },
                  { text: 'Priya Sharma filed CMP-122', time: '1h ago', dot: '#3b82f6' },
                  { text: 'Weekly report generated', time: '2h ago', dot: '#8b5cf6' },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', padding: '10px 0', borderBottom: i < 3 ? '1px solid #f8fafc' : 'none' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: item.dot, marginTop: '5px', flexShrink: 0 }} />
                    <div>
                      <p style={{ fontSize: '13px', color: '#374151', margin: 0, fontWeight: 500 }}>{item.text}</p>
                      <p style={{ fontSize: '11px', color: '#94a3b8', margin: '2px 0 0', fontFamily: 'JetBrains Mono, monospace' }}>{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* AI Insights Banner */}
        <div className="animate-in s3" style={{ marginTop: '20px', background: 'linear-gradient(135deg, #fafbff 0%, #f5f3ff 100%)', border: '1px solid #e0e7ff', borderRadius: '20px', padding: '22px 28px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #a78bfa)' }} />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#eef2ff', border: '1px solid #c7d2fe', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6366f1' }}>
                <Zap size={19} />
              </div>
              <div>
                <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: '15px', fontWeight: 700, color: '#0f172a', margin: 0 }}>Today's AI Brief</h3>
                <p style={{ fontSize: '13px', color: '#64748b', margin: '3px 0 0' }}>
                  Pothole complaints up 18% — consider routing a repair team to Highway Rd today.
                  Chandpur village overdue on 3 water supply tickets.
                </p>
              </div>
            </div>
            <Link href="/officer/analytics" className="btn-primary" style={{ background: '#6366f1', borderColor: '#6366f1' }}>
              View Insights <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}