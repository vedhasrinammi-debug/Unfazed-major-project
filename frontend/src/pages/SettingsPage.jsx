import React, { useState } from 'react';
import {
  Settings,
  User,
  Shield,
  Briefcase,
  Phone,
  Mail,
  DollarSign,
  Clock,
  Bell,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { api } from '../services/api';

export const SettingsPage = () => {
  const { user, updateUser } = useAuth();
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    licenseNumber: user?.licenseNumber || '',
    specialization: user?.specialization || '',
    practiceName: user?.practiceName || '',
    phone: user?.phone || '',
    bio: user?.bio || '',
    settings: {
      defaultSessionFee: user?.settings?.defaultSessionFee || 150,
      sessionBufferMinutes: user?.settings?.sessionBufferMinutes || 15,
      emailNotifications: user?.settings?.emailNotifications ?? true,
      appointmentReminders: user?.settings?.appointmentReminders ?? true
    }
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await api.updateProfile(formData);
      if (res.success) {
        updateUser(res.user);
        addToast('Practice profile & clinical preferences updated', 'success');
      }
    } catch (err) {
      addToast(err.message || 'Error updating settings', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-4xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Practice & Clinical Settings</h2>
        <p className="text-xs sm:text-sm text-slate-500">Configure clinician credentials, scheduling buffers, and invoicing defaults</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Clinician Profile */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-soft space-y-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <User className="w-4 h-4 text-brand-600" />
            <span>Clinician Identity & Licensing</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1.5 w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">Email Address</label>
              <input
                type="email"
                value={formData.email}
                disabled
                className="mt-1.5 w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm bg-slate-50 text-slate-500 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">State Clinical License #</label>
              <input
                type="text"
                value={formData.licenseNumber}
                onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                className="mt-1.5 w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">Practice / Clinic Name</label>
              <input
                type="text"
                value={formData.practiceName}
                onChange={(e) => setFormData({ ...formData, practiceName: e.target.value })}
                className="mt-1.5 w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">Primary Specialization</label>
            <input
              type="text"
              value={formData.specialization}
              onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
              className="mt-1.5 w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">Clinical Bio & Background</label>
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              rows={3}
              className="mt-1.5 w-full p-3.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 leading-relaxed"
            />
          </div>
        </div>

        {/* Practice Preferences */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-soft space-y-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-emerald-600" />
            <span>Scheduling & Invoicing Defaults</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">Default Session Fee ($)</label>
              <input
                type="number"
                value={formData.settings.defaultSessionFee}
                onChange={(e) => setFormData({
                  ...formData,
                  settings: { ...formData.settings, defaultSessionFee: Number(e.target.value) }
                })}
                className="mt-1.5 w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">Buffer Between Sessions (Minutes)</label>
              <select
                value={formData.settings.sessionBufferMinutes}
                onChange={(e) => setFormData({
                  ...formData,
                  settings: { ...formData.settings, sessionBufferMinutes: Number(e.target.value) }
                })}
                className="mt-1.5 w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 bg-white"
              >
                <option value={10}>10 minutes</option>
                <option value={15}>15 minutes (Recommended)</option>
                <option value={20}>20 minutes</option>
                <option value={30}>30 minutes</option>
              </select>
            </div>
          </div>

          <div className="pt-2 space-y-3">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.settings.emailNotifications}
                onChange={(e) => setFormData({
                  ...formData,
                  settings: { ...formData.settings, emailNotifications: e.target.checked }
                })}
                className="w-4 h-4 text-brand-600 rounded border-slate-300 focus:ring-brand-500"
              />
              <span className="text-xs text-slate-700 font-semibold">
                Send automatic appointment reminder notifications to clients 24 hours in advance
              </span>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.settings.appointmentReminders}
                onChange={(e) => setFormData({
                  ...formData,
                  settings: { ...formData.settings, appointmentReminders: e.target.checked }
                })}
                className="w-4 h-4 text-brand-600 rounded border-slate-300 focus:ring-brand-500"
              />
              <span className="text-xs text-slate-700 font-semibold">
                Require digital clinician signature on every SOAP note completion
              </span>
            </label>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-brand-600/30 transition active:scale-95 disabled:opacity-50"
          >
            {loading ? 'Saving Preferences...' : 'Save Practice Preferences'}
          </button>
        </div>
      </form>
    </div>
  );
};
