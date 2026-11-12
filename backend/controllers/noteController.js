const store = require('../data/memoryStore');

// @desc    Get clinical session notes
// @route   GET /api/notes
exports.getNotes = async (req, res) => {
  try {
    const { clientId, search, isShared } = req.query;
    const notes = store.getNotes(req.user._id, { clientId, search, isShared });
    res.json({
      success: true,
      count: notes.length,
      notes
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Get single note by ID
// @route   GET /api/notes/:id
exports.getNoteById = async (req, res) => {
  try {
    const note = store.getNoteById(req.params.id);
    if (!note) {
      return res.status(404).json({ success: false, message: 'Note not found' });
    }
    res.json({
      success: true,
      note
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Create new SOAP note
// @route   POST /api/notes
exports.createNote = async (req, res) => {
  try {
    const {
      clientId,
      appointmentId,
      sessionDate,
      sessionNumber,
      title,
      isSharedWithClient,
      soap,
      clientSharedSummary,
      riskAssessment,
      tags
    } = req.body;

    if (!clientId) {
      return res.status(400).json({ success: false, message: 'Please specify a client for this note' });
    }

    const client = store.getClientById(clientId);
    if (!client) {
      return res.status(404).json({ success: false, message: 'Client not found' });
    }

    const newNote = store.createNote({
      therapistId: req.user._id,
      clientId,
      clientName: client.name,
      appointmentId: appointmentId || null,
      sessionDate: sessionDate || new Date().toISOString().split('T')[0],
      sessionNumber: sessionNumber || (client.notesCount ? client.notesCount + 1 : 1),
      title: title || `Session Note - ${new Date().toLocaleDateString()}`,
      isSharedWithClient: Boolean(isSharedWithClient),
      soap: soap || { subjective: '', objective: '', assessment: '', plan: '' },
      clientSharedSummary: clientSharedSummary || { takeaways: '', actionItems: [], copingTools: [] },
      riskAssessment: riskAssessment || { level: 'None / Low Risk', safetyPlanDiscussed: false },
      tags: tags || ['SOAP Note', 'Clinical Record']
    });

    // If an appointment was linked, mark its note as completed
    if (appointmentId) {
      store.updateAppointment(appointmentId, { notesCompleted: true });
    }

    res.status(201).json({
      success: true,
      message: 'Clinical note saved successfully',
      note: newNote
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Update SOAP note
// @route   PUT /api/notes/:id
exports.updateNote = async (req, res) => {
  try {
    const note = store.getNoteById(req.params.id);
    if (!note) {
      return res.status(404).json({ success: false, message: 'Note not found' });
    }

    const updated = store.updateNote(req.params.id, req.body);
    res.json({
      success: true,
      message: 'Note updated successfully',
      note: updated
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Toggle privacy sharing status (Private vs Shared with Client)
// @route   PATCH /api/notes/:id/toggle-sharing
exports.toggleSharing = async (req, res) => {
  try {
    const note = store.getNoteById(req.params.id);
    if (!note) {
      return res.status(404).json({ success: false, message: 'Note not found' });
    }

    const newStatus = !note.isSharedWithClient;
    const updated = store.updateNote(req.params.id, { isSharedWithClient: newStatus });

    res.json({
      success: true,
      message: newStatus ? 'Note shared with client portal' : 'Note set to private therapist-only',
      isSharedWithClient: newStatus,
      note: updated
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Delete SOAP note
// @route   DELETE /api/notes/:id
exports.deleteNote = async (req, res) => {
  try {
    const success = store.deleteNote(req.params.id);
    if (!success) {
      return res.status(404).json({ success: false, message: 'Note not found' });
    }
    res.json({
      success: true,
      message: 'Clinical note deleted'
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
