'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  ChevronDown, 
  Phone,
  Diamond,
  Paintbrush,
  CircleDot,
  Wrench,
  AlertTriangle,
} from 'lucide-react'

interface NavigationProps {
  className?: string;
}

const Navigation = ({ className }: NavigationProps) => {
  const [scrolled, setScrolled] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    
    handleScroll()
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 bg-black/80 backdrop-blur-sm ${
      scrolled ? 'py-4' : 'py-6'
    } ${className}`}>
      <style jsx global>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        @keyframes slideRight {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(4px); }
        }
        .icon-bounce {
          animation: bounce 2s ease-in-out infinite;
        }
        .icon-slide {
          animation: slideRight 1s ease-in-out infinite;
        }
        .group:hover .icon-bounce {
          animation: bounce 1s ease-in-out infinite;
        }
        .group:hover .icon-slide {
          animation: slideRight 1s ease-in-out infinite;
        }
      `}</style>

      <div className="container mx-auto px-6">
        <div className="flex items-center">
          {/* Left Section */}
          <div className="flex items-center w-1/3">
            <Link href="/" className="text-2xl font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">
              <span className="text-[#3E797F]">TEVY</span>
              <span className="text-white">SERVICES</span>
            </Link>
          </div>

          {/* Center Section - Phone Number */}
          <div className="flex justify-center w-1/3">
            <a 
              href="tel:07572634898"
              className="flex items-center gap-2 text-[#3E797F] hover:text-white text-xl font-bold tracking-wide transition-colors drop-shadow-[0_2px_4px_rgba(0,0,0,1)] hover:scale-105 bg-black/40 px-4 py-2 rounded-full border border-[#3E797F]/30"
            >
              <Phone className="w-5 h-5" />
              <span>07572 634898</span>
            </a>
          </div>

          {/* Right Section */}
          <div className="flex items-center justify-end w-1/3 space-x-8">
            {/* Services Dropdown */}
            <div className="relative group">
              <button 
                className="flex items-center gap-1 text-white hover:text-tevy-teal text-lg font-semibold tracking-wide transition-colors drop-shadow-[0_2px_4px_rgba(0,0,0,1)] hover:scale-105"
                onClick={() => setServicesOpen(!servicesOpen)}
              >
                Services
                <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
              </button>
              
              {/* Dropdown Menu */}
              <div className="absolute top-full right-0 mt-2 w-80 bg-black/95 backdrop-blur-sm border border-tevy-teal/20 rounded-xl overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 shadow-xl">
                <div className="p-2 space-y-1">
                  <Link 
                    href="/services/diamond-cut"
                    className="flex items-center gap-3 px-4 py-3 text-white hover:bg-[#3E797F]/20 rounded-lg transition-all group/item"
                  >
                    <div className="p-2 bg-[#3E797F]/10 rounded-lg group-hover/item:bg-[#3E797F]/20 transition-colors">
                      <Diamond className="w-5 h-5 text-[#3E797F]" />
                    </div>
                    <div>
                      <div className="font-semibold">Diamond Cut Refurbishment</div>
                      <div className="text-sm text-gray-400">Precision CNC machining</div>
                    </div>
                  </Link>
                  
                  <Link 
                    href="/services/painted-alloys"
                    className="flex items-center gap-3 px-4 py-3 text-white hover:bg-[#3E797F]/20 rounded-lg transition-all group/item"
                  >
                    <div className="p-2 bg-[#3E797F]/10 rounded-lg group-hover/item:bg-[#3E797F]/20 transition-colors">
                      <Paintbrush className="w-5 h-5 text-[#3E797F]" />
                    </div>
                    <div>
                      <div className="font-semibold">Painted Alloys</div>
                      <div className="text-sm text-gray-400">Custom color changes</div>
                    </div>
                  </Link>
                  
                  <Link 
                    href="/services/tyre-replacment"
                    className="flex items-center gap-3 px-4 py-3 text-white hover:bg-[#3E797F]/20 rounded-lg transition-all group/item"
                  >
                    <div className="p-2 bg-[#3E797F]/10 rounded-lg group-hover/item:bg-[#3E797F]/20 transition-colors">
                      <CircleDot className="w-5 h-5 text-[#3E797F]" />
                    </div>
                    <div>
                      <div className="font-semibold">Tyre Replacement</div>
                      <div className="text-sm text-gray-400">Mobile fitting service</div>
                    </div>
                  </Link>
                  
                  <Link 
                    href="/services/tyre-repair"
                    className="flex items-center gap-3 px-4 py-3 text-white hover:bg-[#3E797F]/20 rounded-lg transition-all group/item"
                  >
                    <div className="p-2 bg-[#3E797F]/10 rounded-lg group-hover/item:bg-[#3E797F]/20 transition-colors">
                      <Wrench className="w-5 h-5 text-[#3E797F]" />
                    </div>
                    <div>
                      <div className="font-semibold">Tyre Repair</div>
                      <div className="text-sm text-gray-400">Fast puncture fixes</div>
                    </div>
                  </Link>
                  
                  <Link 
                    href="/services/tpms"
                    className="flex items-center gap-3 px-4 py-3 text-white hover:bg-[#3E797F]/20 rounded-lg transition-all group/item"
                  >
                    <div className="p-2 bg-[#3E797F]/10 rounded-lg group-hover/item:bg-[#3E797F]/20 transition-colors">
                      <AlertTriangle className="w-5 h-5 text-[#3E797F]" />
                    </div>
                    <div>
                      <div className="font-semibold">TPMS Service</div>
                      <div className="text-sm text-gray-400">Sensor diagnostics</div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            {/* Free Quote Button */}
            <Link 
              href="/services/diamond-cut#coverage"
              className="group bg-tevy-teal hover:bg-tevy-gray text-white px-6 py-2 rounded-full transition-all transform hover:scale-105 font-semibold text-lg shadow-[0_4px_8px_rgba(0,0,0,0.3)] flex items-center gap-2"
            >
              <span>Free Quote</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation