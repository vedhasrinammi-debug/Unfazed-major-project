import React, { useState, useEffect } from 'react';
import {
  Users,
  Calendar,
  CreditCard,
  Clock,
  Video,
  FileText,
  Plus,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  MessageSquare
} from 'lucide-react';
import { StatsCard } from '../components/common/StatsCard';
import { api } from '../services/api';
import { useToast } from '../context/ToastContext';

export const DashboardPage = ({
  onNavigateTab,
  onOpenVideoSession,
  onOpenNewAppointment,
  onOpenNewClient,
  onOpenNewNote
}) => {
  const { addToast } = useToast();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const res = await api.getDashboardOverview();
      if (res.success) {
        setData(res);
      }
    } catch (err) {
      addToast(err.message || 'Error loading dashboard', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleCompleteSession = async (appointmentId) => {
    try {
      await api.updateAppointment(appointmentId, { status: 'Completed' });
      addToast('Session marked as completed. Ready for SOAP note entry.', 'success');
      fetchDashboardData();
    } catch (err) {
      addToast('Could not update session status', 'error');
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center space-y-3 text-slate-400">
          <div className="w-8 h-8 border-3 border-brand-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs font-semibold">Loading practice workspace...</p>
        </div>
      </div>
    );
  }

  const stats = data?.stats || {
    activeClients: 7,
    todayAppointmentsCount: 2,
    monthlyRevenue: 6150,
    sessionHours: 32.5,
  };

  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-3xl lavender-gradient border border-purple-200/80 shadow-soft flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-2 max-w-xl z-10">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/80 text-brand-700 text-xs font-bold border border-purple-200 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Clinical Schedule Active</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Today's Practice Briefing
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            You have <span className="font-bold text-brand-700">{stats.todayAppointmentsCount} appointments</span> scheduled for today. 
            All clinical records are encrypted and HIPAA compliant.
          </p>
        </div>

        {/* Quick Action Shortcuts */}
        <div className="flex flex-wrap items-center gap-2.5 z-10">
          <button
            onClick={onOpenNewAppointment}
            className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-sm shadow-brand-600/30 transition active:scale-95"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book Session</span>
          </button>
          <button
            onClick={onOpenNewClient}
            className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-bold transition active:scale-95"
          >
            <Users className="w-3.5 h-3.5" />
            <span>Add Client</span>
          </button>
          <button
            onClick={onOpenNewNote}
            className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-purple-100 hover:bg-purple-200 text-brand-800 text-xs font-bold transition active:scale-95"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>New SOAP Note</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatsCard
          title="Active Caseload"
          value={stats.activeClients}
          subtitle="Registered clients"
          icon={Users}
          trend="+12% this month"
          isPositive={true}
          color="brand"
        />
        <StatsCard
          title="Today's Sessions"
          value={stats.todayAppointmentsCount}
          subtitle="Scheduled clinical hours"
          icon={Calendar}
          trend="2 Telehealth"
          isPositive={true}
          color="lavender"
        />
        <StatsCard
          title="Monthly Collected"
          value={`$${stats.monthlyRevenue.toLocaleString()}`}
          subtitle="Processed via Stripe"
          icon={CreditCard}
          trend="+8% vs target"
          isPositive={true}
          color="emerald"
        />
        <StatsCard
          title="Clinical Hours"
          value={`${stats.sessionHours} hrs`}
          subtitle="Logged this month"
          icon={Clock}
          trend="96% Attendance"
          isPositive={true}
          color="amber"
        />
      </div>

      {/* Main Grid: Today's Schedule & Recent Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Today's Appointments & Upcoming (Span 2) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-soft space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 rounded-xl bg-brand-50 text-brand-600">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Today's Appointment Schedule</h3>
                  <p className="text-xs text-slate-400">Launch telehealth video sessions or log attendance</p>
                </div>
              </div>
              <button
                onClick={() => onNavigateTab('appointments')}
                className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center space-x-1"
              >
                <span>View Full Calendar</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* List of today's sessions */}
            {data?.todayAppointments && data.todayAppointments.length > 0 ? (
              <div className="space-y-3">
                {data.todayAppointments.map((appt) => (
                  <div
                    key={appt._id}
                    className="p-4 rounded-2xl bg-[#FAF9FF] border border-purple-100 hover:border-brand-200 transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center space-x-3.5">
                      <div className="w-11 h-11 rounded-2xl bg-white border border-purple-200 flex flex-col items-center justify-center text-center shadow-xs flex-shrink-0">
                        <span className="text-[10px] font-bold text-brand-600 uppercase">TODAY</span>
                        <span className="text-xs font-extrabold text-slate-800">{appt.startTime.split(' ')[0]}</span>
                      </div>

                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="text-sm font-bold text-slate-900">{appt.clientName}</h4>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            appt.type === 'Video session'
                              ? 'bg-purple-100 text-brand-700'
                              : 'bg-emerald-100 text-emerald-700'
                          }`}>
                            {appt.type}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5 flex items-center space-x-2">
                          <span>{appt.startTime} – {appt.endTime}</span>
                          <span>•</span>
                          <span>{appt.locationOrRoom}</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
                      {appt.type === 'Video session' && appt.status !== 'Completed' && (
                        <button
                          onClick={() => onOpenVideoSession(appt)}
                          className="px-3 py-1.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-xs flex items-center space-x-1.5 transition active:scale-95"
                        >
                          <Video className="w-3.5 h-3.5" />
                          <span>Join Video</span>
                        </button>
                      )}

                      {appt.status !== 'Completed' ? (
                        <button
                          onClick={() => handleCompleteSession(appt._id)}
                          className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold transition"
                        >
                          Mark Done
                        </button>
                      ) : (
                        <span className="px-2.5 py-1 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-bold flex items-center space-x-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Completed</span>
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                <Calendar className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <p className="text-xs font-bold text-slate-600">No appointments scheduled for today</p>
                <p className="text-[11px] text-slate-400 mt-1">Take time for clinical prep or open calendar slots</p>
              </div>
            )}
          </div>

          {/* Upcoming Sessions List */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-soft space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Upcoming Appointments This Week</h3>
              <span className="text-xs font-semibold text-slate-400">Next 5 Sessions</span>
            </div>

            <div className="divide-y divide-slate-100">
              {data?.upcomingAppointments && data.upcomingAppointments.length > 0 ? (
                data.upcomingAppointments.map((appt) => (
                  <div key={appt._id} className="py-3 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-xs">
                        {appt.clientName.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-800">{appt.clientName}</p>
                        <p className="text-[11px] text-slate-400">{appt.date} • {appt.startTime}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <span className="text-[11px] font-medium text-slate-500">{appt.type}</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-50 text-brand-700 border border-purple-100">
                        {appt.status}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-400 py-4 text-center">No upcoming appointments</p>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Practice Quick Stats & Recent Clinical Activity (Span 1) */}
        <div className="space-y-6">
          {/* Quick Practice Compliance Card */}
          <div className="bg-gradient-to-br from-brand-900 via-purple-900 to-slate-900 text-white rounded-3xl p-6 shadow-soft space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-full bg-white/10 text-purple-200 text-[10px] font-bold uppercase tracking-wider">
                Practice Shield
              </span>
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>

            <div className="space-y-1">
              <h4 className="text-base font-bold">HIPAA Secure Practice</h4>
              <p className="text-xs text-purple-200/80 leading-relaxed">
                All client notes, billing invoices, and video consultations are fully encrypted with clinical audit logs.
              </p>
            </div>

            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-purple-200">
              <span>Client Portal Status:</span>
              <span className="font-bold text-emerald-300 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                Active
              </span>
            </div>
          </div>

          {/* Recent Activity Feed */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-soft space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Practice Activity</h3>
              <span className="text-[11px] font-semibold text-slate-400">Real-time</span>
            </div>

            <div className="space-y-4">
              {data?.recentActivity?.map((act) => (
                <div key={act.id} className="flex items-start space-x-3">
                  <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                    act.color === 'emerald' ? 'bg-emerald-500' :
                    act.color === 'blue' ? 'bg-blue-500' :
                    act.color === 'amber' ? 'bg-amber-500' : 'bg-brand-600'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-slate-800">{act.title}</p>
                    <p className="text-[11px] text-slate-500 truncate mt-0.5">{act.subtitle}</p>
                    <span className="text-[10px] text-slate-400 mt-1 block">{act.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
