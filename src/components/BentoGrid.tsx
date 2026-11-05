import { useState } from 'react';
import { Play, Check, ShieldCheck, RefreshCw, Cpu, Globe2, Layers, Key } from 'lucide-react';
import type { EdgePop } from '../types';

const INITIAL_POPS: EdgePop[] = [
  { city: 'San Francisco', region: 'us-west-1', latencyMs: 1.1, status: 'optimal' },
  { city: 'London', region: 'eu-west-2', latencyMs: 2.2, status: 'optimal' },
  { city: 'Frankfurt', region: 'eu-central-1', latencyMs: 1.9, status: 'optimal' },
  { city: 'Tokyo', region: 'ap-northeast-1', latencyMs: 2.4, status: 'optimal' },
  { city: 'Sydney', region: 'ap-southeast-2', latencyMs: 3.1, status: 'stable' },
  { city: 'São Paulo', region: 'sa-east-1', latencyMs: 3.8, status: 'stable' },
];

export function BentoGrid() {
  // Card 1: Interactive Edge Ping
  const [pops, setPops] = useState<EdgePop[]>(INITIAL_POPS);
  const [isPinging, setIsPinging] = useState(false);

  const handlePingAll = () => {
    setIsPinging(true);
    setTimeout(() => {
      setPops((prev) =>
        prev.map((item) => ({
          ...item,
          latencyMs: Number((item.latencyMs + (Math.random() * 0.4 - 0.2)).toFixed(1)),
        }))
      );
      setIsPinging(false);
    }, 700);
  };

  // Card 2: Schema Diff View
  const [schemaVersion, setSchemaVersion] = useState<'v1' | 'v2'>('v2');

  // Card 3: ZK Verification
  const [zkVerified, setZkVerified] = useState(true);

  // Card 4: Consistency Mode
  const [consistencyMode, setConsistencyMode] = useState<'strong' | 'causal'>('strong');

  return (
    <section id="capabilities" className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            <span>Distributed Core</span>
            <span aria-hidden="true">·</span>
            <span>Architectural Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950 dark:text-neutral-100 font-display">
            Built for distributed systems with zero tolerance for jitter
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base leading-relaxed">
            Eliminate serialization bottlenecks, distributed consensus deadlocks, and stale replica reads with purpose-built wire-speed primitives.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Card 1: Edge POPs and Latency (Span 2 cols) */}
          <div className="lg:col-span-2 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xs">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-neutral-100 dark:bg-neutral-800 rounded-xl text-neutral-900 dark:text-white">
                    <Globe2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-950 dark:text-white font-display">
                      01. Deterministic Global Edge Anycast
                    </h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      BGP Anycast routing straight to 36 localized POPs with zero middlebox hops
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handlePingAll}
                  disabled={isPinging}
                  className="px-3 py-1.5 text-xs font-medium bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 rounded-lg transition-colors flex items-center gap-1.5 shrink-0"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isPinging ? 'animate-spin' : ''}`} />
                  <span>{isPinging ? 'Pinging POPs...' : 'Test Live Pings'}</span>
                </button>
              </div>

              {/* Edge POPs Table / Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                {pops.map((pop) => (
                  <div
                    key={pop.city}
                    className="p-3 bg-neutral-50 dark:bg-neutral-950/60 border border-neutral-200/70 dark:border-neutral-800/80 rounded-xl"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-neutral-900 dark:text-neutral-200 truncate">
                        {pop.city}
                      </span>
                      <span className="font-mono text-xs font-semibold text-emerald-600 dark:text-emerald-400 tabular-nums">
                        {pop.latencyMs}ms
                      </span>
                    </div>
                    <span className="block text-[11px] font-mono text-neutral-400 truncate mt-0.5">
                      {pop.region}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between text-xs text-neutral-500">
              <span>99.999% SLA edge availability</span>
              <span className="font-mono">P99 global roundtrip &lt; 4ms</span>
            </div>
          </div>

          {/* Card 2: Automated Schema Evolution (Span 1 col) */}
          <div className="lg:col-span-1 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xs">
            <div className="space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-neutral-100 dark:bg-neutral-800 rounded-xl text-neutral-900 dark:text-white">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-neutral-950 dark:text-white font-display">
                    02. Schema Evolution
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    Non-blocking zero-downtime structural diffs
                  </p>
                </div>
              </div>

              {/* Version Switcher */}
              <div className="flex items-center gap-1.5 p-1 bg-neutral-100 dark:bg-neutral-800/70 rounded-xl">
                <button
                  type="button"
                  onClick={() => setSchemaVersion('v1')}
                  className={`flex-1 py-1 text-xs font-medium rounded-lg transition-all ${
                    schemaVersion === 'v1'
                      ? 'bg-white dark:bg-neutral-900 text-neutral-950 dark:text-white shadow-xs'
                      : 'text-neutral-600 dark:text-neutral-400'
                  }`}
                >
                  Payload v1.2
                </button>
                <button
                  type="button"
                  onClick={() => setSchemaVersion('v2')}
                  className={`flex-1 py-1 text-xs font-medium rounded-lg transition-all ${
                    schemaVersion === 'v2'
                      ? 'bg-white dark:bg-neutral-900 text-neutral-950 dark:text-white shadow-xs'
                      : 'text-neutral-600 dark:text-neutral-400'
                  }`}
                >
                  Payload v1.3 (Live Migration)
                </button>
              </div>

              {/* Code payload diff */}
              <pre className="p-3 bg-neutral-900 text-neutral-200 font-mono text-[11px] rounded-xl overflow-x-auto leading-relaxed border border-neutral-800">
                {schemaVersion === 'v1' ? (
                  <>
                    {`{\n  "event_id": "evt_99182",\n  "timestamp": 1793884950,\n  "payload_bytes": 1024,\n  "status": "INGESTED"\n}`}
                  </>
                ) : (
                  <>
                    {`{\n  "event_id": "evt_99182",\n  "timestamp": 1793884950,\n  "payload_bytes": 1024,\n`}
                    <span className="text-emerald-400">{`  "vector_embedding": [0.12, -0.44],\n  "geo_partition": "eu-central-1",`}</span>
                    {`\n  "status": "VECTORIZED"\n}`}
                  </>
                )}
              </pre>
            </div>

            <p className="mt-4 text-xs text-neutral-500">
              Dynamic schema validation verifies protocol forward-compatibility automatically.
            </p>
          </div>

          {/* Card 3: Cryptographic State Audit (Span 1 col) */}
          <div className="lg:col-span-1 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xs">
            <div className="space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-neutral-100 dark:bg-neutral-800 rounded-xl text-neutral-900 dark:text-white">
                  <Key className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-neutral-950 dark:text-white font-display">
                    03. Cryptographic Invariants
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    Merkle-tree ledger verifying zero tampering
                  </p>
                </div>
              </div>

              <div className="p-4 bg-neutral-50 dark:bg-neutral-950/60 rounded-xl border border-neutral-200/80 dark:border-neutral-800 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-neutral-600 dark:text-neutral-400">Invariant Proof Root:</span>
                  <span className="font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verified
                  </span>
                </div>
                <div className="font-mono text-[11px] text-neutral-500 break-all bg-neutral-100 dark:bg-neutral-900 p-2 rounded-lg">
                  0x7f9a88...c1e34b9
                </div>
                <button
                  type="button"
                  onClick={() => setZkVerified(!zkVerified)}
                  className="w-full py-2 text-xs font-medium border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{zkVerified ? 'Proof Check Passed' : 'Re-verify Proof Root'}</span>
                </button>
              </div>
            </div>

            <p className="mt-4 text-xs text-neutral-500">
              Zero-knowledge SNARK proofs generated for financial and healthcare compliance.
            </p>
          </div>

          {/* Card 4: Global Distributed State & Replication (Span 2 cols) */}
          <div className="lg:col-span-2 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xs overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="space-y-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-neutral-100 dark:bg-neutral-800 rounded-xl text-neutral-900 dark:text-white">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-950 dark:text-white font-display">
                      04. Multi-Region Replication Engine
                    </h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      Raft consensus with asynchronous vectorized stream replication
                    </p>
                  </div>
                </div>

                <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  Avoid cross-continental write penalties. Regional write quorums settle locally in under 3ms, propagating state differentials across peer regions concurrently.
                </p>

                {/* Consistency Mode Switcher */}
                <div className="flex items-center gap-2 pt-2">
                  <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
                    Consensus Model:
                  </span>
                  <div className="inline-flex p-1 bg-neutral-100 dark:bg-neutral-800 rounded-lg text-xs">
                    <button
                      type="button"
                      onClick={() => setConsistencyMode('strong')}
                      className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                        consistencyMode === 'strong'
                          ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-xs'
                          : 'text-neutral-600 dark:text-neutral-400'
                      }`}
                    >
                      Linearizable (Strong)
                    </button>
                    <button
                      type="button"
                      onClick={() => setConsistencyMode('causal')}
                      className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                        consistencyMode === 'causal'
                          ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-xs'
                          : 'text-neutral-600 dark:text-neutral-400'
                      }`}
                    >
                      Causal Consistent
                    </button>
                  </div>
                </div>

                <div className="font-mono text-xs text-neutral-500 pt-1">
                  Active Replication SLA:{' '}
                  <span className="text-neutral-900 dark:text-neutral-100 font-semibold">
                    {consistencyMode === 'strong' ? '1.8ms Raft roundtrip' : '0.4ms Local Quorum'}
                  </span>
                </div>
              </div>

              {/* Showcase Image */}
              <div className="relative rounded-xl overflow-hidden aspect-[4/3] border border-neutral-200 dark:border-neutral-800">
                <img
                  src="/src/assets/images/showcase_global_network_1793884955588.jpg"
                  alt="High-density global network routing hardware racks"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 via-transparent to-transparent flex items-end p-3.5">
                  <span className="text-[11px] font-mono text-white/90">
                    Tier-1 transit interconnects in 42 metro zones
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
