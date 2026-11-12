const store = require('../data/memoryStore');

// @desc    Get all clients for therapist
// @route   GET /api/clients
exports.getClients = async (req, res) => {
  try {
    const { search, status, tag } = req.query;
    const clients = store.getClients(req.user._id, { search, status, tag });
    res.json({
      success: true,
      count: clients.length,
      clients
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Get single client with sessions and notes overview
// @route   GET /api/clients/:id
exports.getClientById = async (req, res) => {
  try {
    const client = store.getClientById(req.params.id);
    if (!client) {
      return res.status(404).json({ success: false, message: 'Client not found' });
    }

    // Attach related appointments, notes, and payments
    const appointments = store.getAppointments(req.user._id, { clientId: client._id });
    const notes = store.getNotes(req.user._id, { clientId: client._id });
    const payments = store.getPayments(req.user._id, { clientId: client._id });

    res.json({
      success: true,
      client,
      related: {
        appointments,
        notes,
        payments
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Create new client
// @route   POST /api/clients
exports.createClient = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      dateOfBirth,
      gender,
      primaryDiagnosis,
      secondaryDiagnosis,
      tags,
      emergencyContact,
      insurance,
      preferredSessionType,
      treatmentGoals
    } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ success: false, message: 'Please provide name, email, and phone number' });
    }

    const newClient = store.createClient({
      therapistId: req.user._id,
      name,
      email,
      phone,
      dateOfBirth: dateOfBirth || '1995-01-01',
      gender: gender || 'Prefer not to say',
      status: 'Active',
      primaryDiagnosis: primaryDiagnosis || 'Generalized Anxiety Disorder',
      secondaryDiagnosis: secondaryDiagnosis || '',
      tags: tags || ['Individual Therapy'],
      emergencyContact: emergencyContact || { name: '', relationship: '', phone: '' },
      insurance: insurance || { provider: 'Self-Pay', policyNumber: 'N/A', copay: 0 },
      preferredSessionType: preferredSessionType || 'Video session',
      treatmentGoals: treatmentGoals || ['Improve emotional regulation', 'Enhance stress management']
    });

    res.status(201).json({
      success: true,
      message: 'Client profile created successfully',
      client: newClient
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Update client profile
// @route   PUT /api/clients/:id
exports.updateClient = async (req, res) => {
  try {
    const client = store.getClientById(req.params.id);
    if (!client) {
      return res.status(404).json({ success: false, message: 'Client not found' });
    }

    const updated = store.updateClient(req.params.id, req.body);
    res.json({
      success: true,
      message: 'Client updated successfully',
      client: updated
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Delete client
// @route   DELETE /api/clients/:id
exports.deleteClient = async (req, res) => {
  try {
    const success = store.deleteClient(req.params.id);
    if (!success) {
      return res.status(404).json({ success: false, message: 'Client not found' });
    }
    res.json({
      success: true,
      message: 'Client removed successfully'
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
