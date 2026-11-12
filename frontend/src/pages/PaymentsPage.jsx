import React, { useState, useEffect } from 'react';
import {
  CreditCard,
  DollarSign,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  Printer,
  ArrowUpRight
} from 'lucide-react';
import { api } from '../services/api';
import { useToast } from '../context/ToastContext';
import { StatsCard } from '../components/common/StatsCard';
import { NewInvoiceModal } from '../components/payments/NewInvoiceModal';
import { InvoiceReceiptModal } from '../components/payments/InvoiceReceiptModal';

export const PaymentsPage = () => {
  const { addToast } = useToast();
  const [payments, setPayments] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('All');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState(null);

  const fetchPaymentData = async () => {
    try {
      setLoading(true);
      const [paymentsRes, summaryRes] = await Promise.all([
        api.getPayments({ status: statusFilter }),
        api.getFinancialSummary()
      ]);

      if (paymentsRes.success) setPayments(paymentsRes.payments);
      if (summaryRes.success) setSummary(summaryRes.summary);
    } catch (err) {
      addToast(err.message || 'Error loading financial records', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPaymentData();
  }, [statusFilter]);

  const handleMarkAsPaid = async (id) => {
    try {
      await api.updatePayment(id, { status: 'Paid' });
      addToast('Invoice marked as paid in full', 'success');
      fetchPaymentData();
    } catch (err) {
      addToast('Error updating invoice status', 'error');
    }
  };

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Financial Metric KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatsCard
          title="Total Collected"
          value={`$${summary?.totalCollected?.toLocaleString() || '6,150'}`}
          subtitle={`${summary?.paidInvoicesCount || 4} settled invoices`}
          icon={DollarSign}
          trend="+14% this quarter"
          isPositive={true}
          color="emerald"
        />
        <StatsCard
          title="Pending Invoices"
          value={`$${summary?.pendingAmount?.toLocaleString() || '150'}`}
          subtitle="Awaiting client settlement"
          icon={Clock}
          trend="1 open invoice"
          isPositive={true}
          color="amber"
        />
        <StatsCard
          title="Overdue Balance"
          value={`$${summary?.overdueAmount?.toLocaleString() || '200'}`}
          subtitle="Follow-up reminder sent"
          icon={AlertCircle}
          trend="Past 14 days"
          isPositive={false}
          color="brand"
        />
        <StatsCard
          title="Avg Session Rate"
          value={`$${summary?.averageSessionRate || '150'}`}
          subtitle="Individual psychotherapy fee"
          icon={CreditCard}
          trend="Standard CPT 90837"
          isPositive={true}
          color="lavender"
        />
      </div>

      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
        <div className="flex items-center space-x-1 p-1 bg-white border border-slate-200/80 rounded-2xl shadow-xs">
          {['All', 'Paid', 'Pending', 'Overdue'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
                statusFilter === st
                  ? 'bg-brand-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-sm shadow-brand-600/30 transition active:scale-95 flex-shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Generate Invoice</span>
        </button>
      </div>

      {/* Invoices Table */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-[#FAF9FF] text-slate-500 font-bold uppercase text-[10px] tracking-wider">
                <th className="py-4 px-6">Invoice #</th>
                <th className="py-4 px-6">Client Name</th>
                <th className="py-4 px-6">Service Description</th>
                <th className="py-4 px-6">Amount</th>
                <th className="py-4 px-6">Payment Method</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {payments.map((p) => (
                <tr key={p._id} className="hover:bg-slate-50/70 transition">
                  <td className="py-4 px-6 font-mono font-bold text-slate-800">{p.invoiceNumber}</td>
                  <td className="py-4 px-6 font-bold text-slate-900">{p.clientName}</td>
                  <td className="py-4 px-6 text-slate-500 max-w-xs truncate">{p.description}</td>
                  <td className="py-4 px-6 font-mono font-bold text-slate-900 text-sm">${p.amount}</td>
                  <td className="py-4 px-6 text-slate-600">{p.paymentMethod}</td>
                  <td className="py-4 px-6">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      p.status === 'Paid' ? 'bg-emerald-100 text-emerald-800' :
                      p.status === 'Pending' ? 'bg-amber-100 text-amber-800' :
                      'bg-rose-100 text-rose-800'
                    }`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right space-x-2">
                    {p.status !== 'Paid' && (
                      <button
                        onClick={() => handleMarkAsPaid(p._id)}
                        className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-[11px] border border-emerald-200 transition"
                      >
                        Record Paid
                      </button>
                    )}
                    <button
                      onClick={() => setSelectedReceipt(p)}
                      className="px-2.5 py-1 rounded-lg bg-purple-50 hover:bg-purple-100 text-brand-700 font-bold text-[11px] border border-purple-200 transition"
                    >
                      View Receipt
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Invoice Modal */}
      <NewInvoiceModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSaved={fetchPaymentData}
      />

      {/* Printable Receipt Modal */}
      {selectedReceipt && (
        <InvoiceReceiptModal
          payment={selectedReceipt}
          onClose={() => setSelectedReceipt(null)}
        />
      )}
    </div>
  );
};
