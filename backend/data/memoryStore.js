const { v4: uuidv4 } = require('uuid');
const seed = require('./seedData');

// In-memory data collections initialized with rich mock data
class MemoryStore {
  constructor() {
    this.reset();
  }

  reset() {
    this.users = [JSON.parse(JSON.stringify(seed.therapist))];
    this.clients = JSON.parse(JSON.stringify(seed.clients));
    this.appointments = JSON.parse(JSON.stringify(seed.appointments));
    this.notes = JSON.parse(JSON.stringify(seed.notes));
    this.payments = JSON.parse(JSON.stringify(seed.payments));
    this.messages = JSON.parse(JSON.stringify(seed.messages));
    this.plans = JSON.parse(JSON.stringify(seed.plans));
  }

  // User methods
  findUserByEmail(email) {
    return this.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  findUserById(id) {
    return this.users.find(u => u._id === id || u._id === id?.toString());
  }

  createUser(userData) {
    const newUser = {
      _id: uuidv4().replace(/-/g, '').slice(0, 24),
      createdAt: new Date().toISOString(),
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300',
      subscription: {
        plan: 'Free',
        status: 'active',
        billingCycle: 'monthly',
        renewsAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
      },
      settings: {
        emailNotifications: true,
        appointmentReminders: true,
        sessionBufferMinutes: 15,
        currency: 'USD',
        defaultSessionFee: 150
      },
      ...userData
    };
    this.users.push(newUser);
    return newUser;
  }

  updateUser(id, updates) {
    const user = this.findUserById(id);
    if (!user) return null;
    Object.assign(user, updates);
    return user;
  }

  // Client methods
  getClients(therapistId, { search, status, tag } = {}) {
    let result = this.clients.filter(c => !therapistId || c.therapistId === therapistId || c.therapistId === therapistId?.toString());
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        (c.primaryDiagnosis && c.primaryDiagnosis.toLowerCase().includes(q))
      );
    }
    if (status && status !== 'All') {
      result = result.filter(c => c.status.toLowerCase() === status.toLowerCase());
    }
    if (tag) {
      result = result.filter(c => c.tags && c.tags.includes(tag));
    }
    return result;
  }

  getClientById(id) {
    return this.clients.find(c => c._id === id || c._id === id?.toString());
  }

  createClient(clientData) {
    const newClient = {
      _id: uuidv4().replace(/-/g, '').slice(0, 24),
      notesCount: 0,
      sessionsCompleted: 0,
      totalBilled: 0,
      tags: [],
      treatmentGoals: [],
      createdAt: new Date().toISOString(),
      ...clientData
    };
    if (!newClient.avatar) {
      newClient.avatar = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(newClient.name)}`;
    }
    this.clients.unshift(newClient);
    return newClient;
  }

  updateClient(id, updates) {
    const client = this.getClientById(id);
    if (!client) return null;
    Object.assign(client, updates);
    return client;
  }

  deleteClient(id) {
    const index = this.clients.findIndex(c => c._id === id || c._id === id?.toString());
    if (index === -1) return false;
    this.clients.splice(index, 1);
    // Cascade or keep orphaned records cleaned
    return true;
  }

  // Appointment methods
  getAppointments(therapistId, { date, status, clientId } = {}) {
    let result = this.appointments.filter(a => !therapistId || a.therapistId === therapistId || a.therapistId === therapistId?.toString());
    if (date) {
      result = result.filter(a => a.date === date);
    }
    if (status && status !== 'All') {
      result = result.filter(a => a.status.toLowerCase() === status.toLowerCase());
    }
    if (clientId) {
      result = result.filter(a => a.clientId === clientId || a.clientId === clientId?.toString());
    }
    // Sort by date and startTime
    return result.sort((a, b) => (a.date + a.startTime).localeCompare(b.date + b.startTime));
  }

  getAppointmentById(id) {
    return this.appointments.find(a => a._id === id || a._id === id?.toString());
  }

  createAppointment(appointmentData) {
    const newAppointment = {
      _id: uuidv4().replace(/-/g, '').slice(0, 24),
      status: 'Scheduled',
      paymentStatus: 'Pending',
      notesCompleted: false,
      meetingLink: appointmentData.type === 'Video session'
        ? `https://telehealth.unfazed.health/room/${uuidv4().slice(0, 8)}`
        : '',
      createdAt: new Date().toISOString(),
      ...appointmentData
    };
    this.appointments.push(newAppointment);

    // Update client sessions count if needed
    const client = this.getClientById(newAppointment.clientId);
    if (client) {
      newAppointment.clientName = client.name;
    }
    return newAppointment;
  }

  updateAppointment(id, updates) {
    const appt = this.getAppointmentById(id);
    if (!appt) return null;
    Object.assign(appt, updates);
    return appt;
  }

  deleteAppointment(id) {
    const index = this.appointments.findIndex(a => a._id === id || a._id === id?.toString());
    if (index === -1) return false;
    this.appointments.splice(index, 1);
    return true;
  }

  // Note methods
  getNotes(therapistId, { clientId, search, isShared } = {}) {
    let result = this.notes.filter(n => !therapistId || n.therapistId === therapistId || n.therapistId === therapistId?.toString());
    if (clientId) {
      result = result.filter(n => n.clientId === clientId || n.clientId === clientId?.toString());
    }
    if (isShared !== undefined && isShared !== '') {
      const boolVal = isShared === 'true' || isShared === true;
      result = result.filter(n => n.isSharedWithClient === boolVal);
    }
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(n =>
        n.title.toLowerCase().includes(q) ||
        n.clientName.toLowerCase().includes(q) ||
        (n.soap && (
          n.soap.subjective?.toLowerCase().includes(q) ||
          n.soap.assessment?.toLowerCase().includes(q)
        ))
      );
    }
    return result.sort((a, b) => new Date(b.sessionDate) - new Date(a.sessionDate));
  }

  getNoteById(id) {
    return this.notes.find(n => n._id === id || n._id === id?.toString());
  }

  createNote(noteData) {
    const newNote = {
      _id: uuidv4().replace(/-/g, '').slice(0, 24),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isSigned: true,
      signedAt: new Date().toISOString(),
      tags: [],
      clientSharedSummary: {
        takeaways: '',
        actionItems: [],
        copingTools: []
      },
      riskAssessment: {
        level: 'None / Low Risk',
        safetyPlanDiscussed: false
      },
      ...noteData
    };

    const client = this.getClientById(newNote.clientId);
    if (client) {
      newNote.clientName = client.name;
      client.notesCount = (client.notesCount || 0) + 1;
    }

    this.notes.unshift(newNote);
    return newNote;
  }

  updateNote(id, updates) {
    const note = this.getNoteById(id);
    if (!note) return null;
    Object.assign(note, updates, { updatedAt: new Date().toISOString() });
    return note;
  }

  deleteNote(id) {
    const index = this.notes.findIndex(n => n._id === id || n._id === id?.toString());
    if (index === -1) return false;
    const removed = this.notes.splice(index, 1)[0];
    const client = this.getClientById(removed.clientId);
    if (client && client.notesCount > 0) {
      client.notesCount -= 1;
    }
    return true;
  }

  // Payment methods
  getPayments(therapistId, { status, clientId } = {}) {
    let result = this.payments.filter(p => !therapistId || p.therapistId === therapistId || p.therapistId === therapistId?.toString());
    if (status && status !== 'All') {
      result = result.filter(p => p.status.toLowerCase() === status.toLowerCase());
    }
    if (clientId) {
      result = result.filter(p => p.clientId === clientId || p.clientId === clientId?.toString());
    }
    return result.sort((a, b) => (b.dateIssued || '').localeCompare(a.dateIssued || ''));
  }

  getPaymentById(id) {
    return this.payments.find(p => p._id === id || p._id === id?.toString());
  }

  createPayment(paymentData) {
    const invoiceNum = `INV-${new Date().getFullYear()}-${String(this.payments.length + 80).padStart(3, '0')}`;
    const newPayment = {
      _id: uuidv4().replace(/-/g, '').slice(0, 24),
      invoiceNumber: invoiceNum,
      dateIssued: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      createdAt: new Date().toISOString(),
      receiptUrl: '#',
      ...paymentData
    };

    const client = this.getClientById(newPayment.clientId);
    if (client) {
      newPayment.clientName = client.name;
      if (newPayment.status === 'Paid') {
        client.totalBilled = (client.totalBilled || 0) + Number(newPayment.amount);
      }
    }

    this.payments.unshift(newPayment);
    return newPayment;
  }

  updatePayment(id, updates) {
    const payment = this.getPaymentById(id);
    if (!payment) return null;
    const oldStatus = payment.status;
    Object.assign(payment, updates);

    if (oldStatus !== 'Paid' && payment.status === 'Paid') {
      payment.datePaid = new Date().toISOString().split('T')[0];
      const client = this.getClientById(payment.clientId);
      if (client) {
        client.totalBilled = (client.totalBilled || 0) + Number(payment.amount);
      }
    }
    return payment;
  }

  // Message methods
  getMessages(therapistId, clientId) {
    return this.messages.filter(m =>
      (!therapistId || m.therapistId === therapistId || m.therapistId === therapistId?.toString()) &&
      (!clientId || m.clientId === clientId || m.clientId === clientId?.toString())
    ).sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  }

  createMessage(msgData) {
    const newMsg = {
      _id: uuidv4().replace(/-/g, '').slice(0, 24),
      timestamp: new Date().toISOString(),
      read: false,
      attachments: [],
      ...msgData
    };
    this.messages.push(newMsg);
    return newMsg;
  }

  markMessagesAsRead(therapistId, clientId) {
    this.messages.forEach(m => {
      if (m.clientId === clientId && m.sender === 'client') {
        m.read = true;
      }
    });
    return true;
  }

  // Subscription Plans
  getPlans() {
    return this.plans;
  }

  updateTherapistPlan(therapistId, planName, billingCycle = 'monthly') {
    const user = this.findUserById(therapistId);
    if (!user) return null;
    user.subscription = {
      plan: planName,
      status: 'active',
      billingCycle,
      renewsAt: new Date(Date.now() + (billingCycle === 'annual' ? 365 : 30) * 24 * 60 * 60 * 1000).toISOString()
    };
    return user.subscription;
  }
}

const memoryStoreInstance = new MemoryStore();
module.exports = memoryStoreInstance;
