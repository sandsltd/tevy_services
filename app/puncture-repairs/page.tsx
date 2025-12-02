'use client'
import React, { useState } from 'react'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import { Phone, MapPin, Clock, CheckCircle2, Star, Wrench, Shield, Zap, ChevronDown } from 'lucide-react'
import { Metadata } from 'next'
import SchemaMarkup from '../components/SchemaMarkup'

export const metadata: Metadata = {
  title: 'Puncture Repairs Exeter | £25 Mobile Fix | Call 07572 634898 Now',
  description: 'Got a puncture in Exeter? Mobile puncture repair from £25. Same-day service, we come to you! BS AU159 certified. Marsh Barton workshop. Call 07572 634898.',
  keywords: 'puncture repairs exeter, mobile puncture repair Devon, emergency puncture fix, same day puncture repair, £25 puncture repair',
  openGraph: {
    title: 'Puncture Repairs Exeter | £25 Mobile Service | Tevy Services',
    description: 'Emergency puncture repairs in Exeter from £25. Mobile service or Marsh Barton workshop. Same-day repairs. Call 07572 634898!',
    images: [{ url: '/images/puncture-repair-og.jpg', width: 1200, height: 630 }],
  },
  alternates: {
    canonical: 'https://www.tevyservices.co.uk/puncture-repairs'
  }
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
        <div className="p-6 pt-0 text-gray-300">
          {answer}
        </div>
      </div>
    </div>
  )
}

export default function PunctureRepairs() {
  return (
    <>
      <Navigation />
      <SchemaMarkup 
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Puncture Repairs', path: '/puncture-repairs' }
        ]}
      />
      
      <main className="min-h-screen bg-gradient-to-b from-black to-gray-900">
        {/* Hero Section */}
        <section className="relative pt-32 pb-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent" />
          
          <div className="container mx-auto px-6 relative">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center gap-2 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-[#3E797F] fill-[#3E797F]" />
                  ))}
                </div>
                <span className="text-white/80 text-sm">5.0 Rating • Same Day Service</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="text-white">Fast</span>{" "}
                <span className="text-[#3E797F]">Puncture Repairs</span>{" "}
                <span className="text-white">Exeter</span>
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Professional puncture repairs with same-day service. Mobile service available throughout Exeter. TPMS compatible repairs with 12-month guarantee.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="tel:07572634898" 
                  className="inline-flex items-center justify-center px-8 py-4 bg-[#3E797F] text-white font-semibold rounded-lg hover:bg-[#3E797F]/90 transition-colors"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Emergency Repairs
                </a>
                <a 
                  href="#contact" 
                  className="inline-flex items-center justify-center px-8 py-4 border border-[#3E797F] text-[#3E797F] font-semibold rounded-lg hover:bg-[#3E797F]/10 transition-colors"
                >
                  Book Repair
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Service Types */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">
                <span className="text-[#3E797F]">Professional</span> Puncture Repair Services
              </h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    icon: <Zap className="w-8 h-8" />,
                    title: "Emergency Repairs",
                    description: "Stranded with a flat tyre? We offer emergency puncture repairs throughout Exeter with rapid response times.",
                    price: "From £25"
                  },
                  {
                    icon: <Shield className="w-8 h-8" />,
                    title: "Tubeless Repairs",
                    description: "Professional tubeless tyre repairs using industry-standard patches and plugs. TPMS sensor safe.",
                    price: "From £20"
                  },
                  {
                    icon: <Wrench className="w-8 h-8" />,
                    title: "Mobile Repairs",
                    description: "We come to you! Mobile puncture repairs at your home, workplace, or roadside in Exeter.",
                    price: "From £30"
                  }
                ].map((service, index) => (
                  <div key={index} className="text-center p-6 bg-black/40 rounded-xl border border-gray-800">
                    <div className="flex justify-center mb-4 text-[#3E797F]">
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-white">{service.title}</h3>
                    <p className="text-gray-300 mb-4">{service.description}</p>
                    <div className="text-[#3E797F] font-semibold">{service.price}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 bg-black/40">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">
                <span className="text-white">Why Choose</span> <span className="text-[#3E797F]">Tevy Services?</span>
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                {[
                  {
                    title: "TPMS Compatible",
                    description: "All repairs are TPMS sensor compatible. We ensure your tyre pressure monitoring system continues to work correctly."
                  },
                  {
                    title: "12 Month Guarantee",
                    description: "Every puncture repair comes with our comprehensive 12-month guarantee for complete peace of mind."
                  },
                  {
                    title: "Same Day Service",
                    description: "Most puncture repairs completed the same day. Emergency callouts available for urgent situations."
                  },
                  {
                    title: "Professional Equipment",
                    description: "Using industry-standard tools and materials for long-lasting repairs that meet manufacturer standards."
                  }
                ].map((feature, index) => (
                  <div key={index} className="flex items-start gap-4 p-6 bg-gradient-to-br from-gray-900 to-black rounded-xl border border-gray-800">
                    <CheckCircle2 className="w-6 h-6 text-[#3E797F] flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                      <p className="text-gray-300">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Service Area */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-8">
                <span className="text-[#3E797F]">Puncture Repair</span> Service Areas
              </h2>
              
              <div className="grid md:grid-cols-4 gap-4 mb-8">
                {[
                  "Exeter City Centre",
                  "Marsh Barton",
                  "Heavitree", 
                  "St Thomas",
                  "Whipton",
                  "Pinhoe",
                  "Topsham",
                  "Exminster",
                  "Crediton",
                  "Dawlish",
                  "Teignmouth",
                  "Newton Abbot"
                ].map((area, index) => (
                  <div key={index} className="flex items-center justify-center gap-2 p-3 bg-black/40 rounded-lg border border-gray-800">
                    <MapPin className="w-4 h-4 text-[#3E797F]" />
                    <span className="text-white text-sm">{area}</span>
                  </div>
                ))}
              </div>
              
              <div className="p-6 bg-[#3E797F]/10 border border-[#3E797F]/20 rounded-xl">
                <h3 className="text-xl font-semibold mb-4 text-white">Need Emergency Puncture Repair?</h3>
                <p className="text-gray-300 mb-4">
                  Stuck with a flat tyre? Call us now for rapid response emergency repairs throughout Exeter.
                </p>
                <a 
                  href="tel:07572634898" 
                  className="inline-flex items-center justify-center px-8 py-3 bg-[#3E797F] text-white font-semibold rounded-lg hover:bg-[#3E797F]/90 transition-colors"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Emergency Line: 07572 634898
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-gradient-to-b from-[#0A1A1B] to-[#0F2A2C]">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-[#3E797F] to-[#5BA0A8] bg-clip-text text-transparent">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-300 text-center mb-12 text-lg">
                Everything you need to know about puncture repairs
              </p>

              <div className="space-y-4">
                <FAQItem 
                  question="Can all punctures be repaired?"
                  answer="Not all punctures can be safely repaired. We follow BS AU159 guidelines which specify that punctures in the central 75% of the tyre tread can be repaired if they're under 6mm in diameter. Sidewall damage, large tears, or multiple punctures close together cannot be safely repaired and require tyre replacement."
                />

                <FAQItem 
                  question="How long does a puncture repair take?"
                  answer="A standard puncture repair typically takes 30-45 minutes from start to finish. This includes removing the wheel, inspecting the damage, preparing the area, applying the repair, and refitting the wheel. Our mobile service means we can complete this at your location without any hassle."
                />

                <FAQItem 
                  question="Is a puncture repair permanent?"
                  answer="Yes, when done correctly following BS AU159 standards, a puncture repair is permanent and will last the lifetime of the tyre. Our repairs use a combination patch and plug system that seals from both inside and outside, creating a permanent airtight seal."
                />

                <FAQItem 
                  question="What's the difference between a plug and a proper repair?"
                  answer={
                    <div className="space-y-2">
                      <p>A proper puncture repair involves:</p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Removing the tyre from the wheel</li>
                        <li>Inspecting internal damage</li>
                        <li>Preparing and cleaning the area</li>
                        <li>Applying a combination patch/plug from inside</li>
                        <li>Vulcanizing the repair for a permanent seal</li>
                      </ul>
                      <p className="mt-2">External plug-only repairs are temporary and not BS AU159 compliant.</p>
                    </div>
                  }
                />

                <FAQItem 
                  question="Will a puncture repair affect my tyre warranty?"
                  answer="A professional BS AU159 compliant repair should not affect your tyre warranty. However, it's worth checking with your tyre manufacturer. We provide documentation of all repairs which you can present if needed."
                />

                <FAQItem 
                  question="How much does a puncture repair cost?"
                  answer="Our puncture repairs start from £25 including VAT. This includes the call-out for our mobile service, full inspection, the repair itself, and wheel balancing if required. There are no hidden charges - if we can't repair it safely, we'll only charge a small inspection fee."
                />

                <FAQItem 
                  question="Do you repair run-flat tyres?"
                  answer="Run-flat tyres can sometimes be repaired, but it depends on the specific tyre and how far it was driven while flat. We need to inspect the tyre to determine if repair is safe. If the sidewall structure is compromised, replacement is necessary."
                />

                <FAQItem 
                  question="What areas do you cover for mobile puncture repairs?"
                  answer="We provide mobile puncture repair services throughout Exeter and surrounding areas including Exmouth, Sidmouth, Crediton, Tiverton, Newton Abbot, and Torquay. We can typically reach you within 30-60 minutes for emergency repairs."
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  )
} 