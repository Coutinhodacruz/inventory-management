'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  AlertTriangle,
  ArrowRight,
  ArrowUpRight,
  Boxes,
  CheckCircle2,
  ChevronDown,
  Clock,
  Crown,
  ExternalLink,
  Layers,
  MapPin,
  Package,
  Plus,
  RefreshCw,
  ShoppingBag,
  Sparkles,
  TrendingUp,
  Truck,
  Warehouse,
} from 'lucide-react'
import { DashboardShell } from '@/components/dashboard'
import {
  INITIAL_PRODUCTS,
  SALES_ORDERS,
  PURCHASE_ORDERS,
  type ProductItem,
} from '@/lib/dashboard-data'

export default function ElufidiyaMaisonHomePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTimeframe, setSelectedTimeframe] = useState<'Day' | 'Week' | 'Month'>('Month')

  const lowStockItems = useMemo(
    () => INITIAL_PRODUCTS.filter((p) => p.status === 'Low stock'),
    [],
  )
  const totalUnitsInHand = useMemo(
    () => INITIAL_PRODUCTS.reduce((acc, p) => acc + p.stockOnHand, 0),
    [],
  )
  const totalValueInHand = useMemo(
    () => INITIAL_PRODUCTS.reduce((acc, p) => acc + p.stockOnHand * p.sellingPrice, 0),
    [],
  )

  return (
    <DashboardShell searchQuery={searchQuery} onSearchChange={setSearchQuery}>
      <div className="space-y-6 p-4 sm:p-6 lg:p-8">
        {/* Maison Executive Hero Banner */}
        <div className="relative overflow-hidden rounded-2xl border border-blue-900/40 bg-gradient-to-r from-[#0a1329] via-[#0d1d42] to-[#071024] p-6 text-white shadow-xl sm:p-8">
          {/* Subtle background ambient glow effect */}
          <div className="pointer-events-none absolute -right-16 -top-16 size-72 rounded-full bg-blue-600/20 blur-3xl" />
          <div className="pointer-events-none absolute -left-16 -bottom-16 size-72 rounded-full bg-red-600/15 blur-3xl" />

          <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            {/* Left: Brand Identity & Greeting */}
            <div className="flex items-start gap-4">
              <div className="relative flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-2 border-amber-400/60 bg-white p-1 shadow-lg ring-4 ring-blue-500/20">
                <Image
                  src="/elufidiya-logo.png"
                  alt="Elufidiya Crest"
                  width={56}
                  height={56}
                  className="size-full object-contain"
                  priority
                />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-amber-400/40 bg-amber-400/10 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-amber-300">
                    EST. 1975 MAISON
                  </span>
                  <span className="rounded-full border border-blue-400/30 bg-blue-500/10 px-2.5 py-0.5 text-[10px] font-bold text-blue-300">
                    Luxury Inventory Operations
                  </span>
                </div>

                <h1 className="mt-2 text-xl font-bold tracking-tight text-white sm:text-2xl">
                  Welcome back, Elufidiya
                </h1>

                <p className="mt-1 text-xs text-slate-300 sm:text-sm">
                  Operations across Nairobi D&apos;GTC Mall, Villa Rosa Kempinski, &amp; Lagos Atelier Hub.
                </p>
              </div>
            </div>

            {/* Right: Live Valuation & Quick Actions */}
            <div className="flex w-full flex-col sm:w-auto sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4">
              <div className="w-full sm:w-auto rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 backdrop-blur-md">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Total Valuation in Hand
                </p>
                <p className="text-xl font-extrabold text-amber-400 sm:text-2xl">
                  ${totalValueInHand.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </p>
                <div className="mt-0.5 flex items-center gap-1.5 text-[11px] text-emerald-400">
                  <TrendingUp className="size-3" />
                  <span>+14.8% vs last quarter</span>
                </div>
              </div>

              <div className="flex w-full sm:w-auto items-center gap-2">
                <Link
                  href="/items"
                  className="flex flex-1 sm:flex-initial h-10 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 px-4 text-xs font-bold text-white shadow-lg shadow-blue-900/40 transition-all hover:scale-[1.02] hover:shadow-blue-600/50 active:scale-95"
                >
                  <Plus className="size-4" strokeWidth={2.5} />
                  <span>Add Product</span>
                </Link>

                <Link
                  href="/inventory-adjustments"
                  className="flex flex-1 sm:flex-initial h-10 items-center justify-center gap-1.5 rounded-xl border border-white/20 bg-white/10 px-3.5 text-xs font-semibold text-white backdrop-blur-xs transition-all hover:bg-white/20"
                >
                  <RefreshCw className="size-3.5" />
                  <span>Stock Audit</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Real-time Sales Activity & Order Pipeline */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs transition-all hover:shadow-md sm:p-6">
          <div className="flex flex-col gap-3 border-b border-slate-100 pb-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <div className="size-2 rounded-full bg-blue-600 animate-pulse" />
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  Boutique Sales &amp; Order Pipeline
                </h2>
              </div>
              <p className="text-xs text-slate-500">Live order fulfillment status across luxury outlets</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex rounded-lg border border-slate-200 bg-slate-50 p-0.5 text-xs font-medium">
                {(['Day', 'Week', 'Month'] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setSelectedTimeframe(t)}
                    className={`rounded-md px-2.5 py-1 text-xs transition-all ${
                      selectedTimeframe === t
                        ? 'bg-white font-bold text-blue-700 shadow-2xs'
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <Link
                href="/sales-orders"
                className="flex items-center gap-1 text-xs font-bold text-blue-700 hover:underline"
              >
                <span>View All Orders</span>
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* 1: To be Packed */}
            <Link
              href="/sales-orders"
              className="group relative flex flex-col justify-between rounded-xl border border-blue-200/80 bg-gradient-to-br from-blue-50/60 to-white p-4.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-400 hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div className="flex size-9 items-center justify-center rounded-lg bg-blue-600 text-white shadow-sm shadow-blue-500/20 group-hover:scale-110 transition-transform">
                  <Package className="size-4.5" />
                </div>
                <span className="rounded-full bg-blue-100/80 px-2 py-0.5 text-[10px] font-bold text-blue-700">
                  Ready
                </span>
              </div>
              <div className="mt-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-extrabold text-slate-900">2</span>
                  <span className="text-xs font-bold uppercase text-slate-400">Qty Pending</span>
                </div>
                <p className="mt-1 text-xs font-semibold text-slate-600 group-hover:text-blue-700 transition-colors">
                  To be Packed
                </p>
                <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-blue-100">
                  <div className="h-full w-2/3 rounded-full bg-blue-600" />
                </div>
              </div>
            </Link>

            {/* 2: To be Shipped */}
            <Link
              href="/shipments"
              className="group relative flex flex-col justify-between rounded-xl border border-amber-200/80 bg-gradient-to-br from-amber-50/60 to-white p-4.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-amber-400 hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div className="flex size-9 items-center justify-center rounded-lg bg-amber-500 text-white shadow-sm shadow-amber-500/20 group-hover:scale-110 transition-transform">
                  <Truck className="size-4.5" />
                </div>
                <span className="rounded-full bg-amber-100/80 px-2 py-0.5 text-[10px] font-bold text-amber-700">
                  In Transit
                </span>
              </div>
              <div className="mt-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-extrabold text-slate-900">1</span>
                  <span className="text-xs font-bold uppercase text-slate-400">Package</span>
                </div>
                <p className="mt-1 text-xs font-semibold text-slate-600 group-hover:text-amber-700 transition-colors">
                  To be Shipped
                </p>
                <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-amber-100">
                  <div className="h-full w-1/2 rounded-full bg-amber-500" />
                </div>
              </div>
            </Link>

            {/* 3: To be Delivered */}
            <Link
              href="/shipments"
              className="group relative flex flex-col justify-between rounded-xl border border-emerald-200/80 bg-gradient-to-br from-emerald-50/60 to-white p-4.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-400 hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div className="flex size-9 items-center justify-center rounded-lg bg-emerald-600 text-white shadow-sm shadow-emerald-500/20 group-hover:scale-110 transition-transform">
                  <CheckCircle2 className="size-4.5" />
                </div>
                <span className="rounded-full bg-emerald-100/80 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                  Arriving Today
                </span>
              </div>
              <div className="mt-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-extrabold text-slate-900">3</span>
                  <span className="text-xs font-bold uppercase text-slate-400">VIP Clients</span>
                </div>
                <p className="mt-1 text-xs font-semibold text-slate-600 group-hover:text-emerald-700 transition-colors">
                  To be Delivered
                </p>
                <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-emerald-100">
                  <div className="h-full w-4/5 rounded-full bg-emerald-600" />
                </div>
              </div>
            </Link>

            {/* 4: To be Invoiced */}
            <Link
              href="/invoices"
              className="group relative flex flex-col justify-between rounded-xl border border-indigo-200/80 bg-gradient-to-br from-indigo-50/60 to-white p-4.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-400 hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div className="flex size-9 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-sm shadow-indigo-500/20 group-hover:scale-110 transition-transform">
                  <Crown className="size-4.5" />
                </div>
                <span className="rounded-full bg-indigo-100/80 px-2 py-0.5 text-[10px] font-bold text-indigo-700">
                  Billing
                </span>
              </div>
              <div className="mt-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-extrabold text-slate-900">1</span>
                  <span className="text-xs font-bold uppercase text-slate-400">Invoice Draft</span>
                </div>
                <p className="mt-1 text-xs font-semibold text-slate-600 group-hover:text-indigo-700 transition-colors">
                  To be Invoiced
                </p>
                <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-indigo-100">
                  <div className="h-full w-1/3 rounded-full bg-indigo-600" />
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* 2-Column Grid: Multi-Boutique Inventory Allocation & Low-Stock Alerts */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Multi-Boutique Stock Allocation Card */}
          <div className="flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs transition-all hover:shadow-md sm:p-6">
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="flex size-7 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
                    <Warehouse className="size-4" />
                  </div>
                  <div>
                    <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                      Multi-Boutique Stock Health
                    </h2>
                    <p className="text-[11px] text-slate-500">{totalUnitsInHand} pieces cataloged</p>
                  </div>
                </div>

                <Link
                  href="/warehouses"
                  className="text-xs font-bold text-blue-700 hover:underline"
                >
                  Manage Warehouses →
                </Link>
              </div>

              {/* Progress Bar of Location Distribution */}
              <div className="mt-5 space-y-4">
                {/* Location 1: D'GTC Flagship */}
                <div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-800">D&apos;GTC Mall Flagship (Nairobi)</span>
                    <span className="font-bold text-blue-700">194 pcs (40%)</span>
                  </div>
                  <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full w-[40%] rounded-full bg-gradient-to-r from-blue-600 to-indigo-600" />
                  </div>
                </div>

                {/* Location 2: Kempinski Boutique */}
                <div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-800">Villa Rosa Kempinski Boutique</span>
                    <span className="font-bold text-amber-600">112 pcs (23%)</span>
                  </div>
                  <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full w-[23%] rounded-full bg-gradient-to-r from-amber-500 to-yellow-500" />
                  </div>
                </div>

                {/* Location 3: Lagos Atelier Hub */}
                <div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-800">Lagos Atelier &amp; VIP Hub</span>
                    <span className="font-bold text-red-600">146 pcs (30%)</span>
                  </div>
                  <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full w-[30%] rounded-full bg-gradient-to-r from-red-600 to-rose-600" />
                  </div>
                </div>

                {/* Location 4: Transit & Workshop */}
                <div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-800">Workshop Custom Commissions</span>
                    <span className="font-bold text-emerald-600">30 pcs (7%)</span>
                  </div>
                  <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full w-[7%] rounded-full bg-gradient-to-r from-emerald-500 to-teal-500" />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-xl border border-slate-100 bg-slate-50/80 p-3.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Inventory Turnover Ratio</span>
                <span className="font-bold text-emerald-600">4.8x (Optimal for Luxury)</span>
              </div>
            </div>
          </div>

          {/* Urgent Low Stock Alerts Card (Heraldic Crimson Red Accent) */}
          <div className="flex flex-col justify-between rounded-2xl border border-red-200/80 bg-white p-5 shadow-xs transition-all hover:shadow-md sm:p-6">
            <div>
              <div className="flex items-center justify-between border-b border-red-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="flex size-7 items-center justify-center rounded-lg bg-red-100 text-red-600">
                    <AlertTriangle className="size-4" />
                  </div>
                  <div>
                    <h2 className="text-xs font-bold uppercase tracking-wider text-red-950">
                      Workshop Low Stock Alerts
                    </h2>
                    <p className="text-[11px] text-red-600 font-medium">
                      {lowStockItems.length} styles near replenishment threshold
                    </p>
                  </div>
                </div>

                <span className="rounded-full bg-red-600 px-2.5 py-0.5 text-[10px] font-black text-white shadow-xs animate-pulse-subtle">
                  URGENT RESTOCK
                </span>
              </div>

              <div className="mt-4 space-y-3">
                {lowStockItems.slice(0, 4).map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between rounded-xl border border-red-100 bg-red-50/40 p-3 transition-colors hover:bg-red-50/80"
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1 pr-3">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="size-11 shrink-0 rounded-lg object-cover border border-red-200 shadow-2xs"
                        />
                      ) : (
                        <div className="flex size-11 shrink-0 items-center justify-center rounded-lg border border-red-200 bg-red-100/50 text-red-600">
                          <Package className="size-5" />
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs font-bold text-slate-900">{item.name}</p>
                        <p className="text-[10px] text-slate-500">
                          {item.sku} · {item.warehouse}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <span className="text-xs font-extrabold text-red-600">
                          {item.availableStock} left
                        </span>
                        <p className="text-[9px] font-medium text-slate-400">
                          Min: {item.reorderPoint}
                        </p>
                      </div>

                      <Link
                        href="/purchase-orders"
                        className="rounded-lg bg-white border border-red-200 px-2 py-1 text-[11px] font-bold text-red-600 shadow-2xs hover:bg-red-600 hover:text-white transition-colors"
                      >
                        Reorder
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 text-right border-t border-slate-100">
              <Link
                href="/items"
                className="text-xs font-bold text-blue-700 hover:underline"
              >
                View all inventory items &amp; batch reorder →
              </Link>
            </div>
          </div>
        </div>

        {/* Top Selling Elufidiya Maison Collections Table */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs transition-all hover:shadow-md sm:p-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Signature Elufidiya 1975 Collections
              </h2>
              <p className="text-xs text-slate-500">Real-time performance across handcrafted leather &amp; sport suits</p>
            </div>

            <Link
              href="/items"
              className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <span>Full Atelier Catalog</span>
              <ExternalLink className="size-3.5" />
            </Link>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[700px] text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200/80 text-[10.5px] font-bold uppercase tracking-wider text-slate-400">
                  <th className="py-3">Collection Item</th>
                  <th className="py-3">SKU</th>
                  <th className="py-3">Primary Location</th>
                  <th className="py-3">Stock Status</th>
                  <th className="py-3 text-right">Available</th>
                  <th className="py-3 text-right">Retail Value</th>
                  <th className="py-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {INITIAL_PRODUCTS.slice(0, 6).map((p) => {
                  const isLow = p.status === 'Low stock'
                  return (
                    <tr
                      key={p.id}
                      className="group transition-colors hover:bg-blue-50/30"
                    >
                      <td className="py-3.5">
                        <div className="flex items-center gap-3">
                          {p.image ? (
                            <img
                              src={p.image}
                              alt={p.name}
                              className="size-10 shrink-0 rounded-lg object-cover border border-slate-200 shadow-2xs group-hover:border-blue-400 group-hover:scale-105 transition-all"
                            />
                          ) : (
                            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-slate-100 text-slate-700 font-bold group-hover:border-blue-300">
                              <Package className="size-4 text-blue-700" />
                            </div>
                          )}
                          <div>
                            <Link
                              href="/items"
                              className="font-bold text-slate-900 group-hover:text-blue-700 hover:underline"
                            >
                              {p.name}
                            </Link>
                            <p className="text-[10px] text-slate-400">{p.category}</p>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 font-mono text-[11px] font-bold text-slate-600">
                        {p.sku}
                      </td>

                      <td className="py-3.5 text-slate-600">
                        <span className="flex items-center gap-1">
                          <MapPin className="size-3 text-slate-400" />
                          <span>{p.warehouse.split('(')[0].trim()}</span>
                        </span>
                      </td>

                      <td className="py-3.5">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10.5px] font-bold ${
                            isLow
                              ? 'bg-red-50 text-red-600 border border-red-200'
                              : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          }`}
                        >
                          <span
                            className={`size-1.5 rounded-full ${
                              isLow ? 'bg-red-500 animate-pulse' : 'bg-emerald-500'
                            }`}
                          />
                          <span>{p.status}</span>
                        </span>
                      </td>

                      <td className="py-3.5 text-right font-extrabold text-slate-900">
                        {p.availableStock} pcs
                      </td>

                      <td className="py-3.5 text-right font-bold text-slate-900">
                        ${p.sellingPrice.toFixed(2)}
                      </td>

                      <td className="py-3.5 text-center">
                        <Link
                          href="/items"
                          className="inline-flex items-center justify-center rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-blue-700 transition-colors"
                          title="View Details"
                        >
                          <ArrowRight className="size-4" />
                        </Link>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardShell>
  )
}
