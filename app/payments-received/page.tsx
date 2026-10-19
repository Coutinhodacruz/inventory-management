'use client'

import { useMemo, useState } from 'react'
import {
  ChevronDown,
  CreditCard,
  DollarSign,
  Download,
  ListFilter,
  MoreHorizontal,
  Plus,
  Receipt,
  X,
} from 'lucide-react'
import { DashboardShell } from '@/components/dashboard'
import { PAYMENTS_RECEIVED_DATA, type PaymentReceivedItem } from '@/lib/dashboard-data'

export default function PaymentsReceivedPage() {
  const [payments, setPayments] = useState<PaymentReceivedItem[]>(PAYMENTS_RECEIVED_DATA)
  const [searchQuery, setSearchQuery] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [form, setForm] = useState({
    customerName: 'Marcus Sterling',
    invoiceNumber: 'INV-2024-090',
    mode: 'Bank Wire (USD)' as PaymentReceivedItem['mode'],
    amount: 950,
    reference: 'WIRE-LON-8812',
  })

  const filteredPayments = useMemo(() => {
    return payments.filter((p) => {
      const q = searchQuery.toLowerCase()
      return (
        p.paymentNumber.toLowerCase().includes(q) ||
        p.customerName.toLowerCase().includes(q) ||
        p.invoiceNumber.toLowerCase().includes(q)
      )
    })
  }, [payments, searchQuery])

  const handleCreatePayment = (e: React.FormEvent) => {
    e.preventDefault()
    const newPay: PaymentReceivedItem = {
      id: `pay-${Date.now()}`,
      paymentNumber: `PAY-00${payments.length + 83}`,
      invoiceNumber: form.invoiceNumber,
      customerName: form.customerName,
      paymentDate: 'Today',
      mode: form.mode,
      amount: Number(form.amount),
      reference: form.reference,
    }
    setPayments([newPay, ...payments])
    setIsModalOpen(false)
  }

  return (
    <DashboardShell
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      onQuickCreate={() => setIsModalOpen(true)}
    >
      <div className="space-y-6 p-4 sm:p-6 lg:p-8">
        {/* Luxury Subheader */}
        <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <div className="flex size-9 items-center justify-center rounded-xl bg-[#0F1E36]/5 text-[#0F1E36]">
              <ChevronDown className="size-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base font-bold text-slate-900">Payments Received</span>
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">
                  {filteredPayments.length}
                </span>
              </div>
              <p className="text-xs text-slate-500">VIP customer receipts, bank wires & concierge transactions</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-[#0F1E36] via-[#162B4D] to-[#8A1538] px-4 py-2 text-xs font-bold text-white shadow-md shadow-[#0F1E36]/20 transition-all hover:scale-[1.02] active:scale-95 sm:flex-none"
            >
              <Plus className="size-4" />
              <span>Record Payment</span>
            </button>
            <button
              type="button"
              className="flex size-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
            >
              <MoreHorizontal className="size-4" />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-xs">
              <thead className="border-b border-slate-200 bg-slate-50 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-4 py-3.5">Date</th>
                  <th className="px-4 py-3.5">Payment #</th>
                  <th className="px-4 py-3.5">Customer</th>
                  <th className="px-4 py-3.5">Invoice #</th>
                  <th className="px-4 py-3.5">Payment Mode</th>
                  <th className="px-4 py-3.5">Reference</th>
                  <th className="px-4 py-3.5 text-right">Amount Received</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredPayments.map((p) => (
                  <tr key={p.id} className="transition-colors hover:bg-slate-50/70">
                    <td className="px-4 py-3.5 text-slate-500">{p.paymentDate}</td>
                    <td className="px-4 py-3.5 font-bold font-mono text-[#0F1E36]">{p.paymentNumber}</td>
                    <td className="px-4 py-3.5 font-semibold text-slate-900">{p.customerName}</td>
                    <td className="px-4 py-3.5 font-mono text-slate-700">{p.invoiceNumber}</td>
                    <td className="px-4 py-3.5 text-slate-600">
                      <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-[10px] font-semibold text-blue-700">
                        {p.mode}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 font-mono text-slate-500">{p.reference}</td>
                    <td className="px-4 py-3.5 text-right font-bold text-emerald-600">
                      ${p.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
            <div className="w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-5 sm:p-6 shadow-2xl border border-slate-200">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-base font-bold text-slate-900">Record Customer Receipt</h3>
                <button onClick={() => setIsModalOpen(false)} className="rounded-lg p-1 text-slate-400 hover:bg-slate-100">
                  <X className="size-5" />
                </button>
              </div>
              <form onSubmit={handleCreatePayment} className="mt-4 space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700">Customer Name</label>
                  <input
                    type="text"
                    value={form.customerName}
                    onChange={(e) => setForm({ ...form, customerName: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-slate-300 p-2.5 text-xs outline-none focus:border-[#0F1E36]"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700">Invoice #</label>
                  <input
                    type="text"
                    value={form.invoiceNumber}
                    onChange={(e) => setForm({ ...form, invoiceNumber: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-slate-300 p-2.5 text-xs outline-none focus:border-[#0F1E36]"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700">Payment Mode</label>
                  <select
                    value={form.mode}
                    onChange={(e) =>
                      setForm({ ...form, mode: e.target.value as PaymentReceivedItem['mode'] })
                    }
                    className="mt-1 w-full rounded-xl border border-slate-300 p-2.5 text-xs outline-none focus:border-[#0F1E36]"
                  >
                    <option value="Bank Wire (USD)">Bank Wire (USD)</option>
                    <option value="POS Terminal (KSh)">POS Terminal (KSh)</option>
                    <option value="Paystack / NGN">Paystack / NGN</option>
                    <option value="AMEX Concierge">AMEX Concierge</option>
                  </select>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-700">Amount Received ($)</label>
                    <input
                      type="number"
                      value={form.amount}
                      onChange={(e) => setForm({ ...form, amount: Number(e.target.value) })}
                      className="mt-1 w-full rounded-xl border border-slate-300 p-2.5 text-xs outline-none focus:border-[#0F1E36]"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700">Reference / ID</label>
                    <input
                      type="text"
                      value={form.reference}
                      onChange={(e) => setForm({ ...form, reference: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-slate-300 p-2.5 text-xs outline-none focus:border-[#0F1E36]"
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row justify-end gap-2 pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="w-full sm:w-auto rounded-xl border border-slate-300 px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-full sm:w-auto rounded-xl bg-gradient-to-r from-[#0F1E36] to-[#8A1538] px-5 py-2.5 text-xs font-bold text-white shadow-md hover:scale-[1.02] active:scale-95"
                  >
                    Record Receipt
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardShell>
  )
}
