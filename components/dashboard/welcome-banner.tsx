import { Plus } from 'lucide-react'

interface WelcomeBannerProps {
  date?: string
  userName?: string
  onAddNew?: () => void
}

export function WelcomeBanner({
  date = 'Sunday, October 20, 2024',
  userName = 'Elufidiya',
  onAddNew,
}: WelcomeBannerProps) {
  return (
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-xs font-semibold text-slate-500">{date}</p>
          <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 border border-emerald-200">
            D&apos;GTC Mall &amp; Kempinski Live
          </span>
        </div>
        <h1 className="mt-1.5 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl lg:text-[27px]">
          Good morning, {userName}
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-500 leading-relaxed max-w-3xl">
          Here&apos;s real-time inventory and orders across your Nairobi flagships, Lagos atelier, and international deliveries.
        </p>
      </div>

      <button
        type="button"
        onClick={onAddNew}
        className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-blue-600/25 transition-all hover:scale-[1.02] active:scale-95 shrink-0"
      >
        <Plus className="size-4" strokeWidth={2.5} />
        <span>Add New Item</span>
      </button>
    </div>
  )
}
