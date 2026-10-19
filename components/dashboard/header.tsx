'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Bell,
  Check,
  ChevronDown,
  Crown,
  MapPin,
  Menu,
  Plus,
  Search,
  Settings,
  Sparkles,
  SlidersHorizontal,
  X,
} from 'lucide-react'

interface HeaderProps {
  onOpenSidebar: () => void
  searchQuery?: string
  onSearchChange?: (value: string) => void
  onQuickCreate?: () => void
}

const BOUTIQUES = [
  { id: 'dgtc', name: "D'GTC Flagship (Nairobi)", city: 'Nairobi, Kenya', active: true },
  { id: 'kempinski', name: 'Villa Rosa Kempinski Boutique', city: 'Nairobi, Kenya', active: false },
  { id: 'lagos', name: 'Lagos Atelier & Distribution Hub', city: 'Victoria Island, Lagos', active: false },
]

export function Header({
  onOpenSidebar,
  searchQuery = '',
  onSearchChange,
  onQuickCreate,
}: HeaderProps) {
  const [selectedBoutique, setSelectedBoutique] = useState(BOUTIQUES[0])
  const [boutiqueDropdown, setBoutiqueDropdown] = useState(false)
  const [currency, setCurrency] = useState<'USD' | 'NGN'>('USD')
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200/90 bg-white/95 px-3 backdrop-blur-md transition-all sm:px-6">
      {/* Mobile Search Active Mode */}
      {mobileSearchOpen ? (
        <div className="flex w-full items-center gap-2 animate-in fade-in">
          <Search className="size-4 text-slate-400 shrink-0" />
          <input
            type="search"
            autoFocus
            value={searchQuery}
            onChange={(e) => onSearchChange?.(e.target.value)}
            placeholder="Search items, SKU, artisans, orders..."
            className="h-10 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs text-slate-900 outline-none focus:border-blue-500 focus:bg-white"
          />
          <button
            type="button"
            onClick={() => setMobileSearchOpen(false)}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
            aria-label="Close search"
          >
            <X className="size-5" />
          </button>
        </div>
      ) : (
        <>
          {/* Left side: Hamburger (mobile), Boutique Selector, & Search */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4 min-w-0">
            <button
              type="button"
              onClick={onOpenSidebar}
              className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden shrink-0"
              aria-label="Open menu"
            >
              <Menu className="size-5" />
            </button>

            {/* Boutique Location Selector Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setBoutiqueDropdown(!boutiqueDropdown)}
                className="flex items-center gap-1.5 sm:gap-2 rounded-lg border border-slate-200 bg-slate-50/80 px-2 py-1.5 text-xs font-semibold text-slate-800 transition-all hover:border-blue-400 hover:bg-white hover:shadow-xs"
              >
                <div className="flex size-5 items-center justify-center rounded-full bg-blue-600 text-white shadow-xs shrink-0">
                  <MapPin className="size-3" />
                </div>
                <span className="hidden md:inline">{selectedBoutique.name}</span>
                <span className="md:hidden truncate max-w-[100px] sm:max-w-none">D&apos;GTC</span>
                <ChevronDown className="size-3 text-slate-400 shrink-0" />
              </button>

              {boutiqueDropdown && (
                <div className="absolute left-0 top-full z-50 mt-1.5 w-[calc(100vw-2rem)] max-w-xs rounded-xl border border-slate-200 bg-white p-2 shadow-xl animate-in fade-in zoom-in-95">
                  <div className="border-b border-slate-100 px-2.5 py-1.5">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Select Maison Boutique
                    </p>
                  </div>
                  <div className="mt-1 space-y-1">
                    {BOUTIQUES.map((b) => (
                      <button
                        key={b.id}
                        type="button"
                        onClick={() => {
                          setSelectedBoutique(b)
                          setBoutiqueDropdown(false)
                        }}
                        className={`flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left text-xs transition-colors ${
                          selectedBoutique.id === b.id
                            ? 'bg-blue-50 font-bold text-blue-700'
                            : 'text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <div>
                          <p className="font-medium">{b.name}</p>
                          <p className="text-[10px] text-slate-400">{b.city}</p>
                        </div>
                        {selectedBoutique.id === b.id && (
                          <Check className="size-4 text-blue-600" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Global Luxury Search Input on Desktop */}
            <div className="relative hidden w-[200px] md:block lg:w-[300px]">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-slate-400" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => onSearchChange?.(e.target.value)}
                placeholder="Search items, SKU, orders..."
                className="h-9 w-full rounded-lg border border-slate-200 bg-slate-50/70 pl-8.5 pr-8 text-xs text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-3 focus:ring-blue-500/15"
              />
              <kbd className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[9px] font-semibold text-slate-400 shadow-2xs">
                /
              </kbd>
            </div>
          </div>

          {/* Right side: Mobile Search Button, Currency, Notification Bell, New Item Button, User profile */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* Mobile Search Icon Trigger */}
            <button
              type="button"
              onClick={() => setMobileSearchOpen(true)}
              className="flex size-8 sm:size-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 md:hidden"
              aria-label="Open search"
            >
              <Search className="size-4" />
            </button>

            {/* Currency Switcher */}
            <div className="flex items-center rounded-lg border border-slate-200 bg-slate-100 p-0.5 text-[10.5px] sm:text-[11px] font-bold">
              <button
                type="button"
                onClick={() => setCurrency('USD')}
                className={`rounded-md px-1.5 sm:px-2 py-1 transition-all ${
                  currency === 'USD'
                    ? 'bg-white text-blue-700 shadow-2xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                USD $
              </button>
              <button
                type="button"
                onClick={() => setCurrency('NGN')}
                className={`rounded-md px-1.5 sm:px-2 py-1 transition-all ${
                  currency === 'NGN'
                    ? 'bg-white text-blue-700 shadow-2xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                NGN ₦
              </button>
            </div>

            {/* Notification Bell */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                title="Maison Alerts"
                className="relative flex size-8 sm:size-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition-all hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
              >
                <Bell className="size-4" />
                <span className="absolute right-1.5 top-1.5 flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-red-400 opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-red-600" />
                </span>
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 top-full z-50 mt-2 w-[calc(100vw-2rem)] max-w-xs sm:w-80 rounded-xl border border-slate-200 bg-white p-3 shadow-xl animate-in fade-in zoom-in-95">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="text-xs font-bold text-slate-900">Atelier Stock Notifications</span>
                    <span className="rounded-full bg-red-50 px-2 py-0.5 text-[10px] font-bold text-red-600">
                      2 Pending
                    </span>
                  </div>
                  <div className="mt-2 space-y-2 text-xs">
                    <div className="rounded-lg bg-red-50/70 p-2.5 text-red-900 border border-red-100">
                      <p className="font-semibold">Low Stock: Italian Crocodile Loafers</p>
                      <p className="text-[11px] text-red-700">Only 4 pairs remaining at D&apos;GTC Mall.</p>
                    </div>
                    <div className="rounded-lg bg-blue-50/70 p-2.5 text-blue-900 border border-blue-100">
                      <p className="font-semibold">VIP Order: Gentleman&apos;s Travel Set</p>
                      <p className="text-[11px] text-blue-700">Dispatched to Kempinski Presidential Suite.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Add Button with Royal Sapphire Gradient */}
            <button
              type="button"
              onClick={onQuickCreate}
              className="flex h-8 sm:h-9 items-center gap-1.5 rounded-lg bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 px-2.5 sm:px-3.5 text-xs font-bold text-white shadow-md shadow-blue-600/25 transition-all hover:scale-[1.02] active:scale-95"
            >
              <Plus className="size-4" strokeWidth={2.5} />
              <span className="hidden sm:inline">New Item</span>
            </button>

            <div className="hidden h-5 w-px bg-slate-200 md:block" />

            {/* Executive Director Profile Badge */}
            <div className="flex items-center gap-2">
              <div className="relative flex size-8 sm:size-9 items-center justify-center overflow-hidden rounded-full border border-amber-400 bg-gradient-to-tr from-blue-900 to-slate-900 shadow-sm ring-2 ring-blue-500/20">
                <span className="text-xs font-black text-amber-300">E</span>
              </div>
              <div className="hidden text-left xl:block">
                <div className="flex items-center gap-1">
                  <span className="text-xs font-bold text-slate-900">Elufidiya</span>
                  <Crown className="size-3 text-amber-500 fill-amber-500" />
                </div>
                <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                  Haute Director
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  )
}
