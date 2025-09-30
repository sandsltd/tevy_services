'use client'
import React from 'react'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
import { Phone, MapPin, Clock, CheckCircle2, Star, Car, Wrench, Paintbrush, Diamond, Truck, ArrowRight, Anchor } from 'lucide-react'
import SchemaMarkup from '../../components/SchemaMarkup'
import Link from 'next/link'
import Image from 'next/image'

export default function TorquayAlloyWheelRefurbishment() {
  return (
    <>
      <Navigation />
      <SchemaMarkup 
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Locations', path: '/locations' },
          { name: 'Torquay', path: '/locations/torquay' }
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
                <span className="text-white/80 text-sm">5.0 Rating • Serving Torquay & Paignton</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="text-white">Alloy Wheel Refurbishment</span>{" "}
                <span className="text-[#3E797F]">Torquay</span>
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Premium alloy wheel restoration serving Torquay, Paignton, and the English Riviera. 
                Professional mobile service or collection available - restoring wheels to perfection since 2020.
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

        {/* Service Types for Torquay */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">
                <span className="text-[#3E797F]">Professional Service</span> to Torquay & Paignton
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6 mb-12">
                <div className="p-6 bg-black/40 backdrop-blur-sm border border-[#3E797F]/30 rounded-lg">
                  <h3 className="font-bold flex items-center gap-2 text-[#3E797F] text-xl mb-3">
                    <Truck className="w-6 h-6" />
                    Mobile Service Across Torbay
                  </h3>
                  <p className="text-gray-300 mb-4">
                    Our fully equipped mobile unit serves all of Torquay, Paignton and Brixham. 
                    We come to your home, workplace or preferred location - perfect for busy schedules.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-gray-400">
                      <CheckCircle2 className="w-4 h-4 text-[#3E797F]" />
                      Covers entire Torbay area
                    </li>
                    <li className="flex items-center gap-2 text-gray-400">
                      <CheckCircle2 className="w-4 h-4 text-[#3E797F]" />
                      Same day service available
                    </li>
                    <li className="flex items-center gap-2 text-gray-400">
                      <CheckCircle2 className="w-4 h-4 text-[#3E797F]" />
                      No travel to Exeter needed
                    </li>
                  </ul>
                </div>
                
                <div className="p-6 bg-black/40 backdrop-blur-sm border border-[#3E797F]/30 rounded-lg">
                  <h3 className="font-bold flex items-center gap-2 text-[#3E797F] text-xl mb-3">
                    <Car className="w-6 h-6" />
                    Free Collection from Torquay
                  </h3>
                  <p className="text-gray-300 mb-4">
                    We collect your vehicle from anywhere in Torquay or Paignton, complete the work at our 
                    specialist facility, and return the same day. Fully insured transportation.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-gray-400">
                      <CheckCircle2 className="w-4 h-4 text-[#3E797F]" />
                      Free collection & delivery
                    </li>
                    <li className="flex items-center gap-2 text-gray-400">
                      <CheckCircle2 className="w-4 h-4 text-[#3E797F]" />
                      24-hour turnaround
                    </li>
                    <li className="flex items-center gap-2 text-gray-400">
                      <CheckCircle2 className="w-4 h-4 text-[#3E797F]" />
                      Courtesy car available
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
                <span className="text-white">Complete Wheel Services for</span> <span className="text-[#3E797F]">Torquay</span>
              </h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    icon: <Diamond className="w-8 h-8" />,
                    title: "Diamond Cut Restoration",
                    description: "State-of-the-art CNC lathe refinishing. Perfect for premium and luxury vehicles.",
                    price: "From £120 per wheel"
                  },
                  {
                    icon: <Paintbrush className="w-8 h-8" />,
                    title: "Custom Colour Changes",
                    description: "Transform your wheels with custom colours and finishes. Gloss, matte or satin.",
                    price: "From £80 per wheel"
                  },
                  {
                    icon: <Anchor className="w-8 h-8" />,
                    title: "Marine Wheel Service",
                    description: "Specialist treatment for coastal corrosion. Perfect for Torquay's seaside location.",
                    price: "From £90 per wheel"
                  },
                  {
                    icon: <Car className="w-8 h-8" />,
                    title: "Kerb Damage Repair",
                    description: "Expert repair of scuffs and scrapes. Invisible repairs guaranteed.",
                    price: "From £60 per wheel"
                  },
                  {
                    icon: <Wrench className="w-8 h-8" />,
                    title: "Buckle Straightening",
                    description: "Professional wheel straightening service. Restore perfect wheel balance.",
                    price: "From £75 per wheel"
                  },
                  {
                    icon: <CheckCircle2 className="w-8 h-8" />,
                    title: "Split Rim Refurbishment",
                    description: "Specialist service for multi-piece wheels. Full strip down and rebuild.",
                    price: "From £150 per wheel"
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

        {/* Why Choose Us for Torquay */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">
                <span className="text-[#3E797F]">Why Torquay & Paignton Choose</span> <span className="text-white">TEVY Services</span>
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
                        <h3 className="font-semibold text-lg mb-2">Serving the English Riviera</h3>
                        <p className="text-gray-400">
                          Regular service to Torquay, Paignton and Brixham. We understand the unique challenges of coastal wheel care.
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
                        <h3 className="font-semibold text-lg mb-2">Trusted by Torbay Drivers</h3>
                        <p className="text-gray-400">
                          Hundreds of satisfied customers across Torbay. Check our 5-star Google reviews from local drivers.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-[#3E797F]/20 rounded-full flex items-center justify-center">
                          <Diamond className="w-6 h-6 text-[#3E797F]" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Premium Quality Service</h3>
                        <p className="text-gray-400">
                          Perfect for Torquay's luxury and premium vehicles. OEM-quality finishes using latest equipment.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-[#3E797F]/20 rounded-full flex items-center justify-center">
                          <Clock className="w-6 h-6 text-[#3E797F]" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Quick Turnaround</h3>
                        <p className="text-gray-400">
                          Same or next day service for Torquay customers. Mobile service means minimal disruption to your day.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-black/30 rounded-2xl p-8 border border-[#3E797F]/20">
                  <h3 className="text-2xl font-bold mb-6 text-center">
                    <span className="text-[#3E797F]">Torbay</span> Coverage Areas
                  </h3>
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {[
                      "Torquay Centre",
                      "Paignton",
                      "Brixham",
                      "Wellswood",
                      "Babbacombe",
                      "St Marychurch",
                      "Cockington",
                      "Preston",
                      "Shiphay",
                      "Torre",
                      "Chelston",
                      "Livermead",
                      "Goodrington",
                      "Churston"
                    ].map((area, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-[#3E797F] flex-shrink-0" />
                        <span className="text-gray-300">{area}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-gray-400 text-sm text-center mb-6">
                    All TQ1, TQ2, TQ3, TQ4 & TQ5 postcodes covered
                  </p>
                  <a 
                    href="tel:07572634898" 
                    className="w-full bg-[#3E797F] hover:bg-[#3E797F]/90 px-6 py-3 rounded-full text-lg font-semibold transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                  >
                    Book Torquay Service
                    <ArrowRight className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Special Offer for Torquay */}
        <section className="py-16 bg-gradient-to-b from-black/60 to-black">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-[#3E797F]/20 to-black/40 rounded-2xl p-8 border border-[#3E797F]/30">
                <h3 className="text-2xl font-bold text-center mb-4">
                  <span className="text-[#3E797F]">Special Offer</span> for Torbay Customers
                </h3>
                <p className="text-gray-300 text-center mb-6 text-lg">
                  Book 4 wheels and get 10% off total price
                </p>
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-black/30 rounded-lg">
                    <CheckCircle2 className="w-8 h-8 text-[#3E797F] mx-auto mb-2" />
                    <p className="text-sm text-gray-300">Free Collection<br/>from Torquay</p>
                  </div>
                  <div className="text-center p-4 bg-black/30 rounded-lg">
                    <CheckCircle2 className="w-8 h-8 text-[#3E797F] mx-auto mb-2" />
                    <p className="text-sm text-gray-300">12 Month<br/>Guarantee</p>
                  </div>
                  <div className="text-center p-4 bg-black/30 rounded-lg">
                    <CheckCircle2 className="w-8 h-8 text-[#3E797F] mx-auto mb-2" />
                    <p className="text-sm text-gray-300">Same Day<br/>Service</p>
                  </div>
                </div>
                <div className="text-center">
                  <a 
                    href="tel:07572634898" 
                    className="inline-flex items-center justify-center px-8 py-4 bg-[#3E797F] text-white font-bold text-lg rounded-full hover:bg-[#3E797F]/90 transition-all transform hover:scale-105 gap-2"
                  >
                    <Phone className="w-5 h-5" />
                    Claim Offer: 07572 634898
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Recent Work & Testimonials */}
        <section className="py-16 bg-[#706F6F]/10">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-8">
                <span className="text-[#3E797F]">What Torquay Customers</span> <span className="text-white">Say</span>
              </h2>
              
              <div className="space-y-6">
                <div className="bg-black/30 rounded-2xl p-6 border border-[#3E797F]/20">
                  <div className="flex items-center justify-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-[#3E797F] fill-[#3E797F]" />
                    ))}
                  </div>
                  <blockquote className="text-gray-300 italic mb-4">
                    "Fantastic service! They came to my home in Torquay, took the wheels away and brought them back looking brand new. The diamond cut finish is perfect. Highly recommend!"
                  </blockquote>
                  <p className="text-[#3E797F] font-semibold">- Sarah M., Wellswood</p>
                </div>
                
                <div className="bg-black/30 rounded-2xl p-6 border border-[#3E797F]/20">
                  <div className="flex items-center justify-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-[#3E797F] fill-[#3E797F]" />
                    ))}
                  </div>
                  <blockquote className="text-gray-300 italic mb-4">
                    "Living by the coast, my alloys were suffering from corrosion. TEVY Services did an amazing job restoring them. The collection service from Paignton was so convenient."
                  </blockquote>
                  <p className="text-[#3E797F] font-semibold">- David L., Paignton</p>
                </div>
                
                <div className="grid grid-cols-3 gap-6 mt-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#3E797F] mb-2">200+</div>
                    <div className="text-sm text-gray-400">Torbay Customers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#3E797F] mb-2">5.0</div>
                    <div className="text-sm text-gray-400">Google Rating</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#3E797F] mb-2">24hr</div>
                    <div className="text-sm text-gray-400">Turnaround</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-black/40 backdrop-blur-sm" id="coverage">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto bg-black/20 border border-[#3E797F]/20 rounded-2xl p-8">
              <h3 className="text-3xl font-bold mb-4 text-center">
                Get Your <span className="text-[#3E797F]">Torquay</span> Quote Today
              </h3>
              
              <p className="text-gray-400 mb-8 text-center text-lg">
                Serving Torquay, Paignton, Brixham and all of Torbay
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
                  <Truck className="w-4 h-4" />
                  <span>Mobile service</span>
                </div>
                
                <div className="flex items-center justify-center gap-2 text-gray-400">
                  <Car className="w-4 h-4" />
                  <span>Free collection</span>
                </div>
                
                <div className="flex items-center justify-center gap-2 text-gray-400">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Guaranteed quality</span>
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