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
  MapPin,
} from 'lucide-react'
import ServiceBooking from '../../components/ServiceBooking'
import dynamic from 'next/dynamic'
import BeforeAfterSlider from '../../components/BeforeAfterSlider'

type BeforeAfterImage = {
  id: string
  title: string
  description: string
  before: string
  after: string
  damage: string
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
              src="/images/services/diamond-cut-alloy-repair_2.jpg"
              alt="Professional Diamond Cut Alloy Wheel Repair Process"
              fill
              className="object-cover object-[center_35%]"
              priority
              quality={100}
              sizes="100vw"
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
              <span className="text-white/80 text-sm">Over 3,000+ Wheels Restored</span>
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
                <p className="text-sm text-gray-400">Premium lacquer protection system</p>
              </div>
              
              <div className="bg-black/30 backdrop-blur-sm p-4 rounded-xl border border-[#3E797F]/20">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-[#3E797F]" />
                  <span className="font-semibold">Fast Service</span>
                </div>
                <p className="text-sm text-gray-400">Quick turnaround without compromising quality</p>
              </div>
              
              <div className="bg-black/30 backdrop-blur-sm p-4 rounded-xl border border-[#3E797F]/20">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-5 h-5 text-[#3E797F]" />
                  <span className="font-semibold">Quality Guaranteed</span>
                </div>
                <p className="text-sm text-gray-400">100% satisfaction guaranteed</p>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => {
                  const coverageSection = document.getElementById('coverage');
                  if (coverageSection) {
                    coverageSection.scrollIntoView({ 
                      behavior: 'smooth',
                      block: 'start'
                    });
                  }
                }}
                className="group bg-[#3E797F] hover:bg-[#3E797F]/80 px-8 py-4 rounded-lg text-lg font-semibold transition-all flex items-center justify-center gap-2 relative overflow-hidden"
              >
                <span className="relative z-10">Get Free Quote</span>
                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              
              <button 
                onClick={() => {
                  const coverageSection = document.getElementById('coverage');
                  if (coverageSection) {
                    coverageSection.scrollIntoView({ 
                      behavior: 'smooth',
                      block: 'start'
                    });
                  }
                }}
                className="group bg-white/10 hover:bg-white/20 px-8 py-4 rounded-lg text-lg font-semibold transition-all flex items-center justify-center gap-2"
              >
                <MapPin className="w-5 h-5" />
                <span>Check Coverage</span>
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
                Diamond cut alloy wheel repair is a precision process that utilises state-of-the-art CNC lathe technology to restore damaged wheels to their original factory specification. Unlike traditional refurbishment methods, our diamond cutting process removes a thin layer of alloy to create a perfectly smooth surface with the distinctive bright finish that makes diamond cut alloys so desirable.
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
                    <span>Creates a distinctive bright finish that cannot be replicated by other methods</span>
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

      {/* Get Quote CTA Section */}
      <div className="mt-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          <span className="text-[#3E797F]">Get Your</span>{" "}
          <span className="text-white">Free Quote</span>
        </h2>
        
        <p className="text-gray-400 mb-8">
          Professional diamond cut alloy wheel repair with guaranteed results. 
          Contact us today for a no-obligation quote.
        </p>

        <button 
          onClick={() => {
            const coverageSection = document.getElementById('coverage');
            if (coverageSection) {
              coverageSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
              });
            }
          }}
          className="group bg-[#3E797F] hover:bg-[#3E797F]/80 px-8 py-4 rounded-lg text-lg font-semibold transition-all flex items-center justify-center gap-2 mx-auto"
        >
          <span>Get Free Quote</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>

        <div className="mt-8 flex items-center justify-center gap-8">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-[#3E797F]" />
            <span className="text-sm text-gray-400">Same-day response</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-[#3E797F]" />
            <span className="text-sm text-gray-400">No obligation</span>
          </div>
        </div>
      </div>

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
                  <h3 className="text-xl font-bold mb-2">Surface Treatment</h3>
                  <p className="text-gray-400">Professional preparation and treatment to ensure perfect adhesion and longevity.</p>
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <BeforeAfterSlider
              before="/images/gallery/diamond-cut-before-2.jpg"
              after="/images/gallery/diamond-cut-after-2.jpg"
              title="Ford Diamond Cut Restoration"
              description="Full face diamond cut refurbishment"
              showLabels={false}
            />

            <BeforeAfterSlider
              before="/images/services/diamond_before.jpg"
              after="/images/services/diamond_after.jpg"
              title="Diamond Cut Restoration"
              description="Full face diamond cut refurbishment"
              showLabels={false}
            />

            <BeforeAfterSlider
              before="/images/services/diamond_berfore_1.jpg"
              after="/images/services/diamond_after_1.jpg"
              title="Another Diamond Cut Restoration"
              description="Precision CNC machining"
              showLabels={false}
            />
          </div>

          {/* Gallery Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-black/20 p-6 rounded-xl border border-[#3E797F]/20">
              <div className="text-3xl font-bold text-[#3E797F] mb-2">100%</div>
              <div className="text-sm text-gray-400">Customer Satisfaction</div>
            </div>
            <div className="bg-black/20 p-6 rounded-xl border border-[#3E797F]/20">
              <div className="text-3xl font-bold text-[#3E797F] mb-2">10+</div>
              <div className="text-sm text-gray-400">Years Experience</div>
            </div>
            <div className="bg-black/20 p-6 rounded-xl border border-[#3E797F]/20">
              <div className="text-3xl font-bold text-[#3E797F] mb-2">5/5</div>
              <div className="text-sm text-gray-400">Average Rating</div>
            </div>
            <div className="bg-black/20 p-6 rounded-xl border border-[#3E797F]/20">
              <div className="text-3xl font-bold text-[#3E797F] mb-2">Quality Finish Guaranteed to Manufacturer Standards</div>
              <div className="text-sm text-gray-400">Quality Guarantee</div>
            </div>
          </div>
        </div>
      </section>

      {/* Coverage Area Section */}
      <section id="coverage" className="py-20 bg-black/40 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
            <span className="text-[#3E797F]">Get Your</span>{" "}
            <span className="text-white">Free Quote</span>
          </h2>
          
          <p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto">
            Get an instant quote for your diamond cut alloy wheel repair. 
            Check our coverage area below to see if we service your location.
          </p>

          <div className="max-w-5xl mx-auto">
            {/* Map Container */}
            <div className="w-full h-[600px] rounded-2xl overflow-hidden">
              <DynamicCoverageMap />
            </div>
            
            <div className="mt-8">
              <p className="text-sm text-gray-400 text-center">
                * Coverage area may vary. Please contact us for specific location availability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-black/40 backdrop-blur-sm">
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
              answer="Diamond cut alloy wheel repair is a precision process where we use a CNC lathe to machine the face of your wheel, removing a thin layer of alloy to create a perfectly smooth, mirror-like finish. This is followed by our premium lacquer protection system to prevent corrosion."
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
              question="What makes diamond cutting unique?"
              answer="Diamond cutting creates a distinctive bright, machined finish by removing a layer of alloy, exactly matching the original manufacturer's finish. This precision process achieves a unique metallic shine that perfectly replicates the original factory specification."
            />
            
            <FAQItem 
              question="How long does a diamond cut finish last?"
              answer="With proper care, a diamond cut finish can last several years. We recommend our ceramic coating option for maximum protection. Regular cleaning and avoiding harsh chemicals will help maintain the finish. All our work comes with a 12-month warranty as standard."
            />
            
            <FAQItem 
              question="Can all alloy wheels be diamond cut?"
              answer="Not all wheels are suitable for diamond cutting. The wheel must have the right profile and sufficient material thickness. We'll assess your wheels and recommend the best refurbishment method. If diamond cutting isn't suitable, we'll suggest alternative solutions."
            />
            
            <FAQItem 
              question="Do you offer a mobile service?"
              answer="Yes, we offer a mobile service within our coverage area for an additional fee. However, diamond cutting must be performed at our workshop due to the specialized equipment required. We provide free collection and delivery for full sets."
            />
            
            <FAQItem 
              question="What quality guarantee do you provide?"
              answer={
                <div className="space-y-2">
                  <p>Our commitment to quality includes:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Thorough quality control checks</li>
                    <li>Post-service inspection</li>
                    <li>Customer satisfaction follow-up</li>
                    <li>Support if any issues arise</li>
                  </ul>
                  <p>We ensure you're completely satisfied with the finish of your wheels.</p>
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
                  href="tel:07572634898" 
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-[#3E797F] hover:bg-[#3E797F]/80 rounded-lg transition-all"
                >
                  <Phone className="w-5 h-5" />
                  <span>Call Us Now</span>
                </a>
                
                <button 
                  onClick={() => {
                    const coverageSection = document.getElementById('coverage');
                    if (coverageSection) {
                      coverageSection.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                      });
                    }
                  }}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-all"
                >
                  <MapPin className="w-5 h-5" />
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

      {/* Footer */}
      <Footer />
    </main>
  )
} 