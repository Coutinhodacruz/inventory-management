'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import {
  BarChart2,
  Box,
  ChevronDown,
  ChevronRight,
  Folder,
  Home,
  Layers,
  PanelLeftClose,
  Plus,
  ShoppingBag,
  ShoppingCart,
  X,
} from 'lucide-react'
import { ZOHO_NAV_STRUCTURE, type ZohoNavCategory } from '@/lib/dashboard-data'

interface SidebarProps {
  open: boolean
  onClose: () => void
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()

  // By default, collapsible sidebar categories are closed
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})

  const toggleSection = (title: string) => {
    setExpanded((prev) => ({
      ...prev,
      [title]: !prev[title],
    }))
  }

  const isSubItemActive = (href: string, aliases?: string[]) => {
    if (pathname === href) return true
    if (aliases && aliases.some((a) => pathname === a || pathname.startsWith(a))) return true
    return false
  }

  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs transition-opacity lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-full w-[240px] shrink-0 flex-col overflow-hidden bg-gradient-to-b from-[#0b1120] via-[#0e172a] to-[#070b14] text-slate-300 border-r border-blue-950/60 shadow-2xl transition-transform duration-200 lg:static lg:z-auto lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Elufidiya Maison Brand Header */}
        <div className="shrink-0 flex h-16 items-center justify-between border-b border-white/[0.08] px-4 bg-white/[0.02]">
          <Link
            href="/"
            onClick={onClose}
            className="flex items-center gap-3 transition-opacity hover:opacity-95"
          >
            {/* Authentic Elufidiya Crest Logo with Gold/Blue Ambient Glow */}
            <div className="relative flex size-9.5 shrink-0 items-center justify-center overflow-hidden rounded-full border border-amber-400/50 bg-white p-0.5 shadow-md ring-2 ring-blue-500/30">
              <Image
                src="/elufidiya-logo.png"
                alt="Elufidiya Crest"
                width={38}
                height={38}
                className="size-full object-contain"
                priority
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[15px] font-bold tracking-tight text-white">
                  Elufidiya
                </span>
                <span className="rounded bg-gradient-to-r from-red-600 to-red-700 px-1 py-0.5 text-[8.5px] font-black uppercase tracking-wider text-white shadow-xs">
                  1975
                </span>
              </div>
              <p className="text-[10px] font-semibold tracking-wider uppercase text-blue-300/80">
                Maison Inventory OS
              </p>
            </div>
          </Link>

          <button
            onClick={onClose}
            className="rounded p-1 text-slate-400 hover:bg-white/[0.08] hover:text-white lg:hidden"
            aria-label="Close navigation"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Live Active Atelier Badge */}
        <div className="shrink-0 mx-3 mt-3 flex items-center justify-between rounded-lg border border-blue-900/40 bg-blue-950/30 px-2.5 py-1.5 text-[11px] text-blue-200 backdrop-blur-xs">
          <div className="flex items-center gap-2">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            <span className="font-medium text-slate-300">D&apos;GTC Mall Flagship</span>
          </div>
          <span className="text-[10px] font-bold text-amber-400/90 uppercase tracking-wider">Live</span>
        </div>

        {/* Navigation list */}
        <nav className="flex-1 overflow-y-auto min-h-0 px-2 py-3 text-[13px]">
          <ul className="space-y-0.5">
            {ZOHO_NAV_STRUCTURE.map((item) => {
              const Icon = item.icon
              const hasSubItems = item.subItems && item.subItems.length > 0
              const isSectionOpen = expanded[item.title] ?? false
              const isDirectActive = item.href && pathname === item.href

              if (!hasSubItems && item.href) {
                return (
                  <li key={item.title}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] font-medium transition-all ${
                        isDirectActive
                          ? 'bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white font-semibold shadow-md shadow-blue-950/70 border-l-[3px] border-red-500'
                          : 'text-slate-400 hover:bg-white/[0.06] hover:text-white'
                      }`}
                    >
                      <Icon className="size-4 shrink-0" />
                      <span>{item.title}</span>
                    </Link>
                  </li>
                )
              }

              return (
                <li key={item.title} className="pt-1.5">
                  {/* Category Header */}
                  <button
                    type="button"
                    onClick={() => toggleSection(item.title)}
                    className="flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-left text-[12.5px] font-semibold text-slate-400 uppercase tracking-wider transition-colors hover:bg-white/[0.05] hover:text-white"
                  >
                    <div className="flex items-center gap-2">
                      {isSectionOpen ? (
                        <ChevronDown className="size-3.5 text-slate-400" />
                      ) : (
                        <ChevronRight className="size-3.5 text-slate-400" />
                      )}
                      <Icon className="size-4 shrink-0 text-blue-400" />
                      <span>{item.title}</span>
                    </div>
                  </button>

                  {/* Sub items */}
                  {isSectionOpen && item.subItems && (
                    <ul className="mt-1 space-y-0.5">
                      {item.subItems.map((sub) => {
                        const active = isSubItemActive(sub.href, sub.aliases)
                        return (
                          <li key={sub.title}>
                            <div
                              className={`group relative flex items-center justify-between rounded-lg transition-all ${
                                active
                                  ? 'bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white font-semibold shadow-md shadow-blue-950/70 border-l-[3px] border-red-500'
                                  : 'text-slate-400 hover:bg-white/[0.06] hover:text-white'
                              }`}
                            >
                              <Link
                                href={sub.href}
                                onClick={onClose}
                                className="flex-1 py-1.5 pl-8 text-[13px]"
                              >
                                {sub.title}
                              </Link>

                              {sub.quickAdd && (
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    router.push(sub.href)
                                  }}
                                  title={`New ${sub.title}`}
                                  className={`mr-2 flex size-4.5 items-center justify-center rounded transition-all ${
                                    active
                                      ? 'text-white hover:bg-white/20'
                                      : 'text-slate-400 opacity-0 hover:bg-blue-600 hover:text-white group-hover:opacity-100'
                                  }`}
                                >
                                  <Plus className="size-3" />
                                </button>
                              )}
                            </div>
                          </li>
                        )
                      })}
                    </ul>
                  )}
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Bottom Utility Elements */}
        <div className="shrink-0 mt-auto border-t border-white/[0.08] bg-black/20 p-3 space-y-2">
          {/* Configure Features */}
          <Link
            href="/settings"
            onClick={onClose}
            className="flex w-full items-center justify-between rounded-lg border border-blue-900/30 bg-gradient-to-r from-slate-900/90 to-blue-950/60 px-3 py-2 text-xs font-medium text-slate-300 shadow-xs transition-all hover:border-blue-600/60 hover:text-white hover:shadow-md"
          >
            <div className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-blue-400 animate-pulse" />
              <span>Configure Features</span>
            </div>
            <ChevronRight className="size-3.5 text-slate-400" />
          </Link>

          {/* Elufidiya Maison Stamp */}
          <div className="flex items-center justify-between px-1.5 pt-1 text-[10px] text-slate-500">
            <span className="font-medium tracking-wide">ELUFIDIYA 1975</span>
            <span className="font-semibold text-amber-500/80">HAUTE MAISON</span>
          </div>
        </div>
      </aside>
    </>
  )
}
