import React, { useState, useEffect } from 'react';
import {
  X,
  FileText,
  Lock,
  Share2,
  ShieldAlert,
  Sparkles,
  CheckCircle2,
  Plus,
  Trash2,
  AlertCircle
} from 'lucide-react';
import { api } from '../../services/api';
import { useToast } from '../../context/ToastContext';

export const NoteEditorModal = ({ isOpen, onClose, onSaved, initialData = null }) => {
  const { addToast } = useToast();
  const [clients, setClients] = useState([]);
  const [formData, setFormData] = useState({
    clientId: '',
    title: 'Clinical Progress & SOAP Note',
    sessionDate: new Date().toISOString().split('T')[0],
    sessionNumber: 1,
    isSharedWithClient: false,
    soap: {
      subjective: '',
      objective: '',
      assessment: '',
      plan: ''
    },
    clientSharedSummary: {
      takeaways: '',
      actionItems: [''],
      copingTools: ['']
    },
    riskAssessment: {
      level: 'None / Low Risk',
      safetyPlanDiscussed: false
    },
    tags: ['CBT', 'Clinical Record']
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
          title: initialData.title || `Session Note - ${new Date().toLocaleDateString()}`,
          sessionDate: initialData.sessionDate || initialData.date || new Date().toISOString().split('T')[0],
          sessionNumber: initialData.sessionNumber || 1,
          isSharedWithClient: initialData.isSharedWithClient || false,
          soap: {
            subjective: initialData.draftSoapSubjective || initialData.soap?.subjective || '',
            objective: initialData.soap?.objective || '',
            assessment: initialData.soap?.assessment || '',
            plan: initialData.soap?.plan || ''
          },
          clientSharedSummary: {
            takeaways: initialData.clientSharedSummary?.takeaways || '',
            actionItems: initialData.clientSharedSummary?.actionItems?.length ? initialData.clientSharedSummary.actionItems : [''],
            copingTools: initialData.clientSharedSummary?.copingTools?.length ? initialData.clientSharedSummary.copingTools : ['']
          },
          riskAssessment: initialData.riskAssessment || {
            level: 'None / Low Risk',
            safetyPlanDiscussed: false
          },
          tags: initialData.tags || ['CBT', 'SOAP Note']
        });
      }
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  // 1-Click CBT Template Pre-fill for demonstration
  const handleLoadTemplate = () => {
    setFormData(prev => ({
      ...prev,
      title: 'Session 9: Cognitive Restructuring & Grounding',
      soap: {
        subjective: 'Client arrived on time. Reported situational anxiety (5/10) regarding upcoming public speaking engagement. Noted satisfactory adherence to sleep routine but reported tension headaches when multitasking.',
        objective: 'Client was alert, oriented x4, dressed appropriately. Normal speech rate and prosody. Engaged attentively during thought log exercises.',
        assessment: 'Good progress in catching automatic catastrophizing thoughts ("What if I freeze?"). Demonstrates solid mastery of physiological sigh and 5-4-3-2-1 sensory anchoring.',
        plan: '1. Execute behavioral exposure hierarchy: speak up during 1 team standup before Friday. 2. Continue daily thought logs. 3. Protect 15-minute workday cutoff buffer.'
      },
      clientSharedSummary: {
        takeaways: 'Remember that bodily arousal (accelerated heart rate) is normal excitement/energy, not proof of impending danger. Thoughts are hypotheses to test, not established facts.',
        actionItems: [
          'Practice 5-4-3-2-1 sensory grounding at least twice this week',
          'Complete 2 thought-record tables before Friday standup'
        ],
        copingTools: ['5-4-3-2-1 Grounding', 'Physiological Sigh', 'Thought Record Sheet']
      },
      isSharedWithClient: true
    }));
    addToast('Pre-loaded evidence-based CBT SOAP template', 'info');
  };

  const handleActionItemChange = (index, value) => {
    const updated = [...formData.clientSharedSummary.actionItems];
    updated[index] = value;
    setFormData({
      ...formData,
      clientSharedSummary: { ...formData.clientSharedSummary, actionItems: updated }
    });
  };

  const addActionItem = () => {
    setFormData({
      ...formData,
      clientSharedSummary: {
        ...formData.clientSharedSummary,
        actionItems: [...formData.clientSharedSummary.actionItems, '']
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.clientId) {
      addToast('Please select a client', 'error');
      return;
    }

    try {
      setLoading(true);
      const cleanedActionItems = formData.clientSharedSummary.actionItems.filter(i => i.trim().length > 0);
      const payload = {
        ...formData,
        clientSharedSummary: {
          ...formData.clientSharedSummary,
          actionItems: cleanedActionItems
        }
      };

      if (initialData?._id) {
        await api.updateNote(initialData._id, payload);
        addToast('SOAP note updated and digitally signed', 'success');
      } else {
        await api.createNote(payload);
        addToast('New clinical SOAP note recorded and signed', 'success');
      }
      onSaved();
      onClose();
    } catch (err) {
      addToast(err.message || 'Error saving note', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
      <div className="bg-white rounded-3xl w-full max-w-4xl border border-purple-100 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-brand-50 text-brand-600">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                {initialData?._id ? 'Edit Clinical SOAP Note' : 'New Clinical SOAP Note'}
              </h3>
              <p className="text-xs text-slate-400">Standardized Subjective, Objective, Assessment & Plan Record</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={handleLoadTemplate}
              className="px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-brand-700 text-xs font-bold border border-purple-200 flex items-center space-x-1 transition"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Fill CBT Template</span>
            </button>
            <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Note Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto flex-1">
          {/* Metadata Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                Client *
              </label>
              <select
                value={formData.clientId}
                onChange={(e) => setFormData({ ...formData, clientId: e.target.value })}
                className="mt-1.5 w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-brand-500/30 bg-white"
                required
              >
                {clients.map((c) => (
                  <option key={c._id} value={c._id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                Session Date
              </label>
              <input
                type="date"
                value={formData.sessionDate}
                onChange={(e) => setFormData({ ...formData, sessionDate: e.target.value })}
                className="mt-1.5 w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-brand-500/30"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                Note Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Session 8: Cognitive Distortions"
                className="mt-1.5 w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-brand-500/30"
              />
            </div>
          </div>

          {/* Privacy Toggle Box (Crucial project feature) */}
          <div className={`p-4 rounded-2xl border transition-all ${
            formData.isSharedWithClient
              ? 'bg-purple-50/70 border-brand-200 text-brand-900'
              : 'bg-slate-50 border-slate-200 text-slate-800'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                {formData.isSharedWithClient ? (
                  <Share2 className="w-5 h-5 text-brand-600 flex-shrink-0" />
                ) : (
                  <Lock className="w-5 h-5 text-slate-500 flex-shrink-0" />
                )}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider">
                    {formData.isSharedWithClient
                      ? 'Client Shared Summary Enabled'
                      : 'Private Clinician Only (Confidential)'}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {formData.isSharedWithClient
                      ? 'The client will see only the "Client Shared Takeaways & Homework" section in their portal. Internal clinical analysis remains confidential.'
                      : 'This entire clinical record is locked to therapist eyes only. Nothing is visible in the client portal.'}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setFormData({ ...formData, isSharedWithClient: !formData.isSharedWithClient })}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                  formData.isSharedWithClient
                    ? 'bg-brand-600 text-white shadow-xs'
                    : 'bg-white border border-slate-300 text-slate-700'
                }`}
              >
                {formData.isSharedWithClient ? 'Disable Sharing' : 'Enable Client Summary'}
              </button>
            </div>
          </div>

          {/* SOAP Architecture Grid */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-800">
              Clinical SOAP Formulation
            </h4>

            {/* Subjective */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                (S) Subjective — Client Presentation & Reported Symptoms
              </label>
              <textarea
                value={formData.soap.subjective}
                onChange={(e) => setFormData({ ...formData, soap: { ...formData.soap, subjective: e.target.value } })}
                placeholder="Client reports feelings, mood rating (e.g. 6/10), stressors since last session, changes in sleep or appetite..."
                rows={3}
                className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-brand-500/30 leading-relaxed"
              />
            </div>

            {/* Objective */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                (O) Objective — Clinician Mental Status & Behavioral Observations
              </label>
              <textarea
                value={formData.soap.objective}
                onChange={(e) => setFormData({ ...formData, soap: { ...formData.soap, objective: e.target.value } })}
                placeholder="Grooming, eye contact, affect congruent with mood, speech rate, psychomotor alertness..."
                rows={3}
                className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-brand-500/30 leading-relaxed"
              />
            </div>

            {/* Assessment */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                (A) Assessment — Clinical Formulation & Treatment Progress
              </label>
              <textarea
                value={formData.soap.assessment}
                onChange={(e) => setFormData({ ...formData, soap: { ...formData.soap, assessment: e.target.value } })}
                placeholder="Diagnostic formulation, response to interventions, progress towards measurable goals..."
                rows={3}
                className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-brand-500/30 leading-relaxed"
              />
            </div>

            {/* Plan */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                (P) Plan — Clinical Interventions & Homework Assigned
              </label>
              <textarea
                value={formData.soap.plan}
                onChange={(e) => setFormData({ ...formData, soap: { ...formData.soap, plan: e.target.value } })}
                placeholder="Interventions practiced, next session target focus, frequency of sessions..."
                rows={3}
                className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-brand-500/30 leading-relaxed"
              />
            </div>
          </div>

          {/* Client Shared Summary (Visible if enabled) */}
          {formData.isSharedWithClient && (
            <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-4 animate-in fade-in">
              <div className="flex items-center space-x-2 text-emerald-800">
                <Share2 className="w-4 h-4" />
                <h4 className="text-xs font-bold uppercase tracking-wider">
                  Client Portal Takeaway Summary & Homework
                </h4>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-emerald-900 mb-1">
                  Empowering Session Takeaway (Written for Client)
                </label>
                <textarea
                  value={formData.clientSharedSummary.takeaways}
                  onChange={(e) => setFormData({
                    ...formData,
                    clientSharedSummary: { ...formData.clientSharedSummary, takeaways: e.target.value }
                  })}
                  placeholder="e.g. You proved this week that thoughts are internal hypotheses, not facts. When chest tightness happens, practice 5-4-3-2-1..."
                  rows={2}
                  className="w-full p-3 rounded-xl border border-emerald-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/30 bg-white leading-relaxed"
                />
              </div>

              {/* Action items */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-[11px] font-bold text-emerald-900">
                    Client Action Items / Homework
                  </label>
                  <button
                    type="button"
                    onClick={addActionItem}
                    className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center space-x-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Item</span>
                  </button>
                </div>

                {formData.clientSharedSummary.actionItems.map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => handleActionItemChange(idx, e.target.value)}
                      placeholder={`Action item ${idx + 1}`}
                      className="w-full px-3 py-2 rounded-xl border border-emerald-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/30 bg-white"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Risk Assessment */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center space-x-2">
              <ShieldAlert className="w-4 h-4 text-brand-600 flex-shrink-0" />
              <span className="font-bold text-slate-700">Risk Assessment:</span>
              <select
                value={formData.riskAssessment.level}
                onChange={(e) => setFormData({ ...formData, riskAssessment: { ...formData.riskAssessment, level: e.target.value } })}
                className="px-2.5 py-1 rounded-lg border border-slate-200 bg-white text-xs font-semibold"
              >
                <option value="None / Low Risk">None / Low Risk</option>
                <option value="Moderate - Monitored">Moderate - Monitored</option>
                <option value="High Risk - Safety Plan Active">High Risk - Safety Plan Active</option>
              </select>
            </div>

            <div className="flex items-center space-x-1.5 text-slate-500">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Digital Clinician Signature Active</span>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-end space-x-3 border-t border-slate-100">
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
              {loading ? 'Signing...' : initialData?._id ? 'Update Note' : 'Sign & Save SOAP Note'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
