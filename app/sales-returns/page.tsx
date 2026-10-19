'use client'

import { useMemo, useState } from 'react'
import { ChevronDown, MoreHorizontal, Plus, RotateCcw, X } from 'lucide-react'
import { DashboardShell } from '@/components/dashboard'
import { SALES_RETURNS_DATA, type SalesReturnItem } from '@/lib/dashboard-data'

export default function SalesReturnsPage() {
  const [returns, setReturns] = useState<SalesReturnItem[]>(SALES_RETURNS_DATA)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredReturns = useMemo(() => {
    return returns.filter((r) => {
      const q = searchQuery.toLowerCase()
      return (
        r.returnNumber.toLowerCase().includes(q) ||
        r.customerName.toLowerCase().includes(q) ||
        r.salesOrderNumber.toLowerCase().includes(q)
      )
    })
  }, [returns, searchQuery])

  return (
    <DashboardShell searchQuery={searchQuery} onSearchChange={setSearchQuery}>
      <div className="space-y-6 p-4 sm:p-6 lg:p-8">
        {/* Luxury Subheader */}
        <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <div className="flex size-9 items-center justify-center rounded-xl bg-[#0F1E36]/5 text-[#0F1E36]">
              <RotateCcw className="size-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base font-bold text-slate-900">Sales Returns & RMA</span>
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">
                  {filteredReturns.length}
                </span>
              </div>
              <p className="text-xs text-slate-500">Boutique size exchanges, leather adjustments & returns</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-[#0F1E36] via-[#162B4D] to-[#8A1538] px-4 py-2 text-xs font-bold text-white shadow-md shadow-[#0F1E36]/20 transition-all hover:scale-[1.02] active:scale-95 sm:flex-none"
            >
              <Plus className="size-4" />
              <span>New Return</span>
            </button>
            <button
              type="button"
              className="flex size-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
            >
              <MoreHorizontal className="size-4" />
            </button>
          </div>
        </div>

        {/* Returns Table */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-left text-xs">
              <thead className="border-b border-slate-200 bg-slate-50 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-4 py-3.5">Return Date</th>
                  <th className="px-4 py-3.5">Return #</th>
                  <th className="px-4 py-3.5">Order Number</th>
                  <th className="px-4 py-3.5">Customer</th>
                  <th className="px-4 py-3.5">Reason</th>
                  <th className="px-4 py-3.5">Units</th>
                  <th className="px-4 py-3.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredReturns.map((r) => (
                  <tr key={r.id} className="transition-colors hover:bg-slate-50/70">
                    <td className="px-4 py-3.5 text-slate-500">{r.returnDate}</td>
                    <td className="px-4 py-3.5 font-bold font-mono text-[#0F1E36]">{r.returnNumber}</td>
                    <td className="px-4 py-3.5 font-mono text-slate-700">{r.salesOrderNumber}</td>
                    <td className="px-4 py-3.5 font-semibold text-slate-900">{r.customerName}</td>
                    <td className="px-4 py-3.5 text-slate-700">{r.reason}</td>
                    <td className="px-4 py-3.5 text-slate-500">{r.units} unit</td>
                    <td className="px-4 py-3.5">
                      <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700">
                        {r.status}
                      </span>
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
