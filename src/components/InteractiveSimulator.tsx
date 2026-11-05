import { useState, useId } from 'react';
import { Gauge, Sliders, CheckCircle, Database } from 'lucide-react';

export function InteractiveSimulator() {
  const [requestsPerSec, setRequestsPerSec] = useState(120000);
  const [protocol, setProtocol] = useState<'grpc' | 'websocket' | 'http3' | 'sse'>('grpc');
  const [streamActive, setStreamActive] = useState(true);
  const sliderId = useId();

  // Dynamic calculations based on load
  const p50 = (0.28 + (requestsPerSec / 1000000) * 0.22).toFixed(2);
  const p99 = (1.1 + (requestsPerSec / 1000000) * 0.65).toFixed(2);
  const bandwidthGbps = ((requestsPerSec * 1.4) / 10000).toFixed(1);
  const legacyCloudCost = Math.round((requestsPerSec / 1000) * 28.5);
  const strataCost = Math.round(legacyCloudCost * 0.32);
  const savingsPercent = 68;

  const protocols = [
    { id: 'grpc', label: 'gRPC v2' },
    { id: 'websocket', label: 'WebSocket Stream' },
    { id: 'http3', label: 'HTTP/3 Quick' },
    { id: 'sse', label: 'Server-Sent Events' },
  ] as const;

  return (
    <section id="benchmarks" className="py-20 bg-neutral-100/70 dark:bg-neutral-900/40 border-y border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            <span>Real-Time Engine</span>
            <span aria-hidden="true">·</span>
            <span>Interactive Benchmark Simulator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950 dark:text-neutral-100 font-display">
            Simulate your production payload at scale
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base leading-relaxed">
            Adjust ingestion volume and protocol architecture to inspect simulated latency curves, network throughput, and infrastructure cost differentials.
          </p>
        </div>

        {/* Interactive Sandbox Grid */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Controls Column (5 cols) */}
          <div className="lg:col-span-5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-xs">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-neutral-500" />
                  Workload Configuration
                </span>
                <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
                  Global edge fleet
                </span>
              </div>

              {/* Slider Input */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <label htmlFor={sliderId} className="font-medium text-neutral-700 dark:text-neutral-300">
                    Ingestion Throughput
                  </label>
                  <span className="font-mono text-sm font-bold text-neutral-950 dark:text-white tabular-nums">
                    {requestsPerSec.toLocaleString()} req / sec
                  </span>
                </div>
                <input
                  id={sliderId}
                  type="range"
                  min="10000"
                  max="1000000"
                  step="10000"
                  value={requestsPerSec}
                  onChange={(e) => setRequestsPerSec(Number(e.target.value))}
                  className="w-full h-2 bg-neutral-200 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-neutral-900 dark:accent-white"
                />
                <div className="flex justify-between text-[11px] font-mono text-neutral-400">
                  <span>10k req/s</span>
                  <span>500k req/s</span>
                  <span>1.0M req/s</span>
                </div>
              </div>

              {/* Protocol Selector */}
              <div className="space-y-2">
                <span className="block text-xs font-medium text-neutral-700 dark:text-neutral-300">
                  Transport Wire Protocol
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {protocols.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setProtocol(item.id)}
                      className={`px-3 py-2 text-xs font-medium rounded-xl border transition-colors text-center ${
                        protocol === item.id
                          ? 'bg-neutral-950 text-white border-neutral-950 dark:bg-white dark:text-neutral-950 dark:border-white shadow-xs'
                          : 'bg-neutral-50 dark:bg-neutral-950 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-800 hover:border-neutral-400'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Live stream toggle */}
              <div className="pt-2 flex items-center justify-between text-xs text-neutral-600 dark:text-neutral-400 border-t border-neutral-100 dark:border-neutral-800">
                <span>Synthetic load stream:</span>
                <button
                  type="button"
                  onClick={() => setStreamActive(!streamActive)}
                  className="font-medium text-neutral-900 dark:text-white hover:underline"
                >
                  {streamActive ? 'Active (Live streaming)' : 'Paused'}
                </button>
              </div>
            </div>

            {/* Quick trust metrics */}
            <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs text-neutral-500">
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                Zero packet drops
              </span>
              <span>Wire memory buffer: 64MB</span>
            </div>
          </div>

          {/* Results & Comparison Column (7 cols) */}
          <div className="lg:col-span-7 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-neutral-200 dark:border-neutral-800">
                <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                  <Gauge className="w-4 h-4 text-neutral-500" />
                  Calculated Performance Envelope
                </span>
                <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                  Sub-millisecond SLA verified
                </span>
              </div>

              {/* Key Latency & Wire Metrics */}
              <div className="mt-5 grid grid-cols-3 gap-3">
                <div className="p-4 bg-neutral-50 dark:bg-neutral-950/70 border border-neutral-200/80 dark:border-neutral-800 rounded-xl">
                  <span className="text-xs text-neutral-500 dark:text-neutral-400 block mb-1">Median (P50)</span>
                  <div className="text-2xl font-bold font-mono text-neutral-900 dark:text-white tabular-nums">
                    {p50} <span className="text-xs font-normal text-neutral-500">ms</span>
                  </div>
                  <span className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 block">Edge native</span>
                </div>

                <div className="p-4 bg-neutral-50 dark:bg-neutral-950/70 border border-neutral-200/80 dark:border-neutral-800 rounded-xl">
                  <span className="text-xs text-neutral-500 dark:text-neutral-400 block mb-1">Tail (P99)</span>
                  <div className="text-2xl font-bold font-mono text-neutral-900 dark:text-white tabular-nums">
                    {p99} <span className="text-xs font-normal text-neutral-500">ms</span>
                  </div>
                  <span className="text-[11px] text-neutral-500 mt-1 block">Deterministic</span>
                </div>

                <div className="p-4 bg-neutral-50 dark:bg-neutral-950/70 border border-neutral-200/80 dark:border-neutral-800 rounded-xl">
                  <span className="text-xs text-neutral-500 dark:text-neutral-400 block mb-1">Ingress Bandwidth</span>
                  <div className="text-2xl font-bold font-mono text-neutral-900 dark:text-white tabular-nums">
                    {bandwidthGbps} <span className="text-xs font-normal text-neutral-500">Gbps</span>
                  </div>
                  <span className="text-[11px] text-neutral-500 mt-1 block">Bypasses NAT</span>
                </div>
              </div>

              {/* Monthly Infrastructure Cost Comparison */}
              <div className="mt-6 p-4 bg-neutral-50 dark:bg-neutral-950/50 border border-neutral-200 dark:border-neutral-800 rounded-xl space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-neutral-800 dark:text-neutral-200 flex items-center gap-1.5">
                    <Database className="w-3.5 h-3.5 text-neutral-500" />
                    Monthly Estimated Cloud Cost
                  </span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold font-mono">
                    Save ~{savingsPercent}%
                  </span>
                </div>

                <div className="space-y-2 font-mono text-xs">
                  <div>
                    <div className="flex justify-between text-neutral-600 dark:text-neutral-400 mb-1">
                      <span>Standard Cloud Ingress + Compute</span>
                      <span className="tabular-nums">${legacyCloudCost.toLocaleString()} / mo</span>
                    </div>
                    <div className="w-full h-2 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
                      <div className="h-full bg-neutral-400 dark:bg-neutral-600 w-full" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-neutral-900 dark:text-neutral-100 font-medium mb-1">
                      <span>Strata Vectorized Pipeline</span>
                      <span className="tabular-nums font-bold text-emerald-600 dark:text-emerald-400">
                        ${strataCost.toLocaleString()} / mo
                      </span>
                    </div>
                    <div className="w-full h-2 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 w-[32%]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom note */}
            <div className="mt-4 pt-3 flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
              <span>Benchmarked across AWS us-east-1, GCP europe-west3, and Cloudflare Colos</span>
              <a href="#pricing" className="text-neutral-900 dark:text-neutral-100 font-medium hover:underline">
                View Pricing Tiers →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
