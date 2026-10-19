'use client'

import { useState } from 'react'
import {
  BookOpen,
  CircleHelp,
  ExternalLink,
  FileText,
  LifeBuoy,
  MessageSquare,
  Search,
  Sparkles,
  Zap,
} from 'lucide-react'
import { DashboardShell } from '@/components/dashboard'

export default function HelpPage() {
  const [search, setSearch] = useState('')

  const guides = [
    {
      title: 'Boutique & Multi-Warehouse Setup',
      desc: 'Learn how to configure multi-boutique vaults, reserved client holds, and master atelier catalogs.',
      category: 'Basics',
      readTime: '4 min',
    },
    {
      title: 'FIFO Lot Tracking & Italian Raw Material Ingestion',
      desc: 'Step-by-step workflow for reconciling leather batches, Swiss movements, and precious gems.',
      category: 'Inventory',
      readTime: '6 min',
    },
    {
      title: 'VIP Secure Freight Dispatch (FedEx International First, DHL)',
      desc: 'Automated tracking integration for bespoke commissions and high-value insured consignments.',
      category: 'Logistics',
      readTime: '8 min',
    },
    {
      title: 'Artisan Purchase Orders & Proof of Provenance',
      desc: 'Generate replenishment POs with Florentine guild workshops and manage luxury vendor credits.',
      category: 'Procurement',
      readTime: '5 min',
    },
  ]

  const filteredGuides = guides.filter(
    (g) =>
      g.title.toLowerCase().includes(search.toLowerCase()) ||
      g.desc.toLowerCase().includes(search.toLowerCase()) ||
      g.category.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <DashboardShell>
      <div className="space-y-6 p-4 sm:p-6 lg:p-8">
        {/* Page Header Banner */}
        <div className="rounded-3xl bg-gradient-to-br from-[#0F1E36] via-[#1a2d4d] to-[#8A1538] p-5 sm:p-8 text-white shadow-lg">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.12] px-3 py-1 text-xs font-semibold text-[#C5A059] backdrop-blur-xs">
              <Sparkles className="size-3.5" /> Elufidiya Maison Concierge & Knowledge
            </span>
            <h1 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight">How may we assist your operations today?</h1>
            <p className="mt-2 text-xs sm:text-sm text-slate-200">
              Consult operational guides, FIFO auditing standards, bespoke VIP concierge procedures, and dedicated Maison engineering.
            </p>

            <div className="relative mt-5">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-300" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search procedures: FIFO tracking, warehouse vaults, customs declarations..."
                className="h-11 w-full rounded-2xl border border-white/20 bg-white/10 pl-10 pr-4 text-xs text-white placeholder:text-slate-300 outline-none transition-colors focus:border-[#C5A059] focus:bg-white/15"
              />
            </div>
          </div>
        </div>

        {/* Quick Action Tiles */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs transition-shadow hover:shadow-md">
            <div className="flex size-10 items-center justify-center rounded-xl bg-[#0F1E36]/10 text-[#0F1E36]">
              <BookOpen className="size-5" />
            </div>
            <h3 className="mt-4 text-sm font-bold text-[#0F1E36]">Maison Codex & Docs</h3>
            <p className="mt-1 text-xs text-slate-500">
              Complete reference manual covering boutique and warehouse operations and secure API integrations.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs transition-shadow hover:shadow-md">
            <div className="flex size-10 items-center justify-center rounded-xl bg-[#C5A059]/15 text-[#C5A059]">
              <Zap className="size-5" />
            </div>
            <h3 className="mt-4 text-sm font-bold text-[#0F1E36]">Atelier Walkthroughs</h3>
            <p className="mt-1 text-xs text-slate-500">
              Interactive guides to master composite leather crafting, assembly, and dispatch.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs transition-shadow hover:shadow-md">
            <div className="flex size-10 items-center justify-center rounded-xl bg-[#8A1538]/10 text-[#8A1538]">
              <MessageSquare className="size-5" />
            </div>
            <h3 className="mt-4 text-sm font-bold text-[#0F1E36]">VIP Priority Concierge</h3>
            <p className="mt-1 text-xs text-slate-500">
              Direct access to luxury inventory systems specialists and private client architects.
            </p>
          </div>
        </div>

        {/* Guide Articles */}
        <div>
          <h2 className="text-base font-bold text-[#0F1E36]">Operational Standards & Best Practices</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {filteredGuides.map((guide, idx) => (
              <div
                key={idx}
                className="group flex items-start justify-between rounded-2xl border border-slate-200 bg-white p-4 transition-all hover:border-[#8A1538]/40 hover:shadow-sm"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600">
                      {guide.category}
                    </span>
                    <span className="text-[11px] text-slate-400">{guide.readTime} read</span>
                  </div>
                  <h4 className="mt-2 text-xs font-bold text-[#0F1E36] group-hover:text-[#8A1538] transition-colors">
                    {guide.title}
                  </h4>
                  <p className="mt-1 text-[11px] text-slate-500 leading-relaxed">{guide.desc}</p>
                </div>
                <ExternalLink className="size-4 shrink-0 text-slate-400 group-hover:text-[#8A1538] transition-colors ml-2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardShell>
  )
}
