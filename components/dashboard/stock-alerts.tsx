import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import type { ProductItem } from '@/lib/dashboard-data'

interface StockAlertsProps {
  products: ProductItem[]
  onViewInventory?: () => void
}

export function StockAlerts({ products }: StockAlertsProps) {
  return (
    <section className="rounded-2xl border border-[#dbe3dc] bg-white">
      <div className="flex items-center justify-between border-b border-[#edf1ed] p-5">
        <div>
          <p className="text-sm font-semibold text-[#1e2c26]">Stock alerts</p>
          <p className="mt-1 text-xs text-[#87928c]">Products that need your attention</p>
        </div>
        <Link
          href="/products"
          className="flex items-center gap-1 text-xs font-semibold text-[#68832a] transition-colors hover:text-[#526b1f]"
        >
          View inventory <ChevronRight className="size-3.5" />
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[580px] text-left">
          <thead>
            <tr className="border-b border-[#edf1ed] text-[10px] uppercase tracking-[0.12em] text-[#9aa59f]">
              <th className="px-5 py-3 font-semibold">Product</th>
              <th className="px-4 py-3 font-semibold">Category</th>
              <th className="px-4 py-3 font-semibold text-right">Available</th>
              <th className="px-4 py-3 font-semibold text-right">Value</th>
              <th className="px-5 py-3 font-semibold text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-5 py-8 text-center text-xs text-[#87928c]">
                  No matching products found.
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr
                  key={product.sku}
                  className="border-b border-[#f0f3f0] transition-colors hover:bg-[#fafbfa] last:border-0"
                >
                  <td className="px-5 py-3.5">
                    <p className="text-xs font-semibold text-[#1e2c26]">{product.name}</p>
                    <p className="text-[10px] text-[#9aa59f]">{product.sku}</p>
                  </td>
                  <td className="px-4 py-3.5 text-xs text-[#728078]">{product.category}</td>
                  <td className="px-4 py-3.5 text-right text-xs font-semibold text-[#1e2c26]">
                    {product.availableStock} units
                  </td>
                  <td className="px-4 py-3.5 text-right text-xs text-[#728078]">
                    ${(product.stockOnHand * product.sellingPrice).toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                    })}
                  </td>
                  <td className="px-5 py-3.5 text-center">
                    <span
                      className={`inline-block rounded-full px-2 py-1 text-[10px] font-semibold ${
                        product.status === 'Out of stock'
                          ? 'bg-[#fff0e6] text-[#c47748]'
                          : product.status === 'In stock'
                          ? 'bg-[#e8f1ed] text-[#47715d]'
                          : 'bg-[#fff7df] text-[#a1792f]'
                      }`}
                    >
                      {product.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}
