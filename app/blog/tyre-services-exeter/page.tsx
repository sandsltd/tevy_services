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
        {/* Hero Section */}
        <section className="relative pt-32 pb-16 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/blog/tyre-services.jpg')] bg-cover bg-center">
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
                  Tyre Services
                </span>
                <span className="text-gray-400 text-sm">February 28, 2025</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Expert Tyre Services in Exeter: Your Complete Guide
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

        {/* Article Content */}
        <article className="py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto">
              <div className="space-y-12">
                <p className="text-xl text-gray-300 leading-relaxed">
                  Proper tyre maintenance is crucial for your vehicle's safety, performance, and fuel efficiency. 
                  In Exeter, TEVY Services offers comprehensive tyre solutions to keep your vehicle running 
                  smoothly. This guide explores the essential tyre services you need to know about and why 
                  regular maintenance matters.
                </p>

                {/* Service Comparison Section */}
                <div className="grid md:grid-cols-2 gap-8">
                  <ServiceCard 
                    title="Tyre Replacement"
                    icon="replace"
                    description="Professional tyre fitting service for all vehicle types."
                    benefits={["New tyre installation", "Wide range of brands", "Proper disposal of old tyres", "Expert fitting"]}
                    limitations={["Requires appointment", "May need wheel alignment", "Time for multiple tyres"]}
                  />
                  
                  <ServiceCard 
                    title="Tyre Repair"
                    icon="repair"
                    description="Fix punctures and minor damage to extend tyre life."
                    benefits={["Efficient solution", "Quick service", "Extends tyre lifespan", "Environmentally friendly"]}
                    limitations={["Not suitable for sidewall damage", "Limited repair zones", "Not for severely worn tyres", "Temporary for some damages"]}
                  />
                </div>

                {/* Additional Services Section */}
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold text-white">
                    <span className="text-[#3E797F]">Additional</span> Tyre Services
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <ChoiceCard 
                      title="Wheel Balancing"
                      points={["Eliminates vibration", "Improves ride comfort", "Extends tyre life", "Enhances fuel efficiency"]}
                    />
                    <ChoiceCard 
                      title="Wheel Alignment"
                      points={["Prevents uneven wear", "Improves handling", "Increases fuel economy", "Extends tyre lifespan"]}
                    />
                  </div>
                </div>

                {/* Maxxis Tyres Lifetime Guarantee */}
                <div className="p-8 bg-gradient-to-b from-[#3E797F]/10 to-black/40 rounded-xl border border-[#3E797F]/20">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-[#3E797F]/20 flex items-center justify-center">
                      <svg className="w-6 h-6 text-[#3E797F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold">Maxxis Tyres Lifetime Guarantee</h2>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="flex flex-col md:flex-row gap-8">
                      <div className="md:w-2/3">
                        <h3 className="text-xl font-semibold text-[#3E797F] mb-4">PEACE OF MIND AT NO EXTRA COST</h3>
                        <p className="text-gray-300 mb-4">
                          We are so confident in the quality, reliability and durability of Maxxis products that we have no hesitation in offering a lifetime guarantee if our road tyres are found wanting in terms of manufacture or materials. This confidence is based on the knowledge that Maxxis tyres undergo such a rigorous development process before being brought to market. This cornerstone of Maxxis corporate strategy has been pivotal in its success and continues to raise the bar for standards in the whole industry.
                        </p>
                      </div>
                      <div className="md:w-1/3">
                        <div className="rounded-lg overflow-hidden bg-black/20 h-full flex items-center justify-center p-4">
                          <Image 
                            src="/images/tyre_brands/maxxis_tyres.png" 
                            alt="Maxxis Tyres Logo" 
                            width={250} 
                            height={150}
                            className="object-contain"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-[#3E797F]">THE MAXXIS LIFETIME GUARANTEE</h3>
                      <ul className="space-y-3">
                        {[
                          "Maxxis will replace a road tyre which demonstrates a defect due to the manufacturing process or materials used.",
                          "Maxxis will replace a road tyre which shows irreparable damage resulting from normal road use.",
                          "This lifetime guarantee operates independently of the purchase date and is non-transferable from the party named on the guarantee certificate."
                        ].map((item, index) => (
                          <li key={index} className="flex items-center gap-2 text-gray-300">
                            <svg className="w-5 h-5 text-[#3E797F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            {item}
                          </li>
                        ))}
                      </ul>
                      <p className="text-gray-300 mt-4">
                        This lifetime guarantee does not affect your statutory rights. Replacement is based on dealer assessment where a replacement value is calculated based on the amount of tread used.
                      </p>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-[#3E797F]">HOW TO CLAIM</h3>
                      <p className="text-gray-300">
                        To make a claim under the terms of your Maxxis Lifetime Guarantee, please take your tyre/s to your local Maxxis dealer. (The use of the Guarantee in respect of tyre/s invalidates any further claims).
                      </p>
                      <p className="text-gray-300">
                        The Maxxis Lifetime Guarantee is offered by our UK Distributors, Stapleton's Tyre Services on car, van, 4×4 and van tyres. The Maxxis Lifetime Guarantee is offered by Maxxis International UK plc for road motorcycle tyres listed on this web site.
                      </p>
                    </div>
                    
                    <div className="mt-6">
                      <div className="bg-black/30 rounded-lg p-4">
                        <h4 className="text-lg font-semibold text-[#3E797F] mb-3">The Guarantee Coverage</h4>
                        <p className="text-gray-300 mb-2">
                          1. A tyre with 8mm or more tread remaining will be replaced with a new Maxxis tyre of the same size and type (or corresponding type if range has changed).
                        </p>
                        <p className="text-gray-300">
                          2. Tyres with less than 8mm of the tread remaining will be replaced subject to assessment by the dealer.
                        </p>
                        <p className="text-gray-300 mt-4 italic">
                          Note: Please consult your Maxxis dealer for details.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Why Choose Professional Services */}
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold text-white">
                    <span className="text-[#3E797F]">Why Choose</span> Professional Tyre Services
                  </h2>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <List 
                        title="Safety Benefits"
                        items={[
                          "Proper tread depth ensures grip",
                          "Balanced wheels prevent handling issues",
                          "Correct pressure improves braking",
                          "Professional inspection catches hidden issues"
                        ]}
                        color="text-[#3E797F]"
                      />
                    </div>
                    <div className="space-y-4">
                      <List 
                        title="Performance Benefits"
                        items={[
                          "Improved fuel efficiency",
                          "Smoother, more comfortable ride",
                          "Better handling in all conditions",
                          "Reduced wear on suspension components"
                        ]}
                        color="text-[#3E797F]"
                      />
                    </div>
                  </div>
                </div>

                {/* When to Replace Your Tyres */}
                <div className="p-8 bg-gradient-to-b from-[#3E797F]/10 to-black/40 rounded-xl border border-[#3E797F]/20">
                  <h2 className="text-2xl font-bold mb-6">When to Replace Your Tyres</h2>
                  <div className="space-y-4">
                    <p className="text-gray-300">
                      Even with the best maintenance, tyres eventually need replacement. Look for these warning signs:
                    </p>
                    <ul className="space-y-3">
                      {[
                        "Tread depth below 1.6mm (legal minimum)",
                        "Visible damage like bulges, cuts, or cracks",
                        "Uneven wear patterns",
                        "Vibration while driving",
                        "Tyres more than 5-6 years old"
                      ].map((item, index) => (
                        <li key={index} className="flex items-center gap-2 text-gray-300">
                          <svg className="w-5 h-5 text-[#3E797F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          </svg>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Conclusion */}
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold text-white">
                    <span className="text-[#3E797F]">Contact</span> TEVY Services
                  </h2>
                  <p className="text-gray-300">
                    For professional tyre services in Exeter, TEVY Services offers comprehensive solutions 
                    with expert technicians. Whether you need a simple tyre repair or 
                    a complete set of new tyres, our team ensures your vehicle stays safe and performs at its best.
                  </p>
                  <div className="pt-4">
                    <Link
                      href="/contact"
                      className="inline-flex items-center px-6 py-3 bg-[#3E797F] text-white font-medium rounded-lg hover:bg-[#3E797F]/90 transition"
                    >
                      Book Your Tyre Service
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

// Types for Props
interface ServiceCardProps {
  title: string
  icon: string
  description: string
  benefits: string[]
  limitations: string[]
}

interface ChoiceCardProps {
  title: string
  points: string[]
}

interface IconProps {
  type: string
}

// Service Card Component
function ServiceCard({ title, icon, description, benefits, limitations }: ServiceCardProps) {
  return (
    <div className="p-6 bg-gradient-to-b from-[#3E797F]/10 to-black/40 rounded-xl border border-[#3E797F]/20">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-full bg-[#3E797F]/20 flex items-center justify-center">
          <Icon type={icon} />
        </div>
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>
      <p className="text-gray-300 mb-4">{description}</p>
      <div className="space-y-4">
        <List title="Benefits" items={benefits} color="text-[#3E797F]" />
        <List title="Considerations" items={limitations} color="text-yellow-500" />
      </div>
    </div>
  )
}

// Choice Card Component
function ChoiceCard({ title, points }: ChoiceCardProps) {
  return (
    <div className="p-6 bg-black/40 rounded-xl border border-gray-800">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <ul className="space-y-2">
        {points.map((point, index) => (
          <li key={index} className="flex items-center gap-2 text-gray-300">
            <svg className="w-5 h-5 text-[#3E797F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {point}
          </li>
        ))}
      </ul>
    </div>
  )
}

// Icon Component
function Icon({ type }: IconProps) {
  if (type === "replace") {
    return (
      <svg className="w-6 h-6 text-[#3E797F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    )
  } else if (type === "repair") {
    return (
      <svg className="w-6 h-6 text-[#3E797F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    )
  } else if (type === "mobile") {
    return (
      <svg className="w-6 h-6 text-[#3E797F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    )
  } else if (type === "workshop") {
    return (
      <svg className="w-6 h-6 text-[#3E797F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    )
  } else {
    return (
      <svg className="w-6 h-6 text-[#3E797F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <circle cx="12" cy="12" r="10" strokeWidth="2" />
      </svg>
    )
  }
}

// List Component
interface ListProps {
  title: string
  items: string[]
  color: string
}

function List({ title, items, color }: ListProps) {
  return (
    <div>
      <h3 className={`${color} font-semibold mb-2`}>{title}</h3>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2 text-gray-300">
            <svg className={`w-4 h-4 ${color}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
