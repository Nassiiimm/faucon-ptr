import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Faucon PTR — Aménagement de vans et fourgons haut de gamme',
  description:
    'Faucon PTR conçoit et réalise des aménagements de vans et fourgons haut de gamme au Québec. Isolation 4 saisons, systèmes solaires, autonomie complète.',
  keywords: [
    'aménagement van',
    'conversion van',
    'van aménagé Québec',
    'fourgon aménagé',
    'van life',
    'Sprinter aménagé',
    'Transit aménagé',
    'ProMaster aménagé',
    'campervan Québec',
    'Faucon PTR',
  ],
  openGraph: {
    title: 'Faucon PTR — Aménagement de vans et fourgons',
    description:
      'Vans aménagés haut de gamme, conçus et fabriqués au Québec. Isolation 4 saisons, solaire, autonomie complète.',
    url: 'https://faucon-ptr.com',
    siteName: 'Faucon PTR',
    locale: 'fr_CA',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
