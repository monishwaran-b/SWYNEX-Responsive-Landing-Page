import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { FaqItem } from '../types';

const FAQS: FaqItem[] = [
  {
    id: 'latency',
    category: 'Architecture',
    question: 'How does Strata achieve sub-2ms global delivery without cold starts?',
    answer:
      'Strata maintains warm in-memory ring buffers powered by DPDK and eBPF kernel bypass at all 36 Anycast edge POPs. Rather than spinning up a new container or microVM per incoming request, incoming streams connect directly to pre-allocated SIMD vector pipelines with zero initialization overhead.',
  },
  {
    id: 'compatibility',
    category: 'Integration',
    question: 'Can Strata coexist alongside existing Kafka, Kinesis, or RabbitMQ clusters?',
    answer:
      'Yes. Strata provides native bi-directional bridge connectors for Apache Kafka, AWS Kinesis, GCP PubSub, and NATS. You can use Strata purely as the ultra-low-latency edge ingress tier that filters and vectorizes data before publishing batches downstream into long-term warehouses like Snowflake or BigQuery.',
  },
  {
    id: 'compliance',
    category: 'Security & Compliance',
    question: 'Where does data reside and does Strata satisfy SOC2 Type II, GDPR, and HIPAA requirements?',
    answer:
      'Strata supports strict cryptographic geo-fencing. You can configure data residency partitions ensuring European payloads never leave the EU or that healthcare patient telemetry is processed within HIPAA-compliant dedicated VPC hardware enclaves. We are audited annually for SOC2 Type II.',
  },
  {
    id: 'schema',
    category: 'Data Engineering',
    question: 'How do you guarantee zero-downtime schema evolution without dropped messages?',
    answer:
      'Our schema synchronizer validates schema changes at the boundary using forward and backward semantic compatibility checks. When new fields are published, downstream workers receive type-safe fallback defaults until all consumer nodes finish upgrading.',
  },
  {
    id: 'failover',
    category: 'Reliability',
    question: 'What happens if a major upstream provider (like AWS us-east-1) goes offline?',
    answer:
      'Strata Anycast edge POPs operate multi-cloud backbones across Equinix, AWS, Google Cloud, and Cloudflare. If any specific data center or transit provider experiences a fiber cut or outage, BGP routes automatically converge within 400ms to peer regions without manual intervention.',
  },
  {
    id: 'spikes',
    category: 'Billing',
    question: 'How does billing handle unexpected traffic spikes during seasonal launches or promotions?',
    answer:
      'We do not cut off traffic or charge punitive penalty fees during bursts. All plans feature automatic burst scaling buffers. If you exceed your plan allowance, events are billed at a predictable flat rate per million events without surprise egress bandwidth surcharges.',
  },
];

export function Faq() {
  const [openId, setOpenId] = useState<string | null>('latency');

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-20 md:py-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            <span>Objection Handling</span>
            <span aria-hidden="true">·</span>
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950 dark:text-neutral-100 font-display">
            Clear answers to technical questions
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base leading-relaxed">
            Everything you need to know about protocol integration, compliance, failover, and pricing.
          </p>
        </div>

        {/* Accordion list */}
        <div className="mt-12 space-y-3">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden shadow-xs transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-800/40"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-semibold text-neutral-900 dark:text-neutral-100 font-display">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-neutral-500 transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 text-neutral-900 dark:text-neutral-100' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed border-t border-neutral-100 dark:border-neutral-800/80">
                    <p>{faq.answer}</p>
                    <div className="mt-3 flex items-center gap-2 text-[11px] text-neutral-400 dark:text-neutral-500 font-mono">
                      <span>Category: {faq.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>Verified SLA Standard</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
