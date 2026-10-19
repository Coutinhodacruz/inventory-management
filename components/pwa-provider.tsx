'use client'

import { useEffect, useState } from 'react'
import { Download, RefreshCw, WifiOff, X } from 'lucide-react'

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[]
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed'
    platform: string
  }>
  prompt(): Promise<void>
}

export function PwaProvider({ children }: { children: React.ReactNode }) {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [isUpdateAvailable, setIsUpdateAvailable] = useState(false)
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(null)
  const [isOffline, setIsOffline] = useState(false)
  const [showInstallBanner, setShowInstallBanner] = useState(false)

  useEffect(() => {
    // 1. Service Worker Registration & Update Lifecycle
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      const registerServiceWorker = async () => {
        try {
          const registration = await navigator.serviceWorker.register('/sw.js', {
            scope: '/',
          })

          // Check if an updated worker is already waiting
          if (registration.waiting) {
            setWaitingWorker(registration.waiting)
            setIsUpdateAvailable(true)
          }

          // Listen for new workers being installed
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  setWaitingWorker(newWorker)
                  setIsUpdateAvailable(true)
                }
              })
            }
          })
        } catch (error) {
          console.warn('[PWA] Service Worker registration failed:', error)
        }
      }

      // Register when window is loaded for optimal initial page load performance
      if (document.readyState === 'complete') {
        registerServiceWorker()
      } else {
        window.addEventListener('load', registerServiceWorker)
      }

      // Reload page once the new service worker activates and claims the client
      let refreshing = false
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (!refreshing) {
          refreshing = true
          window.location.reload()
        }
      })
    }

    // 2. Installability Prompt Management
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      const promptEvent = e as BeforeInstallPromptEvent
      setDeferredPrompt(promptEvent)
      
      // Check if user dismissed previously in this session
      const dismissed = sessionStorage.getItem('elufidiya_pwa_dismissed')
      if (!dismissed) {
        setShowInstallBanner(true)
      }
    }

    const handleAppInstalled = () => {
      setDeferredPrompt(null)
      setShowInstallBanner(false)
      console.log('[PWA] Elufidiya Maison app was successfully installed.')
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)

    // 3. Online/Offline Network Status
    const handleOnline = () => setIsOffline(false)
    const handleOffline = () => setIsOffline(true)

    if (typeof navigator !== 'undefined') {
      setIsOffline(!navigator.onLine)
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  const handleApplyUpdate = () => {
    if (waitingWorker) {
      waitingWorker.postMessage({ type: 'SKIP_WAITING' })
    }
    setIsUpdateAvailable(false)
  }

  const handleInstallClick = async () => {
    if (!deferredPrompt) return
    try {
      await deferredPrompt.prompt()
      const choice = await deferredPrompt.userChoice
      if (choice.outcome === 'accepted') {
        setDeferredPrompt(null)
        setShowInstallBanner(false)
      }
    } catch (err) {
      console.warn('[PWA] Installation prompt error:', err)
    }
  }

  const handleDismissBanner = () => {
    setShowInstallBanner(false)
    sessionStorage.setItem('elufidiya_pwa_dismissed', 'true')
  }

  return (
    <>
      {children}

      {/* Offline Toast Notification */}
      {isOffline && (
        <div className="fixed bottom-4 left-4 z-50 flex items-center gap-2.5 rounded-xl border border-amber-300/40 bg-[#0F1E36] px-4 py-2.5 text-xs font-semibold text-white shadow-xl backdrop-blur-md animate-fade-in">
          <WifiOff className="size-4 text-[#C5A059]" />
          <span>Offline Mode — Cached data active. Live sync will resume automatically.</span>
        </div>
      )}

      {/* New Deployment / Update Available Toast */}
      {isUpdateAvailable && (
        <div className="fixed bottom-4 right-4 z-50 flex items-center gap-3 rounded-2xl border border-[#C5A059]/40 bg-[#0F1E36] p-4 text-xs font-medium text-white shadow-2xl backdrop-blur-md animate-fade-in">
          <div>
            <p className="font-bold text-[#C5A059]">Update Ready</p>
            <p className="text-slate-300">A new application version is available.</p>
          </div>
          <button
            type="button"
            onClick={handleApplyUpdate}
            className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#C5A059] to-[#b38e46] px-3.5 py-1.5 font-bold text-[#0F1E36] shadow-sm hover:opacity-95 active:scale-95 transition-all"
          >
            <RefreshCw className="size-3.5" />
            <span>Update Now</span>
          </button>
        </div>
      )}

      {/* Unobtrusive Install Prompt Banner */}
      {showInstallBanner && deferredPrompt && (
        <div className="fixed top-3 right-3 sm:right-6 z-50 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/95 px-4 py-2.5 shadow-lg backdrop-blur-md text-xs">
          <div className="flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-lg bg-[#0F1E36] text-[#C5A059] font-serif font-bold text-xs">
              E
            </span>
            <span className="font-medium text-slate-800 hidden sm:inline">
              Install Elufidiya Maison App
            </span>
            <span className="font-medium text-slate-800 sm:hidden">
              Install App
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleInstallClick}
              className="flex items-center gap-1 rounded-lg bg-[#0F1E36] px-3 py-1 text-[11px] font-bold text-white hover:bg-[#1E3A5F] active:scale-95 transition-all"
            >
              <Download className="size-3" />
              <span>Install</span>
            </button>
            <button
              type="button"
              onClick={handleDismissBanner}
              className="rounded-lg p-1 text-slate-400 hover:bg-slate-100"
              aria-label="Dismiss"
            >
              <X className="size-3.5" />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
