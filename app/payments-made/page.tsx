'use client'

import { useMemo, useState } from 'react'
import { ChevronDown, MoreHorizontal, Plus } from 'lucide-react'
import { DashboardShell } from '@/components/dashboard'
import { PAYMENTS_MADE_DATA, type PaymentMadeItem } from '@/lib/dashboard-data'

export default function PaymentsMadePage() {
  const [payments, setPayments] = useState<PaymentMadeItem[]>(PAYMENTS_MADE_DATA)
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = useMemo(() => {
    return payments.filter((p) => {
      const q = searchQuery.toLowerCase()
      return (
        p.paymentNumber.toLowerCase().includes(q) ||
        p.vendorName.toLowerCase().includes(q) ||
        p.billNumber.toLowerCase().includes(q)
      )
    })
  }, [payments, searchQuery])

  return (
    <DashboardShell searchQuery={searchQuery} onSearchChange={setSearchQuery}>
      <div className="space-y-6 p-4 sm:p-6 lg:p-8">
        {/* Luxury Subheader */}
        <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <div className="flex size-9 items-center justify-center rounded-xl bg-[#0F1E36]/5 text-[#0F1E36]">
              <ChevronDown className="size-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base font-bold text-slate-900">Payments Made</span>
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">
                  {filtered.length}
                </span>
              </div>
              <p className="text-xs text-slate-500">Outgoing bank wires, supplier settlements & atelier deposits</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
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
            <table className="w-full min-w-[700px] text-left text-xs">
              <thead className="border-b border-slate-200 bg-slate-50 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-4 py-3.5">Date</th>
                  <th className="px-4 py-3.5">Payment #</th>
                  <th className="px-4 py-3.5">Vendor</th>
                  <th className="px-4 py-3.5">Bill #</th>
                  <th className="px-4 py-3.5">Payment Mode</th>
                  <th className="px-4 py-3.5 text-right">Amount Paid</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((p) => (
                  <tr key={p.id} className="transition-colors hover:bg-slate-50/70">
                    <td className="px-4 py-3.5 text-slate-500">{p.date}</td>
                    <td className="px-4 py-3.5 font-bold font-mono text-[#0F1E36]">{p.paymentNumber}</td>
                    <td className="px-4 py-3.5 font-semibold text-slate-900">{p.vendorName}</td>
                    <td className="px-4 py-3.5 font-mono text-slate-700">{p.billNumber}</td>
                    <td className="px-4 py-3.5 text-slate-600">{p.mode}</td>
                    <td className="px-4 py-3.5 text-right font-bold text-slate-900">
                      ${p.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardShell>
  )
}
