import MarketingLayout from "@/components/layouts/MarketingLayout";
import Link from "next/link";

export const metadata = {
  title: "Blog | Next.js App Template",
  description: "Stay updated with our latest news, insights, and product updates.",
};

export default function BlogPage() {
  return (
    <MarketingLayout>
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4 text-foreground">Our Blog</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Insights, updates, and stories from our team
          </p>
          
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium">
              All Posts
            </button>
            {categories.map((category) => (
              <button 
                key={category}
                className="border border-border bg-background hover:bg-muted px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Featured post */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-foreground">Featured Post</h2>
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="aspect-video bg-muted flex items-center justify-center text-4xl">
                {/* Placeholder for featured image */}
                📝
              </div>
              <div className="p-8 flex flex-col">
                <div className="mb-2">
                  <span className="inline-block bg-primary/10 text-primary text-xs px-2 py-1 rounded-full font-medium">
                    Product Updates
                  </span>
                  <span className="text-muted-foreground text-sm ml-2">May 15, 2023</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-foreground">
                  Introducing Our New Collaboration Features
                </h3>
                <p className="text-muted-foreground mb-6">
                  We&apos;re excited to announce a set of new collaboration features that make teamwork even more seamless. From real-time editing to advanced commenting, these tools will transform how your team works together.
                </p>
                <div className="mt-auto">
                  <Link 
                    href="/blog/introducing-collaboration-features" 
                    className="text-primary font-medium hover:underline"
                  >
                    Read more →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Latest posts */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-foreground">Latest Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <BlogPostCard key={index} post={post} />
            ))}
          </div>
        </div>

        {/* Newsletter signup */}
        <div className="bg-muted rounded-xl p-8 md:p-12 text-center">
          <h2 className="text-2xl font-bold mb-4 text-foreground">Subscribe to Our Newsletter</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Get the latest insights, tips, and updates delivered directly to your inbox. 
            We&apos;ll send you fresh content twice a month - no spam, we promise!
          </p>
          <form className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-grow px-4 py-2 rounded-md border border-border bg-background"
                required
              />
              <button 
                type="submit" 
                className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-md transition-colors font-medium"
              >
                Subscribe
              </button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
            </p>
          </form>
        </div>
      </div>
    </MarketingLayout>
  );
}

function BlogPostCard({ post }: { post: BlogPost }) {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden flex flex-col h-full">
      <div className="aspect-video bg-muted flex items-center justify-center text-4xl">
        {/* Placeholder for post image */}
        📝
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <div className="mb-2">
          <span className="inline-block bg-primary/10 text-primary text-xs px-2 py-1 rounded-full font-medium">
            {post.category}
          </span>
          <span className="text-muted-foreground text-sm ml-2">{post.date}</span>
        </div>
        <h3 className="text-xl font-bold mb-2 text-foreground">
          {post.title}
        </h3>
        <p className="text-muted-foreground mb-4 flex-grow">
          {post.excerpt}
        </p>
        <div className="flex items-center mt-4">
          <div className="w-8 h-8 bg-muted rounded-full mr-2 flex items-center justify-center text-xs">
            {post.author.name[0]}
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">{post.author.name}</p>
            <p className="text-xs text-muted-foreground">{post.author.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Types
interface BlogPost {
  title: string;
  excerpt: string;
  date: string;
  category: string;
  author: {
    name: string;
    role: string;
  };
}

// Sample data
const categories = [
  "Product Updates",
  "Tutorials",
  "Case Studies",
  "Company News",
  "Resources"
];

const blogPosts: BlogPost[] = [
  {
    title: "How to Improve Your Team's Productivity",
    excerpt: "Discover proven strategies to boost productivity and efficiency within your team, from optimizing workflows to implementing the right tools.",
    date: "April 28, 2023",
    category: "Resources",
    author: {
      name: "Emily Johnson",
      role: "Head of Product"
    }
  },
  {
    title: "The Future of Remote Collaboration",
    excerpt: "Explore emerging trends in remote work collaboration and how modern teams are adapting to create effective workflows across geographical boundaries.",
    date: "April 15, 2023",
    category: "Tutorials",
    author: {
      name: "David Lee",
      role: "Marketing Director"
    }
  },
  {
    title: "Customer Spotlight: How Acme Co. Transformed Their Workflow",
    excerpt: "Learn how Acme Co. used our platform to streamline their operations, reduce meeting time by 30%, and improve team satisfaction scores.",
    date: "April 3, 2023",
    category: "Case Studies",
    author: {
      name: "Sarah Brown",
      role: "Customer Success Manager"
    }
  },
  {
    title: "5 Essential Features for Project Management Tools",
    excerpt: "Not all project management tools are created equal. Discover the 5 must-have features that can make or break your team's collaboration experience.",
    date: "March 22, 2023",
    category: "Resources",
    author: {
      name: "Michael Williams",
      role: "Lead Developer"
    }
  },
  {
    title: "Announcing Our Series A Funding",
    excerpt: "We're thrilled to announce that we've raised $10M in Series A funding to accelerate our mission of transforming how teams work together.",
    date: "March 10, 2023",
    category: "Company News",
    author: {
      name: "Jane Doe",
      role: "CEO & Co-Founder"
    }
  },
  {
    title: "New Integration: Connect with Google Workspace",
    excerpt: "Our latest integration with Google Workspace makes it easier than ever to connect your documents, calendars, and emails with your projects.",
    date: "February 28, 2023",
    category: "Product Updates",
    author: {
      name: "John Smith",
      role: "CTO & Co-Founder"
    }
  }
]; 