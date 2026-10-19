'use client'

import { useMemo, useState } from 'react'
import { Box, ChevronDown, Layers, MoreHorizontal, Plus } from 'lucide-react'
import { DashboardShell } from '@/components/dashboard'
import { COMPOSITE_ITEMS_DATA, type CompositeItem } from '@/lib/dashboard-data'

export default function CompositeItemsPage() {
  const [items, setItems] = useState<CompositeItem[]>(COMPOSITE_ITEMS_DATA)
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = useMemo(() => {
    return items.filter((i) => {
      const q = searchQuery.toLowerCase()
      return (
        i.name.toLowerCase().includes(q) ||
        i.sku.toLowerCase().includes(q) ||
        i.components.toLowerCase().includes(q)
      )
    })
  }, [items, searchQuery])

  return (
    <DashboardShell searchQuery={searchQuery} onSearchChange={setSearchQuery}>
      <div className="flex flex-col sm:flex-row sm:h-14 sm:items-center justify-between gap-3 border-b border-[#eaebf0] px-4 py-3 sm:px-6 sm:py-0">
        <button
          type="button"
          className="flex items-center gap-1.5 text-base font-bold text-[#1e293b] hover:text-[#1b73e8]"
        >
          <span>Composite Items (Bundles)</span>
          <ChevronDown className="size-4 text-[#64748b]" />
        </button>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="flex h-8 items-center gap-1 rounded-lg bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 px-3 text-xs font-semibold text-white shadow-xs hover:scale-[1.02] active:scale-95 transition-all"
          >
            <Plus className="size-4" />
            <span className="hidden sm:inline">New Composite Item</span>
            <span className="sm:hidden">New Bundle</span>
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
                <th className="px-4 py-3">Bundle / Composite Name</th>
                <th className="px-4 py-3">SKU</th>
                <th className="px-4 py-3">Component Items</th>
                <th className="px-4 py-3 text-center">Available Units</th>
                <th className="px-4 py-3 text-right">Selling Price</th>
                <th className="px-4 py-3 text-right">Cost Price</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f5f9]">
              {filtered.map((i) => (
                <tr key={i.id} className="transition-colors hover:bg-[#f8fafc]">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3.5">
                      {i.image ? (
                        <img
                          src={i.image}
                          alt={i.name}
                          className="size-20 sm:size-24 shrink-0 rounded-2xl object-cover border-2 border-slate-200/90 shadow-md transition-transform duration-300 hover:scale-105"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none'
                          }}
                        />
                      ) : (
                        <div className="flex size-20 sm:size-24 shrink-0 items-center justify-center rounded-2xl border-2 border-slate-200 bg-slate-100 text-blue-700 shadow-xs">
                          <Layers className="size-8" />
                        </div>
                      )}
                      <div>
                        <p className="font-semibold text-[#1b73e8]">{i.name}</p>
                        <p className="font-mono text-[10px] text-slate-400">{i.sku}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-mono text-[#334155]">{i.sku}</td>
                  <td className="px-4 py-3 text-[#475569]">{i.components}</td>
                  <td className="px-4 py-3 text-center font-bold text-emerald-600">
                    {i.stockAvailable} sets
                  </td>
                  <td className="px-4 py-3 text-right font-medium text-[#1e293b]">
                    ${i.sellingPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-4 py-3 text-right text-[#64748b]">
                    ${i.costPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}
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
