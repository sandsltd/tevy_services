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
          <div className="absolute inset-0 bg-[url('/blog/mobile-repair.jpg')] bg-cover bg-center">
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
                  Mobile Services
                </span>
                <span className="text-gray-400 text-sm">December 19, 2024</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Mobile Alloy Wheel Repair in Exeter: Everything You Need to Know
              </h1>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#3E797F]/20 flex items-center justify-center">
                    <User className="w-6 h-6 text-[#3E797F]" />
                  </div>
                  <div>
                    <div className="font-medium">TEVY Services</div>
                    <div className="text-sm text-gray-400">8 min read</div>
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
                  Life in Devon keeps us busy, and finding time to drop your car off at a workshop
                  can feel like an impossible task. That&apos;s where mobile alloy wheel repair comes in—bringing
                  professional wheel refurbishment directly to your doorstep in Exeter and throughout Devon.
                </p>

                <div className="p-6 bg-[#3E797F]/5 border border-[#3E797F]/20 rounded-xl">
                  <h2 className="text-2xl font-semibold mb-6">Why Choose Mobile Repair?</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-[#3E797F] mb-4">Key Benefits</h3>
                      <ul className="space-y-3">
                        {[
                          "No need to arrange alternative transport",
                          "Watch the work being done",
                          "Repairs at your home or workplace",
                          "Same quality as workshop repairs",
                          "Flexible scheduling options"
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
                      <h3 className="font-semibold text-[#3E797F] mb-4">Perfect For</h3>
                      <ul className="space-y-3">
                        {[
                          "Minor kerb damage repairs",
                          "Scuff and scratch removal",
                          "Touch-ups and cosmetic fixes",
                          "Busy professionals",
                          "Multiple wheel repairs"
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

                <div className="space-y-6">
                  <h2 className="text-3xl font-bold text-white">
                    <span className="text-[#3E797F]">Understanding</span> Mobile Wheel Repair
                  </h2>

                  <p className="text-gray-300 leading-relaxed">
                    Mobile alloy wheel repair has revolutionised the way vehicle owners in Exeter
                    maintain their wheels. Rather than spending hours at a workshop, you can have
                    professional repairs carried out whilst you continue with your day—whether
                    that&apos;s working from home, at the office, or even whilst doing the weekly shop.
                  </p>

                  <p className="text-gray-300 leading-relaxed">
                    Our mobile technicians arrive fully equipped with all the tools, paints, and
                    materials needed to restore your alloy wheels to their former glory. We use
                    the same high-quality products and techniques as traditional workshops, ensuring
                    your wheels receive the professional treatment they deserve.
                  </p>
                </div>

                <div className="space-y-6">
                  <h2 className="text-3xl font-bold text-white">
                    <span className="text-[#3E797F]">What Can</span> Be Repaired?
                  </h2>

                  <div className="grid gap-6">
                    {[
                      {
                        title: "Kerb Damage",
                        content: [
                          "Light to moderate scuffs",
                          "Scratches and scrapes",
                          "Minor rim damage",
                          "Paint chips and marks"
                        ]
                      },
                      {
                        title: "Cosmetic Issues",
                        content: [
                          "Faded or discoloured finish",
                          "Surface corrosion spots",
                          "Clear coat peeling",
                          "Brake dust staining"
                        ]
                      },
                      {
                        title: "Touch-Up Work",
                        content: [
                          "Colour matching repairs",
                          "Small area refinishing",
                          "Lacquer restoration",
                          "Edge protection"
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
                  <h2 className="text-2xl font-bold mb-6">The Mobile Repair Process</h2>
                  <div className="space-y-4">
                    {[
                      {
                        step: "1. Initial Assessment",
                        description: "We examine your wheels and provide an accurate quote"
                      },
                      {
                        step: "2. Preparation",
                        description: "Thorough cleaning and sanding of the damaged area"
                      },
                      {
                        step: "3. Repair Work",
                        description: "Filling, shaping, and smoothing any damage"
                      },
                      {
                        step: "4. Colour Matching",
                        description: "Precise paint matching to your wheel&apos;s original finish"
                      },
                      {
                        step: "5. Finishing",
                        description: "Application of protective clear coat and final polish"
                      }
                    ].map((item, index) => (
                      <div key={index} className="flex flex-col gap-2">
                        <h3 className="font-semibold text-white">{item.step}</h3>
                        <p className="text-gray-400">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <h2 className="text-3xl font-bold text-white">
                    <span className="text-[#3E797F]">Mobile vs</span> Workshop Repairs
                  </h2>
                  <p className="text-gray-300 leading-relaxed">
                    Whilst mobile repair offers tremendous convenience, it&apos;s important to understand
                    when each option is most appropriate. Mobile services excel for cosmetic repairs,
                    minor damage, and touch-up work. However, for more extensive damage, structural
                    issues, or diamond cut wheel refurbishment, our workshop facilities provide the
                    controlled environment and specialist equipment needed for the best results.
                  </p>
                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      {
                        title: "Choose Mobile For",
                        items: [
                          "Convenience and time-saving",
                          "Minor cosmetic repairs",
                          "Touch-ups and refreshes",
                          "Busy schedules"
                        ]
                      },
                      {
                        title: "Choose Workshop For",
                        items: [
                          "Diamond cut refurbishment",
                          "Structural damage",
                          "Full wheel restoration",
                          "Colour changes"
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

                <div className="space-y-6">
                  <h2 className="text-3xl font-bold text-white">
                    <span className="text-[#3E797F]">Coverage</span> Areas
                  </h2>
                  <p className="text-gray-300 leading-relaxed">
                    Our mobile alloy wheel repair service covers Exeter and the surrounding Devon
                    area. Whether you&apos;re in the city centre, the suburbs, or nearby towns, we can
                    come to you. We service areas including Exmouth, Topsham, Crediton, Tiverton,
                    and everywhere in between.
                  </p>
                </div>

                <div className="p-8 bg-[#3E797F]/10 rounded-xl border border-[#3E797F]/30">
                  <p className="text-gray-300 text-center italic">
                    From all of us at TEVY Services, we wish you and your family a very Merry
                    Christmas and a Happy New Year! Thank you for your continued support throughout
                    2024—here&apos;s to keeping your wheels looking fantastic in 2025!
                  </p>
                </div>

                <div className="mt-16 p-8 bg-black/40 rounded-xl border border-gray-800">
                  <h2 className="text-2xl font-bold mb-4">Ready for Convenient Mobile Repair?</h2>
                  <p className="text-gray-300 mb-6">
                    Don&apos;t let wheel damage wait. Our mobile service brings professional alloy wheel
                    repair directly to your door in Exeter and throughout Devon. Get in touch today
                    for a free, no-obligation quote.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      href="/services/alloy-wheel-repair#coverage"
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
                      Get a Free Quote
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
