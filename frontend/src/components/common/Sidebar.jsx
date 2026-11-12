import React from 'react';
import {
  LayoutDashboard,
  Users,
  Calendar,
  FileText,
  CreditCard,
  MessageSquare,
  BarChart3,
  Sparkles,
  Settings,
  LogOut,
  X,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const navigationItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'clients', label: 'Client CRM', icon: Users },
  { id: 'appointments', label: 'Appointments', icon: Calendar },
  { id: 'notes', label: 'SOAP Notes', icon: FileText },
  { id: 'payments', label: 'Billing & Invoices', icon: CreditCard },
  { id: 'chat', label: 'Secure Chat', icon: MessageSquare, badgeKey: 'chat' },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'plans', label: 'Plans & Billing', icon: Sparkles, highlight: true },
  { id: 'settings', label: 'Practice Settings', icon: Settings },
];

export const Sidebar = ({ activeTab, setActiveTab, mobileOpen, setMobileOpen, unreadChatCount = 0 }) => {
  const { user, logout } = useAuth();

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-white border-r border-slate-100 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top Header & Logo */}
        <div>
          <div className="h-20 flex items-center justify-between px-6 border-b border-slate-100/80">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-700 via-brand-600 to-lavender-400 flex items-center justify-center text-white shadow-md shadow-brand-500/20">
                <span className="font-extrabold text-xl tracking-tight">U</span>
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-slate-900">
                  UN<span className="text-brand-600">FAZED</span>
                </span>
                <span className="block text-[10px] font-semibold tracking-wider text-brand-600 uppercase">
                  Therapist Platform
                </span>
              </div>
            </div>

            {/* Mobile close button */}
            <button
              onClick={() => setMobileOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5 overflow-y-auto max-h-[calc(100vh-210px)]">
            <div className="px-3 pb-2 pt-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Clinical Workspace
            </div>

            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? 'bg-brand-50 text-brand-700 font-semibold shadow-sm border border-brand-100/80'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon
                      className={`w-5 h-5 transition-colors ${
                        isActive ? 'text-brand-600' : 'text-slate-400 group-hover:text-slate-600'
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>

                  {item.badgeKey === 'chat' && unreadChatCount > 0 && (
                    <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-brand-600 text-white animate-pulse">
                      {unreadChatCount}
                    </span>
                  )}

                  {item.highlight && (
                    <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded-md bg-purple-100 text-brand-700">
                      {user?.subscription?.plan || 'Pro'}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom User Profile Section */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50">
          <div className="flex items-center space-x-3 p-2 rounded-xl hover:bg-white transition border border-transparent hover:border-slate-200/60">
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=150'}
              alt={user?.name || 'Therapist'}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-brand-200"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-1">
                <p className="text-sm font-semibold text-slate-800 truncate">{user?.name || 'Dr. Sarah Mitchell'}</p>
                <ShieldCheck className="w-3.5 h-3.5 text-brand-600 flex-shrink-0" />
              </div>
              <p className="text-xs text-slate-500 truncate">{user?.specialization || 'Clinical Psychologist'}</p>
            </div>
            <button
              onClick={logout}
              title="Sign Out"
              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-2.5 px-2 flex items-center justify-between text-[11px] text-slate-400 font-medium">
            <span>HIPAA Compliant</span>
            <span className="inline-flex items-center text-brand-600 font-semibold hover:underline cursor-pointer" onClick={() => setActiveTab('plans')}>
              {user?.subscription?.plan || 'Pro'} Tier
            </span>
          </div>
        </div>
      </aside>
    </>
  );
};
