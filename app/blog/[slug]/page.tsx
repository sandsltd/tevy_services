import { MDXRemote } from "next-mdx-remote/rsc";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Navigation from "@/app/components/Navigation";
import Footer from "@/app/components/Footer";
import { getPostBySlug, getAllSlugs, getRelatedPosts } from "@/src/lib/blog";

const categoryLabels: Record<string, string> = {
  "alloy-repair": "Alloy Repair",
  "tyre-services": "Tyre Services",
  general: "General",
};

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.title} | TEVY Services Blog`,
    description: post.description,
    keywords: post.keywords,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.publishedAt,
      url: `https://www.tevyservices.co.uk/blog/${slug}`,
      ...(post.heroImage ? { images: [post.heroImage] } : {}),
    },
    alternates: {
      canonical: `https://www.tevyservices.co.uk/blog/${slug}`,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    author: {
      "@type": "Organization",
      name: "TEVY Services",
      url: "https://www.tevyservices.co.uk",
    },
    publisher: {
      "@type": "Organization",
      name: "TEVY Services",
      url: "https://www.tevyservices.co.uk",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.tevyservices.co.uk/blog/${slug}`,
    },
    keywords: post.keywords?.join(", "),
  };

  const relatedPosts = getRelatedPosts(slug, post.keywords || []);

  return (
    <>
      <Navigation />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-gradient-to-b from-black to-gray-900">
        {/* Hero Section */}
        <section className="relative pt-32 pb-16 overflow-hidden">
          {post.heroImage && (
            <div className="absolute inset-0">
              <Image
                src={post.heroImage}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>
            </div>
          )}

          <div className="container mx-auto px-6 relative">
            <Link
              href="/blog"
              className="inline-flex items-center text-[#3E797F] hover:text-[#3E797F]/80 mb-8"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Blog
            </Link>

            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-4 mb-6">
                <span className="px-3 py-1 rounded-full bg-[#3E797F]/10 text-[#3E797F] text-sm">
                  {post.category ||
                    categoryLabels[post.pillar] ||
                    post.pillar}
                </span>
                <time className="text-gray-400 text-sm">
                  {new Date(post.publishedAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </time>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {post.title}
              </h1>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#3E797F]/20 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-[#3E797F]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <div>
                  <div className="font-medium">{post.author}</div>
                  {post.readTime && (
                    <div className="text-sm text-gray-400">{post.readTime}</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <article className="py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto prose prose-invert prose-lg prose-headings:font-bold prose-headings:text-white prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-p:text-gray-300 prose-p:leading-relaxed prose-li:text-gray-300 prose-strong:text-white prose-a:text-[#3E797F] prose-a:underline hover:prose-a:text-[#3E797F]/80 prose-ul:my-4 prose-ol:my-4">
              <MDXRemote source={post.content} />
            </div>
          </div>
        </article>

        {/* CTA Section */}
        <div className="container mx-auto px-6 pb-20">
          <div className="max-w-3xl mx-auto p-8 bg-black/40 rounded-xl border border-gray-800">
            <h2 className="text-2xl font-bold mb-4">
              Need Professional Wheel or Tyre Services?
            </h2>
            <p className="text-gray-300 mb-6">
              TEVY Services offers expert alloy wheel repair, diamond cut
              refurbishment, and tyre services across Exeter and Devon. Get in
              touch for a free, no-obligation quote.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/#booking"
                className="inline-block px-6 py-3 bg-[#3E797F] hover:bg-[#3E797F]/90 rounded-lg font-medium transition-colors text-center"
              >
                Get a Free Quote
              </Link>
              <Link
                href="/contact"
                className="inline-block px-6 py-3 border border-[#3E797F] hover:bg-[#3E797F]/10 rounded-lg font-medium transition-colors text-center"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <div className="container mx-auto px-6 pb-20">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-xl font-bold mb-6">Related Articles</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {relatedPosts.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/blog/${related.slug}`}
                    className="group block rounded-xl border border-gray-800 p-5 hover:border-[#3E797F] hover:shadow-sm transition-all bg-black/40"
                  >
                    <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-semibold rounded-full text-[#3E797F] bg-[#3E797F]/10 mb-2">
                      {related.category ||
                        categoryLabels[related.pillar] ||
                        related.pillar}
                    </span>
                    <h3 className="font-semibold text-white group-hover:text-[#3E797F] transition-colors text-sm leading-snug mb-2">
                      {related.title}
                    </h3>
                    <p className="text-xs text-gray-400 line-clamp-2">
                      {related.description}
                    </p>
                    <time className="block mt-3 text-xs text-gray-500">
                      {new Date(related.publishedAt).toLocaleDateString(
                        "en-GB",
                        { day: "numeric", month: "short", year: "numeric" }
                      )}
                    </time>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
