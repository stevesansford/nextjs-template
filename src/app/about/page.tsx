import MarketingLayout from "@/components/layouts/MarketingLayout";
import Link from "next/link";

export const metadata = {
  title: "About Us | Next.js App Template",
  description: "Learn about our mission, our team, and the story behind Next.js App Template.",
};

export default function AboutPage() {
  return (
    <MarketingLayout>
      <div className="container mx-auto px-4 py-16 md:py-24">
        {/* Hero section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4 text-foreground">About Next.js App Template</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We&apos;re building the tools that help teams work smarter, together.
          </p>
        </div>

        {/* Our Story section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
          <div>
            <h2 className="text-3xl font-bold mb-4 text-foreground">Our Story</h2>
            <p className="text-muted-foreground mb-4">
              Founded in 2023, Next.js App Template began with a simple mission: to create tools that help teams work more efficiently and effectively together. We recognized that many organizations struggle with collaboration, particularly in remote and hybrid work environments.
            </p>
            <p className="text-muted-foreground mb-4">
              Our founders, having experienced these challenges firsthand in their previous roles, set out to build a solution that would streamline workflows, improve communication, and foster collaboration across teams of all sizes.
            </p>
            <p className="text-muted-foreground">
              Today, Next.js App Template is used by thousands of teams around the world, from small startups to Fortune 500 companies. We&apos;re proud of how far we&apos;ve come, but we&apos;re even more excited about where we&apos;re going.
            </p>
          </div>
          <div className="bg-muted rounded-xl aspect-video flex items-center justify-center text-4xl">
            {/* Placeholder for image */}
            🖼️
          </div>
        </div>

        {/* Our Mission section */}
        <div className="bg-card rounded-xl p-8 md:p-12 mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-foreground">Our Mission</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              To empower teams with tools that enhance collaboration, streamline workflows, and drive productivity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">People First</h3>
              <p className="text-muted-foreground">
                We design our products with real users in mind, focusing on creating experiences that are intuitive, accessible, and enjoyable.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Continuous Innovation</h3>
              <p className="text-muted-foreground">
                We&apos;re committed to pushing boundaries and exploring new ways to solve complex problems through technology.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                  <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                  <line x1="6" y1="1" x2="6" y2="4"></line>
                  <line x1="10" y1="1" x2="10" y2="4"></line>
                  <line x1="14" y1="1" x2="14" y2="4"></line>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Quality &amp; Reliability</h3>
              <p className="text-muted-foreground">
                We build products that teams can depend on, with a focus on performance, security, and stability.
              </p>
            </div>
          </div>
        </div>

        {/* Team section */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-foreground">Meet Our Team</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We&apos;re a diverse group of passionate individuals working together to build amazing products.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center">
                <div className="aspect-square bg-muted rounded-full w-40 h-40 mx-auto mb-4 flex items-center justify-center text-4xl">
                  {/* Placeholder for profile photo */}
                  👤
                </div>
                <h3 className="text-lg font-semibold text-foreground">{member.name}</h3>
                <p className="text-muted-foreground mb-2">{member.role}</p>
                <div className="flex justify-center space-x-3">
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect x="2" y="9" width="4" height="12"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA section */}
        <div className="bg-muted rounded-xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold mb-4 text-foreground">Join Us on Our Journey</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            We&apos;re always looking for talented individuals to join our team. Check out our open positions or get in touch.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/careers"
              className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-md transition-colors font-medium"
            >
              View Career Opportunities
            </Link>
            <Link
              href="/contact"
              className="border border-border hover:bg-card px-6 py-3 rounded-md transition-colors font-medium"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </MarketingLayout>
  );
}

// Sample team members data
const teamMembers = [
  {
    name: "Jane Doe",
    role: "CEO & Co-Founder",
  },
  {
    name: "John Smith",
    role: "CTO & Co-Founder",
  },
  {
    name: "Emily Johnson",
    role: "Head of Product",
  },
  {
    name: "Michael Williams",
    role: "Lead Developer",
  },
  {
    name: "Sarah Brown",
    role: "UX/UI Designer",
  },
  {
    name: "David Lee",
    role: "Marketing Director",
  },
  {
    name: "Lisa Wang",
    role: "Customer Success Manager",
  },
  {
    name: "Robert Chen",
    role: "Software Engineer",
  },
]; 