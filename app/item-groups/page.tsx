'use client'

import { useMemo, useState } from 'react'
import { Boxes, ChevronDown, MoreHorizontal, Package, Plus } from 'lucide-react'
import { DashboardShell } from '@/components/dashboard'
import { ITEM_GROUPS_DATA, type ItemGroupItem } from '@/lib/dashboard-data'

export default function ItemGroupsPage() {
  const [groups, setGroups] = useState<ItemGroupItem[]>(ITEM_GROUPS_DATA)
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = useMemo(() => {
    return groups.filter((g) => {
      const q = searchQuery.toLowerCase()
      return (
        g.groupName.toLowerCase().includes(q) ||
        g.primaryCategory.toLowerCase().includes(q)
      )
    })
  }, [groups, searchQuery])

  return (
    <DashboardShell searchQuery={searchQuery} onSearchChange={setSearchQuery}>
      <div className="flex flex-col sm:flex-row sm:h-14 sm:items-center justify-between gap-3 border-b border-[#eaebf0] px-4 py-3 sm:px-6 sm:py-0">
        <button
          type="button"
          className="flex items-center gap-1.5 text-base font-bold text-[#1e293b] hover:text-[#1b73e8]"
        >
          <span>Item Groups</span>
          <ChevronDown className="size-4 text-[#64748b]" />
        </button>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="flex h-8 items-center gap-1 rounded-lg bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 px-3 text-xs font-semibold text-white shadow-xs hover:scale-[1.02] active:scale-95 transition-all"
          >
            <Plus className="size-4" />
            <span className="hidden sm:inline">New Item Group</span>
            <span className="sm:hidden">New Group</span>
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
                <th className="px-4 py-3">Group Name</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Variant Attributes</th>
                <th className="px-4 py-3 text-center">Variants Count</th>
                <th className="px-4 py-3 text-center">Total Stock</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f5f9]">
              {filtered.map((g) => (
                <tr key={g.id} className="transition-colors hover:bg-[#f8fafc]">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {g.image ? (
                        <img
                          src={g.image}
                          alt={g.groupName}
                          className="size-10 shrink-0 rounded-lg object-cover border border-slate-200 shadow-2xs"
                        />
                      ) : (
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-slate-100 text-blue-700">
                          <Boxes className="size-5" />
                        </div>
                      )}
                      <div>
                        <p className="font-semibold text-[#1b73e8]">{g.groupName}</p>
                        <p className="text-[10px] text-slate-400">{g.primaryCategory}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[#334155]">{g.primaryCategory}</td>
                  <td className="px-4 py-3 text-[#64748b]">{g.attributeTypes}</td>
                  <td className="px-4 py-3 text-center font-medium text-[#1e293b]">
                    {g.variantsCount} variants
                  </td>
                  <td className="px-4 py-3 text-center font-bold text-emerald-600">
                    {g.totalStock} units
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
