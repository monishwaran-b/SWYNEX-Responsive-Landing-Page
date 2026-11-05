import { useState, useEffect } from 'react';
import { ArrowRight, Activity, ShieldCheck, Zap } from 'lucide-react';

interface HeroProps {
  onOpenTrial: () => void;
  onExploreDemo: () => void;
}

interface TelemetryPoint {
  id: string;
  name: string;
  location: string;
  ping: number;
  throughput: string;
  availability: string;
}

const REGIONS: TelemetryPoint[] = [
  { id: 'us-east', name: 'US East', location: 'N. Virginia', ping: 1.2, throughput: '240 Gbps', availability: '99.999%' },
  { id: 'eu-west', name: 'Europe Central', location: 'Frankfurt', ping: 1.8, throughput: '190 Gbps', availability: '99.999%' },
  { id: 'ap-ne', name: 'Asia Pacific', location: 'Tokyo', ping: 2.3, throughput: '165 Gbps', availability: '99.998%' },
  { id: 'ap-se', name: 'Southeast Asia', location: 'Singapore', ping: 2.1, throughput: '140 Gbps', availability: '99.999%' },
];

export function Hero({ onOpenTrial, onExploreDemo }: HeroProps) {
  const [selectedRegion, setSelectedRegion] = useState<TelemetryPoint>(REGIONS[0]);
  const [liveCounter, setLiveCounter] = useState(148293040);
  const [latencyVariation, setLatencyVariation] = useState(1.2);

  useEffect(() => {
    const timer = setInterval(() => {
      setLiveCounter((prev) => prev + Math.floor(Math.random() * 850 + 350));
      setLatencyVariation(Number((selectedRegion.ping + (Math.random() * 0.25 - 0.12)).toFixed(2)));
    }, 1200);
    return () => clearInterval(timer);
  }, [selectedRegion]);

  return (
    <section className="relative pt-12 pb-20 md:pt-16 md:pb-28 overflow-hidden">
      {/* Background subtle gradient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-blue-500/5 dark:bg-blue-400/5 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Kicker - Zero pill metadata rule: clean unboxed text */}
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-4">
          <span>Enterprise Cloud Architecture</span>
          <span aria-hidden="true">·</span>
          <span>Zero Cold-Start Runtimes</span>
          <span aria-hidden="true">·</span>
          <span>Global Anycast POPs</span>
        </div>

        {/* Hero Title and Subhead */}
        <div className="max-w-4xl space-y-5">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-950 dark:text-neutral-50 font-display text-balance leading-[1.12]">
            Real-time cloud pipelines engineered for zero-latency scale.
          </h1>
          <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-300 max-w-2xl font-normal leading-relaxed text-balance">
            Deploy deterministic event streaming, sub-millisecond edge routing, and automatic schema synchronization across 36 global points of presence.
          </p>
        </div>

        {/* CTAs */}
        <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <button
            type="button"
            onClick={onOpenTrial}
            className="px-6 py-3.5 text-sm font-semibold text-white bg-neutral-950 hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-100 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 whitespace-nowrap active:scale-[0.98]"
          >
            <span>Start 14-Day Free Trial</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={onExploreDemo}
            className="px-6 py-3.5 text-sm font-medium text-neutral-800 dark:text-neutral-200 bg-neutral-100 hover:bg-neutral-200/80 dark:bg-neutral-900 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 rounded-xl transition-all flex items-center justify-center gap-2 whitespace-nowrap"
          >
            <span>Explore Live Demo & Sandbox</span>
            <Zap className="w-4 h-4 text-amber-500" />
          </button>
        </div>

        {/* Social Proof Logos adjacent to proposition */}
        <div className="mt-14 pt-8 border-t border-neutral-200 dark:border-neutral-800/80">
          <p className="text-xs uppercase tracking-wider font-semibold text-neutral-500 dark:text-neutral-400 mb-4">
            Trusted by mission-critical distributed systems teams worldwide
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 items-center">
            {['STRIPE', 'DATADOG', 'SNOWFLAKE', 'VERCEL', 'SHOPIFY', 'LINEAR'].map((brand) => (
              <div
                key={brand}
                className="text-center font-display font-bold tracking-widest text-sm text-neutral-400 dark:text-neutral-600 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
              >
                {brand}
              </div>
            ))}
          </div>
        </div>

        {/* Marquee Hero Visual Showcase */}
        <div className="mt-12 relative rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-900 shadow-2xl">
          {/* Main Visual Image */}
          <div className="relative aspect-[16/9] w-full max-h-[540px]">
            <img
              src="/src/assets/images/hero_cloud_architecture_1793884955212.jpg"
              alt="Strata high-performance cloud infrastructure data center"
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
            {/* Measured contrast scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
          </div>

          {/* Interactive Overlay Telemetry Monitor */}
          <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 lg:p-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-lg">
              <div className="flex items-center gap-2 text-xs text-neutral-300">
                <Activity className="w-4 h-4 text-blue-400" />
                <span className="font-semibold uppercase tracking-wider">Live Edge Telemetry</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono tabular-nums">{liveCounter.toLocaleString()} events ingested</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
                Autonomous multi-region routing & zero cold starts
              </h2>
              <p className="text-xs sm:text-sm text-neutral-300 line-clamp-2">
                Incoming traffic is routed dynamically to nearest edge POP within 3ms, executing serverless pipelines with sub-millisecond execution.
              </p>
            </div>

            {/* Region Selector & Realtime Stats Box */}
            <div className="p-4 rounded-xl bg-neutral-900/90 backdrop-blur-md border border-neutral-700/60 shadow-xl space-y-3 min-w-[280px]">
              <div className="flex items-center justify-between text-xs text-neutral-400 pb-2 border-b border-neutral-800">
                <span>Select Edge POP:</span>
                <span className="text-emerald-400 flex items-center gap-1 font-mono">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Healthy
                </span>
              </div>

              {/* Region Pill buttons (Interactive buttons allowed for filtering/switching) */}
              <div className="grid grid-cols-2 gap-1.5">
                {REGIONS.map((region) => (
                  <button
                    key={region.id}
                    type="button"
                    onClick={() => setSelectedRegion(region)}
                    className={`px-2.5 py-1.5 text-xs rounded-lg font-medium transition-colors text-left ${
                      selectedRegion.id === region.id
                        ? 'bg-white text-neutral-900 font-semibold shadow-xs'
                        : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                    }`}
                  >
                    {region.name}
                  </button>
                ))}
              </div>

              {/* Dynamic stats */}
              <div className="grid grid-cols-3 gap-2 pt-1 text-center font-mono">
                <div className="p-2 bg-neutral-800/80 rounded-lg">
                  <span className="block text-[10px] uppercase text-neutral-400">P99 Ping</span>
                  <span className="text-xs font-semibold text-emerald-400 tabular-nums">{latencyVariation}ms</span>
                </div>
                <div className="p-2 bg-neutral-800/80 rounded-lg">
                  <span className="block text-[10px] uppercase text-neutral-400">Throughput</span>
                  <span className="text-xs font-semibold text-neutral-200 tabular-nums">{selectedRegion.throughput}</span>
                </div>
                <div className="p-2 bg-neutral-800/80 rounded-lg">
                  <span className="block text-[10px] uppercase text-neutral-400">Uptime</span>
                  <span className="text-xs font-semibold text-neutral-200 tabular-nums">{selectedRegion.availability}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
