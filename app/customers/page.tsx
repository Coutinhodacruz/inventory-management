'use client'

import { useMemo, useState } from 'react'
import {
  Building2,
  CheckCircle2,
  Download,
  Mail,
  MoreHorizontal,
  Phone,
  Plus,
  Users,
  X,
} from 'lucide-react'
import { DashboardShell } from '@/components/dashboard'
import { CUSTOMERS_DATA, type CustomerItem } from '@/lib/dashboard-data'

export default function CustomersPage() {
  const [customers, setCustomers] = useState<CustomerItem[]>(CUSTOMERS_DATA)
  const [searchQuery, setSearchQuery] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    city: '',
  })

  const filteredCustomers = useMemo(() => {
    return customers.filter((cust) => {
      const q = searchQuery.toLowerCase()
      return (
        cust.name.toLowerCase().includes(q) ||
        cust.company.toLowerCase().includes(q) ||
        cust.email.toLowerCase().includes(q) ||
        cust.city.toLowerCase().includes(q)
      )
    })
  }, [customers, searchQuery])

  const totalReceivables = useMemo(
    () => customers.reduce((acc, c) => acc + c.receivables, 0),
    [customers],
  )
  const totalSpend = useMemo(
    () => customers.reduce((acc, c) => acc + c.totalSpend, 0),
    [customers],
  )

  const handleCreateCustomer = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.company) return

    const newCust: CustomerItem = {
      id: `cust-${Date.now()}`,
      name: form.name,
      company: form.company,
      email: form.email || `${form.name.toLowerCase().replace(/\s+/g, '.')}@example.com`,
      phone: form.phone || '+1 (555) 000-0000',
      city: form.city || 'Chicago, IL',
      totalOrders: 0,
      totalSpend: 0,
      receivables: 0,
      status: 'Active',
    }
    setCustomers([newCust, ...customers])
    setIsModalOpen(false)
    setForm({ name: '', company: '', email: '', phone: '', city: '' })
  }

  return (
    <DashboardShell searchQuery={searchQuery} onSearchChange={setSearchQuery}>
      <div className="space-y-6 p-4 sm:p-6 lg:p-8">
        {/* Page Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                Customer Directory
              </h1>
              <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-700 border border-blue-200">
                {customers.length} Accounts
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-500">
              Wholesale clients, retail accounts, receivables ledger, and order history.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-xs hover:bg-slate-50 transition-colors"
            >
              <Download className="size-3.5" /> <span>Export Clients</span>
            </button>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 px-4 py-2 text-xs font-bold text-white shadow-md shadow-blue-600/25 hover:scale-[1.02] active:scale-95 transition-all"
            >
              <Plus className="size-4" strokeWidth={2.5} />
              <span>Add Customer</span>
            </button>
          </div>
        </div>

        {/* KPI Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-xs">
            <p className="text-xs font-medium text-slate-500">Total Active Clients</p>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-2xl font-bold text-slate-900">{customers.length}</span>
              <span className="text-[11px] font-semibold text-emerald-600">100% active</span>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-xs">
            <p className="text-xs font-medium text-slate-500">Outstanding Receivables</p>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-2xl font-bold text-amber-600">
                ${totalReceivables.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>
              <span className="text-[11px] font-semibold text-amber-600">To collect</span>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-xs">
            <p className="text-xs font-medium text-slate-500">Total Customer Lifetime Value</p>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-2xl font-bold text-slate-900">
                ${totalSpend.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>
              <span className="text-[11px] font-semibold text-emerald-600">High retention</span>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-xs">
            <p className="text-xs font-medium text-slate-500">Avg Spend Per Account</p>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-2xl font-bold text-slate-900">
                ${(totalSpend / (customers.length || 1)).toFixed(0)}
              </span>
              <span className="text-[11px] font-semibold text-emerald-600">VIP average</span>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[780px] text-left">
            <thead>
              <tr className="border-b border-[#edf1ed] bg-[#fbfdfb] text-[10px] font-semibold uppercase tracking-[0.1em] text-[#8e9b94]">
                <th className="px-5 py-3.5">Customer Name & Company</th>
                <th className="px-4 py-3.5">Contact Details</th>
                <th className="px-4 py-3.5">City</th>
                <th className="px-4 py-3.5 text-right">Orders Placed</th>
                <th className="px-4 py-3.5 text-right">Lifetime Spend</th>
                <th className="px-4 py-3.5 text-right">Receivables</th>
                <th className="px-5 py-3.5 text-center">Status</th>
                <th className="px-4 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-5 py-12 text-center text-xs text-[#87928c]">
                    No customers match your search criteria.
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((cust) => (
                  <tr
                    key={cust.id}
                    className="border-b border-[#f0f3f0] transition-colors hover:bg-[#fafbfa] last:border-0"
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#eef3ee] text-xs font-bold text-[#1e3028]">
                          {cust.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-[#1e2c26]">{cust.name}</p>
                          <p className="text-[11px] text-[#728078]">{cust.company}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-xs text-[#607068]">
                      <div className="flex flex-col gap-0.5">
                        <span className="flex items-center gap-1">
                          <Mail className="size-3 text-[#87928c]" /> {cust.email}
                        </span>
                        <span className="flex items-center gap-1 text-[11px] text-[#87928c]">
                          <Phone className="size-3" /> {cust.phone}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-xs text-[#728078]">{cust.city}</td>
                    <td className="px-4 py-3.5 text-right text-xs font-medium text-[#1e2c26]">
                      {cust.totalOrders}
                    </td>
                    <td className="px-4 py-3.5 text-right text-xs font-bold text-[#1e2c26]">
                      ${cust.totalSpend.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                    <td className="px-4 py-3.5 text-right text-xs font-bold">
                      <span
                        className={cust.receivables > 0 ? 'text-[#c47748]' : 'text-[#47715d]'}
                      >
                        ${cust.receivables.toFixed(2)}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-center">
                      <span className="inline-block rounded-full bg-[#e8f1ed] px-2.5 py-1 text-[10px] font-semibold text-[#47715d]">
                        {cust.status}
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

      {/* Add Customer Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">Add New Client Account</h3>
                <p className="text-xs text-slate-500">
                  Register a new customer for invoicing and sales fulfillment.
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

            <form onSubmit={handleCreateCustomer} className="mt-4 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700">Contact Name</label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Eleanor Sterling"
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/15"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700">Company Name</label>
                  <input
                    required
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    placeholder="Acme Supplies Co."
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/15"
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
                    placeholder="contact@company.com"
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700">Phone</label>
                  <input
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700">City, State / Region</label>
                <input
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  placeholder="e.g. Nairobi, Kenya or London, UK"
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs outline-none"
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
                  Create Client
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
