'use client'

import { useMemo, useState } from 'react'
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Download,
  Filter,
  MapPin,
  MoreHorizontal,
  PackageCheck,
  Plus,
  Truck,
  X,
} from 'lucide-react'
import { DashboardShell } from '@/components/dashboard'
import { SHIPMENTS_DATA, type ShipmentItem } from '@/lib/dashboard-data'

export default function ShipmentsPage() {
  const [shipments, setShipments] = useState<ShipmentItem[]>(SHIPMENTS_DATA)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatus, setSelectedStatus] = useState<string>('All')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [form, setForm] = useState({
    orderNumber: 'SO-1049',
    customerName: '',
    carrier: 'FedEx' as ShipmentItem['carrier'],
    destination: '',
  })

  const filteredShipments = useMemo(() => {
    return shipments.filter((sh) => {
      const q = searchQuery.toLowerCase()
      const matchesSearch =
        sh.shipmentNumber.toLowerCase().includes(q) ||
        sh.trackingCode.toLowerCase().includes(q) ||
        sh.customerName.toLowerCase().includes(q) ||
        sh.carrier.toLowerCase().includes(q)

      const matchesStatus =
        selectedStatus === 'All' || sh.status === selectedStatus

      return matchesSearch && matchesStatus
    })
  }, [shipments, searchQuery, selectedStatus])

  const handleCreateShipment = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.customerName) return

    const newSh: ShipmentItem = {
      id: `sh-${Date.now()}`,
      shipmentNumber: `SH-${3021 + shipments.length + 1}`,
      orderNumber: form.orderNumber,
      customerName: form.customerName,
      carrier: form.carrier,
      trackingCode: `${form.carrier.slice(0, 3).toUpperCase()}-${Math.floor(
        100000000 + Math.random() * 900000000,
      )}`,
      origin: 'Chicago, IL',
      destination: form.destination || 'New York, NY',
      shippedDate: 'Today',
      estimatedDelivery: 'In 3 days',
      status: 'Dispatched',
    }
    setShipments([newSh, ...shipments])
    setIsModalOpen(false)
  }

  return (
    <DashboardShell searchQuery={searchQuery} onSearchChange={setSearchQuery}>
      <div className="space-y-6 p-4 sm:p-6 lg:p-8">
        {/* Page Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0F1E36]">
                Shipments & Logistics
              </h1>
              <span className="rounded-full bg-[#0F1E36]/10 px-2.5 py-0.5 text-xs font-semibold text-[#0F1E36]">
                {shipments.length} Active Shipments
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-500">
              Integrated VIP courier tracking with FedEx, DHL, and UPS for customer order fulfillment.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-xs hover:bg-slate-50"
            >
              <Download className="size-3.5" /> Manifest
            </button>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#0F1E36] via-[#162B4D] to-[#8A1538] px-4 py-2 text-xs font-bold text-white shadow-md shadow-[#0F1E36]/20 hover:scale-[1.02] active:scale-95 transition-all"
            >
              <Plus className="size-4" /> Dispatch Shipment
            </button>
          </div>
        </div>

        {/* KPI Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
            <p className="text-xs font-medium text-slate-500">Total Dispatched</p>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-2xl font-bold text-[#0F1E36]">{shipments.length} parcels</span>
              <span className="text-[11px] font-semibold text-emerald-600">Live sync</span>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
            <p className="text-xs font-medium text-slate-500">In Transit</p>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-2xl font-bold text-blue-700">1 package</span>
              <span className="text-[11px] font-semibold text-blue-600">Moving across hubs</span>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
            <p className="text-xs font-medium text-slate-500">Delivered On-Time</p>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-2xl font-bold text-emerald-700">100%</span>
              <span className="text-[11px] font-semibold text-emerald-600">Zero delays</span>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
            <p className="text-xs font-medium text-slate-500">Active Carriers</p>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-2xl font-bold text-[#0F1E36]">3 Carriers</span>
              <span className="text-[11px] font-semibold text-slate-500">FedEx, DHL, UPS</span>
            </div>
          </div>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-3 sm:flex-row sm:items-center sm:justify-between shadow-xs">
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            {['All', 'In Transit', 'Dispatched', 'Delivered'].map((status) => (
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
                  <th className="px-5 py-3.5">Shipment #</th>
                  <th className="px-4 py-3.5">Order Ref</th>
                  <th className="px-4 py-3.5">Customer Name</th>
                  <th className="px-4 py-3.5">Carrier</th>
                  <th className="px-4 py-3.5">Tracking Number</th>
                  <th className="px-4 py-3.5">Route</th>
                  <th className="px-4 py-3.5">Est. Delivery</th>
                  <th className="px-5 py-3.5 text-center">Status</th>
                  <th className="px-4 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredShipments.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="px-5 py-12 text-center text-xs text-slate-400">
                      No shipments match this criteria.
                    </td>
                  </tr>
                ) : (
                  filteredShipments.map((sh) => (
                    <tr
                      key={sh.id}
                      className="border-b border-slate-100 transition-colors hover:bg-slate-50/70 last:border-0"
                    >
                      <td className="px-5 py-3.5 text-xs font-mono font-bold text-[#0F1E36]">
                        {sh.shipmentNumber}
                      </td>
                      <td className="px-4 py-3.5 text-xs text-slate-600">{sh.orderNumber}</td>
                      <td className="px-4 py-3.5 text-xs font-semibold text-slate-900">
                        {sh.customerName}
                      </td>
                      <td className="px-4 py-3.5 text-xs font-medium text-slate-800">
                        {sh.carrier}
                      </td>
                      <td className="px-4 py-3.5 text-xs font-mono font-semibold text-[#8A1538]">
                        {sh.trackingCode}
                      </td>
                      <td className="px-4 py-3.5 text-xs text-slate-600">
                        {sh.origin} → <strong>{sh.destination}</strong>
                      </td>
                      <td className="px-4 py-3.5 text-xs text-slate-500">
                        {sh.estimatedDelivery}
                      </td>
                      <td className="px-5 py-3.5 text-center">
                        <span
                          className={`inline-block rounded-full px-2.5 py-1 text-[10px] font-bold ${
                            sh.status === 'Delivered'
                              ? 'bg-emerald-50 text-emerald-700'
                              : sh.status === 'In Transit'
                              ? 'bg-blue-50 text-blue-700'
                              : 'bg-amber-50 text-amber-700'
                          }`}
                        >
                          {sh.status}
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

        {/* Dispatch Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
            <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-base font-bold text-[#0F1E36]">Dispatch Shipment</h3>
                  <p className="text-xs text-slate-500">
                    Generate shipping labels and assign courier tracking.
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

              <form onSubmit={handleCreateShipment} className="mt-4 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-700">Order Ref</label>
                    <input
                      value={form.orderNumber}
                      onChange={(e) => setForm({ ...form, orderNumber: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-xs outline-none focus:border-[#0F1E36]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700">Customer Name</label>
                    <input
                      required
                      value={form.customerName}
                      onChange={(e) => setForm({ ...form, customerName: e.target.value })}
                      placeholder="e.g. Ambassador Kwame"
                      className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-xs outline-none focus:border-[#0F1E36]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-700">Courier Partner</label>
                    <select
                      value={form.carrier}
                      onChange={(e) =>
                        setForm({ ...form, carrier: e.target.value as ShipmentItem['carrier'] })
                      }
                      className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-xs outline-none focus:border-[#0F1E36]"
                    >
                      <option value="FedEx">FedEx</option>
                      <option value="DHL Express">DHL Express</option>
                      <option value="UPS Ground">UPS Ground</option>
                      <option value="USPS Priority">USPS Priority</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700">Destination City</label>
                    <input
                      value={form.destination}
                      onChange={(e) => setForm({ ...form, destination: e.target.value })}
                      placeholder="e.g. Nairobi, Kenya"
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
                    Dispatch Parcel
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
