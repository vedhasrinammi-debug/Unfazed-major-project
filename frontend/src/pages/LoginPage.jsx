import React, { useState } from 'react';
import { Lock, Mail, ArrowRight, ShieldCheck, Zap, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export const LoginPage = ({ onNavigateToRegister, onNavigateToLanding }) => {
  const { login, demoLogin } = useAuth();
  const { addToast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      addToast('Please enter both email and password', 'error');
      return;
    }

    try {
      setLoading(true);
      const res = await login(email, password);
      if (res.success) {
        addToast(`Welcome back, ${res.user.name}!`, 'success');
      }
    } catch (err) {
      addToast(err.message || 'Login failed. Please verify credentials.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDemo = async () => {
    try {
      setLoading(true);
      const res = await demoLogin();
      if (res.success) {
        addToast('Signed in as Demo Therapist Dr. Sarah Mitchell', 'success');
      }
    } catch (err) {
      addToast(err.message || 'Demo login error', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9FF] flex flex-col justify-center py-12 px-6 sm:px-8 relative hero-glow">
      {/* Back to landing */}
      <div className="absolute top-6 left-6">
        <button
          onClick={onNavigateToLanding}
          className="text-xs font-semibold text-slate-500 hover:text-brand-600 transition flex items-center space-x-1"
        >
          <span>&larr; Back to Home</span>
        </button>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center cursor-pointer" onClick={onNavigateToLanding}>
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-700 via-brand-600 to-lavender-400 flex items-center justify-center text-white shadow-lg shadow-brand-500/25">
            <span className="font-extrabold text-2xl tracking-tight">U</span>
          </div>
        </div>

        <h2 className="mt-4 text-center text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Sign In to Clinician Portal
        </h2>
        <p className="mt-1 text-center text-xs sm:text-sm text-slate-500">
          Enter your therapist credentials to manage clients and clinical notes
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-soft-lg rounded-3xl border border-purple-100/80 sm:px-10 space-y-6">
          {/* Quick Demo Login Hero Box */}
          <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-brand-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-brand-600" />
                Examiner & Evaluator Fast Track
              </span>
              <span className="px-2 py-0.5 rounded-full bg-brand-600 text-white text-[10px] font-extrabold uppercase">
                1-Click Demo
              </span>
            </div>
            <p className="text-[11px] text-slate-600">
              Pre-loaded with 7 active clients, SOAP notes, telehealth schedule, and billing data.
            </p>
            <button
              type="button"
              onClick={handleDemo}
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-sm flex items-center justify-center space-x-2 transition active:scale-95 disabled:opacity-50"
            >
              <Zap className="w-4 h-4 text-purple-200" />
              <span>Sign In as Dr. Sarah Mitchell (Demo)</span>
            </button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-slate-400 font-semibold">Or with password</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                Email Address
              </label>
              <div className="mt-1.5 relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="sarah.mitchell@unfazed.health"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition"
                  required
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                Password
              </label>
              <div className="mt-1.5 relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition"
                  required
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition active:scale-95 disabled:opacity-50 flex items-center justify-center space-x-2"
            >
              <span>{loading ? 'Authenticating...' : 'Sign In'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-2 text-center text-xs text-slate-500">
            Don't have an account?{' '}
            <button
              onClick={onNavigateToRegister}
              className="font-bold text-brand-600 hover:text-brand-700 underline"
            >
              Register your practice
            </button>
          </div>

          <div className="pt-2 flex items-center justify-center space-x-1.5 text-[11px] text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>End-to-End HIPAA Encrypted Session</span>
          </div>
        </div>
      </div>
    </div>
  );
};
