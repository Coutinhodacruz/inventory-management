'use client'

import { useMemo, useState } from 'react'
import {
  ChevronDown,
  FileCheck,
  FileText,
  ListFilter,
  MoreHorizontal,
  Plus,
  Send,
  X,
} from 'lucide-react'
import { DashboardShell } from '@/components/dashboard'
import { INVOICES_DATA, type InvoiceItem } from '@/lib/dashboard-data'

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<InvoiceItem[]>(INVOICES_DATA)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'All' | 'Paid' | 'Sent' | 'Overdue'>('All')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [form, setForm] = useState({
    customerName: 'General Al-Mansoor',
    orderNumber: 'ELF-SO-108',
    amount: 1450,
    dueDate: '2024-11-15',
  })

  const filteredInvoices = useMemo(() => {
    return invoices.filter((inv) => {
      const q = searchQuery.toLowerCase()
      const matchesSearch =
        inv.invoiceNumber.toLowerCase().includes(q) ||
        inv.customerName.toLowerCase().includes(q) ||
        inv.orderNumber.toLowerCase().includes(q)
      const matchesStatus = statusFilter === 'All' || inv.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [invoices, searchQuery, statusFilter])

  const handleCreateInvoice = (e: React.FormEvent) => {
    e.preventDefault()
    const newInv: InvoiceItem = {
      id: `inv-${Date.now()}`,
      invoiceNumber: `INV-2024-0${invoices.length + 92}`,
      orderNumber: form.orderNumber,
      customerName: form.customerName,
      date: 'Oct 18, 2024',
      dueDate: form.dueDate,
      amount: Number(form.amount),
      balanceDue: Number(form.amount),
      status: 'Sent',
    }
    setInvoices([newInv, ...invoices])
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
              <FileText className="size-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base font-bold text-slate-900">All Invoices</span>
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">
                  {filteredInvoices.length}
                </span>
              </div>
              <p className="text-xs text-slate-500">Maison billing, settlement tracking, and VIP payment slips</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Status quick pills - scrollable on mobile */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
              {(['All', 'Paid', 'Sent', 'Overdue'] as const).map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setStatusFilter(filter)}
                  className={`rounded-xl px-2.5 py-1 text-xs font-semibold whitespace-nowrap transition-colors ${
                    statusFilter === filter
                      ? 'bg-[#0F1E36] text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-[#0F1E36] via-[#162B4D] to-[#8A1538] px-4 py-2 text-xs font-bold text-white shadow-md shadow-[#0F1E36]/20 transition-all hover:scale-[1.02] active:scale-95 sm:flex-none"
            >
              <Plus className="size-4" />
              <span>New Invoice</span>
            </button>

            <button
              type="button"
              className="flex size-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
            >
              <MoreHorizontal className="size-4" />
            </button>
          </div>
        </div>

        {/* Invoice Records Table */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-xs">
              <thead className="border-b border-slate-200 bg-slate-50 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-4 py-3.5">Date</th>
                  <th className="px-4 py-3.5">Invoice #</th>
                  <th className="px-4 py-3.5">Order Number</th>
                  <th className="px-4 py-3.5">Customer Name</th>
                  <th className="px-4 py-3.5">Due Date</th>
                  <th className="px-4 py-3.5 text-right">Amount</th>
                  <th className="px-4 py-3.5 text-right">Balance Due</th>
                  <th className="px-4 py-3.5 text-center">Status</th>
                  <th className="px-4 py-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredInvoices.map((inv) => (
                  <tr key={inv.id} className="transition-colors hover:bg-slate-50/70">
                    <td className="px-4 py-3.5 text-slate-500">{inv.date}</td>
                    <td className="px-4 py-3.5 font-bold font-mono text-[#0F1E36]">{inv.invoiceNumber}</td>
                    <td className="px-4 py-3.5 font-mono text-slate-700">{inv.orderNumber}</td>
                    <td className="px-4 py-3.5 font-semibold text-slate-900">{inv.customerName}</td>
                    <td className="px-4 py-3.5 text-slate-500">{inv.dueDate}</td>
                    <td className="px-4 py-3.5 text-right font-bold text-slate-900">
                      ${inv.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="px-4 py-3.5 text-right font-bold text-[#8A1538]">
                      ${inv.balanceDue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="px-4 py-3.5 text-center">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                          inv.status === 'Paid'
                            ? 'bg-emerald-50 text-emerald-700'
                            : inv.status === 'Sent'
                            ? 'bg-blue-50 text-blue-700'
                            : 'bg-rose-50 text-rose-700'
                        }`}
                      >
                        {inv.status}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      <button
                        type="button"
                        className="font-semibold text-[#8A1538] hover:underline"
                      >
                        Record Payment
                      </button>
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
                <h3 className="text-base font-bold text-slate-900">Create Luxury Invoice</h3>
                <button onClick={() => setIsModalOpen(false)} className="rounded-lg p-1 text-slate-400 hover:bg-slate-100">
                  <X className="size-5" />
                </button>
              </div>
              <form onSubmit={handleCreateInvoice} className="mt-4 space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700">Customer / VIP</label>
                  <input
                    type="text"
                    value={form.customerName}
                    onChange={(e) => setForm({ ...form, customerName: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-slate-300 p-2.5 text-xs outline-none focus:border-[#0F1E36]"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700">Sales Order #</label>
                  <input
                    type="text"
                    value={form.orderNumber}
                    onChange={(e) => setForm({ ...form, orderNumber: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-slate-300 p-2.5 text-xs outline-none focus:border-[#0F1E36]"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-700">Invoice Amount ($)</label>
                    <input
                      type="number"
                      value={form.amount}
                      onChange={(e) => setForm({ ...form, amount: Number(e.target.value) })}
                      className="mt-1 w-full rounded-xl border border-slate-300 p-2.5 text-xs outline-none focus:border-[#0F1E36]"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700">Due Date</label>
                    <input
                      type="date"
                      value={form.dueDate}
                      onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
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
                    Save &amp; Send
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
