import { ChevronDown } from 'lucide-react'
import { REVENUE_MONTHS, type MonthlyRevenue } from '@/lib/dashboard-data'

interface RevenueOverviewProps {
  data?: MonthlyRevenue[]
  growthText?: string
  timeRange?: string
}

export function RevenueOverview({
  data = REVENUE_MONTHS,
  growthText = '+18.6% vs last year',
  timeRange = 'Last 12 months',
}: RevenueOverviewProps) {
  return (
    <section className="rounded-2xl border border-[#dbe3dc] bg-white p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-semibold text-[#1e2c26]">Revenue overview</p>
          <p className="mt-1 text-xs text-[#87928c]">Sales performance over the last 12 months</p>
        </div>
        <button
          type="button"
          className="flex items-center gap-2 rounded-lg border border-[#dbe3dc] px-3 py-2 text-xs text-[#1e2c26] transition-colors hover:bg-neutral-50"
        >
          {timeRange} <ChevronDown className="size-3.5 text-[#87928c]" />
        </button>
      </div>

      <div className="mt-8 flex h-[190px] items-end gap-2 sm:gap-3">
        {data.map((item, index) => (
          <div key={index} className="flex h-full flex-1 flex-col justify-end gap-2">
            <div
              className={`w-full rounded-t-md transition-all duration-300 ${
                item.isHighlighted ? 'bg-[#c8f04a]' : 'bg-[#e2ebdf] hover:bg-[#d5e0d1]'
              }`}
              style={{ height: `${item.height}%` }}
            />
            <span className="text-center text-[10px] text-[#a0aaa4]">{item.month}</span>
          </div>
        ))}
      </div>

      <div className="mt-4 border-t border-[#edf1ed] pt-4 text-[11px] font-medium text-[#4f8c49]">
        {growthText}
      </div>
    </section>
  )
}
