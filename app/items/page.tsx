'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  AlertTriangle,
  ArrowUpDown,
  Boxes,
  Camera,
  Check,
  CheckCircle2,
  ChevronDown,
  Filter,
  Grid,
  Image as ImageIcon,
  LayoutGrid,
  List,
  ListFilter,
  MapPin,
  MoreHorizontal,
  Package,
  Plus,
  Search,
  SlidersHorizontal,
  Sparkles,
  Tag,
  Trash2,
  Upload,
  X,
} from 'lucide-react'
import { DashboardShell } from '@/components/dashboard'
import { INITIAL_PRODUCTS, type ProductItem } from '@/lib/dashboard-data'

const SAMPLE_PRESETS = [
  {
    name: 'Tassel Loafer',
    url: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=600&auto=format&fit=crop&q=80',
  },
  {
    name: 'Croco Loafer',
    url: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=600&auto=format&fit=crop&q=80',
  },
  {
    name: 'Chelsea Boot',
    url: 'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=600&auto=format&fit=crop&q=80',
  },
  {
    name: 'Sport Suit',
    url: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&auto=format&fit=crop&q=80',
  },
  {
    name: 'Travel Duffel',
    url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80',
  },
]

export default function ItemsPage() {
  const [products, setProducts] = useState<ProductItem[]>(INITIAL_PRODUCTS)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFilter, setSelectedFilter] = useState<'All' | 'Active' | 'Low Stock' | 'Out of Stock'>('All')
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [viewStyle, setViewStyle] = useState<'table' | 'grid'>('table')
  const [isModalOpen, setIsModalOpen] = useState(false)

  // New item form state with photo upload support
  const [form, setForm] = useState({
    name: '',
    sku: '',
    category: 'Signature Loafers' as ProductItem['category'],
    stockOnHand: 12,
    costPrice: 150,
    sellingPrice: 420,
    warehouse: "D'GTC Flagship Boutique (Nairobi)",
    image: '',
  })
  const [imageInputMode, setImageInputMode] = useState<'upload' | 'url'>('upload')
  const [isDragging, setIsDragging] = useState(false)

  const handleFileUpload = (file: File) => {
    if (!file) return
    const reader = new FileReader()
    reader.onload = (e) => {
      if (typeof e.target?.result === 'string') {
        setForm((prev) => ({ ...prev, image: e.target?.result as string }))
      }
    }
    reader.readAsDataURL(file)
  }

  const handleUpdateItemImage = (productId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (uploadEvent) => {
      if (typeof uploadEvent.target?.result === 'string') {
        const newImg = uploadEvent.target.result as string
        setProducts((prev) =>
          prev.map((item) => (item.id === productId ? { ...item, image: newImg } : item))
        )
      }
    }
    reader.readAsDataURL(file)
  }

  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category))
    return ['All', ...Array.from(set)]
  }, [products])

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const q = searchQuery.toLowerCase()
      const matchesSearch =
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)

      const matchesFilter =
        selectedFilter === 'All' ||
        (selectedFilter === 'Active' && p.status === 'In stock') ||
        (selectedFilter === 'Low Stock' && p.status === 'Low stock') ||
        (selectedFilter === 'Out of Stock' && p.status === 'Out of stock')

      const matchesCategory =
        selectedCategory === 'All' || p.category === selectedCategory

      return matchesSearch && matchesFilter && matchesCategory
    })
  }, [products, searchQuery, selectedFilter, selectedCategory])

  const lowStockCount = useMemo(
    () => products.filter((p) => p.status === 'Low stock').length,
    [products]
  )

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.sku) return

    const newProd: ProductItem = {
      id: `prod-${Date.now()}`,
      name: form.name,
      sku: form.sku.toUpperCase(),
      category: form.category,
      stockOnHand: Number(form.stockOnHand),
      committedStock: 0,
      availableStock: Number(form.stockOnHand),
      reorderPoint: 10,
      costPrice: Number(form.costPrice),
      sellingPrice: Number(form.sellingPrice),
      status: Number(form.stockOnHand) > 10 ? 'In stock' : 'Low stock',
      warehouse: form.warehouse,
      image: form.image || undefined,
      instagramTag: '@elufidiya1975',
      description: 'Handcrafted luxury piece by Elufidiya Maison.',
    }

    setProducts([newProd, ...products])
    setIsModalOpen(false)
    setForm({
      name: '',
      sku: '',
      category: 'Signature Loafers',
      stockOnHand: 12,
      costPrice: 150,
      sellingPrice: 420,
      warehouse: "D'GTC Flagship Boutique (Nairobi)",
      image: '',
    })
  }

  return (
    <DashboardShell
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      onQuickCreate={() => setIsModalOpen(true)}
    >
      <div className="space-y-6 p-4 sm:p-6 lg:p-8">
        {/* Luxury Catalog Toolbar */}
        <div className="flex flex-col gap-4 rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs transition-all hover:shadow-md sm:p-6">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            {/* Title & Count */}
            <div>
              <div className="flex items-center gap-2">
                <span className="flex size-2 rounded-full bg-blue-600 animate-pulse" />
                <h1 className="text-base font-bold text-slate-900 tracking-tight sm:text-lg">
                  Maison Collection Catalog
                </h1>
                <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-bold text-blue-700 border border-blue-200">
                  {filteredProducts.length} Pieces
                </span>
                {lowStockCount > 0 && (
                  <span className="rounded-full bg-red-50 px-2 py-0.5 text-[11px] font-bold text-red-600 border border-red-200 animate-pulse-subtle">
                    {lowStockCount} Low Stock
                  </span>
                )}
              </div>
              <p className="mt-0.5 text-xs text-slate-500">
                Manage handmade leather shoes, travel sport suits, and boutique allocations
              </p>
            </div>

            {/* Actions: View toggle & + New Item Button */}
            <div className="flex flex-wrap items-center gap-2.5">
              {/* Table / Grid Switcher */}
              <div className="flex items-center rounded-xl border border-slate-200 bg-slate-100 p-1">
                <button
                  type="button"
                  onClick={() => setViewStyle('table')}
                  title="Table View"
                  className={`flex size-8 items-center justify-center rounded-lg text-xs font-semibold transition-all ${
                    viewStyle === 'table'
                      ? 'bg-white text-blue-700 shadow-2xs'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  <List className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewStyle('grid')}
                  title="Visual Grid View"
                  className={`flex size-8 items-center justify-center rounded-lg text-xs font-semibold transition-all ${
                    viewStyle === 'grid'
                      ? 'bg-white text-blue-700 shadow-2xs'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  <LayoutGrid className="size-4" />
                </button>
              </div>

              {/* + New Item Button (Royal Sapphire Gradient) */}
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="flex h-9 items-center gap-1.5 rounded-xl bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 px-4 text-xs font-bold text-white shadow-md shadow-blue-600/30 transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-600/40 active:scale-95"
              >
                <Plus className="size-4" strokeWidth={2.5} />
                <span>New Item</span>
              </button>
            </div>
          </div>

          {/* Filters Bar: Status Tabs & Category Pills */}
          <div className="flex flex-col gap-3 border-t border-slate-100 pt-3 md:flex-row md:items-center md:justify-between">
            {/* Status Filter Tabs */}
            <div className="flex flex-wrap gap-1.5 text-xs font-semibold">
              {(['All', 'Active', 'Low Stock', 'Out of Stock'] as const).map((filter) => {
                const isSelected = selectedFilter === filter
                return (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setSelectedFilter(filter)}
                    className={`rounded-lg px-3 py-1.5 transition-all ${
                      isSelected
                        ? 'bg-slate-900 text-white shadow-xs font-bold'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {filter}
                  </button>
                )
              })}
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto text-xs pb-1 sm:pb-0">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Category:</span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-800 outline-none focus:border-blue-500 focus:bg-white"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* View Mode: Table or Showcase Grid */}
        {viewStyle === 'grid' ? (
          /* Visual Luxury Card Grid */
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((p) => {
              const isLow = p.status === 'Low stock'
              return (
                <div
                  key={p.id}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl"
                >
                  {/* Top Cover Product Image Banner */}
                  <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                    {p.image ? (
                      <img
                        src={p.image}
                        alt={p.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-108"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-slate-100 text-slate-400">
                        <Package className="size-12" />
                      </div>
                    )}

                    {/* Gradient Overlay for text legibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />

                    {/* Floating Status Pill over image */}
                    <div className="absolute top-3 right-3">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold shadow-md backdrop-blur-md ${
                          isLow
                            ? 'bg-red-600/95 text-white border border-red-400/40'
                            : 'bg-emerald-600/95 text-white border border-emerald-400/40'
                        }`}
                      >
                        <span
                          className={`size-1.5 rounded-full ${
                            isLow ? 'bg-white animate-pulse' : 'bg-white'
                          }`}
                        />
                        <span>{p.status}</span>
                      </span>
                    </div>

                    {/* Floating Category Pill */}
                    <div className="absolute bottom-3 left-3">
                      <span className="rounded-lg bg-black/60 px-2.5 py-1 text-[10.5px] font-semibold text-white backdrop-blur-md border border-white/20">
                        {p.category}
                      </span>
                    </div>

                    {/* Quick Camera Upload Button */}
                    <label
                      className="absolute bottom-3 right-3 flex size-8 cursor-pointer items-center justify-center rounded-lg bg-white/90 text-slate-700 shadow-md backdrop-blur-md hover:bg-white hover:text-blue-700 hover:scale-110 transition-all"
                      title="Upload or change image"
                    >
                      <Camera className="size-4" />
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleUpdateItemImage(p.id, e)}
                      />
                    </label>
                  </div>

                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* SKU */}
                      <span className="font-mono text-[10px] font-bold text-slate-400">
                        {p.sku}
                      </span>

                      {/* Product Name */}
                      <h3 className="mt-1 text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors line-clamp-1">
                        {p.name}
                      </h3>

                      {/* Boutique Location */}
                      <div className="mt-2.5 flex items-center gap-1.5 text-xs text-slate-600">
                        <MapPin className="size-3.5 text-blue-600" />
                        <span className="truncate">{p.warehouse.split('(')[0].trim()}</span>
                      </div>

                      {/* Stock Gauge */}
                      <div className="mt-3.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-500">Available Stock</span>
                          <span
                            className={`font-extrabold ${
                              isLow ? 'text-red-600' : 'text-slate-900'
                            }`}
                          >
                            {p.availableStock} pcs
                          </span>
                        </div>
                        <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                          <div
                            className={`h-full rounded-full ${
                              isLow ? 'bg-red-500' : 'bg-blue-600'
                            }`}
                            style={{
                              width: `${Math.min(100, (p.availableStock / 40) * 100)}%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>

                  {/* Bottom: Price & Details Link */}
                  <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-3">
                    <div>
                      <p className="text-[10px] uppercase font-bold text-slate-400">Retail</p>
                      <p className="text-base font-extrabold text-slate-900">
                        ${p.sellingPrice.toFixed(2)}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsModalOpen(true)}
                      className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-bold text-slate-700 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 transition-colors"
                    >
                      Stock Adjust
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        ) : (
          /* Luxury Data Table View */
          <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px] text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200/80 bg-slate-50/80 text-[10.5px] font-bold uppercase tracking-wider text-slate-500">
                    <th className="w-10 px-4 py-3.5">
                      <input type="checkbox" className="size-3.5 rounded border-slate-300" />
                    </th>
                    <th className="px-4 py-3.5">Collection Item</th>
                    <th className="px-4 py-3.5">Category</th>
                    <th className="px-4 py-3.5">Atelier Location</th>
                    <th className="px-4 py-3.5 text-right">In Hand</th>
                    <th className="px-4 py-3.5 text-right">Available</th>
                    <th className="px-4 py-3.5 text-right">Retail Price</th>
                    <th className="px-4 py-3.5 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredProducts.map((p) => {
                    const isLow = p.status === 'Low stock'
                    return (
                      <tr
                        key={p.id}
                        className="group transition-colors hover:bg-blue-50/40"
                      >
                        <td className="px-4 py-3.5">
                          <input type="checkbox" className="size-3.5 rounded border-slate-300" />
                        </td>

                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-3">
                            <div className="relative group/thumb shrink-0">
                              {p.image ? (
                                <img
                                  src={p.image}
                                  alt={p.name}
                                  className="size-11 rounded-xl object-cover border border-slate-200/90 shadow-2xs group-hover:border-blue-400 group-hover:scale-105 transition-all"
                                />
                              ) : (
                                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-blue-700 font-bold group-hover:border-blue-400 group-hover:bg-blue-50 transition-colors">
                                  <Package className="size-5" />
                                </div>
                              )}
                              {/* Hover camera upload button */}
                              <label
                                className="absolute -bottom-1 -right-1 flex size-5 cursor-pointer items-center justify-center rounded-full bg-blue-600 text-white opacity-0 shadow-sm group-hover/thumb:opacity-100 hover:scale-110 transition-all"
                                title="Change photo"
                              >
                                <Camera className="size-3" />
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) => handleUpdateItemImage(p.id, e)}
                                />
                              </label>
                            </div>
                            <div className="min-w-0">
                              <p className="font-bold text-slate-900 group-hover:text-blue-700 cursor-pointer truncate">
                                {p.name}
                              </p>
                              <p className="font-mono text-[10px] text-slate-400">{p.sku}</p>
                            </div>
                          </div>
                        </td>

                        <td className="px-4 py-3.5 font-medium text-slate-600">
                          {p.category}
                        </td>

                        <td className="px-4 py-3.5 text-slate-600">
                          <div className="flex items-center gap-1.5">
                            <MapPin className="size-3 text-slate-400" />
                            <span>{p.warehouse.split('(')[0].trim()}</span>
                          </div>
                        </td>

                        <td className="px-4 py-3.5 text-right font-medium text-slate-700">
                          {p.stockOnHand} pcs
                        </td>

                        <td className="px-4 py-3.5 text-right font-extrabold text-slate-900">
                          <span className={isLow ? 'text-red-600' : 'text-slate-900'}>
                            {p.availableStock} pcs
                          </span>
                        </td>

                        <td className="px-4 py-3.5 text-right font-extrabold text-slate-900">
                          ${p.sellingPrice.toFixed(2)}
                        </td>

                        <td className="px-4 py-3.5 text-center">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10.5px] font-bold ${
                              isLow
                                ? 'bg-red-50 text-red-600 border border-red-200'
                                : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            }`}
                          >
                            <span
                              className={`size-1.5 rounded-full ${
                                isLow ? 'bg-red-500 animate-pulse' : 'bg-emerald-500'
                              }`}
                            />
                            <span>{p.status}</span>
                          </span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Modal: Add New Item Redesigned with Brand Colors */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs animate-in fade-in">
            <div className="w-full max-w-xl max-h-[92vh] overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-2xl animate-in zoom-in-95">
              {/* Modal Header with Elufidiya Brand Gradient */}
              <div className="sticky top-0 z-10 flex items-center justify-between border-b border-blue-900/20 bg-gradient-to-r from-[#0c1836] via-[#102450] to-[#0a1329] px-6 py-4 text-white">
                <div className="flex items-center gap-2.5">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-white/10 text-amber-300">
                    <Sparkles className="size-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold">New Atelier Collection Item</h3>
                    <p className="text-[10.5px] text-blue-200">Catalog into Elufidiya Maison Inventory</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-lg p-1.5 text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
                >
                  <X className="size-4" />
                </button>
              </div>

              <form onSubmit={handleCreateProduct} className="p-6 space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-700">Piece Title *</label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Sovereign Tassel Loafer in Burnished Cognac"
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-xs text-slate-900 outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/15 transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700">SKU Code *</label>
                    <input
                      required
                      value={form.sku}
                      onChange={(e) => setForm({ ...form, sku: e.target.value })}
                      placeholder="ELF-LOF-099"
                      className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-xs font-mono font-bold text-slate-900 outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/15 transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700">Category</label>
                    <select
                      value={form.category}
                      onChange={(e) =>
                        setForm({ ...form, category: e.target.value as ProductItem['category'] })
                      }
                      className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs font-semibold text-slate-800 outline-none focus:border-blue-500 focus:bg-white"
                    >
                      <option value="Signature Loafers">Signature Loafers</option>
                      <option value="Dress Shoes & Boots">Dress Shoes & Boots</option>
                      <option value="Travel Sport Suits">Travel Sport Suits</option>
                      <option value="Leather Travel Gear">Leather Travel Gear</option>
                      <option value="Private Reserve Wine">Private Reserve Wine</option>
                    </select>
                  </div>
                </div>

                {/* Product Image / Goods Photo Upload Section */}
                <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                        <Camera className="size-3.5 text-blue-600" />
                        <span>Item / Goods Picture</span>
                      </label>
                      <p className="text-[10px] text-slate-500">
                        Upload piece photo to identify each item visually across the platform
                      </p>
                    </div>

                    <div className="flex items-center rounded-lg border border-slate-200 bg-white p-0.5 text-[10.5px]">
                      <button
                        type="button"
                        onClick={() => setImageInputMode('upload')}
                        className={`rounded-md px-2.5 py-1 font-bold transition-all ${
                          imageInputMode === 'upload'
                            ? 'bg-blue-600 text-white shadow-xs'
                            : 'text-slate-500 hover:text-slate-900'
                        }`}
                      >
                        Upload Photo
                      </button>
                      <button
                        type="button"
                        onClick={() => setImageInputMode('url')}
                        className={`rounded-md px-2.5 py-1 font-bold transition-all ${
                          imageInputMode === 'url'
                            ? 'bg-blue-600 text-white shadow-xs'
                            : 'text-slate-500 hover:text-slate-900'
                        }`}
                      >
                        Web Link
                      </button>
                    </div>
                  </div>

                  {form.image ? (
                    /* Active Image Preview Box */
                    <div className="relative flex items-center gap-3.5 rounded-xl border border-blue-200 bg-blue-50/60 p-3">
                      <img
                        src={form.image}
                        alt="Preview"
                        className="size-16 rounded-xl object-cover border border-blue-300 shadow-sm shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-blue-900">
                          <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                          <span>Goods Picture Attached</span>
                        </div>
                        <p className="mt-0.5 text-[10.5px] text-slate-500 truncate">
                          Will show in collections catalog, showroom grid, and reorder alerts
                        </p>
                        <div className="mt-2 flex items-center gap-3">
                          <label className="cursor-pointer inline-flex items-center gap-1 text-[11px] font-bold text-blue-700 hover:text-blue-800 hover:underline">
                            <Upload className="size-3" />
                            <span>Replace Picture</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const f = e.target.files?.[0]
                                if (f) handleFileUpload(f)
                              }}
                            />
                          </label>
                          <span className="text-slate-300">|</span>
                          <button
                            type="button"
                            onClick={() => setForm({ ...form, image: '' })}
                            className="inline-flex items-center gap-1 text-[11px] font-bold text-red-600 hover:text-red-700 hover:underline"
                          >
                            <Trash2 className="size-3" />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : imageInputMode === 'upload' ? (
                    /* Drag & Drop / File Upload Zone */
                    <div
                      onDragOver={(e) => {
                        e.preventDefault()
                        setIsDragging(true)
                      }}
                      onDragLeave={() => setIsDragging(false)}
                      onDrop={(e) => {
                        e.preventDefault()
                        setIsDragging(false)
                        const f = e.dataTransfer.files?.[0]
                        if (f) handleFileUpload(f)
                      }}
                      className={`relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-5 text-center transition-all ${
                        isDragging
                          ? 'border-blue-600 bg-blue-50/90 scale-[1.01]'
                          : 'border-slate-300 bg-white hover:border-blue-400 hover:bg-slate-50/50'
                      }`}
                    >
                      <input
                        type="file"
                        accept="image/*"
                        id="new-item-image-input"
                        className="hidden"
                        onChange={(e) => {
                          const f = e.target.files?.[0]
                          if (f) handleFileUpload(f)
                        }}
                      />
                      <div className="flex size-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 mb-2 shadow-2xs">
                        <Camera className="size-5" />
                      </div>
                      <label
                        htmlFor="new-item-image-input"
                        className="cursor-pointer text-xs font-bold text-blue-700 hover:underline"
                      >
                        Upload Goods Picture
                        <span className="font-normal text-slate-500"> or drag and drop</span>
                      </label>
                      <p className="mt-1 text-[10.5px] text-slate-400">
                        Select a photo from your computer or phone (PNG, JPG, WEBP)
                      </p>
                    </div>
                  ) : (
                    /* Direct URL Input */
                    <div>
                      <input
                        type="url"
                        value={form.image}
                        onChange={(e) => setForm({ ...form, image: e.target.value })}
                        placeholder="https://images.unsplash.com/... or paste image web link"
                        className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/15"
                      />
                    </div>
                  )}

                  {/* Sample Luxury Presets */}
                  <div className="pt-1">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Or select from Maison luxury photo samples:
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                      {SAMPLE_PRESETS.map((preset) => (
                        <button
                          key={preset.name}
                          type="button"
                          onClick={() => setForm({ ...form, image: preset.url })}
                          className={`group/preset flex flex-col items-center rounded-xl border p-1.5 transition-all text-center ${
                            form.image === preset.url
                              ? 'border-blue-500 bg-blue-50/80 ring-2 ring-blue-500/30'
                              : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                          }`}
                        >
                          <img
                            src={preset.url}
                            alt={preset.name}
                            className="size-10 rounded-lg object-cover mb-1 group-hover/preset:scale-105 transition-transform"
                          />
                          <span className="text-[9.5px] font-semibold text-slate-700 truncate w-full">
                            {preset.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700">Stock Qty</label>
                    <input
                      type="number"
                      value={form.stockOnHand}
                      onChange={(e) => setForm({ ...form, stockOnHand: Number(e.target.value) })}
                      className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs font-bold outline-none focus:border-blue-500 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700">Atelier Cost ($)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={form.costPrice}
                      onChange={(e) => setForm({ ...form, costPrice: Number(e.target.value) })}
                      className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs font-bold outline-none focus:border-blue-500 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700">Retail ($)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={form.sellingPrice}
                      onChange={(e) => setForm({ ...form, sellingPrice: Number(e.target.value) })}
                      className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs font-bold outline-none focus:border-blue-500 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700">Primary Boutique Allocation</label>
                  <select
                    value={form.warehouse}
                    onChange={(e) => setForm({ ...form, warehouse: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs font-semibold text-slate-800 outline-none focus:border-blue-500 focus:bg-white"
                  >
                    <option value="D'GTC Flagship Boutique (Nairobi)">D&apos;GTC Flagship Boutique (Nairobi)</option>
                    <option value="Villa Rosa Kempinski Boutique">Villa Rosa Kempinski Boutique</option>
                    <option value="Lagos Atelier Hub (Victoria Island)">Lagos Atelier Hub (Victoria Island)</option>
                  </select>
                </div>

                <div className="flex justify-end gap-2.5 border-t border-slate-100 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 px-5 py-2 text-xs font-bold text-white shadow-md shadow-blue-600/30 hover:scale-[1.02] active:scale-95 transition-all"
                  >
                    Save &amp; Catalog
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardShell>
  )
}
