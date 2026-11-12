import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';
import { Sidebar } from './components/common/Sidebar';
import { Header } from './components/common/Header';

// Pages
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { DashboardPage } from './pages/DashboardPage';
import { ClientsPage } from './pages/ClientsPage';
import { ClientDetailPage } from './pages/ClientDetailPage';
import { AppointmentsPage } from './pages/AppointmentsPage';
import { NotesPage } from './pages/NotesPage';
import { PaymentsPage } from './pages/PaymentsPage';
import { ChatPage } from './pages/ChatPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { PlansPage } from './pages/PlansPage';
import { SettingsPage } from './pages/SettingsPage';

// Modals
import { VideoSessionModal } from './components/appointments/VideoSessionModal';
import { AppointmentModal } from './components/appointments/AppointmentModal';
import { ClientModal } from './components/clients/ClientModal';
import { NoteEditorModal } from './components/notes/NoteEditorModal';

export function App() {
  const { isAuthenticated, loading, demoLogin } = useAuth();

  // Public views: 'landing', 'login', 'register'
  const [publicView, setPublicView] = useState('landing');

  // Authenticated workspace tabs:
  // 'dashboard', 'clients', 'appointments', 'notes', 'payments', 'chat', 'analytics', 'plans', 'settings'
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Client drill-down
  const [selectedClientId, setSelectedClientId] = useState(null);

  // Global modals
  const [videoSessionAppt, setVideoSessionAppt] = useState(null);
  const [appointmentModalOpen, setAppointmentModalOpen] = useState(false);
  const [clientModalOpen, setClientModalOpen] = useState(false);
  const [noteModalOpen, setNoteModalOpen] = useState(false);
  const [noteDraftData, setNoteDraftData] = useState(null);
  const [chatTargetClient, setChatTargetClient] = useState(null);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF9FF] flex items-center justify-center">
        <div className="flex flex-col items-center space-y-3">
          <div className="w-10 h-10 border-4 border-brand-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Starting UNFAZED Platform...</p>
        </div>
      </div>
    );
  }

  // Unauthenticated Public Flow
  if (!isAuthenticated) {
    if (publicView === 'login') {
      return (
        <LoginPage
          onNavigateToRegister={() => setPublicView('register')}
          onNavigateToLanding={() => setPublicView('landing')}
        />
      );
    }

    if (publicView === 'register') {
      return (
        <RegisterPage
          onNavigateToLogin={() => setPublicView('login')}
          onNavigateToLanding={() => setPublicView('landing')}
        />
      );
    }

    return (
      <LandingPage
        onNavigateToLogin={() => setPublicView('login')}
        onNavigateToRegister={() => setPublicView('register')}
        onQuickDemo={async () => {
          await demoLogin();
        }}
      />
    );
  }

  // Handler helpers
  const handleOpenNewAppointment = (client = null) => {
    setAppointmentModalOpen(true);
  };

  const handleOpenNewClient = () => {
    setClientModalOpen(true);
  };

  const handleOpenNewNote = (draft = null) => {
    setNoteDraftData(draft);
    setNoteModalOpen(true);
  };

  const handleStartChatWithClient = (client) => {
    setChatTargetClient(client);
    setActiveTab('chat');
  };

  const handleNavigateTab = (tab) => {
    setSelectedClientId(null);
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen bg-[#FAF9FF] flex flex-col font-sans">
      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={handleNavigateTab}
        mobileOpen={mobileSidebarOpen}
        setMobileOpen={setMobileSidebarOpen}
        unreadChatCount={1}
      />

      {/* Main Content Area */}
      <div className="lg:pl-72 flex flex-col min-h-screen">
        {/* Sticky Header */}
        <Header
          activeTab={activeTab}
          setMobileOpen={setMobileSidebarOpen}
          onQuickAction={
            activeTab === 'clients'
              ? handleOpenNewClient
              : activeTab === 'notes'
              ? () => handleOpenNewNote(null)
              : handleOpenNewAppointment
          }
          quickActionLabel={
            activeTab === 'clients'
              ? 'Add Client'
              : activeTab === 'notes'
              ? 'New SOAP Note'
              : 'New Appointment'
          }
        />

        {/* Tab Page Router */}
        <main className="flex-1 pb-12">
          {activeTab === 'dashboard' && (
            <DashboardPage
              onNavigateTab={handleNavigateTab}
              onOpenVideoSession={(appt) => setVideoSessionAppt(appt)}
              onOpenNewAppointment={handleOpenNewAppointment}
              onOpenNewClient={handleOpenNewClient}
              onOpenNewNote={() => handleOpenNewNote(null)}
            />
          )}

          {activeTab === 'clients' && (
            selectedClientId ? (
              <ClientDetailPage
                clientId={selectedClientId}
                onBack={() => setSelectedClientId(null)}
                onBookAppointment={(client) => handleOpenNewAppointment(client)}
                onWriteNote={(client) => handleOpenNewNote({ clientId: client._id, clientName: client.name })}
                onStartChat={handleStartChatWithClient}
                onEditClient={(client) => {
                  setSelectedClientId(client._id);
                  setClientModalOpen(true);
                }}
              />
            ) : (
              <ClientsPage
                onSelectClient={(id) => setSelectedClientId(id)}
                onBookSession={(client) => handleOpenNewAppointment(client)}
                onWriteNote={(client) => handleOpenNewNote({ clientId: client._id, clientName: client.name })}
                onOpenChat={handleStartChatWithClient}
              />
            )
          )}

          {activeTab === 'appointments' && (
            <AppointmentsPage
              onOpenNewNote={(appt) => handleOpenNewNote(appt)}
            />
          )}

          {activeTab === 'notes' && (
            <NotesPage
              initialDraft={noteDraftData}
            />
          )}

          {activeTab === 'payments' && (
            <PaymentsPage />
          )}

          {activeTab === 'chat' && (
            <ChatPage
              defaultClientId={chatTargetClient?._id}
            />
          )}

          {activeTab === 'analytics' && (
            <AnalyticsPage />
          )}

          {activeTab === 'plans' && (
            <PlansPage />
          )}

          {activeTab === 'settings' && (
            <SettingsPage />
          )}
        </main>
      </div>

      {/* Global Modals */}
      {videoSessionAppt && (
        <VideoSessionModal
          appointment={videoSessionAppt}
          onClose={() => setVideoSessionAppt(null)}
          onFinishSessionWithNote={(appt, inCallNotes) => {
            setVideoSessionAppt(null);
            handleOpenNewNote({
              clientId: appt.clientId,
              clientName: appt.clientName,
              appointmentId: appt._id,
              draftSoapSubjective: inCallNotes
            });
          }}
        />
      )}

      <AppointmentModal
        isOpen={appointmentModalOpen}
        onClose={() => setAppointmentModalOpen(false)}
        onSaved={() => {}}
      />

      <ClientModal
        isOpen={clientModalOpen}
        onClose={() => setClientModalOpen(false)}
        onSaved={() => {}}
      />

      <NoteEditorModal
        isOpen={noteModalOpen}
        onClose={() => {
          setNoteModalOpen(false);
          setNoteDraftData(null);
        }}
        onSaved={() => {}}
        initialData={noteDraftData}
      />
    </div>
  );
}

export default App;
