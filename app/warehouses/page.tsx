'use client'

import { useMemo, useState } from 'react'
import {
  ArrowRightLeft,
  Building2,
  CheckCircle2,
  Grid3X3,
  List,
  Mail,
  MapPin,
  MoreHorizontal,
  Plus,
  ShieldAlert,
  Users,
  Warehouse,
  X,
} from 'lucide-react'
import { DashboardShell } from '@/components/dashboard'
import { WAREHOUSES_DATA, type WarehouseItem } from '@/lib/dashboard-data'

export default function WarehousesPage() {
  const [warehouses, setWarehouses] = useState<WarehouseItem[]>(WAREHOUSES_DATA)
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [form, setForm] = useState({
    name: '',
    code: '',
    type: 'Flagship Boutique' as WarehouseItem['type'],
    location: '',
    manager: '',
    contact: '',
  })

  const filteredWarehouses = useMemo(() => {
    return warehouses.filter((wh) => {
      const q = searchQuery.toLowerCase()
      return (
        wh.name.toLowerCase().includes(q) ||
        wh.code.toLowerCase().includes(q) ||
        wh.location.toLowerCase().includes(q) ||
        wh.manager.toLowerCase().includes(q)
      )
    })
  }, [warehouses, searchQuery])

  const totalUnits = useMemo(
    () => warehouses.reduce((acc, wh) => acc + wh.totalUnits, 0),
    [warehouses],
  )

  const avgCapacity = useMemo(() => {
    if (warehouses.length === 0) return 0
    return Math.round(
      warehouses.reduce((acc, wh) => acc + wh.capacityPercent, 0) /
        warehouses.length,
    )
  }, [warehouses])

  const handleCreateWarehouse = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.code) return

    const newWh: WarehouseItem = {
      id: `wh-${Date.now()}`,
      name: form.name,
      code: form.code.toUpperCase(),
      type: form.type,
      location: form.location || 'Paris, France',
      manager: form.manager || 'Éléonore Laurent',
      contact: form.contact || 'boutique.paris@elufidiya.com',
      capacityPercent: 20,
      totalSkus: 12,
      totalUnits: 1200,
      status: 'Active',
    }
    setWarehouses([...warehouses, newWh])
    setIsModalOpen(false)
    setForm({
      name: '',
      code: '',
      type: 'Flagship Boutique',
      location: '',
      manager: '',
      contact: '',
    })
  }

  return (
    <DashboardShell searchQuery={searchQuery} onSearchChange={setSearchQuery}>
      <div className="space-y-6 p-4 sm:p-6 lg:p-8">
        {/* Page Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0F1E36]">
                Boutiques & Atelier Hubs
              </h1>
              <span className="rounded-full bg-[#0F1E36]/10 px-2.5 py-0.5 text-xs font-semibold text-[#0F1E36]">
                {warehouses.length} Facilities
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-500">
              Multi-location inventory tracking, boutique stock allocations, and inter-facility transfers.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* View mode toggle */}
            <div className="flex items-center rounded-xl border border-slate-200 bg-white p-0.5 shadow-xs">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`rounded-lg p-1.5 transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-[#0F1E36] text-white shadow-xs'
                    : 'text-slate-500 hover:text-[#0F1E36]'
                }`}
                aria-label="Grid view"
              >
                <Grid3X3 className="size-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('table')}
                className={`rounded-lg p-1.5 transition-colors ${
                  viewMode === 'table'
                    ? 'bg-[#0F1E36] text-white shadow-xs'
                    : 'text-slate-500 hover:text-[#0F1E36]'
                }`}
                aria-label="Table view"
              >
                <List className="size-4" />
              </button>
            </div>

            <button
              type="button"
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-xs hover:bg-slate-50"
            >
              <ArrowRightLeft className="size-3.5" /> Transfer Stock
            </button>

            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#0F1E36] to-[#8A1538] px-4 py-2 text-xs font-semibold text-white shadow-sm hover:opacity-95 active:scale-[0.98]"
            >
              <Plus className="size-4" /> Add Facility
            </button>
          </div>
        </div>

        {/* KPI Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs">
            <p className="text-xs font-medium text-slate-500">Active Facilities</p>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-2xl font-bold text-[#0F1E36]">{warehouses.length}</span>
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">Operating</span>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs">
            <p className="text-xs font-medium text-slate-500">Total Units Stored</p>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-2xl font-bold text-[#0F1E36]">
                {totalUnits.toLocaleString()}
              </span>
              <span className="text-[11px] font-semibold text-slate-600">All Facilities</span>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs">
            <p className="text-xs font-medium text-slate-500">Avg Utilization</p>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-2xl font-bold text-[#0F1E36]">{avgCapacity}%</span>
              <span className="text-[11px] font-semibold text-[#C5A059] bg-amber-50 px-2 py-0.5 rounded-full">Optimal Range</span>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs">
            <p className="text-xs font-medium text-slate-500">Capacity Alerts</p>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-2xl font-bold text-[#8A1538]">1 facility</span>
              <span className="text-[11px] font-semibold text-[#8A1538] bg-rose-50 px-2 py-0.5 rounded-full">&gt; 90% load</span>
            </div>
          </div>
        </div>

        {/* Facilities Grid or Table */}
        {viewMode === 'grid' ? (
          <div className="grid gap-5 md:grid-cols-2">
            {filteredWarehouses.map((wh) => (
              <div
                key={wh.id}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs transition-shadow hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex size-11 items-center justify-center rounded-xl bg-[#0F1E36]/5 text-[#0F1E36]">
                      <Warehouse className="size-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-[#0F1E36]">{wh.name}</h3>
                        <span className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] font-mono font-semibold text-slate-600">
                          {wh.code}
                        </span>
                      </div>
                      <div className="mt-1 flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
                        <MapPin className="size-3.5" />
                        <span>{wh.location}</span>
                        <span>·</span>
                        <span className="font-medium text-[#8A1538]">{wh.type}</span>
                      </div>
                    </div>
                  </div>

                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold shrink-0 ${
                      wh.status === 'Near Capacity'
                        ? 'bg-rose-50 text-[#8A1538] border border-rose-200'
                        : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    }`}
                  >
                    {wh.status}
                  </span>
                </div>

                {/* Capacity Progress Bar */}
                <div className="mt-5 border-t border-slate-100 pt-4">
                  <div className="flex items-center justify-between text-xs font-medium">
                    <span className="text-slate-500">Storage Space Used</span>
                    <span
                      className={`font-semibold ${
                        wh.capacityPercent >= 90
                          ? 'text-[#8A1538]'
                          : wh.capacityPercent >= 75
                          ? 'text-[#C5A059]'
                          : 'text-emerald-700'
                      }`}
                    >
                      {wh.capacityPercent}% capacity
                    </span>
                  </div>
                  <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        wh.capacityPercent >= 90
                          ? 'bg-[#8A1538]'
                          : wh.capacityPercent >= 75
                          ? 'bg-[#C5A059]'
                          : 'bg-emerald-600'
                      }`}
                      style={{ width: `${Math.min(wh.capacityPercent, 100)}%` }}
                    />
                  </div>
                </div>

                {/* Stats Footer */}
                <div className="mt-4 grid grid-cols-2 gap-3 rounded-xl bg-slate-50 p-3 text-xs">
                  <div>
                    <p className="text-[11px] text-slate-500">Active SKUs</p>
                    <p className="text-sm font-bold text-[#0F1E36]">{wh.totalSkus}</p>
                  </div>
                  <div>
                    <p className="text-[11px] text-slate-500">Total Units</p>
                    <p className="text-sm font-bold text-[#0F1E36]">
                      {wh.totalUnits.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Manager info */}
                <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <Users className="size-3.5 text-slate-400" />
                    <span>Directeur: <strong className="text-[#0F1E36]">{wh.manager}</strong></span>
                  </div>
                  <a
                    href={`mailto:${wh.contact}`}
                    className="flex items-center gap-1 text-[#8A1538] font-medium hover:underline"
                  >
                    <Mail className="size-3.5" />
                    <span>Contact</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Table View */
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/70 text-[10px] font-semibold uppercase tracking-[0.1em] text-slate-500">
                    <th className="px-5 py-3.5">Facility Name & Code</th>
                    <th className="px-4 py-3.5">Location</th>
                    <th className="px-4 py-3.5">Facility Type</th>
                    <th className="px-4 py-3.5 text-right">Capacity</th>
                    <th className="px-4 py-3.5 text-right">SKUs</th>
                    <th className="px-4 py-3.5 text-right">Units</th>
                    <th className="px-4 py-3.5">Directeur</th>
                    <th className="px-5 py-3.5 text-center">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredWarehouses.map((wh) => (
                    <tr
                      key={wh.id}
                      className="border-b border-slate-100 transition-colors hover:bg-slate-50/50 last:border-0"
                    >
                      <td className="px-5 py-3.5">
                        <p className="text-xs font-semibold text-[#0F1E36]">{wh.name}</p>
                        <p className="text-[10px] font-mono text-slate-400">{wh.code}</p>
                      </td>
                      <td className="px-4 py-3.5 text-xs text-slate-600">{wh.location}</td>
                      <td className="px-4 py-3.5 text-xs font-medium text-[#8A1538]">{wh.type}</td>
                      <td className="px-4 py-3.5 text-right text-xs font-semibold text-[#0F1E36]">
                        {wh.capacityPercent}%
                      </td>
                      <td className="px-4 py-3.5 text-right text-xs text-slate-700">
                        {wh.totalSkus}
                      </td>
                      <td className="px-4 py-3.5 text-right text-xs font-semibold text-[#0F1E36]">
                        {wh.totalUnits.toLocaleString()}
                      </td>
                      <td className="px-4 py-3.5 text-xs text-slate-700">{wh.manager}</td>
                      <td className="px-5 py-3.5 text-center">
                        <span
                          className={`inline-block rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                            wh.status === 'Near Capacity'
                              ? 'bg-rose-50 text-[#8A1538] border border-rose-200'
                              : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          }`}
                        >
                          {wh.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Add Warehouse Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
            <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-base font-bold text-[#0F1E36]">Add Storage Facility</h3>
                  <p className="text-xs text-slate-500">
                    Connect a new boutique store, regional depot, or atelier hub.
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

              <form onSubmit={handleCreateWarehouse} className="mt-4 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-700">Facility Name</label>
                    <input
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. Geneva Flagship Boutique"
                      className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-xs outline-none focus:border-[#0F1E36]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700">Code</label>
                    <input
                      required
                      value={form.code}
                      onChange={(e) => setForm({ ...form, code: e.target.value })}
                      placeholder="WH-GENEVA"
                      className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-xs outline-none focus:border-[#0F1E36]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-700">Facility Type</label>
                    <select
                      value={form.type}
                      onChange={(e) =>
                        setForm({ ...form, type: e.target.value as WarehouseItem['type'] })
                      }
                      className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs outline-none focus:border-[#0F1E36]"
                    >
                      <option value="Flagship Boutique">Flagship Boutique</option>
                      <option value="Luxury Hotel Boutique">Luxury Hotel Boutique</option>
                      <option value="Atelier & Workshop">Atelier & Workshop</option>
                      <option value="International Hub">International Hub</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700">City, Country</label>
                    <input
                      value={form.location}
                      onChange={(e) => setForm({ ...form, location: e.target.value })}
                      placeholder="e.g. Geneva, Switzerland"
                      className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-xs outline-none focus:border-[#0F1E36]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-700">Directeur / Manager</label>
                    <input
                      value={form.manager}
                      onChange={(e) => setForm({ ...form, manager: e.target.value })}
                      placeholder="e.g. Marc Dubois"
                      className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-xs outline-none focus:border-[#0F1E36]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700">Email Contact</label>
                    <input
                      type="email"
                      value={form.contact}
                      onChange={(e) => setForm({ ...form, contact: e.target.value })}
                      placeholder="geneva.vault@elufidiya.com"
                      className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-xs outline-none focus:border-[#0F1E36]"
                    />
                  </div>
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
                    className="rounded-xl bg-[#0F1E36] px-4 py-2 text-xs font-semibold text-white hover:bg-[#1E3A5F]"
                  >
                    Create Facility
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
