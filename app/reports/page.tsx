'use client'

import { useState } from 'react'
import {
  BarChart3,
  Calendar,
  ChevronRight,
  Download,
  FileSpreadsheet,
  FileText,
  Filter,
  PieChart,
  Printer,
  TrendingUp,
} from 'lucide-react'
import { DashboardShell } from '@/components/dashboard'

export default function ReportsPage() {
  const [activeCategory, setActiveCategory] = useState<'inventory' | 'sales' | 'purchases'>('inventory')
  const [searchQuery, setSearchQuery] = useState('')

  const inventoryReports = [
    {
      title: 'Inventory Summary & Luxury Valuation',
      desc: 'Current stock on hand, reserved atelier units, and asset valuation across Nairobi, Lagos, and Paris boutiques.',
      metric: '$134,840.00 Total Asset Value',
      updated: 'Live sync',
    },
    {
      title: 'FIFO Cost Lot Tracking Report',
      desc: 'Real-time FIFO cost lot allocation, tracking import batches of Italian calfskin and Swiss movements.',
      metric: '100% FIFO Compliant',
      updated: 'Live sync',
    },
    {
      title: 'Stock Summary by Boutique Store',
      desc: "Inventory distribution comparison between Flagship Boutique, Kempinski Suite, and Lagos Hub.",
      metric: '4 Locations Monitored',
      updated: '10 mins ago',
    },
    {
      title: 'Low Stock & Restock Alert Report',
      desc: 'Finished goods approaching minimum safety stock requiring purchase orders or atelier production.',
      metric: '5 SKUs Alerting',
      updated: 'Immediate',
    },
  ]

  const salesReports = [
    {
      title: 'Sales by Item & Haute Couture Line',
      desc: 'Revenue and unit sales breakdown for bespoke loafers, dress oxfords, silk travel suits, and fine horology.',
      metric: '$68,400.00 MTD',
      updated: 'Today',
    },
    {
      title: 'Sales by VIP Patron & Private Channel',
      desc: 'Purchase velocity from Flagship Walk-in, VIP Concierge, and Private Atelier Commission.',
      metric: '18 VIP Patrons Active',
      updated: 'Today',
    },
  ]

  const purchaseReports = [
    {
      title: 'Purchases by Artisan Partner & Tanner',
      desc: 'Total procurement spend and outstanding balances across Florentine tanneries and Swiss manufactures.',
      metric: '$23,650.00 Open POs',
      updated: 'Oct 17',
    },
    {
      title: 'Artisan Payable Aging Summary',
      desc: 'Analysis of due and upcoming payments categorized by 30, 60, and 90-day intervals.',
      metric: '$18,850.00 In 30 Days',
      updated: 'Live',
    },
  ]

  const currentList =
    activeCategory === 'inventory'
      ? inventoryReports
      : activeCategory === 'sales'
      ? salesReports
      : purchaseReports

  const filteredList = currentList.filter(
    (rep) =>
      rep.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rep.desc.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <DashboardShell searchQuery={searchQuery} onSearchChange={setSearchQuery}>
      <div className="space-y-6 p-4 sm:p-6 lg:p-8">
        {/* Page Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0F1E36]">
                Analytics & Intelligence
              </h1>
              <span className="rounded-full bg-[#0F1E36]/10 px-2.5 py-0.5 text-xs font-semibold text-[#0F1E36]">
                Executive Reports
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-500">
              Real-time balance valuation, FIFO lot tracking, VIP velocity, and artisan procurement aging.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-xs hover:bg-slate-50 active:scale-[0.98]"
            >
              <Printer className="size-3.5 text-[#0F1E36]" />
              <span>Print Dossier</span>
            </button>
            <button
              type="button"
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#0F1E36] to-[#8A1538] px-4 py-2 text-xs font-semibold text-white shadow-sm hover:opacity-95 active:scale-[0.98]"
            >
              <Download className="size-3.5" />
              <span>Export CSV / PDF</span>
            </button>
          </div>
        </div>

        {/* Category Pills Navigation (Scrollable on Mobile) */}
        <div className="flex gap-2 overflow-x-auto pb-2 border-b border-slate-200 no-scrollbar">
          <button
            type="button"
            onClick={() => setActiveCategory('inventory')}
            className={`whitespace-nowrap rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
              activeCategory === 'inventory'
                ? 'bg-[#0F1E36] text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:text-[#0F1E36] hover:bg-slate-50'
            }`}
          >
            Inventory Valuation & Stocks
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory('sales')}
            className={`whitespace-nowrap rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
              activeCategory === 'sales'
                ? 'bg-[#0F1E36] text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:text-[#0F1E36] hover:bg-slate-50'
            }`}
          >
            Sales & VIP Client Analytics
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory('purchases')}
            className={`whitespace-nowrap rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
              activeCategory === 'purchases'
                ? 'bg-[#0F1E36] text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:text-[#0F1E36] hover:bg-slate-50'
            }`}
          >
            Procurement & Artisan Payables
          </button>
        </div>

        {/* Reports Grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {filteredList.map((rep, idx) => (
            <div
              key={idx}
              className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-xs transition-all hover:border-[#8A1538]/40 hover:shadow-md"
            >
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h3 className="text-sm font-bold text-[#0F1E36] group-hover:text-[#8A1538] transition-colors">
                    {rep.title}
                  </h3>
                  <span className="self-start sm:self-auto rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700 border border-emerald-200">
                    {rep.metric}
                  </span>
                </div>
                <p className="mt-2 text-xs text-slate-500 leading-relaxed">{rep.desc}</p>
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-3 text-xs">
                <span className="text-[11px] text-slate-400">Cadence: {rep.updated}</span>
                <button
                  type="button"
                  className="flex items-center gap-1 font-semibold text-[#8A1538] hover:text-[#0F1E36] hover:underline"
                >
                  <span>Generate Report</span>
                  <ChevronRight className="size-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardShell>
  )
}
