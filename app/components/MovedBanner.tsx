'use client'
import { useState, useEffect } from 'react'
import { X, MapPin } from 'lucide-react'

export default function MovedBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const dismissed = localStorage.getItem('moved-banner-dismissed')
    if (!dismissed) setVisible(true)
  }, [])

  function dismiss() {
    localStorage.setItem('moved-banner-dismissed', 'true')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="bg-amber-500 text-black w-full">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm font-medium">
          <MapPin className="w-4 h-4 flex-shrink-0" />
          <span>
            <strong>We&apos;ve moved!</strong> Our new address is Unit 2, Quicks Units, Buttlands Industrial Estate, Totnes Road, Ipplepen, TQ12 5UE
          </span>
        </div>
        <button
          onClick={dismiss}
          aria-label="Dismiss"
          className="flex-shrink-0 hover:opacity-70 transition-opacity"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
