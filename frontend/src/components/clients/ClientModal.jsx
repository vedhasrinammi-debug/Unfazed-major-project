import React, { useState, useEffect } from 'react';
import { X, User, Mail, Phone, Heart, Shield, Plus, Trash2 } from 'lucide-react';
import { api } from '../../services/api';
import { useToast } from '../../context/ToastContext';

export const ClientModal = ({ isOpen, onClose, onSaved, initialData = null }) => {
  const { addToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dateOfBirth: '1995-05-15',
    gender: 'Female',
    status: 'Active',
    primaryDiagnosis: 'Generalized Anxiety Disorder (GAD)',
    secondaryDiagnosis: '',
    preferredSessionType: 'Video session',
    tags: ['CBT', 'Weekly'],
    emergencyContact: {
      name: '',
      relationship: '',
      phone: ''
    },
    insurance: {
      provider: 'Blue Cross Blue Shield',
      policyNumber: '',
      copay: 30
    },
    treatmentGoals: ['']
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        email: initialData.email || '',
        phone: initialData.phone || '',
        dateOfBirth: initialData.dateOfBirth || '1995-05-15',
        gender: initialData.gender || 'Female',
        status: initialData.status || 'Active',
        primaryDiagnosis: initialData.primaryDiagnosis || '',
        secondaryDiagnosis: initialData.secondaryDiagnosis || '',
        preferredSessionType: initialData.preferredSessionType || 'Video session',
        tags: initialData.tags || ['Individual Therapy'],
        emergencyContact: initialData.emergencyContact || { name: '', relationship: '', phone: '' },
        insurance: initialData.insurance || { provider: 'Self-Pay', policyNumber: '', copay: 0 },
        treatmentGoals: initialData.treatmentGoals?.length ? initialData.treatmentGoals : ['']
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleGoalChange = (index, value) => {
    const updated = [...formData.treatmentGoals];
    updated[index] = value;
    setFormData({ ...formData, treatmentGoals: updated });
  };

  const addGoal = () => {
    setFormData({ ...formData, treatmentGoals: [...formData.treatmentGoals, ''] });
  };

  const removeGoal = (index) => {
    const updated = formData.treatmentGoals.filter((_, i) => i !== index);
    setFormData({ ...formData, treatmentGoals: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      addToast('Please enter client name, email, and phone', 'error');
      return;
    }

    try {
      setLoading(true);
      const cleanedGoals = formData.treatmentGoals.filter(g => g.trim().length > 0);
      const payload = { ...formData, treatmentGoals: cleanedGoals };

      if (initialData?._id) {
        await api.updateClient(initialData._id, payload);
        addToast('Client profile updated', 'success');
      } else {
        await api.createClient(payload);
        addToast('New client registered to practice roster', 'success');
      }
      onSaved();
      onClose();
    } catch (err) {
      addToast(err.message || 'Error saving client', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white rounded-3xl w-full max-w-2xl border border-purple-100 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-brand-50 text-brand-600">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                {initialData ? 'Edit Client Record' : 'Add New Client to Roster'}
              </h3>
              <p className="text-xs text-slate-400">Clinical demographics, diagnosis, and treatment plan</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto flex-1">
          {/* Basic Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                Client Full Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Elena Vance"
                className="mt-1.5 w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                Email Address *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="elena.vance@example.com"
                className="mt-1.5 w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                Phone Number *
              </label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+1 (555) 782-9012"
                className="mt-1.5 w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                Date of Birth
              </label>
              <input
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                className="mt-1.5 w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="mt-1.5 w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 bg-white"
              >
                <option value="Active">Active</option>
                <option value="On-Hold">On-Hold</option>
                <option value="Completed">Completed</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          {/* Clinical Diagnostic Profile */}
          <div className="p-4 rounded-2xl bg-purple-50/50 border border-purple-100 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-900">
              Clinical Diagnostic Profile
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600">
                  Primary Clinical Diagnosis
                </label>
                <input
                  type="text"
                  value={formData.primaryDiagnosis}
                  onChange={(e) => setFormData({ ...formData, primaryDiagnosis: e.target.value })}
                  placeholder="e.g. Generalized Anxiety Disorder (GAD)"
                  className="mt-1 w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-brand-500/30 bg-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600">
                  Secondary / Comorbid Condition
                </label>
                <input
                  type="text"
                  value={formData.secondaryDiagnosis}
                  onChange={(e) => setFormData({ ...formData, secondaryDiagnosis: e.target.value })}
                  placeholder="e.g. Workplace Burnout, Insomnia"
                  className="mt-1 w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-brand-500/30 bg-white"
                />
              </div>
            </div>
          </div>

          {/* Treatment Goals */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                Treatment Goals & Milestones
              </label>
              <button
                type="button"
                onClick={addGoal}
                className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center space-x-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Goal</span>
              </button>
            </div>

            {formData.treatmentGoals.map((goal, idx) => (
              <div key={idx} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={goal}
                  onChange={(e) => handleGoalChange(idx, e.target.value)}
                  placeholder={`Goal ${idx + 1}: e.g. Reduce panic symptoms using 5-4-3-2-1 technique`}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-brand-500/30"
                />
                {formData.treatmentGoals.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeGoal(idx)}
                    className="p-2 text-slate-400 hover:text-rose-600 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Emergency Contact */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-600">Emergency Contact Name</label>
              <input
                type="text"
                value={formData.emergencyContact.name}
                onChange={(e) => setFormData({ ...formData, emergencyContact: { ...formData.emergencyContact, name: e.target.value } })}
                placeholder="Thomas Vance"
                className="mt-1 w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-brand-500/30"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600">Relationship</label>
              <input
                type="text"
                value={formData.emergencyContact.relationship}
                onChange={(e) => setFormData({ ...formData, emergencyContact: { ...formData.emergencyContact, relationship: e.target.value } })}
                placeholder="Spouse"
                className="mt-1 w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-brand-500/30"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600">Emergency Phone</label>
              <input
                type="text"
                value={formData.emergencyContact.phone}
                onChange={(e) => setFormData({ ...formData, emergencyContact: { ...formData.emergencyContact, phone: e.target.value } })}
                placeholder="+1 (555) 782-9099"
                className="mt-1 w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-brand-500/30"
              />
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end space-x-3 border-t border-slate-100">
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
              {loading ? 'Saving...' : initialData ? 'Save Changes' : 'Register Client'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
