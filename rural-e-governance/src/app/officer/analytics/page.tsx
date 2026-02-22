'use client';

import { useState, useEffect } from 'react';
import {
  Users, Clock, CheckCircle, AlertTriangle, Filter, Download,
  BarChart3, Zap, ArrowUpRight, Activity, Globe, Shield
} from 'lucide-react';

interface AnalyticsData {
  resolutionRate: number;
  avgResolutionTime: number;
  citizenSatisfaction: number;
  totalComplaints: number;
  complaintsByCategory: { category: string; count: number; color: string }[];
  complaintsByVillage: { village: string; complaints: number; resolved: number }[];
  monthlyTrend: { month: string; complaints: number; resolved: number }[];
  officerPerformance: { name: string; resolved: number; pending: number; avatar: string }[];
}

const analyticsData: AnalyticsData = {
  resolutionRate: 78,
  avgResolutionTime: 2.3,
  citizenSatisfaction: 4.2,
  totalComplaints: 156,
  complaintsByCategory: [
    { category: 'Potholes', count: 56, color: '#f97316' },
    { category: 'Water Supply', count: 34, color: '#0ea5e9' },
    { category: 'Sanitation', count: 28, color: '#10b981' },
    { category: 'Electricity', count: 22, color: '#8b5cf6' },
    { category: 'Street Lights', count: 16, color: '#ec4899' },
  ],
  complaintsByVillage: [
    { village: 'Rampur', complaints: 45, resolved: 35 },
    { village: 'Chandpur', complaints: 38, resolved: 28 },
    { village: 'Sitapur', complaints: 33, resolved: 26 },
    { village: 'Devgarh', complaints: 25, resolved: 18 },
    { village: 'Nayagaon', complaints: 15, resolved: 12 },
  ],
  monthlyTrend: [
    { month: 'Jan', complaints: 45, resolved: 35 },
    { month: 'Feb', complaints: 38, resolved: 28 },
    { month: 'Mar', complaints: 42, resolved: 33 },
    { month: 'Apr', complaints: 50, resolved: 39 },
    { month: 'May', complaints: 48, resolved: 38 },
    { month: 'Jun', complaints: 52, resolved: 41 },
  ],
  officerPerformance: [
    { name: 'Rajesh Kumar', resolved: 45, pending: 5, avatar: 'RK' },
    { name: 'Priya Sharma', resolved: 38, pending: 8, avatar: 'PS' },
    { name: 'Amit Verma', resolved: 32, pending: 12, avatar: 'AV' },
    { name: 'Sunita Patel', resolved: 28, pending: 7, avatar: 'SP' },
  ]
};

function AnimatedNumber({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    const end = value;
    const duration = 1200;
    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(parseFloat((end * eased).toFixed(1)));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [value]);
  return <>{display}{suffix}</>;
}

export default function OfficerAnalyticsPage() {
  const [timeRange, setTimeRange] = useState('month');
  const [view, setView] = useState('overview');
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const data = analyticsData;
  const totalResolved = data.complaintsByVillage.reduce((sum, v) => sum + v.resolved, 0);
  const pendingComplaints = data.totalComplaints - totalResolved;
  const maxTrend = Math.max(...data.monthlyTrend.map(m => m.complaints));
  const tabs = ['overview', 'village', 'officers', 'trends'];

  return (
    <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif", background: '#f8fafc', minHeight: '100vh', color: '#0f172a' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Sora:wght@600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; }

        .card {
          background: #ffffff;
          border: 1px solid #e8edf3;
          border-radius: 16px;
          transition: all 0.25s cubic-bezier(0.4,0,0.2,1);
          box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.03);
        }
        .card:hover {
          box-shadow: 0 10px 40px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04);
          transform: translateY(-2px);
          border-color: #dde3ec;
        }

        .metric-card {
          background: #ffffff;
          border: 1px solid #e8edf3;
          border-radius: 20px;
          padding: 28px;
          position: relative;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
          box-shadow: 0 1px 3px rgba(0,0,0,0.04);
        }
        .metric-card:hover {
          box-shadow: 0 20px 60px rgba(0,0,0,0.1);
          transform: translateY(-3px);
          border-color: #dde3ec;
        }

        .tab-btn {
          padding: 9px 20px;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 500;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: inherit;
          letter-spacing: 0.01em;
        }
        .tab-active { background: #fff; color: #0f172a; border: 1px solid #e2e8f0; box-shadow: 0 1px 4px rgba(0,0,0,0.08); }
        .tab-inactive { background: transparent; color: #94a3b8; border: 1px solid transparent; }
        .tab-inactive:hover { background: rgba(255,255,255,0.7); color: #64748b; }

        .progress-bar { height: 6px; border-radius: 100px; background: #f1f5f9; overflow: hidden; position: relative; }
        .progress-fill { height: 100%; border-radius: 100px; transition: width 1.2s cubic-bezier(0.4,0,0.2,1); }

        .bar-chart-bar { border-radius: 6px 6px 0 0; transition: opacity 0.2s; cursor: pointer; }
        .bar-chart-bar:hover { opacity: 0.75; }

        .badge {
          display: inline-flex; align-items: center; gap: 4px;
          padding: 4px 10px; border-radius: 100px; font-size: 12px;
          font-weight: 600; font-family: 'JetBrains Mono', monospace;
        }
        .badge-green { background: #f0fdf4; color: #16a34a; border: 1px solid #bbf7d0; }
        .badge-orange { background: #fff7ed; color: #ea580c; border: 1px solid #fed7aa; }
        .badge-blue { background: #eff6ff; color: #2563eb; border: 1px solid #bfdbfe; }

        .select-field {
          background: #fff; border: 1px solid #e2e8f0; border-radius: 10px;
          color: #374151; padding: 9px 36px 9px 14px; font-size: 14px;
          font-family: inherit; outline: none; cursor: pointer;
          appearance: none; -webkit-appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
          background-repeat: no-repeat; background-position: right 12px center;
          box-shadow: 0 1px 2px rgba(0,0,0,0.05);
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .select-field:hover { border-color: #cbd5e1; }
        .select-field:focus { border-color: #6366f1; box-shadow: 0 0 0 3px rgba(99,102,241,0.1); }

        .export-btn {
          background: #0f172a; border: 1px solid #0f172a; color: #fff;
          padding: 9px 18px; border-radius: 10px; font-size: 14px; font-weight: 600;
          cursor: pointer; display: flex; align-items: center; gap: 8px;
          font-family: inherit; transition: all 0.2s;
          box-shadow: 0 1px 3px rgba(15,23,42,0.2);
        }
        .export-btn:hover { background: #1e293b; box-shadow: 0 4px 12px rgba(15,23,42,0.25); }

        .insight-item {
          display: flex; align-items: flex-start; gap: 12px;
          padding: 13px 16px; border-radius: 12px;
          background: #fff; border: 1px solid #e8edf3; transition: all 0.2s;
          box-shadow: 0 1px 2px rgba(0,0,0,0.03);
        }
        .insight-item:hover { border-color: #dde3ec; box-shadow: 0 4px 12px rgba(0,0,0,0.06); }

        .officer-card {
          background: #fff; border: 1px solid #e8edf3; border-radius: 16px;
          padding: 24px; transition: all 0.3s ease;
          box-shadow: 0 1px 3px rgba(0,0,0,0.04);
        }
        .officer-card:hover { box-shadow: 0 12px 40px rgba(0,0,0,0.09); transform: translateY(-2px); border-color: #dde3ec; }

        .avatar {
          width: 44px; height: 44px; border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          font-size: 13px; font-weight: 700; letter-spacing: 0.5px;
          font-family: 'Sora', sans-serif;
        }

        .dot-indicator { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; margin-top: 6px; }

        .section-label {
          font-size: 11px; font-weight: 600; letter-spacing: 0.12em;
          text-transform: uppercase; color: #94a3b8;
          font-family: 'JetBrains Mono', monospace;
        }

        table { width: 100%; border-collapse: collapse; }
        th { font-size: 11px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: #94a3b8; text-align: left; padding: 12px 16px; font-family: 'JetBrains Mono', monospace; border-bottom: 1px solid #f1f5f9; }
        td { padding: 15px 16px; border-bottom: 1px solid #f8fafc; font-size: 14px; color: #475569; }
        tr:hover td { background: #fafbff; }
        tr:last-child td { border-bottom: none; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-in { animation: fadeUp 0.45s cubic-bezier(0.4,0,0.2,1) both; }
        .stagger-1 { animation-delay: 0.05s; }
        .stagger-2 { animation-delay: 0.1s; }
      `}</style>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 32px' }}>

        {/* Header */}
        <div className="animate-in" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '36px' }}>
          <div>
            <div className="section-label" style={{ marginBottom: '8px' }}>District Administration Portal</div>
            <h1 style={{ fontFamily: "'Sora', sans-serif", fontSize: '30px', fontWeight: 800, color: '#0f172a', margin: 0, letterSpacing: '-0.025em' }}>
              Analytics Overview
            </h1>
            <p style={{ color: '#94a3b8', fontSize: '14px', marginTop: '6px' }}>
              Real-time performance metrics · Last updated 2 min ago
            </p>
          </div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <select value={timeRange} onChange={(e) => setTimeRange(e.target.value)} className="select-field">
              <option value="week">Last 7 days</option>
              <option value="month">Last 30 days</option>
              <option value="quarter">Last 90 days</option>
              <option value="year">Last Year</option>
            </select>
            <button className="export-btn">
              <Download size={15} />
              Export
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="animate-in stagger-1" style={{ display: 'flex', gap: '4px', marginBottom: '28px', padding: '5px', background: '#f1f5f9', borderRadius: '14px', width: 'fit-content' }}>
          {tabs.map((tab) => (
            <button key={tab} onClick={() => setView(tab)} className={`tab-btn ${view === tab ? 'tab-active' : 'tab-inactive'}`}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Overview */}
        {view === 'overview' && (
          <div>
            {/* KPI Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '20px' }}>
              {[
                { label: 'Resolution Rate', value: data.resolutionRate, suffix: '%', sub: '+2.5% from last month', icon: <CheckCircle size={18} />, color: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0', stripColor: '#22c55e' },
                { label: 'Avg. Resolution', value: data.avgResolutionTime, suffix: ' days', sub: '−0.4 days improvement', icon: <Clock size={18} />, color: '#2563eb', bg: '#eff6ff', border: '#bfdbfe', stripColor: '#3b82f6' },
                { label: 'Satisfaction Score', value: data.citizenSatisfaction, suffix: '/5', sub: '+0.3 points this month', icon: <Users size={18} />, color: '#7c3aed', bg: '#f5f3ff', border: '#ddd6fe', stripColor: '#8b5cf6' },
                { label: 'Total Complaints', value: data.totalComplaints, suffix: '', sub: `${pendingComplaints} pending`, icon: <Activity size={18} />, color: '#ea580c', bg: '#fff7ed', border: '#fed7aa', stripColor: '#f97316' },
              ].map((m, i) => (
                <div key={m.label} className={`metric-card animate-in`} style={{ animationDelay: `${i * 0.07}s` }}>
                  {/* colored top strip */}
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg, ${m.stripColor}aa, ${m.stripColor})` }} />

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '18px' }}>
                    <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 500 }}>{m.label}</span>
                    <div style={{ width: '34px', height: '34px', borderRadius: '10px', background: m.bg, border: `1px solid ${m.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: m.color }}>
                      {m.icon}
                    </div>
                  </div>

                  <div style={{ fontFamily: "'Sora', sans-serif", fontSize: '34px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.03em', lineHeight: 1, marginBottom: '14px' }}>
                    {mounted ? <AnimatedNumber value={m.value} suffix={m.suffix} /> : `${m.value}${m.suffix}`}
                  </div>

                  <div className="badge badge-green" style={{ background: m.bg, color: m.color, border: `1px solid ${m.border}` }}>
                    <ArrowUpRight size={11} />
                    {m.sub}
                  </div>
                </div>
              ))}
            </div>

            {/* Middle Row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
              {/* Category */}
              <div className="card" style={{ padding: '28px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <div>
                    <div className="section-label" style={{ marginBottom: '4px' }}>Breakdown</div>
                    <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', margin: 0, fontFamily: "'Sora', sans-serif" }}>Complaints by Category</h3>
                  </div>
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#f8fafc', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
                    <Filter size={14} />
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {data.complaintsByCategory.map((item) => {
                    const pct = (item.count / data.totalComplaints) * 100;
                    return (
                      <div key={item.category}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '7px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
                            <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: item.color, flexShrink: 0 }} />
                            <span style={{ fontSize: '14px', color: '#374151', fontWeight: 500 }}>{item.category}</span>
                          </div>
                          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                            <span style={{ fontSize: '12px', color: '#94a3b8', fontFamily: 'JetBrains Mono, monospace' }}>{pct.toFixed(0)}%</span>
                            <span style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', fontFamily: 'JetBrains Mono, monospace', minWidth: '26px', textAlign: 'right' }}>{item.count}</span>
                          </div>
                        </div>
                        <div className="progress-bar">
                          <div className="progress-fill" style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${item.color}bb, ${item.color})` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Village */}
              <div className="card" style={{ padding: '28px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <div>
                    <div className="section-label" style={{ marginBottom: '4px' }}>Geographic</div>
                    <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', margin: 0, fontFamily: "'Sora', sans-serif" }}>Village Performance</h3>
                  </div>
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#f8fafc', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
                    <Globe size={14} />
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {data.complaintsByVillage.map((v) => {
                    const rate = (v.resolved / v.complaints) * 100;
                    const isHigh = rate >= 75;
                    return (
                      <div key={v.village} style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <div style={{ width: '72px', fontSize: '13px', fontWeight: 600, color: '#374151', flexShrink: 0 }}>{v.village}</div>
                        <div style={{ flex: 1 }}>
                          <div className="progress-bar">
                            <div className="progress-fill" style={{ width: `${rate}%`, background: isHigh ? 'linear-gradient(90deg, #4ade80, #16a34a)' : 'linear-gradient(90deg, #fda56b, #ea580c)' }} />
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexShrink: 0 }}>
                          <span style={{ fontSize: '13px', fontFamily: 'JetBrains Mono, monospace', color: isHigh ? '#16a34a' : '#ea580c', fontWeight: 700 }}>{rate.toFixed(0)}%</span>
                          <span style={{ fontSize: '12px', color: '#cbd5e1', fontFamily: 'JetBrains Mono, monospace' }}>{v.resolved}/{v.complaints}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Monthly Trend */}
            <div className="card" style={{ padding: '28px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
                <div>
                  <div className="section-label" style={{ marginBottom: '4px' }}>Over Time</div>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', margin: 0, fontFamily: "'Sora', sans-serif" }}>Monthly Trend</h3>
                </div>
                <div style={{ display: 'flex', gap: '16px', fontSize: '13px' }}>
                  {[{ label: 'Total', color: '#93c5fd' }, { label: 'Resolved', color: '#4ade80' }].map(l => (
                    <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748b' }}>
                      <div style={{ width: '10px', height: '10px', borderRadius: '3px', background: l.color }} />
                      {l.label}
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '16px', height: '180px' }}>
                {data.monthlyTrend.map((m) => {
                  const totalH = (m.complaints / maxTrend) * 155;
                  const resolvedH = (m.resolved / maxTrend) * 155;
                  return (
                    <div key={m.month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', height: '100%', justifyContent: 'flex-end' }}>
                      <div style={{ display: 'flex', gap: '4px', alignItems: 'flex-end', height: '155px' }}>
                        <div className="bar-chart-bar" style={{ width: '22px', height: `${totalH}px`, background: 'linear-gradient(180deg, #bfdbfe, #93c5fd)' }} title={`${m.complaints} complaints`} />
                        <div className="bar-chart-bar" style={{ width: '22px', height: `${resolvedH}px`, background: 'linear-gradient(180deg, #86efac, #4ade80)' }} title={`${m.resolved} resolved`} />
                      </div>
                      <span style={{ fontSize: '12px', color: '#94a3b8', fontFamily: 'JetBrains Mono, monospace', fontWeight: 500 }}>{m.month}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Village Tab */}
        {view === 'village' && (
          <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
            <div style={{ padding: '28px 28px 20px', borderBottom: '1px solid #f1f5f9', background: '#fafbff' }}>
              <div className="section-label" style={{ marginBottom: '4px' }}>Geographic Analysis</div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', margin: 0, fontFamily: "'Sora', sans-serif" }}>Village-wise Detailed Report</h3>
            </div>
            <div>
              <table>
                <thead>
                  <tr>
                    <th>Village</th><th>Total</th><th>Resolved</th><th>Pending</th>
                    <th>Resolution Rate</th><th>Avg. Time</th><th>Satisfaction</th>
                  </tr>
                </thead>
                <tbody>
                  {data.complaintsByVillage.map((v) => {
                    const rate = (v.resolved / v.complaints) * 100;
                    const pending = v.complaints - v.resolved;
                    return (
                      <tr key={v.village}>
                        <td style={{ color: '#0f172a', fontWeight: 600 }}>{v.village}</td>
                        <td style={{ fontFamily: 'JetBrains Mono, monospace', color: '#374151' }}>{v.complaints}</td>
                        <td style={{ fontFamily: 'JetBrains Mono, monospace', color: '#16a34a', fontWeight: 700 }}>{v.resolved}</td>
                        <td style={{ fontFamily: 'JetBrains Mono, monospace', color: '#dc2626', fontWeight: 700 }}>{pending}</td>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div className="progress-bar" style={{ width: '80px' }}>
                              <div className="progress-fill" style={{ width: `${rate}%`, background: rate >= 75 ? '#22c55e' : '#f97316' }} />
                            </div>
                            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '13px', color: rate >= 75 ? '#16a34a' : '#ea580c', fontWeight: 700 }}>{rate.toFixed(1)}%</span>
                          </div>
                        </td>
                        <td style={{ fontFamily: 'JetBrains Mono, monospace', color: '#374151' }}>2.1d</td>
                        <td><span className="badge badge-green">4.3/5</span></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Officers Tab */}
        {view === 'officers' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
            {data.officerPerformance.map((officer, i) => {
              const total = officer.resolved + officer.pending;
              const eff = (officer.resolved / total) * 100;
              const colors = [
                { bg: '#eff6ff', text: '#2563eb', border: '#bfdbfe', bar: '#3b82f6' },
                { bg: '#f0fdf4', text: '#16a34a', border: '#bbf7d0', bar: '#22c55e' },
                { bg: '#f5f3ff', text: '#7c3aed', border: '#ddd6fe', bar: '#8b5cf6' },
                { bg: '#fff7ed', text: '#ea580c', border: '#fed7aa', bar: '#f97316' },
              ][i % 4];
              return (
                <div key={officer.name} className="officer-card animate-in" style={{ animationDelay: `${i * 0.07}s` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <div className="avatar" style={{ background: colors.bg, color: colors.text, border: `1px solid ${colors.border}` }}>
                        {officer.avatar}
                      </div>
                      <div>
                        <p style={{ fontWeight: 700, color: '#0f172a', margin: 0, fontSize: '15px', fontFamily: "'Sora', sans-serif" }}>{officer.name}</p>
                        <p style={{ fontSize: '12px', color: '#94a3b8', margin: '2px 0 0', fontFamily: 'JetBrains Mono, monospace' }}>Field Officer · Active</p>
                      </div>
                    </div>
                    <div className="badge" style={{ background: colors.bg, color: colors.text, border: `1px solid ${colors.border}` }}>
                      {eff.toFixed(0)}% eff.
                    </div>
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '7px' }}>
                      <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 500 }}>Efficiency Score</span>
                      <span style={{ fontSize: '12px', fontFamily: 'JetBrains Mono, monospace', color: colors.text, fontWeight: 700 }}>{eff.toFixed(1)}%</span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${eff}%`, background: `linear-gradient(90deg, ${colors.bar}88, ${colors.bar})` }} />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                    {[
                      { label: 'Resolved', value: officer.resolved, color: '#16a34a' },
                      { label: 'Pending', value: officer.pending, color: '#ea580c' },
                      { label: 'Total', value: total, color: '#374151' },
                    ].map(stat => (
                      <div key={stat.label} style={{ textAlign: 'center', padding: '10px 8px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #f1f5f9' }}>
                        <p style={{ fontSize: '22px', fontWeight: 800, color: stat.color, margin: 0, fontFamily: "'Sora', sans-serif", letterSpacing: '-0.02em' }}>{stat.value}</p>
                        <p style={{ fontSize: '11px', color: '#94a3b8', margin: '2px 0 0', fontFamily: 'JetBrains Mono, monospace' }}>{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Trends Tab */}
        {view === 'trends' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {data.complaintsByCategory.map((cat) => {
              const monthlyData = data.monthlyTrend.map((m) => ({
                ...m,
                catCount: Math.round((cat.count / data.totalComplaints) * m.complaints * (0.85 + Math.random() * 0.3))
              }));
              const maxVal = Math.max(...monthlyData.map(m => m.catCount));
              return (
                <div key={cat.category} className="card" style={{ padding: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '10px', height: '10px', borderRadius: '3px', background: cat.color }} />
                      <span style={{ fontWeight: 700, color: '#0f172a', fontFamily: "'Sora', sans-serif" }}>{cat.category}</span>
                    </div>
                    <span className="badge" style={{ background: `${cat.color}12`, color: cat.color, border: `1px solid ${cat.color}30` }}>{cat.count} total</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '80px' }}>
                    {monthlyData.map((m) => (
                      <div key={m.month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                        <div style={{ width: '100%', background: `linear-gradient(180deg, ${cat.color}, ${cat.color}55)`, borderRadius: '4px 4px 0 0', height: `${(m.catCount / maxVal) * 62}px`, minHeight: '4px' }} />
                        <span style={{ fontSize: '10px', color: '#94a3b8', fontFamily: 'JetBrains Mono, monospace' }}>{m.month}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* AI Insights */}
        <div style={{ marginTop: '20px', background: 'linear-gradient(135deg, #fafbff 0%, #f5f3ff 100%)', border: '1px solid #e0e7ff', borderRadius: '20px', padding: '28px', position: 'relative', overflow: 'hidden' }}>
          {/* Subtle top accent */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #a78bfa)' }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#eef2ff', border: '1px solid #c7d2fe', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6366f1' }}>
              <Zap size={18} />
            </div>
            <div>
              <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: '16px', fontWeight: 700, color: '#0f172a', margin: 0 }}>AI-Powered Insights</h3>
              <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0, fontFamily: 'JetBrains Mono, monospace' }}>Updated · Gemini 2.0 Flash</p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            {[
              { title: 'Recommendations', items: [
                { text: 'Increase field staff in Rampur during monsoon season', dot: '#0ea5e9' },
                { text: 'Pothole repairs should be prioritized in Q3 budget allocation', dot: '#10b981' },
                { text: 'Water supply complaints peak at 10 AM — reschedule response teams', dot: '#8b5cf6' },
              ]},
              { title: 'Predictive Forecast', items: [
                { text: 'Expected 15% complaint increase next month based on seasonal trends', dot: '#f97316' },
                { text: 'Chandpur village may need additional sanitation resources', dot: '#ef4444' },
                { text: 'Resolution rate projected to reach 83% if current pace continues', dot: '#16a34a' },
              ]},
            ].map(section => (
              <div key={section.title}>
                <div className="section-label" style={{ marginBottom: '12px' }}>{section.title}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {section.items.map((item, i) => (
                    <div key={i} className="insight-item">
                      <div className="dot-indicator" style={{ background: item.dot }} />
                      <span style={{ fontSize: '14px', color: '#475569', lineHeight: 1.55 }}>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}