const API_BASE = '/api';

const getHeaders = () => {
  const token = localStorage.getItem('unfazed_token');
  const headers = {
    'Content-Type': 'application/json'
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

const handleResponse = async (res) => {
  const data = await res.json().catch(() => ({ success: false, message: 'Server communication error' }));
  if (!res.ok) {
    throw new Error(data.message || `Request failed with status ${res.status}`);
  }
  return data;
};

export const api = {
  // Auth
  register: (body) => fetch(`${API_BASE}/auth/register`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }).then(handleResponse),
  login: (body) => fetch(`${API_BASE}/auth/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }).then(handleResponse),
  demoLogin: () => fetch(`${API_BASE}/auth/demo-login`, { method: 'POST', headers: { 'Content-Type': 'application/json' } }).then(handleResponse),
  getMe: () => fetch(`${API_BASE}/auth/me`, { headers: getHeaders() }).then(handleResponse),
  updateProfile: (body) => fetch(`${API_BASE}/auth/profile`, { method: 'PUT', headers: getHeaders(), body: JSON.stringify(body) }).then(handleResponse),

  // Clients
  getClients: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return fetch(`${API_BASE}/clients${query ? `?${query}` : ''}`, { headers: getHeaders() }).then(handleResponse);
  },
  getClientById: (id) => fetch(`${API_BASE}/clients/${id}`, { headers: getHeaders() }).then(handleResponse),
  createClient: (body) => fetch(`${API_BASE}/clients`, { method: 'POST', headers: getHeaders(), body: JSON.stringify(body) }).then(handleResponse),
  updateClient: (id, body) => fetch(`${API_BASE}/clients/${id}`, { method: 'PUT', headers: getHeaders(), body: JSON.stringify(body) }).then(handleResponse),
  deleteClient: (id) => fetch(`${API_BASE}/clients/${id}`, { method: 'DELETE', headers: getHeaders() }).then(handleResponse),

  // Appointments
  getAppointments: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return fetch(`${API_BASE}/appointments${query ? `?${query}` : ''}`, { headers: getHeaders() }).then(handleResponse);
  },
  getAppointmentById: (id) => fetch(`${API_BASE}/appointments/${id}`, { headers: getHeaders() }).then(handleResponse),
  createAppointment: (body) => fetch(`${API_BASE}/appointments`, { method: 'POST', headers: getHeaders(), body: JSON.stringify(body) }).then(handleResponse),
  updateAppointment: (id, body) => fetch(`${API_BASE}/appointments/${id}`, { method: 'PUT', headers: getHeaders(), body: JSON.stringify(body) }).then(handleResponse),
  deleteAppointment: (id) => fetch(`${API_BASE}/appointments/${id}`, { method: 'DELETE', headers: getHeaders() }).then(handleResponse),

  // Notes
  getNotes: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return fetch(`${API_BASE}/notes${query ? `?${query}` : ''}`, { headers: getHeaders() }).then(handleResponse);
  },
  getNoteById: (id) => fetch(`${API_BASE}/notes/${id}`, { headers: getHeaders() }).then(handleResponse),
  createNote: (body) => fetch(`${API_BASE}/notes`, { method: 'POST', headers: getHeaders(), body: JSON.stringify(body) }).then(handleResponse),
  updateNote: (id, body) => fetch(`${API_BASE}/notes/${id}`, { method: 'PUT', headers: getHeaders(), body: JSON.stringify(body) }).then(handleResponse),
  toggleNoteSharing: (id) => fetch(`${API_BASE}/notes/${id}/toggle-sharing`, { method: 'PATCH', headers: getHeaders() }).then(handleResponse),
  deleteNote: (id) => fetch(`${API_BASE}/notes/${id}`, { method: 'DELETE', headers: getHeaders() }).then(handleResponse),

  // Payments & Invoicing
  getPayments: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return fetch(`${API_BASE}/payments${query ? `?${query}` : ''}`, { headers: getHeaders() }).then(handleResponse);
  },
  getPaymentById: (id) => fetch(`${API_BASE}/payments/${id}`, { headers: getHeaders() }).then(handleResponse),
  createPayment: (body) => fetch(`${API_BASE}/payments`, { method: 'POST', headers: getHeaders(), body: JSON.stringify(body) }).then(handleResponse),
  updatePayment: (id, body) => fetch(`${API_BASE}/payments/${id}`, { method: 'PUT', headers: getHeaders(), body: JSON.stringify(body) }).then(handleResponse),
  deletePayment: (id) => fetch(`${API_BASE}/payments/${id}`, { method: 'DELETE', headers: getHeaders() }).then(handleResponse),
  getFinancialSummary: () => fetch(`${API_BASE}/payments/summary`, { headers: getHeaders() }).then(handleResponse),

  // Messages & Chat
  getConversations: () => fetch(`${API_BASE}/messages/conversations`, { headers: getHeaders() }).then(handleResponse),
  getMessagesByClient: (clientId) => fetch(`${API_BASE}/messages/${clientId}`, { headers: getHeaders() }).then(handleResponse),
  sendMessage: (body) => fetch(`${API_BASE}/messages`, { method: 'POST', headers: getHeaders(), body: JSON.stringify(body) }).then(handleResponse),
  simulateClientReply: (clientId) => fetch(`${API_BASE}/messages/${clientId}/simulate-reply`, { method: 'POST', headers: getHeaders() }).then(handleResponse),

  // Plans & Billing
  getPlans: () => fetch(`${API_BASE}/plans`).then(handleResponse),
  getCurrentSubscription: () => fetch(`${API_BASE}/plans/current`, { headers: getHeaders() }).then(handleResponse),
  upgradePlan: (body) => fetch(`${API_BASE}/plans/upgrade`, { method: 'POST', headers: getHeaders(), body: JSON.stringify(body) }).then(handleResponse),

  // Analytics
  getDashboardOverview: () => fetch(`${API_BASE}/analytics/dashboard`, { headers: getHeaders() }).then(handleResponse),
  getAnalyticsCharts: () => fetch(`${API_BASE}/analytics/charts`, { headers: getHeaders() }).then(handleResponse),
};
