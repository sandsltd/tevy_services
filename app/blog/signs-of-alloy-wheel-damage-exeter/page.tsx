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
          <div className="absolute inset-0 bg-[url('/blog/scuffed_alloy.png')] bg-cover bg-center">
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
                <span className="text-gray-400 text-sm">May 30, 2025</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                How to Spot Alloy Wheel Damage Before It Gets Worse
              </h1>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#3E797F]/20 flex items-center justify-center">
                    <User className="w-6 h-6 text-[#3E797F]" />
                  </div>
                  <div>
                    <div className="font-medium">TEVY Services</div>
                    <div className="text-sm text-gray-400">5 min read</div>
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
                  Alloy wheels look stunning — until damage starts to creep in. Chips, scuffs, cracks and vibration issues might seem minor at first, but left untreated, they can lead to serious safety risks and costly repairs.
                </p>

                <div className="p-6 bg-[#3E797F]/5 border border-[#3E797F]/20 rounded-xl">
                  <h2 className="text-2xl font-semibold mb-6">Warning Signs at a Glance</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-[#3E797F] mb-4">Common Damage Signs</h3>
                      <ul className="space-y-3">
                        {[
                          "Visible scratches and scuffs",
                          "Curb rash damage",
                          "Hairline cracks",
                          "Vibrations while driving",
                          "Slow air leaks"
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
                      <h3 className="font-semibold text-[#3E797F] mb-4">Potential Consequences</h3>
                      <ul className="space-y-3">
                        {[
                          "Structural wheel failure",
                          "Decreased wheel lifespan",
                          "Corrosion and rust",
                          "Handling issues",
                          "Costly replacements"
                        ].map((item, index) => (
                          <li key={index} className="flex items-center gap-3 text-gray-300">
                            <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
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
                    <span className="text-[#3E797F]">Key Signs</span> of Wheel Damage
                  </h2>
                  
                  <div className="grid gap-6">
                    {[
                      {
                        title: "1. Visible Scratches, Scuffs or Curb Rash",
                        content: [
                          "Paint deterioration risk",
                          "Entry points for corrosion",
                          "Decreased wheel value",
                          "Aesthetic concerns"
                        ]
                      },
                      {
                        title: "2. Cracks or Splits in the Alloy",
                        content: [
                          "Compromised structural integrity",
                          "Risk of sudden failure",
                          "Air leak potential",
                          "Safety hazard"
                        ]
                      },
                      {
                        title: "3. Vibrations While Driving",
                        content: [
                          "Uneven road contact",
                          "Suspension strain",
                          "Tyre wear issues",
                          "Handling problems"
                        ]
                      },
                      {
                        title: "4. Slow Air Leaks",
                        content: [
                          "Rim seal issues",
                          "Hidden crack indicators",
                          "Pressure maintenance problems",
                          "Performance impact"
                        ]
                      },
                      {
                        title: "5. Paint Peeling or Bubbling",
                        content: [
                          "Underlying corrosion",
                          "Protective layer failure",
                          "Progressive deterioration",
                          "Refurbishment needed"
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
                  <h2 className="text-2xl font-bold mb-6">Our Professional Services</h2>
                  <div className="space-y-4">
                    {[
                      {
                        service: "Expert mobile and workshop refurbishment",
                        benefit: "Convenient options for all situations"
                      },
                      {
                        service: "Comprehensive damage assessment",
                        benefit: "Accurate diagnosis and solution"
                      },
                      {
                        service: "Professional repair techniques",
                        benefit: "Long-lasting, quality results"
                      },
                      {
                        service: "Protective finishing treatments",
                        benefit: "Prevention of future issues"
                      },
                      {
                        service: "Fast turnaround in Exeter",
                        benefit: "Minimize vehicle downtime"
                      }
                    ].map((item, index) => (
                      <div key={index} className="flex flex-col gap-2">
                        <h3 className="font-semibold text-white">{item.service}</h3>
                        <p className="text-gray-400 text-sm italic">Benefit: {item.benefit}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-6 bg-[#3E797F]/5 border border-[#3E797F]/20 rounded-xl">
                  <h2 className="text-2xl font-semibold mb-6">Take Action Today</h2>
                  <p className="text-gray-300 mb-4">
                    Don't wait for minor damage to become a major problem. Contact TEVY Services for:
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Free damage assessment",
                      "Expert repair advice",
                      "Competitive pricing",
                      "Professional service",
                      "Quality guarantees"
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
              </div>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
} 