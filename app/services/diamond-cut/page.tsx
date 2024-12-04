'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
import { 
  Diamond, 
  CheckCircle2, 
  ArrowRight,
  Star,
  Clock,
  Shield,
  Wrench,
  Sparkles,
  Play,
  ChevronDown,
  Info,
  Camera,
  MoveHorizontal,
  Phone,
  MessageSquare,
} from 'lucide-react'
import QuoteCalculator from '../../components/QuoteCalculator'
import dynamic from 'next/dynamic'

type BeforeAfterImage = {
  id: string
  title: string
  description: string
  before: string
  after: string
  damage: string
}

const BeforeAfterSlider = ({ before, after }: { before: string; after: string }) => {
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
  )
}

const FAQItem = ({ question, answer }: { question: string; answer: string | React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <div className="border border-[#3E797F]/20 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 text-left flex items-center justify-between bg-black/20 hover:bg-black/30 transition-colors"
      >
        <span className="font-semibold text-lg">{question}</span>
        <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      <div className={`
        overflow-hidden transition-all duration-300
        ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}
      `}>
        <div className="p-6 pt-0 text-gray-400">
          {answer}
        </div>
      </div>
    </div>
  )
}

const DynamicCoverageMap = dynamic(() => import('../../components/MapWrapper'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] rounded-2xl overflow-hidden bg-black/20 flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#3E797F] border-t-transparent"></div>
    </div>
  )
})

export default function DiamondCutRepair() {
  const parallaxRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [showVideo, setShowVideo] = useState(false)

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrolled = window.scrollY
        parallaxRef.current.style.transform = `translateY(${scrolled * 0.5}px)`
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <main className="min-h-screen bg-black">
      <Navigation className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm" />

      {/* Hero Section with SEO-optimized H1 */}
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/images/services/diamond-cut-hero.jpg"
              alt="Professional Diamond Cut Alloy Wheel Repair Process"
              fill
              className="object-cover object-center scale-105 animate-subtle-zoom"
              priority
              quality={100}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black" />
          </div>
        </div>

        <div className="relative container mx-auto px-6">
          <div className="max-w-3xl">
            {/* Trust Indicators */}
            <div className="flex items-center gap-3 mb-8 animate-fade-in-up">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-[#3E797F] fill-[#3E797F]" />
                ))}
              </div>
              <span className="text-white/80 text-sm">Over 2,000+ Wheels Restored</span>
            </div>

            {/* SEO-Optimized H1 */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="block text-[#3E797F]">Diamond Cut</span>
              <span className="block text-white">Alloy Wheel Repair</span>
              <span className="block text-sm md:text-xl font-normal text-gray-400 mt-4">
                State-of-the-art CNC lathe technology for precision restoration
              </span>
            </h1>

            {/* Key Benefits with Semantic Keywords */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-black/30 backdrop-blur-sm p-4 rounded-xl border border-[#3E797F]/20">
                <div className="flex items-center gap-2 mb-2">
                  <Diamond className="w-5 h-5 text-[#3E797F]" />
                  <span className="font-semibold">Factory-Grade Finish</span>
                </div>
                <p className="text-sm text-gray-400">Precision CNC machining for perfect smooth surface</p>
              </div>
              
              <div className="bg-black/30 backdrop-blur-sm p-4 rounded-xl border border-[#3E797F]/20">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-5 h-5 text-[#3E797F]" />
                  <span className="font-semibold">Corrosion Protection</span>
                </div>
                <p className="text-sm text-gray-400">Advanced powder coating & lacquer system</p>
              </div>
              
              <div className="bg-black/30 backdrop-blur-sm p-4 rounded-xl border border-[#3E797F]/20">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-[#3E797F]" />
                  <span className="font-semibold">24-Hour Service</span>
                </div>
                <p className="text-sm text-gray-400">Quick turnaround without compromising quality</p>
              </div>
              
              <div className="bg-black/30 backdrop-blur-sm p-4 rounded-xl border border-[#3E797F]/20">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-5 h-5 text-[#3E797F]" />
                  <span className="font-semibold">6 Month Warranty</span>
                </div>
                <p className="text-sm text-gray-400">Guaranteed quality and durability</p>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="group bg-[#3E797F] hover:bg-[#3E797F]/80 px-8 py-4 rounded-lg text-lg font-semibold transition-all flex items-center justify-center gap-2 relative overflow-hidden">
                <span className="relative z-10">Get Free Assessment</span>
                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              
              <button 
                onClick={() => setShowVideo(true)}
                className="group bg-white/10 hover:bg-white/20 px-8 py-4 rounded-lg text-lg font-semibold transition-all flex items-center justify-center gap-2"
              >
                <Play className="w-5 h-5" />
                Watch Process
              </button>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
              <ChevronDown className="w-6 h-6 text-[#3E797F]" />
            </div>
          </div>
        </div>
      </section>

      {/* Technical Overview Section */}
      <section className="py-20 bg-black/40 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
              <span className="text-[#3E797F]">Understanding</span>{" "}
              <span className="text-white">Diamond Cut Technology</span>
            </h2>

            <div className="prose prose-invert max-w-none">
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                Diamond cut alloy wheel repair is a precision process that utilizes state-of-the-art CNC lathe technology to restore damaged wheels to their original factory specification. Unlike traditional refurbishment methods, our diamond cutting process removes a thin layer of alloy to create a perfectly smooth surface with the distinctive bright finish that makes diamond cut alloys so desirable.
              </p>

              <div className="bg-black/20 border border-[#3E797F]/20 rounded-xl p-6 mb-8">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Info className="w-5 h-5 text-[#3E797F]" />
                  Why Choose Diamond Cutting?
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#3E797F] mt-1" />
                    <span>Achieves an exact match to original manufacturer specification</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#3E797F] mt-1" />
                    <span>Creates a distinctive bright finish that powder coating cannot replicate</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#3E797F] mt-1" />
                    <span>Advanced lacquer system provides superior corrosion protection</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#3E797F] mt-1" />
                    <span>Maintains and potentially increases vehicle value</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Diamond Cutting Process Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">
            <span className="text-[#3E797F]">Our Diamond Cutting</span>{" "}
            <span className="text-white">Process</span>
          </h2>

          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
            {/* Left Column - Process Steps */}
            <div className="space-y-8">
              <div className="flex gap-4 p-6 bg-black/20 rounded-xl border border-[#3E797F]/20">
                <div className="text-[#3E797F]">
                  <Wrench className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Initial Assessment</h3>
                  <p className="text-gray-400">Thorough inspection of wheel condition, including damage assessment and structural integrity check.</p>
                </div>
              </div>

              <div className="flex gap-4 p-6 bg-black/20 rounded-xl border border-[#3E797F]/20">
                <div className="text-[#3E797F]">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Surface Preparation</h3>
                  <p className="text-gray-400">Complete stripping and preparation to achieve a perfectly smooth surface for the diamond cutting process.</p>
                </div>
              </div>

              <div className="flex gap-4 p-6 bg-black/20 rounded-xl border border-[#3E797F]/20">
                <div className="text-[#3E797F]">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Powder Coating</h3>
                  <p className="text-gray-400">Application of base powder coat finish to prevent corrosion and provide the perfect foundation.</p>
                </div>
              </div>

              <div className="flex gap-4 p-6 bg-black/20 rounded-xl border border-[#3E797F]/20">
                <div className="text-[#3E797F]">
                  <Diamond className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">CNC Diamond Cutting</h3>
                  <p className="text-gray-400">Precision machining using our state-of-the-art CNC lathe to remove a thin layer of alloy.</p>
                </div>
              </div>

              <div className="flex gap-4 p-6 bg-black/20 rounded-xl border border-[#3E797F]/20">
                <div className="text-[#3E797F]">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Lacquer Protection</h3>
                  <p className="text-gray-400">Application of premium protective lacquer to seal and protect the diamond cut finish.</p>
                </div>
              </div>
            </div>

            {/* Right Column - Video and Stats */}
            <div className="space-y-8">
              {/* Process Video */}
              <div>
                <h3 className="text-2xl font-bold mb-4">Watch The Process</h3>
                <div className="relative w-full max-w-[280px] mx-auto aspect-[9/16] rounded-2xl overflow-hidden bg-black/20">
                  <video 
                    className="absolute inset-0 w-full h-full object-cover"
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                  >
                    <source src="/images/services/diamond_cutting_process.mp4" type="video/mp4" />
                  </video>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-black/20 p-4 rounded-xl border border-[#3E797F]/20 text-center">
                  <div className="text-3xl font-bold text-[#3E797F]">2,000+</div>
                  <div className="text-sm text-gray-400">Wheels Restored</div>
                </div>
                <div className="bg-black/20 p-4 rounded-xl border border-[#3E797F]/20 text-center">
                  <div className="text-3xl font-bold text-[#3E797F]">Quick</div>
                  <div className="text-sm text-gray-400">Turnaround</div>
                </div>
                <div className="bg-black/20 p-4 rounded-xl border border-[#3E797F]/20 text-center">
                  <div className="text-3xl font-bold text-[#3E797F]">100%</div>
                  <div className="text-sm text-gray-400">Satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Before/After Gallery */}
      <section className="py-20 bg-black/40 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
            <span className="text-[#3E797F]">Transformation</span>{" "}
            <span className="text-white">Gallery</span>
          </h2>
          
          <p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto">
            See the remarkable difference our diamond cut alloy wheel repair service makes. 
            Drag the slider to compare before and after results.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                id: '1',
                title: 'BMW M-Sport Diamond Cut Restoration',
                description: 'Complete diamond cut refurbishment with powder coat base',
                before: '/images/gallery/diamond-cut-before-1.jpg',
                after: '/images/gallery/diamond-cut-after-1.jpg',
                damage: 'Kerb damage and corrosion'
              },
              {
                id: '2',
                title: 'Audi RS Diamond Cut Repair',
                description: 'Full face diamond cut restoration',
                before: '/images/gallery/diamond-cut-before-2.jpg',
                after: '/images/gallery/diamond-cut-after-2.jpg',
                damage: 'Lacquer peel and surface corrosion'
              }
            ].map((example) => (
              <div 
                key={example.id}
                className="bg-black/20 rounded-xl border border-[#3E797F]/20 overflow-hidden group"
              >
                <div className="relative aspect-square">
                  <BeforeAfterSlider 
                    before={example.before}
                    after={example.after}
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                    <h3 className="text-xl font-bold mb-2">{example.title}</h3>
                    <p className="text-gray-300 text-sm">{example.description}</p>
                  </div>
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-sm flex items-center gap-2">
                    <Camera className="w-4 h-4" />
                    <span>Before & After</span>
                  </div>
                  <div className="absolute top-4 right-4 bg-[#3E797F]/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                    {example.damage}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Gallery Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-black/20 p-6 rounded-xl border border-[#3E797F]/20">
              <div className="text-3xl font-bold text-[#3E797F] mb-2">100%</div>
              <div className="text-sm text-gray-400">Customer Satisfaction</div>
            </div>
            <div className="bg-black/20 p-6 rounded-xl border border-[#3E797F]/20">
              <div className="text-3xl font-bold text-[#3E797F] mb-2">2,500+</div>
              <div className="text-sm text-gray-400">Photos in Gallery</div>
            </div>
            <div className="bg-black/20 p-6 rounded-xl border border-[#3E797F]/20">
              <div className="text-3xl font-bold text-[#3E797F] mb-2">4.9/5</div>
              <div className="text-sm text-gray-400">Average Rating</div>
            </div>
            <div className="bg-black/20 p-6 rounded-xl border border-[#3E797F]/20">
              <div className="text-3xl font-bold text-[#3E797F] mb-2">100%</div>
              <div className="text-sm text-gray-400">Quality Guarantee</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
            <span className="text-[#3E797F]">Transparent</span>{" "}
            <span className="text-white">Pricing</span>
          </h2>
          
          <p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto">
            Professional diamond cut alloy wheel repair with guaranteed results. 
            Choose the package that best suits your needs.
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Single Wheel",
                price: "£120",
                description: "Perfect for individual wheel repair",
                features: [
                  "Full diamond cut restoration",
                  "Powder coat base layer",
                  "Premium lacquer protection",
                  "24-hour turnaround",
                  "12-month warranty"
                ],
                highlighted: false
              },
              {
                name: "Full Set",
                price: "£399",
                description: "Most popular choice",
                features: [
                  "4 wheels fully restored",
                  "Priority service",
                  "Free wheel balancing",
                  "Premium powder coating",
                  "24-month warranty",
                  "Free collection & delivery"
                ],
                highlighted: true
              },
              {
                name: "Custom Finish",
                price: "From £499",
                description: "Bespoke design service",
                features: [
                  "Custom color options",
                  "Two-tone finishes",
                  "Premium diamond cutting",
                  "Ceramic coating option",
                  "36-month warranty",
                  "Lifetime support"
                ],
                highlighted: false
              }
            ].map((plan, index) => (
              <div 
                key={index}
                className={`relative bg-black/20 rounded-2xl border ${
                  plan.highlighted 
                    ? 'border-[#3E797F] shadow-[0_0_20px_rgba(62,121,127,0.2)]' 
                    : 'border-[#3E797F]/20'
                } p-8 flex flex-col`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#3E797F] px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                )}

                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-gray-400">per service</span>
                  </div>
                  <p className="text-gray-400">{plan.description}</p>
                </div>

                <ul className="space-y-4 mb-8 flex-grow">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#3E797F]" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button 
                  className={`w-full py-4 px-6 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                    plan.highlighted
                      ? 'bg-[#3E797F] hover:bg-[#3E797F]/80'
                      : 'bg-white/10 hover:bg-white/20'
                  }`}
                >
                  Get Started
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>

          {/* Additional Services */}
          <div className="mt-16 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-center mb-8">Additional Services</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                {
                  service: "Ceramic Coating",
                  price: "£49 per wheel"
                },
                {
                  service: "Custom Color Match",
                  price: "£30 per wheel"
                },
                {
                  service: "TPMS Service",
                  price: "£15 per sensor"
                },
                {
                  service: "Wheel Balancing",
                  price: "£10 per wheel"
                },
                {
                  service: "Express Service",
                  price: "+50% surcharge"
                },
                {
                  service: "Mobile Service",
                  price: "From £50"
                }
              ].map((item, index) => (
                <div 
                  key={index}
                  className="bg-black/20 p-4 rounded-xl border border-[#3E797F]/20"
                >
                  <div className="font-semibold mb-1">{item.service}</div>
                  <div className="text-sm text-gray-400">{item.price}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Price Match Promise */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-2 bg-[#3E797F]/10 px-4 py-2 rounded-full">
              <Shield className="w-5 h-5 text-[#3E797F]" />
              <span className="text-sm">Price Match Promise</span>
            </div>
            <p className="mt-4 text-gray-400 max-w-xl mx-auto">
              Found a better price? We'll match any legitimate quote from a certified diamond cut specialist.
            </p>
          </div>
        </div>
      </section>

      {/* Calculate Your Quote Section */}
      <section className="py-20 bg-black/40 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
            <span className="text-[#3E797F]">Calculate</span>{" "}
            <span className="text-white">Your Quote</span>
          </h2>
          
          <p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto">
            Get an instant estimate for your diamond cut alloy wheel repair.
            Customize your service options and see pricing in real-time.
          </p>

          <div className="max-w-3xl mx-auto">
            <QuoteCalculator />
          </div>
        </div>
      </section>

      {/* FAQ Section with CTA */}
      <section>
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
            <span className="text-[#3E797F]">Frequently Asked</span>{" "}
            <span className="text-white">Questions</span>
          </h2>
          
          <p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto">
            Find answers to common questions about our diamond cut alloy wheel repair service.
          </p>

          <div className="max-w-3xl mx-auto space-y-4">
            <FAQItem 
              question="What is diamond cut alloy wheel repair?"
              answer="Diamond cut alloy wheel repair is a precision process where we use a CNC lathe to machine the face of your wheel, removing a thin layer of alloy to create a perfectly smooth, mirror-like finish. This is followed by a protective powder coat base and clear lacquer to prevent corrosion."
            />
            
            <FAQItem 
              question="How long does diamond cut wheel repair take?"
              answer="Standard service takes 2-3 working days. We also offer an express 24-hour service for urgent repairs. The exact time depends on the extent of damage and whether additional repairs are needed."
            />
            
            <FAQItem 
              question="How many times can a wheel be diamond cut?"
              answer={
                <div className="space-y-2">
                  <p>A wheel can typically be diamond cut 2-3 times safely. This depends on:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>The wheel's original thickness</li>
                    <li>The extent of damage being repaired</li>
                    <li>The wheel's structural integrity</li>
                  </ul>
                  <p>Our technicians will assess your wheel and advise if diamond cutting is suitable.</p>
                </div>
              }
            />
            
            <FAQItem 
              question="What's the difference between diamond cutting and powder coating?"
              answer="Diamond cutting creates a distinctive bright, machined finish by removing a layer of alloy, exactly matching the original manufacturer's finish. Powder coating, while durable, applies a painted finish that doesn't replicate the metallic look of diamond cut wheels."
            />
            
            <FAQItem 
              question="How long does a diamond cut finish last?"
              answer="With proper care, a diamond cut finish can last several years. We recommend our ceramic coating option for maximum protection. Regular cleaning and avoiding harsh chemicals will help maintain the finish. All our work comes with a 12-month warranty as standard."
            />
            
            <FAQItem 
              question="Can all alloy wheels be diamond cut?"
              answer="Not all wheels are suitable for diamond cutting. The wheel must have the right profile and sufficient material thickness. We'll assess your wheels and recommend the best refurbishment method. If diamond cutting isn't suitable, we offer premium powder coating alternatives."
            />
            
            <FAQItem 
              question="Do you offer a mobile service?"
              answer="Yes, we offer a mobile service within our coverage area for an additional fee. However, diamond cutting must be performed at our workshop due to the specialized equipment required. We provide free collection and delivery for full sets."
            />
            
            <FAQItem 
              question="What's included in the warranty?"
              answer={
                <div className="space-y-2">
                  <p>Our 6-month warranty covers:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Manufacturing defects</li>
                    <li>Lacquer peeling or bubbling</li>
                    <li>Corrosion under the clear coat</li>
                    <li>Finish imperfections</li>
                  </ul>
                </div>
              }
            />
          </div>

          {/* Still have questions? CTA */}
          <div className="mt-16 text-center">
            <div className="max-w-2xl mx-auto bg-black/20 border border-[#3E797F]/20 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4">Still Have Questions?</h3>
              
              <p className="text-gray-400 mb-8">
                Our wheel specialists are here to help. Get expert advice about your specific requirements.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="tel:+441234567890" 
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-[#3E797F] hover:bg-[#3E797F]/80 rounded-lg transition-all"
                >
                  <Phone className="w-5 h-5" />
                  <span>Call Us Now</span>
                </a>
                
                <button 
                  onClick={() => window.location.href = '#quote-calculator'}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-all"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>Get a Quote</span>
                </button>
              </div>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center justify-center gap-2 text-gray-400">
                  <Clock className="w-4 h-4" />
                  <span>Response within 2 hours</span>
                </div>
                
                <div className="flex items-center justify-center gap-2 text-gray-400">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>No obligation quote</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Coverage Area Section */}
      <section className="py-20 bg-black/40 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
            <span className="text-[#3E797F]">Service</span>{" "}
            <span className="text-white">Coverage Area</span>
          </h2>
          
          <p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto">
            We offer mobile wheel repair services across the South West, with our main diamond cutting facility located in Marsh Barton, Exeter.
          </p>

          <div className="max-w-5xl mx-auto">
            {/* Map Container */}
            <div className="w-full h-[600px] rounded-2xl overflow-hidden">
              <DynamicCoverageMap />
            </div>
            
            <div className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-black/20 p-6 rounded-xl border border-[#3E797F]/20">
                  <h3 className="font-semibold mb-2">Workshop Service</h3>
                  <p className="text-sm text-gray-400">Diamond cutting available at our Marsh Barton facility</p>
                </div>
                
                <div className="bg-black/20 p-6 rounded-xl border border-[#3E797F]/20">
                  <h3 className="font-semibold mb-2">Mobile Service</h3>
                  <p className="text-sm text-gray-400">Available within 45-mile radius for wheel collection</p>
                </div>
                
                <div className="bg-black/20 p-6 rounded-xl border border-[#3E797F]/20">
                  <h3 className="font-semibold mb-2">Free Collection</h3>
                  <p className="text-sm text-gray-400">Free collection & delivery for full sets</p>
                </div>
              </div>

              <p className="text-sm text-gray-400 text-center mt-6">
                * Coverage area may vary. Please contact us for specific location availability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  )
} 