import React, { useState, useEffect } from 'react';
import {
  FileText,
  Lock,
  Share2,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  Trash2,
  Edit,
  ShieldCheck,
  ChevronDown,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { api } from '../services/api';
import { useToast } from '../context/ToastContext';
import { NoteEditorModal } from '../components/notes/NoteEditorModal';

export const NotesPage = ({ initialDraft = null }) => {
  const { addToast } = useToast();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sharedFilter, setSharedFilter] = useState('All'); // All, Shared, Private
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(initialDraft);
  const [expandedNoteId, setExpandedNoteId] = useState(null);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      let isSharedParam = '';
      if (sharedFilter === 'Shared') isSharedParam = 'true';
      if (sharedFilter === 'Private') isSharedParam = 'false';

      const res = await api.getNotes({ search: searchTerm, isShared: isSharedParam });
      if (res.success) {
        setNotes(res.notes);
        if (res.notes.length > 0 && !expandedNoteId) {
          setExpandedNoteId(res.notes[0]._id);
        }
      }
    } catch (err) {
      addToast(err.message || 'Error loading clinical notes', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [sharedFilter]);

  useEffect(() => {
    if (initialDraft) {
      setSelectedNote(initialDraft);
      setModalOpen(true);
    }
  }, [initialDraft]);

  const handleToggleSharing = async (e, noteId) => {
    e.stopPropagation();
    try {
      const res = await api.toggleNoteSharing(noteId);
      if (res.success) {
        addToast(res.message, 'success');
        fetchNotes();
      }
    } catch (err) {
      addToast('Error toggling note privacy', 'error');
    }
  };

  const handleDelete = async (e, noteId) => {
    e.stopPropagation();
    if (!window.confirm('Delete this clinical note?')) return;
    try {
      await api.deleteNote(noteId);
      addToast('Note deleted', 'info');
      fetchNotes();
    } catch (err) {
      addToast('Error deleting note', 'error');
    }
  };

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Top Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && fetchNotes()}
            placeholder="Search notes by client, diagnosis, or SOAP text..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 text-xs sm:text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/30 shadow-xs"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
        </div>

        {/* Filter Pills & Add Button */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1 p-1 bg-white border border-slate-200/80 rounded-2xl shadow-xs">
            {['All', 'Shared', 'Private'].map((f) => (
              <button
                key={f}
                onClick={() => setSharedFilter(f)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                  sharedFilter === f
                    ? 'bg-brand-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {f === 'Shared' ? 'Client Shared' : f === 'Private' ? 'Private Only' : 'All Notes'}
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              setSelectedNote(null);
              setModalOpen(true);
            }}
            className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-sm shadow-brand-600/30 transition active:scale-95 flex-shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>New SOAP Note</span>
          </button>
        </div>
      </div>

      {/* Notes List */}
      {loading ? (
        <div className="p-12 text-center text-slate-400">
          <div className="w-8 h-8 border-3 border-brand-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
          <p className="text-xs font-semibold">Loading clinical notes archive...</p>
        </div>
      ) : notes.length > 0 ? (
        <div className="space-y-4">
          {notes.map((note) => {
            const isExpanded = expandedNoteId === note._id;

            return (
              <div
                key={note._id}
                className="bg-white rounded-3xl p-6 border border-slate-100 shadow-soft hover:shadow-soft-lg transition-all duration-200 space-y-4"
              >
                {/* Note Header */}
                <div
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer"
                  onClick={() => setExpandedNoteId(isExpanded ? null : note._id)}
                >
                  <div className="flex items-start sm:items-center space-x-3.5">
                    <div className="w-11 h-11 rounded-2xl bg-purple-50 text-brand-700 flex items-center justify-center font-bold flex-shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>

                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="text-sm font-bold text-slate-900">{note.title}</h4>
                        <span className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          note.isSharedWithClient
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                            : 'bg-slate-100 text-slate-700 border border-slate-200'
                        }`}>
                          {note.isSharedWithClient ? (
                            <>
                              <Share2 className="w-3 h-3 text-emerald-600" />
                              <span>Shared with Client</span>
                            </>
                          ) : (
                            <>
                              <Lock className="w-3 h-3 text-slate-500" />
                              <span>Private Clinician</span>
                            </>
                          )}
                        </span>
                      </div>

                      <p className="text-xs text-slate-500 mt-0.5 flex items-center space-x-2">
                        <span className="font-semibold text-brand-700">{note.clientName}</span>
                        <span>•</span>
                        <span>Session #{note.sessionNumber || 1}</span>
                        <span>•</span>
                        <span>{note.sessionDate}</span>
                        <span>•</span>
                        <span className="text-emerald-600 font-medium">Digitally Signed</span>
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2 justify-end">
                    <button
                      onClick={(e) => handleToggleSharing(e, note._id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 ${
                        note.isSharedWithClient
                          ? 'bg-purple-50 text-brand-700 hover:bg-purple-100'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                      title={note.isSharedWithClient ? 'Click to make private' : 'Click to share summary with client'}
                    >
                      {note.isSharedWithClient ? <Lock className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
                      <span>{note.isSharedWithClient ? 'Make Private' : 'Share Summary'}</span>
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedNote(note);
                        setModalOpen(true);
                      }}
                      className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-50 rounded-xl transition"
                      title="Edit Note"
                    >
                      <Edit className="w-4 h-4" />
                    </button>

                    <button
                      onClick={(e) => handleDelete(e, note._id)}
                      className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition"
                      title="Delete Note"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <div className="p-1 text-slate-400">
                      <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                    </div>
                  </div>
                </div>

                {/* Collapsible SOAP Note Content */}
                {isExpanded && (
                  <div className="pt-4 border-t border-slate-100 space-y-4 animate-in fade-in">
                    {/* SOAP 4 Quadrants */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      <div className="p-3.5 rounded-2xl bg-slate-50/70 border border-slate-100">
                        <span className="font-bold text-brand-800 uppercase tracking-wider block mb-1">
                          (S) Subjective
                        </span>
                        <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                          {note.soap?.subjective || 'No subjective report recorded'}
                        </p>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-slate-50/70 border border-slate-100">
                        <span className="font-bold text-brand-800 uppercase tracking-wider block mb-1">
                          (O) Objective
                        </span>
                        <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                          {note.soap?.objective || 'No objective observations recorded'}
                        </p>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-slate-50/70 border border-slate-100">
                        <span className="font-bold text-brand-800 uppercase tracking-wider block mb-1">
                          (A) Assessment
                        </span>
                        <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                          {note.soap?.assessment || 'Diagnostic progress and formulation'}
                        </p>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-slate-50/70 border border-slate-100">
                        <span className="font-bold text-brand-800 uppercase tracking-wider block mb-1">
                          (P) Plan
                        </span>
                        <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                          {note.soap?.plan || 'Treatment intervention and targets'}
                        </p>
                      </div>
                    </div>

                    {/* If Shared: Client Portal Takeaways */}
                    {note.isSharedWithClient && note.clientSharedSummary && (
                      <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 text-xs space-y-2">
                        <div className="flex items-center space-x-1.5 text-emerald-900 font-bold">
                          <Share2 className="w-3.5 h-3.5" />
                          <span>Visible in Client Portal:</span>
                        </div>
                        <p className="text-emerald-800 italic leading-relaxed">
                          "{note.clientSharedSummary.takeaways}"
                        </p>
                        {note.clientSharedSummary.actionItems?.length > 0 && (
                          <div className="pt-1 space-y-1">
                            <span className="font-semibold text-emerald-900 block">Assigned Homework / Action Items:</span>
                            {note.clientSharedSummary.actionItems.map((item, i) => (
                              <div key={i} className="flex items-center space-x-2 text-emerald-700">
                                <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                                <span>{item}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 shadow-soft">
          <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">No clinical notes found</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Write your first SOAP note to securely document therapy sessions.
          </p>
          <button
            onClick={() => {
              setSelectedNote(null);
              setModalOpen(true);
            }}
            className="mt-4 px-4 py-2 rounded-xl bg-brand-600 text-white font-bold text-xs"
          >
            + Create SOAP Note
          </button>
        </div>
      )}

      {/* SOAP Note Modal */}
      <NoteEditorModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSaved={fetchNotes}
        initialData={selectedNote}
      />
    </div>
  );
};
