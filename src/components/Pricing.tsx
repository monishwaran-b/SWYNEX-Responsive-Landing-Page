import { useState } from 'react';
import { Check, HelpCircle, ArrowRight } from 'lucide-react';
import type { PricingPlan } from '../types';

interface PricingProps {
  onSelectPlan: (planName: string) => void;
}

const PLANS: PricingPlan[] = [
  {
    id: 'developer',
    name: 'Developer',
    tagline: 'Ideal for prototypes, indie developers, and sandbox testing.',
    monthlyPrice: 0,
    annualPrice: 0,
    features: [
      '1,000,000 events / month included',
      '3 global edge POPs (US, EU, AP)',
      'Shared multi-tenant execution ring',
      'Community Discord & Forum support',
      'Standard 99.9% uptime target',
      'Community CLI & SDK bindings',
    ],
    ctaText: 'Start Free Forever',
  },
  {
    id: 'scale',
    name: 'Scale',
    tagline: 'For fast-growing distributed applications and production APIs.',
    monthlyPrice: 79,
    annualPrice: 63,
    popular: true,
    features: [
      '25,000,000 events / month included',
      'Full access to all 36 global Anycast POPs',
      'Sub-2ms tail latency SLA guarantee',
      'Deterministic zero-cold-start runtimes',
      'Automated schema versioning & diffs',
      '24/7 priority engineer ticket support',
      'Custom domains with automated TLS 1.3',
    ],
    ctaText: 'Start 14-Day Free Trial',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    tagline: 'Custom isolation, dedicated VPC peering, and custom compliance.',
    monthlyPrice: 499,
    annualPrice: 399,
    features: [
      'Unlimited scalable event throughput',
      'Dedicated bare-metal edge nodes & VPC peering',
      '99.999% SLA with financial backing',
      'SOC2 Type II, HIPAA & GDPR compliance',
      'Custom cryptographic proof roots',
      'Dedicated Solutions Architect & Slack channel',
      'Tailored data retention & audit policies',
    ],
    ctaText: 'Contact Enterprise Team',
  },
];

export function Pricing({ onSelectPlan }: PricingProps) {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section id="pricing" className="py-20 md:py-28 bg-neutral-100/50 dark:bg-neutral-900/40 border-t border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            <span>Transparent Economics</span>
            <span aria-hidden="true">·</span>
            <span>Predictable Pricing</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950 dark:text-neutral-100 font-display">
            Predictable billing without egress surprises
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base leading-relaxed">
            Start free, scale on demand, and never pay for bandwidth traps or internal cross-region transfer fees.
          </p>

          {/* Billing Toggle (Interactive segmented control) */}
          <div className="pt-6 flex items-center justify-center">
            <div className="p-1 bg-neutral-200/80 dark:bg-neutral-800 rounded-xl inline-flex items-center gap-1">
              <button
                type="button"
                onClick={() => setIsAnnual(false)}
                className={`px-4 py-1.5 text-xs font-medium rounded-lg transition-all ${
                  !isAnnual
                    ? 'bg-white dark:bg-neutral-950 text-neutral-950 dark:text-white shadow-xs'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white'
                }`}
              >
                Monthly billing
              </button>
              <button
                type="button"
                onClick={() => setIsAnnual(true)}
                className={`px-4 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 ${
                  isAnnual
                    ? 'bg-white dark:bg-neutral-950 text-neutral-950 dark:text-white shadow-xs'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white'
                }`}
              >
                <span>Annual billing</span>
                <span className="text-[10px] font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                  Save 20%
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {PLANS.map((plan) => {
            const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;
            const isScale = plan.popular;

            return (
              <div
                key={plan.id}
                className={`relative rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all ${
                  isScale
                    ? 'bg-white dark:bg-neutral-900 border-2 border-neutral-950 dark:border-white shadow-xl'
                    : 'bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs'
                }`}
              >
                {isScale && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-0.5 text-[11px] font-semibold text-white bg-neutral-950 dark:bg-white dark:text-neutral-950 rounded-full tracking-wide">
                    Most Popular Choice
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-neutral-950 dark:text-neutral-50 font-display">
                      {plan.name}
                    </h3>
                    <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400 min-h-[32px]">
                      {plan.tagline}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold font-mono text-neutral-950 dark:text-white tabular-nums">
                      ${price}
                    </span>
                    <span className="text-xs text-neutral-500 font-medium">
                      / month {isAnnual && price > 0 ? '(billed annually)' : ''}
                    </span>
                  </div>

                  {/* CTA Button */}
                  <button
                    type="button"
                    onClick={() => onSelectPlan(plan.name)}
                    className={`w-full py-3 px-4 text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-2 ${
                      isScale
                        ? 'bg-neutral-950 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-100 shadow-sm active:scale-95'
                        : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-900 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:text-white'
                    }`}
                  >
                    <span>{plan.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  {/* Feature List */}
                  <div className="pt-6 border-t border-neutral-100 dark:border-neutral-800 space-y-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                      Included Primitives
                    </span>
                    <ul className="space-y-2.5">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2.5 text-xs text-neutral-700 dark:text-neutral-300">
                          <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between text-[11px] text-neutral-400">
                  <span>Cancel anytime</span>
                  <span className="flex items-center gap-1 hover:text-neutral-600 dark:hover:text-neutral-300 cursor-pointer">
                    <HelpCircle className="w-3 h-3" />
                    Custom volume?
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
