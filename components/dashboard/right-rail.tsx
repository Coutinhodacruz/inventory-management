'use client'

import {
  ChevronLeft,
  ChevronRight,
  FileText,
  HelpCircle,
  MessageSquare,
  Sparkles,
  ThumbsUp,
  Tv,
} from 'lucide-react'

export function RightRail() {
  return (
    <aside className="hidden w-10 flex-col items-center justify-between border-l border-[#eaebf0] bg-white py-3 lg:flex">
      {/* Top action icons */}
      <div className="flex flex-col items-center gap-3">
        {/* Help circle in orange badge like in screenshot */}
        <button
          type="button"
          title="Help & Documentation"
          className="flex size-6 items-center justify-center rounded-full bg-[#ff7a00] text-xs font-bold text-white shadow-xs transition-transform hover:scale-110"
        >
          ?
        </button>

        {/* Feedback */}
        <button
          type="button"
          title="Send Feedback"
          className="rounded p-1 text-[#6b7280] transition-colors hover:bg-neutral-100 hover:text-[#1e293b]"
        >
          <ThumbsUp className="size-4" />
        </button>

        {/* Video Tour */}
        <button
          type="button"
          title="Watch Video Guides"
          className="rounded p-1 text-[#6b7280] transition-colors hover:bg-neutral-100 hover:text-[#1e293b]"
        >
          <Tv className="size-4" />
        </button>

        {/* Live Chat */}
        <button
          type="button"
          title="Chat with Support"
          className="rounded p-1 text-[#6b7280] transition-colors hover:bg-neutral-100 hover:text-[#1e293b]"
        >
          <MessageSquare className="size-4" />
        </button>

        {/* Notes / Memos */}
        <button
          type="button"
          title="Scratchpad & Notes"
          className="rounded p-1 text-[#6b7280] transition-colors hover:bg-neutral-100 hover:text-[#1e293b]"
        >
          <FileText className="size-4" />
        </button>
      </div>

      {/* Bottom expand/collapse arrow */}
      <button
        type="button"
        title="Toggle Panel"
        className="flex size-6 items-center justify-center rounded-full border border-neutral-200 bg-[#f8fafc] text-[#6b7280] shadow-xs hover:bg-neutral-100"
      >
        <ChevronLeft className="size-3.5" />
      </button>
    </aside>
  )
}
