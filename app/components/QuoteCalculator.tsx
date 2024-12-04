'use client'
import { useState, useEffect } from 'react'
import { Calculator, Car, Wrench, ArrowRight, Info, Clock, Share2, Copy, HelpCircle, CheckCircle } from 'lucide-react'
import Tooltip from './Tooltip'
import { motion, AnimatePresence } from 'framer-motion'

type WheelSize = '17' | '18' | '19' | '20' | '21' | '22'
type WheelCount = '1' | '2' | '3' | '4'
type DamageLevel = 'light' | 'medium' | 'severe'
type ServiceSpeed = 'standard' | 'express'

interface QuoteState {
  wheelSize: WheelSize | null
  wheelCount: WheelCount | null
  damageLevel: DamageLevel | null
  serviceSpeed: ServiceSpeed | null
  location: 'workshop' | 'mobile' | null
  ceramicCoating: boolean
  customColor: boolean
  step: number
  showBreakdown: boolean
  showShareModal: boolean
  copiedToClipboard: boolean
  comparisonQuote: QuoteState | null
}

const BASE_PRICES = {
  '17': 110,
  '18': 120,
  '19': 130,
  '20': 140,
  '21': 150,
  '22': 160,
}

const DAMAGE_MULTIPLIERS = {
  'light': 1,
  'medium': 1.2,
  'severe': 1.5,
}

const generateShareUrl = (quote: QuoteState) => {
  const params = new URLSearchParams({
    size: quote.wheelSize || '',
    count: quote.wheelCount || '',
    damage: quote.damageLevel || '',
    speed: quote.serviceSpeed || '',
    location: quote.location || '',
    ceramic: quote.ceramicCoating.toString(),
    custom: quote.customColor.toString()
  })
  return `${window.location.origin}${window.location.pathname}?quote=${params.toString()}`
}

const tooltipContent = {
  wheelSize: {
    title: "Wheel Size Guide",
    content: "The diameter of your wheel in inches. You can find this number on your tire sidewall (e.g., 225/45R17 - here 17 is your wheel size)."
  },
  damageLevel: {
    light: {
      title: "Light Damage",
      content: "Surface scratches, minor scuffs, and light curb marks that haven't penetrated the clear coat."
    },
    medium: {
      title: "Medium Damage",
      content: "Visible curb damage, light corrosion, and deeper scratches that require filling."
    },
    severe: {
      title: "Severe Damage",
      content: "Deep scratches, heavy corrosion, or structural damage requiring extensive repair."
    }
  },
  serviceSpeed: {
    standard: {
      title: "Standard Service",
      content: "2-3 working days turnaround. Best value for non-urgent repairs."
    },
    express: {
      title: "Express Service",
      content: "24-hour turnaround. Priority handling with 50% surcharge."
    }
  },
  location: {
    workshop: {
      title: "Workshop Service",
      content: "Bring your vehicle to our state-of-the-art Marsh Barton facility for optimal results."
    },
    mobile: {
      title: "Mobile Service",
      content: "We come to your location. Available within our service area for an additional fee."
    }
  },
  ceramicCoating: {
    title: "Ceramic Coating",
    content: "Premium nano-ceramic coating that provides superior protection, enhanced shine, and makes cleaning easier. Lasts up to 5 years."
  },
  customColor: {
    title: "Custom Color Options",
    content: "Choose from our range of custom colors including metallic, pearl, and color-matched finishes. Includes premium powder coating."
  }
}

const calculateTotal = (quoteState: QuoteState) => {
  if (!quoteState.wheelSize || !quoteState.wheelCount || !quoteState.damageLevel) return 0

  let total = BASE_PRICES[quoteState.wheelSize]
  total *= parseInt(quoteState.wheelCount)
  total *= DAMAGE_MULTIPLIERS[quoteState.damageLevel]
  
  if (quoteState.serviceSpeed === 'express') total *= 1.5
  if (quoteState.location === 'mobile') total += 50
  if (quoteState.ceramicCoating) total += 49 * parseInt(quoteState.wheelCount)
  if (quoteState.customColor) total += 30 * parseInt(quoteState.wheelCount)

  return Math.round(total)
}

const getQuoteDifference = (quote1: QuoteState, quote2: QuoteState | null) => {
  if (!quote2) return null
  const total1 = calculateTotal(quote1)
  const total2 = calculateTotal(quote2)
  return {
    difference: total1 - total2,
    percentage: ((total1 - total2) / total2) * 100
  }
}

const ShareModal = ({ quote, onClose }: { quote: QuoteState; onClose: () => void }) => {
  const [copied, setCopied] = useState(false)
  const shareUrl = generateShareUrl(quote)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
      onClick={onClose}
    >
      <div 
        className="bg-black/90 p-6 rounded-xl border border-[#3E797F]/20 max-w-md w-full"
        onClick={e => e.stopPropagation()}
      >
        <h3 className="text-xl font-bold mb-4">Share Quote</h3>
        <div className="space-y-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={shareUrl}
              readOnly
              className="flex-1 bg-black/20 border border-[#3E797F]/20 rounded-lg px-4 py-2"
            />
            <button
              onClick={handleCopy}
              className="p-2 rounded-lg bg-[#3E797F]/20 hover:bg-[#3E797F]/30 transition-colors"
            >
              {copied ? <CheckCircle className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
            </button>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(shareUrl)}`, '_blank')}
              className="flex-1 py-2 rounded-lg bg-[#25D366]/20 hover:bg-[#25D366]/30 transition-colors"
            >
              WhatsApp
            </button>
            <button
              onClick={() => window.open(`mailto:?subject=Diamond Cut Wheel Quote&body=${encodeURIComponent(shareUrl)}`, '_blank')}
              className="flex-1 py-2 rounded-lg bg-[#3E797F]/20 hover:bg-[#3E797F]/30 transition-colors"
            >
              Email
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function QuoteCalculator() {
  const [quote, setQuote] = useState<QuoteState>({
    wheelSize: null,
    wheelCount: null,
    damageLevel: null,
    serviceSpeed: null,
    location: null,
    ceramicCoating: false,
    customColor: false,
    step: 0,
    showBreakdown: false,
    showShareModal: false,
    copiedToClipboard: false,
    comparisonQuote: null
  })

  useEffect(() => {
    if (quote.wheelSize && quote.step === 0) setQuote(prev => ({ ...prev, step: 1 }))
    if (quote.wheelCount && quote.step === 1) setQuote(prev => ({ ...prev, step: 2 }))
    if (quote.damageLevel && quote.step === 2) setQuote(prev => ({ ...prev, step: 3 }))
    if (quote.serviceSpeed && quote.location && quote.step === 3) setQuote(prev => ({ ...prev, step: 4 }))
  }, [
    quote.wheelSize, 
    quote.wheelCount, 
    quote.damageLevel, 
    quote.serviceSpeed, 
    quote.location, 
    quote.step
  ])

  const isComplete = () => {
    return quote.wheelSize && 
           quote.wheelCount && 
           quote.damageLevel && 
           quote.serviceSpeed && 
           quote.location
  }

  const getPriceBreakdown = () => {
    if (!quote.wheelSize || !quote.wheelCount || !quote.damageLevel) return []

    const basePrice = BASE_PRICES[quote.wheelSize]
    const wheelCount = parseInt(quote.wheelCount)
    const damageMultiplier = DAMAGE_MULTIPLIERS[quote.damageLevel]

    return [
      {
        label: `Base Price (${quote.wheelSize}" wheels)`,
        amount: basePrice * wheelCount
      },
      {
        label: `Damage Level (${quote.damageLevel})`,
        amount: (basePrice * wheelCount * (damageMultiplier - 1))
      },
      ...(quote.serviceSpeed === 'express' ? [{
        label: 'Express Service',
        amount: (basePrice * wheelCount * damageMultiplier * 0.5)
      }] : []),
      ...(quote.location === 'mobile' ? [{
        label: 'Mobile Service',
        amount: 50
      }] : []),
      ...(quote.ceramicCoating ? [{
        label: 'Ceramic Coating',
        amount: 49 * wheelCount
      }] : []),
      ...(quote.customColor ? [{
        label: 'Custom Color',
        amount: 30 * wheelCount
      }] : [])
    ]
  }

  return (
    <div className="bg-black/20 rounded-2xl border border-[#3E797F]/20 p-8">
      <div className="flex items-center gap-3 mb-8">
        <Calculator className="w-6 h-6 text-[#3E797F]" />
        <h3 className="text-2xl font-bold">Instant Quote Calculator</h3>
      </div>

      <div className="space-y-8">
        {/* Progress Steps */}
        <div className="flex justify-between mb-8">
          {['Wheel Size', 'Count', 'Damage', 'Service', 'Extras'].map((step, index) => (
            <div 
              key={step}
              className={`flex items-center ${index !== 4 ? 'flex-1' : ''}`}
            >
              <div 
                className={`
                  w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300
                  ${quote.step >= index 
                    ? 'bg-[#3E797F] text-white' 
                    : 'bg-[#3E797F]/20 text-gray-400'
                  }
                `}
              >
                {index + 1}
              </div>
              {index !== 4 && (
                <div 
                  className={`
                    flex-1 h-1 mx-2 transition-all duration-300
                    ${quote.step > index ? 'bg-[#3E797F]' : 'bg-[#3E797F]/20'}
                  `}
                />
              )}
            </div>
          ))}
        </div>

        {/* Wheel Size Selection */}
        <div className={`transition-all duration-500 ${quote.step === 0 ? 'opacity-100' : 'opacity-50'}`}>
          <div>
            <label className="block text-sm font-medium mb-3 flex items-center gap-2">
              Wheel Size
              <Tooltip content={tooltipContent.wheelSize.content}>
                <HelpCircle className="w-4 h-4 text-[#3E797F]/70 hover:text-[#3E797F] cursor-help" />
              </Tooltip>
            </label>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
              {(['17', '18', '19', '20', '21', '22'] as WheelSize[]).map((size) => (
                <button
                  key={size}
                  onClick={() => setQuote(prev => ({ ...prev, wheelSize: size }))}
                  className={`px-4 py-2 rounded-lg border transition-all ${
                    quote.wheelSize === size
                      ? 'border-[#3E797F] bg-[#3E797F]/20 text-white'
                      : 'border-[#3E797F]/20 bg-black/20 text-gray-400 hover:border-[#3E797F]/50'
                  }`}
                >
                  {size}"
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Number of Wheels */}
        <div className={`transition-all duration-500 ${quote.step === 1 ? 'opacity-100' : 'opacity-50'}`}>
          <div>
            <label className="block text-sm font-medium mb-3">Number of Wheels</label>
            <div className="grid grid-cols-4 gap-2">
              {(['1', '2', '3', '4'] as WheelCount[]).map((count) => (
                <button
                  key={count}
                  onClick={() => setQuote(prev => ({ ...prev, wheelCount: count }))}
                  className={`px-4 py-3 rounded-lg border transition-all ${
                    quote.wheelCount === count
                      ? 'border-[#3E797F] bg-[#3E797F]/20 text-white'
                      : 'border-[#3E797F]/20 bg-black/20 text-gray-400 hover:border-[#3E797F]/50'
                  }`}
                >
                  {count} {count === '1' ? 'Wheel' : 'Wheels'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Damage Level */}
        <div className={`transition-all duration-500 ${quote.step === 2 ? 'opacity-100' : 'opacity-50'}`}>
          <div>
            <label className="block text-sm font-medium mb-3">Damage Level</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { value: 'light', label: 'Light', desc: 'Minor scuffs' },
                { value: 'medium', label: 'Medium', desc: 'Visible damage' },
                { value: 'severe', label: 'Severe', desc: 'Deep damage' }
              ].map((level) => (
                <div key={level.value} className="relative">
                  <button
                    onClick={() => setQuote(prev => ({ ...prev, damageLevel: level.value as DamageLevel }))}
                    className={`w-full p-4 rounded-lg border transition-all ${
                      quote.damageLevel === level.value
                        ? 'border-[#3E797F] bg-[#3E797F]/20'
                        : 'border-[#3E797F]/20 bg-black/20 hover:border-[#3E797F]/50'
                    }`}
                  >
                    <div className="font-semibold mb-1 flex items-center justify-center gap-2">
                      {level.label}
                      <Tooltip content={tooltipContent.damageLevel[level.value as keyof typeof tooltipContent.damageLevel].content}>
                        <HelpCircle className="w-4 h-4 text-[#3E797F]/70 hover:text-[#3E797F]" />
                      </Tooltip>
                    </div>
                    <div className="text-sm text-gray-400">{level.desc}</div>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Service Options */}
        <div className={`transition-all duration-500 ${quote.step === 3 ? 'opacity-100' : 'opacity-50'}`}>
          <div className="grid md:grid-cols-2 gap-4">
            {/* Service Speed */}
            <div>
              <label className="block text-sm font-medium mb-3">Service Speed</label>
              <div className="space-y-2">
                {[
                  { value: 'standard', label: 'Standard Service', desc: '2-3 days' },
                  { value: 'express', label: 'Express Service', desc: '24 hours' }
                ].map((speed) => (
                  <button
                    key={speed.value}
                    onClick={() => setQuote(prev => ({ ...prev, serviceSpeed: speed.value as ServiceSpeed }))}
                    className={`w-full p-4 rounded-lg border transition-all flex items-center gap-3 ${
                      quote.serviceSpeed === speed.value
                        ? 'border-[#3E797F] bg-[#3E797F]/20'
                        : 'border-[#3E797F]/20 bg-black/20 hover:border-[#3E797F]/50'
                    }`}
                  >
                    <Clock className="w-5 h-5 text-[#3E797F]" />
                    <div className="text-left">
                      <div className="font-semibold">{speed.label}</div>
                      <div className="text-sm text-gray-400">{speed.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Service Location */}
            <div>
              <label className="block text-sm font-medium mb-3">Service Location</label>
              <div className="space-y-2">
                {[
                  { value: 'workshop', label: 'Workshop Service', desc: 'Drop off at our facility' },
                  { value: 'mobile', label: 'Mobile Service', desc: 'We come to you' }
                ].map((location) => (
                  <button
                    key={location.value}
                    onClick={() => setQuote(prev => ({ ...prev, location: location.value as 'workshop' | 'mobile' }))}
                    className={`w-full p-4 rounded-lg border transition-all flex items-center gap-3 ${
                      quote.location === location.value
                        ? 'border-[#3E797F] bg-[#3E797F]/20'
                        : 'border-[#3E797F]/20 bg-black/20 hover:border-[#3E797F]/50'
                    }`}
                  >
                    {location.value === 'workshop' ? (
                      <Wrench className="w-5 h-5 text-[#3E797F]" />
                    ) : (
                      <Car className="w-5 h-5 text-[#3E797F]" />
                    )}
                    <div className="text-left">
                      <div className="font-semibold">{location.label}</div>
                      <div className="text-sm text-gray-400">{location.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Additional Services */}
        <div className={`transition-all duration-500 ${quote.step === 4 ? 'opacity-100' : 'opacity-50'}`}>
          <div>
            <label className="block text-sm font-medium mb-3">Additional Services</label>
            <div className="space-y-2">
              <label className="flex items-center gap-3 p-4 rounded-lg border border-[#3E797F]/20 bg-black/20 cursor-pointer relative group">
                <input
                  type="checkbox"
                  checked={quote.ceramicCoating}
                  onChange={(e) => setQuote(prev => ({ ...prev, ceramicCoating: e.target.checked }))}
                  className="rounded border-[#3E797F]/20 bg-black/20 text-[#3E797F] focus:ring-[#3E797F]"
                />
                <div className="flex-grow">
                  <div className="font-semibold flex items-center gap-2">
                    Ceramic Coating
                    <Tooltip content={tooltipContent.ceramicCoating.content}>
                      <HelpCircle className="w-4 h-4 text-[#3E797F]/70 hover:text-[#3E797F] cursor-help" />
                    </Tooltip>
                  </div>
                  <div className="text-sm text-gray-400">Additional protection (£49 per wheel)</div>
                </div>
              </label>
              
              <label className="flex items-center gap-3 p-4 rounded-lg border border-[#3E797F]/20 bg-black/20 cursor-pointer">
                <input
                  type="checkbox"
                  checked={quote.customColor}
                  onChange={(e) => setQuote(prev => ({ ...prev, customColor: e.target.checked }))}
                  className="rounded border-[#3E797F]/20 bg-black/20 text-[#3E797F] focus:ring-[#3E797F]"
                />
                <div>
                  <div className="font-semibold">Custom Color</div>
                  <div className="text-sm text-gray-400">Bespoke color options (£30 per wheel)</div>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Enhanced Total and CTA section */}
        <div className="pt-4 border-t border-[#3E797F]/20">
          <button
            onClick={() => setQuote(prev => ({ ...prev, showBreakdown: !prev.showBreakdown }))}
            className="w-full p-4 mb-4 rounded-lg border border-[#3E797F]/20 bg-black/20 hover:bg-black/30 transition-all"
          >
            <div className="flex items-baseline justify-between">
              <div className="text-sm text-gray-400 flex items-center gap-2">
                Estimated Total
                <Tooltip content="This is an estimated price based on your selections. Final quote may vary based on inspection.">
                  <HelpCircle className="w-4 h-4 text-[#3E797F]/70 hover:text-[#3E797F] cursor-help" />
                </Tooltip>
              </div>
              <div className="text-4xl font-bold">£{calculateTotal(quote)}</div>
            </div>
            <div className="text-sm text-[#3E797F] mt-2">
              Click to {quote.showBreakdown ? 'hide' : 'view'} price breakdown
            </div>
          </button>

          {/* Animated Price Breakdown */}
          <div className={`
            space-y-2 overflow-hidden transition-all duration-300
            ${quote.showBreakdown ? 'max-h-[500px] opacity-100 mb-6' : 'max-h-0 opacity-0'}
          `}>
            {getPriceBreakdown().map((item, index) => (
              <div 
                key={index}
                className="flex justify-between items-center p-3 rounded-lg bg-black/20"
              >
                <span className="text-sm text-gray-400">{item.label}</span>
                <span className="font-semibold">£{Math.round(item.amount)}</span>
              </div>
            ))}
          </div>

          <button
            disabled={!isComplete()}
            className={`w-full py-4 px-6 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
              isComplete()
                ? 'bg-[#3E797F] hover:bg-[#3E797F]/80'
                : 'bg-gray-600 cursor-not-allowed'
            }`}
          >
            Book Now
            <ArrowRight className="w-5 h-5" />
          </button>

          <div className="mt-4 flex items-start gap-2 text-sm text-gray-400">
            <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <p>
              This is an estimated price. Final quote may vary based on inspection.
              All services include our premium lacquer protection and warranty.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 