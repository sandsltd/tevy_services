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
          <div className="absolute inset-0 bg-[url('/blog/staff_refurbing_Wheel.JPG')] bg-cover bg-center">
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
                <span className="text-gray-400 text-sm">March 31, 2025</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Mobile Alloy Wheel Repair in Exeter – Fast, Convenient & Professional
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
                  If you've noticed scuffed, dented or cracked alloys on your vehicle — or just want your wheels looking fresh again — our mobile alloy wheel repair service in Exeter is designed to make it easy. At Tevy Services, we bring our expert mobile wheel refurbishment service straight to your driveway or workplace — saving you time while restoring your wheels to a high-quality finish.
                </p>

                <div className="space-y-6">
                  <h2 className="text-3xl font-bold text-white">
                    <span className="text-[#3E797F]">What Is</span> Mobile Alloy Wheel Repair?
                  </h2>
                  <p className="text-gray-300 leading-relaxed">
                    Our mobile alloy wheel repair service means we come to you, fully equipped to repair cosmetic and minor structural damage to your wheels. Our service includes:
                  </p>
                  <ul className="space-y-4 text-gray-300">
                    <li className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#3E797F]/20 flex items-center justify-center mt-1">
                        <span className="w-2 h-2 rounded-full bg-[#3E797F]"></span>
                      </span>
                      <span>
                        <strong className="text-white">Scuffs and scrapes</strong> repair and refinishing
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#3E797F]/20 flex items-center justify-center mt-1">
                        <span className="w-2 h-2 rounded-full bg-[#3E797F]"></span>
                      </span>
                      <span>
                        <strong className="text-white">Kerb damage</strong> restoration
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#3E797F]/20 flex items-center justify-center mt-1">
                        <span className="w-2 h-2 rounded-full bg-[#3E797F]"></span>
                      </span>
                      <span>
                        <strong className="text-white">Paint flaking or peeling</strong> treatment
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#3E797F]/20 flex items-center justify-center mt-1">
                        <span className="w-2 h-2 rounded-full bg-[#3E797F]"></span>
                      </span>
                      <span>
                        <strong className="text-white">Light cracks and dents</strong> repair
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="relative h-[400px] w-full rounded-xl overflow-hidden">
                  <Image
                    src="/blog/mobile_repairs_van.png"
                    alt="Tevy Services mobile alloy wheel repair van"
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-6 bg-[#3E797F]/5 border border-[#3E797F]/20 rounded-xl">
                  <h3 className="text-2xl font-semibold mb-4">Why Choose Our Mobile Service?</h3>
                  <div className="space-y-4">
                    {[
                      {
                        title: "Convenience",
                        description: "We come to your location - home or workplace"
                      },
                      {
                        title: "Professional Equipment",
                        description: "Fully equipped mobile workshop for high-quality repairs"
                      },
                      {
                        title: "Expert Team",
                        description: "Experienced technicians with attention to detail"
                      },
                      {
                        title: "Time-Saving",
                        description: "Most repairs completed in under 90 minutes"
                      },
                      {
                        title: "Honest Service",
                        description: "Clear advice and no pushy upselling"
                      }
                    ].map((item, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#3E797F]/20 
                                     text-[#3E797F] flex items-center justify-center font-bold">
                          {index + 1}
                        </span>
                        <div>
                          <h4 className="font-semibold text-white">{item.title}</h4>
                          <p className="text-gray-300">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <h2 className="text-3xl font-bold text-white">
                    <span className="text-[#3E797F]">Service</span> Areas
                  </h2>
                  <div className="relative h-[300px] w-full rounded-xl overflow-hidden mb-6">
                    <Image
                      src="/blog/alloy_repair_Exeter.png"
                      alt="Exeter Cathedral - we serve the historic city of Exeter and surrounding areas"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className="text-gray-300 leading-relaxed">
                    Our mobile alloy wheel repair service covers Exeter and surrounding areas including:
                  </p>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-6 bg-black/40 rounded-xl border border-gray-800">
                      <h3 className="text-xl font-semibold mb-4">Areas We Cover</h3>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2 text-gray-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#3E797F]"></span>
                          Marsh Barton
                        </li>
                        <li className="flex items-center gap-2 text-gray-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#3E797F]"></span>
                          Newton Abbot
                        </li>
                        <li className="flex items-center gap-2 text-gray-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#3E797F]"></span>
                          Exmouth
                        </li>
                        <li className="flex items-center gap-2 text-gray-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#3E797F]"></span>
                          Tiverton
                        </li>
                        <li className="flex items-center gap-2 text-gray-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#3E797F]"></span>
                          Honiton
                        </li>
                        <li className="flex items-center gap-2 text-gray-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#3E797F]"></span>
                          Mid & East Devon
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-8 bg-gradient-to-br from-[#3E797F]/10 to-black/40 rounded-xl border border-[#3E797F]/20">
                  <h2 className="text-2xl font-bold mb-6">Common Questions About Mobile Repairs</h2>
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="font-semibold text-[#3E797F]">Can mobile repairs fix cracks?</h3>
                      <p className="text-gray-300">
                        Yes — we offer alloy welding for minor cracks where safe to do so. We'll always assess the wheel first to ensure the repair can be done safely and effectively.
                      </p>
                    </div>
                    <div className="space-y-4">
                      <h3 className="font-semibold text-[#3E797F]">What's the turnaround time?</h3>
                      <p className="text-gray-300">
                        Most jobs are completed in under 90 minutes, allowing you to get back on the road quickly with beautifully restored wheels.
                      </p>
                    </div>
                    <div className="space-y-4">
                      <h3 className="font-semibold text-[#3E797F]">What kind of finish can I expect?</h3>
                      <p className="text-gray-300">
                        We aim for a near-factory finish every time. Our painted alloy service covers colour matching and full resprays if required, ensuring your wheels look their best.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-16 p-8 bg-black/40 rounded-xl border border-gray-800">
                  <h2 className="text-2xl font-bold mb-4">Ready for Professional Mobile Wheel Repair?</h2>
                  <p className="text-gray-300 mb-6">
                    Get in touch for a quick quote. Let us know your wheel size and damage type (photos help!), and we'll give you an honest assessment — no pushy upselling, just expert advice.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link 
                      href="/contact"
                      className="inline-block px-6 py-3 bg-[#3E797F] hover:bg-[#3E797F]/90 rounded-lg 
                               font-medium transition-colors text-center"
                    >
                      Get a Quote
                    </Link>
                    <Link 
                      href="/alloy-wheel-refurbishment-process"
                      className="inline-block px-6 py-3 border border-[#3E797F] hover:bg-[#3E797F]/10 
                               rounded-lg font-medium transition-colors text-center"
                    >
                      Learn More About Our Process
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