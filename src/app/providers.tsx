'use client'
import { ThemeProvider } from 'next-themes'
import { useState, useEffect } from 'react'

export default function Providers({ children }: { children: React.ReactNode }) {
  const [mount, setMount] = useState(false)

  useEffect(() => {
    setMount(true)
  }, [])

  if (!mount) {
    return <>{children}</>
  }

  return <ThemeProvider attribute="class">{children}</ThemeProvider>
}
