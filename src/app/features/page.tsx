import MarketingLayout from "@/components/layouts/MarketingLayout";

export const metadata = {
  title: "Features | Next.js App Template",
  description: "Discover the powerful features that make Next.js App Template the best choice for your needs.",
};

export default function FeaturesPage() {
  return (
    <MarketingLayout>
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4 text-foreground">Powerful Features</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover all the innovative tools and capabilities that make our platform stand out from the competition.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
            />
          ))}
        </div>

        <div className="bg-card rounded-xl p-8 md:p-12 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4 text-foreground">Streamlined Experience</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our platform is designed to provide a seamless and intuitive user experience from start to finish.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-background rounded-lg p-6 border border-border">
              <h3 className="text-xl font-semibold mb-3 text-foreground">For Individuals</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <CheckIcon className="mr-2 text-primary" />
                  <span>Personal dashboard with customizable widgets</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon className="mr-2 text-primary" />
                  <span>Automated task management system</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon className="mr-2 text-primary" />
                  <span>Progress tracking and reporting</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon className="mr-2 text-primary" />
                  <span>Smart notifications and reminders</span>
                </li>
              </ul>
            </div>

            <div className="bg-background rounded-lg p-6 border border-border">
              <h3 className="text-xl font-semibold mb-3 text-foreground">For Teams</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <CheckIcon className="mr-2 text-primary" />
                  <span>Collaborative workspaces for team projects</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon className="mr-2 text-primary" />
                  <span>Real-time collaboration tools</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon className="mr-2 text-primary" />
                  <span>Team performance analytics</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon className="mr-2 text-primary" />
                  <span>Role-based access control</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4 text-foreground">Ready to get started?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            Join thousands of satisfied users who are already using our platform to achieve their goals.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="/auth/signup" className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-md transition-colors font-medium">
              Start Free Trial
            </a>
            <a href="/pricing" className="border border-border hover:bg-muted px-6 py-3 rounded-md transition-colors font-medium">
              View Pricing
            </a>
          </div>
        </div>
      </div>
    </MarketingLayout>
  );
}

// Sample features data
const features = [
  {
    title: "AI-Powered Insights",
    description: "Leverage artificial intelligence to gain valuable insights from your data and make better decisions.",
    icon: "✨",
  },
  {
    title: "Automated Workflows",
    description: "Create customized workflows to automate repetitive tasks and increase productivity.",
    icon: "⚙️",
  },
  {
    title: "Advanced Analytics",
    description: "Comprehensive analytics dashboard to track performance and identify opportunities for improvement.",
    icon: "📊",
  },
  {
    title: "Seamless Integration",
    description: "Easily integrate with your existing tools and services for a unified experience.",
    icon: "🔄",
  },
  {
    title: "Secure Data Storage",
    description: "Enterprise-grade security ensures your sensitive information is always protected.",
    icon: "🔐",
  },
  {
    title: "Mobile Accessibility",
    description: "Access your account and perform tasks from anywhere using our mobile-optimized platform.",
    icon: "📱",
  },
];

// Check icon component
function CheckIcon(props: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="16" 
      height="16" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={props.className}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function FeatureCard({ title, description, icon }: { title: string; description: string; icon: string }) {
  return (
    <div className="flex flex-col p-6 bg-card rounded-xl shadow-sm hover:shadow-md transition-shadow">
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-foreground">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
} 