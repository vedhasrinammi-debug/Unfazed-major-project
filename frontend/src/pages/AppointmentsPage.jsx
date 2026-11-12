import React, { useState, useEffect } from 'react';
import {
  Calendar as CalendarIcon,
  Clock,
  Video,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  User,
  FileText
} from 'lucide-react';
import { api } from '../services/api';
import { useToast } from '../context/ToastContext';
import { AppointmentModal } from '../components/appointments/AppointmentModal';
import { VideoSessionModal } from '../components/appointments/VideoSessionModal';

export const AppointmentsPage = ({ onOpenNewNote }) => {
  const { addToast } = useToast();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('All');
  const [activeModal, setActiveModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [videoSessionAppt, setVideoSessionAppt] = useState(null);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const res = await api.getAppointments({ status: statusFilter });
      if (res.success) {
        setAppointments(res.appointments);
      }
    } catch (err) {
      addToast(err.message || 'Error loading appointments', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [statusFilter]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await api.updateAppointment(id, { status: newStatus });
      addToast(`Appointment marked as ${newStatus}`, 'success');
      fetchAppointments();
    } catch (err) {
      addToast('Failed to update status', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to cancel and remove this appointment?')) return;
    try {
      await api.deleteAppointment(id);
      addToast('Appointment cancelled', 'info');
      fetchAppointments();
    } catch (err) {
      addToast('Error deleting appointment', 'error');
    }
  };

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Top Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Status Filters */}
        <div className="flex items-center space-x-1.5 p-1 bg-white border border-slate-200/80 rounded-2xl shadow-xs overflow-x-auto">
          {['All', 'Scheduled', 'Completed', 'Cancelled'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
                statusFilter === status
                  ? 'bg-brand-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Action Button */}
        <button
          onClick={() => {
            setSelectedAppointment(null);
            setActiveModal(true);
          }}
          className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-sm shadow-brand-600/30 transition active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Schedule Appointment</span>
        </button>
      </div>

      {/* Appointments List View */}
      {loading ? (
        <div className="p-12 text-center text-slate-400">
          <div className="w-8 h-8 border-3 border-brand-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
          <p className="text-xs font-medium">Loading clinical calendar...</p>
        </div>
      ) : appointments.length > 0 ? (
        <div className="space-y-3">
          {appointments.map((appt) => (
            <div
              key={appt._id}
              className="bg-white rounded-2xl p-5 border border-slate-100 shadow-soft hover:shadow-soft-lg transition duration-150 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            >
              {/* Left Details */}
              <div className="flex items-start sm:items-center space-x-4">
                <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-100 text-brand-700 flex flex-col items-center justify-center font-bold flex-shrink-0">
                  <span className="text-[10px] uppercase font-mono">{appt.date.split('-')[1]}/{appt.date.split('-')[2]}</span>
                  <span className="text-xs font-extrabold">{appt.startTime.split(' ')[0]}</span>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="text-sm font-bold text-slate-900">{appt.clientName}</h4>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      appt.type === 'Video session' ? 'bg-purple-100 text-brand-700' : 'bg-emerald-100 text-emerald-700'
                    }`}>
                      {appt.type}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      appt.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                      appt.status === 'Scheduled' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                      'bg-rose-50 text-rose-700 border border-rose-200'
                    }`}>
                      {appt.status}
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 flex flex-wrap items-center gap-x-2">
                    <span>{appt.date}</span>
                    <span>•</span>
                    <span>{appt.startTime} – {appt.endTime} ({appt.durationMinutes} mins)</span>
                    <span>•</span>
                    <span>Fee: ${appt.sessionFee}</span>
                  </p>

                  {appt.clientGoalsSummary && (
                    <p className="text-[11px] text-slate-400 italic">
                      Goal: "{appt.clientGoalsSummary}"
                    </p>
                  )}
                </div>
              </div>

              {/* Right Action Buttons */}
              <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
                {appt.type === 'Video session' && appt.status !== 'Completed' && (
                  <button
                    onClick={() => setVideoSessionAppt(appt)}
                    className="px-3.5 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-xs flex items-center space-x-1.5 transition active:scale-95"
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>Launch Telehealth</span>
                  </button>
                )}

                {appt.status === 'Scheduled' && (
                  <button
                    onClick={() => handleStatusChange(appt._id, 'Completed')}
                    className="px-3 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-semibold transition"
                  >
                    Mark Done
                  </button>
                )}

                {onOpenNewNote && (
                  <button
                    onClick={() => onOpenNewNote(appt)}
                    className="px-3 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-brand-700 border border-purple-200 text-xs font-semibold flex items-center space-x-1 transition"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>{appt.notesCompleted ? 'View Note' : 'Enter SOAP Note'}</span>
                  </button>
                )}

                <button
                  onClick={() => handleDelete(appt._id)}
                  className="px-2.5 py-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 text-xs font-semibold transition"
                  title="Cancel Appointment"
                >
                  <XCircle className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 shadow-soft">
          <CalendarIcon className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">No appointments found</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            No consultations matching the filter criteria. Schedule new appointments to fill your calendar.
          </p>
          <button
            onClick={() => {
              setSelectedAppointment(null);
              setActiveModal(true);
            }}
            className="mt-4 px-4 py-2 rounded-xl bg-brand-600 text-white font-bold text-xs"
          >
            + Book Appointment
          </button>
        </div>
      )}

      {/* Appointment Booking Modal */}
      <AppointmentModal
        isOpen={activeModal}
        onClose={() => setActiveModal(false)}
        onSaved={fetchAppointments}
        initialData={selectedAppointment}
      />

      {/* Live Telehealth Room Modal */}
      {videoSessionAppt && (
        <VideoSessionModal
          appointment={videoSessionAppt}
          onClose={() => setVideoSessionAppt(null)}
          onFinishSessionWithNote={(appt, inCallNotes) => {
            setVideoSessionAppt(null);
            fetchAppointments();
            if (onOpenNewNote) {
              onOpenNewNote({ ...appt, draftSoapSubjective: inCallNotes });
            }
          }}
        />
      )}
    </div>
  );
};
