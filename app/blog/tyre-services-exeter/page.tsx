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
                <span className="text-gray-400 text-sm">November 22, 2024</span>
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

        {/* Article Content */}
        <article className="py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto">
              <div className="space-y-12">
                <p className="text-xl text-gray-300 leading-relaxed">
                  If you're looking to restore your alloy wheels in Exeter, you have two main options:
                  **mobile refurbishment** or **workshop-based services**. Each has its advantages, depending 
                  on the damage level, convenience, and cost. Let's break down the key differences to help 
                  you decide the best fit for your needs.
                </p>

                {/* Service Comparison Section */}
                <div className="grid md:grid-cols-2 gap-8">
                  <ServiceCard 
                    title="Mobile Service"
                    icon="mobile"
                    description="Best for minor repairs, convenience, and time-sensitive fixes."
                    benefits={["Minor to moderate damage", "Single wheel repairs", "Convenient locations", "Time-sensitive repairs"]}
                    limitations={["Weather dependent", "Limited repair types", "Basic equipment only", "Space requirements"]}
                  />
                  
                  <ServiceCard 
                    title="Workshop Service"
                    icon="workshop"
                    description="Best for full restorations, multiple wheels, and premium finishes."
                    benefits={["Complete restorations", "Diamond cut finish", "Multiple wheels", "Complex repairs"]}
                    limitations={["Requires transport", "Longer turnaround", "Booking required", "Higher cost"]}
                  />
                </div>

                {/* Choosing the Right Service */}
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold text-white">
                    <span className="text-[#3E797F]">Making</span> Your Choice
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <ChoiceCard 
                      title="Choose Mobile If:"
                      points={["You need convenient repairs", "The damage is minor", "You have a suitable location", "Time is a priority"]}
                    />
                    <ChoiceCard 
                      title="Choose Workshop If:"
                      points={["You want a diamond cut finish", "Multiple wheels need work", "Significant damage exists", "Premium results are a priority"]}
                    />
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
  title: string;
  icon: string;
  description: string;
  benefits: string[];
  limitations: string[];
}

interface ChoiceCardProps {
  title: string;
  points: string[];
}

interface IconProps {
  type: string;
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
      <p className="text-gray-400 mb-4">{description}</p>
      <List title="Perfect For" items={benefits} color="[#3E797F]" />
      <List title="Limitations" items={limitations} color="red-500" />
    </div>
  );
}

// Choice Card Component
function ChoiceCard({ title, points }: ChoiceCardProps) {
  return (
    <div className="p-6 bg-black/40 rounded-xl border border-gray-800">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <ul className="space-y-3">
        {points.map((point, i) => (
          <li key={i} className="text-gray-300">• {point}</li>
        ))}
      </ul>
    </div>
  );
}

// Icon Component
function Icon({ type }: IconProps) {
  if (type === "mobile") return <User className="w-6 h-6 text-[#3E797F]" />;
  if (type === "workshop") return <Calendar className="w-6 h-6 text-[#3E797F]" />;
  return null;
}

// List Component
interface ListProps {
  title: string;
  items: string[];
  color: string;
}

function List({ title, items, color }: ListProps) {
  return (
    <div>
      <h3 className={`text-${color} font-semibold mb-2`}>{title}</h3>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2 text-gray-300">
            <svg className={`w-4 h-4 text-${color}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
