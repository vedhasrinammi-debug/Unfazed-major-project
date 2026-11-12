import React, { useState, useEffect } from 'react';
import {
  Mic,
  MicOff,
  Video as VideoIcon,
  VideoOff,
  PhoneOff,
  Share2,
  FileText,
  ShieldCheck,
  Maximize2,
  Volume2,
  Users,
  Clock,
  Sparkles,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export const VideoSessionModal = ({ appointment, onClose, onFinishSessionWithNote }) => {
  const { user } = useAuth();
  const { addToast } = useToast();

  const [micOn, setMicOn] = useState(true);
  const [cameraOn, setCameraOn] = useState(true);
  const [showNotesDrawer, setShowNotesDrawer] = useState(true);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [inCallNotes, setInCallNotes] = useState('');

  // Call timer
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsElapsed((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const handleEndCall = () => {
    addToast('Telehealth session concluded safely', 'info');
    if (onFinishSessionWithNote) {
      onFinishSessionWithNote(appointment, inCallNotes);
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-6xl h-[92vh] flex flex-col overflow-hidden shadow-2xl relative">
        {/* Top Video Header */}
        <div className="h-16 bg-slate-900/90 border-b border-slate-800 px-6 flex items-center justify-between text-white">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center text-white font-bold">
              U
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-bold text-white">Telehealth Room</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Encrypted HD
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Session with <span className="text-white font-medium">{appointment?.clientName || 'Client'}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Call Duration */}
            <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700 text-xs font-mono text-purple-200">
              <Clock className="w-3.5 h-3.5 text-brand-400" />
              <span>{formatTimer(secondsElapsed)}</span>
            </div>

            <div className="hidden sm:flex items-center space-x-1.5 text-xs text-slate-400">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>HIPAA BAA Verified</span>
            </div>
          </div>
        </div>

        {/* Video Stage + Notes Split Area */}
        <div className="flex-1 flex overflow-hidden">
          {/* Main Video Viewports */}
          <div className="flex-1 p-4 grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-950 relative">
            {/* Client Viewport */}
            <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 flex items-center justify-center shadow-lg group">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800"
                alt="Client Video Stream"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-slate-900/70 backdrop-blur-md text-white text-xs font-semibold flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>{appointment?.clientName || 'Elena Vance'}</span>
              </div>
              <div className="absolute bottom-4 right-4 p-2 rounded-full bg-slate-900/70 text-emerald-400">
                <Volume2 className="w-4 h-4" />
              </div>
            </div>

            {/* Therapist Viewport (Self) */}
            <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 flex items-center justify-center shadow-lg">
              {cameraOn ? (
                <img
                  src={user?.avatar || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=800'}
                  alt="Therapist Video Stream"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center space-y-2 text-slate-500">
                  <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 font-bold text-lg">
                    {user?.name?.[0] || 'Dr'}
                  </div>
                  <span className="text-xs">Camera is Off</span>
                </div>
              )}

              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-slate-900/70 backdrop-blur-md text-white text-xs font-semibold flex items-center space-x-2">
                <span>You ({user?.name?.split(',')[0] || 'Dr. Mitchell'})</span>
                {!micOn && <span className="text-rose-400 font-bold">(Muted)</span>}
              </div>
            </div>
          </div>

          {/* In-Call Notes Drawer */}
          {showNotesDrawer && (
            <div className="w-80 sm:w-96 bg-slate-900 border-l border-slate-800 flex flex-col justify-between p-4 animate-in slide-in-from-right duration-200">
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <div className="flex items-center space-x-2 text-purple-300">
                    <FileText className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">In-Session Clinical Scratchpad</span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-400">
                  Jot quick bullet points during the consultation. These will auto-populate into your formal SOAP note when the call ends.
                </p>

                <textarea
                  value={inCallNotes}
                  onChange={(e) => setInCallNotes(e.target.value)}
                  placeholder="• Client reports SUDS dropped from 8/10 to 4/10&#10;• Practiced 5-4-3-2-1 grounding technique&#10;• Homework: 2 thought records before next Tuesday..."
                  rows={14}
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-brand-500 font-mono resize-none leading-relaxed"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Encrypted private clinician scratchpad</span>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Control Bar */}
        <div className="h-20 bg-slate-900 border-t border-slate-800 px-6 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="hidden sm:inline">Room ID: room-{appointment?._id?.slice(-6) || '49120'}</span>
          </div>

          {/* Core Controls */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setMicOn(!micOn)}
              className={`p-3.5 rounded-2xl transition active:scale-95 ${
                micOn ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-rose-600 text-white hover:bg-rose-700'
              }`}
              title={micOn ? 'Mute Mic' : 'Unmute Mic'}
            >
              {micOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
            </button>

            <button
              onClick={() => setCameraOn(!cameraOn)}
              className={`p-3.5 rounded-2xl transition active:scale-95 ${
                cameraOn ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-rose-600 text-white hover:bg-rose-700'
              }`}
              title={cameraOn ? 'Stop Camera' : 'Start Camera'}
            >
              {cameraOn ? <VideoIcon className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
            </button>

            <button
              onClick={() => setShowNotesDrawer(!showNotesDrawer)}
              className={`p-3.5 rounded-2xl transition active:scale-95 ${
                showNotesDrawer ? 'bg-brand-600 text-white' : 'bg-slate-800 text-white hover:bg-slate-700'
              }`}
              title="Toggle Clinical Scratchpad"
            >
              <FileText className="w-5 h-5" />
            </button>

            {/* End Call Button */}
            <button
              onClick={handleEndCall}
              className="px-5 py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs sm:text-sm flex items-center space-x-2 shadow-lg shadow-rose-600/30 transition active:scale-95"
            >
              <PhoneOff className="w-4 h-4" />
              <span>End Session & Sign Note</span>
            </button>
          </div>

          <div className="w-20 hidden md:block"></div>
        </div>
      </div>
    </div>
  );
};
