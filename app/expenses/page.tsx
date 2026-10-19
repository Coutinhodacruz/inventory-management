'use client'

import { useMemo, useState } from 'react'
import {
  ChevronDown,
  CreditCard,
  DollarSign,
  MoreHorizontal,
  Plus,
  Receipt,
  Tag,
  X,
} from 'lucide-react'
import { DashboardShell } from '@/components/dashboard'
import { EXPENSES_DATA, type ExpenseItem } from '@/lib/dashboard-data'

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<ExpenseItem[]>(EXPENSES_DATA)
  const [searchQuery, setSearchQuery] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [form, setForm] = useState({
    category: 'Leather Care & Polish Compounds',
    vendor: 'Saphir Médaille d’Or (France)',
    paidThrough: 'Corporate Amex',
    amount: 350,
  })

  const filteredExpenses = useMemo(() => {
    return expenses.filter((e) => {
      const q = searchQuery.toLowerCase()
      return (
        e.expenseNumber.toLowerCase().includes(q) ||
        e.category.toLowerCase().includes(q) ||
        e.vendor.toLowerCase().includes(q)
      )
    })
  }, [expenses, searchQuery])

  const handleCreateExpense = (e: React.FormEvent) => {
    e.preventDefault()
    const newExp: ExpenseItem = {
      id: `exp-${Date.now()}`,
      expenseNumber: `EXP-00${expenses.length + 45}`,
      date: 'Oct 18, 2024',
      category: form.category,
      vendor: form.vendor,
      paidThrough: form.paidThrough,
      amount: Number(form.amount),
      status: 'Non-Billable',
    }
    setExpenses([newExp, ...expenses])
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
                <span className="text-base font-bold text-slate-900">All Atelier Expenses</span>
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">
                  {filteredExpenses.length}
                </span>
              </div>
              <p className="text-xs text-slate-500">Leather maintenance, dyes, polish, travel & boutique upkeep</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-[#0F1E36] via-[#162B4D] to-[#8A1538] px-4 py-2 text-xs font-bold text-white shadow-md shadow-[#0F1E36]/20 transition-all hover:scale-[1.02] active:scale-95 sm:flex-none"
            >
              <Plus className="size-4" />
              <span>Record Expense</span>
            </button>
            <button
              type="button"
              className="flex size-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
            >
              <MoreHorizontal className="size-4" />
            </button>
          </div>
        </div>

        {/* Expenses Table */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-xs">
              <thead className="border-b border-slate-200 bg-slate-50 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-4 py-3.5">Date</th>
                  <th className="px-4 py-3.5">Expense #</th>
                  <th className="px-4 py-3.5">Expense Category</th>
                  <th className="px-4 py-3.5">Vendor / Merchant</th>
                  <th className="px-4 py-3.5">Paid Through</th>
                  <th className="px-4 py-3.5 text-right">Amount</th>
                  <th className="px-4 py-3.5 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredExpenses.map((exp) => (
                  <tr key={exp.id} className="transition-colors hover:bg-slate-50/70">
                    <td className="px-4 py-3.5 text-slate-500">{exp.date}</td>
                    <td className="px-4 py-3.5 font-bold font-mono text-[#0F1E36]">{exp.expenseNumber}</td>
                    <td className="px-4 py-3.5 font-semibold text-slate-900">{exp.category}</td>
                    <td className="px-4 py-3.5 text-slate-600">{exp.vendor}</td>
                    <td className="px-4 py-3.5 text-slate-500">{exp.paidThrough}</td>
                    <td className="px-4 py-3.5 text-right font-bold text-slate-900">
                      ${exp.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="px-4 py-3.5 text-center">
                      <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-semibold text-slate-700">
                        {exp.status}
                      </span>
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
                <h3 className="text-base font-bold text-slate-900">Record Atelier Expense</h3>
                <button onClick={() => setIsModalOpen(false)} className="rounded-lg p-1 text-slate-400 hover:bg-slate-100">
                  <X className="size-5" />
                </button>
              </div>
              <form onSubmit={handleCreateExpense} className="mt-4 space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700">Expense Category</label>
                  <input
                    type="text"
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-slate-300 p-2.5 text-xs outline-none focus:border-[#0F1E36]"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700">Vendor / Merchant</label>
                  <input
                    type="text"
                    value={form.vendor}
                    onChange={(e) => setForm({ ...form, vendor: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-slate-300 p-2.5 text-xs outline-none focus:border-[#0F1E36]"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-700">Paid Through</label>
                    <input
                      type="text"
                      value={form.paidThrough}
                      onChange={(e) => setForm({ ...form, paidThrough: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-slate-300 p-2.5 text-xs outline-none focus:border-[#0F1E36]"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700">Amount ($)</label>
                    <input
                      type="number"
                      value={form.amount}
                      onChange={(e) => setForm({ ...form, amount: Number(e.target.value) })}
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
                    Save Expense
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
