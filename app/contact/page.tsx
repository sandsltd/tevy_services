import React from 'react'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import { Phone, Mail, MapPin, Clock, MessageCircle, Star } from 'lucide-react'
import { Metadata } from 'next'
import SchemaMarkup from '../components/SchemaMarkup'

export const metadata: Metadata = {
  title: 'Contact Tevy Services Exeter | Alloy Wheel Repair Quotes | Call Now',
  description: 'Contact Tevy Services for alloy wheel repair quotes in Exeter. Call 01392 123456 for same-day service. Unit 10, Marsh Barton Trading Estate.',
  keywords: 'contact tevy services exeter, alloy wheel repair quotes, marsh barton exeter, mobile wheel repair contact',
  openGraph: {
    title: 'Contact Tevy Services | Alloy Wheel Repair Exeter',
    description: 'Get in touch for professional alloy wheel repair services in Exeter. Same-day quotes available.',
    images: [{ url: '/images/contact-og.jpg', width: 1200, height: 630 }],
  },
  alternates: {
    canonical: 'https://www.tevyservices.com/contact'
  }
}

export default function ContactPage() {
  return (
    <>
      <Navigation />
      <SchemaMarkup 
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Contact', path: '/contact' }
        ]}
      />
      
      <main className="min-h-screen bg-gradient-to-b from-black to-gray-900">
        {/* Hero Section */}
        <section className="relative pt-32 pb-16">
          <div className="container mx-auto px-6">
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
                <span className="text-white">Contact</span>{" "}
                <span className="text-[#3E797F]">Tevy Services</span>
              </h1>
              
              <p className="text-xl text-gray-300 mb-8">
                Get in touch for professional alloy wheel repair and tyre services in Exeter. 
                Same-day quotes and mobile service available.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-3 gap-8 mb-16">
                <div className="text-center p-8 bg-black/40 rounded-xl border border-gray-800">
                  <Phone className="w-12 h-12 text-[#3E797F] mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-3 text-white">Call Us</h3>
                  <p className="text-gray-300 mb-4">Speak directly with our team</p>
                  <a 
                    href="tel:01392123456" 
                    className="text-[#3E797F] font-semibold text-lg hover:text-[#3E797F]/80"
                  >
                    01392 123456
                  </a>
                </div>

                <div className="text-center p-8 bg-black/40 rounded-xl border border-gray-800">
                  <Mail className="w-12 h-12 text-[#3E797F] mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-3 text-white">Email Us</h3>
                  <p className="text-gray-300 mb-4">Send us your requirements</p>
                  <a 
                    href="mailto:info@tevyservices.com" 
                    className="text-[#3E797F] font-semibold hover:text-[#3E797F]/80"
                  >
                    info@tevyservices.com
                  </a>
                </div>

                <div className="text-center p-8 bg-black/40 rounded-xl border border-gray-800">
                  <MessageCircle className="w-12 h-12 text-[#3E797F] mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-3 text-white">WhatsApp</h3>
                  <p className="text-gray-300 mb-4">Quick quotes and booking</p>
                  <a 
                    href="https://wa.me/447123456789" 
                    className="text-[#3E797F] font-semibold hover:text-[#3E797F]/80"
                  >
                    Send Message
                  </a>
                </div>
              </div>

              {/* Business Details */}
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h2 className="text-3xl font-bold mb-8">
                    <span className="text-[#3E797F]">Workshop</span> Location
                  </h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <MapPin className="w-6 h-6 text-[#3E797F] flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-white mb-1">Address</h3>
                        <p className="text-gray-300">
                          Unit 10, Marsh Barton Trading Estate<br />
                          Exeter, Devon<br />
                          EX2 8XX
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <Clock className="w-6 h-6 text-[#3E797F] flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-white mb-1">Opening Hours</h3>
                        <div className="text-gray-300 space-y-1">
                          <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
                          <p>Saturday: 9:00 AM - 4:00 PM</p>
                          <p>Sunday: Closed (Emergency callouts available)</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 p-6 bg-[#3E797F]/10 border border-[#3E797F]/20 rounded-xl">
                    <h3 className="text-xl font-semibold mb-3 text-white">Mobile Service Available</h3>
                    <p className="text-gray-300 mb-4">
                      Can't get to us? We'll come to you! Mobile service available 
                      throughout Exeter and surrounding areas.
                    </p>
                    <a 
                      href="tel:01392123456" 
                      className="inline-flex items-center justify-center px-6 py-3 bg-[#3E797F] text-white font-semibold rounded-lg hover:bg-[#3E797F]/90 transition-colors"
                    >
                      <Phone className="w-5 h-5 mr-2" />
                      Book Mobile Service
                    </a>
                  </div>
                </div>

                <div>
                  <h2 className="text-3xl font-bold mb-8">
                    <span className="text-[#3E797F]">Service</span> Areas
                  </h2>
                  
                  <div className="grid grid-cols-2 gap-4 mb-8">
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
                      "Newton Abbot",
                      "Okehampton",
                      "Honiton",
                      "Cullompton",
                      "Sidmouth"
                    ].map((area, index) => (
                      <div key={index} className="flex items-center gap-2 p-3 bg-black/40 rounded-lg border border-gray-800">
                        <MapPin className="w-4 h-4 text-[#3E797F]" />
                        <span className="text-white text-sm">{area}</span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-white">Why Choose Tevy Services?</h3>
                    <ul className="space-y-2 text-gray-300">
                      <li>• 5-star rated service on Google</li>
                      <li>• Same-day service available</li>
                      <li>• Mobile service throughout Devon</li>
                      <li>• Professional diamond cutting equipment</li>
                      <li>• 12-month guarantee on all work</li>
                      <li>• Competitive pricing with free quotes</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Emergency Contact */}
        <section className="py-16 bg-black/40">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">
                <span className="text-[#3E797F]">Emergency</span> Callouts Available
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Stranded with damaged alloys or punctured tyres? 
                We offer emergency callout services throughout Exeter.
              </p>
              <a 
                href="tel:01392123456" 
                className="inline-flex items-center justify-center px-8 py-4 bg-[#3E797F] text-white font-semibold rounded-lg hover:bg-[#3E797F]/90 transition-colors text-xl"
              >
                <Phone className="w-6 h-6 mr-3" />
                Emergency Line: 01392 123456
              </a>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  )
} 