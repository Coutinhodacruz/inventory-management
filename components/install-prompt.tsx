'use client'

import { useEffect, useState } from 'react'
import { X, Download } from 'lucide-react'
import { usePathname } from 'next/navigation'

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [showPrompt, setShowPrompt] = useState(false)
  const [isIOS, setIsIOS] = useState(false)
  const [isStandalone, setIsStandalone] = useState(false)
  const pathname = usePathname()

  // Show prompt when user navigates, as long as prompt is ready
  useEffect(() => {
    if (deferredPrompt && !isIOS) {
      setShowPrompt(true)
    }
  }, [pathname, deferredPrompt, isIOS])

  useEffect(() => {
    // 1. Check if already installed / running in standalone mode
    if (
      typeof window !== 'undefined' &&
      (window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as any).standalone)
    ) {
      setIsStandalone(true)
      return
    }

    if (typeof window === 'undefined') return

    const userAgent = window.navigator.userAgent.toLowerCase()

    // 2. Check if mobile device
    const isMobileDevice =
      /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobi/i.test(
        userAgent
      )

    if (!isMobileDevice) {
      return
    }

    // 3. Check if iOS device
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent)
    setIsIOS(isIosDevice)

    if (isIosDevice) {
      // iOS doesn't support beforeinstallprompt; show instruction prompt after 3s
      const timer = setTimeout(() => setShowPrompt(true), 3000)
      return () => clearTimeout(timer)
    } else {
      const handler = (e: Event) => {
        // Prevent default mini-infobar
        e.preventDefault()
        // Stash event to trigger on click
        setDeferredPrompt(e)
        setShowPrompt(true)
      }

      window.addEventListener('beforeinstallprompt', handler)

      return () => {
        window.removeEventListener('beforeinstallprompt', handler)
      }
    }
  }, [])

  const handleInstallClick = async () => {
    if (isIOS) {
      setShowPrompt(false)
      return
    }

    if (!deferredPrompt) {
      setShowPrompt(false)
      return
    }

    // Trigger native browser install prompt
    deferredPrompt.prompt()

    const { outcome } = await deferredPrompt.userChoice

    if (outcome === 'accepted') {
      setShowPrompt(false)
    }

    setDeferredPrompt(null)
  }

  const handleDismiss = () => {
    setShowPrompt(false)
  }

  if (!showPrompt || isStandalone) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:w-96 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-[#C5A059]/40 bg-[#0F1E36]/5">
            <Download className="h-5 w-5 text-[#0F1E36]" />
          </div>
          <div>
            <h3 className="text-sm font-bold tracking-tight text-slate-900">
              Install Elufidiya
            </h3>
            <p className="mt-0.5 line-clamp-2 pr-2 text-xs text-slate-500">
              {isIOS
                ? "Tap Share below, then 'Add to Home Screen' for the best experience."
                : 'Add to your home screen for quick access and offline inventory management.'}
            </p>
          </div>
        </div>
        <div className="ml-1 flex shrink-0 items-center gap-2">
          {!isIOS && (
            <button
              onClick={handleInstallClick}
              className="rounded-full bg-gradient-to-r from-[#0F1E36] to-[#8A1538] px-4 py-2 text-[13px] font-bold text-white shadow-sm transition-all active:scale-95 hover:opacity-95"
            >
              Install
            </button>
          )}
          <button
            onClick={handleDismiss}
            className="-mr-2 rounded-full bg-slate-50 p-2 text-slate-400 transition-colors active:scale-95 hover:bg-slate-100 hover:text-slate-700"
            aria-label="Dismiss"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
