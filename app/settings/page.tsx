'use client'

import { useState } from 'react'
import Image from 'next/image'
import {
  Bell,
  Building2,
  Check,
  ChevronDown,
  Crown,
  Globe,
  Lock,
  Mail,
  MapPin,
  Package,
  Save,
  Shield,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  ToggleLeft,
  ToggleRight,
  User,
  Users,
  Warehouse,
} from 'lucide-react'
import { DashboardShell } from '@/components/dashboard'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'general' | 'inventory' | 'notifications' | 'team'>('general')
  const [saved, setSaved] = useState(false)

  const [companyInfo, setCompanyInfo] = useState({
    name: 'Elufidiya 1975 Luxury House',
    email: 'concierge@elufidiya.com',
    currency: 'USD ($)',
    timezone: 'Africa/Nairobi (EAT)',
    taxId: 'KE-VAT-9920148',
    address: "D'GTC Boutique Mall, GTC Tower (Below JW Marriott Hotel), Westlands",
    city: 'Nairobi, Kenya & Lagos, Nigeria',
    instagram: '@elufidiya1975',
    instagramNg: '@elufidiya_ng',
    facebook: 'Elufidiya1975',
  })

  const [inventoryConfig, setInventoryConfig] = useState({
    skuPrefix: 'ELF-',
    autoReorder: true,
    reorderThreshold: 10,
    defaultWarehouse: "D'GTC Flagship Boutique (Nairobi)",
    trackCommittedStock: true,
    allowNegativeStock: false,
    requireManagerApproval: true,
  })

  const [notifications, setNotifications] = useState({
    instagramOrders: true,
    kempinskiAlerts: true,
    italianLeatherArrival: true,
    internationalShipment: true,
  })

  const handleSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <DashboardShell>
      <div className="space-y-6 p-4 sm:p-6 lg:p-8 max-w-6xl">
        {/* Page Header Banner */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs transition-all hover:shadow-md sm:p-6">
          <div className="flex items-start gap-4">
            <div className="relative flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-amber-400/50 bg-gradient-to-tr from-[#0b1329] to-[#0e1d42] p-1 shadow-md ring-2 ring-blue-500/20">
              <Image
                src="/elufidiya-logo.png"
                alt="Elufidiya Crest"
                width={44}
                height={44}
                className="size-full object-contain"
              />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                  Maison Configurations &amp; Preferences
                </h1>
                <span className="rounded-full bg-gradient-to-r from-red-600 to-red-700 px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-white shadow-xs">
                  EST. 1975
                </span>
              </div>
              <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">
                Manage global luxury identity, boutique dispatch protocols, inventory rules, and team permissions.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => handleSave()}
            className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-blue-600/30 transition-all hover:scale-[1.02] hover:shadow-lg active:scale-95"
          >
            {saved ? (
              <>
                <Check className="size-4 text-emerald-300" />
                <span>Saved Successfully</span>
              </>
            ) : (
              <>
                <Save className="size-4" />
                <span>Save Preferences</span>
              </>
            )}
          </button>
        </div>

        {/* Tab Navigation Pill Bar */}
        <div className="flex gap-2 overflow-x-auto rounded-2xl border border-slate-200/90 bg-white p-1.5 shadow-xs">
          {[
            { id: 'general', label: 'Maison Profile & Boutiques', icon: Building2 },
            { id: 'inventory', label: 'Craft & Stock Rules', icon: SlidersHorizontal },
            { id: 'notifications', label: 'VIP Alerts & Channels', icon: Bell },
            { id: 'team', label: 'Atelier Masters & Team', icon: Users },
          ].map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white shadow-md shadow-blue-600/25'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Icon className="size-4" />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>

        {/* Tab 1: General Brand & Flagship Identity */}
        {activeTab === 'general' && (
          <div className="space-y-6">
            {/* Crest Card */}
            <div className="flex flex-col sm:flex-row items-center gap-5 rounded-2xl border border-blue-900/30 bg-gradient-to-r from-[#0b1329] via-[#0d1d42] to-[#071024] p-5 sm:p-6 text-white shadow-md">
              <div className="relative flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-2 border-amber-400 bg-white p-1 shadow-lg ring-4 ring-blue-500/30">
                <Image
                  src="/elufidiya-logo.png"
                  alt="Official Elufidiya Crest"
                  width={76}
                  height={76}
                  className="size-full object-contain"
                />
              </div>
              <div className="text-center sm:text-left">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <h3 className="text-base font-bold text-white">Official Elufidiya 1975 Brand Crest</h3>
                  <span className="rounded-full border border-amber-400/40 bg-amber-400/10 px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider text-amber-300">
                    AUTHENTICATED
                  </span>
                </div>
                <p className="mt-1 text-xs text-slate-300 max-w-xl">
                  The official heraldic crest is stamped across VIP authentication certificates, invoices, shoe boxes, and travel sport suit garment bags.
                </p>
              </div>
            </div>

            {/* Profile Form */}
            <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-7 shadow-xs">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                Brand Credentials &amp; Flagship Locations
              </h2>
              <p className="mt-0.5 text-xs text-slate-500">
                Official contact parameters and billing currencies for client invoices
              </p>

              <form onSubmit={handleSave} className="mt-6 space-y-5">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-bold text-slate-700">Maison / Entity Name</label>
                    <input
                      value={companyInfo.name}
                      onChange={(e) => setCompanyInfo({ ...companyInfo, name: e.target.value })}
                      className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs font-semibold text-slate-900 outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/15 transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700">VIP Concierge Email</label>
                    <input
                      value={companyInfo.email}
                      onChange={(e) => setCompanyInfo({ ...companyInfo, email: e.target.value })}
                      className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs font-semibold text-slate-900 outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/15 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700">Global Instagram</label>
                    <div className="relative mt-1.5">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">@</span>
                      <input
                        value={companyInfo.instagram.replace('@', '')}
                        onChange={(e) => setCompanyInfo({ ...companyInfo, instagram: `@${e.target.value}` })}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-7 pr-3.5 py-2.5 text-xs font-semibold text-slate-900 outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/15 transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700">Nigeria Instagram</label>
                    <div className="relative mt-1.5">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">@</span>
                      <input
                        value={companyInfo.instagramNg.replace('@', '')}
                        onChange={(e) => setCompanyInfo({ ...companyInfo, instagramNg: `@${e.target.value}` })}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-7 pr-3.5 py-2.5 text-xs font-semibold text-slate-900 outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/15 transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700">Facebook Channel</label>
                    <input
                      value={companyInfo.facebook}
                      onChange={(e) => setCompanyInfo({ ...companyInfo, facebook: e.target.value })}
                      className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs font-semibold text-slate-900 outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/15 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700">Nairobi Flagship Store Location</label>
                  <input
                    value={companyInfo.address}
                    onChange={(e) => setCompanyInfo({ ...companyInfo, address: e.target.value })}
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs font-semibold text-slate-900 outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/15 transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-bold text-slate-700">Boutique Centers &amp; Hubs</label>
                    <input
                      value={companyInfo.city}
                      onChange={(e) => setCompanyInfo({ ...companyInfo, city: e.target.value })}
                      className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs font-semibold text-slate-900 outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/15 transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700">Base Catalog Currency</label>
                    <select
                      value={companyInfo.currency}
                      onChange={(e) => setCompanyInfo({ ...companyInfo, currency: e.target.value })}
                      className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs font-semibold text-slate-900 outline-none focus:border-blue-500 focus:bg-white"
                    >
                      <option value="USD ($)">USD ($) - International Luxury Currency</option>
                      <option value="NGN (₦)">NGN (₦) - Nigerian Naira (Lagos Hub)</option>
                      <option value="KES (KSh)">KES (KSh) - Kenyan Shillings (Nairobi Flagship)</option>
                      <option value="EUR (€)">EUR (€) - Euro (European Orders)</option>
                      <option value="GBP (£)">GBP (£) - British Pound (UK VIP Orders)</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="rounded-xl bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 px-5 py-2 text-xs font-bold text-white shadow-md shadow-blue-600/30 hover:scale-[1.02] active:scale-95 transition-all"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Tab 2: Craft & Stock Rules */}
        {activeTab === 'inventory' && (
          <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-7 shadow-xs space-y-6">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                Luxury Inventory &amp; Atelier Rules
              </h2>
              <p className="mt-0.5 text-xs text-slate-500">
                Configure auto-reservation for VIP orders, SKU code generation, and safety stock thresholds
              </p>
            </div>

            <div className="space-y-4 divide-y divide-slate-100">
              {/* Rule 1 */}
              <div className="flex items-center justify-between pt-4 first:pt-0">
                <div>
                  <p className="text-xs font-bold text-slate-900">VIP Reserve Commitment</p>
                  <p className="text-xs text-slate-500">
                    Immediately reserve handcrafted pairs when orders originate from Instagram or Kempinski concierge.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setInventoryConfig({
                      ...inventoryConfig,
                      trackCommittedStock: !inventoryConfig.trackCommittedStock,
                    })
                  }
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    inventoryConfig.trackCommittedStock ? 'bg-blue-600' : 'bg-slate-200'
                  }`}
                >
                  <span
                    className={`inline-block size-4 transform rounded-full bg-white transition-transform ${
                      inventoryConfig.trackCommittedStock ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Rule 2 */}
              <div className="flex items-center justify-between pt-4">
                <div>
                  <p className="text-xs font-bold text-slate-900">Manager Approval for Stock Write-offs</p>
                  <p className="text-xs text-slate-500">
                    Require approval before inventory adjustments or scrap write-offs can be finalized.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setInventoryConfig({
                      ...inventoryConfig,
                      requireManagerApproval: !inventoryConfig.requireManagerApproval,
                    })
                  }
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    inventoryConfig.requireManagerApproval ? 'bg-blue-600' : 'bg-slate-200'
                  }`}
                >
                  <span
                    className={`inline-block size-4 transform rounded-full bg-white transition-transform ${
                      inventoryConfig.requireManagerApproval ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Config Inputs */}
            <div className="grid grid-cols-1 gap-4 pt-3 sm:grid-cols-2 border-t border-slate-100">
              <div>
                <label className="text-xs font-bold text-slate-700">Primary Dispatch Boutique</label>
                <select
                  value={inventoryConfig.defaultWarehouse}
                  onChange={(e) =>
                    setInventoryConfig({ ...inventoryConfig, defaultWarehouse: e.target.value })
                  }
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs font-semibold text-slate-900 outline-none focus:border-blue-500 focus:bg-white"
                >
                  <option value="D'GTC Flagship Boutique (Nairobi)">D&apos;GTC Flagship Boutique (Below JW Marriott, Nairobi)</option>
                  <option value="Villa Rosa Kempinski Boutique (Nairobi)">Villa Rosa Kempinski Boutique (Nairobi)</option>
                  <option value="Lagos Atelier & Distribution Hub">Lagos Atelier &amp; Central Hub (Nigeria)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700">Standard SKU Prefix</label>
                <input
                  value={inventoryConfig.skuPrefix}
                  onChange={(e) =>
                    setInventoryConfig({ ...inventoryConfig, skuPrefix: e.target.value })
                  }
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs font-mono font-bold text-slate-900 outline-none focus:border-blue-500 focus:bg-white"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => handleSave()}
                className="rounded-xl bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 px-5 py-2 text-xs font-bold text-white shadow-md shadow-blue-600/30 hover:scale-[1.02] active:scale-95 transition-all"
              >
                Save Inventory Rules
              </button>
            </div>
          </div>
        )}

        {/* Tab 3: VIP Alerts & Channels */}
        {activeTab === 'notifications' && (
          <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-7 shadow-xs space-y-6">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                VIP Order &amp; Stock Notification Channels
              </h2>
              <p className="mt-0.5 text-xs text-slate-500">
                Select which customer orders and boutique inventory events trigger instant alerts
              </p>
            </div>

            <div className="space-y-3">
              {[
                {
                  key: 'instagramOrders' as const,
                  title: 'New order via Instagram Direct (@elufidiya1975)',
                  desc: 'Instant push alert sent directly to VIP concierge lead.',
                  badge: 'VIP Sales',
                },
                {
                  key: 'kempinskiAlerts' as const,
                  title: 'Villa Rosa Kempinski Boutique Low Stock',
                  desc: 'Triggers automatic replenishment requisition from Nairobi D\'GTC hub.',
                  badge: 'Boutique Stock',
                },
                {
                  key: 'italianLeatherArrival' as const,
                  title: 'Italian Calfskin Leather Delivery at Lagos Atelier',
                  desc: 'Alerts master artisans to perform material verification & grain inspection.',
                  badge: 'Workshop',
                },
                {
                  key: 'internationalShipment' as const,
                  title: 'International VIP Delivery Confirmation (UK, USA, UAE)',
                  desc: 'Generates courier tracking receipt and sends SMS to client.',
                  badge: 'Logistics',
                },
              ].map((item) => {
                const isEnabled = notifications[item.key]
                return (
                  <div
                    key={item.key}
                    className="flex items-center justify-between rounded-xl border border-slate-200/80 bg-slate-50/50 p-4 transition-all hover:bg-white hover:border-blue-200 hover:shadow-xs"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-xs font-bold text-slate-900">{item.title}</p>
                        <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-700 border border-blue-200">
                          {item.badge}
                        </span>
                      </div>
                      <p className="mt-0.5 text-xs text-slate-500">{item.desc}</p>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        setNotifications({
                          ...notifications,
                          [item.key]: !notifications[item.key],
                        })
                      }
                      className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${
                        isEnabled ? 'bg-blue-600' : 'bg-slate-200'
                      }`}
                    >
                      <span
                        className={`inline-block size-4 transform rounded-full bg-white transition-transform ${
                          isEnabled ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                )
              })}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => handleSave()}
                className="rounded-xl bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 px-5 py-2 text-xs font-bold text-white shadow-md shadow-blue-600/30 hover:scale-[1.02] active:scale-95 transition-all"
              >
                Save Notification Preferences
              </button>
            </div>
          </div>
        )}

        {/* Tab 4: Atelier Masters & Boutique Team */}
        {activeTab === 'team' && (
          <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-7 shadow-xs space-y-6">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                Maison Leadership &amp; Boutique Managers
              </h2>
              <p className="mt-0.5 text-xs text-slate-500">
                Staff authorized with luxury order allocation and warehouse dispatch permissions
              </p>
            </div>

            <div className="space-y-3">
              {[
                {
                  name: 'Elufidiya',
                  email: 'director@elufidiya.com',
                  role: 'Creative Director & Founder',
                  tag: 'Executive',
                  isLead: true,
                },
                {
                  name: 'Grace Mutua',
                  email: 'grace.m@elufidiya.com',
                  role: "D'GTC Flagship Boutique Lead (Nairobi)",
                  tag: 'Nairobi Flagship',
                  isLead: false,
                },
                {
                  name: 'Kevin Mwangi',
                  email: 'kevin.m@elufidiya.com',
                  role: 'Villa Rosa Kempinski Store Manager',
                  tag: 'Kempinski Lounge',
                  isLead: false,
                },
                {
                  name: 'Chuka Obi',
                  email: 'chuka.o@elufidiya.com',
                  role: 'Lagos Atelier Master Artisan',
                  tag: 'Lagos Hub',
                  isLead: false,
                },
              ].map((member, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-xl border border-slate-200/80 bg-slate-50/50 p-4 transition-all hover:bg-white hover:border-blue-200 hover:shadow-xs"
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`flex size-10 items-center justify-center rounded-xl font-bold text-xs shadow-xs ${
                        member.isLead
                          ? 'border border-amber-400 bg-gradient-to-tr from-blue-900 to-slate-900 text-amber-300 ring-2 ring-blue-500/20'
                          : 'bg-blue-100 text-blue-700'
                      }`}
                    >
                      {member.isLead ? <Crown className="size-4 text-amber-400" /> : member.name.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-xs font-bold text-slate-900">{member.name}</p>
                        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600">
                          {member.tag}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500">{member.role} · {member.email}</p>
                    </div>
                  </div>

                  <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[11px] font-bold text-blue-700">
                    Active Access
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </DashboardShell>
  )
}
