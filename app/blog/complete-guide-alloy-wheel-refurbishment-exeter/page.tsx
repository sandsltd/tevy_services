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
          <div className="absolute inset-0 bg-[url('/blog/alloy-wheel-refurb-exeter.jpg')] bg-cover bg-center">
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
                  Wheel Restoration
                </span>
                <span className="text-gray-400 text-sm">March 20, 2024</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Complete Guide to Alloy Wheel Refurbishment in Exeter: Costs, Process & Options
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
                  Alloy wheel refurbishment in Exeter has evolved significantly over the past decade, 
                  with local specialists now offering services that rival main dealers. Whether your 
                  wheels are scuffed, corroded, or simply in need of a refresh, understanding your 
                  options is crucial for achieving the best results.
                </p>

                <div className="space-y-6">
                  <h2 className="text-3xl font-bold text-white">
                    <span className="text-[#3E797F]">Understanding</span> Refurbishment Costs
                  </h2>
                  <p className="text-gray-300 leading-relaxed">
                    The cost of alloy wheel refurbishment in Exeter varies depending on several factors:
                  </p>
                  <ul className="space-y-4 text-gray-300">
                    <li className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#3E797F]/20 flex items-center justify-center mt-1">
                        <span className="w-2 h-2 rounded-full bg-[#3E797F]"></span>
                      </span>
                      <span>
                        <strong className="text-white">Wheel size:</strong> Typically £70-£120 per wheel for standard refurbishment
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#3E797F]/20 flex items-center justify-center mt-1">
                        <span className="w-2 h-2 rounded-full bg-[#3E797F]"></span>
                      </span>
                      <span>
                        <strong className="text-white">Damage severity:</strong> Minor scuffs vs significant corrosion
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#3E797F]/20 flex items-center justify-center mt-1">
                        <span className="w-2 h-2 rounded-full bg-[#3E797F]"></span>
                      </span>
                      <span>
                        <strong className="text-white">Finish type:</strong> Painted, diamond cut, or custom finishes
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="p-6 bg-[#3E797F]/5 border border-[#3E797F]/20 rounded-xl">
                  <h3 className="text-2xl font-semibold mb-4">Professional Process Breakdown</h3>
                  <div className="space-y-4">
                    {[
                      {
                        step: "1",
                        title: "Assessment",
                        description: "Thorough inspection of damage and wheel condition"
                      },
                      {
                        step: "2",
                        title: "Chemical Stripping",
                        description: "Removal of old finish and corrosion"
                      },
                      {
                        step: "3",
                        title: "Repair Work",
                        description: "Welding, straightening, and crack repairs where needed"
                      },
                      {
                        step: "4",
                        title: "Surface Preparation",
                        description: "Shot blasting and primer application"
                      },
                      {
                        step: "5",
                        title: "Finishing",
                        description: "Paint application or diamond cutting process"
                      }
                    ].map((item, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#3E797F]/20 
                                     text-[#3E797F] flex items-center justify-center font-bold">
                          {item.step}
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
                    <span className="text-[#3E797F]">Available</span> Services
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      {
                        title: "Standard Refinishing",
                        features: ["Full strip and repaint", "Colour matching", "Clear coat protection"]
                      },
                      {
                        title: "Diamond Cutting",
                        features: ["Precision lathing", "Two-tone finish", "Premium result"]
                      },
                      {
                        title: "Custom Finishes",
                        features: ["Bespoke colours", "Special effects", "Unique designs"]
                      },
                      {
                        title: "Repair Services",
                        features: ["Crack repairs", "Straightening", "Welding"]
                      }
                    ].map((service, index) => (
                      <div key={index} className="p-6 bg-black/40 rounded-xl border border-gray-800">
                        <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
                        <ul className="space-y-2">
                          {service.features.map((feature, fIndex) => (
                            <li key={fIndex} className="flex items-center gap-2 text-gray-300">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#3E797F]"></span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-8 bg-gradient-to-br from-[#3E797F]/10 to-black/40 rounded-xl border border-[#3E797F]/20">
                  <h2 className="text-2xl font-bold mb-6">Expert Tips for Long-Lasting Results</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="font-semibold text-[#3E797F]">Maintenance</h3>
                      <ul className="space-y-2 text-gray-300">
                        <li>• Regular cleaning with pH-neutral products</li>
                        <li>• Avoid aggressive chemicals</li>
                        <li>• Prompt attention to any damage</li>
                      </ul>
                    </div>
                    <div className="space-y-4">
                      <h3 className="font-semibold text-[#3E797F]">Prevention</h3>
                      <ul className="space-y-2 text-gray-300">
                        <li>• Careful parking near kerbs</li>
                        <li>• Regular wheel cleaning</li>
                        <li>• Seasonal protection treatments</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="mt-16 p-8 bg-black/40 rounded-xl border border-gray-800">
                  <h2 className="text-2xl font-bold mb-4">Ready to Transform Your Wheels?</h2>
                  <p className="text-gray-300 mb-6">
                    Whether you choose diamond cut or painted finish, our expert team is ready to help. 
                    Check if we cover your area or get in touch for a free consultation.
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
                      Contact Us
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