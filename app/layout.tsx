import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin", "cyrillic"] })

export const metadata: Metadata = {
  title: "Калинонька - Дитячий садок",
  description: "Дитячий садок Калинонька - де навчання зустрічається з грою",
  icons: {
    icon: "/images/kalyna-icon.png",
    shortcut: "/images/kalyna-icon.png",
    apple: "/images/kalyna-icon.png",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="uk">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
