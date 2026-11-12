import React, { useState } from 'react';
import {
  Heart,
  Video,
  FileText,
  CreditCard,
  MessageSquare,
  BarChart3,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Star,
  ChevronDown,
  Clock,
  Lock,
  Zap,
  Users
} from 'lucide-react';

export const LandingPage = ({ onNavigateToLogin, onNavigateToRegister, onQuickDemo }) => {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const features = [
    {
      icon: Video,
      title: 'HIPAA-Compliant Telehealth',
      desc: 'Crystal-clear HD video sessions with integrated clinical notes drawer, meeting link generation, and zero plugin downloads.'
    },
    {
      icon: FileText,
      title: 'Private & Shared SOAP Notes',
      desc: 'Write structured Subjective, Objective, Assessment & Plan notes. Keep sensitive clinical reflections confidential or share summaries with clients.'
    },
    {
      icon: Users,
      title: 'Intelligent Client CRM',
      desc: 'Centralized client rosters, diagnostic tracking (GAD, MDD, PTSD), treatment goals, emergency contacts, and session history in one click.'
    },
    {
      icon: CreditCard,
      title: 'Automated Billing & Invoicing',
      desc: 'Generate branded PDF invoices, track copays, receive instant card payments via Stripe, and reconcile monthly revenue seamlessly.'
    },
    {
      icon: MessageSquare,
      title: 'Encrypted Client Messaging',
      desc: 'Asynchronous communication between appointments. Send homework assignments, habit trackers, and grounding reminders securely.'
    },
    {
      icon: BarChart3,
      title: 'Clinical Practice Analytics',
      desc: 'Visualize retention rates, session attendance trends, top clinical diagnoses, and monthly revenue trajectories with interactive charts.'
    }
  ];

  const plans = [
    {
      id: 'free',
      name: 'Free Starter',
      tagline: 'Ideal for independent solo practitioners starting their clinical practice.',
      monthlyPrice: 0,
      annualPrice: 0,
      badge: 'Free Forever',
      features: [
        'Up to 3 active clients',
        'Standard appointment scheduling',
        'Basic clinical progress notes',
        'Client emergency records',
        'Email practice support'
      ],
      popular: false,
      cta: 'Start Free'
    },
    {
      id: 'pro',
      name: 'Pro Clinician',
      tagline: 'Comprehensive clinical OS for thriving licensed psychotherapists.',
      monthlyPrice: 49,
      annualPrice: 39,
      badge: 'Most Popular',
      features: [
        'Unlimited active clients',
        'HD Telehealth Video Sessions',
        'Private & Client-Shared SOAP Notes',
        'Stripe & Insurance Invoicing',
        'Secure Client Messaging',
        'Practice Growth & Retention Analytics',
        'Automated Appointment Reminders'
      ],
      popular: true,
      cta: 'Launch Pro Trial'
    },
    {
      id: 'premium',
      name: 'Practice Premium',
      tagline: 'Tailored for group counseling practices, clinics, and multi-therapist teams.',
      monthlyPrice: 99,
      annualPrice: 79,
      badge: 'Group Practice',
      features: [
        'Everything in Pro Clinician',
        'Up to 10 Therapist Clinician Seats',
        'Custom White-Label Client Portal',
        'Advanced P&L & Revenue Forecasting',
        'Superbill Generation & Batch Claims',
        'Priority 24/7 Clinical Support Hotline',
        'Audit Trail & Dedicated Compliance Officer'
      ],
      popular: false,
      cta: 'Upgrade to Premium'
    }
  ];

  const testimonials = [
    {
      name: 'Dr. Evelyn Reed, Ph.D.',
      title: 'Licensed Clinical Psychologist, San Francisco',
      quote: 'UNFAZED cut my administrative overhead in half. The separation between confidential therapist SOAP notes and client-shared action items is brilliantly designed.',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150',
      rating: 5
    },
    {
      name: 'Julian Vance, LMFT',
      title: 'Family & Trauma Specialist, New York',
      quote: 'The integrated telehealth and appointment management is seamless. My clients love receiving their weekly takeaway summaries directly in their portal.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
      rating: 5
    },
    {
      name: 'Dr. Aris Thorne, Psy.D.',
      title: 'Founder, MindSpring Therapy Group',
      quote: 'Managing billing and clinical documentation across multiple clinicians used to be chaotic. With UNFAZED, our revenue collection rate jumped to 98%.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
      rating: 5
    }
  ];

  const faqs = [
    {
      q: 'Is UNFAZED HIPAA-compliant and secure?',
      a: 'Yes, absolutely. UNFAZED is engineered following strict HIPAA, HITECH, and GDPR security standards. All clinical session notes, telehealth sessions, and client records are encrypted both in transit (TLS 1.3) and at rest (AES-256).'
    },
    {
      q: 'How does the Private vs Shared SOAP Notes feature work?',
      a: 'Each clinical note has a dedicated privacy toggle. Clinicians can document sensitive diagnostic impressions and hypotheses under confidential therapist-only view, while electing to share supportive homework, coping tools, and action items with the client.'
    },
    {
      q: 'Can I import my existing client records?',
      a: 'Yes, you can easily add clients manually with complete diagnostic profiles, or import via standardized clinical CSV templates during practice onboarding.'
    },
    {
      q: 'Can I switch or cancel my plan at any time?',
      a: 'Yes! You can upgrade from the Free tier to Pro or Premium anytime as your client caseload expands, with prorated billing and zero lock-in contracts.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF9FF] text-slate-900 flex flex-col font-sans">
      {/* Top Announcement Bar */}
      <div className="bg-brand-900 text-purple-100 text-xs py-2 px-4 text-center font-medium flex items-center justify-center space-x-2">
        <span className="px-2 py-0.5 rounded-full bg-brand-700 font-bold text-[10px] uppercase">College Major Project</span>
        <span>UNFAZED: Comprehensive Practice Management Platform for Licensed Mental Health Clinicians</span>
        <button
          onClick={onQuickDemo}
          className="ml-2 underline font-semibold text-white hover:text-lavender-200"
        >
          Explore Live Demo &rarr;
        </button>
      </div>

      {/* Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-purple-100/60 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-700 via-brand-600 to-lavender-400 flex items-center justify-center text-white shadow-md shadow-brand-500/20">
              <span className="font-extrabold text-xl tracking-tight">U</span>
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-slate-900">
                UN<span className="text-brand-600">FAZED</span>
              </span>
              <span className="block text-[10px] font-semibold tracking-wider text-brand-600 uppercase">
                Therapist Practice OS
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-600">
            <a href="#features" className="hover:text-brand-600 transition">Features</a>
            <a href="#clinical-notes" className="hover:text-brand-600 transition">SOAP Notes</a>
            <a href="#pricing" className="hover:text-brand-600 transition">Pricing Plans</a>
            <a href="#testimonials" className="hover:text-brand-600 transition">Reviews</a>
            <a href="#faq" className="hover:text-brand-600 transition">FAQ</a>
          </nav>

          <div className="flex items-center space-x-3">
            <button
              onClick={onQuickDemo}
              className="hidden sm:inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-purple-50 text-brand-700 hover:bg-purple-100 border border-purple-200 text-xs font-bold transition active:scale-95"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Instant Demo</span>
            </button>
            <button
              onClick={onNavigateToLogin}
              className="text-xs sm:text-sm font-semibold text-slate-700 hover:text-brand-600 px-3 py-2 transition"
            >
              Sign In
            </button>
            <button
              onClick={onNavigateToRegister}
              className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs sm:text-sm font-semibold shadow-sm shadow-brand-600/30 transition active:scale-95"
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 px-6 overflow-hidden hero-glow">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-purple-100/80 border border-purple-200 text-brand-800 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-brand-600" />
            <span>Built for Psychologists, Therapists & Counselors</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
            Focus on Healing. <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-700 via-brand-600 to-purple-500">
              We Automate Your Therapy Practice.
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            UNFAZED is the modern clinical management platform designed specifically for licensed therapists.
            Streamline telehealth appointments, write private and client-shared SOAP notes, bill with confidence, and grow your caseload with clarity.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <button
              onClick={onQuickDemo}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-md shadow-brand-600/30 transition active:scale-95"
            >
              <Zap className="w-4 h-4 text-purple-200" />
              <span>Launch 1-Click Practice Demo</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
            <button
              onClick={onNavigateToRegister}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-semibold text-sm transition"
            >
              Create Free Clinician Account
            </button>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 font-medium">
            <div className="flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>HIPAA Compliant</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Lock className="w-4 h-4 text-brand-600" />
              <span>256-Bit Data Encryption</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-purple-600" />
              <span>No Credit Card Required</span>
            </div>
          </div>
        </div>

        {/* Dashboard Preview Banner Mockup */}
        <div className="max-w-6xl mx-auto mt-14 relative">
          <div className="p-3 bg-white/70 backdrop-blur-md rounded-2xl sm:rounded-3xl border border-purple-200/80 shadow-2xl shadow-purple-900/10">
            <div className="bg-slate-900 rounded-xl sm:rounded-2xl overflow-hidden p-1 sm:p-2 border border-slate-800">
              <div className="h-6 sm:h-8 bg-slate-800 rounded-t-lg flex items-center px-3 space-x-2">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                <div className="ml-4 text-[11px] text-slate-400 font-mono truncate">
                  https://app.unfazed.health/dashboard/clinician/dr-sarah-mitchell
                </div>
              </div>

              {/* Mockup Dashboard Snapshot */}
              <div className="bg-[#FAF9FF] p-4 sm:p-6 rounded-b-lg grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
                <div className="p-4 bg-white rounded-xl border border-purple-100 shadow-sm">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>Active Caseload</span>
                    <span className="text-emerald-600 font-bold">+18% MoM</span>
                  </div>
                  <div className="text-2xl font-bold text-slate-900 mt-1">31 Clients</div>
                  <div className="text-[11px] text-slate-400 mt-1">94% Retention Rate</div>
                </div>

                <div className="p-4 bg-white rounded-xl border border-purple-100 shadow-sm">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>Today's Sessions</span>
                    <span className="text-brand-600 font-bold">2 Telehealth</span>
                  </div>
                  <div className="text-2xl font-bold text-slate-900 mt-1">4 Scheduled</div>
                  <div className="text-[11px] text-slate-400 mt-1">Next: Elena Vance @ 2:00 PM</div>
                </div>

                <div className="p-4 bg-white rounded-xl border border-purple-100 shadow-sm">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>Monthly Revenue</span>
                    <span className="text-emerald-600 font-bold">$6,150.00</span>
                  </div>
                  <div className="text-2xl font-bold text-slate-900 mt-1">$150 / session avg</div>
                  <div className="text-[11px] text-slate-400 mt-1">Automated Stripe billing active</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 px-6 bg-white border-y border-slate-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold text-brand-600 uppercase tracking-widest">
              Everything Your Practice Needs
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              A Complete Operating System for Therapy
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Replace disjointed spreadsheets, standalone video apps, and paper charts with one unified, intuitive healthcare platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feat, i) => {
              const Icon = feat.icon;
              return (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-[#FAF9FF] border border-purple-100/80 hover:border-brand-300 hover:shadow-soft-lg transition duration-200 card-hover-effect space-y-3"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center shadow-sm">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{feat.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{feat.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Deep-Dive: Private vs Shared SOAP Notes */}
      <section id="clinical-notes" className="py-20 px-6 bg-gradient-to-b from-[#FAF9FF] to-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs font-bold text-brand-600 uppercase tracking-widest">
              Clinical Integrity Meets Client Empowerment
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Private Therapist Records <br />
              & Client Takeaway Summaries.
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Standard clinical software forces an impossible choice: either withhold session notes completely, or expose delicate clinical hypotheses to the client.
            </p>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              UNFAZED introduces a dual-channel SOAP architecture: maintain formal diagnostic evaluations under confidential clinician lock, while distilling action items, grounding techniques, and homework into the client's shared summary.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm font-semibold text-slate-800">
                  Full SOAP Format: Subjective, Objective, Assessment, Plan
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm font-semibold text-slate-800">
                  1-Click Client Privacy Toggle (Share takeaway summaries or keep 100% private)
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm font-semibold text-slate-800">
                  Integrated Risk Assessment & Safety Plan documentation
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-purple-200 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                <span className="text-sm font-bold text-slate-800">SOAP Note: Session 8</span>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-purple-100 text-brand-700 text-xs font-bold">
                Client Shared Summary Active
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-purple-50/60 border border-purple-100">
                <span className="font-bold text-brand-800 block mb-1">Subjective (S)</span>
                <p className="text-slate-600">Client reported moderate anxiety (6/10) during quarterly review. Noted improved sleep with 10-minute progressive muscle relaxation.</p>
              </div>

              <div className="p-3 rounded-xl bg-purple-50/60 border border-purple-100">
                <span className="font-bold text-brand-800 block mb-1">Assessment & Plan (A & P)</span>
                <p className="text-slate-600">Steady progress in identifying cognitive distortions. Assign 5-4-3-2-1 grounding exercise and daily thought reframing log.</p>
              </div>

              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                <span className="font-bold text-emerald-800 block mb-1">Client Portal Shared Takeaways:</span>
                <p className="text-emerald-700">"Thoughts are hypotheses, not facts. Remember to practice your 5-4-3-2-1 sensory grounding when chest tightness arises."</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-6 bg-white border-t border-slate-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-bold text-brand-600 uppercase tracking-widest">
              Transparent, Fair Pricing
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Plans Designed for Every Clinical Stage
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Start free as a solo counselor, or upgrade to Pro or Premium as your practice flourishes.
            </p>

            {/* Monthly / Annual Toggle */}
            <div className="pt-4 flex items-center justify-center space-x-3">
              <span className={`text-sm font-semibold ${billingCycle === 'monthly' ? 'text-brand-700' : 'text-slate-400'}`}>
                Monthly Billing
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
              <span className={`text-sm font-semibold flex items-center space-x-1 ${billingCycle === 'annual' ? 'text-brand-700' : 'text-slate-400'}`}>
                <span>Annual Billing</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-extrabold uppercase">
                  Save 20%
                </span>
              </span>
            </div>
          </div>

          {/* Pricing Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {plans.map((p) => {
              const price = billingCycle === 'annual' ? p.annualPrice : p.monthlyPrice;

              return (
                <div
                  key={p.id}
                  className={`rounded-3xl p-8 flex flex-col justify-between transition duration-200 relative ${
                    p.popular
                      ? 'bg-gradient-to-b from-brand-900 to-purple-950 text-white shadow-xl shadow-purple-900/20 ring-4 ring-brand-400/30'
                      : 'bg-white border border-slate-200/80 text-slate-900 shadow-soft'
                  }`}
                >
                  {p.popular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-gradient-to-r from-brand-500 to-purple-400 text-white text-xs font-bold uppercase tracking-wider shadow">
                      {p.badge}
                    </div>
                  )}

                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold">{p.name}</h3>
                      {!p.popular && (
                        <span className="px-2.5 py-1 rounded-lg bg-purple-50 text-brand-700 text-xs font-semibold">
                          {p.badge}
                        </span>
                      )}
                    </div>
                    <p className={`text-xs mt-2 leading-relaxed ${p.popular ? 'text-purple-200' : 'text-slate-500'}`}>
                      {p.tagline}
                    </p>

                    <div className="mt-6 flex items-baseline space-x-1">
                      <span className="text-4xl font-extrabold tracking-tight">${price}</span>
                      <span className={`text-xs font-medium ${p.popular ? 'text-purple-200' : 'text-slate-400'}`}>
                        / clinician / month
                      </span>
                    </div>

                    <div className="mt-8 space-y-3">
                      <p className={`text-xs font-bold uppercase tracking-wider ${p.popular ? 'text-purple-200' : 'text-slate-400'}`}>
                        Included Capabilities:
                      </p>
                      {p.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start space-x-2.5 text-xs">
                          <CheckCircle2 className={`w-4 h-4 flex-shrink-0 mt-0.5 ${p.popular ? 'text-purple-300' : 'text-brand-600'}`} />
                          <span className={p.popular ? 'text-purple-100' : 'text-slate-600'}>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-purple-800/40">
                    <button
                      onClick={onQuickDemo}
                      className={`w-full py-3 rounded-xl font-bold text-xs sm:text-sm transition active:scale-95 ${
                        p.popular
                          ? 'bg-white text-brand-900 hover:bg-purple-50 shadow-md'
                          : 'bg-brand-600 text-white hover:bg-brand-700 shadow-sm'
                      }`}
                    >
                      {p.cta}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-6 bg-[#FAF9FF]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold text-brand-600 uppercase tracking-widest">
              Trusted by Licensed Clinicians
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Recommended by Mental Health Leaders
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="p-6 bg-white rounded-3xl border border-purple-100 shadow-soft flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-1 text-amber-400">
                    {[...Array(t.rating)].map((_, r) => (
                      <Star key={r} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 italic leading-relaxed">
                    "{t.quote}"
                  </p>
                </div>

                <div className="flex items-center space-x-3 pt-3 border-t border-slate-50">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-purple-100" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{t.name}</h4>
                    <p className="text-[11px] text-slate-400">{t.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 px-6 bg-white border-t border-slate-100">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-brand-600 uppercase tracking-widest">Questions & Answers</span>
            <h2 className="text-3xl font-extrabold text-slate-900">Frequently Asked Questions</h2>
          </div>

          <div className="divide-y divide-purple-100">
            {faqs.map((faq, i) => (
              <div key={i} className="py-4">
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full flex items-center justify-between text-left text-sm sm:text-base font-bold text-slate-800 hover:text-brand-600 transition"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${activeFaq === i ? 'rotate-180 text-brand-600' : ''}`} />
                </button>
                {activeFaq === i && (
                  <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed animate-in fade-in">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-slate-900 text-slate-400 py-12 px-6 border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center text-white font-bold text-sm">
              U
            </div>
            <div>
              <span className="text-sm font-bold text-white tracking-tight">UNFAZED</span>
              <p className="text-[11px] text-slate-500">Therapist Practice Management Platform</p>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <a href="#features" className="hover:text-white transition">Platform Features</a>
            <a href="#clinical-notes" className="hover:text-white transition">SOAP Guidelines</a>
            <a href="#pricing" className="hover:text-white transition">Pricing Plans</a>
            <span className="text-slate-600">|</span>
            <span className="text-emerald-400 flex items-center space-x-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>All Systems Operational</span>
            </span>
          </div>

          <div className="text-slate-500 text-center md:text-right">
            <p>&copy; {new Date().getFullYear()} UNFAZED Healthcare Technologies. College Major Project Demo.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
