'use client';

import { useState } from 'react';
import {
  Search, Filter, User, Phone, MapPin, Mail, CheckCircle, XCircle,
  ChevronRight, Download, Users, TrendingUp, Clock, Award, MoreVertical,
  Eye, MessageSquare, Calendar, Home, Activity, ArrowUpRight, Star,
  AlertCircle, Plus, Zap
} from 'lucide-react';
import Link from 'next/link';

interface Citizen {
  id: string;
  name: string;
  phone: string;
  email: string;
  village: string;
  ward: string;
  complaints: number;
  resolved: number;
  pending: number;
  joined: string;
  lastActive: string;
  status: 'active' | 'inactive' | 'new';
  satisfaction: number;
  documents: number;
  initials: string;
  avatarColor: { bg: string; text: string; border: string };
}

const avatarColors = [
  { bg: '#eff6ff', text: '#2563eb', border: '#bfdbfe' },
  { bg: '#f0fdf4', text: '#16a34a', border: '#bbf7d0' },
  { bg: '#f5f3ff', text: '#7c3aed', border: '#ddd6fe' },
  { bg: '#fff7ed', text: '#ea580c', border: '#fed7aa' },
  { bg: '#fdf2f8', text: '#be185d', border: '#fbcfe8' },
];

const citizens: Citizen[] = [
  { id: '1', name: 'Rajesh Kumar', phone: '+91 98765 43210', email: 'rajesh.kumar@example.com', village: 'Sunderpur', ward: 'Ward 5', complaints: 12, resolved: 10, pending: 2, joined: '2023-01-15', lastActive: '2024-01-20', status: 'active', satisfaction: 4.5, documents: 6, initials: 'RK', avatarColor: avatarColors[0] },
  { id: '2', name: 'Priya Sharma', phone: '+91 87654 32109', email: 'priya.sharma@example.com', village: 'Ganga Nagar', ward: 'Ward 3', complaints: 8, resolved: 8, pending: 0, joined: '2023-03-22', lastActive: '2024-01-19', status: 'active', satisfaction: 5.0, documents: 4, initials: 'PS', avatarColor: avatarColors[1] },
  { id: '3', name: 'Amit Singh', phone: '+91 76543 21098', email: 'amit.singh@example.com', village: 'Rajpur', ward: 'Ward 2', complaints: 15, resolved: 12, pending: 3, joined: '2022-11-10', lastActive: '2024-01-18', status: 'active', satisfaction: 4.2, documents: 8, initials: 'AS', avatarColor: avatarColors[2] },
  { id: '4', name: 'Sunita Devi', phone: '+91 65432 10987', email: 'sunita.devi@example.com', village: 'Sunderpur', ward: 'Ward 5', complaints: 5, resolved: 3, pending: 2, joined: '2023-08-05', lastActive: '2024-01-15', status: 'active', satisfaction: 3.8, documents: 3, initials: 'SD', avatarColor: avatarColors[3] },
  { id: '5', name: 'Vikram Patel', phone: '+91 54321 09876', email: 'vikram.patel@example.com', village: 'Ganga Nagar', ward: 'Ward 3', complaints: 20, resolved: 18, pending: 2, joined: '2022-09-18', lastActive: '2024-01-20', status: 'active', satisfaction: 4.7, documents: 9, initials: 'VP', avatarColor: avatarColors[4] },
];

const quickFilters = ['All Citizens', 'Active Today', 'New This Week', 'High Priority'];

export default function CitizensPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all citizens');
  const [selectedVillage, setSelectedVillage] = useState('all');

  const filtered = citizens.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.village.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

        .badge { display: inline-flex; align-items: center; gap: 4px; padding: 3px 10px; border-radius: 100px; font-size: 11px; font-weight: 700; font-family: 'JetBrains Mono', monospace; letter-spacing: 0.04em; }
        .badge-green { background: #f0fdf4; color: #16a34a; border: 1px solid #bbf7d0; }
        .badge-orange { background: #fff7ed; color: #ea580c; border: 1px solid #fed7aa; }
        .badge-gray { background: #f8fafc; color: #64748b; border: 1px solid #e2e8f0; }
        .badge-amber { background: #fffbeb; color: #d97706; border: 1px solid #fde68a; }

        .select-field { background: #fff; border: 1px solid #e2e8f0; border-radius: 10px; color: #374151; padding: 9px 36px 9px 14px; font-size: 14px; font-family: inherit; outline: none; cursor: pointer; appearance: none; -webkit-appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 12px center; box-shadow: 0 1px 2px rgba(0,0,0,0.05); transition: border-color 0.2s; }
        .select-field:hover { border-color: #cbd5e1; }
        .select-field:focus { border-color: #6366f1; box-shadow: 0 0 0 3px rgba(99,102,241,0.1); }

        .btn-primary { background: #0f172a; border: 1px solid #0f172a; color: #fff; padding: 9px 18px; border-radius: 10px; font-size: 14px; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 8px; font-family: inherit; transition: all 0.2s; box-shadow: 0 1px 3px rgba(15,23,42,0.2); white-space: nowrap; }
        .btn-primary:hover { background: #1e293b; box-shadow: 0 4px 12px rgba(15,23,42,0.25); }

        .btn-secondary { background: #fff; border: 1px solid #e2e8f0; color: #374151; padding: 9px 16px; border-radius: 10px; font-size: 14px; font-weight: 500; cursor: pointer; display: flex; align-items: center; gap: 8px; font-family: inherit; transition: all 0.2s; box-shadow: 0 1px 2px rgba(0,0,0,0.05); white-space: nowrap; }
        .btn-secondary:hover { background: #f8fafc; border-color: #cbd5e1; }

        .search-input { width: 100%; padding: 10px 14px 10px 42px; border: 1px solid #e2e8f0; border-radius: 10px; font-size: 14px; font-family: inherit; background: #fff; color: #0f172a; outline: none; transition: all 0.2s; box-shadow: 0 1px 2px rgba(0,0,0,0.04); }
        .search-input::placeholder { color: #94a3b8; }
        .search-input:focus { border-color: #6366f1; box-shadow: 0 0 0 3px rgba(99,102,241,0.08); }

        .quick-filter { padding: 7px 16px; border-radius: 8px; font-size: 13px; font-weight: 500; cursor: pointer; border: none; font-family: inherit; transition: all 0.2s; }
        .quick-filter-active { background: #0f172a; color: #fff; box-shadow: 0 2px 8px rgba(15,23,42,0.2); }
        .quick-filter-inactive { background: #f1f5f9; color: #64748b; }
        .quick-filter-inactive:hover { background: #e2e8f0; color: #374151; }

        .action-btn { width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center; cursor: pointer; border: 1px solid transparent; background: transparent; transition: all 0.15s; color: #94a3b8; }
        .action-btn:hover { background: #f1f5f9; border-color: #e2e8f0; color: #374151; }

        .progress-bar { height: 5px; border-radius: 100px; background: #f1f5f9; overflow: hidden; }
        .progress-fill { height: 100%; border-radius: 100px; }

        table { width: 100%; border-collapse: collapse; }
        th { font-size: 11px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: #94a3b8; text-align: left; padding: 14px 20px; font-family: 'JetBrains Mono', monospace; border-bottom: 1px solid #f1f5f9; background: #fafbff; }
        td { padding: 16px 20px; border-bottom: 1px solid #f8fafc; font-size: 14px; color: #475569; vertical-align: middle; }
        tr:hover td { background: #fafbff; }
        tr:last-child td { border-bottom: none; }

        .village-card { border-radius: 14px; padding: 18px 20px; border: 1px solid; transition: all 0.25s; }
        .village-card:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.08); }

        @keyframes fadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        .animate-in { animation: fadeUp 0.45s cubic-bezier(0.4,0,0.2,1) both; }
        .s1 { animation-delay: 0.05s; } .s2 { animation-delay: 0.1s; } .s3 { animation-delay: 0.15s; }

        .page-btn { padding: 7px 14px; border-radius: 8px; font-size: 13px; font-weight: 500; cursor: pointer; font-family: 'JetBrains Mono', monospace; transition: all 0.15s; border: 1px solid #e2e8f0; background: #fff; color: #374151; }
        .page-btn:hover { background: #f8fafc; border-color: #cbd5e1; }
        .page-btn-active { background: #0f172a; color: #fff; border-color: #0f172a; }
        .page-btn-active:hover { background: #1e293b; }
        .page-btn-disabled { opacity: 0.4; pointer-events: none; }
      `}</style>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 32px' }}>

        {/* Header */}
        <div className="animate-in" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '36px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
              <Link href="/officer/dashboard" style={{ fontSize: '13px', color: '#94a3b8', textDecoration: 'none', fontFamily: 'JetBrains Mono, monospace' }}>Dashboard</Link>
              <ChevronRight size={13} color="#cbd5e1" />
              <span style={{ fontSize: '13px', color: '#64748b', fontFamily: 'JetBrains Mono, monospace' }}>Citizens</span>
            </div>
            <h1 style={{ fontFamily: "'Sora', sans-serif", fontSize: '30px', fontWeight: 800, color: '#0f172a', margin: 0, letterSpacing: '-0.025em' }}>
              Citizen Directory
            </h1>
            <p style={{ color: '#94a3b8', fontSize: '14px', marginTop: '6px' }}>
              Manage and engage with registered citizens in your jurisdiction
            </p>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button className="btn-secondary">
              <Download size={15} /> Export List
            </button>
            <button className="btn-primary">
              <Plus size={15} /> Add Citizen
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="animate-in s1" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
          {[
            { label: 'Total Citizens', value: '2,847', sub: '+124 this month', icon: <Users size={18} />, color: '#2563eb', bg: '#eff6ff', border: '#bfdbfe', strip: '#3b82f6' },
            { label: 'Active Citizens', value: '1,234', sub: '43% of total', icon: <Activity size={18} />, color: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0', strip: '#22c55e' },
            { label: 'Avg. Resolution', value: '2.4 days', sub: '−0.3 days faster', icon: <Clock size={18} />, color: '#d97706', bg: '#fffbeb', border: '#fde68a', strip: '#f59e0b' },
            { label: 'Satisfaction Rate', value: '4.2/5', sub: '+0.2 this month', icon: <Star size={18} />, color: '#7c3aed', bg: '#f5f3ff', border: '#ddd6fe', strip: '#8b5cf6' },
          ].map((m, i) => (
            <div key={m.label} className="metric-card" style={{ animationDelay: `${i * 0.06}s` }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg, ${m.strip}88, ${m.strip})` }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 500 }}>{m.label}</span>
                <div style={{ width: '34px', height: '34px', borderRadius: '10px', background: m.bg, border: `1px solid ${m.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: m.color }}>
                  {m.icon}
                </div>
              </div>
              <div style={{ fontFamily: "'Sora', sans-serif", fontSize: '32px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.03em', lineHeight: 1, marginBottom: '12px' }}>
                {m.value}
              </div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '3px 10px', borderRadius: '100px', background: m.bg, color: m.color, border: `1px solid ${m.border}`, fontSize: '12px', fontWeight: 600, fontFamily: 'JetBrains Mono, monospace' }}>
                <ArrowUpRight size={11} />{m.sub}
              </div>
            </div>
          ))}
        </div>

        {/* Village Distribution */}
        <div className="card animate-in s1" style={{ padding: '24px 28px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
              <div className="section-label" style={{ marginBottom: '4px' }}>Geographic</div>
              <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: '16px', fontWeight: 700, color: '#0f172a', margin: 0 }}>Village Distribution</h2>
            </div>
            <Link href="/officer/analytics" style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', color: '#6366f1', textDecoration: 'none', fontWeight: 500 }}>
              View Analytics <ArrowUpRight size={13} />
            </Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
            {[
              { name: 'Sunderpur', count: 847, pct: 42, color: '#2563eb', bg: '#eff6ff', border: '#bfdbfe', track: '#bfdbfe' },
              { name: 'Ganga Nagar', count: 623, pct: 31, color: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0', track: '#bbf7d0' },
              { name: 'Rajpur', count: 537, pct: 27, color: '#7c3aed', bg: '#f5f3ff', border: '#ddd6fe', track: '#ddd6fe' },
            ].map(v => (
              <div key={v.name} className="village-card" style={{ background: v.bg, borderColor: v.border }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a' }}>{v.name}</span>
                  <span style={{ fontFamily: "'Sora', sans-serif", fontSize: '26px', fontWeight: 800, color: v.color, letterSpacing: '-0.03em', lineHeight: 1 }}>{v.count}</span>
                </div>
                <div className="progress-bar" style={{ background: v.track, marginBottom: '8px' }}>
                  <div className="progress-fill" style={{ width: `${v.pct}%`, background: v.color }} />
                </div>
                <span style={{ fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono, monospace' }}>{v.pct}% of total</span>
              </div>
            ))}
          </div>
        </div>

        {/* Search & Filters */}
        <div className="card animate-in s2" style={{ padding: '20px 24px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '14px' }}>
            <div style={{ flex: 1, position: 'relative', minWidth: '240px' }}>
              <Search size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input
                className="search-input"
                type="text"
                placeholder="Search by name, email, or village..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <select value={selectedVillage} onChange={(e) => setSelectedVillage(e.target.value)} className="select-field">
              <option value="all">All Villages</option>
              <option value="sunderpur">Sunderpur</option>
              <option value="ganga nagar">Ganga Nagar</option>
              <option value="rajpur">Rajpur</option>
            </select>
            <button className="btn-secondary" style={{ padding: '9px 14px' }}>
              <Filter size={15} /> Filter
            </button>
          </div>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {quickFilters.map(f => (
              <button
                key={f}
                onClick={() => setSelectedFilter(f.toLowerCase())}
                className={`quick-filter ${selectedFilter === f.toLowerCase() ? 'quick-filter-active' : 'quick-filter-inactive'}`}
              >
                {f}
              </button>
            ))}
            <span style={{ marginLeft: 'auto', fontSize: '13px', color: '#94a3b8', alignSelf: 'center', fontFamily: 'JetBrains Mono, monospace' }}>
              {filtered.length} of 2,847 citizens
            </span>
          </div>
        </div>

        {/* Citizens Table */}
        <div className="animate-in s2" style={{ background: '#fff', border: '1px solid #e8edf3', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.04)', marginBottom: '20px' }}>
          <div style={{ overflowX: 'auto' }}>
            <table>
              <thead>
                <tr>
                  <th>Citizen</th>
                  <th>Contact</th>
                  <th>Location</th>
                  <th>Complaints</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((citizen) => {
                  const resRate = (citizen.resolved / citizen.complaints) * 100;
                  const isHighSat = citizen.satisfaction >= 4.5;
                  return (
                    <tr key={citizen.id}>
                      {/* Citizen */}
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                          <div style={{ position: 'relative', flexShrink: 0 }}>
                            <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: citizen.avatarColor.bg, border: `1px solid ${citizen.avatarColor.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Sora', sans-serif", fontSize: '13px', fontWeight: 700, color: citizen.avatarColor.text }}>
                              {citizen.initials}
                            </div>
                            {citizen.status === 'active' && (
                              <div style={{ position: 'absolute', bottom: '-1px', right: '-1px', width: '11px', height: '11px', background: '#22c55e', border: '2px solid #fff', borderRadius: '50%' }} />
                            )}
                          </div>
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
                              <span style={{ fontWeight: 700, color: '#0f172a', fontFamily: "'Sora', sans-serif", fontSize: '14px' }}>{citizen.name}</span>
                              {isHighSat && (
                                <span className="badge badge-amber" style={{ fontSize: '10px' }}>⭐ Top Rated</span>
                              )}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#94a3b8', fontFamily: 'JetBrains Mono, monospace' }}>
                              <span>Joined {new Date(citizen.joined).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                              <span style={{ color: '#e2e8f0' }}>·</span>
                              <span>Active {new Date(citizen.lastActive).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Contact */}
                      <td>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{ width: '24px', height: '24px', borderRadius: '6px', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <Phone size={12} color="#2563eb" />
                            </div>
                            <span style={{ fontSize: '13px', fontFamily: 'JetBrains Mono, monospace', color: '#374151', fontWeight: 500 }}>{citizen.phone}</span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{ width: '24px', height: '24px', borderRadius: '6px', background: '#f5f3ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <Mail size={12} color="#7c3aed" />
                            </div>
                            <span style={{ fontSize: '12px', color: '#64748b' }}>{citizen.email}</span>
                          </div>
                        </div>
                      </td>

                      {/* Location */}
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: '#f0fdf4', border: '1px solid #bbf7d0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Home size={13} color="#16a34a" />
                          </div>
                          <div>
                            <div style={{ fontWeight: 600, color: '#0f172a', fontSize: '14px' }}>{citizen.village}</div>
                            <div style={{ fontSize: '12px', color: '#94a3b8', fontFamily: 'JetBrains Mono, monospace' }}>{citizen.ward}</div>
                          </div>
                        </div>
                      </td>

                      {/* Complaints */}
                      <td>
                        <div style={{ minWidth: '140px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                            <span style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a' }}>{citizen.resolved} resolved</span>
                            <span style={{ fontSize: '12px', color: '#94a3b8', fontFamily: 'JetBrains Mono, monospace' }}>{citizen.complaints} total</span>
                          </div>
                          <div className="progress-bar" style={{ marginBottom: '6px' }}>
                            <div className="progress-fill" style={{ width: `${resRate}%`, background: resRate === 100 ? '#22c55e' : resRate >= 70 ? '#3b82f6' : '#f97316' }} />
                          </div>
                          {citizen.pending > 0 && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#ea580c' }}>
                              <AlertCircle size={11} />
                              {citizen.pending} pending
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Status */}
                      <td>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          <span className={`badge ${citizen.status === 'active' ? 'badge-green' : 'badge-gray'}`}>
                            {citizen.status === 'active' ? <CheckCircle size={10} /> : <XCircle size={10} />}
                            {citizen.status.charAt(0).toUpperCase() + citizen.status.slice(1)}
                          </span>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: '#64748b', fontFamily: 'JetBrains Mono, monospace' }}>
                            <Award size={11} color="#d97706" />
                            {citizen.satisfaction}/5
                          </div>
                        </div>
                      </td>

                      {/* Actions */}
                      <td>
                        <div style={{ display: 'flex', gap: '4px' }}>
                          <button className="action-btn" title="View Profile">
                            <Eye size={15} />
                          </button>
                          <button className="action-btn" title="Message" style={{ color: '#94a3b8' }}>
                            <MessageSquare size={15} />
                          </button>
                          <button className="action-btn" title="More">
                            <MoreVertical size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div style={{ padding: '16px 20px', borderTop: '1px solid #f1f5f9', background: '#fafbff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{ fontSize: '13px', color: '#64748b', fontFamily: 'JetBrains Mono, monospace' }}>
              Showing <strong style={{ color: '#0f172a' }}>1–5</strong> of <strong style={{ color: '#0f172a' }}>2,847</strong> citizens
            </p>
            <div style={{ display: 'flex', gap: '4px' }}>
              <button className="page-btn page-btn-disabled">← Prev</button>
              <button className="page-btn page-btn-active">1</button>
              <button className="page-btn">2</button>
              <button className="page-btn">3</button>
              <span style={{ padding: '7px 6px', color: '#94a3b8', fontSize: '13px' }}>…</span>
              <button className="page-btn">142</button>
              <button className="page-btn">Next →</button>
            </div>
          </div>
        </div>

        {/* Engagement Banner */}
        <div style={{ background: 'linear-gradient(135deg, #fafbff 0%, #f5f3ff 100%)', border: '1px solid #e0e7ff', borderRadius: '20px', padding: '24px 28px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #a78bfa)' }} />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#eef2ff', border: '1px solid #c7d2fe', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6366f1' }}>
                <Zap size={19} />
              </div>
              <div>
                <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: '15px', fontWeight: 700, color: '#0f172a', margin: 0 }}>Citizen Engagement</h3>
                <p style={{ fontSize: '13px', color: '#64748b', margin: '3px 0 0' }}>
                  Send broadcast messages, announcements or updates to citizens in your jurisdiction
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button className="btn-secondary" style={{ borderColor: '#c7d2fe', color: '#6366f1' }}>Schedule Update</button>
              <button className="btn-primary" style={{ background: '#6366f1', borderColor: '#6366f1' }}>
                <MessageSquare size={15} /> Create Broadcast
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}