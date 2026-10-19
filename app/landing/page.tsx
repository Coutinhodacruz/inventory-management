'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  BarChart2,
  Box,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Globe,
  Layers,
  Package,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  Star,
  Truck,
  Warehouse,
  Wine,
} from 'lucide-react'

export default function ElufidiyaLandingPage() {
  const [currency, setCurrency] = useState<'USD' | 'NGN'>('USD')

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 selection:bg-[#8A1538] selection:text-white">
      {/* Top Banner notification */}
      <div className="bg-[#0F1E36] px-4 py-2 text-center text-xs font-medium text-slate-200">
        <span>Maison Elufidiya 1975 • Luxury Inventory & Vault Architecture for Ateliers & Boutiques. </span>
        <Link href="/" className="font-bold text-[#C5A059] underline hover:text-white ml-1">
          Launch Dashboard &rarr;
        </Link>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 sm:h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo & Brand identity */}
          <div className="flex items-center gap-4 sm:gap-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#0F1E36] to-[#8A1538] p-1.5 shadow-xs">
                <Image
                  src="/elufidiya-logo.png"
                  alt="Elufidiya 1975"
                  width={28}
                  height={28}
                  className="size-full object-contain brightness-0 invert"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-base sm:text-lg font-bold tracking-wider text-[#0F1E36] uppercase">
                  Elufidiya
                </span>
                <span className="text-[9px] tracking-[0.2em] font-medium text-[#C5A059] uppercase -mt-1">
                  Maison 1975
                </span>
              </div>
            </Link>

            {/* Nav links */}
            <nav className="hidden items-center gap-6 text-[13px] font-medium text-slate-600 lg:flex">
              <a href="#features" className="hover:text-[#8A1538]">Atelier Solutions</a>
              <a href="#solutions" className="hover:text-[#8A1538]">Vault Architecture</a>
              <a href="#pricing" className="hover:text-[#8A1538]">Subscriptions</a>
              <a href="#testimonials" className="hover:text-[#8A1538]">Maisons</a>
            </nav>
          </div>

          {/* Right Header CTAs */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-xs font-semibold text-slate-700 hover:text-[#0F1E36] sm:text-sm"
            >
              Sign In
            </Link>

            <Link
              href="/"
              className="rounded-xl bg-gradient-to-r from-[#0F1E36] to-[#8A1538] px-3.5 sm:px-4 py-2 text-xs font-semibold text-white shadow-sm hover:opacity-95 active:scale-[0.98]"
            >
              Launch Dashboard
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white py-12 sm:py-20 lg:py-24 border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            {/* Left Hero Description */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#C5A059]/30 bg-[#C5A059]/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#8A1538]">
                <Sparkles className="size-3.5 text-[#C5A059]" />
                <span>Haute Horology, Fine Leathers & Bespoke Goods</span>
              </div>

              <h1 className="mt-4 font-serif text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0F1E36] sm:leading-[1.15]">
                Luxury inventory architecture for prestigious <span className="text-[#8A1538]">Maisons & Boutiques</span>
              </h1>

              <p className="mt-4 sm:mt-5 max-w-xl text-sm sm:text-base text-slate-600 sm:leading-relaxed">
                Supervise artisan leather oxfords, bespoke travel suits, and reserve Grand Cru vintages across Paris, Nairobi, and Lagos boutiques with real-time FIFO valuation and insured VIP freight tracking.
              </p>

              {/* Action Form */}
              <div className="mt-6 sm:mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href="/"
                  className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0F1E36] to-[#8A1538] px-6 py-3.5 text-xs sm:text-sm font-semibold tracking-wide text-white shadow-md hover:opacity-95 active:scale-[0.98]"
                >
                  <span>Enter Maison Dashboard</span>
                  <ArrowRight className="size-4" />
                </Link>

                <Link
                  href="/items"
                  className="flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-xs sm:text-sm font-semibold tracking-wide text-slate-700 shadow-xs hover:bg-slate-50"
                >
                  Explore Goods Catalog
                </Link>
              </div>

              <p className="mt-4 text-[11px] text-slate-500">
                ✓ Multi-Boutique Vault Sync &nbsp;•&nbsp; ✓ Pre-loaded with Elufidiya Maison Collection &nbsp;•&nbsp; ✓ FIFO Asset Valuation
              </p>
            </div>

            {/* Right Hero Graphic with Mockup Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="text-sm font-bold text-[#0F1E36]">Elufidiya Flagship Boutique</h3>
                    <p className="text-[11px] text-slate-500">Paris, Nairobi & Lagos Atelier Hubs</p>
                  </div>
                  <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-700 border border-emerald-200">
                    Live Sync
                  </span>
                </div>

                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3">
                    <span className="text-xs font-semibold text-slate-700">Sovereign Tassel Loafer</span>
                    <span className="text-xs font-bold text-[#0F1E36]">$380.00 • 22 in stock</span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3">
                    <span className="text-xs font-semibold text-slate-700">Presidential Travel Suit</span>
                    <span className="text-xs font-bold text-[#0F1E36]">$890.00 • 15 in stock</span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3">
                    <span className="text-xs font-semibold text-slate-700">1975 Grand Reserve Wine</span>
                    <span className="text-xs font-bold text-[#0F1E36]">$310.00 • 32 in stock</span>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 border-t border-slate-100 pt-3">
                  <div className="rounded-xl bg-amber-50/50 border border-amber-100 p-2.5">
                    <p className="text-[10px] text-slate-500">Asset Valuation</p>
                    <p className="text-xs font-bold text-[#0F1E36]">$134,840.00</p>
                  </div>
                  <div className="rounded-xl bg-emerald-50/50 border border-emerald-100 p-2.5">
                    <p className="text-[10px] text-slate-500">VIP Order Dispatch</p>
                    <p className="text-xs font-bold text-emerald-700">FedEx Priority</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Boutiques & Ateliers Presence */}
      <section className="border-b border-slate-200 bg-white py-10 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-xs font-bold tracking-widest text-[#8A1538] uppercase">
            Powering Prestigious Boutiques & Ateliers Globally
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-slate-400 sm:gap-10">
            <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-slate-600">Flagship Boutique (Nairobi)</span>
            <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-slate-600">Villa Rosa Kempinski Suite</span>
            <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-slate-600">Lagos Atelier (Victoria Island)</span>
            <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-slate-600">Tuscan Leather Guild</span>
            <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-slate-600">Biella Wool Consortium</span>
          </div>
        </div>
      </section>

      {/* Feature Pillars */}
      <section id="features" className="py-16 sm:py-20 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-xs font-bold tracking-widest text-[#8A1538] uppercase">End-to-End Orchestration</span>
            <h2 className="mt-2 font-serif text-2xl sm:text-4xl font-extrabold text-[#0F1E36]">
              Engineered for Haute Luxury Operations
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-xs sm:text-sm text-slate-600">
              From raw Tuscan calfskin ingestion to multi-boutique vault distribution and VIP concierge delivery.
            </p>
          </div>

          <div className="mt-10 sm:mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs transition-transform hover:-translate-y-1 hover:shadow-md">
              <div className="flex size-12 items-center justify-center rounded-xl bg-[#0F1E36]/10 text-[#0F1E36]">
                <Box className="size-6" />
              </div>
              <h3 className="mt-4 text-base font-bold text-[#0F1E36]">Multi-Store Synchrony</h3>
              <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                Connect your boutique POS terminals in Nairobi, concierge orders via VIP channels, and private atelier commissions in one synchronized system.
              </p>
              <Link href="/items" className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-[#8A1538] hover:underline">
                Explore Items & Goods &rarr;
              </Link>
            </div>

            {/* Feature 2 */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs transition-transform hover:-translate-y-1 hover:shadow-md">
              <div className="flex size-12 items-center justify-center rounded-xl bg-[#C5A059]/15 text-[#C5A059]">
                <Warehouse className="size-6" />
              </div>
              <h3 className="mt-4 text-base font-bold text-[#0F1E36]">Boutique & Hub Management</h3>
              <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                Track stock across multiple storage hubs: Flagship Boutique, Kempinski Suite, and Lagos Atelier. Seamlessly log inter-vault transfers and adjustments.
              </p>
              <Link href="/warehouses" className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-[#8A1538] hover:underline">
                Explore Vaults &rarr;
              </Link>
            </div>

            {/* Feature 3 */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs transition-transform hover:-translate-y-1 hover:shadow-md">
              <div className="flex size-12 items-center justify-center rounded-xl bg-[#8A1538]/10 text-[#8A1538]">
                <Truck className="size-6" />
              </div>
              <h3 className="mt-4 text-base font-bold text-[#0F1E36]">Insured Global Logistics</h3>
              <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                Generate packing slips, print luxury customs deeds, and retrieve live air freight tracking with premier carriers like DHL Express and FedEx International First.
              </p>
              <Link href="/shipments" className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-[#8A1538] hover:underline">
                Explore Shipments &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="border-t border-slate-200 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-xs font-bold tracking-widest text-[#8A1538] uppercase">Maison Memberships</span>
            <h2 className="mt-2 font-serif text-2xl sm:text-4xl font-extrabold text-[#0F1E36]">
              Transparent Inventory Subscriptions
            </h2>

            {/* Currency toggle */}
            <div className="mt-5 inline-flex rounded-xl border border-slate-200 bg-slate-100 p-1">
              <button
                type="button"
                onClick={() => setCurrency('USD')}
                className={`rounded-lg px-4 py-1.5 text-xs font-bold transition-all ${
                  currency === 'USD' ? 'bg-[#0F1E36] text-white shadow-xs' : 'text-slate-600'
                }`}
              >
                USD ($)
              </button>
              <button
                type="button"
                onClick={() => setCurrency('NGN')}
                className={`rounded-lg px-4 py-1.5 text-xs font-bold transition-all ${
                  currency === 'NGN' ? 'bg-[#0F1E36] text-white shadow-xs' : 'text-slate-600'
                }`}
              >
                NGN (₦)
              </button>
            </div>
          </div>

          <div className="mt-10 sm:mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Standard Plan */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
              <h3 className="text-base font-bold text-[#0F1E36]">Atelier Boutique</h3>
              <p className="mt-1 text-xs text-slate-500">For boutique stores and bespoke makers</p>
              <div className="mt-5 text-2xl sm:text-3xl font-extrabold text-[#0F1E36]">
                {currency === 'USD' ? '$59' : '₦95,000'}
                <span className="text-xs font-medium text-slate-400"> /month</span>
              </div>
              <ul className="mt-6 space-y-2.5 text-xs text-slate-600">
                <li className="flex items-center gap-2">✓ 1,500 Client Orders / month</li>
                <li className="flex items-center gap-2">✓ 2 Boutique Vaults</li>
                <li className="flex items-center gap-2">✓ Composite Goods & Bundles</li>
                <li className="flex items-center gap-2">✓ DHL & FedEx Live Air Freight</li>
              </ul>
              <Link
                href="/"
                className="mt-8 block rounded-xl border border-[#0F1E36] py-2.5 text-center text-xs font-semibold text-[#0F1E36] hover:bg-slate-50"
              >
                Choose Atelier
              </Link>
            </div>

            {/* Professional Plan (Popular) */}
            <div className="relative rounded-2xl border-2 border-[#8A1538] bg-white p-6 sm:p-8 shadow-lg">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-[#0F1E36] to-[#8A1538] px-3.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-xs">
                Most Popular
              </span>
              <h3 className="text-base font-bold text-[#0F1E36]">Maison Professional</h3>
              <p className="mt-1 text-xs text-slate-500">For multi-store luxury enterprises</p>
              <div className="mt-5 text-2xl sm:text-3xl font-extrabold text-[#8A1538]">
                {currency === 'USD' ? '$129' : '₦210,000'}
                <span className="text-xs font-medium text-slate-400"> /month</span>
              </div>
              <ul className="mt-6 space-y-2.5 text-xs text-slate-600">
                <li className="flex items-center gap-2">✓ 7,500 Client Orders / month</li>
                <li className="flex items-center gap-2">✓ 5 Boutique Vaults (Global)</li>
                <li className="flex items-center gap-2">✓ Serial & Batch FIFO Tracking</li>
                <li className="flex items-center gap-2">✓ Automated Reorder Points</li>
                <li className="flex items-center gap-2">✓ 24/7 VIP Concierge Support</li>
              </ul>
              <Link
                href="/"
                className="mt-8 block rounded-xl bg-gradient-to-r from-[#0F1E36] to-[#8A1538] py-2.5 text-center text-xs font-semibold text-white shadow-xs hover:opacity-95"
              >
                Select Maison Professional
              </Link>
            </div>

            {/* Enterprise Plan */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
              <h3 className="text-base font-bold text-[#0F1E36]">Haute Enterprise</h3>
              <p className="mt-1 text-xs text-slate-500">For international houses & global distribution</p>
              <div className="mt-5 text-2xl sm:text-3xl font-extrabold text-[#0F1E36]">
                {currency === 'USD' ? '$249' : '₦395,000'}
                <span className="text-xs font-medium text-slate-400"> /month</span>
              </div>
              <ul className="mt-6 space-y-2.5 text-xs text-slate-600">
                <li className="flex items-center gap-2">✓ Unlimited Client Orders</li>
                <li className="flex items-center gap-2">✓ Unlimited Boutique Vaults</li>
                <li className="flex items-center gap-2">✓ Dedicated Private Architect</li>
                <li className="flex items-center gap-2">✓ Custom VIP API Access</li>
              </ul>
              <Link
                href="/"
                className="mt-8 block rounded-xl border border-[#0F1E36] py-2.5 text-center text-xs font-semibold text-[#0F1E36] hover:bg-slate-50"
              >
                Contact Concierge
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Testimonial: Elufidiya Maison */}
      <section id="testimonials" className="bg-[#0F1E36] py-16 sm:py-20 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <div className="flex justify-center gap-1 text-[#C5A059]">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="size-5 fill-[#C5A059]" />
            ))}
          </div>
          <blockquote className="mt-6 font-serif text-lg sm:text-2xl font-medium sm:leading-relaxed text-slate-100">
            &ldquo;This platform provides Elufidiya 1975 with the exact operational discipline required by an authentic luxury maison. Whether tracking limited calfskin runs from Florence or coordinating VIP customer orders across Nairobi and Lagos, everything operates like clockwork.&rdquo;
          </blockquote>
          <div className="mt-6 flex items-center justify-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-white p-1">
              <Image
                src="/elufidiya-logo.png"
                alt="Elufidiya"
                width={32}
                height={32}
                className="size-full object-contain"
              />
            </div>
            <div className="text-left">
              <p className="text-sm font-bold text-white">Elufidiya</p>
              <p className="text-xs text-[#C5A059]">Founder & Creative Director, Elufidiya 1975 Maison</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Banner */}
      <section className="bg-gradient-to-r from-[#0F1E36] via-[#1a2d4d] to-[#8A1538] py-14 sm:py-16 text-white text-center">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="font-serif text-2xl sm:text-4xl font-extrabold tracking-tight">
            Ready to streamline your luxury inventory?
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-slate-200">
            Access your inventory items, warehouse vaults, and VIP sales orders seamlessly today.
          </p>
          <div className="mt-6 flex justify-center">
            <Link
              href="/"
              className="rounded-xl bg-white px-7 py-3 text-xs sm:text-sm font-bold tracking-wider text-[#0F1E36] shadow-lg hover:bg-slate-100 active:scale-[0.98]"
            >
              Launch Live Application
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-10 text-xs text-slate-500">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#0F1E36]">Elufidiya Maison 1975</span>
              <span>•</span>
              <span>Luxury Inventory Management Platform</span>
            </div>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              <Link href="/" className="hover:text-[#8A1538]">Boutique Dashboard</Link>
              <Link href="/items" className="hover:text-[#8A1538]">Goods Catalog</Link>
              <Link href="/warehouses" className="hover:text-[#8A1538]">Vaults</Link>
              <Link href="/sales-orders" className="hover:text-[#8A1538]">Sales Orders</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
