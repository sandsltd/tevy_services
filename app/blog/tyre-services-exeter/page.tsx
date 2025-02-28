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
          <div className="absolute inset-0 bg-[url('/blog/tyres_exeter.png')] bg-cover bg-center">
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
                <span className="text-gray-400 text-sm">March 28, 2024</span>
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

        <article className="py-12">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto prose prose-invert prose-lg">
              <p className="lead">
                Your vehicle's tyres are the only point of contact between your car and the road, making them one of the most critical safety components. At TEVY Services in Exeter, we provide comprehensive tyre services to ensure your vehicle remains safe, efficient, and performing at its best.
              </p>

              <h2>Why Proper Tyre Maintenance Matters</h2>
              <p>
                Proper tyre maintenance isn't just about avoiding flat tyres – it's about ensuring optimal vehicle performance, fuel efficiency, and most importantly, safety. Worn or improperly inflated tyres can:
              </p>
              <ul>
                <li>Increase stopping distances, especially in wet conditions</li>
                <li>Reduce fuel efficiency, costing you more at the pump</li>
                <li>Compromise handling and stability</li>
                <li>Increase the risk of dangerous blowouts</li>
                <li>Lead to MOT failures</li>
              </ul>

              <div className="my-8 rounded-xl overflow-hidden">
                <Image 
                  src="/blog/tyres_exeter.png"
                  alt="Professional tyre services being performed at TEVY Services in Exeter"
                  width={800}
                  height={500}
                  className="w-full h-auto"
                />
                <p className="text-sm text-center text-gray-400 mt-2">
                  Professional tyre services at TEVY Services Exeter
                </p>
              </div>

              <h2>Comprehensive Tyre Services We Offer in Exeter</h2>
              
              <h3>Tyre Replacement</h3>
              <p>
                Whether you need a single replacement tyre or a complete set, our experienced technicians can help you select the right tyres for your vehicle and driving needs. We stock a wide range of tyres from premium to budget options, all from reputable manufacturers.
              </p>
              <p>
                Our tyre replacement service includes:
              </p>
              <ul>
                <li>Expert advice on the best tyres for your vehicle and driving style</li>
                <li>Professional fitting using state-of-the-art equipment</li>
                <li>Proper disposal of your old tyres in an environmentally friendly manner</li>
                <li>Wheel balancing to ensure smooth driving</li>
              </ul>

              <h3>Tyre Repairs</h3>
              <p>
                Not all tyre damage requires a complete replacement. For minor punctures and damage within the repairable area, our skilled technicians can perform professional repairs that restore your tyre's integrity and extend its lifespan.
              </p>
              <p>
                Our repair process involves:
              </p>
              <ul>
                <li>Thorough inspection to determine if a repair is safe and appropriate</li>
                <li>Professional puncture repair using industry-approved methods</li>
                <li>Re-balancing to ensure optimal performance</li>
                <li>Safety checks before returning your vehicle</li>
              </ul>

              <h3>Wheel Balancing</h3>
              <p>
                Unbalanced wheels can cause vibration, uneven tyre wear, and stress on your vehicle's suspension components. Our precision wheel balancing service ensures your wheels rotate smoothly, providing a comfortable ride and extending the life of your tyres.
              </p>

              <h3>Tyre Pressure Monitoring</h3>
              <p>
                Maintaining correct tyre pressure is essential for safety, performance, and fuel efficiency. We offer tyre pressure checks and adjustments, as well as repairs and replacements for Tyre Pressure Monitoring System (TPMS) sensors.
              </p>

              <h2>Signs You Need Tyre Service</h2>
              <p>
                Be alert to these warning signs that indicate your tyres need professional attention:
              </p>
              <ul>
                <li><strong>Uneven tread wear:</strong> Could indicate alignment or suspension issues</li>
                <li><strong>Bulges or blisters:</strong> Serious safety hazards that require immediate replacement</li>
                <li><strong>Vibration while driving:</strong> Often a sign of unbalanced wheels or alignment problems</li>
                <li><strong>Tread depth below 1.6mm:</strong> The legal minimum in the UK</li>
                <li><strong>Frequent pressure loss:</strong> May indicate a slow puncture or valve issue</li>
              </ul>

              <h2>Why Choose TEVY Services for Tyre Services in Exeter</h2>
              <p>
                At TEVY Services, we pride ourselves on providing exceptional tyre services to Exeter motorists:
              </p>
              <ul>
                <li><strong>Expertise:</strong> Our technicians are fully trained and experienced in all aspects of tyre service</li>
                <li><strong>Quality:</strong> We use only quality tyres and parts from trusted manufacturers</li>
                <li><strong>Transparency:</strong> Clear pricing with no hidden costs</li>
                <li><strong>Convenience:</strong> Quick service with minimal waiting times</li>
                <li><strong>Customer care:</strong> We take the time to explain our recommendations and answer your questions</li>
              </ul>

              <h2>Tyre Services FAQs</h2>
              
              <h3>How often should I replace my tyres?</h3>
              <p>
                Tyres should typically be replaced every 6 years regardless of tread depth due to rubber degradation. However, depending on your driving habits and conditions, you may need to replace them sooner if the tread depth falls below 1.6mm (the legal minimum in the UK). For optimal performance and safety, we recommend considering replacement when tread depth reaches 3mm.
              </p>

              <h3>Can you match a single tyre to my existing ones?</h3>
              <p>
                Yes, we can source individual tyres to match your existing set. However, we recommend replacing tyres in pairs (on the same axle) for optimal handling and safety, especially if your current tyres have significant wear.
              </p>

              <h3>How long does a tyre fitting service take?</h3>
              <p>
                For a standard set of four tyres, our service typically takes 45-60 minutes. This includes removal of old tyres, fitting new ones, balancing, and safety checks. Single tyre replacements or repairs can often be completed in 20-30 minutes.
              </p>

              <h2>Book Your Tyre Service Today</h2>
              <p>
                Don't compromise on safety when it comes to your vehicle's tyres. Contact TEVY Services today to book your professional tyre service in Exeter. Our friendly team is ready to provide expert advice and quality service to keep you safe on the road.
              </p>
              <p>
                Call us on <a href="tel:01392123456" className="text-[#3E797F]">01392 123456</a> or use our online booking system to schedule your appointment.
              </p>

              <div className="flex items-center justify-between mt-12 pt-8 border-t border-gray-800">
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">Share:</span>
                  <button className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
                <button className="flex items-center gap-2 text-[#3E797F] hover:text-[#3E797F]/80">
                  <Bookmark className="w-4 h-4" />
                  Save for later
                </button>
              </div>
            </div>
          </div>
        </article>

        {/* Related Posts */}
        <section className="py-16 bg-black/30">
          <div className="container mx-auto px-6">
            <h2 className="text-2xl font-semibold mb-8">Related Articles</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Link 
                href="/blog/complete-guide-alloy-wheel-refurbishment-exeter"
                className="group bg-black/40 rounded-xl overflow-hidden hover:transform hover:scale-[1.02] transition-all duration-300"
              >
                <div className="relative h-48">
                  <Image
                    src="/blog/alloy-wheel-refurb-exeter.jpg"
                    alt="Complete Guide to Alloy Wheel Refurbishment in Exeter"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-[#3E797F] transition-colors">
                    Complete Guide to Alloy Wheel Refurbishment in Exeter
                  </h3>
                  <p className="text-gray-400 mb-4 line-clamp-2">
                    Understand everything about alloy wheel refurbishment in Exeter, from costs and processes to available options.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">March 20, 2024</span>
                    <span className="text-sm text-[#3E797F]">Read more</span>
                  </div>
                </div>
              </Link>
              
              <Link 
                href="/blog/mobile-vs-workshop-alloy-wheel-refurbishment-exeter"
                className="group bg-black/40 rounded-xl overflow-hidden hover:transform hover:scale-[1.02] transition-all duration-300"
              >
                <div className="relative h-48">
                  <Image
                    src="/blog/mobile-vs-workshop.jpg"
                    alt="Mobile vs Workshop Alloy Wheel Refurbishment in Exeter"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-[#3E797F] transition-colors">
                    Mobile vs Workshop Alloy Wheel Refurbishment
                  </h3>
                  <p className="text-gray-400 mb-4 line-clamp-2">
                    Compare mobile and workshop-based wheel refurbishment services in Exeter. Understand the pros, cons, and costs.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">March 24, 2024</span>
                    <span className="text-sm text-[#3E797F]">Read more</span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
