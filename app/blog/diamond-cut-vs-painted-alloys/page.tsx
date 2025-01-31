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
          <div className="absolute inset-0 bg-[url('/blog/diamond-cut-vs-painted.jpg')] bg-cover bg-center">
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
                <span className="text-gray-400 text-sm">March 15, 2024</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Diamond Cut vs Painted Alloys: Making the Right Choice
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
                
                <div className="flex items-center gap-4">
                  <button className="p-2 rounded-full hover:bg-white/5">
                    <Share2 className="w-5 h-5" />
                  </button>
                  <button className="p-2 rounded-full hover:bg-white/5">
                    <Bookmark className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <article className="py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto prose prose-invert prose-lg">
              <div className="relative h-[500px] w-full mb-8 rounded-xl overflow-hidden">
                <Image
                  src="/blog/diamond-cut-vs-painted.jpg"
                  alt="Diamond Cut vs Painted Alloys"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="not-prose mb-12">
                <div className="p-6 bg-[#3E797F]/10 rounded-xl border border-[#3E797F]/20">
                  <h2 className="text-xl font-semibold mb-4">Article Contents</h2>
                  <ul className="space-y-2">
                    <li>
                      <a href="#diamond-cut" className="text-[#3E797F] hover:text-[#3E797F]/80">
                        Diamond Cut Finish
                      </a>
                    </li>
                    <li>
                      <a href="#painted" className="text-[#3E797F] hover:text-[#3E797F]/80">
                        Painted Finish
                      </a>
                    </li>
                    <li>
                      <a href="#decision" className="text-[#3E797F] hover:text-[#3E797F]/80">
                        Making Your Decision
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <h2>Diamond Cut Finish</h2>
              <p>
                Diamond cutting is a precision process that involves using a specialized lathe 
                to remove a thin layer of metal from the wheel's face, creating a pristine, 
                mirror-like finish. This process reveals the raw aluminum beneath, resulting 
                in a distinctive two-tone appearance when combined with painted inner sections.
              </p>

              <h3>Advantages:</h3>
              <ul>
                <li>Premium, factory-quality finish</li>
                <li>Unique metallic shine that painted finishes can't replicate</li>
                <li>Excellent for modern, premium vehicles</li>
                <li>Can increase vehicle value</li>
              </ul>

              <h2>Painted Finish</h2>
              <p>
                A painted finish involves thoroughly preparing the wheel surface, applying 
                primer, and then finishing with high-quality paint and clear coat layers. 
                This versatile option allows for various color choices and finishes.
              </p>

              <h3>Advantages:</h3>
              <ul>
                <li>More durable in harsh conditions</li>
                <li>Easier to maintain</li>
                <li>Wide range of color options</li>
                <li>Generally more cost-effective</li>
                <li>Suitable for all wheel types</li>
              </ul>

              <h2>Making Your Decision</h2>
              <p>
                Consider these factors when choosing between diamond cut and painted finishes:
              </p>

              <ol>
                <li>Original wheel finish</li>
                <li>Vehicle type and value</li>
                <li>Local climate and driving conditions</li>
                <li>Maintenance preferences</li>
                <li>Budget considerations</li>
              </ol>

              <p>
                At TEVY Services, we offer both diamond cut and painted finish options, 
                and our experts can help you make the best choice for your specific situation. 
                Contact us for a consultation and quote today.
              </p>

              <div className="not-prose mt-16 p-8 bg-black/40 rounded-xl border border-gray-800">
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
        </article>
      </main>
      <Footer />
    </>
  )
} 