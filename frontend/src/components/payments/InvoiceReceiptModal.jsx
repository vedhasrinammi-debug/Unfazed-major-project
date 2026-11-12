import React from 'react';
import { X, Printer, CheckCircle2, ShieldCheck, Download } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const InvoiceReceiptModal = ({ payment, onClose }) => {
  const { user } = useAuth();
  if (!payment) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white rounded-3xl w-full max-w-xl border border-purple-100 shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between print:hidden">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Clinical Payment Receipt & Superbill
          </span>
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold flex items-center space-x-1.5 transition"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>
            <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-600">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Superbill Receipt Area */}
        <div className="p-8 space-y-6 text-slate-800 font-sans" id="printable-receipt">
          {/* Clinic Branding */}
          <div className="flex justify-between items-start border-b border-slate-200 pb-5">
            <div>
              <h2 className="text-lg font-black tracking-tight text-slate-900">
                {user?.practiceName || 'Mindful Horizons Clinical Psychology'}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">{user?.name || 'Dr. Sarah Mitchell, Psy.D.'}</p>
              <p className="text-[11px] text-slate-400 font-mono">License: {user?.licenseNumber || 'PSY-NY-84920'}</p>
              <p className="text-[11px] text-slate-400">NPI: 1982736450 • Tax ID: XX-XXX4910</p>
            </div>

            <div className="text-right">
              <span className="text-xs font-bold text-brand-700 uppercase tracking-wider block">INVOICE RECEIPT</span>
              <span className="text-sm font-mono font-bold text-slate-800">{payment.invoiceNumber}</span>
              <p className="text-xs text-slate-500 mt-1">Issued: {payment.dateIssued}</p>
              {payment.status === 'Paid' && (
                <span className="mt-1 inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  <span>PAID IN FULL</span>
                </span>
              )}
            </div>
          </div>

          {/* Client Details */}
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-slate-400 font-bold uppercase text-[10px] block">Patient / Client</span>
              <p className="font-bold text-slate-900 mt-0.5 text-sm">{payment.clientName}</p>
              <p className="text-slate-500">Individual Psychotherapy Client</p>
            </div>

            <div className="text-right">
              <span className="text-slate-400 font-bold uppercase text-[10px] block">Payment Details</span>
              <p className="font-semibold text-slate-800 mt-0.5">{payment.paymentMethod}</p>
              <p className="text-slate-500">Date Settled: {payment.datePaid || payment.dateIssued}</p>
            </div>
          </div>

          {/* Line Items Table */}
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 text-left font-bold uppercase text-[10px]">
                <th className="py-2">Service Description</th>
                <th className="py-2 text-center">CPT Code</th>
                <th className="py-2 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="py-3 font-semibold text-slate-800">
                  {payment.description || '50-minute Individual Psychotherapy Session'}
                </td>
                <td className="py-3 text-center font-mono text-slate-600">90837</td>
                <td className="py-3 text-right font-mono font-bold text-slate-900">${payment.amount}.00</td>
              </tr>
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-slate-900">
                <td colSpan={2} className="pt-3 font-bold text-slate-900 text-right">Total Amount:</td>
                <td className="pt-3 text-right font-mono font-extrabold text-base text-slate-900">${payment.amount}.00</td>
              </tr>
            </tfoot>
          </table>

          {/* Clinical Superbill Disclaimer */}
          <div className="p-3 rounded-xl bg-purple-50/50 border border-purple-100 text-[10px] text-slate-500 space-y-1">
            <p className="font-bold text-brand-900">Superbill Reimbursement Notice:</p>
            <p>
              This invoice serves as an official clinical superbill statement of outpatient mental health services rendered. 
              Patients may submit this receipt directly to their health insurance provider for out-of-network reimbursement.
            </p>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Verified Electronic Transaction
            </span>
            <span>UNFAZED Practice Management Platform</span>
          </div>
        </div>
      </div>
    </div>
  );
};
