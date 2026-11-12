const store = require('../data/memoryStore');

// @desc    Get all invoices / payments
// @route   GET /api/payments
exports.getPayments = async (req, res) => {
  try {
    const { status, clientId } = req.query;
    const payments = store.getPayments(req.user._id, { status, clientId });
    res.json({
      success: true,
      count: payments.length,
      payments
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Get single invoice / payment
// @route   GET /api/payments/:id
exports.getPaymentById = async (req, res) => {
  try {
    const payment = store.getPaymentById(req.params.id);
    if (!payment) {
      return res.status(404).json({ success: false, message: 'Invoice not found' });
    }
    res.json({
      success: true,
      payment
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Create new invoice
// @route   POST /api/payments
exports.createPayment = async (req, res) => {
  try {
    const { clientId, appointmentId, description, amount, status, paymentMethod, dueDate, notes } = req.body;

    if (!clientId || !amount) {
      return res.status(400).json({ success: false, message: 'Please specify client and amount' });
    }

    const client = store.getClientById(clientId);
    if (!client) {
      return res.status(404).json({ success: false, message: 'Client not found' });
    }

    const newPayment = store.createPayment({
      therapistId: req.user._id,
      clientId,
      clientName: client.name,
      appointmentId: appointmentId || null,
      description: description || '50-minute Individual Psychotherapy Session',
      amount: Number(amount),
      status: status || 'Pending',
      paymentMethod: paymentMethod || 'Stripe / Credit Card',
      dueDate: dueDate || new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      notes: notes || ''
    });

    res.status(201).json({
      success: true,
      message: 'Invoice generated successfully',
      payment: newPayment
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Update invoice status (e.g. record payment)
// @route   PUT /api/payments/:id
exports.updatePayment = async (req, res) => {
  try {
    const payment = store.getPaymentById(req.params.id);
    if (!payment) {
      return res.status(404).json({ success: false, message: 'Invoice not found' });
    }

    const updated = store.updatePayment(req.params.id, req.body);
    res.json({
      success: true,
      message: 'Payment record updated',
      payment: updated
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Delete invoice
// @route   DELETE /api/payments/:id
exports.deletePayment = async (req, res) => {
  try {
    const success = store.deletePayment(req.params.id);
    if (!success) {
      return res.status(404).json({ success: false, message: 'Invoice not found' });
    }
    res.json({
      success: true,
      message: 'Invoice removed'
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Get financial summary & metrics
// @route   GET /api/payments/summary
exports.getFinancialSummary = async (req, res) => {
  try {
    const payments = store.getPayments(req.user._id);

    const totalCollected = payments
      .filter(p => p.status === 'Paid')
      .reduce((sum, p) => sum + Number(p.amount), 0);

    const pendingAmount = payments
      .filter(p => p.status === 'Pending')
      .reduce((sum, p) => sum + Number(p.amount), 0);

    const overdueAmount = payments
      .filter(p => p.status === 'Overdue')
      .reduce((sum, p) => sum + Number(p.amount), 0);

    const paidInvoicesCount = payments.filter(p => p.status === 'Paid').length;
    const pendingInvoicesCount = payments.filter(p => p.status === 'Pending').length;
    const overdueInvoicesCount = payments.filter(p => p.status === 'Overdue').length;

    res.json({
      success: true,
      summary: {
        totalCollected,
        pendingAmount,
        overdueAmount,
        paidInvoicesCount,
        pendingInvoicesCount,
        overdueInvoicesCount,
        averageSessionRate: paidInvoicesCount > 0 ? Math.round(totalCollected / paidInvoicesCount) : 150
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
