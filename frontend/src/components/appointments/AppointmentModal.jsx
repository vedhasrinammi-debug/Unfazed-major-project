import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, Video, User, DollarSign, Check } from 'lucide-react';
import { api } from '../../services/api';
import { useToast } from '../../context/ToastContext';

export const AppointmentModal = ({ isOpen, onClose, onSaved, initialData = null }) => {
  const { addToast } = useToast();
  const [clients, setClients] = useState([]);
  const [formData, setFormData] = useState({
    clientId: '',
    date: new Date().toISOString().split('T')[0],
    startTime: '02:00 PM',
    endTime: '02:50 PM',
    durationMinutes: 50,
    type: 'Video session',
    sessionFee: 150,
    clientGoalsSummary: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      api.getClients().then((res) => {
        if (res.success && res.clients) {
          setClients(res.clients);
          if (!formData.clientId && res.clients.length > 0) {
            setFormData(prev => ({ ...prev, clientId: res.clients[0]._id }));
          }
        }
      }).catch(() => {});

      if (initialData) {
        setFormData({
          clientId: initialData.clientId || '',
          date: initialData.date || new Date().toISOString().split('T')[0],
          startTime: initialData.startTime || '02:00 PM',
          endTime: initialData.endTime || '02:50 PM',
          durationMinutes: initialData.durationMinutes || 50,
          type: initialData.type || 'Video session',
          sessionFee: initialData.sessionFee || 150,
          clientGoalsSummary: initialData.clientGoalsSummary || ''
        });
      }
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.clientId || !formData.date || !formData.startTime) {
      addToast('Please select client, date, and time', 'error');
      return;
    }

    try {
      setLoading(true);
      if (initialData?._id) {
        await api.updateAppointment(initialData._id, formData);
        addToast('Appointment updated successfully', 'success');
      } else {
        await api.createAppointment(formData);
        addToast('New therapy appointment scheduled', 'success');
      }
      onSaved();
      onClose();
    } catch (err) {
      addToast(err.message || 'Error saving appointment', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white rounded-3xl w-full max-w-lg border border-purple-100 shadow-2xl overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-brand-50 text-brand-600">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                {initialData ? 'Edit Appointment' : 'Book Therapy Session'}
              </h3>
              <p className="text-xs text-slate-400">Schedule in-person or telehealth consultation</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
              Select Client *
            </label>
            <select
              value={formData.clientId}
              onChange={(e) => setFormData({ ...formData, clientId: e.target.value })}
              className="mt-1.5 w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 bg-white"
              required
            >
              {clients.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name} — ({c.primaryDiagnosis || 'Client'})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                Date *
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="mt-1.5 w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                Start Time *
              </label>
              <input
                type="text"
                value={formData.startTime}
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                placeholder="02:00 PM"
                className="mt-1.5 w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                Modality
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="mt-1.5 w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 bg-white"
              >
                <option value="Video session">Telehealth Video</option>
                <option value="In-person">In-Person Consultation</option>
                <option value="Phone check-in">Phone Check-in</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                Session Fee ($)
              </label>
              <input
                type="number"
                value={formData.sessionFee}
                onChange={(e) => setFormData({ ...formData, sessionFee: Number(e.target.value) })}
                className="mt-1.5 w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
              Session Agenda / Target Focus
            </label>
            <input
              type="text"
              value={formData.clientGoalsSummary}
              onChange={(e) => setFormData({ ...formData, clientGoalsSummary: e.target.value })}
              placeholder="e.g. Review panic log, practice 4-7-8 breathing"
              className="mt-1.5 w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500"
            />
          </div>

          <div className="pt-3 flex items-center justify-end space-x-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold text-xs hover:bg-slate-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-sm shadow-brand-600/30 transition active:scale-95 disabled:opacity-50"
            >
              {loading ? 'Saving...' : initialData ? 'Update Appointment' : 'Confirm & Schedule'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
