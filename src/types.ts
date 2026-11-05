export interface EdgePop {
  city: string;
  region: string;
  latencyMs: number;
  status: 'optimal' | 'stable';
}

export interface PricingPlan {
  id: string;
  name: string;
  tagline: string;
  monthlyPrice: number;
  annualPrice: number;
  popular?: boolean;
  features: string[];
  ctaText: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface CaseStudy {
  id: string;
  company: string;
  metric: string;
  metricLabel: string;
  quote: string;
  author: string;
  role: string;
  industry: string;
}
