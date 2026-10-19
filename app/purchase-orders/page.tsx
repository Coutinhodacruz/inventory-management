'use client'

import { useMemo, useState } from 'react'
import {
  CheckCircle2,
  ClipboardList,
  Download,
  Filter,
  MoreHorizontal,
  Plus,
  RefreshCw,
  Truck,
  X,
} from 'lucide-react'
import { DashboardShell } from '@/components/dashboard'
import { PURCHASE_ORDERS, type PurchaseOrderItem } from '@/lib/dashboard-data'

export default function PurchaseOrdersPage() {
  const [orders, setOrders] = useState<PurchaseOrderItem[]>(PURCHASE_ORDERS)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatus, setSelectedStatus] = useState<string>('All')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [form, setForm] = useState({
    supplierName: '',
    totalUnits: 100,
    totalCost: 3500.0,
  })

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const q = searchQuery.toLowerCase()
      const matchesSearch =
        order.poNumber.toLowerCase().includes(q) ||
        order.supplierName.toLowerCase().includes(q)

      const matchesStatus =
        selectedStatus === 'All' || order.status === selectedStatus

      return matchesSearch && matchesStatus
    })
  }, [orders, searchQuery, selectedStatus])

  const totalCost = useMemo(
    () => orders.reduce((acc, o) => acc + o.totalCost, 0),
    [orders],
  )

  const handleCreatePO = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.supplierName) return

    const newPO: PurchaseOrderItem = {
      id: `po-${Date.now()}`,
      poNumber: `PO-${208 + orders.length + 1}`,
      supplierName: form.supplierName,
      orderDate: 'Today',
      expectedDate: 'In 10 days',
      itemTypesCount: 2,
      totalUnits: Number(form.totalUnits),
      totalCost: Number(form.totalCost),
      status: 'Issued',
      paymentStatus: 'Pending Invoice',
    }
    setOrders([newPO, ...orders])
    setIsModalOpen(false)
    setForm({
      supplierName: '',
      totalUnits: 100,
      totalCost: 3500.0,
    })
  }

  return (
    <DashboardShell searchQuery={searchQuery} onSearchChange={setSearchQuery}>
      <div className="space-y-6 p-4 sm:p-6 lg:p-8">
        {/* Page Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0F1E36]">
                Purchase Orders
              </h1>
              <span className="rounded-full bg-[#0F1E36]/10 px-2.5 py-0.5 text-xs font-semibold text-[#0F1E36]">
                {orders.length} POs
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-500">
              Supplier procurement tracking: issue purchase orders, record incoming goods, and convert to bills.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-xs hover:bg-slate-50"
            >
              <Download className="size-3.5" /> Export POs
            </button>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#0F1E36] via-[#162B4D] to-[#8A1538] px-4 py-2 text-xs font-bold text-white shadow-md shadow-[#0F1E36]/20 hover:scale-[1.02] active:scale-95 transition-all"
            >
              <Plus className="size-4" /> New Purchase Order
            </button>
          </div>
        </div>

        {/* KPI Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
            <p className="text-xs font-medium text-slate-500">Total Purchase Commitments</p>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-2xl font-bold text-[#0F1E36]">
                ${totalCost.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>
              <span className="text-[11px] font-semibold text-emerald-600">3 active POs</span>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
            <p className="text-xs font-medium text-slate-500">Awaiting Receiving</p>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-2xl font-bold text-amber-600">230 units</span>
              <span className="text-[11px] font-semibold text-amber-600">Expected this wk</span>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
            <p className="text-xs font-medium text-slate-500">Inventory Received</p>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-2xl font-bold text-[#0F1E36]">320 units</span>
              <span className="text-[11px] font-semibold text-emerald-600">Added to stock</span>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
            <p className="text-xs font-medium text-slate-500">Billed & Settled</p>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-2xl font-bold text-[#0F1E36]">$11,450.00</span>
              <span className="text-[11px] font-semibold text-emerald-600">Paid in full</span>
            </div>
          </div>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-3 sm:flex-row sm:items-center sm:justify-between shadow-xs">
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            {['All', 'Issued', 'Partially Received', 'Received', 'Draft'].map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => setSelectedStatus(status)}
                className={`rounded-xl px-3 py-1.5 font-semibold transition-colors ${
                  selectedStatus === status
                    ? 'bg-[#0F1E36] text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[780px] text-left">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50 text-[10px] font-semibold uppercase tracking-[0.1em] text-slate-500">
                  <th className="px-5 py-3.5">PO Number</th>
                  <th className="px-4 py-3.5">Order Date</th>
                  <th className="px-4 py-3.5">Supplier Name</th>
                  <th className="px-4 py-3.5">Expected Delivery</th>
                  <th className="px-4 py-3.5 text-right">Items / Units</th>
                  <th className="px-4 py-3.5 text-right">Total Cost</th>
                  <th className="px-4 py-3.5 text-center">Billing</th>
                  <th className="px-5 py-3.5 text-center">Status</th>
                  <th className="px-4 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="px-5 py-12 text-center text-xs text-slate-400">
                      No purchase orders match your search.
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((po) => (
                    <tr
                      key={po.id}
                      className="border-b border-slate-100 transition-colors hover:bg-slate-50/70 last:border-0"
                    >
                      <td className="px-5 py-3.5 text-xs font-mono font-bold text-[#0F1E36]">
                        {po.poNumber}
                      </td>
                      <td className="px-4 py-3.5 text-xs text-slate-500">{po.orderDate}</td>
                      <td className="px-4 py-3.5 text-xs font-semibold text-slate-900">
                        {po.supplierName}
                      </td>
                      <td className="px-4 py-3.5 text-xs text-slate-600">{po.expectedDate}</td>
                      <td className="px-4 py-3.5 text-right text-xs text-slate-900">
                        {po.itemTypesCount} types · <strong>{po.totalUnits} pcs</strong>
                      </td>
                      <td className="px-4 py-3.5 text-right text-xs font-bold text-[#0F1E36]">
                        ${po.totalCost.toFixed(2)}
                      </td>
                      <td className="px-4 py-3.5 text-center">
                        <span
                          className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-bold ${
                            po.paymentStatus === 'Paid'
                              ? 'bg-emerald-50 text-emerald-700'
                              : 'bg-amber-50 text-amber-700'
                          }`}
                        >
                          {po.paymentStatus}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-center">
                        <span
                          className={`inline-block rounded-full px-2.5 py-1 text-[10px] font-bold ${
                            po.status === 'Received'
                              ? 'bg-emerald-50 text-emerald-700'
                              : po.status === 'Partially Received'
                              ? 'bg-blue-50 text-blue-700'
                              : po.status === 'Issued'
                              ? 'bg-indigo-50 text-indigo-700'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {po.status}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-right">
                        <button
                          type="button"
                          className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                        >
                          <MoreHorizontal className="size-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* New PO Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
            <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-base font-bold text-[#0F1E36]">New Purchase Order</h3>
                  <p className="text-xs text-slate-500">
                    Order new luxury inventory batches from verified suppliers.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-lg p-1 text-slate-400 hover:bg-slate-100"
                >
                  <X className="size-5" />
                </button>
              </div>

              <form onSubmit={handleCreatePO} className="mt-4 space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700">Supplier</label>
                  <input
                    required
                    value={form.supplierName}
                    onChange={(e) => setForm({ ...form, supplierName: e.target.value })}
                    placeholder="e.g. Tuscan Tannery Consortium"
                    className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-xs outline-none focus:border-[#0F1E36]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-700">Total Units</label>
                    <input
                      type="number"
                      min="1"
                      value={form.totalUnits}
                      onChange={(e) => setForm({ ...form, totalUnits: Number(e.target.value) })}
                      className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-xs outline-none focus:border-[#0F1E36]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700">Total Cost ($)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={form.totalCost}
                      onChange={(e) => setForm({ ...form, totalCost: Number(e.target.value) })}
                      className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-xs outline-none focus:border-[#0F1E36]"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-end gap-2.5 border-t border-slate-100 pt-4">
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
                    Send Purchase Order
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
