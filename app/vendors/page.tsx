'use client'

import { useMemo, useState } from 'react'
import {
  Check,
  ChevronDown,
  Download,
  List,
  Mail,
  MoreHorizontal,
  Phone,
  Plus,
  Store,
  Upload,
  X,
} from 'lucide-react'
import { DashboardShell } from '@/components/dashboard'
import { SUPPLIERS_DATA, type SupplierItem } from '@/lib/dashboard-data'

export default function VendorsPage() {
  const [vendors, setVendors] = useState<SupplierItem[]>(SUPPLIERS_DATA)
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'empty-state' | 'table'>('empty-state')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [form, setForm] = useState({
    name: '',
    contactPerson: '',
    category: 'Handmade Italian Calfskin & Patina Crust',
    email: '',
    phone: '',
    leadTimeDays: 12,
  })

  const filteredVendors = useMemo(() => {
    return vendors.filter((v) => {
      const q = searchQuery.toLowerCase()
      return (
        v.name.toLowerCase().includes(q) ||
        v.contactPerson.toLowerCase().includes(q) ||
        v.category.toLowerCase().includes(q)
      )
    })
  }, [vendors, searchQuery])

  const handleCreateVendor = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.contactPerson) return

    const newVen: SupplierItem = {
      id: `sup-${Date.now()}`,
      name: form.name,
      code: `SUP-00${vendors.length + 1}`,
      contactPerson: form.contactPerson,
      email: form.email || `${form.name.toLowerCase().replace(/\s+/g, '')}@supplier.com`,
      phone: form.phone || '+39 055 000 0000',
      category: form.category,
      leadTimeDays: Number(form.leadTimeDays),
      openOrdersCount: 0,
      payables: 0.0,
      rating: 5.0,
    }
    setVendors([...vendors, newVen])
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
              <Store className="size-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base font-bold text-slate-900">All Vendors & Artisans</span>
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">
                  {filteredVendors.length}
                </span>
              </div>
              <p className="text-xs text-slate-500">Italian tanneries, packaging ateliers & wool mills</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setViewMode(viewMode === 'empty-state' ? 'table' : 'empty-state')}
              className="flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 sm:flex-none"
            >
              {viewMode === 'empty-state' ? 'View Table' : 'Overview'}
            </button>

            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-[#0F1E36] via-[#162B4D] to-[#8A1538] px-4 py-2 text-xs font-bold text-white shadow-md shadow-[#0F1E36]/20 transition-all hover:scale-[1.02] active:scale-95 sm:flex-none"
            >
              <Plus className="size-4" />
              <span>New Vendor</span>
            </button>

            <button
              type="button"
              className="flex size-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
            >
              <MoreHorizontal className="size-4" />
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        {viewMode === 'empty-state' ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-16 text-center shadow-xs">
            <div className="relative mb-6 flex size-28 items-center justify-center rounded-2xl bg-[#0F1E36]/5 shadow-inner">
              <Store className="size-14 text-[#0F1E36]/60" strokeWidth={1.5} />
              <div className="absolute -bottom-1 -right-1 flex size-8 items-center justify-center rounded-full bg-[#8A1538] text-white shadow-md">
                <Plus className="size-4" strokeWidth={3} />
              </div>
            </div>

            <h2 className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
              Every purchase starts with an artisan vendor
            </h2>
            <p className="mt-2 max-w-md text-xs text-slate-500">
              Create and manage your verified suppliers, lead times, and materials catalog in one unified atelier workspace.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#0F1E36] to-[#8A1538] px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-[#0F1E36]/20 hover:scale-[1.02] active:scale-95"
              >
                <Plus className="size-4" />
                <span>Create New Vendor</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('table')}
                className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                <span>View {vendors.length} Vendors</span>
              </button>
            </div>

            {/* Key Benefits Card */}
            <div className="mt-12 w-full max-w-2xl rounded-2xl border border-slate-200 bg-slate-50/50 p-5 text-left shadow-xs">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                <span className="text-[#8A1538]">❖</span>
                <span>Atelier Procurement Advantages</span>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-3 text-xs text-slate-600 sm:grid-cols-2">
                <div className="flex items-center gap-2">
                  <Check className="size-4 shrink-0 text-emerald-600" strokeWidth={2.5} />
                  <span>Stay connected with master tanners and mills</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="size-4 shrink-0 text-emerald-600" strokeWidth={2.5} />
                  <span>Automated FIFO batch tracking per shipment</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="size-4 shrink-0 text-emerald-600" strokeWidth={2.5} />
                  <span>Handle multi-currency EUR/USD/NGN payments</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="size-4 shrink-0 text-emerald-600" strokeWidth={2.5} />
                  <span>Track procurement lead times and reorder thresholds</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Vendors Data Table View */
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                    <th className="px-4 py-3.5">Vendor Name & Code</th>
                    <th className="px-4 py-3.5">Primary Contact</th>
                    <th className="px-4 py-3.5">Material Category</th>
                    <th className="px-4 py-3.5">Email & Phone</th>
                    <th className="px-4 py-3.5 text-right">Lead Time</th>
                    <th className="px-4 py-3.5 text-right">Open Orders</th>
                    <th className="px-4 py-3.5 text-right">Payables</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {filteredVendors.map((v) => (
                    <tr key={v.id} className="transition-colors hover:bg-slate-50/70">
                      <td className="px-4 py-3.5">
                        <p className="font-bold text-[#0F1E36]">
                          {v.name}
                        </p>
                        <p className="font-mono text-[10px] text-slate-400">{v.code}</p>
                      </td>
                      <td className="px-4 py-3.5 font-semibold text-slate-900">{v.contactPerson}</td>
                      <td className="px-4 py-3.5 text-slate-600">{v.category}</td>
                      <td className="px-4 py-3.5 text-slate-500">
                        <p>{v.email}</p>
                        <p className="text-[10px] text-slate-400">{v.phone}</p>
                      </td>
                      <td className="px-4 py-3.5 text-right text-slate-800">
                        {v.leadTimeDays} days
                      </td>
                      <td className="px-4 py-3.5 text-right font-medium text-slate-800">
                        {v.openOrdersCount}
                      </td>
                      <td className="px-4 py-3.5 text-right font-bold text-[#0F1E36]">
                        ${v.payables.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* New Vendor Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
            <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-base font-bold text-slate-900">New Artisan Vendor</h3>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-lg p-1 text-slate-400 hover:bg-slate-100"
                >
                  <X className="size-5" />
                </button>
              </div>

              <form onSubmit={handleCreateVendor} className="mt-4 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-700">Vendor Name *</label>
                    <input
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. Tuscan Tannery Consortium"
                      className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-xs outline-none focus:border-[#0F1E36]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700">Contact Person *</label>
                    <input
                      required
                      value={form.contactPerson}
                      onChange={(e) => setForm({ ...form, contactPerson: e.target.value })}
                      placeholder="e.g. Giovanni Rossi"
                      className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-xs outline-none focus:border-[#0F1E36]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-700">Email</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="contact@vendor.com"
                      className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-xs outline-none focus:border-[#0F1E36]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700">Phone</label>
                    <input
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+39 055 000 0000"
                      className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-xs outline-none focus:border-[#0F1E36]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700">Material Category</label>
                  <input
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    placeholder="e.g. Handmade Italian Calfskin"
                    className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-xs outline-none focus:border-[#0F1E36]"
                  />
                </div>

                <div className="flex flex-col sm:flex-row justify-end gap-2.5 border-t border-slate-100 pt-3">
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
                    Save Vendor
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
