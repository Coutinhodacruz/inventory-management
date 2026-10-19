'use client'

import { useState } from 'react'
import { Sidebar } from './sidebar'
import { Header } from './header'

interface DashboardShellProps {
  children: React.ReactNode
  searchQuery?: string
  onSearchChange?: (query: string) => void
  onQuickCreate?: () => void
}

export function DashboardShell({
  children,
  searchQuery = '',
  onSearchChange,
  onQuickCreate,
}: DashboardShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [internalQuery, setInternalQuery] = useState('')

  const activeQuery = onSearchChange ? searchQuery : internalQuery
  const handleQueryChange = onSearchChange || setInternalQuery

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#f8fafc] text-slate-900">
      {/* Elufidiya Maison Sidebar */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Column */}
      <div className="flex min-w-0 flex-1 flex-col h-full overflow-hidden">
        {/* Luxury Top Navigation Bar */}
        <Header
          onOpenSidebar={() => setSidebarOpen(true)}
          searchQuery={activeQuery}
          onSearchChange={handleQueryChange}
          onQuickCreate={onQuickCreate}
        />

        {/* Central Workspace Canvas - Only main scrolls */}
        <main className="flex-1 overflow-y-auto bg-[#f8fafc]">
          {children}
        </main>
      </div>
    </div>
  )
}
