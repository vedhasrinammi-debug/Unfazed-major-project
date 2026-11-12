import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  User,
  Calendar,
  FileText,
  CreditCard,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  Phone,
  Mail,
  Edit,
  Plus,
  Trash2
} from 'lucide-react';
import { api } from '../services/api';
import { useToast } from '../context/ToastContext';

export const ClientDetailPage = ({
  clientId,
  onBack,
  onBookAppointment,
  onWriteNote,
  onStartChat,
  onEditClient
}) => {
  const { addToast } = useToast();
  const [clientData, setClientData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  const fetchClient = async () => {
    try {
      setLoading(true);
      const res = await api.getClientById(clientId);
      if (res.success) {
        setClientData(res);
      }
    } catch (err) {
      addToast(err.message || 'Error loading client record', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (clientId) fetchClient();
  }, [clientId]);

  if (loading) {
    return (
      <div className="p-12 text-center text-slate-400">
        <div className="w-8 h-8 border-3 border-brand-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
        <p className="text-xs font-semibold">Loading client clinical history...</p>
      </div>
    );
  }

  const client = clientData?.client;
  const related = clientData?.related || { appointments: [], notes: [], payments: [] };

  if (!client) {
    return (
      <div className="p-8 text-center">
        <p className="text-sm font-bold text-slate-700">Client not found</p>
        <button onClick={onBack} className="mt-3 text-xs text-brand-600 underline">Back to Client List</button>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Top Back Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-600 hover:text-brand-600 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Clients</span>
        </button>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => onEditClient(client)}
            className="px-3 py-1.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold flex items-center space-x-1 transition"
          >
            <Edit className="w-3.5 h-3.5" />
            <span>Edit Profile</span>
          </button>
          <button
            onClick={() => onBookAppointment(client)}
            className="px-3.5 py-1.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-xs flex items-center space-x-1 transition"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book Session</span>
          </button>
        </div>
      </div>

      {/* Client Header Card */}
      <div className="bg-white rounded-3xl p-6 border border-purple-100 shadow-soft flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <img
            src={client.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(client.name)}`}
            alt={client.name}
            className="w-16 h-16 rounded-2xl object-cover ring-2 ring-brand-200"
          />
          <div>
            <div className="flex items-center space-x-2.5">
              <h2 className="text-xl font-bold text-slate-900">{client.name}</h2>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                client.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
              }`}>
                {client.status}
              </span>
            </div>
            <p className="text-xs font-semibold text-brand-700 mt-0.5">
              {client.primaryDiagnosis || 'Clinical Therapy Client'}
            </p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-xs text-slate-500">
              <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5 text-slate-400" />{client.email}</span>
              <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5 text-slate-400" />{client.phone}</span>
              <span>Intake: {client.intakeDate}</span>
            </div>
          </div>
        </div>

        {/* Quick Caseload Stats */}
        <div className="flex items-center space-x-4 bg-[#FAF9FF] p-3 rounded-2xl border border-purple-100 text-xs">
          <div className="text-center px-3">
            <span className="block text-slate-400 font-medium">Completed</span>
            <span className="text-base font-bold text-slate-900">{client.sessionsCompleted || related.appointments.length}</span>
          </div>
          <div className="w-px h-8 bg-purple-200" />
          <div className="text-center px-3">
            <span className="block text-slate-400 font-medium">Clinical Notes</span>
            <span className="text-base font-bold text-brand-700">{related.notes.length}</span>
          </div>
          <div className="w-px h-8 bg-purple-200" />
          <div className="text-center px-3">
            <span className="block text-slate-400 font-medium">Total Billed</span>
            <span className="text-base font-bold text-slate-900">${client.totalBilled || 1200}</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-200 pb-2">
        {[
          { id: 'overview', label: 'Treatment Goals & Clinical Profile' },
          { id: 'notes', label: `SOAP Notes (${related.notes.length})` },
          { id: 'sessions', label: `Appointments (${related.appointments.length})` },
          { id: 'billing', label: `Billing & Invoices (${related.payments.length})` },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === tab.id
                ? 'bg-brand-50 text-brand-700 border border-brand-200'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Treatment Goals */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-soft space-y-4">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Clinical Treatment Goals
              </h3>
              <div className="space-y-2.5">
                {client.treatmentGoals && client.treatmentGoals.length > 0 ? (
                  client.treatmentGoals.map((goal, i) => (
                    <div key={i} className="flex items-start space-x-3 p-3 rounded-2xl bg-purple-50/50 border border-purple-100 text-xs">
                      <CheckCircle2 className="w-4 h-4 text-brand-600 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700 font-medium leading-relaxed">{goal}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-400 italic">No specific treatment goals mapped yet</p>
                )}
              </div>
            </div>

            {/* Diagnostic Information */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-soft space-y-3">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Diagnostic Assessment
              </h3>
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-slate-400 font-semibold block">Primary Diagnosis</span>
                  <span className="font-bold text-slate-800">{client.primaryDiagnosis}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-slate-400 font-semibold block">Comorbid / Secondary</span>
                  <span className="font-bold text-slate-800">{client.secondaryDiagnosis || 'None reported'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Emergency Contact & Insurance */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-soft space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Emergency Contact</h4>
              <div className="text-xs space-y-1.5">
                <p className="font-bold text-slate-800">{client.emergencyContact?.name || 'Not provided'}</p>
                <p className="text-slate-500">{client.emergencyContact?.relationship || 'Contact'}</p>
                <p className="font-mono text-brand-600">{client.emergencyContact?.phone || 'N/A'}</p>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-soft space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Insurance & Superbill</h4>
              <div className="text-xs space-y-1.5">
                <p className="font-bold text-slate-800">{client.insurance?.provider || 'Self-Pay'}</p>
                <p className="text-slate-500">Policy: {client.insurance?.policyNumber || 'Out of Network'}</p>
                <p className="text-emerald-600 font-semibold">Copay: ${client.insurance?.copay || 0}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Notes */}
      {activeTab === 'notes' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-800">Clinical SOAP Notes History</h3>
            <button
              onClick={() => onWriteNote({ clientId: client._id, clientName: client.name })}
              className="px-3.5 py-2 rounded-xl bg-brand-600 text-white font-bold text-xs flex items-center space-x-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create SOAP Note</span>
            </button>
          </div>

          {related.notes.length > 0 ? (
            <div className="space-y-3">
              {related.notes.map((note) => (
                <div key={note._id} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-soft space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">{note.title}</span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      note.isSharedWithClient ? 'bg-purple-100 text-brand-700' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {note.isSharedWithClient ? 'Shared Summary' : 'Private Clinician'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-2">{note.soap?.assessment || note.soap?.subjective}</p>
                  <span className="text-[10px] text-slate-400 block">{note.sessionDate}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center bg-white rounded-2xl border border-dashed border-slate-200">
              <p className="text-xs text-slate-500">No notes written for this client yet</p>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Appointments */}
      {activeTab === 'sessions' && (
        <div className="space-y-3">
          {related.appointments.map((a) => (
            <div key={a._id} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-soft flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-slate-800 block">{a.date} at {a.startTime}</span>
                <span className="text-slate-500">{a.type} • {a.locationOrRoom}</span>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-purple-50 text-brand-700 font-bold">{a.status}</span>
            </div>
          ))}
        </div>
      )}

      {/* Tab 4: Billing */}
      {activeTab === 'billing' && (
        <div className="space-y-3">
          {related.payments.map((p) => (
            <div key={p._id} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-soft flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-slate-800 block">{p.invoiceNumber} — ${p.amount}</span>
                <span className="text-slate-500">{p.description} ({p.paymentMethod})</span>
              </div>
              <span className={`px-2.5 py-1 rounded-full font-bold ${p.status === 'Paid' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                {p.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
