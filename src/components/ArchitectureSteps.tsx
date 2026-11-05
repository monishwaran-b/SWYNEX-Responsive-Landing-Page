import { useState } from 'react';
import { Check, Copy, Terminal, Code2, Cpu, Database, FastForward } from 'lucide-react';

export function ArchitectureSteps() {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [activeLanguage, setActiveLanguage] = useState<'ts' | 'go' | 'python' | 'rust'>('ts');
  const [copied, setCopied] = useState(false);

  const steps = [
    {
      num: '01',
      title: 'Ingestion & Wire-Speed Decoupling',
      tagline: 'Kernel-bypass network stack (eBPF & DPDK)',
      desc: 'Inbound payloads are ingested directly into memory-mapped ring buffers, bypassing operating system context switches and NAT overhead.',
      metric: '0.12ms ingest latency',
      icon: FastForward,
    },
    {
      num: '02',
      title: 'Vectorized In-Memory Stream Processing',
      tagline: 'SIMD-accelerated transformations and windowing',
      desc: 'Real-time aggregations, filters, and state transformations run on AVX-512 vector units at wire speed with zero garbage collection pauses.',
      metric: '12.4M ops/sec per core',
      icon: Cpu,
    },
    {
      num: '03',
      title: 'Global Materialized State Delivery',
      tagline: 'Push-based subscription websockets & serverless hooks',
      desc: 'Processed state diffs are broadcast concurrently across 36 POPs, updating millions of connected client websockets within 2 milliseconds.',
      metric: 'Sub-2ms global delivery',
      icon: Database,
    },
  ];

  const codeSnippets: Record<'ts' | 'go' | 'python' | 'rust', string> = {
    ts: `import { StrataClient, StreamPipeline } from '@strata/sdk';

// Initialize zero-cold-start edge consumer
const strata = new StrataClient({
  endpoint: 'anycast.strata.io',
  region: 'auto',
  token: process.env.STRATA_TOKEN,
});

export const pipeline = new StreamPipeline({
  source: 'telemetry.events',
  schema: './schemas/telemetry.v1.json',
  delivery: 'linearizable',
});

pipeline.transform(async (batch) => {
  return batch.map(event => ({
    ...event,
    processedAt: Date.now(),
    p99LatencyMs: 0.84,
  }));
});

await pipeline.start();`,

    go: `package main

import (
  "context"
  "log"
  "github.com/strata-cloud/sdk-go/v2/strata"
)

func main() {
  client, err := strata.NewClient(strata.Config{
    Endpoint: "anycast.strata.io",
    MaxConcurrency: 64,
  })
  if err != nil {
    log.Fatal(err)
  }

  stream, err := client.Subscribe(context.Background(), "telemetry.events")
  for msg := range stream.Events() {
    // Process stream with zero allocation
    log.Printf("Ingested event ID: %s in %v", msg.ID, msg.Latency)
  }
}`,

    python: `from strata_sdk import StrataCluster, StreamMode

# Autonomous edge pipeline binding
cluster = StrataCluster.connect(
    cluster_uri="anycast.strata.io",
    compression="zstd",
    batch_timeout_ms=2,
)

@cluster.stream("telemetry.events", mode=StreamMode.DETERMINISTIC)
def process_telemetry(event):
    # Vectorized compute on stream slice
    return {
        "event_id": event.id,
        "processed": True,
        "edge_colo": event.origin_colo,
    }`,

    rust: `use strata_core::{StrataStream, Config, ConsensusMode};

#[tokio::main]
async fn main() -> Result<(), strata_core::Error> {
    let mut stream = StrataStream::bind(Config {
        endpoint: "anycast.strata.io".into(),
        consensus: ConsensusMode::Linearizable,
        ring_buffer_size: 65536,
    }).await?;

    while let Some(batch) = stream.next_batch().await? {
        // Zero-copy SIMD transformation
        batch.vectorize_in_place();
    }
    Ok(())
}`,
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeSnippets[activeLanguage]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <section id="architecture" className="py-20 md:py-28 bg-neutral-100/60 dark:bg-neutral-900/50 border-t border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            <span>Execution Model</span>
            <span aria-hidden="true">·</span>
            <span>Sub-Millisecond Pipeline</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950 dark:text-neutral-100 font-display">
            How Strata executes state transitions at line rate
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base leading-relaxed">
            From the initial packet arrival at an anycast edge POP to global state materialization in distributed consumer clusters.
          </p>
        </div>

        {/* 2-Column Split: Steps (Left) + Interactive Code Console (Right) */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Step Selector List (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            {steps.map((step, idx) => {
              const StepIcon = step.icon;
              const isSelected = activeStep === idx + 1;
              return (
                <div
                  key={step.num}
                  onClick={() => setActiveStep(idx + 1)}
                  className={`cursor-pointer p-6 rounded-2xl border transition-all ${
                    isSelected
                      ? 'bg-white dark:bg-neutral-900 border-neutral-900 dark:border-white shadow-md'
                      : 'bg-white/60 dark:bg-neutral-900/40 border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`p-2.5 rounded-xl transition-colors ${
                        isSelected
                          ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900'
                          : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400'
                      }`}
                    >
                      <StepIcon className="w-5 h-5" />
                    </div>
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-neutral-400">
                          {step.num}
                        </span>
                        <span className="font-mono text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                          {step.metric}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-neutral-950 dark:text-neutral-50 font-display">
                        {step.title}
                      </h3>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">
                        {step.tagline}
                      </p>
                      <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed pt-1">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Interactive Code & SDK Workspace (7 cols) */}
          <div className="lg:col-span-7 bg-neutral-950 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl">
            {/* Top Bar for Code Box */}
            <div className="flex items-center justify-between px-4 py-3 bg-neutral-900/90 border-b border-neutral-800">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-neutral-400" />
                <span className="text-xs font-mono font-medium text-neutral-300">
                  pipeline_worker.{activeLanguage}
                </span>
              </div>

              {/* Language Switcher */}
              <div className="flex items-center gap-1 bg-neutral-950 p-1 rounded-lg">
                {(['ts', 'go', 'python', 'rust'] as const).map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => setActiveLanguage(lang)}
                    className={`px-2.5 py-1 text-xs font-mono rounded-md transition-colors ${
                      activeLanguage === lang
                        ? 'bg-neutral-800 text-white font-semibold'
                        : 'text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    {lang.toUpperCase()}
                  </button>
                ))}
              </div>

              {/* Copy Button */}
              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-2.5 py-1 text-xs text-neutral-400 hover:text-white transition-colors"
                title="Copy code snippet"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span className="font-mono">{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            {/* Code Content */}
            <pre className="p-6 text-neutral-200 font-mono text-xs sm:text-[13px] leading-relaxed overflow-x-auto min-h-[340px]">
              <code>{codeSnippets[activeLanguage]}</code>
            </pre>

            {/* Console Status Footer */}
            <div className="px-5 py-3 bg-neutral-900/60 border-t border-neutral-800/80 flex items-center justify-between text-xs text-neutral-400 font-mono">
              <span className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-emerald-400" />
                <span>Compatible with Linux Kernel 5.15+, macOS, and Alpine Linux</span>
              </span>
              <span>Wire protocol: v2.4</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
