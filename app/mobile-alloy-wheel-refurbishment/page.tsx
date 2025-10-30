import React from 'react'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import { Phone, MapPin, Clock, CheckCircle2, Star, Car, Wrench, Paintbrush } from 'lucide-react'
import { Metadata } from 'next'
import SchemaMarkup from '../components/SchemaMarkup'

export const metadata: Metadata = {
  title: 'Mobile Alloy Wheel Refurbishment Exeter | Diamond Cut & Repair | Tevy Services',
  description: 'Expert mobile alloy wheel refurbishment in Exeter. Professional diamond cutting, painting & scuff repairs at your location. 5-star rated, same-day service available.',
  keywords: 'mobile alloy wheel refurbishment exeter, alloy wheel refurbishment exeter, mobile wheel repair exeter, diamond cut refurbishment exeter',
  openGraph: {
    title: 'Mobile Alloy Wheel Refurbishment Exeter | On-Site Service',
    description: 'Professional mobile alloy wheel refurbishment in Exeter. We come to you! Free quotes, same-day service.',
    images: [{ url: '/images/mobile-service-og.jpg', width: 1200, height: 630 }],
  },
  alternates: {
    canonical: 'https://www.tevyservices.co.uk/mobile-alloy-wheel-refurbishment'
  }
}

export default function MobileAlloyWheelRefurbishment() {
  return (
    <>
      <Navigation />
      <SchemaMarkup 
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Mobile Alloy Wheel Refurbishment', path: '/mobile-alloy-wheel-refurbishment' }
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
                <span className="text-white/80 text-sm">5.0 Rating • Mobile Service</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="text-white">Mobile Alloy Wheel</span>{" "}
                <span className="text-[#3E797F]">Refurbishment</span>{" "}
                <span className="text-white">Exeter</span>
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Exeter's premier mobile alloy wheel refurbishment service. Professional diamond cutting, painting and repairs at your location. No need to travel - we bring our fully equipped mobile workshop to your home or workplace across Exeter and surrounding areas.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="tel:07572634898" 
                  className="inline-flex items-center justify-center px-8 py-4 bg-[#3E797F] text-white font-semibold rounded-lg hover:bg-[#3E797F]/90 transition-colors"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call For Free Quote
                </a>
                <a 
                  href="#contact" 
                  className="inline-flex items-center justify-center px-8 py-4 border border-[#3E797F] text-[#3E797F] font-semibold rounded-lg hover:bg-[#3E797F]/10 transition-colors"
                >
                  Get Instant Quote
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Service Benefits */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">
                <span className="text-[#3E797F]">Why Choose</span> Our Mobile Service?
              </h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    icon: <Car className="w-8 h-8" />,
                    title: "We Come To You",
                    description: "No need to take time off work or arrange transport. We service your wheels at your home, office, or preferred location."
                  },
                  {
                    icon: <Clock className="w-8 h-8" />,
                    title: "Same Day Service",
                    description: "Book today, serviced today. Most mobile refurbishments completed within 2-3 hours on-site."
                  },
                  {
                    icon: <CheckCircle2 className="w-8 h-8" />,
                    title: "Fully Equipped",
                    description: "Our mobile units carry everything needed for professional wheel refurbishment including diamond cutting equipment."
                  }
                ].map((benefit, index) => (
                  <div key={index} className="text-center p-6 bg-black/40 rounded-xl border border-gray-800">
                    <div className="flex justify-center mb-4 text-[#3E797F]">
                      {benefit.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-white">{benefit.title}</h3>
                    <p className="text-gray-300">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Services Offered */}
        <section className="py-16 bg-black/40">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">
                <span className="text-white">Mobile</span> <span className="text-[#3E797F]">Services Available</span>
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                {[
                  {
                    icon: <Paintbrush className="w-6 h-6" />,
                    title: "Mobile Diamond Cutting",
                    description: "Professional diamond cutting using our mobile CNC lathe. Precision results at your location.",
                    price: "From £120 per wheel"
                  },
                  {
                    icon: <Wrench className="w-6 h-6" />,
                    title: "Mobile Wheel Painting",
                    description: "Complete strip, prime and paint service. Any colour, any finish, done on-site.",
                    price: "From £80 per wheel"
                  },
                  {
                    icon: <Car className="w-6 h-6" />,
                    title: "Mobile Scuff Repairs",
                    description: "Quick scuff and scratch repairs without removing your wheels. Ready to drive immediately.",
                    price: "From £40 per wheel"
                  },
                  {
                    icon: <CheckCircle2 className="w-6 h-6" />,
                    title: "Mobile Crack Repairs",
                    description: "Professional crack repairs and welding services using portable equipment.",
                    price: "From £60 per wheel"
                  }
                ].map((service, index) => (
                  <div key={index} className="p-6 bg-gradient-to-br from-gray-900 to-black rounded-xl border border-gray-800">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="text-[#3E797F]">{service.icon}</div>
                      <h3 className="text-xl font-semibold text-white">{service.title}</h3>
                    </div>
                    <p className="text-gray-300 mb-4">{service.description}</p>
                    <div className="text-[#3E797F] font-semibold">{service.price}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Coverage Area */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-8">
                <span className="text-[#3E797F]">Mobile Service</span> Coverage Area
              </h2>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {[
                  "Exeter City Centre",
                  "Marsh Barton",
                  "Heavitree",
                  "St Thomas", 
                  "Whipton",
                  "Pinhoe",
                  "Topsham",
                  "Exminster",
                  "Crediton"
                ].map((area, index) => (
                  <div key={index} className="flex items-center justify-center gap-2 p-3 bg-black/40 rounded-lg border border-gray-800">
                    <MapPin className="w-4 h-4 text-[#3E797F]" />
                    <span className="text-white">{area}</span>
                  </div>
                ))}
              </div>
              
              <p className="text-gray-300 mb-8">
                We also service surrounding areas within 15 miles of Exeter. Call us to confirm coverage for your location.
              </p>
              
              <div className="p-6 bg-[#3E797F]/10 border border-[#3E797F]/20 rounded-xl">
                <h3 className="text-xl font-semibold mb-4 text-white">Book Your Mobile Service Today</h3>
                <p className="text-gray-300 mb-4">
                  Free quotes • Same day service • Fully insured • 12 month guarantee
                </p>
                <a 
                  href="tel:07572634898" 
                  className="inline-flex items-center justify-center px-8 py-3 bg-[#3E797F] text-white font-semibold rounded-lg hover:bg-[#3E797F]/90 transition-colors"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now: 07572 634898
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  )
} 