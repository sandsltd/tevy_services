import Image from 'next/image'
import Link from 'next/link'
import { Clock, User, Calendar, ArrowLeft, Share2, Bookmark } from 'lucide-react'
import Navigation from '@/app/components/Navigation'
import Footer from '@/app/components/Footer'

export default function BlogPost() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gradient-to-b from-black to-gray-900">
        <section className="relative pt-32 pb-16 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/blog/mobile-vs-workshop.jpg')] bg-cover bg-center">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>
          </div>
          
          <div className="container mx-auto px-6 relative">
            <Link 
              href="/blog"
              className="inline-flex items-center text-[#3E797F] hover:text-[#3E797F]/80 mb-8"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>
            
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-4 mb-6">
                <span className="px-3 py-1 rounded-full bg-[#3E797F]/10 text-[#3E797F] text-sm">
                  Service Comparison
                </span>
                <span className="text-gray-400 text-sm">March 24, 2024</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Mobile vs Workshop Alloy Wheel Refurbishment in Exeter: Which is Right for You?
              </h1>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#3E797F]/20 flex items-center justify-center">
                    <User className="w-6 h-6 text-[#3E797F]" />
                  </div>
                  <div>
                    <div className="font-medium">TEVY Services</div>
                    <div className="text-sm text-gray-400">6 min read</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <article className="py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto">
              <div className="space-y-12">
                <p className="text-xl text-gray-300 leading-relaxed">
                  When it comes to alloy wheel refurbishment in Exeter, choosing between mobile and 
                  workshop-based services is a crucial decision. Each option offers distinct advantages 
                  and suits different situations. Let's explore which solution best matches your needs.
                </p>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Service Comparison Cards */}
                  <div className="p-6 bg-gradient-to-b from-[#3E797F]/10 to-black/40 rounded-xl border border-[#3E797F]/20">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-full bg-[#3E797F]/20 flex items-center justify-center">
                        <svg className="w-6 h-6 text-[#3E797F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <h2 className="text-2xl font-bold">Mobile Service</h2>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-[#3E797F] font-semibold mb-2">Perfect For</h3>
                        <ul className="space-y-2">
                          {[
                            "Minor to moderate damage",
                            "Single wheel repairs",
                            "Convenient locations",
                            "Time-sensitive repairs"
                          ].map((item, index) => (
                            <li key={index} className="flex items-center gap-2 text-gray-300">
                              <svg className="w-4 h-4 text-[#3E797F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-[#3E797F] font-semibold mb-2">Limitations</h3>
                        <ul className="space-y-2">
                          {[
                            "Weather dependent",
                            "Limited repair types",
                            "Basic equipment only",
                            "Space requirements"
                          ].map((item, index) => (
                            <li key={index} className="flex items-center gap-2 text-gray-300">
                              <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-gradient-to-b from-[#3E797F]/10 to-black/40 rounded-xl border border-[#3E797F]/20">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-full bg-[#3E797F]/20 flex items-center justify-center">
                        <svg className="w-6 h-6 text-[#3E797F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      <h2 className="text-2xl font-bold">Workshop Service</h2>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-[#3E797F] font-semibold mb-2">Perfect For</h3>
                        <ul className="space-y-2">
                          {[
                            "Complete restorations",
                            "Diamond cut finish",
                            "Multiple wheels",
                            "Complex repairs"
                          ].map((item, index) => (
                            <li key={index} className="flex items-center gap-2 text-gray-300">
                              <svg className="w-4 h-4 text-[#3E797F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-[#3E797F] font-semibold mb-2">Considerations</h3>
                        <ul className="space-y-2">
                          {[
                            "Requires transport",
                            "Longer turnaround",
                            "Booking required",
                            "Higher cost"
                          ].map((item, index) => (
                            <li key={index} className="flex items-center gap-2 text-gray-300">
                              <svg className="w-4 h-4 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                              </svg>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-8 bg-black/40 rounded-xl border border-gray-800">
                  <h2 className="text-2xl font-bold mb-6">Exeter Price Comparison</h2>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-[#3E797F]">Mobile Services</h3>
                      <div className="space-y-3">
                        {[
                          { service: "Minor scuff repairs", price: "£30-£50 per wheel" },
                          { service: "Full wheel repaint", price: "£60-£80 per wheel" },
                          { service: "Kerb damage repair", price: "£40-£60 per wheel" }
                        ].map((item, index) => (
                          <div key={index} className="flex justify-between items-center text-gray-300">
                            <span>{item.service}</span>
                            <span className="font-semibold">{item.price}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-[#3E797F]">Workshop Services</h3>
                      <div className="space-y-3">
                        {[
                          { service: "Standard refurbishment", price: "£70-£90 per wheel" },
                          { service: "Diamond cut finish", price: "£90-£120 per wheel" },
                          { service: "Custom finishes", price: "£80-£150 per wheel" }
                        ].map((item, index) => (
                          <div key={index} className="flex justify-between items-center text-gray-300">
                            <span>{item.service}</span>
                            <span className="font-semibold">{item.price}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h2 className="text-3xl font-bold text-white">
                    <span className="text-[#3E797F]">Making</span> Your Choice
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-6 bg-black/40 rounded-xl border border-gray-800">
                      <h3 className="text-xl font-semibold mb-4">Choose Mobile If:</h3>
                      <ul className="space-y-3">
                        {[
                          "You need convenient repairs",
                          "The damage is minor",
                          "You have a suitable location",
                          "Time is a priority"
                        ].map((item, index) => (
                          <li key={index} className="flex items-center gap-2 text-gray-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#3E797F]"></span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-6 bg-black/40 rounded-xl border border-gray-800">
                      <h3 className="text-xl font-semibold mb-4">Choose Workshop If:</h3>
                      <ul className="space-y-3">
                        {[
                          "You want diamond cut finish",
                          "Multiple wheels need work",
                          "Significant damage exists",
                          "Premium result is priority"
                        ].map((item, index) => (
                          <li key={index} className="flex items-center gap-2 text-gray-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#3E797F]"></span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="mt-16 p-8 bg-black/40 rounded-xl border border-gray-800">
                  <h2 className="text-2xl font-bold mb-4">Get Expert Advice</h2>
                  <p className="text-gray-300 mb-6">
                    Still unsure which service type is best for your wheels? Our team can assess your 
                    needs and recommend the most suitable option. Contact us for a free consultation.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link 
                      href="/services/diamond-cut#coverage"
                      className="inline-block px-6 py-3 bg-[#3E797F] hover:bg-[#3E797F]/90 rounded-lg 
                               font-medium transition-colors text-center"
                    >
                      Check Coverage Area
                    </Link>
                    <Link 
                      href="/contact"
                      className="inline-block px-6 py-3 border border-[#3E797F] hover:bg-[#3E797F]/10 
                               rounded-lg font-medium transition-colors text-center"
                    >
                      Get a Quote
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
} 