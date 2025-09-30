'use client'
import React from 'react'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
import { Phone, MapPin, Clock, CheckCircle2, Star, Car, Wrench, Paintbrush, Diamond, Truck, ArrowRight } from 'lucide-react'
import SchemaMarkup from '../../components/SchemaMarkup'
import Link from 'next/link'
import Image from 'next/image'

export default function NewtonAbbotAlloyWheelRefurbishment() {
  return (
    <>
      <Navigation />
      <SchemaMarkup 
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Locations', path: '/locations' },
          { name: 'Newton Abbot', path: '/locations/newton-abbot' }
        ]}
      />
      
      <main className="min-h-screen bg-black">
        {/* Hero Section */}
        <section className="relative pt-32 pb-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black/80" />
          
          <div className="container mx-auto px-6 relative">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center gap-2 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-[#3E797F] fill-[#3E797F]" />
                  ))}
                </div>
                <span className="text-white/80 text-sm">5.0 Rating • Serving Newton Abbot</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="text-white">Alloy Wheel Refurbishment</span>{" "}
                <span className="text-[#3E797F]">Newton Abbot</span>
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Professional alloy wheel restoration serving Newton Abbot and surrounding areas. 
                Mobile service available - we come to you, or visit our state-of-the-art Marsh Barton facility.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="tel:07572634898" 
                  className="group relative bg-[#3E797F] px-10 py-5 rounded-lg text-xl font-medium transition-all duration-300 flex items-center justify-center gap-3 min-w-[280px] overflow-hidden hover:shadow-[0_0_30px_rgba(62,121,127,0.3)]"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                  <Phone className="w-5 h-5 relative z-10" />
                  <span className="relative z-10">Call For Free Quote</span>
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
                  className="group bg-black/40 backdrop-blur-sm px-10 py-5 rounded-lg text-xl font-medium transition-all duration-300 flex items-center justify-center gap-3 border border-[#3E797F]/20 hover:border-[#3E797F] min-w-[280px] hover:bg-black/60"
                >
                  <span className="relative z-10">Get Instant Quote</span>
                  <MapPin className="w-5 h-5 animate-bounce relative z-10" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Service Types for Newton Abbot */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">
                <span className="text-[#3E797F]">Services Available</span> in Newton Abbot
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6 mb-12">
                <div className="p-6 bg-black/40 backdrop-blur-sm border border-[#3E797F]/30 rounded-lg">
                  <h3 className="font-bold flex items-center gap-2 text-[#3E797F] text-xl mb-3">
                    <Truck className="w-6 h-6" />
                    Mobile Service to Newton Abbot
                  </h3>
                  <p className="text-gray-300 mb-4">
                    We bring our fully equipped mobile unit directly to your Newton Abbot location. 
                    Perfect for busy schedules - we service your wheels at home or work.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-gray-400">
                      <CheckCircle2 className="w-4 h-4 text-[#3E797F]" />
                      Same day service available
                    </li>
                    <li className="flex items-center gap-2 text-gray-400">
                      <CheckCircle2 className="w-4 h-4 text-[#3E797F]" />
                      No need to travel to Exeter
                    </li>
                    <li className="flex items-center gap-2 text-gray-400">
                      <CheckCircle2 className="w-4 h-4 text-[#3E797F]" />
                      Professional results on-site
                    </li>
                  </ul>
                </div>
                
                <div className="p-6 bg-black/40 backdrop-blur-sm border border-[#3E797F]/30 rounded-lg">
                  <h3 className="font-bold flex items-center gap-2 text-[#3E797F] text-xl mb-3">
                    <Car className="w-6 h-6" />
                    Collection & Delivery Service
                  </h3>
                  <p className="text-gray-300 mb-4">
                    We collect your vehicle from Newton Abbot, service at our Marsh Barton workshop, 
                    and deliver back the same day. Full insurance coverage included.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-gray-400">
                      <CheckCircle2 className="w-4 h-4 text-[#3E797F]" />
                      Free collection from Newton Abbot
                    </li>
                    <li className="flex items-center gap-2 text-gray-400">
                      <CheckCircle2 className="w-4 h-4 text-[#3E797F]" />
                      Same day return
                    </li>
                    <li className="flex items-center gap-2 text-gray-400">
                      <CheckCircle2 className="w-4 h-4 text-[#3E797F]" />
                      Fully insured transportation
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16 bg-[#706F6F]/10">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">
                <span className="text-white">Complete Wheel Services for</span> <span className="text-[#3E797F]">Newton Abbot</span>
              </h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    icon: <Diamond className="w-8 h-8" />,
                    title: "Diamond Cut Alloy Repair",
                    description: "Precision CNC lathe restoration for diamond cut wheels. Perfect factory finish.",
                    price: "From £120 per wheel"
                  },
                  {
                    icon: <Paintbrush className="w-8 h-8" />,
                    title: "Alloy Wheel Painting",
                    description: "Full strip and repaint in any color. Custom finishes and color changes available.",
                    price: "From £80 per wheel"
                  },
                  {
                    icon: <Wrench className="w-8 h-8" />,
                    title: "Wheel Straightening",
                    description: "Expert buckle and bend repairs. Restore wheels to perfect balance.",
                    price: "From £75 per wheel"
                  },
                  {
                    icon: <Car className="w-8 h-8" />,
                    title: "Curb Damage Repair",
                    description: "Professional repair of scuffs, scratches and curb damage.",
                    price: "From £60 per wheel"
                  },
                  {
                    icon: <CheckCircle2 className="w-8 h-8" />,
                    title: "Crack & Weld Repairs",
                    description: "TIG welding for cracked wheels. Safety tested and guaranteed.",
                    price: "From £90 per wheel"
                  },
                  {
                    icon: <Clock className="w-8 h-8" />,
                    title: "Same Day Service",
                    description: "Quick turnaround for Newton Abbot customers. Most jobs completed same day.",
                    price: "No extra charge"
                  }
                ].map((service, index) => (
                  <div key={index} className="bg-black/50 backdrop-blur-md p-6 rounded-2xl border border-[#3E797F]/20 hover:border-[#3E797F] transition-all group hover:transform hover:scale-[1.02]">
                    <div className="text-[#3E797F] mb-4 transform group-hover:scale-110 transition-transform duration-300">
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-white">{service.title}</h3>
                    <p className="text-gray-400 mb-4 text-sm">{service.description}</p>
                    <div className="text-[#3E797F] font-semibold">{service.price}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us for Newton Abbot */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">
                <span className="text-[#3E797F]">Why Newton Abbot Chooses</span> <span className="text-white">TEVY Services</span>
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-[#3E797F]/20 rounded-full flex items-center justify-center">
                          <MapPin className="w-6 h-6 text-[#3E797F]" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Local to Newton Abbot</h3>
                        <p className="text-gray-400">
                          Just 20 minutes from Newton Abbot. Quick response times and same-day service available for urgent repairs.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-[#3E797F]/20 rounded-full flex items-center justify-center">
                          <Star className="w-6 h-6 text-[#3E797F]" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">5-Star Rated Service</h3>
                        <p className="text-gray-400">
                          Trusted by Newton Abbot drivers with consistent 5-star reviews. Quality guaranteed on every job.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-[#3E797F]/20 rounded-full flex items-center justify-center">
                          <CheckCircle2 className="w-6 h-6 text-[#3E797F]" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">12 Month Guarantee</h3>
                        <p className="text-gray-400">
                          All work comes with our comprehensive 12-month guarantee. Peace of mind for Newton Abbot customers.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-[#3E797F]/20 rounded-full flex items-center justify-center">
                          <Truck className="w-6 h-6 text-[#3E797F]" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Mobile or Workshop</h3>
                        <p className="text-gray-400">
                          Choose mobile service at your Newton Abbot location, or visit our fully equipped Marsh Barton workshop.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-black/30 rounded-2xl p-8 border border-[#3E797F]/20">
                  <h3 className="text-2xl font-bold mb-6 text-center">
                    <span className="text-[#3E797F]">Newton Abbot</span> Coverage Areas
                  </h3>
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {[
                      "Town Centre",
                      "Milber",
                      "Abbotskerswell",
                      "Ogwell",
                      "Wolborough",
                      "Decoy",
                      "Kingsteignton",
                      "Kingskerswell",
                      "Ipplepen",
                      "Denbury"
                    ].map((area, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-[#3E797F] flex-shrink-0" />
                        <span className="text-gray-300">{area}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-gray-400 text-sm text-center mb-6">
                    Plus all surrounding TQ12 postcodes
                  </p>
                  <a 
                    href="tel:07572634898" 
                    className="w-full bg-[#3E797F] hover:bg-[#3E797F]/90 px-6 py-3 rounded-full text-lg font-semibold transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                  >
                    Book Newton Abbot Service
                    <ArrowRight className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Recent Work */}
        <section className="py-16 bg-[#706F6F]/10">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-8">
                <span className="text-[#3E797F]">Recent Work</span> <span className="text-white">Near Newton Abbot</span>
              </h2>
              
              <div className="bg-black/30 rounded-2xl p-8 border border-[#3E797F]/20">
                <div className="grid grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#3E797F] mb-2">150+</div>
                    <div className="text-sm text-gray-400">Newton Abbot Customers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#3E797F] mb-2">24hr</div>
                    <div className="text-sm text-gray-400">Typical Turnaround</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#3E797F] mb-2">5.0</div>
                    <div className="text-sm text-gray-400">Google Rating</div>
                  </div>
                </div>
                
                <blockquote className="text-gray-300 italic mb-4">
                  "Excellent service! They collected my car from Newton Abbot in the morning and had it back by evening with perfectly restored wheels. Couldn't be happier!"
                </blockquote>
                <p className="text-[#3E797F] font-semibold">- James H., Newton Abbot</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-black/40 backdrop-blur-sm" id="coverage">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto bg-black/20 border border-[#3E797F]/20 rounded-2xl p-8">
              <h3 className="text-3xl font-bold mb-4 text-center">
                Get Your <span className="text-[#3E797F]">Newton Abbot</span> Quote Today
              </h3>
              
              <p className="text-gray-400 mb-8 text-center text-lg">
                Free quotes • Same day service • 12 month guarantee
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <a 
                  href="tel:07572634898" 
                  className="flex items-center justify-center gap-2 px-8 py-4 bg-[#3E797F] hover:bg-[#3E797F]/80 rounded-lg transition-all text-lg font-semibold"
                >
                  <Phone className="w-5 h-5" />
                  <span>07572 634898</span>
                </a>
                
                <Link
                  href="/#coverage" 
                  className="flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 rounded-lg transition-all text-lg font-semibold"
                >
                  <MapPin className="w-5 h-5" />
                  <span>Check Coverage Map</span>
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center justify-center gap-2 text-gray-400">
                  <Clock className="w-4 h-4" />
                  <span>Quick response</span>
                </div>
                
                <div className="flex items-center justify-center gap-2 text-gray-400">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>No obligation quote</span>
                </div>
                
                <div className="flex items-center justify-center gap-2 text-gray-400">
                  <Truck className="w-4 h-4" />
                  <span>Mobile available</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  )
}