'use client'

import { useMemo, useState } from 'react'
import {
  CheckCircle2,
  Clock,
  Download,
  Filter,
  MoreHorizontal,
  PackageCheck,
  Plus,
  ShoppingCart,
  Truck,
  X,
} from 'lucide-react'
import { DashboardShell } from '@/components/dashboard'
import { SALES_ORDERS, type SalesOrderItem } from '@/lib/dashboard-data'

export default function SalesOrdersPage() {
  const [orders, setOrders] = useState<SalesOrderItem[]>(SALES_ORDERS)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatus, setSelectedStatus] = useState<string>('All')
  const [selectedChannel, setSelectedChannel] = useState<string>('All')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [form, setForm] = useState({
    customerName: '',
    itemsCount: 2,
    totalAmount: 760.0,
    channel: 'Instagram Direct (@elufidiya1975)' as SalesOrderItem['channel'],
  })

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const q = searchQuery.toLowerCase()
      const matchesSearch =
        order.orderNumber.toLowerCase().includes(q) ||
        order.customerName.toLowerCase().includes(q) ||
        order.channel.toLowerCase().includes(q)

      const matchesStatus =
        selectedStatus === 'All' || order.fulfillmentStatus === selectedStatus

      const matchesChannel =
        selectedChannel === 'All' || order.channel === selectedChannel

      return matchesSearch && matchesStatus && matchesChannel
    })
  }, [orders, searchQuery, selectedStatus, selectedChannel])

  const totalRevenue = useMemo(
    () => orders.reduce((acc, o) => acc + o.totalAmount, 0),
    [orders],
  )
  const pendingOrders = useMemo(
    () =>
      orders.filter(
        (o) =>
          o.fulfillmentStatus === 'Confirmed' ||
          o.fulfillmentStatus === 'Packed',
      ).length,
    [orders],
  )

  const handleCreateOrder = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.customerName) return

    const newOrder: SalesOrderItem = {
      id: `so-${Date.now()}`,
      orderNumber: `SO-${1048 + orders.length + 1}`,
      customerName: form.customerName,
      date: 'Today',
      expectedShipment: 'Tomorrow',
      itemsCount: Number(form.itemsCount),
      totalAmount: Number(form.totalAmount),
      paymentStatus: 'Paid',
      fulfillmentStatus: 'Confirmed',
      channel: form.channel,
    }
    setOrders([newOrder, ...orders])
    setIsModalOpen(false)
    setForm({
      customerName: '',
      itemsCount: 2,
      totalAmount: 760.0,
      channel: 'Instagram Direct (@elufidiya1975)',
    })
  }

  return (
    <DashboardShell searchQuery={searchQuery} onSearchChange={setSearchQuery}>
      <div className="space-y-6 p-4 sm:p-6 lg:p-8">
        {/* Page Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                Sales Orders
              </h1>
              <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-700 border border-blue-200">
                {orders.length} Orders
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-500">
              Order fulfillment workflow: confirm orders, generate picklists, pack, and dispatch.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-xs hover:bg-slate-50 transition-colors"
            >
              <Download className="size-3.5" /> <span>Export</span>
            </button>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 px-4 py-2 text-xs font-bold text-white shadow-md shadow-blue-600/25 hover:scale-[1.02] active:scale-95 transition-all"
            >
              <Plus className="size-4" strokeWidth={2.5} />
              <span>New Sales Order</span>
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-xs">
            <p className="text-xs font-medium text-slate-500">Total Orders Value</p>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-2xl font-bold text-slate-900">
                ${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>
              <span className="text-[11px] font-semibold text-emerald-600">+12.4% vs last mo</span>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-xs">
            <p className="text-xs font-medium text-slate-500">Awaiting Fulfillment</p>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-2xl font-bold text-amber-600">{pendingOrders} orders</span>
              <span className="text-[11px] font-semibold text-amber-600">Pick & pack</span>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-xs">
            <p className="text-xs font-medium text-slate-500">Dispatched & In Transit</p>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-2xl font-bold text-slate-900">2 shipments</span>
              <span className="text-[11px] font-semibold text-emerald-600">On schedule</span>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-xs">
            <p className="text-xs font-medium text-slate-500">Average Order Size</p>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-2xl font-bold text-slate-900">
                ${(totalRevenue / (orders.length || 1)).toFixed(0)}
              </span>
              <span className="text-[11px] font-semibold text-emerald-600">Healthy margin</span>
            </div>
          </div>
        </div>

        {/* Filter and Tab Bar */}
        <div className="flex flex-col gap-3 rounded-2xl border border-slate-200/90 bg-white p-3 sm:flex-row sm:items-center sm:justify-between shadow-xs">
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            {['All', 'Confirmed', 'Packed', 'Shipped', 'Delivered', 'Draft'].map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => setSelectedStatus(status)}
                className={`rounded-xl px-3 py-1.5 font-medium transition-colors ${
                  selectedStatus === status
                    ? 'bg-blue-600 text-white shadow-xs font-bold'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {status}
              </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Filter className="size-3.5 text-[#87928c]" />
          <span className="text-xs text-[#87928c]">Channel:</span>
          <select
            value={selectedChannel}
            onChange={(e) => setSelectedChannel(e.target.value)}
            className="rounded-lg border border-[#dbe3dc] bg-[#f8faf8] px-2.5 py-1 text-xs font-medium text-[#1e2c26] outline-none"
          >
            <option value="All">All Channels</option>
            <option value="Instagram Direct (@elufidiya1975)">Instagram Direct (@elufidiya1975)</option>
            <option value="VIP Concierge">VIP Concierge</option>
            <option value="Boutique POS">Boutique POS</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="mt-4 overflow-hidden rounded-2xl border border-[#dbe3dc] bg-white shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[780px] text-left">
            <thead>
              <tr className="border-b border-[#edf1ed] bg-[#fbfdfb] text-[10px] font-semibold uppercase tracking-[0.1em] text-[#8e9b94]">
                <th className="px-5 py-3.5">Order #</th>
                <th className="px-4 py-3.5">Date</th>
                <th className="px-4 py-3.5">Customer Name</th>
                <th className="px-4 py-3.5">Sales Channel</th>
                <th className="px-4 py-3.5 text-right">Items</th>
                <th className="px-4 py-3.5 text-right">Total Amount</th>
                <th className="px-4 py-3.5 text-center">Payment</th>
                <th className="px-5 py-3.5 text-center">Fulfillment</th>
                <th className="px-4 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-5 py-12 text-center text-xs text-[#87928c]">
                    No sales orders found for this criteria.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((so) => (
                  <tr
                    key={so.id}
                    className="border-b border-[#f0f3f0] transition-colors hover:bg-[#fafbfa] last:border-0"
                  >
                    <td className="px-5 py-3.5 text-xs font-mono font-bold text-[#1e2c26]">
                      {so.orderNumber}
                    </td>
                    <td className="px-4 py-3.5 text-xs text-[#607068]">{so.date}</td>
                    <td className="px-4 py-3.5 text-xs font-semibold text-[#1e2c26]">
                      {so.customerName}
                    </td>
                    <td className="px-4 py-3.5 text-xs text-[#728078]">{so.channel}</td>
                    <td className="px-4 py-3.5 text-right text-xs font-medium text-[#1e2c26]">
                      {so.itemsCount} pcs
                    </td>
                    <td className="px-4 py-3.5 text-right text-xs font-bold text-[#1e2c26]">
                      ${so.totalAmount.toFixed(2)}
                    </td>
                    <td className="px-4 py-3.5 text-center">
                      <span
                        className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                          so.paymentStatus === 'Paid'
                            ? 'bg-[#e8f1ed] text-[#47715d]'
                            : so.paymentStatus === 'Partial'
                            ? 'bg-[#fff7df] text-[#a1792f]'
                            : 'bg-[#fff0e6] text-[#c47748]'
                        }`}
                      >
                        {so.paymentStatus}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-center">
                      <span
                        className={`inline-block rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                          so.fulfillmentStatus === 'Delivered'
                            ? 'bg-[#e8f1ed] text-[#47715d]'
                            : so.fulfillmentStatus === 'Shipped'
                            ? 'bg-[#e9edfb] text-[#6172af]'
                            : so.fulfillmentStatus === 'Packed'
                            ? 'bg-[#edf8c9] text-[#627b1b]'
                            : so.fulfillmentStatus === 'Confirmed'
                            ? 'bg-[#fff7df] text-[#a1792f]'
                            : 'bg-neutral-100 text-neutral-600'
                        }`}
                      >
                        {so.fulfillmentStatus}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      <button
                        type="button"
                        className="rounded-lg p-1.5 text-[#9aa69f] hover:bg-neutral-100 hover:text-[#1e2c26]"
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

      {/* New Sales Order Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">Create Sales Order</h3>
                <p className="text-xs text-slate-500">
                  Issue a new customer order and allocate stock.
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

            <form onSubmit={handleCreateOrder} className="mt-4 space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-700">Customer Name</label>
                <input
                  required
                  value={form.customerName}
                  onChange={(e) => setForm({ ...form, customerName: e.target.value })}
                  placeholder="e.g. Acme Supplies Co."
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/15"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700">Order Channel</label>
                  <select
                    value={form.channel}
                    onChange={(e) =>
                      setForm({ ...form, channel: e.target.value as SalesOrderItem['channel'] })
                    }
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-xs outline-none"
                  >
                    <option value="Instagram Direct (@elufidiya1975)">
                      Instagram Direct (@elufidiya1975)
                    </option>
                    <option value="VIP Concierge">VIP Concierge</option>
                    <option value="Boutique POS">Boutique POS</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700">Number of Items</label>
                  <input
                    type="number"
                    min="1"
                    value={form.itemsCount}
                    onChange={(e) => setForm({ ...form, itemsCount: Number(e.target.value) })}
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-xs outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700">Total Amount ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={form.totalAmount}
                  onChange={(e) => setForm({ ...form, totalAmount: Number(e.target.value) })}
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/15"
                />
              </div>

              <div className="flex justify-end gap-2.5 border-t border-slate-100 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 px-4 py-2 text-xs font-bold text-white shadow-md shadow-blue-600/25 hover:scale-[1.02] active:scale-95 transition-all"
                >
                  Generate Order
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
