import { useState } from 'react';
import type { CaseStudy } from '../types';

const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'finova',
    company: 'Finova Global Markets',
    industry: 'High-Frequency FinTech & Cross-Border Clearing',
    metric: '-84% P99 Latency',
    metricLabel: 'Across 42 institutional trading markets',
    quote:
      'We replaced legacy Kafka clusters and regional Redis caches with Strata. Our cross-border clearing reconciliation dropped from 380ms to under 18ms with mathematically guaranteed state invariants.',
    author: 'Elena Rostova',
    role: 'VP of Distributed Infrastructure',
  },
  {
    id: 'omnicart',
    company: 'OmniCart Commerce',
    industry: 'Tier-1 Retail & Live Checkout Ingestion',
    metric: '450k req/sec Peak',
    metricLabel: 'Zero packet drops during Black Friday flash sales',
    quote:
      'During our holiday peak, our previous edge nodes struggled with cold start spikes. Strata absorbed 450,000 transactions per second without a single throttled thread or dropped session.',
    author: 'Marcus Vance',
    role: 'Principal Systems Architect',
  },
  {
    id: 'helix',
    company: 'Helix Genomics',
    industry: 'Bioinformatics & Distributed Sequence Telemetry',
    metric: '14.2B Events / Day',
    metricLabel: 'Real-time vectorized stream analytics',
    quote:
      'Strata allowed our bioinformatics team to pipe genomic instrument sequencing telemetry directly into distributed analysis pipelines at line rate, reducing result latency by 12x.',
    author: 'Dr. Tariq Al-Mansoor',
    role: 'Director of Computational Platforms',
  },
];

export function CaseStudies() {
  const [selectedCase, setSelectedCase] = useState<CaseStudy>(CASE_STUDIES[0]);

  return (
    <section id="case-studies" className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            <span>Validated Impact</span>
            <span aria-hidden="true">·</span>
            <span>Enterprise Case Studies</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950 dark:text-neutral-100 font-display">
            Proven at planetary scale by industry leaders
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base leading-relaxed">
            Every metric below is backed by customer production telemetry in mission-critical environments.
          </p>
        </div>

        {/* Featured Case Study Hero Split */}
        <div className="mt-12 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl overflow-hidden shadow-xl grid grid-cols-1 lg:grid-cols-12 items-stretch">
          {/* Visual Showcase (5 cols) */}
          <div className="lg:col-span-5 relative bg-neutral-950 min-h-[320px] lg:min-h-full">
            <img
              src="/src/assets/images/showcase_fintech_dashboard_1793884956099.jpg"
              alt="FinTech telemetry display powered by Strata"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/20 to-transparent flex flex-col justify-end p-6 text-white">
              <span className="text-xs uppercase tracking-wider text-neutral-400">
                Live Customer Telemetry
              </span>
              <p className="text-base font-semibold font-display">
                Finova Financial Core Infrastructure
              </p>
            </div>
          </div>

          {/* Testimonial & Metric Details (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-6">
            <div>
              {/* Tab Selector for Companies */}
              <div className="flex items-center gap-2 pb-4 border-b border-neutral-200 dark:border-neutral-800 overflow-x-auto">
                {CASE_STUDIES.map((study) => (
                  <button
                    key={study.id}
                    type="button"
                    onClick={() => setSelectedCase(study)}
                    className={`px-3.5 py-1.5 text-xs font-medium rounded-xl whitespace-nowrap transition-colors ${
                      selectedCase.id === study.id
                        ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 shadow-xs'
                        : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white bg-neutral-100 dark:bg-neutral-800/60'
                    }`}
                  >
                    {study.company}
                  </button>
                ))}
              </div>

              {/* Quantified Impact Banner */}
              <div className="mt-6 flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4">
                <span className="text-3xl sm:text-4xl font-extrabold font-mono text-neutral-950 dark:text-white tabular-nums tracking-tight">
                  {selectedCase.metric}
                </span>
                <span className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-medium">
                  {selectedCase.metricLabel}
                </span>
              </div>

              {/* Quote */}
              <blockquote className="mt-6 text-base sm:text-lg text-neutral-800 dark:text-neutral-200 leading-relaxed font-normal">
                &ldquo;{selectedCase.quote}&rdquo;
              </blockquote>
            </div>

            {/* Author Attribution */}
            <div className="pt-6 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                  {selectedCase.author}
                </p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  {selectedCase.role} · {selectedCase.company}
                </p>
              </div>
              <span className="text-xs font-mono text-neutral-400 dark:text-neutral-500 hidden sm:inline-block">
                {selectedCase.industry}
              </span>
            </div>
          </div>
        </div>

        {/* 3 Metric Cards Strip */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl space-y-1.5 shadow-xs">
            <span className="font-mono text-3xl font-bold text-neutral-950 dark:text-white tabular-nums">
              99.999%
            </span>
            <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 font-display">
              Enterprise Uptime SLA
            </h4>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
              Backed by financial credit guarantees across all 36 points of presence globally.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl space-y-1.5 shadow-xs">
            <span className="font-mono text-3xl font-bold text-neutral-950 dark:text-white tabular-nums">
              &lt; 2.0ms
            </span>
            <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 font-display">
              Global Roundtrip P99
            </h4>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
              Consistently outperforming legacy cloud edge offerings in independent latency audits.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl space-y-1.5 shadow-xs">
            <span className="font-mono text-3xl font-bold text-neutral-950 dark:text-white tabular-nums">
              $14.8M+
            </span>
            <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 font-display">
              Ingress & Egress Savings
            </h4>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
              Eliminates predatory cloud inter-zone and outbound data transfer surcharges.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
