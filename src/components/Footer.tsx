import { Github, Twitter, Linkedin, Disc as Discord, GitBranch } from 'lucide-react';

interface FooterProps {
  onOpenRepo: () => void;
  repoUrl: string;
}

export function Footer({ onOpenRepo, repoUrl }: FooterProps) {
  const productLinks = [
    { label: 'Edge Anycast POPs', href: '#capabilities' },
    { label: 'SIMD In-Memory Stream', href: '#architecture' },
    { label: 'Benchmark Simulator', href: '#benchmarks' },
    { label: 'Schema Synchronizer', href: '#capabilities' },
    { label: 'Global Status', href: '#benchmarks' },
  ];

  const architectureLinks = [
    { label: 'eBPF / DPDK Engine', href: '#architecture' },
    { label: 'Consensus Proofs', href: '#capabilities' },
    { label: 'Latency SLA Guarantees', href: '#pricing' },
    { label: 'Multi-Region Raft Quorum', href: '#capabilities' },
  ];

  const resourceLinks = [
    { label: 'TypeScript SDK', href: '#architecture' },
    { label: 'Go SDK', href: '#architecture' },
    { label: 'Python SDK', href: '#architecture' },
    { label: 'Rust SDK', href: '#architecture' },
    { label: 'CLI Documentation', href: '#architecture' },
  ];

  const companyLinks = [
    { label: 'Customer Stories', href: '#case-studies' },
    { label: 'Pricing Calculator', href: '#pricing' },
    { label: 'Security & Compliance', href: '#faq' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
  ];

  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-neutral-600 dark:text-neutral-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main 5-column grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Col */}
          <div className="col-span-2 space-y-4">
            <a
              href="#"
              className="text-xl font-bold tracking-tight text-neutral-950 dark:text-neutral-50 font-display"
            >
              Strata
            </a>
            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 max-w-sm leading-relaxed">
              Real-time cloud infrastructure engineered for zero-latency distributed streaming, edge routing, and continuous state replication.
            </p>

            {/* Quick Repository Action in Footer */}
            <div className="pt-2">
              <button
                type="button"
                onClick={onOpenRepo}
                className="inline-flex items-center gap-2 px-3 py-2 text-xs font-mono font-medium rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-900 dark:text-neutral-100 transition-colors"
              >
                <GitBranch className="w-3.5 h-3.5 text-neutral-500" />
                <span>View GitHub Repo</span>
              </button>
            </div>

            {/* Social Icons */}
            <div className="pt-2 flex items-center gap-4 text-neutral-400">
              <button
                type="button"
                onClick={onOpenRepo}
                className="hover:text-neutral-900 dark:hover:text-white transition-colors"
                aria-label="GitHub Repository"
              >
                <Github className="w-4 h-4" />
              </button>
              <a href="#" className="hover:text-neutral-900 dark:hover:text-white transition-colors" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="hover:text-neutral-900 dark:hover:text-white transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="hover:text-neutral-900 dark:hover:text-white transition-colors" aria-label="Discord">
                <Discord className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links 1: Platform */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-900 dark:text-neutral-100">
              Platform
            </h4>
            <ul className="space-y-2 text-xs">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="hover:text-neutral-950 dark:hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Links 2: Architecture */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-900 dark:text-neutral-100">
              Architecture
            </h4>
            <ul className="space-y-2 text-xs">
              {architectureLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="hover:text-neutral-950 dark:hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Links 3: SDKs & Company */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-900 dark:text-neutral-100">
              Resources & SDKs
            </h4>
            <ul className="space-y-2 text-xs">
              {resourceLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="hover:text-neutral-950 dark:hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-neutral-100 dark:border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 dark:text-neutral-500">
          <div>
            &copy; {new Date().getFullYear()} Strata Cloud Technologies Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-6 font-mono text-[11px]">
            <span>Status: All 36 Edge POPs Operational</span>
            <span aria-hidden="true">·</span>
            <span>Latency SLA 99.999%</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
