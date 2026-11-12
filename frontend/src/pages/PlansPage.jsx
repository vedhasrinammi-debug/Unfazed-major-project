import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  CheckCircle2,
  X,
  ShieldCheck,
  Zap,
  ArrowRight,
  CreditCard,
  Lock
} from 'lucide-react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export const PlansPage = () => {
  const { user, updateUser } = useAuth();
  const { addToast } = useToast();

  const [plans, setPlans] = useState([]);
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [loading, setLoading] = useState(true);
  const [upgradingPlan, setUpgradingPlan] = useState(null);

  useEffect(() => {
    api.getPlans().then((res) => {
      if (res.success) setPlans(res.plans);
    }).catch(console.error).finally(() => setLoading(false));
  }, []);

  const handleSelectPlan = async (plan) => {
    if (user?.subscription?.plan === plan.name) {
      addToast(`You are already subscribed to the ${plan.name} plan`, 'info');
      return;
    }
    setUpgradingPlan(plan);
  };

  const handleConfirmUpgrade = async () => {
    if (!upgradingPlan) return;
    try {
      const planName = upgradingPlan.name.includes('Premium') ? 'Premium' : upgradingPlan.name.includes('Pro') ? 'Pro' : 'Free';
      const res = await api.upgradePlan({
        planName,
        billingCycle
      });

      if (res.success) {
        addToast(`Subscription upgraded to ${planName} (${billingCycle})!`, 'success');
        updateUser({ subscription: res.subscription });
        setUpgradingPlan(null);
      }
    } catch (err) {
      addToast(err.message || 'Upgrade failed', 'error');
    }
  };

  const currentPlanName = user?.subscription?.plan || 'Pro';

  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold text-brand-600 uppercase tracking-widest">
          Practice Scalability Tiers
        </span>
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Flexible Subscription Plans for Clinicians
        </h2>
        <p className="text-xs sm:text-sm text-slate-500">
          Scale effortlessly from an independent solo practitioner to a multi-clinician mental health group.
        </p>

        {/* Billing Cycle Toggle */}
        <div className="pt-3 flex items-center justify-center space-x-3">
          <span className={`text-xs font-bold ${billingCycle === 'monthly' ? 'text-brand-700' : 'text-slate-400'}`}>
            Monthly
          </span>
          <button
            onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
            className="w-12 h-6 rounded-full bg-brand-600 p-1 flex items-center transition duration-200"
          >
            <div
              className={`w-4 h-4 rounded-full bg-white transition-transform ${
                billingCycle === 'annual' ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
          <span className={`text-xs font-bold flex items-center space-x-1.5 ${billingCycle === 'annual' ? 'text-brand-700' : 'text-slate-400'}`}>
            <span>Annual</span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold">
              Save 20%
            </span>
          </span>
        </div>
      </div>

      {/* Plan Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4">
        {plans.map((p) => {
          const isCurrent = currentPlanName.toLowerCase() === p.id.toLowerCase() ||
                            currentPlanName.toLowerCase() === p.name.toLowerCase().split(' ')[0];
          const price = billingCycle === 'annual' ? p.annualPrice : p.monthlyPrice;

          return (
            <div
              key={p.id}
              className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-200 relative ${
                isCurrent
                  ? 'bg-white border-2 border-brand-500 shadow-purple-glow ring-4 ring-purple-100'
                  : p.recommended
                  ? 'bg-gradient-to-b from-brand-900 to-purple-950 text-white shadow-xl'
                  : 'bg-white border border-slate-200/80 shadow-soft'
              }`}
            >
              {isCurrent && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-brand-600 text-white text-[11px] font-extrabold uppercase tracking-wider shadow">
                  Current Active Plan
                </div>
              )}

              <div>
                <div className="flex items-center justify-between">
                  <h3 className={`text-xl font-bold ${p.recommended && !isCurrent ? 'text-white' : 'text-slate-900'}`}>
                    {p.name}
                  </h3>
                  <span className={`px-2.5 py-0.5 rounded-lg text-xs font-bold ${
                    p.recommended && !isCurrent ? 'bg-purple-800 text-purple-200' : 'bg-purple-50 text-brand-700'
                  }`}>
                    {p.badge}
                  </span>
                </div>

                <p className={`text-xs mt-2 leading-relaxed ${p.recommended && !isCurrent ? 'text-purple-200' : 'text-slate-500'}`}>
                  {p.tagline}
                </p>

                <div className="mt-6 flex items-baseline space-x-1">
                  <span className={`text-4xl font-black ${p.recommended && !isCurrent ? 'text-white' : 'text-slate-900'}`}>
                    ${price}
                  </span>
                  <span className={`text-xs ${p.recommended && !isCurrent ? 'text-purple-300' : 'text-slate-400'}`}>
                    / month {billingCycle === 'annual' && '(billed annually)'}
                  </span>
                </div>

                {/* Features */}
                <div className="mt-8 space-y-3">
                  <span className={`text-xs font-bold uppercase tracking-wider block ${
                    p.recommended && !isCurrent ? 'text-purple-200' : 'text-slate-400'
                  }`}>
                    Capabilities:
                  </span>
                  {p.features?.map((f, i) => (
                    <div key={i} className="flex items-start space-x-2.5 text-xs">
                      <CheckCircle2 className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                        p.recommended && !isCurrent ? 'text-purple-300' : 'text-brand-600'
                      }`} />
                      <span className={p.recommended && !isCurrent ? 'text-purple-100' : 'text-slate-700'}>
                        {f}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100">
                <button
                  onClick={() => handleSelectPlan(p)}
                  disabled={isCurrent}
                  className={`w-full py-3 rounded-xl font-bold text-xs sm:text-sm transition active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${
                    isCurrent
                      ? 'bg-slate-100 text-slate-500'
                      : p.recommended
                      ? 'bg-white text-brand-900 hover:bg-purple-50 shadow-md'
                      : 'bg-brand-600 hover:bg-brand-700 text-white shadow-sm'
                  }`}
                >
                  {isCurrent ? 'Current Plan' : `Switch to ${p.name}`}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Upgrade Confirmation Modal */}
      {upgradingPlan && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl w-full max-w-md border border-purple-100 shadow-2xl p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2 text-brand-700">
                <Zap className="w-5 h-5" />
                <h3 className="text-base font-bold text-slate-900">Confirm Subscription Change</h3>
              </div>
              <button onClick={() => setUpgradingPlan(null)} className="p-1 rounded-lg text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-100 space-y-2 text-xs">
              <div className="flex justify-between font-bold text-slate-900">
                <span>Selected Plan:</span>
                <span className="text-brand-700">{upgradingPlan.name}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Billing Interval:</span>
                <span className="capitalize">{billingCycle}</span>
              </div>
              <div className="flex justify-between font-bold text-slate-900 text-sm pt-2 border-t border-purple-200">
                <span>Total Amount:</span>
                <span>
                  ${billingCycle === 'annual' ? upgradingPlan.annualPrice * 12 : upgradingPlan.monthlyPrice} / {billingCycle === 'annual' ? 'yr' : 'mo'}
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-2 text-[11px] text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Simulated payment test sandbox. Zero real money charged.</span>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                onClick={() => setUpgradingPlan(null)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmUpgrade}
                className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-sm shadow-brand-600/30 transition active:scale-95"
              >
                Confirm Upgrade
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
