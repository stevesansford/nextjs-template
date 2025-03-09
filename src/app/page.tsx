import Link from "next/link";
import MarketingLayout from "@/components/layouts/MarketingLayout";

export default function Home() {
  return (
    <MarketingLayout>
      <div className="flex min-h-screen flex-col items-center p-8 sm:p-12 lg:p-24">
        <div className="w-full max-w-5xl">
          <div className="flex flex-col lg:flex-row items-center justify-between mb-12">
            <div className="mb-6 lg:mb-0 text-center lg:text-left">
              <h1 className="text-4xl font-bold mb-4 text-foreground">
                Next.js AI Application Template
              </h1>
              <p className="text-xl text-muted">
                A reusable foundation for building AI-enabled web applications.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-12">
            <FeatureCard
              title="AI Integration"
              description="Built-in abstraction layer for AI providers like OpenAI and Anthropic."
              icon="✨"
            />
            <FeatureCard
              title="Authentication"
              description="Secure user authentication with NextAuth.js, supporting credentials and OAuth providers."
              icon="🔒"
            />
            <FeatureCard
              title="Modern Stack"
              description="Built with Next.js 14+, React, TypeScript, and Tailwind CSS."
              icon="🚀"
            />
            <FeatureCard
              title="Database Ready"
              description="Prisma ORM integration for type-safe database operations."
              icon="🗄️"
            />
            <FeatureCard
              title="Responsive UI"
              description="Responsive and accessible UI components for all devices."
              icon="📱"
            />
            <FeatureCard
              title="API Routes"
              description="Ready-to-use API routes with proper error handling."
              icon="🔄"
            />
          </div>

          <div className="border-t border-border pt-8 text-center">
            <p className="text-muted mb-4">
              Get started by editing <code className="font-mono bg-card p-1 rounded">src/app/page.tsx</code>
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="https://nextjs.org/docs"
                className="px-4 py-2 border border-border rounded-lg hover:bg-card text-foreground"
                target="_blank"
                rel="noopener noreferrer"
              >
                Next.js Docs
              </Link>
              <Link
                href="https://next-auth.js.org/docs"
                className="px-4 py-2 border border-border rounded-lg hover:bg-card text-foreground"
                target="_blank"
                rel="noopener noreferrer"
              >
                NextAuth.js Docs
              </Link>
              <Link
                href="https://www.prisma.io/docs"
                className="px-4 py-2 border border-border rounded-lg hover:bg-card text-foreground"
                target="_blank"
                rel="noopener noreferrer"
              >
                Prisma Docs
              </Link>
            </div>
          </div>
        </div>
      </div>
    </MarketingLayout>
  );
}

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
}

function FeatureCard({ title, description, icon }: FeatureCardProps) {
  return (
    <div className="flex flex-col p-6 bg-card rounded-xl shadow-sm hover:shadow-md transition-shadow">
      <div className="text-3xl mb-4">{icon}</div>
      <h2 className="text-xl font-semibold mb-2 text-foreground">{title}</h2>
      <p className="text-muted">{description}</p>
    </div>
  );
}
