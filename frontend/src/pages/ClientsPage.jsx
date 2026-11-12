import React, { useState, useEffect } from 'react';
import {
  Users,
  Search,
  Plus,
  Filter,
  Phone,
  Mail,
  Calendar,
  MessageSquare,
  FileText,
  ChevronRight,
  MoreVertical,
  Trash2,
  Edit
} from 'lucide-react';
import { api } from '../services/api';
import { useToast } from '../context/ToastContext';
import { ClientModal } from '../components/clients/ClientModal';

export const ClientsPage = ({
  onSelectClient,
  onBookSession,
  onWriteNote,
  onOpenChat
}) => {
  const { addToast } = useToast();
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState(null);

  const fetchClients = async () => {
    try {
      setLoading(true);
      const res = await api.getClients({ search: searchTerm, status: statusFilter });
      if (res.success) {
        setClients(res.clients);
      }
    } catch (err) {
      addToast(err.message || 'Error loading clients', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, [statusFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchClients();
  };

  const handleDeleteClient = async (e, id) => {
    e.stopPropagation();
    if (!window.confirm('Are you sure you want to delete this client record?')) return;
    try {
      await api.deleteClient(id);
      addToast('Client removed from active roster', 'info');
      fetchClients();
    } catch (err) {
      addToast('Error removing client', 'error');
    }
  };

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Top Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Search Input */}
        <form onSubmit={handleSearchSubmit} className="relative flex-1 max-w-md">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by client name, email, or diagnosis..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 text-xs sm:text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 shadow-xs"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
        </form>

        {/* Filter Pills & Add Client Button */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1 p-1 bg-white border border-slate-200/80 rounded-2xl shadow-xs">
            {['All', 'Active', 'On-Hold', 'Completed'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                  statusFilter === st
                    ? 'bg-brand-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              setEditingClient(null);
              setModalOpen(true);
            }}
            className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-sm shadow-brand-600/30 transition active:scale-95 flex-shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Add Client</span>
          </button>
        </div>
      </div>

      {/* Clients Grid */}
      {loading ? (
        <div className="p-12 text-center text-slate-400">
          <div className="w-8 h-8 border-3 border-brand-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
          <p className="text-xs font-semibold">Loading practice roster...</p>
        </div>
      ) : clients.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clients.map((client) => (
            <div
              key={client._id}
              onClick={() => onSelectClient(client._id)}
              className="bg-white rounded-3xl p-6 border border-slate-100 shadow-soft hover:shadow-soft-lg hover:border-brand-200 transition duration-200 cursor-pointer flex flex-col justify-between space-y-4 group"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src={client.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(client.name)}`}
                      alt={client.name}
                      className="w-12 h-12 rounded-2xl object-cover ring-2 ring-purple-100 group-hover:ring-brand-300 transition"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-brand-600 transition flex items-center gap-1.5">
                        <span>{client.name}</span>
                      </h4>
                      <p className="text-xs text-slate-400 truncate">{client.email}</p>
                    </div>
                  </div>

                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    client.status === 'Active' ? 'bg-emerald-100 text-emerald-700' :
                    client.status === 'On-Hold' ? 'bg-amber-100 text-amber-700' :
                    'bg-slate-100 text-slate-600'
                  }`}>
                    {client.status}
                  </span>
                </div>

                {/* Diagnostic condition tag */}
                <div className="mt-4 p-2.5 rounded-xl bg-purple-50/60 border border-purple-100/70">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Clinical Condition</span>
                  <span className="text-xs font-semibold text-brand-900 line-clamp-1">
                    {client.primaryDiagnosis || 'Therapy Client'}
                  </span>
                </div>

                <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                  <span>Sessions: <strong className="text-slate-800">{client.sessionsCompleted || 6}</strong></span>
                  <span>Notes: <strong className="text-brand-700">{client.notesCount || 6}</strong></span>
                  <span>Modality: <strong className="text-slate-700">{client.preferredSessionType?.split(' ')[0] || 'Video'}</strong></span>
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onBookSession(client);
                  }}
                  className="text-xs font-semibold text-brand-600 hover:text-brand-800 flex items-center space-x-1"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Schedule</span>
                </button>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenChat(client);
                    }}
                    className="p-1.5 text-slate-400 hover:text-brand-600 hover:bg-purple-50 rounded-lg transition"
                    title="Send Secure Message"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingClient(client);
                      setModalOpen(true);
                    }}
                    className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-50 rounded-lg transition"
                    title="Edit Client Profile"
                  >
                    <Edit className="w-4 h-4" />
                  </button>

                  <button
                    onClick={(e) => handleDeleteClient(e, client._id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                    title="Delete Client"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 shadow-soft">
          <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">No client records found</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Try adjusting your search terms or add a new client to start clinical tracking.
          </p>
        </div>
      )}

      {/* Client Modal */}
      <ClientModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSaved={fetchClients}
        initialData={editingClient}
      />
    </div>
  );
};
