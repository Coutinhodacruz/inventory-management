'use client'

import { useMemo, useState } from 'react'
import { ChevronDown, DollarSign, MoreHorizontal, Plus } from 'lucide-react'
import { DashboardShell } from '@/components/dashboard'
import { PRICE_LISTS_DATA, type PriceListItem } from '@/lib/dashboard-data'

export default function PriceListsPage() {
  const [priceLists, setPriceLists] = useState<PriceListItem[]>(PRICE_LISTS_DATA)
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = useMemo(() => {
    return priceLists.filter((p) => {
      const q = searchQuery.toLowerCase()
      return (
        p.name.toLowerCase().includes(q) ||
        p.currency.toLowerCase().includes(q) ||
        p.applicableTo.toLowerCase().includes(q)
      )
    })
  }, [priceLists, searchQuery])

  return (
    <DashboardShell searchQuery={searchQuery} onSearchChange={setSearchQuery}>
      <div className="flex flex-col sm:flex-row sm:h-14 sm:items-center justify-between gap-3 border-b border-[#eaebf0] px-4 py-3 sm:px-6 sm:py-0">
        <button
          type="button"
          className="flex items-center gap-1.5 text-base font-bold text-[#1e293b] hover:text-[#1b73e8]"
        >
          <span>Price Lists</span>
          <ChevronDown className="size-4 text-[#64748b]" />
        </button>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="flex h-8 items-center gap-1 rounded-lg bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 px-3 text-xs font-semibold text-white shadow-xs hover:scale-[1.02] active:scale-95 transition-all"
          >
            <Plus className="size-4" />
            <span className="hidden sm:inline">New Price List</span>
            <span className="sm:hidden">New List</span>
          </button>
          <button
            type="button"
            className="flex size-8 items-center justify-center rounded-lg border border-[#d1d5db] bg-white text-[#4b5563] hover:bg-neutral-50"
          >
            <MoreHorizontal className="size-4" />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto p-4 sm:p-6">
        <div className="overflow-hidden rounded-lg border border-[#eaebf0] bg-white shadow-xs">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-[#eaebf0] bg-[#f8fafc] text-[11px] font-semibold uppercase tracking-wider text-[#64748b]">
              <tr>
                <th className="px-4 py-3">Price List Name</th>
                <th className="px-4 py-3">Pricing Scheme</th>
                <th className="px-4 py-3">Currency</th>
                <th className="px-4 py-3">Adjustment</th>
                <th className="px-4 py-3">Applicable To</th>
                <th className="px-4 py-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f5f9]">
              {filtered.map((p) => (
                <tr key={p.id} className="transition-colors hover:bg-[#f8fafc]">
                  <td className="px-4 py-3 font-semibold text-[#1b73e8]">{p.name}</td>
                  <td className="px-4 py-3 text-[#334155]">{p.pricingScheme}</td>
                  <td className="px-4 py-3 font-medium text-[#1e293b]">{p.currency}</td>
                  <td className="px-4 py-3 text-[#475569]">
                    {p.markupPercentage > 0 ? `+${p.markupPercentage}%` : `${p.markupPercentage}%`}
                  </td>
                  <td className="px-4 py-3 text-[#64748b]">{p.applicableTo}</td>
                  <td className="px-4 py-3 text-center">
                    <span className="inline-flex items-center rounded bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700">
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardShell>
  )
}
