import { RECENT_ACTIVITIES, type ActivityItem } from '@/lib/dashboard-data'

interface RecentActivityProps {
  activities?: ActivityItem[]
}

export function RecentActivity({ activities = RECENT_ACTIVITIES }: RecentActivityProps) {
  return (
    <section className="rounded-2xl border border-[#dbe3dc] bg-white p-5">
      <p className="text-sm font-semibold text-[#1e2c26]">Recent activity</p>
      <p className="mt-1 text-xs text-[#87928c]">Latest updates from your workspace</p>

      <div className="mt-5 flex flex-col gap-5">
        {activities.map((item) => {
          const Icon = item.icon
          return (
            <div key={item.id} className="flex items-start gap-3">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#eef3ee] text-[#5f7869]">
                <Icon className="size-3.5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-medium text-[#1e2c26]">{item.title}</p>
                <p className="truncate text-[10px] text-[#9aa59f]">{item.subtitle}</p>
              </div>
              <span className="shrink-0 text-[10px] text-[#a0aaa4]">{item.timestamp}</span>
            </div>
          )
        })}
      </div>
    </section>
  )
}
