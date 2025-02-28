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
  Menu,
  X,
  BookOpen
} from 'lucide-react'

interface NavigationProps {
  className?: string;
}

const Navigation = ({ className }: NavigationProps) => {
  const [scrolled, setScrolled] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">
            <span className="text-[#3E797F]">TEVY</span>
            <span className="text-white">SERVICES</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Phone Number */}
            <a 
              href="tel:07572634898"
              className="flex items-center gap-2 text-[#3E797F] hover:text-white text-xl font-bold tracking-wide transition-colors drop-shadow-[0_2px_4px_rgba(0,0,0,1)] hover:scale-105 bg-black/40 px-4 py-2 rounded-full border border-[#3E797F]/30"
            >
              <Phone className="w-5 h-5" />
              <span>07572 634898</span>
            </a>

            {/* Services Dropdown */}
            <div className="relative group">
              <button 
                className="flex items-center gap-1 text-white hover:text-[#3E797F] text-lg font-semibold tracking-wide transition-colors drop-shadow-[0_2px_4px_rgba(0,0,0,1)] hover:scale-105"
                onClick={() => setServicesOpen(!servicesOpen)}
              >
                Services
                <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
              </button>
              
              {/* Desktop Dropdown Menu */}
              <div className="absolute top-full right-0 mt-2 w-80 bg-black border border-[#3E797F]/20 rounded-xl overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 shadow-xl">
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
                      <div className="text-sm text-gray-400">Fitting service</div>
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
                  
                  <Link 
                    href="/blog"
                    className="flex items-center gap-3 px-4 py-3 text-white hover:bg-[#3E797F]/20 rounded-lg transition-all group/item"
                  >
                    <div className="p-2 bg-[#3E797F]/10 rounded-lg group-hover/item:bg-[#3E797F]/20 transition-colors">
                      <BookOpen className="w-5 h-5 text-[#3E797F]" />
                    </div>
                    <div>
                      <div className="font-semibold">Blog</div>
                      <div className="text-sm text-gray-400">Latest insights & guides</div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            {/* Free Quote Button */}
            <Link 
              href="/services/diamond-cut#coverage"
              className="group bg-[#3E797F] hover:bg-[#3E797F]/80 text-white px-6 py-2 rounded-full transition-all transform hover:scale-105 font-semibold text-lg shadow-[0_4px_8px_rgba(0,0,0,0.3)] flex items-center gap-2"
            >
              <span>Free Quote</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 top-[72px] bg-black/95 backdrop-blur-sm">
            <div className="p-6 space-y-6 bg-black">
              {/* Mobile Phone Number */}
              <a 
                href="tel:07572634898"
                className="flex items-center justify-center gap-2 text-[#3E797F] text-xl font-bold bg-black/40 px-4 py-3 rounded-full border border-[#3E797F]/30 w-full"
              >
                <Phone className="w-5 h-5" />
                <span>07572 634898</span>
              </a>

              {/* Mobile Services List */}
              <div className="space-y-4">
                <h3 className="text-[#3E797F] font-semibold px-4">Services</h3>
                <Link 
                  href="/services/diamond-cut"
                  className="flex items-center gap-3 px-4 py-3 text-white hover:bg-[#3E797F]/20 rounded-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Diamond className="w-5 h-5 text-[#3E797F]" />
                  <span>Diamond Cut Refurbishment</span>
                </Link>
                
                <Link 
                  href="/services/painted-alloys"
                  className="flex items-center gap-3 px-4 py-3 text-white hover:bg-[#3E797F]/20 rounded-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Paintbrush className="w-5 h-5 text-[#3E797F]" />
                  <span>Painted Alloys</span>
                </Link>
                
                <Link 
                  href="/services/tyre-replacment"
                  className="flex items-center gap-3 px-4 py-3 text-white hover:bg-[#3E797F]/20 rounded-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <CircleDot className="w-5 h-5 text-[#3E797F]" />
                  <span>Tyre Replacement</span>
                </Link>
                
                <Link 
                  href="/services/tyre-repair"
                  className="flex items-center gap-3 px-4 py-3 text-white hover:bg-[#3E797F]/20 rounded-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Wrench className="w-5 h-5 text-[#3E797F]" />
                  <span>Tyre Repair</span>
                </Link>
                
                <Link 
                  href="/services/tpms"
                  className="flex items-center gap-3 px-4 py-3 text-white hover:bg-[#3E797F]/20 rounded-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <AlertTriangle className="w-5 h-5 text-[#3E797F]" />
                  <span>TPMS Service</span>
                </Link>
              </div>

              {/* Mobile Free Quote Button */}
              <Link 
                href="/services/diamond-cut#coverage"
                className="flex items-center justify-center gap-2 bg-[#3E797F] text-white px-6 py-3 rounded-full w-full font-semibold text-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>Get Free Quote</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navigation