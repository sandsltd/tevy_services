import Image from 'next/image'
import Link from 'next/link'
import { Clock, User, Calendar, ArrowLeft } from 'lucide-react'
import Navigation from '@/app/components/Navigation'
import Footer from '@/app/components/Footer'

export default function BlogPost() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gradient-to-b from-black to-gray-900">
        <section className="relative pt-32 pb-16 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/blog/alloy-wheel-refurbishment-near-me.png')] bg-cover bg-center">
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
                  Wheel Refurbishment
                </span>
                <span className="text-gray-400 text-sm">January 30, 2026</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Alloy Wheel Refurbishment Near Me: Finding Quality Service in Exeter &amp; Devon
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
                  Searching for <strong>&quot;alloy wheel refurbishment near me&quot;</strong> usually
                  means one thing: your wheels need attention and you want someone local who can
                  do a proper job. If you&apos;re in Exeter or anywhere across Devon, TEVY Services
                  is exactly what you&apos;re looking for.
                </p>

                <div className="p-6 bg-[#3E797F]/5 border border-[#3E797F]/20 rounded-xl">
                  <h2 className="text-2xl font-semibold mb-6">What Is Alloy Wheel Refurbishment?</h2>
                  <p className="text-gray-300 mb-4">
                    Refurbishment goes beyond a simple repair. It&apos;s a complete restoration of
                    your alloy wheels — stripping them back, repairing any damage, and refinishing
                    them to a factory-fresh standard. The result is wheels that look brand new.
                  </p>
                  <div className="grid md:grid-cols-3 gap-4 mt-6">
                    {[
                      { title: "Painted Finish", desc: "Classic solid colour refinish — silver, gunmetal, gloss black, or any custom shade to match your style." },
                      { title: "Diamond Cut", desc: "Precision-machined on a CNC lathe for that distinctive bright, reflective finish found on modern vehicles." },
                      { title: "Custom Finish", desc: "Two-tone, satin, matte, or bespoke colours to give your vehicle a unique look." }
                    ].map((item, index) => (
                      <div key={index} className="p-4 bg-black/40 rounded-lg border border-gray-800">
                        <h3 className="font-semibold text-[#3E797F] mb-2">{item.title}</h3>
                        <p className="text-gray-400 text-sm">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <h2 className="text-3xl font-bold text-white">
                    <span className="text-[#3E797F]">Why Choose</span> a Local Refurbishment Service?
                  </h2>
                  <p className="text-gray-300 leading-relaxed">
                    There are plenty of alloy wheel refurbishment companies around, but going local
                    has real advantages. With TEVY Services based in Exeter, you get:
                  </p>
                  <ul className="space-y-4">
                    {[
                      { title: "Easy drop-off and collection", desc: "No need to post your wheels across the country or wait days for shipping. Drop them off and pick them up locally." },
                      { title: "See the workshop", desc: "You can visit our premises, see the equipment we use, and speak to the people doing the work. That transparency matters." },
                      { title: "Local reputation", desc: "We rely on word of mouth in the Exeter area. Our reputation depends on doing quality work for our neighbours." },
                      { title: "Mobile option available", desc: "For cosmetic repairs and minor refurbishment, we can come to you — at home or at work across Devon." },
                      { title: "Quick turnaround", desc: "Being local means no postal delays. Most refurbishments are completed and ready for collection within a few days." }
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3 text-gray-300">
                        <svg className="w-5 h-5 text-[#3E797F] mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span><strong>{item.title}:</strong> {item.desc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-6">
                  <h2 className="text-3xl font-bold text-white">
                    <span className="text-[#3E797F]">When Do</span> Wheels Need Refurbishing?
                  </h2>
                  <p className="text-gray-300 leading-relaxed">
                    Alloy wheels don&apos;t last forever without maintenance. Here are the signs
                    that your wheels could benefit from professional refurbishment:
                  </p>
                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      {
                        title: "Cosmetic Signs",
                        items: [
                          "Multiple kerb scuffs and scratches",
                          "Faded or dull finish",
                          "Clear coat peeling or bubbling",
                          "Discolouration or staining"
                        ]
                      },
                      {
                        title: "Practical Signs",
                        items: [
                          "Tyres losing pressure slowly",
                          "Visible corrosion or pitting",
                          "Paint chipping away in chunks",
                          "Planning to sell the vehicle"
                        ]
                      }
                    ].map((section, index) => (
                      <div key={index} className="p-6 bg-black/40 rounded-xl border border-gray-800">
                        <h3 className="text-xl font-semibold mb-4">{section.title}</h3>
                        <ul className="space-y-3">
                          {section.items.map((item, i) => (
                            <li key={i} className="flex items-center gap-2 text-gray-300">
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
                    <span className="text-[#3E797F]">Areas We</span> Cover
                  </h2>
                  <p className="text-gray-300 leading-relaxed">
                    We provide alloy wheel refurbishment services across a wide area of Devon.
                    If you&apos;re searching for <strong>&quot;alloy wheel refurbishment near me&quot;</strong> from
                    any of these locations, we&apos;ve got you covered:
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      'Exeter', 'Exmouth', 'Topsham', 'Crediton',
                      'Tiverton', 'Newton Abbot', 'Torquay', 'Dawlish',
                      'Honiton', 'Sidmouth', 'Okehampton', 'Cullompton'
                    ].map((area) => (
                      <div key={area} className="p-3 bg-black/40 rounded-lg border border-gray-800 text-center text-gray-300 text-sm font-medium">
                        {area}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <h2 className="text-3xl font-bold text-white">
                    <span className="text-[#3E797F]">What to</span> Expect from TEVY Services
                  </h2>
                  <p className="text-gray-300 leading-relaxed">
                    When you choose us for your alloy wheel refurbishment, the process is
                    straightforward:
                  </p>
                  <div className="space-y-4">
                    {[
                      { step: "Get in touch", desc: "Send us photos of your wheels or pop in for an assessment. We'll give you an honest quote with no hidden costs." },
                      { step: "Drop off or book mobile", desc: "Bring your vehicle to us, or for eligible repairs, we'll come to you at a time that works." },
                      { step: "Professional refurbishment", desc: "Your wheels are stripped, repaired, refinished, and sealed using quality materials and proper techniques." },
                      { step: "Quality check & collection", desc: "We inspect every wheel before it leaves. You collect your vehicle with wheels that look factory fresh." }
                    ].map((item, index) => (
                      <div key={index} className="p-6 bg-gradient-to-br from-[#3E797F]/10 to-black/40 rounded-xl border border-[#3E797F]/20">
                        <h3 className="font-semibold text-white mb-2">{index + 1}. {item.step}</h3>
                        <p className="text-gray-400">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-16 p-8 bg-black/40 rounded-xl border border-gray-800">
                  <h2 className="text-2xl font-bold mb-4">Ready to Refurbish Your Wheels?</h2>
                  <p className="text-gray-300 mb-6">
                    Stop searching for &quot;alloy wheel refurbishment near me&quot; — you&apos;ve found
                    us. Get in touch today for a free quote and let&apos;s get your wheels looking
                    their best.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      href="/services/painted-alloys"
                      className="inline-block px-6 py-3 bg-[#3E797F] hover:bg-[#3E797F]/90 rounded-lg
                               font-medium transition-colors text-center"
                    >
                      View Refurbishment Options
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
