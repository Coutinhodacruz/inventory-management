interface InventoryHealthProps {
  totalItems?: number
  healthyCount?: number
  lowStockCount?: number
  outOfStockCount?: number
  onOrderCount?: number
}

export function InventoryHealth({
  totalItems = 248,
  healthyCount = 166,
  lowStockCount = 42,
  outOfStockCount = 12,
  onOrderCount = 28,
}: InventoryHealthProps) {
  return (
    <section className="rounded-2xl border border-[#dbe3dc] bg-white p-5">
      <p className="text-sm font-semibold text-[#1e2c26]">Inventory health</p>
      <p className="mt-1 text-xs text-[#87928c]">Stock status across all products</p>

      {/* Donut chart gauge */}
      <div
        className="mx-auto mt-7 flex size-[164px] items-center justify-center rounded-full transition-transform hover:scale-105"
        style={{
          background:
            'conic-gradient(#c8f04a 0deg 241deg, #f3c47d 241deg 298deg, #ef8c5c 298deg 316deg, #edf1ed 316deg)',
        }}
      >
        <div className="flex size-[116px] flex-col items-center justify-center rounded-full bg-white shadow-inner">
          <span className="text-[28px] font-semibold tracking-[-0.03em] text-[#1e2c26]">
            {totalItems}
          </span>
          <span className="text-[11px] text-[#87928c]">total items</span>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-7 grid grid-cols-2 gap-3 text-xs text-[#7e8b84]">
        <span className="flex items-center justify-between">
          <span>
            <span className="text-[#c8f04a] mr-1">●</span> Healthy
          </span>
          <b className="text-[#33463c]">{healthyCount}</b>
        </span>
        <span className="flex items-center justify-between">
          <span>
            <span className="text-[#f3c47d] mr-1">●</span> Low stock
          </span>
          <b className="text-[#33463c]">{lowStockCount}</b>
        </span>
        <span className="flex items-center justify-between">
          <span>
            <span className="text-[#ef8c5c] mr-1">●</span> Out of stock
          </span>
          <b className="text-[#33463c]">{outOfStockCount}</b>
        </span>
        <span className="flex items-center justify-between">
          <span>
            <span className="text-[#edf1ed] mr-1">●</span> On order
          </span>
          <b className="text-[#33463c]">{onOrderCount}</b>
        </span>
      </div>
    </section>
  )
}
