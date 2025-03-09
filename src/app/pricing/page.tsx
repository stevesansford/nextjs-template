import MarketingLayout from "@/components/layouts/MarketingLayout";
import Link from "next/link";

export const metadata = {
  title: "Pricing | Next.js App Template",
  description: "Choose the perfect plan for your needs - transparent pricing with no hidden fees.",
};

export default function PricingPage() {
  return (
    <MarketingLayout>
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4 text-foreground">Simple, Transparent Pricing</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect plan for your needs. No hidden fees or surprises.
          </p>
          
          <div className="flex justify-center mt-8 space-x-4">
            <button className="bg-primary text-primary-foreground px-6 py-2 rounded-md font-medium">
              Monthly Billing
            </button>
            <button className="text-foreground border border-border px-6 py-2 rounded-md hover:bg-muted transition-colors font-medium">
              Annual Billing
              <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full dark:bg-green-900 dark:text-green-100">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {pricingPlans.map((plan, index) => (
            <PricingCard
              key={index}
              plan={plan}
              isPopular={index === 1}
            />
          ))}
        </div>

        <div className="bg-card rounded-xl p-8 md:p-12 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4 text-foreground">Compare Plans</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Find the perfect plan for your needs. All plans include our core features.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="py-4 px-4 text-left font-medium text-foreground">Feature</th>
                  <th className="py-4 px-4 text-center font-medium text-foreground">Free</th>
                  <th className="py-4 px-4 text-center font-medium text-foreground">Pro</th>
                  <th className="py-4 px-4 text-center font-medium text-foreground">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((feature, index) => (
                  <tr key={index} className="border-b border-border">
                    <td className="py-4 px-4 text-foreground">{feature.name}</td>
                    <td className="py-4 px-4 text-center text-muted-foreground">
                      {renderFeatureValue(feature.free)}
                    </td>
                    <td className="py-4 px-4 text-center text-muted-foreground">
                      {renderFeatureValue(feature.pro)}
                    </td>
                    <td className="py-4 px-4 text-center text-muted-foreground">
                      {renderFeatureValue(feature.enterprise)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-muted rounded-xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold mb-4 text-foreground">Need a custom solution?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            Contact our sales team to discuss your specific requirements and get a tailored quote.
          </p>
          <Link
            href="/contact"
            className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-md transition-colors font-medium inline-block"
          >
            Contact Sales
          </Link>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6 text-foreground text-center">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-border rounded-lg p-6">
                <h3 className="text-lg font-medium mb-2 text-foreground">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MarketingLayout>
  );
}

function PricingCard({ plan, isPopular }: { plan: PricingPlan; isPopular: boolean }) {
  return (
    <div className={`bg-card border ${isPopular ? 'border-primary' : 'border-border'} rounded-xl overflow-hidden flex flex-col`}>
      {isPopular && (
        <div className="bg-primary text-primary-foreground text-center py-2 font-medium text-sm">
          Most Popular
        </div>
      )}
      <div className="p-6 md:p-8 flex-grow">
        <h3 className="text-xl font-bold text-foreground mb-2">{plan.name}</h3>
        <p className="text-muted-foreground mb-4">{plan.description}</p>
        <div className="mb-6">
          <span className="text-4xl font-bold text-foreground">${plan.price}</span>
          <span className="text-muted-foreground ml-2">/month</span>
        </div>
        <ul className="space-y-3 mb-8">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <CheckIcon className="text-primary flex-shrink-0 mt-1 mr-2" />
              <span className="text-foreground">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="p-6 md:p-8 border-t border-border">
        <button 
          className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
            isPopular 
              ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
              : 'border border-border bg-background hover:bg-muted text-foreground'
          }`}
        >
          {plan.buttonText}
        </button>
      </div>
    </div>
  );
}

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

function renderFeatureValue(value: string | boolean | number) {
  if (typeof value === 'boolean') {
    return value ? (
      <CheckIcon className="inline text-primary" />
    ) : (
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
        className="inline text-muted-foreground"
      >
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    );
  }
  return value;
}

// Types
interface PricingPlan {
  name: string;
  description: string;
  price: number;
  features: string[];
  buttonText: string;
}

// Sample data
const pricingPlans: PricingPlan[] = [
  {
    name: "Free",
    description: "For individuals getting started",
    price: 0,
    features: [
      "Up to 5 projects",
      "Basic analytics",
      "24-hour support response time",
      "1 GB storage",
      "Limited API access"
    ],
    buttonText: "Get Started"
  },
  {
    name: "Pro",
    description: "For professionals and small teams",
    price: 29,
    features: [
      "Unlimited projects",
      "Advanced analytics",
      "4-hour support response time",
      "10 GB storage",
      "Full API access",
      "Invite up to 10 team members"
    ],
    buttonText: "Try Free for 14 Days"
  },
  {
    name: "Enterprise",
    description: "For large organizations",
    price: 99,
    features: [
      "Unlimited everything",
      "Priority support",
      "1-hour support response time",
      "100 GB storage",
      "Custom integrations",
      "Unlimited team members",
      "Dedicated account manager"
    ],
    buttonText: "Contact Sales"
  }
];

const comparisonFeatures = [
  { 
    name: "Projects", 
    free: "5", 
    pro: "Unlimited", 
    enterprise: "Unlimited" 
  },
  { 
    name: "Storage", 
    free: "1 GB", 
    pro: "10 GB", 
    enterprise: "100 GB" 
  },
  { 
    name: "Team Members", 
    free: "1", 
    pro: "10", 
    enterprise: "Unlimited" 
  },
  { 
    name: "API Access", 
    free: "Limited", 
    pro: "Full", 
    enterprise: "Full + Custom" 
  },
  { 
    name: "Custom Reports", 
    free: false, 
    pro: true, 
    enterprise: true 
  },
  { 
    name: "Priority Support", 
    free: false, 
    pro: false, 
    enterprise: true 
  },
  { 
    name: "24/7 Phone Support", 
    free: false, 
    pro: false, 
    enterprise: true 
  }
];

const faqs = [
  {
    question: "Can I upgrade or downgrade my plan at any time?",
    answer: "Yes, you can upgrade or downgrade your plan at any time. Changes will be effective immediately, and your billing will be prorated accordingly."
  },
  {
    question: "Is there a free trial available?",
    answer: "Yes, we offer a 14-day free trial for our Pro plan. No credit card required to sign up."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, Mastercard, American Express), as well as PayPal."
  },
  {
    question: "Do you offer discounts for nonprofit organizations?",
    answer: "Yes, we offer special discounts for registered nonprofit organizations. Please contact our sales team for more information."
  }
]; 