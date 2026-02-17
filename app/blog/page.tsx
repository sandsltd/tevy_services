import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { Clock, ArrowRight, Calendar } from "lucide-react";
import Navigation from "@/app/components/Navigation";
import Footer from "@/app/components/Footer";
import { getAllPosts } from "@/src/lib/blog";

export const metadata: Metadata = {
  title: "Alloy Wheel & Tyre Blog Exeter | Expert Tips | TEVY Services",
  description:
    "Expert advice on alloy wheel repair, tyre services & maintenance from Exeter specialists. Guides, tips & industry insights for car owners.",
  keywords:
    "alloy wheel repair blog, wheel refurbishment Exeter, tyre services Exeter, automotive blog, alloy wheel maintenance, car care tips Exeter",
  openGraph: {
    title: "Alloy Wheel & Tyre Services Blog | TEVY Services Exeter",
    description:
      "Professional advice on wheel repair, refurbishment & tyre services from Exeter specialists. Read our expert guides and tips.",
    locale: "en_GB",
    type: "website",
  },
  alternates: {
    canonical: "https://www.tevyservices.co.uk/blog",
  },
};

const categories = [
  "Wheel Repair",
  "Wheel Refurbishment",
  "Wheel Restoration",
  "Expert Advice",
  "Service Comparison",
  "Tyre Services",
  "Mobile Services",
];

export default function BlogPage() {
  const posts = getAllPosts();
  const featuredPost = posts[0];
  const remainingPosts = posts.slice(1);

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
              Expert insights, industry updates, and practical guides about
              alloy wheel refurbishment and automotive care in Exeter.
            </p>
          </div>
        </section>

        {/* Categories */}
        <section className="py-8 bg-black/40 backdrop-blur-sm border-y border-gray-800">
          <div className="container mx-auto px-6">
            <div className="flex flex-wrap items-center justify-center gap-4">
              {categories.map((category) => (
                <span
                  key={category}
                  className="px-4 py-2 rounded-full border border-[#3E797F]/30 text-gray-300 text-sm"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
        </section>

        {posts.length === 0 ? (
          <section className="py-20">
            <div className="container mx-auto px-6 text-center">
              <p className="text-gray-400">
                No posts yet. Check back soon.
              </p>
            </div>
          </section>
        ) : (
          <>
            {/* Featured Post */}
            {featuredPost && (
              <section className="py-20">
                <div className="container mx-auto px-6">
                  <h2 className="text-2xl font-semibold mb-8">
                    <span className="text-[#3E797F]">Featured</span> Article
                  </h2>
                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="group grid md:grid-cols-2 gap-8 bg-black/40 rounded-2xl overflow-hidden hover:transform hover:scale-[1.01] transition-all duration-300 p-6"
                  >
                    {featuredPost.heroImage && (
                      <div className="relative h-[400px] rounded-xl overflow-hidden">
                        <Image
                          src={featuredPost.heroImage}
                          alt={featuredPost.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="flex flex-col justify-center">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="px-3 py-1 rounded-full bg-[#3E797F]/10 text-[#3E797F] text-sm">
                          {featuredPost.category || featuredPost.pillar}
                        </span>
                        {featuredPost.readTime && (
                          <span className="flex items-center gap-1 text-gray-400 text-sm">
                            <Clock className="w-4 h-4" />
                            {featuredPost.readTime}
                          </span>
                        )}
                      </div>
                      <h3 className="text-3xl font-bold mb-4 group-hover:text-[#3E797F] transition-colors">
                        {featuredPost.title}
                      </h3>
                      <p className="text-gray-400 mb-6">
                        {featuredPost.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <time className="text-sm text-gray-400">
                          {new Date(featuredPost.publishedAt).toLocaleDateString(
                            "en-GB",
                            {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            }
                          )}
                        </time>
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
            {remainingPosts.length > 0 && (
              <section className="py-20 bg-black/20">
                <div className="container mx-auto px-6">
                  <h2 className="text-2xl font-semibold mb-8">
                    <span className="text-[#3E797F]">Latest</span> Articles
                  </h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {remainingPosts.map((post) => (
                      <Link
                        key={post.slug}
                        href={`/blog/${post.slug}`}
                        className="group bg-black/40 rounded-xl overflow-hidden hover:transform hover:scale-[1.02] transition-all duration-300 border border-gray-800"
                      >
                        {post.heroImage && (
                          <div className="relative h-48 w-full">
                            <Image
                              src={post.heroImage}
                              alt={post.title}
                              fill
                              className="object-cover"
                            />
                            <div className="absolute top-4 left-4">
                              <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm text-[#3E797F] text-sm border border-[#3E797F]/30">
                                {post.category || post.pillar}
                              </span>
                            </div>
                          </div>
                        )}
                        <div className="p-6">
                          <h3 className="text-xl font-semibold mb-3 group-hover:text-[#3E797F] transition-colors">
                            {post.title}
                          </h3>
                          <p className="text-gray-400 mb-4 line-clamp-2">
                            {post.description}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-gray-400">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {new Date(post.publishedAt).toLocaleDateString(
                                "en-GB",
                                {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                }
                              )}
                            </span>
                            {post.readTime && (
                              <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {post.readTime}
                              </span>
                            )}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </section>
            )}
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
