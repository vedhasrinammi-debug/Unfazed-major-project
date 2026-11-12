const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  therapistId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true
  },
  clientName: {
    type: String,
    required: true
  },
  appointmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appointment',
    default: null
  },
  invoiceNumber: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: '50-minute Individual Psychotherapy Session'
  },
  amount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['Paid', 'Pending', 'Overdue', 'Refunded'],
    default: 'Paid'
  },
  paymentMethod: {
    type: String,
    enum: ['Stripe / Credit Card', 'Insurance Copay', 'Bank Transfer', 'Cash / Check'],
    default: 'Stripe / Credit Card'
  },
  dateIssued: {
    type: String,
    default: () => new Date().toISOString().split('T')[0]
  },
  datePaid: {
    type: String,
    default: null
  },
  dueDate: {
    type: String,
    default: () => new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  },
  receiptUrl: {
    type: String,
    default: ''
  },
  notes: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Payment', paymentSchema);
