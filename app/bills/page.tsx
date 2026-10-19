'use client'

import { useMemo, useState } from 'react'
import {
  ChevronDown,
  DollarSign,
  FileCheck2,
  ListFilter,
  MoreHorizontal,
  Plus,
  Receipt,
  X,
} from 'lucide-react'
import { DashboardShell } from '@/components/dashboard'
import { BILLS_DATA, type BillItem } from '@/lib/dashboard-data'

export default function BillsPage() {
  const [bills, setBills] = useState<BillItem[]>(BILLS_DATA)
  const [searchQuery, setSearchQuery] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [form, setForm] = useState({
    vendorName: 'Tuscan Tannery Consortium (Florence)',
    poNumber: 'ELF-PO-304',
    billDate: '2024-10-18',
    dueDate: '2024-11-18',
    amount: 5200,
  })

  const filteredBills = useMemo(() => {
    return bills.filter((b) => {
      const q = searchQuery.toLowerCase()
      return (
        b.billNumber.toLowerCase().includes(q) ||
        b.vendorName.toLowerCase().includes(q) ||
        b.poNumber.toLowerCase().includes(q)
      )
    })
  }, [bills, searchQuery])

  const handleCreateBill = (e: React.FormEvent) => {
    e.preventDefault()
    const newBill: BillItem = {
      id: `bill-${Date.now()}`,
      billNumber: `BILL-00${bills.length + 93}`,
      vendorName: form.vendorName,
      poNumber: form.poNumber,
      billDate: form.billDate,
      dueDate: form.dueDate,
      amount: Number(form.amount),
      balanceDue: Number(form.amount),
      status: 'Open',
    }
    setBills([newBill, ...bills])
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
              <Receipt className="size-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base font-bold text-slate-900">All Vendor Bills</span>
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">
                  {filteredBills.length}
                </span>
              </div>
              <p className="text-xs text-slate-500">Italian tanneries, fabric mills & artisan invoices</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-[#0F1E36] via-[#162B4D] to-[#8A1538] px-4 py-2 text-xs font-bold text-white shadow-md shadow-[#0F1E36]/20 transition-all hover:scale-[1.02] active:scale-95 sm:flex-none"
            >
              <Plus className="size-4" />
              <span>New Bill</span>
            </button>
            <button
              type="button"
              className="flex size-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
            >
              <MoreHorizontal className="size-4" />
            </button>
          </div>
        </div>

        {/* Bills Table */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[740px] text-left text-xs">
              <thead className="border-b border-slate-200 bg-slate-50 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-4 py-3.5">Bill Date</th>
                  <th className="px-4 py-3.5">Bill #</th>
                  <th className="px-4 py-3.5">Vendor</th>
                  <th className="px-4 py-3.5">PO Reference</th>
                  <th className="px-4 py-3.5">Due Date</th>
                  <th className="px-4 py-3.5 text-right">Amount</th>
                  <th className="px-4 py-3.5 text-right">Balance Due</th>
                  <th className="px-4 py-3.5 text-center">Status</th>
                  <th className="px-4 py-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredBills.map((b) => (
                  <tr key={b.id} className="transition-colors hover:bg-slate-50/70">
                    <td className="px-4 py-3.5 text-slate-500">{b.billDate}</td>
                    <td className="px-4 py-3.5 font-bold font-mono text-[#0F1E36]">{b.billNumber}</td>
                    <td className="px-4 py-3.5 font-semibold text-slate-900">{b.vendorName}</td>
                    <td className="px-4 py-3.5 font-mono text-slate-600">{b.poNumber}</td>
                    <td className="px-4 py-3.5 text-slate-500">{b.dueDate}</td>
                    <td className="px-4 py-3.5 text-right font-bold text-slate-900">
                      ${b.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="px-4 py-3.5 text-right font-bold text-[#8A1538]">
                      ${b.balanceDue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="px-4 py-3.5 text-center">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                          b.status === 'Paid'
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-amber-50 text-amber-700'
                        }`}
                      >
                        {b.status}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      <button
                        type="button"
                        className="font-semibold text-[#8A1538] hover:underline"
                      >
                        Make Payment
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
                <h3 className="text-base font-bold text-slate-900">Record Vendor Bill</h3>
                <button onClick={() => setIsModalOpen(false)} className="rounded-lg p-1 text-slate-400 hover:bg-slate-100">
                  <X className="size-5" />
                </button>
              </div>
              <form onSubmit={handleCreateBill} className="mt-4 space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700">Vendor Name</label>
                  <input
                    type="text"
                    value={form.vendorName}
                    onChange={(e) => setForm({ ...form, vendorName: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-slate-300 p-2.5 text-xs outline-none focus:border-[#0F1E36]"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700">Purchase Order #</label>
                  <input
                    type="text"
                    value={form.poNumber}
                    onChange={(e) => setForm({ ...form, poNumber: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-slate-300 p-2.5 text-xs outline-none focus:border-[#0F1E36]"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700">Bill Amount ($)</label>
                  <input
                    type="number"
                    value={form.amount}
                    onChange={(e) => setForm({ ...form, amount: Number(e.target.value) })}
                    className="mt-1 w-full rounded-xl border border-slate-300 p-2.5 text-xs outline-none focus:border-[#0F1E36]"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-700">Bill Date</label>
                    <input
                      type="date"
                      value={form.billDate}
                      onChange={(e) => setForm({ ...form, billDate: e.target.value })}
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
                    Save Bill
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
