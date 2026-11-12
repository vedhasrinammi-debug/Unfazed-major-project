const store = require('../data/memoryStore');

// @desc    Get all appointments for therapist
// @route   GET /api/appointments
exports.getAppointments = async (req, res) => {
  try {
    const { date, status, clientId } = req.query;
    const appointments = store.getAppointments(req.user._id, { date, status, clientId });
    res.json({
      success: true,
      count: appointments.length,
      appointments
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Get single appointment
// @route   GET /api/appointments/:id
exports.getAppointmentById = async (req, res) => {
  try {
    const appointment = store.getAppointmentById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }
    res.json({
      success: true,
      appointment
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Create new appointment
// @route   POST /api/appointments
exports.createAppointment = async (req, res) => {
  try {
    const {
      clientId,
      date,
      startTime,
      endTime,
      durationMinutes,
      type,
      locationOrRoom,
      sessionFee,
      clientGoalsSummary
    } = req.body;

    if (!clientId || !date || !startTime) {
      return res.status(400).json({ success: false, message: 'Please provide clientId, date, and startTime' });
    }

    const client = store.getClientById(clientId);
    if (!client) {
      return res.status(404).json({ success: false, message: 'Client not found' });
    }

    const newAppointment = store.createAppointment({
      therapistId: req.user._id,
      clientId,
      clientName: client.name,
      date,
      startTime,
      endTime: endTime || '02:50 PM',
      durationMinutes: durationMinutes || 50,
      type: type || 'Video session',
      locationOrRoom: locationOrRoom || (type === 'Video session' ? 'UNFAZED Telehealth Room' : 'Suite 402'),
      sessionFee: sessionFee || 150,
      clientGoalsSummary: clientGoalsSummary || ''
    });

    res.status(201).json({
      success: true,
      message: 'Appointment scheduled successfully',
      appointment: newAppointment
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Update appointment (status, reschedule, notes status)
// @route   PUT /api/appointments/:id
exports.updateAppointment = async (req, res) => {
  try {
    const appointment = store.getAppointmentById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }

    const updated = store.updateAppointment(req.params.id, req.body);
    res.json({
      success: true,
      message: 'Appointment updated successfully',
      appointment: updated
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Delete appointment
// @route   DELETE /api/appointments/:id
exports.deleteAppointment = async (req, res) => {
  try {
    const success = store.deleteAppointment(req.params.id);
    if (!success) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }
    res.json({
      success: true,
      message: 'Appointment cancelled and removed'
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
