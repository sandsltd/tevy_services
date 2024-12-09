'use client'
import { useState } from 'react'
import Image from 'next/image'
import { MoveHorizontal, Camera } from 'lucide-react'

interface BeforeAfterSliderProps {
  before: string
  after: string
  title?: string
  description?: string
  damage?: string
  showLabels?: boolean
}

export default function BeforeAfterSlider({ 
  before, 
  after, 
  title, 
  description, 
  damage,
  showLabels = true 
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return
    
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect()
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left
    const pos = Math.min(Math.max((x / rect.width) * 100, 0), 100)
    setPosition(pos)
  }

  return (
    <div className="bg-black/20 rounded-xl border border-[#3E797F]/20 overflow-hidden group">
      <div className="relative aspect-square">
        <div 
          className="relative h-full w-full cursor-ew-resize select-none"
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          onMouseMove={handleMove}
          onTouchStart={() => setIsDragging(true)}
          onTouchEnd={() => setIsDragging(false)}
          onTouchMove={handleMove}
        >
          <div className="absolute inset-0 select-none">
            <Image
              src={after}
              alt="After restoration"
              fill
              className="object-cover select-none"
              draggable="false"
            />
          </div>
          <div 
            className="absolute inset-0 overflow-hidden select-none"
            style={{ width: `${position}%` }}
          >
            <Image
              src={before}
              alt="Before restoration"
              fill
              className="object-cover select-none"
              draggable="false"
            />
          </div>
          <div 
            className="absolute top-0 bottom-0 w-1 bg-[#3E797F] cursor-ew-resize select-none"
            style={{ left: `${position}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#3E797F] border-2 border-white flex items-center justify-center select-none">
              <MoveHorizontal className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>

        {showLabels && (
          <>
            {/* Title and Description Overlay */}
            {(title || description) && (
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                {title && <h3 className="text-xl font-bold mb-2">{title}</h3>}
                {description && <p className="text-gray-300 text-sm">{description}</p>}
              </div>
            )}

            {/* Before & After Label */}
            <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-sm flex items-center gap-2">
              <Camera className="w-4 h-4" />
              <span>Before & After</span>
            </div>

            {/* Damage Label */}
            {damage && (
              <div className="absolute top-4 right-4 bg-[#3E797F]/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                {damage}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
} 