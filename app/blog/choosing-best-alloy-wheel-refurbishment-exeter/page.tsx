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
          <div className="absolute inset-0 bg-[url('/blog/choosing-refurb-service.jpg')] bg-cover bg-center">
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
                  Expert Advice
                </span>
                <span className="text-gray-400 text-sm">December 18, 2024</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                How to Choose the Best Alloy Wheel Refurbishment Service in Exeter: A Local's Guide
              </h1>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#3E797F]/20 flex items-center justify-center">
                    <User className="w-6 h-6 text-[#3E797F]" />
                  </div>
                  <div>
                    <div className="font-medium">TEVY Services</div>
                    <div className="text-sm text-gray-400">7 min read</div>
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
                  With multiple options for alloy wheel refurbishment in Exeter, choosing the right 
                  service provider can significantly impact the quality and longevity of your wheel 
                  restoration. This comprehensive guide will help you make an informed decision.
                </p>

                <div className="p-6 bg-[#3E797F]/5 border border-[#3E797F]/20 rounded-xl">
                  <h2 className="text-2xl font-semibold mb-6">Essential Checklist</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-[#3E797F] mb-4">Must-Have Features</h3>
                      <ul className="space-y-3">
                        {[
                          "Professional workshop facility",
                          "Specialist equipment",
                          "Experienced technicians",
                          "Quality guarantees",
                          "Clear pricing structure"
                        ].map((item, index) => (
                          <li key={index} className="flex items-center gap-3 text-gray-300">
                            <svg className="w-5 h-5 text-[#3E797F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#3E797F] mb-4">Warning Signs</h3>
                      <ul className="space-y-3">
                        {[
                          "Unusually low prices",
                          "No physical workshop",
                          "Lack of portfolio",
                          "No clear process",
                          "Poor communication"
                        ].map((item, index) => (
                          <li key={index} className="flex items-center gap-3 text-gray-300">
                            <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h2 className="text-3xl font-bold text-white">
                    <span className="text-[#3E797F]">Key Factors</span> to Consider
                  </h2>
                  
                  <div className="grid gap-6">
                    {[
                      {
                        title: "Equipment and Facilities",
                        content: [
                          "Purpose-built workshop facilities",
                          "Modern diamond cutting equipment",
                          "Professional spray booths",
                          "Wheel balancing machinery"
                        ]
                      },
                      {
                        title: "Experience and Expertise",
                        content: [
                          "Years of experience in Exeter",
                          "Specialist training certifications",
                          "Experience with your wheel type",
                          "Portfolio of previous work"
                        ]
                      },
                      {
                        title: "Service Range",
                        content: [
                          "Diamond cut refurbishment",
                          "Custom colour changes",
                          "Structural repairs",
                          "Mobile services when appropriate"
                        ]
                      }
                    ].map((section, index) => (
                      <div key={index} className="p-6 bg-black/40 rounded-xl border border-gray-800">
                        <h3 className="text-xl font-semibold mb-4">{section.title}</h3>
                        <ul className="grid md:grid-cols-2 gap-3">
                          {section.content.map((item, itemIndex) => (
                            <li key={itemIndex} className="flex items-center gap-2 text-gray-300">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#3E797F]"></span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-8 bg-gradient-to-br from-[#3E797F]/10 to-black/40 rounded-xl border border-[#3E797F]/20">
                  <h2 className="text-2xl font-bold mb-6">Essential Questions to Ask</h2>
                  <div className="space-y-4">
                    {[
                      {
                        question: "What warranty do you offer?",
                        why: "Ensures confidence in service quality"
                      },
                      {
                        question: "Can you provide recent examples?",
                        why: "Demonstrates consistent quality"
                      },
                      {
                        question: "What's your process for complications?",
                        why: "Shows professionalism and reliability"
                      },
                      {
                        question: "How long will the work take?",
                        why: "Helps plan alternative transport"
                      },
                      {
                        question: "What measures prevent corrosion?",
                        why: "Indicates attention to longevity"
                      }
                    ].map((item, index) => (
                      <div key={index} className="flex flex-col gap-2">
                        <h3 className="font-semibold text-white">{item.question}</h3>
                        <p className="text-gray-400 text-sm italic">Why ask: {item.why}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <h2 className="text-3xl font-bold text-white">
                    <span className="text-[#3E797F]">Local</span> Considerations
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      {
                        title: "Location Benefits",
                        items: [
                          "Easy workshop access",
                          "Local reputation",
                          "Community presence",
                          "Quick response times"
                        ]
                      },
                      {
                        title: "Weather Impact",
                        items: [
                          "Coastal air consideration",
                          "Winter protection",
                          "All-weather facilities",
                          "Year-round service"
                        ]
                      }
                    ].map((section, index) => (
                      <div key={index} className="p-6 bg-black/40 rounded-xl border border-gray-800">
                        <h3 className="text-xl font-semibold mb-4">{section.title}</h3>
                        <ul className="space-y-2">
                          {section.items.map((item, itemIndex) => (
                            <li key={itemIndex} className="flex items-center gap-2 text-gray-300">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#3E797F]"></span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-16 p-8 bg-black/40 rounded-xl border border-gray-800">
                  <h2 className="text-2xl font-bold mb-4">Ready for Professional Wheel Refurbishment?</h2>
                  <p className="text-gray-300 mb-6">
                    TEVY Services meets all these criteria and more. We're ready to show you why we're 
                    Exeter's trusted choice for alloy wheel refurbishment.
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