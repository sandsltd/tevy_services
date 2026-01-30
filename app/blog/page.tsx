import Link from 'next/link'
import Image from 'next/image'
import { Clock, User, ArrowRight, Tag, Calendar } from 'lucide-react'
import Navigation from '@/app/components/Navigation'
import Footer from '@/app/components/Footer'

const blogPosts = [
  {
    slug: 'alloy-wheel-repair-exeter',
    title: 'Alloy Wheel Repair in Exeter: Professional Restoration for Every Type of Damage',
    excerpt: 'From kerb scuffs to diamond cut restoration, discover how professional alloy wheel repair in Exeter can save you hundreds compared to replacement.',
    coverImage: '/blog/alloy-wheel-repair-exeter.png',
    date: 'January 30, 2026',
    author: 'TEVY Services',
    readTime: '7 min read',
    category: 'Wheel Repair',
    featured: true
  },
  {
    slug: 'alloy-wheel-refurbishment-near-me',
    title: 'Alloy Wheel Refurbishment Near Me: Finding Quality Service in Exeter & Devon',
    excerpt: 'Looking for alloy wheel refurbishment near you? Learn what to expect from a professional local service and why going local matters for your wheels.',
    coverImage: '/blog/alloy-wheel-refurbishment-near-me.png',
    date: 'January 30, 2026',
    author: 'TEVY Services',
    readTime: '6 min read',
    category: 'Wheel Refurbishment',
    featured: false
  },
  {
    slug: 'mobile-alloy-wheel-repair-guide',
    title: 'Mobile Alloy Wheel Repair in Exeter: Everything You Need to Know',
    excerpt: 'Discover the benefits of mobile alloy wheel repair in Exeter and Devon. Learn when mobile repair is right for your wheels and what to expect from our convenient doorstep service.',
    coverImage: '/blog/mobile-repair.jpg',
    date: 'December 19, 2025',
    author: 'TEVY Services',
    readTime: '8 min read',
    category: 'Mobile Services',
    featured: false
  },
  {
    slug: 'signs-of-alloy-wheel-damage-exeter',
    title: 'How to Spot Alloy Wheel Damage Before It Gets Worse',
    excerpt: 'Learn how to identify early signs of alloy wheel damage, from scratches and cracks to vibrations. Expert advice on when to seek professional help.',
    coverImage: '/blog/scuffed_alloy.png',
    date: 'May 30, 2025',
    author: 'TEVY Services',
    readTime: '5 min read',
    category: 'Expert Advice',
    featured: false
  },
  {
    slug: 'tyre-services-exeter',
    title: 'Expert Tyre Services in Exeter: Your Complete Guide',
    excerpt: 'Discover professional tyre services in Exeter from TEVY Services. Learn about tyre replacement, repairs, balancing, and why proper tyre maintenance is crucial for your vehicle\'s safety.',
    coverImage: '/blog/tyres_exeter.png',
    date: 'April 30, 2025',
    author: 'TEVY Services',
    readTime: '7 min read',
    category: 'Tyre Services',
    featured: false
  },
  {
    slug: 'complete-guide-alloy-wheel-refurbishment-exeter',
    title: 'Complete Guide to Alloy Wheel Refurbishment in Exeter: Costs, Process & Options',
    excerpt: 'Understand everything about alloy wheel refurbishment in Exeter, from costs and processes to available options. Expert insights from local specialists.',
    coverImage: '/blog/alloy-wheel-refurb-exeter.jpg',
    date: 'March 30, 2025',
    author: 'TEVY Services',
    readTime: '8 min read',
    category: 'Wheel Restoration',
    featured: false
  },
  {
    slug: 'choosing-best-alloy-wheel-refurbishment-exeter',
    title: 'How to Choose the Best Alloy Wheel Refurbishment Service in Exeter: A Local\'s Guide',
    excerpt: 'Learn how to select the perfect wheel refurbishment service in Exeter. Expert tips on what to look for and questions to ask.',
    coverImage: '/blog/choosing-refurb-service.jpg',
    date: 'February 28, 2025',
    author: 'TEVY Services',
    readTime: '7 min read',
    category: 'Expert Advice',
    featured: false
  },
  {
    slug: 'mobile-vs-workshop-alloy-wheel-refurbishment-exeter',
    title: 'Mobile vs Workshop Alloy Wheel Refurbishment in Exeter: Which is Right for You?',
    excerpt: 'Compare mobile and workshop-based wheel refurbishment services in Exeter. Understand the pros, cons, and costs of each option.',
    coverImage: '/blog/mobile-vs-workshop.jpg',
    date: 'January 30, 2025',
    author: 'TEVY Services',
    readTime: '6 min read',
    category: 'Service Comparison',
    featured: false
  }
]

const categories = [
  'Wheel Restoration',
  'Expert Advice',
  'Service Comparison',
  'Industry News',
  'Maintenance Tips',
  'Tyre Services',
  'Mobile Services'
]

export default function BlogPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gradient-to-b from-black to-gray-900">
        {/* Hero Section */}
        <section className="relative py-32 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/blog-hero-bg.jpg')] bg-cover bg-center">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
          </div>
          
          <div className="container mx-auto px-6 relative">
            <h1 className="text-5xl md:text-6xl font-bold text-center mb-6">
              <span className="text-[#3E797F]">TEVY</span> Blog
            </h1>
            <p className="text-gray-300 text-center max-w-2xl mx-auto text-lg">
              Expert insights, industry updates, and practical guides about alloy wheel 
              refurbishment and automotive care in Exeter.
            </p>
          </div>
        </section>

        {/* Categories */}
        <section className="py-8 bg-black/40 backdrop-blur-sm border-y border-gray-800">
          <div className="container mx-auto px-6">
            <div className="flex flex-wrap items-center justify-center gap-4">
              {categories.map((category) => (
                <button
                  key={category}
                  className="px-4 py-2 rounded-full border border-[#3E797F]/30 hover:border-[#3E797F] 
                           text-gray-300 hover:text-white transition-all"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Post */}
        {blogPosts.find(post => post.featured) && (
          <section className="py-20">
            <div className="container mx-auto px-6">
              <h2 className="text-2xl font-semibold mb-8">
                <span className="text-[#3E797F]">Featured</span> Article
              </h2>
              <Link 
                href={`/blog/${blogPosts[0].slug}`}
                className="group grid md:grid-cols-2 gap-8 bg-black/40 rounded-2xl overflow-hidden hover:transform 
                         hover:scale-[1.01] transition-all duration-300 p-6"
              >
                <div className="relative h-[400px] rounded-xl overflow-hidden">
                  <Image
                    src={blogPosts[0].coverImage}
                    alt={blogPosts[0].title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="px-3 py-1 rounded-full bg-[#3E797F]/10 text-[#3E797F] text-sm">
                      {blogPosts[0].category}
                    </span>
                    <span className="flex items-center gap-1 text-gray-400 text-sm">
                      <Clock className="w-4 h-4" />
                      {blogPosts[0].readTime}
                    </span>
                  </div>
                  <h3 className="text-3xl font-bold mb-4 group-hover:text-[#3E797F] transition-colors">
                    {blogPosts[0].title}
                  </h3>
                  <p className="text-gray-400 mb-6">
                    {blogPosts[0].excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-[#3E797F]/20 flex items-center justify-center">
                        <User className="w-5 h-5 text-[#3E797F]" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">{blogPosts[0].author}</div>
                        <div className="text-sm text-gray-400">{blogPosts[0].date}</div>
                      </div>
                    </div>
                    <span className="text-[#3E797F] font-medium flex items-center">
                      Read Article 
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          </section>
        )}

        {/* Latest Posts Grid */}
        <section className="py-20 bg-black/20">
          <div className="container mx-auto px-6">
            <h2 className="text-2xl font-semibold mb-8">
              <span className="text-[#3E797F]">Latest</span> Articles
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post, index) => (
                index !== 0 && (
                  <Link 
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group bg-black/40 rounded-xl overflow-hidden hover:transform 
                             hover:scale-[1.02] transition-all duration-300 border border-gray-800"
                  >
                    <div className="relative h-48 w-full">
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm 
                                       text-[#3E797F] text-sm border border-[#3E797F]/30">
                          {post.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-3 group-hover:text-[#3E797F] transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-gray-400 mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {post.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {post.readTime}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                )
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
} 