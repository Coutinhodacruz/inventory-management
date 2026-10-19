'use client'

import { useMemo, useState } from 'react'
import {
  Box,
  ChevronDown,
  Download,
  ListFilter,
  MoreHorizontal,
  Package,
  Plus,
  SlidersHorizontal,
  Truck,
  X,
} from 'lucide-react'
import { DashboardShell } from '@/components/dashboard'
import { PACKAGES_DATA, type PackageItem } from '@/lib/dashboard-data'

export default function PackagesPage() {
  const [packages, setPackages] = useState<PackageItem[]>(PACKAGES_DATA)
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'empty-graphic' | 'table'>('table')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [form, setForm] = useState({
    salesOrderNumber: 'ELF-SO-108',
    customerName: 'Ambassador Kwame Mensah',
    packagingType: 'Elufidiya Gold-Embossed Presentation Box',
    itemsCount: 1,
    weightKg: 2.1,
  })

  const filteredPackages = useMemo(() => {
    return packages.filter((pkg) => {
      const q = searchQuery.toLowerCase()
      return (
        pkg.packageNumber.toLowerCase().includes(q) ||
        pkg.salesOrderNumber.toLowerCase().includes(q) ||
        pkg.customerName.toLowerCase().includes(q)
      )
    })
  }, [packages, searchQuery])

  const handleCreatePackage = (e: React.FormEvent) => {
    e.preventDefault()
    const newPkg: PackageItem = {
      id: `pkg-${Date.now()}`,
      packageNumber: `PKG-00${packages.length + 105}`,
      salesOrderNumber: form.salesOrderNumber,
      customerName: form.customerName,
      itemsCount: Number(form.itemsCount),
      packagingType: form.packagingType,
      weightKg: Number(form.weightKg),
      status: 'Not Shipped',
      date: 'Today',
    }
    setPackages([newPkg, ...packages])
    setIsModalOpen(false)
    setViewMode('table')
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
              <Package className="size-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base font-bold text-slate-900">All Packages</span>
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">
                  {filteredPackages.length}
                </span>
              </div>
              <p className="text-xs text-slate-500">Luxury parcels prepped for boutique dispatch</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setViewMode(viewMode === 'empty-graphic' ? 'table' : 'empty-graphic')}
              className="flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 sm:flex-none"
            >
              {viewMode === 'empty-graphic' ? 'View Table' : 'Overview'}
            </button>

            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-[#0F1E36] via-[#162B4D] to-[#8A1538] px-4 py-2 text-xs font-bold text-white shadow-md shadow-[#0F1E36]/20 transition-all hover:scale-[1.02] active:scale-95 sm:flex-none"
            >
              <Plus className="size-4" />
              <span>New Package</span>
            </button>

            <button
              type="button"
              className="flex size-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
            >
              <MoreHorizontal className="size-4" />
            </button>
          </div>
        </div>

        {viewMode === 'empty-graphic' ? (
          /* Empty Graphic View */
          <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-16 text-center shadow-xs">
            <div className="relative mb-6 flex size-28 items-center justify-center rounded-2xl bg-[#0F1E36]/5 shadow-inner">
              <Package className="size-14 text-[#0F1E36]/60" strokeWidth={1.5} />
              <div className="absolute -bottom-1 -right-1 flex size-8 items-center justify-center rounded-full bg-[#8A1538] text-white shadow-md">
                <Plus className="size-4" strokeWidth={3} />
              </div>
            </div>
            <h2 className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
              Pack items seamlessly for delivery
            </h2>
            <p className="mt-2 max-w-md text-xs text-slate-500">
              Group products into parcels, print luxury packing slips, and get them prepped for VIP concierge & carrier pickup.
            </p>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="mt-6 rounded-xl bg-gradient-to-r from-[#0F1E36] to-[#8A1538] px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-[#0F1E36]/20 hover:scale-[1.02] active:scale-95"
            >
              New Package
            </button>
          </div>
        ) : (
          /* Data Table */
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left text-xs">
                <thead className="border-b border-slate-200 bg-slate-50 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="px-4 py-3.5">Package #</th>
                    <th className="px-4 py-3.5">Sales Order</th>
                    <th className="px-4 py-3.5">Customer / VIP</th>
                    <th className="px-4 py-3.5">Items</th>
                    <th className="px-4 py-3.5">Packaging Type</th>
                    <th className="px-4 py-3.5">Weight (KG)</th>
                    <th className="px-4 py-3.5">Date</th>
                    <th className="px-4 py-3.5">Status</th>
                    <th className="px-4 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredPackages.map((pkg) => (
                    <tr key={pkg.id} className="transition-colors hover:bg-slate-50/70">
                      <td className="px-4 py-3.5 font-bold font-mono text-[#0F1E36]">{pkg.packageNumber}</td>
                      <td className="px-4 py-3.5 font-mono text-slate-700">{pkg.salesOrderNumber}</td>
                      <td className="px-4 py-3.5 font-semibold text-slate-900">{pkg.customerName}</td>
                      <td className="px-4 py-3.5 text-slate-600">{pkg.itemsCount} units</td>
                      <td className="px-4 py-3.5 text-slate-700">{pkg.packagingType}</td>
                      <td className="px-4 py-3.5 text-slate-600">{pkg.weightKg} kg</td>
                      <td className="px-4 py-3.5 text-slate-500">{pkg.date}</td>
                      <td className="px-4 py-3.5">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                            pkg.status === 'Delivered'
                              ? 'bg-emerald-50 text-emerald-700'
                              : pkg.status === 'Shipped'
                              ? 'bg-blue-50 text-blue-700'
                              : 'bg-amber-50 text-amber-700'
                          }`}
                        >
                          {pkg.status}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-right">
                        <button
                          type="button"
                          className="font-semibold text-[#8A1538] hover:underline"
                        >
                          Create Shipment
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
            <div className="w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-5 sm:p-6 shadow-2xl border border-slate-200">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-base font-bold text-slate-900">Create New Package</h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-lg p-1 text-slate-400 hover:bg-slate-100"
                >
                  <X className="size-5" />
                </button>
              </div>
              <form onSubmit={handleCreatePackage} className="mt-4 space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700">Sales Order #</label>
                  <input
                    type="text"
                    value={form.salesOrderNumber}
                    onChange={(e) => setForm({ ...form, salesOrderNumber: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-slate-300 p-2.5 text-xs outline-none focus:border-[#0F1E36]"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700">Customer Name</label>
                  <input
                    type="text"
                    value={form.customerName}
                    onChange={(e) => setForm({ ...form, customerName: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-slate-300 p-2.5 text-xs outline-none focus:border-[#0F1E36]"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700">Packaging Box Type</label>
                  <input
                    type="text"
                    value={form.packagingType}
                    onChange={(e) => setForm({ ...form, packagingType: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-slate-300 p-2.5 text-xs outline-none focus:border-[#0F1E36]"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-700">Items Count</label>
                    <input
                      type="number"
                      value={form.itemsCount}
                      onChange={(e) => setForm({ ...form, itemsCount: Number(e.target.value) })}
                      className="mt-1 w-full rounded-xl border border-slate-300 p-2.5 text-xs outline-none focus:border-[#0F1E36]"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700">Weight (KG)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={form.weightKg}
                      onChange={(e) => setForm({ ...form, weightKg: Number(e.target.value) })}
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
                    Save Package
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
