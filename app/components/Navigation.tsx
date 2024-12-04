'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'

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
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">
            <span className="text-tevy-teal">TEVY</span>
            <span className="text-white">SERVICES</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            {/* Services Dropdown */}
            <div className="relative group">
              <button 
                className="flex items-center gap-1 text-white hover:text-tevy-teal text-lg font-semibold tracking-wide transition-colors drop-shadow-[0_2px_4px_rgba(0,0,0,1)] hover:scale-105"
                onClick={() => setServicesOpen(!servicesOpen)}
              >
                Services
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {/* Dropdown Menu */}
              <div className="absolute top-full left-0 mt-2 w-64 bg-black/90 backdrop-blur-sm border border-tevy-teal/20 rounded-lg overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <Link 
                  href="/services/diamond-cut"
                  className="block px-4 py-3 text-white hover:bg-tevy-teal/20 transition-colors"
                >
                  Diamond Cut Refurbishment
                </Link>
                <Link 
                  href="/services/painted-alloys"
                  className="block px-4 py-3 text-white hover:bg-tevy-teal/20 transition-colors"
                >
                  Painted Alloys & Colour Changes
                </Link>
                <Link 
                  href="/services/tyre-replacment"
                  className="block px-4 py-3 text-white hover:bg-tevy-teal/20 transition-colors"
                >
                  Tyre Replacement
                </Link>
                <Link 
                  href="/services/tyre-repair"
                  className="block px-4 py-3 text-white hover:bg-tevy-teal/20 transition-colors"
                >
                  Tyre Repair
                </Link>
                <Link 
                  href="/services/tpms"
                  className="block px-4 py-3 text-white hover:bg-tevy-teal/20 transition-colors"
                >
                  TPMS Service
                </Link>
              </div>
            </div>

            <Link 
              href="#contact" 
              className="text-white hover:text-tevy-teal text-lg font-semibold tracking-wide transition-colors drop-shadow-[0_2px_4px_rgba(0,0,0,1)] hover:scale-105"
            >
              Contact
            </Link>
            <button className="bg-tevy-teal hover:bg-tevy-gray text-white px-6 py-2 rounded-full transition-all transform hover:scale-105 font-semibold text-lg shadow-[0_4px_8px_rgba(0,0,0,0.3)]">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation