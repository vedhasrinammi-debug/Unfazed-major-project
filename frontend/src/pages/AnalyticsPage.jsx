import React, { useState, useEffect } from 'react';
import {
  BarChart3,
  TrendingUp,
  Users,
  Calendar,
  DollarSign,
  PieChart as PieIcon,
  Video,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { api } from '../services/api';
import { useToast } from '../context/ToastContext';

export const AnalyticsPage = () => {
  const { addToast } = useToast();
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getAnalyticsCharts().then((res) => {
      if (res.success) setChartData(res.charts);
    }).catch((err) => {
      addToast(err.message || 'Error loading clinical analytics', 'error');
    }).finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="p-12 text-center text-slate-400">
        <div className="w-8 h-8 border-3 border-brand-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
        <p className="text-xs font-semibold">Generating practice analytics & charts...</p>
      </div>
    );
  }

  const {
    revenueTrend = [],
    attendanceBreakdown = [],
    diagnosticDistribution = [],
    modalityDistribution = [],
    clientGrowth = []
  } = chartData || {};

  const COLORS = ['#7C3AED', '#A78BFA', '#FBBF24', '#F87171'];

  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Clinical & Financial Insights</h2>
          <p className="text-xs sm:text-sm text-slate-500">Track practice retention, diagnosis distribution, and revenue momentum</p>
        </div>

        <div className="flex items-center space-x-2 text-xs font-bold text-slate-500 bg-white px-3.5 py-1.5 rounded-xl border border-slate-200">
          <Calendar className="w-4 h-4 text-brand-600" />
          <span>Last 6 Months (Jun – Nov)</span>
        </div>
      </div>

      {/* Grid 1: Monthly Revenue Trajectory & Session Attendance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Trend Area Chart (Span 2) */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-100 shadow-soft space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Practice Monthly Revenue</h3>
              <p className="text-xs text-slate-400">Gross billings in USD over the past 6 months</p>
            </div>
            <div className="text-right">
              <span className="text-xl font-black text-brand-700">$6,150.00</span>
              <span className="block text-[10px] text-emerald-600 font-bold">+14% vs Oct</span>
            </div>
          </div>

          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueTrend} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#7C3AED" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} tickFormatter={(v) => `$${v}`} />
                <Tooltip
                  formatter={(val) => [`$${val}`, 'Monthly Revenue']}
                  contentStyle={{ backgroundColor: '#1E293B', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#7C3AED" strokeWidth={3} fillOpacity={1} fill="url(#revenueGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Session Attendance Donut (Span 1) */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-soft space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Session Attendance Rates</h3>
            <p className="text-xs text-slate-400">Adherence, completed vs cancellation</p>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={attendanceBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {attendanceBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(v) => [`${v}%`, 'Rate']}
                  contentStyle={{ backgroundColor: '#1E293B', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px] pt-2 border-t border-slate-100">
            {attendanceBreakdown.map((item, i) => (
              <div key={i} className="flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: COLORS[i] }} />
                <span className="text-slate-600 truncate">{item.name} ({item.value}%)</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Grid 2: Clinical Diagnostic Breakdown & Caseload Growth */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Diagnostic Distribution Bar Chart */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-soft space-y-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Client Diagnostic Caseload</h3>
            <p className="text-xs text-slate-400">Distribution of primary presenting clinical conditions</p>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={diagnosticDistribution} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F1F5F9" />
                <XAxis type="number" stroke="#94A3B8" fontSize={11} />
                <YAxis dataKey="name" type="category" stroke="#64748B" fontSize={10} tickLine={false} width={130} />
                <Tooltip
                  formatter={(val) => [`${val} Clients`, 'Caseload Count']}
                  contentStyle={{ backgroundColor: '#1E293B', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '12px' }}
                />
                <Bar dataKey="count" fill="#8B5CF6" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Caseload Growth Trajectory */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-soft space-y-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Client Caseload Growth</h3>
            <p className="text-xs text-slate-400">Total active clients under continuous clinical care</p>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={clientGrowth} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} />
                <YAxis stroke="#94A3B8" fontSize={11} domain={[10, 35]} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1E293B', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '12px' }}
                />
                <Line type="monotone" dataKey="active" stroke="#7C3AED" strokeWidth={3} dot={{ r: 4, fill: '#7C3AED' }} name="Active Caseload" />
                <Line type="monotone" dataKey="newClients" stroke="#10B981" strokeWidth={2} strokeDasharray="4 4" name="New Intakes" />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Modality breakdown cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {modalityDistribution.map((m, idx) => (
          <div key={idx} className="p-4 rounded-2xl bg-white border border-slate-100 shadow-soft flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-xl bg-purple-50 text-brand-700">
                <Video className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">{m.modality}</h4>
                <span className="text-[11px] text-slate-400">{m.sessions} Sessions</span>
              </div>
            </div>
            <span className="text-sm font-extrabold text-brand-700">{m.percentage}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
