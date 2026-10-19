import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { PwaProvider } from '@/components/pwa-provider'
import { InstallPrompt } from '@/components/install-prompt'
import './globals.css'

export const metadata: Metadata = {
  title: 'Elufidiya 1975 | Luxury Maison Inventory & Boutique Management',
  description:
    'Inventory & boutique operations for Elufidiya 1975 — handmade leather shoes, loafers, boots, travel sport suits, and lifestyle collections across Nairobi, Lagos, and worldwide.',
  generator: 'Elufidiya Maison OS',
  applicationName: 'Elufidiya 1975',
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Elufidiya',
  },
  icons: {
    icon: [
      { url: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/icons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
}

export const viewport: Viewport = {
  themeColor: '#0F1E36',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <PwaProvider>
          {children}
          <InstallPrompt />
        </PwaProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
