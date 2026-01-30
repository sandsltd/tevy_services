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
          <div className="absolute inset-0 bg-[url('/blog/alloy-wheel-repair-exeter.png')] bg-cover bg-center">
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
                  Wheel Repair
                </span>
                <span className="text-gray-400 text-sm">January 30, 2026</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Alloy Wheel Repair in Exeter: Professional Restoration for Every Type of Damage
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
                  Your alloy wheels take a beating. Between Exeter&apos;s narrow streets, tight car parks,
                  and the occasional pothole on the A30, it&apos;s only a matter of time before they pick up
                  some damage. The good news is that most <strong>alloy wheel damage can be repaired</strong> to
                  a standard that looks as good as new — and it costs a fraction of replacing them.
                </p>

                <div className="p-6 bg-[#3E797F]/5 border border-[#3E797F]/20 rounded-xl">
                  <h2 className="text-2xl font-semibold mb-6">Common Types of Alloy Wheel Damage We Repair</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      {
                        title: "Kerb Damage",
                        items: [
                          "Scuffs from parking too close to the kerb",
                          "Gouges from catching a raised edge",
                          "Rim scrapes from tight manoeuvres",
                          "Chipped edges and paint loss"
                        ]
                      },
                      {
                        title: "Surface Damage",
                        items: [
                          "Scratches from road debris",
                          "Brake dust corrosion",
                          "Clear coat peeling or flaking",
                          "Oxidation and discolouration"
                        ]
                      }
                    ].map((section, index) => (
                      <div key={index}>
                        <h3 className="font-semibold text-[#3E797F] mb-4">{section.title}</h3>
                        <ul className="space-y-3">
                          {section.items.map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-gray-300">
                              <svg className="w-5 h-5 text-[#3E797F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
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
                    <span className="text-[#3E797F]">Why Repair</span> Rather Than Replace?
                  </h2>
                  <p className="text-gray-300 leading-relaxed">
                    A single new alloy wheel from a main dealer can easily cost &pound;300 to &pound;800
                    depending on the make and model. A set of four? You&apos;re looking at well over
                    &pound;1,000. Professional alloy wheel repair in Exeter typically costs a fraction
                    of that, and the results are virtually indistinguishable from a brand new wheel.
                  </p>
                  <p className="text-gray-300 leading-relaxed">
                    Beyond the cost savings, repairing your existing wheels is also the more
                    environmentally responsible choice. Manufacturing new alloy wheels requires
                    significant energy and raw materials. Repairing extends the life of what
                    you&apos;ve already got.
                  </p>
                </div>

                <div className="space-y-6">
                  <h2 className="text-3xl font-bold text-white">
                    <span className="text-[#3E797F]">Our Repair</span> Process
                  </h2>
                  <p className="text-gray-300 leading-relaxed">
                    At TEVY Services, we use professional-grade equipment and techniques to
                    restore alloy wheels across Exeter. Here&apos;s what happens when you bring
                    your wheels to us:
                  </p>

                  <div className="space-y-4">
                    {[
                      {
                        step: "1. Assessment",
                        description: "We inspect the damage and advise on the best repair approach. Not all damage is the same — a kerb scuff needs different treatment to corrosion or a crack."
                      },
                      {
                        step: "2. Stripping & Preparation",
                        description: "The damaged area is carefully stripped back, sanded smooth, and prepared for filling. For diamond cut wheels, this involves lathe preparation."
                      },
                      {
                        step: "3. Repair & Reshape",
                        description: "We fill, build up, and reshape the damaged area to match the original profile of the wheel. This step is critical for a seamless finish."
                      },
                      {
                        step: "4. Colour Match & Paint",
                        description: "Using our colour matching system, we match the exact shade of your wheels. Whether it's silver, gunmetal, gloss black, or a custom colour — we get it right."
                      },
                      {
                        step: "5. Clear Coat & Cure",
                        description: "A protective clear lacquer is applied and properly cured to ensure durability and a factory-quality finish that lasts."
                      }
                    ].map((item, index) => (
                      <div key={index} className="p-6 bg-gradient-to-br from-[#3E797F]/10 to-black/40 rounded-xl border border-[#3E797F]/20">
                        <h3 className="font-semibold text-white mb-2">{item.step}</h3>
                        <p className="text-gray-400">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <h2 className="text-3xl font-bold text-white">
                    <span className="text-[#3E797F]">Diamond Cut</span> Alloy Wheel Repair
                  </h2>
                  <p className="text-gray-300 leading-relaxed">
                    Diamond cut alloy wheels have become increasingly popular on modern vehicles.
                    They have a distinctive bright, machined finish that looks stunning but is also
                    more susceptible to damage. Repairing diamond cut wheels requires specialist
                    CNC lathe equipment — not something every repair shop has.
                  </p>
                  <p className="text-gray-300 leading-relaxed">
                    At TEVY Services, we offer full diamond cut alloy wheel repair in Exeter. The
                    wheel is mounted on our precision lathe where a fine layer of alloy is machined
                    away to reveal a fresh, gleaming surface. It&apos;s then sealed with a clear lacquer
                    to protect the finish.
                  </p>
                </div>

                <div className="space-y-6">
                  <h2 className="text-3xl font-bold text-white">
                    <span className="text-[#3E797F]">When Should</span> You Get Your Wheels Repaired?
                  </h2>
                  <p className="text-gray-300 leading-relaxed">
                    The short answer: sooner rather than later. Damaged alloy wheels aren&apos;t just
                    a cosmetic issue. Left untreated, kerb damage exposes bare alloy to the elements,
                    which leads to corrosion. What starts as a small scuff can turn into flaking
                    paint, pitting, and eventually structural weakening of the wheel.
                  </p>
                  <div className="grid md:grid-cols-3 gap-4">
                    {[
                      { title: "Before an MOT", desc: "Damaged wheels can affect tyre seal and cause slow punctures — an MOT failure point." },
                      { title: "Before Selling", desc: "Clean wheels significantly increase perceived vehicle value and help achieve a better price." },
                      { title: "Seasonal Check", desc: "After winter is a great time to assess and repair damage from cold weather and poor road surfaces." }
                    ].map((item, index) => (
                      <div key={index} className="p-6 bg-black/40 rounded-xl border border-gray-800">
                        <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                        <p className="text-gray-400 text-sm">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <h2 className="text-3xl font-bold text-white">
                    <span className="text-[#3E797F]">Alloy Wheel Repair</span> Across Exeter
                  </h2>
                  <p className="text-gray-300 leading-relaxed">
                    We provide alloy wheel repair services across Exeter and the wider Devon area.
                    Whether you&apos;re in Heavitree, St Thomas, Pinhoe, Alphington, or anywhere else
                    in the city, we can help. We also cover Exmouth, Topsham, Crediton, Tiverton,
                    Newton Abbot, and surrounding areas.
                  </p>
                  <p className="text-gray-300 leading-relaxed">
                    We offer both mobile repair for minor cosmetic damage and workshop-based repair
                    for more extensive restoration work, including diamond cut refurbishment.
                  </p>
                </div>

                <div className="mt-16 p-8 bg-black/40 rounded-xl border border-gray-800">
                  <h2 className="text-2xl font-bold mb-4">Need Your Alloy Wheels Repaired?</h2>
                  <p className="text-gray-300 mb-6">
                    Whether it&apos;s a kerb scuff, corrosion, or diamond cut restoration, we&apos;ll
                    get your wheels looking their best. Get in touch for a free, no-obligation quote.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      href="/services/alloy-wheel-repair"
                      className="inline-block px-6 py-3 bg-[#3E797F] hover:bg-[#3E797F]/90 rounded-lg
                               font-medium transition-colors text-center"
                    >
                      View Our Services
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
