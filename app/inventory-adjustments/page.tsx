'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import {
  BarChart2,
  ChevronDown,
  List,
  MoreHorizontal,
  Plus,
  SlidersHorizontal,
  X,
} from 'lucide-react'
import { DashboardShell } from '@/components/dashboard'
import {
  STOCK_ADJUSTMENTS,
  type StockAdjustmentItem,
} from '@/lib/dashboard-data'

export default function InventoryAdjustmentsPage() {
  const [adjustments, setAdjustments] =
    useState<StockAdjustmentItem[]>(STOCK_ADJUSTMENTS)
  const [searchQuery, setSearchQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState('All')
  const [periodFilter, setPeriodFilter] = useState('All')
  const [viewMode, setViewMode] = useState<'empty-state' | 'table'>('empty-state')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [form, setForm] = useState({
    reason: 'Inventory Count / Reconcile' as StockAdjustmentItem['reason'],
    warehouse: "D'GTC Flagship Boutique (Nairobi)",
    type: 'Quantity Adjustment' as StockAdjustmentItem['type'],
    adjustedUnits: -2,
    valueChange: '-$760.00',
  })

  const filteredAdjustments = useMemo(() => {
    return adjustments.filter((adj) => {
      const q = searchQuery.toLowerCase()
      const matchesSearch =
        adj.referenceNo.toLowerCase().includes(q) ||
        adj.warehouse.toLowerCase().includes(q) ||
        adj.reason.toLowerCase().includes(q)

      const matchesType =
        typeFilter === 'All' ||
        (typeFilter === 'Quantity' && adj.type === 'Quantity Adjustment') ||
        (typeFilter === 'Value' && adj.type === 'Value Adjustment')

      return matchesSearch && matchesType
    })
  }, [adjustments, searchQuery, typeFilter])

  const handleCreateAdjustment = (e: React.FormEvent) => {
    e.preventDefault()
    const newAdj: StockAdjustmentItem = {
      id: `adj-${Date.now()}`,
      referenceNo: `ADJ-ELF-00${adjustments.length + 1}`,
      date: 'Today',
      reason: form.reason,
      warehouse: form.warehouse,
      type: form.type,
      adjustedUnits: Number(form.adjustedUnits),
      valueChange: form.valueChange,
      adjustedBy: 'Elufidiya',
      status: 'Adjusted',
    }
    setAdjustments([newAdj, ...adjustments])
    setIsModalOpen(false)
    setViewMode('table')
  }

  return (
    <DashboardShell
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      onQuickCreate={() => setIsModalOpen(true)}
    >
      {/* Subheader */}
      <div className="flex flex-col justify-between gap-3 border-b border-[#eaebf0] px-4 py-3 sm:px-6 sm:h-14 sm:flex-row sm:items-center sm:py-0">
        <h1 className="text-base font-bold text-[#1e293b]">Inventory Adjustments</h1>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* FIFO Cost Lot Tracking Report Link */}
          <button
            type="button"
            className="flex items-center gap-1.5 text-xs font-medium text-[#1b73e8] hover:underline"
          >
            <BarChart2 className="size-3.5" />
            <span className="hidden xs:inline">FIFO Cost Lot Tracking</span>
          </button>

          {/* Toggle between Zoho empty view and records table */}
          <button
            type="button"
            onClick={() => setViewMode(viewMode === 'empty-state' ? 'table' : 'empty-state')}
            className="rounded border border-[#d1d5db] bg-white px-2 py-1 text-xs font-medium text-[#4b5563] hover:bg-neutral-50"
          >
            {viewMode === 'empty-state' ? 'View Table' : 'View Guide'}
          </button>

          {/* + New Button */}
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="flex h-8 items-center gap-1.5 rounded-lg bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 px-3 text-xs font-bold text-white shadow-md shadow-blue-600/30 hover:scale-[1.02] active:scale-95 transition-all"
          >
            <Plus className="size-4" />
            <span>New</span>
          </button>

          {/* More options (...) */}
          <button
            type="button"
            className="flex size-8 items-center justify-center rounded border border-[#d1d5db] bg-white text-[#4b5563] hover:bg-neutral-50"
          >
            <MoreHorizontal className="size-4" />
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-3 border-b border-[#eaebf0] bg-[#fafbfd] px-4 py-2 sm:px-6 text-xs text-[#64748b]">
        <span className="font-medium text-[#475569]">Filter By :</span>

        {/* Type dropdown */}
        <div className="flex items-center gap-1 rounded border border-[#cbd5e1] bg-white px-2 py-1 text-xs">
          <span>Type: {typeFilter}</span>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="cursor-pointer bg-transparent outline-none"
          >
            <option value="All">All</option>
            <option value="Quantity">Quantity Adjustment</option>
            <option value="Value">Value Adjustment</option>
          </select>
        </div>

        {/* Period dropdown */}
        <div className="flex items-center gap-1 rounded border border-[#cbd5e1] bg-white px-2 py-1 text-xs">
          <span>Period: {periodFilter}</span>
          <select
            value={periodFilter}
            onChange={(e) => setPeriodFilter(e.target.value)}
            className="cursor-pointer bg-transparent outline-none"
          >
            <option value="All">All</option>
            <option value="Today">Today</option>
            <option value="This Month">This Month</option>
            <option value="This Year">This Year</option>
          </select>
        </div>
      </div>

      {/* Main Content Area */}
      {viewMode === 'empty-state' ? (
        /* Exact Zoho Onboarding View from Screenshot 2 */
        <div className="flex flex-col items-center justify-center px-4 py-28 text-center">
          <h2 className="text-xl font-bold tracking-tight text-[#1e293b]">
            Keep Your Inventory Accurate
          </h2>
          <p className="mt-2 text-xs text-[#64748b]">
            Adjust your inventory to ensure accurate quantity and value.
          </p>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="mt-6 rounded bg-[#1b73e8] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition-colors hover:bg-[#1558b0]"
          >
            CREATE ADJUSTMENT
          </button>
        </div>
      ) : (
        /* Adjustments Records Table */
        <div className="p-6">
          <div className="overflow-hidden rounded-lg border border-[#eaebf0] bg-white shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left">
                <thead>
                  <tr className="border-b border-[#eaebf0] bg-[#f8fafc] text-[11px] font-semibold uppercase tracking-wider text-[#64748b]">
                    <th className="px-4 py-3">Reference #</th>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Reason</th>
                    <th className="px-4 py-3">Boutique / Warehouse</th>
                    <th className="px-4 py-3">Type</th>
                    <th className="px-4 py-3 text-right">Units</th>
                    <th className="px-4 py-3 text-right">Value Change</th>
                    <th className="px-4 py-3">Adjusted By</th>
                    <th className="px-4 py-3 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f1f5f9] text-xs">
                  {filteredAdjustments.map((adj) => (
                    <tr key={adj.id} className="hover:bg-[#f8fafc]">
                      <td className="px-4 py-3.5 font-mono font-semibold text-[#1b73e8]">
                        {adj.referenceNo}
                      </td>
                      <td className="px-4 py-3.5 text-[#64748b]">{adj.date}</td>
                      <td className="px-4 py-3.5 font-medium text-[#1e293b]">{adj.reason}</td>
                      <td className="px-4 py-3.5 text-[#64748b]">{adj.warehouse}</td>
                      <td className="px-4 py-3.5 text-[#64748b]">{adj.type}</td>
                      <td className="px-4 py-3.5 text-right font-semibold">
                        <span className={adj.adjustedUnits > 0 ? 'text-[#137333]' : 'text-[#c5221f]'}>
                          {adj.adjustedUnits > 0 ? `+${adj.adjustedUnits}` : adj.adjustedUnits}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-right font-semibold">
                        <span className={adj.valueChange.startsWith('+') ? 'text-[#137333]' : 'text-[#c5221f]'}>
                          {adj.valueChange}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-[#64748b]">{adj.adjustedBy}</td>
                      <td className="px-4 py-3.5 text-center">
                        <span className="inline-block rounded-full bg-[#e6f4ea] px-2 py-0.5 text-[10px] font-semibold text-[#137333]">
                          {adj.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Create Adjustment Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-xl border border-[#e2e8f0] bg-white p-5 sm:p-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-[#f1f5f9] pb-3">
              <h3 className="text-base font-bold text-[#1e293b]">Record Inventory Adjustment</h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="rounded p-1 text-[#64748b] hover:bg-neutral-100"
              >
                <X className="size-4" />
              </button>
            </div>

            <form onSubmit={handleCreateAdjustment} className="mt-4 space-y-4">
              <div>
                <label className="text-xs font-semibold text-[#475569]">Mode</label>
                <select
                  value={form.type}
                  onChange={(e) =>
                    setForm({ ...form, type: e.target.value as StockAdjustmentItem['type'] })
                  }
                  className="mt-1 w-full rounded border border-[#cbd5e1] px-2.5 py-1.5 text-xs outline-none"
                >
                  <option value="Quantity Adjustment">Quantity Adjustment</option>
                  <option value="Value Adjustment">Value Adjustment</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#475569]">Reason</label>
                <select
                  value={form.reason}
                  onChange={(e) =>
                    setForm({ ...form, reason: e.target.value as StockAdjustmentItem['reason'] })
                  }
                  className="mt-1 w-full rounded border border-[#cbd5e1] px-2.5 py-1.5 text-xs outline-none"
                >
                  <option value="Inventory Count / Reconcile">Inventory Count / Reconcile</option>
                  <option value="Damaged Goods">Damaged Goods</option>
                  <option value="Stock Found">Stock Found</option>
                  <option value="Stock Write-off">Stock Write-off</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#475569]">Boutique / Warehouse</label>
                  <select
                    value={form.warehouse}
                    onChange={(e) => setForm({ ...form, warehouse: e.target.value })}
                    className="mt-1 w-full rounded border border-[#cbd5e1] px-2.5 py-1.5 text-xs outline-none"
                  >
                    <option value="D'GTC Flagship Boutique (Nairobi)">
                      D&apos;GTC Flagship Boutique (Nairobi)
                    </option>
                    <option value="Villa Rosa Kempinski Boutique (Nairobi)">
                      Villa Rosa Kempinski Boutique (Nairobi)
                    </option>
                    <option value="Lagos Atelier & Distribution Hub">
                      Lagos Atelier &amp; Distribution Hub
                    </option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#475569]">Adjusted Units (+/-)</label>
                  <input
                    type="number"
                    value={form.adjustedUnits}
                    onChange={(e) => setForm({ ...form, adjustedUnits: Number(e.target.value) })}
                    className="mt-1 w-full rounded border border-[#cbd5e1] px-2.5 py-1.5 text-xs outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#475569]">Estimated Value ($)</label>
                <input
                  value={form.valueChange}
                  onChange={(e) => setForm({ ...form, valueChange: e.target.value })}
                  placeholder="-$760.00"
                  className="mt-1 w-full rounded border border-[#cbd5e1] px-3 py-1.5 text-xs outline-none focus:border-[#1b73e8]"
                />
              </div>

              <div className="flex justify-end gap-2 border-t border-[#f1f5f9] pt-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded border border-[#cbd5e1] px-3.5 py-1.5 text-xs font-semibold text-[#475569] hover:bg-neutral-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 px-4 py-1.5 text-xs font-bold text-white shadow-md shadow-blue-600/30 hover:scale-[1.02] active:scale-95 transition-all"
                >
                  Confirm Adjustment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardShell>
  )
}
