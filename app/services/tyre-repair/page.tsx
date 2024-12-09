'use client'
import { useState } from 'react'
import Image from 'next/image'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
import dynamic from 'next/dynamic'
import { 
  CheckCircle2, 
  ArrowRight,
  Star,
  Clock,
  Shield,
  Phone,
  MessageSquare,
  ChevronDown,
  AlertTriangle
} from 'lucide-react'
import { contactInfo } from '../../constants/contact'

// Dynamic import of map component
const DynamicCoverageMap = dynamic(() => import('../../components/MapWrapper'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] rounded-2xl overflow-hidden bg-black/20 flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#3E797F] border-t-transparent"></div>
    </div>
  )
})

// FAQ Component
type FAQItemProps = {
  question: string;
  answer: string | React.ReactNode;
}

const FAQItem = ({ question, answer }: FAQItemProps) => {
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

export default function TyreRepairExeter() {
  return (
    <main className="min-h-screen bg-black">
      <Navigation className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm" />

      {/* Hero Section */}
      <section className="relative min-h-screen bg-black">
        <div className="absolute inset-0">
          <div className="absolute inset-0">
            <Image
              src="/images/services/tyre_repair_exeter.jpg"
              alt="Professional Tyre Repair Service in Exeter"
              fill
              className="object-cover object-center"
              priority
              quality={100}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black" />
            <div className="absolute right-0 w-[100px] h-full bg-black" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black" />
          </div>
        </div>

        <div className="relative container mx-auto px-6 h-full flex items-center">
          <div className="max-w-3xl pt-32">
            {/* Trust Indicators */}
            <div className="flex items-center gap-3 mb-8">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-[#3E797F] fill-[#3E797F]" />
                ))}
              </div>
              <span className="text-white/80 text-sm">Exeter's Trusted Tyre Repair Specialists</span>
            </div>

            {/* SEO-Optimized H1 */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="block text-white">Professional</span>
              <span className="block text-[#3E797F]">Tyre Repair Exeter</span>
              <span className="block text-2xl md:text-3xl font-normal text-gray-400 mt-4">
                Fast, Reliable Puncture Repairs at Our Marsh Barton Workshop
              </span>
            </h1>

            {/* Emergency Notice */}
            <div className="bg-[#3E797F]/10 border border-[#3E797F] rounded-xl p-4 mb-8">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-red-500 animate-warning-flash" />
                <span className="font-semibold text-red-500 animate-warning-flash">Got a Puncture?</span>
              </div>
              <p className="text-gray-400 text-sm">
                Visit our workshop in Marsh Barton for quick, professional tyre repairs. 
                We aim to get you back on the road within 45 minutes.
              </p>
            </div>

            {/* Key Benefits */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-black/30 backdrop-blur-sm p-4 rounded-xl border border-[#3E797F]/20">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-[#3E797F]" />
                  <span className="font-semibold">Quick Service</span>
                </div>
                <p className="text-sm text-gray-400">Most repairs completed in 45 minutes</p>
              </div>
              
              <div className="bg-black/30 backdrop-blur-sm p-4 rounded-xl border border-[#3E797F]/20">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-5 h-5 text-[#3E797F]" />
                  <span className="font-semibold">Safety First</span>
                </div>
                <p className="text-sm text-gray-400">British Standard approved repairs</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href={`tel:${contactInfo.phone}`}
                className="group bg-[#3E797F] hover:bg-[#3E797F]/80 px-8 py-4 rounded-lg text-lg font-semibold transition-all flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                <span>Get Free Quote</span>
              </a>
              
              <button 
                onClick={() => {
                  const mapSection = document.getElementById('coverage');
                  if (mapSection) {
                    mapSection.scrollIntoView({ 
                      behavior: 'smooth',
                      block: 'start'
                    });
                  }
                }}
                className="bg-white/10 hover:bg-white/20 px-8 py-4 rounded-lg text-lg font-semibold transition-all"
              >
                Workshop Location
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Repair Services Overview */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">
            <span className="text-[#3E797F]">Professional</span>{" "}
            <span className="text-white">Tyre Repair Services</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Puncture Repairs",
                description: "Professional puncture repairs following British Standard guidelines. We assess, repair, and test to ensure your tyre is safe and roadworthy.",
                features: [
                  "45-minute service",
                  "British Standard approved",
                  "Full safety inspection",
                  "Competitive pricing"
                ]
              },
              {
                title: "Tyre Assessment",
                description: "Expert evaluation of tyre damage to determine if a repair is safe and suitable for your specific situation.",
                features: [
                  "Free inspection",
                  "Professional advice",
                  "Safety recommendations",
                  "Honest assessment"
                ]
              },
              {
                title: "Emergency Service",
                description: "Quick response workshop service for urgent tyre repairs at our Marsh Barton facility.",
                features: [
                  "Priority service",
                  "Expert technicians",
                  "Quality repairs",
                  "Safety guaranteed"
                ]
              }
            ].map((service, index) => (
              <div key={index} className="bg-black/20 p-8 rounded-2xl border border-[#3E797F]/20">
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-gray-400 mb-6">{service.description}</p>
                <ul className="space-y-3">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#3E797F]" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Repair Process */}
      <section className="py-20 bg-black/40 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-6">
            <span className="text-[#3E797F]">Our Repair</span>{" "}
            <span className="text-white">Process</span>
          </h2>
          
          <p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto">
            Our professional tyre repair process follows strict safety guidelines to ensure your tyre is repaired correctly.
          </p>

          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: "1",
                title: "Initial Assessment",
                description: "We thoroughly inspect the tyre damage to determine if a repair is possible and safe."
              },
              {
                step: "2",
                title: "Damage Evaluation",
                description: "Our experts assess the type and extent of damage to plan the appropriate repair method."
              },
              {
                step: "3",
                title: "Professional Repair",
                description: "Using industry-approved methods and materials to perform a lasting repair."
              },
              {
                step: "4",
                title: "Safety Testing",
                description: "Comprehensive testing to ensure the repair meets all safety standards."
              }
            ].map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-black/20 p-6 rounded-xl border border-[#3E797F]/20">
                  <div className="absolute -top-4 left-4 bg-[#3E797F] w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold mt-4 mb-3">{step.title}</h3>
                  <p className="text-gray-400 text-sm">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-6">
            <span className="text-[#3E797F]">Repair</span>{" "}
            <span className="text-white">Pricing</span>
          </h2>
          
          <p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto">
            Transparent pricing for all tyre repairs, with no hidden costs.
          </p>

          <div className="max-w-4xl mx-auto bg-black/20 p-8 rounded-2xl border border-[#3E797F]/20">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-6">Standard Repair</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold">From £25</span>
                  <span className="text-gray-400 ml-2">per repair</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#3E797F]" />
                    <span>Professional puncture repair</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#3E797F]" />
                    <span>Tyre inspection</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#3E797F]" />
                    <span>Wheel balance check</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#3E797F]" />
                    <span>Pressure adjustment</span>
                  </li>
                </ul>
              </div>

              <div className="bg-[#3E797F]/10 p-6 rounded-xl">
                <h4 className="font-semibold mb-4">Important Information</h4>
                <ul className="space-y-3 text-sm text-gray-400">
                  <li>• Not all punctures can be repaired safely</li>
                  <li>• Free assessment before any repair work</li>
                  <li>• Repairs follow British Standard guidelines</li>
                  <li>• New tyre recommendations if repair isn't suitable</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Workshop Location */}
      <section id="coverage" className="py-20 bg-black/40 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
            <span className="text-[#3E797F]">Workshop</span>{" "}
            <span className="text-white">Location</span>
          </h2>
          
          <div className="max-w-5xl mx-auto">
            {/* Workshop Only Notice */}
            <div className="bg-[#3E797F]/10 border border-[#3E797F] rounded-xl p-6 mb-12 text-center">
              <h3 className="text-xl font-semibold mb-2">Workshop Service Only</h3>
              <p className="text-gray-400">
                Our professional tyre fitting service is available exclusively at our 
                fully-equipped Marsh Barton facility. We do not offer mobile tyre fitting, 
                ensuring the highest quality service and safety standards.
              </p>
            </div>

            {/* Map Container */}
            <div className="w-full h-[600px] rounded-2xl overflow-hidden">
              <DynamicCoverageMap />
            </div>
            
            <div className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-black/20 p-6 rounded-xl border border-[#3E797F]/20">
                  <h3 className="font-semibold mb-2">Opening Hours</h3>
                  <p className="text-sm text-gray-400">
                    Mon-Fri: 09:00am - 5:30pm<br />
                    Saturday / Sunday: Closed
                  </p>
                </div>
                
                <div className="bg-black/20 p-6 rounded-xl border border-[#3E797F]/20">
                  <h3 className="font-semibold mb-2">Workshop Address</h3>
                  <p className="text-sm text-gray-400">
                    Marsh Barton Trading Estate<br />
                    Exeter, Devon<br />
                    Free customer parking available
                  </p>
                </div>
                
                <div className="bg-black/20 p-6 rounded-xl border border-[#3E797F]/20">
                  <h3 className="font-semibold mb-2">Facilities</h3>
                  <p className="text-sm text-gray-400">
                    Customer waiting area<br />
                    Complimentary refreshments<br />
                    Wi-Fi available
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-6">
            <span className="text-[#3E797F]">Frequently Asked</span>{" "}
            <span className="text-white">Questions</span>
          </h2>
          
          <p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto">
            Find answers to common questions about our tyre repair service in Exeter
          </p>

          <div className="max-w-3xl mx-auto space-y-4">
            <FAQItem 
              question="How long does a tyre repair take in Exeter?"
              answer="Most standard puncture repairs at our Marsh Barton workshop take around 45 minutes. This includes inspection, repair, and safety testing. We aim to get you back on the road as quickly as possible while ensuring all repairs meet safety standards."
            />
            
            <FAQItem 
              question="Do you offer mobile tyre repairs in Exeter?"
              answer="No, we exclusively perform tyre repairs at our Marsh Barton workshop. This allows us to maintain the highest safety standards and use our professional equipment in a controlled environment."
            />
            
            <FAQItem 
              question="How much does a tyre repair cost in Exeter?"
              answer="Our standard puncture repair service is £25, which includes inspection, repair, wheel balance check, and pressure adjustment. We'll always assess your tyre for free first to confirm if a repair is possible and safe."
            />
            
            <FAQItem 
              question="Can all tyre punctures be repaired?"
              answer="No, not all punctures can be safely repaired. Factors like the size and location of the damage determine if a repair is possible. We follow British Standard guidelines to ensure all repairs are safe. If a repair isn't possible, we'll recommend suitable replacement options."
            />
            
            <FAQItem 
              question="What's included in your tyre repair service?"
              answer={
                <div className="space-y-2">
                  <p>Our comprehensive repair service includes:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Initial damage assessment</li>
                    <li>Professional puncture repair</li>
                    <li>Wheel balance check</li>
                    <li>Tyre pressure adjustment</li>
                    <li>Final safety inspection</li>
                  </ul>
                </div>
              }
            />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
} 