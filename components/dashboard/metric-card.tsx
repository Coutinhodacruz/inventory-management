import type { LucideIcon } from 'lucide-react'
import { MoreHorizontal } from 'lucide-react'
import type { MetricItem } from '@/lib/dashboard-data'

export interface MetricCardProps {
  label: string
  value: string
  change: string
  icon: LucideIcon
  tone: string
}

export function MetricCard({ label, value, change, icon: Icon, tone }: MetricCardProps) {
  return (
    <div className="rounded-2xl border border-[#dbe3dc] bg-white p-5 transition-shadow hover:shadow-sm">
      <div className="flex items-start justify-between">
        <div className={`flex size-9 items-center justify-center rounded-xl ${tone}`}>
          <Icon className="size-[17px]" />
        </div>
        <button
          type="button"
          aria-label="More options"
          className="rounded p-1 text-[#99a49e] transition-colors hover:bg-neutral-50 hover:text-[#607068]"
        >
          <MoreHorizontal className="size-4" />
        </button>
      </div>

      <p className="mt-4 text-xs font-medium text-[#77847d]">{label}</p>

      <div className="mt-1 flex items-end justify-between">
        <p className="text-[26px] font-semibold tracking-[-0.04em] text-[#1e2c26]">{value}</p>
        <span className="text-[11px] font-semibold text-[#4f8c49]">↗ {change}</span>
      </div>
    </div>
  )
}

interface MetricsGridProps {
  metrics: MetricItem[]
}

export function MetricsGrid({ metrics }: MetricsGridProps) {
  return (
    <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {metrics.map((item) => (
        <MetricCard
          key={item.label}
          label={item.label}
          value={item.value}
          change={item.change}
          icon={item.icon}
          tone={item.tone}
        />
      ))}
    </div>
  )
}
