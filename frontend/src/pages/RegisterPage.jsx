import React, { useState } from 'react';
import { Lock, Mail, User, Shield, Briefcase, Phone, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export const RegisterPage = ({ onNavigateToLogin, onNavigateToLanding }) => {
  const { register } = useAuth();
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    licenseNumber: '',
    specialization: 'Cognitive Behavioral Therapy (CBT)',
    practiceName: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      addToast('Please fill in all required fields', 'error');
      return;
    }

    try {
      setLoading(true);
      const res = await register(formData);
      if (res.success) {
        addToast(`Practice registered! Welcome, ${res.user.name}`, 'success');
      }
    } catch (err) {
      addToast(err.message || 'Registration failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9FF] flex flex-col justify-center py-12 px-6 sm:px-8 relative hero-glow">
      <div className="absolute top-6 left-6">
        <button
          onClick={onNavigateToLanding}
          className="text-xs font-semibold text-slate-500 hover:text-brand-600 transition flex items-center space-x-1"
        >
          <span>&larr; Back to Home</span>
        </button>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-xl">
        <div className="flex justify-center cursor-pointer" onClick={onNavigateToLanding}>
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-700 via-brand-600 to-lavender-400 flex items-center justify-center text-white shadow-lg shadow-brand-500/25">
            <span className="font-extrabold text-2xl tracking-tight">U</span>
          </div>
        </div>

        <h2 className="mt-4 text-center text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Register Your Therapy Practice
        </h2>
        <p className="mt-1 text-center text-xs sm:text-sm text-slate-500">
          Join licensed clinicians managing client care on UNFAZED
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
        <div className="bg-white py-8 px-6 shadow-soft-lg rounded-3xl border border-purple-100/80 sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                  Full Clinician Name *
                </label>
                <div className="mt-1.5 relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Dr. Jordan Blake, Psy.D."
                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition"
                    required
                  />
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                  Email Address *
                </label>
                <div className="mt-1.5 relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="jordan.blake@therapy.org"
                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition"
                    required
                  />
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                  Password *
                </label>
                <div className="mt-1.5 relative">
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Min. 8 characters"
                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition"
                    required
                  />
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                  State License #
                </label>
                <div className="mt-1.5 relative">
                  <input
                    type="text"
                    name="licenseNumber"
                    value={formData.licenseNumber}
                    onChange={handleChange}
                    placeholder="LCSW-CA-49120"
                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition"
                  />
                  <Shield className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                  Practice / Clinic Name
                </label>
                <div className="mt-1.5 relative">
                  <input
                    type="text"
                    name="practiceName"
                    value={formData.practiceName}
                    onChange={handleChange}
                    placeholder="Horizon Psychological Services"
                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition"
                  />
                  <Briefcase className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                  Clinic Phone Number
                </label>
                <div className="mt-1.5 relative">
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 789-0123"
                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition"
                  />
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                Primary Clinical Modality & Specialization
              </label>
              <select
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
                className="mt-1.5 w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition bg-white"
              >
                <option value="Cognitive Behavioral Therapy (CBT)">Cognitive Behavioral Therapy (CBT)</option>
                <option value="Dialectical Behavior Therapy (DBT)">Dialectical Behavior Therapy (DBT)</option>
                <option value="Trauma-Informed & EMDR Therapy">Trauma-Informed & EMDR Therapy</option>
                <option value="Acceptance & Commitment Therapy (ACT)">Acceptance & Commitment Therapy (ACT)</option>
                <option value="Psychodynamic & Psychoanalytic Therapy">Psychodynamic & Psychoanalytic Therapy</option>
                <option value="Couples & Marriage Family Therapy (LMFT)">Couples & Marriage Family Therapy (LMFT)</option>
              </select>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-md shadow-brand-600/30 transition active:scale-95 disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                <span>{loading ? 'Creating Practice Account...' : 'Complete Practice Registration'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
            Already have an active practice?{' '}
            <button
              onClick={onNavigateToLogin}
              className="font-bold text-brand-600 hover:text-brand-700 underline"
            >
              Sign in to your account
            </button>
          </div>

          <div className="mt-4 flex items-center justify-center space-x-1.5 text-[11px] text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>HIPAA-Compliant Encrypted Clinical Registration</span>
          </div>
        </div>
      </div>
    </div>
  );
};
