import React, { useState } from 'react';
import {
  Menu,
  Bell,
  Search,
  Plus,
  Calendar,
  Sparkles,
  CheckCircle2,
  Clock,
  MessageSquare
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Header = ({
  activeTab,
  setMobileOpen,
  onQuickAction,
  quickActionLabel = 'New Appointment'
}) => {
  const { user } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    {
      id: 1,
      title: 'Upcoming Video Telehealth Session',
      desc: 'Elena Vance in 45 minutes (Room A-1)',
      time: '1:15 PM',
      icon: Clock,
      color: 'text-brand-600 bg-brand-50'
    },
    {
      id: 2,
      title: 'New Client Message',
      desc: 'Chloe Patel sent a response regarding exposure practice',
      time: '1 hour ago',
      icon: MessageSquare,
      color: 'text-emerald-600 bg-emerald-50'
    },
    {
      id: 3,
      title: 'Payment Processed',
      desc: '$150.00 received from Chloe Patel via Stripe',
      time: '2 hours ago',
      icon: CheckCircle2,
      color: 'text-blue-600 bg-blue-50'
    }
  ];

  const getPageInfo = () => {
    switch (activeTab) {
      case 'dashboard':
        return { title: 'Practice Dashboard', subtitle: `Welcome back, ${user?.name || 'Dr. Mitchell'}! Here is your daily clinical briefing.` };
      case 'clients':
        return { title: 'Client Directory (CRM)', subtitle: 'Manage client rosters, clinical profiles, emergency contacts, and treatment goals.' };
      case 'appointments':
        return { title: 'Appointment Scheduling', subtitle: 'Interactive clinical calendar, telehealth video links, and session status.' };
      case 'notes':
        return { title: 'SOAP Clinical Notes', subtitle: 'Confidential clinical documentation, SOAP formulation, and client-shared summaries.' };
      case 'payments':
        return { title: 'Billing & Invoicing', subtitle: 'Track therapy fees, insurance copays, overdue balances, and receipt generation.' };
      case 'chat':
        return { title: 'HIPAA Secure Messaging', subtitle: 'Direct asynchronous communication with active therapy clients.' };
      case 'analytics':
        return { title: 'Practice Analytics & Insights', subtitle: 'Practice revenue trajectory, clinical diagnoses breakdown, and retention rates.' };
      case 'plans':
        return { title: 'Subscription & Platform Tiers', subtitle: 'Review plan features, upgrade clinician seats, and manage billing.' };
      case 'settings':
        return { title: 'Practice & Account Settings', subtitle: 'Customize clinic details, licensing info, telehealth buffer, and session fees.' };
      default:
        return { title: 'Clinical Workspace', subtitle: 'UNFAZED Therapist Practice Platform' };
    }
  };

  const { title, subtitle } = getPageInfo();

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left: Mobile hamburger & Page Title */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div>
            <h1 className="text-xl lg:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              {title}
            </h1>
            <p className="hidden sm:block text-xs text-slate-500 font-medium mt-0.5">
              {subtitle}
            </p>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center space-x-3">
          {/* Practice Badge */}
          <div className="hidden md:flex items-center space-x-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200/80 text-xs text-slate-600 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="truncate max-w-[200px]">{user?.practiceName || 'Mindful Horizons Clinic'}</span>
          </div>

          {/* Quick Action Button */}
          {onQuickAction && (
            <button
              onClick={onQuickAction}
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs lg:text-sm font-semibold shadow-sm shadow-brand-500/25 transition active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>{quickActionLabel}</span>
            </button>
          )}

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-brand-600 rounded-full ring-2 ring-white"></span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-100 py-3 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="px-4 pb-2 border-b border-slate-100 flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-900">Notifications</span>
                  <span className="text-[11px] font-semibold text-brand-600 cursor-pointer hover:underline">Mark all read</span>
                </div>

                <div className="divide-y divide-slate-50 max-h-80 overflow-y-auto">
                  {notifications.map((n) => {
                    const NIcon = n.icon;
                    return (
                      <div key={n.id} className="p-3.5 hover:bg-slate-50/80 transition cursor-pointer flex items-start space-x-3">
                        <div className={`p-2 rounded-xl ${n.color} flex-shrink-0 mt-0.5`}>
                          <NIcon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-slate-800">{n.title}</p>
                          <p className="text-xs text-slate-500 truncate mt-0.5">{n.desc}</p>
                          <span className="text-[10px] text-slate-400 mt-1 block">{n.time}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-2 px-4 border-t border-slate-100 text-center">
                  <button
                    onClick={() => setShowNotifications(false)}
                    className="text-xs font-medium text-slate-500 hover:text-brand-600 transition"
                  >
                    Close Menu
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
