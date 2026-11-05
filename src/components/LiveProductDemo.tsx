import { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  Send, 
  RefreshCw, 
  CheckCircle2, 
  Sliders, 
  Terminal, 
  Activity, 
  Database, 
  Radio, 
  Search,
  Zap,
  Globe2
} from 'lucide-react';

interface StreamEvent {
  id: string;
  timestamp: string;
  sourceRegion: string;
  eventTopic: string;
  latencyMs: number;
  payloadBytes: number;
  status: 'DELIVERED' | 'ROUTED' | 'VECTORIZED';
  data: Record<string, unknown>;
}

const STREAM_TEMPLATES = [
  {
    id: 'fintech',
    name: 'FinTech Settlement Stream',
    topic: 'fintech.clearing.v2',
    defaultData: { amount: 14250.00, currency: 'USD', counterparty: 'JPM_CHASE', routing: 'INSTANT_SETTLEMENT' }
  },
  {
    id: 'mobility',
    name: 'Autonomous Fleet Telematics',
    topic: 'fleet.sensor_telemetry',
    defaultData: { vehicleId: 'FLT-8820', speedKmh: 94.2, batteryPct: 88, lidarHealth: 'NOMINAL' }
  },
  {
    id: 'ecommerce',
    name: 'High-Volume Cart Ingestion',
    topic: 'commerce.checkout.v3',
    defaultData: { cartId: 'CRT_99184', itemsCount: 4, grossValue: 284.50, paymentGateway: 'STRIPE_PASS' }
  },
  {
    id: 'ai_inference',
    name: 'AI Agent Tool Invocation',
    topic: 'agent.tool_call.v1',
    defaultData: { agentId: 'agt_core_4', tool: 'web_search', tokensUsed: 412, memoryScore: 0.994 }
  }
];

const REGIONS = ['us-east-1', 'eu-central-1', 'ap-northeast-1', 'sa-east-1', 'eu-west-2'];

export function LiveProductDemo() {
  const [selectedTemplate, setSelectedTemplate] = useState(STREAM_TEMPLATES[0]);
  const [isStreaming, setIsStreaming] = useState(true);
  const [events, setEvents] = useState<StreamEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<StreamEvent | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [chaosMode, setChaosMode] = useState(false);
  const [eventsCounter, setEventsCounter] = useState(1284);

  // Initialize initial events
  useEffect(() => {
    const initialList: StreamEvent[] = Array.from({ length: 6 }).map((_, i) => {
      const now = new Date(Date.now() - (6 - i) * 800);
      return {
        id: `evt_${Math.random().toString(36).substring(2, 9)}`,
        timestamp: now.toISOString().split('T')[1].replace('Z', ''),
        sourceRegion: REGIONS[Math.floor(Math.random() * REGIONS.length)],
        eventTopic: selectedTemplate.topic,
        latencyMs: Number((Math.random() * 0.8 + 0.4).toFixed(2)),
        payloadBytes: Math.floor(Math.random() * 800 + 420),
        status: 'DELIVERED',
        data: { ...selectedTemplate.defaultData, iteration: i + 1 }
      };
    });
    setEvents(initialList);
    setSelectedEvent(initialList[initialList.length - 1]);
  }, [selectedTemplate]);

  // Handle live streaming interval
  useEffect(() => {
    if (!isStreaming) return;
    const interval = setInterval(() => {
      const now = new Date();
      const newEvent: StreamEvent = {
        id: `evt_${Math.random().toString(36).substring(2, 9)}`,
        timestamp: now.toISOString().split('T')[1].replace('Z', ''),
        sourceRegion: chaosMode ? 'eu-central-1 (failover)' : REGIONS[Math.floor(Math.random() * REGIONS.length)],
        eventTopic: selectedTemplate.topic,
        latencyMs: chaosMode ? Number((Math.random() * 0.5 + 1.8).toFixed(2)) : Number((Math.random() * 0.6 + 0.4).toFixed(2)),
        payloadBytes: Math.floor(Math.random() * 700 + 400),
        status: 'DELIVERED',
        data: {
          ...selectedTemplate.defaultData,
          transactionSeq: Date.now(),
          checksum: `0x${Math.random().toString(16).substring(2, 8)}`
        }
      };

      setEvents((prev) => [newEvent, ...prev.slice(0, 19)]);
      setEventsCounter((c) => c + 1);
    }, 1200);

    return () => clearInterval(interval);
  }, [isStreaming, selectedTemplate, chaosMode]);

  const handleEmitManualEvent = () => {
    const now = new Date();
    const manualEvent: StreamEvent = {
      id: `evt_manual_${Math.random().toString(36).substring(2, 7)}`,
      timestamp: now.toISOString().split('T')[1].replace('Z', ''),
      sourceRegion: REGIONS[0],
      eventTopic: selectedTemplate.topic,
      latencyMs: 0.38,
      payloadBytes: 520,
      status: 'DELIVERED',
      data: {
        ...selectedTemplate.defaultData,
        manualTrigger: true,
        dispatchedAt: now.toISOString()
      }
    };
    setEvents((prev) => [manualEvent, ...prev.slice(0, 19)]);
    setSelectedEvent(manualEvent);
    setEventsCounter((c) => c + 1);
  };

  const filteredEvents = events.filter((e) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      e.id.toLowerCase().includes(q) ||
      e.sourceRegion.toLowerCase().includes(q) ||
      e.status.toLowerCase().includes(q) ||
      JSON.stringify(e.data).toLowerCase().includes(q)
    );
  });

  return (
    <section id="demo" className="py-20 md:py-28 bg-neutral-900 text-white relative overflow-hidden border-b border-neutral-800">
      {/* Glow */}
      <div className="absolute top-1/3 right-10 w-[500px] h-[300px] bg-blue-500/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[250px] bg-emerald-500/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-neutral-800">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400">
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              <span>Interactive Live Platform Demo</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span className="text-neutral-400 font-mono">Anycast Sandbox v2.4</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-display">
              Test real-time event streaming in the live console
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
              Interact directly with the Strata edge pipeline. Switch streaming schemas, emit synthetic payloads, simulate regional failover, and inspect live packet transformations.
            </p>
          </div>

          {/* Quick controls */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setIsStreaming(!isStreaming)}
              className="px-4 py-2 text-xs font-medium rounded-xl border border-neutral-700 hover:border-neutral-500 bg-neutral-800/80 hover:bg-neutral-800 text-neutral-200 transition-colors flex items-center gap-2"
            >
              {isStreaming ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-amber-400" />
                  <span>Pause Stream</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Resume Stream</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleEmitManualEvent}
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-white text-neutral-950 hover:bg-neutral-100 transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Emit Test Event</span>
            </button>
          </div>
        </div>

        {/* Console Workspace */}
        <div className="mt-8 bg-neutral-950 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl">
          {/* Top Control Bar */}
          <div className="p-4 sm:p-5 bg-neutral-900/90 border-b border-neutral-800 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            {/* Stream Template Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0">
              <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mr-2 hidden sm:inline-block">
                Pipeline:
              </span>
              {STREAM_TEMPLATES.map((tmpl) => (
                <button
                  key={tmpl.id}
                  type="button"
                  onClick={() => setSelectedTemplate(tmpl)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                    selectedTemplate.id === tmpl.id
                      ? 'bg-neutral-800 text-white font-semibold border border-neutral-700 shadow-xs'
                      : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/50'
                  }`}
                >
                  {tmpl.name}
                </button>
              ))}
            </div>

            {/* Filter Search & Chaos Drill */}
            <div className="flex items-center gap-3">
              <div className="relative flex-1 sm:w-64">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter events by ID, region..."
                  className="w-full pl-8 pr-3 py-1.5 text-xs bg-neutral-950 border border-neutral-800 rounded-lg text-neutral-200 placeholder:text-neutral-600 focus:outline-none focus:border-neutral-600 font-mono"
                />
              </div>

              {/* Chaos Outage Switch */}
              <button
                type="button"
                onClick={() => setChaosMode(!chaosMode)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all flex items-center gap-1.5 shrink-0 ${
                  chaosMode
                    ? 'bg-rose-950/60 border-rose-600 text-rose-300 font-semibold'
                    : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-neutral-200'
                }`}
                title="Test how Anycast routes around an upstream outage"
              >
                <Zap className={`w-3.5 h-3.5 ${chaosMode ? 'text-rose-400 fill-rose-400' : 'text-neutral-500'}`} />
                <span>{chaosMode ? 'Chaos: US-East Offline (BGP Failover Active)' : 'Simulate US-East Outage'}</span>
              </button>
            </div>
          </div>

          {/* 3-Stage Pipeline Visual Tracker */}
          <div className="p-4 sm:p-6 bg-neutral-900/40 border-b border-neutral-800">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Stage 1 */}
              <div className="p-4 rounded-2xl bg-neutral-900/80 border border-neutral-800/90 relative">
                <div className="flex items-center justify-between text-xs text-neutral-400 mb-2">
                  <span className="font-mono text-neutral-500 font-bold">STAGE 01</span>
                  <span className="text-emerald-400 font-mono flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    BGP Ingress
                  </span>
                </div>
                <h4 className="text-sm font-semibold text-white font-display">Kernel Bypass Wire Receive</h4>
                <p className="text-xs text-neutral-400 mt-1">eBPF network driver extracts frame to ring buffer.</p>
                <div className="mt-3 text-xs font-mono text-neutral-300 bg-neutral-950 p-2 rounded-lg flex justify-between">
                  <span>Latency:</span>
                  <span className="text-emerald-400 tabular-nums">0.14ms</span>
                </div>
              </div>

              {/* Stage 2 */}
              <div className="p-4 rounded-2xl bg-neutral-900/80 border border-neutral-800/90 relative">
                <div className="flex items-center justify-between text-xs text-neutral-400 mb-2">
                  <span className="font-mono text-neutral-500 font-bold">STAGE 02</span>
                  <span className="text-emerald-400 font-mono flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    SIMD Transform
                  </span>
                </div>
                <h4 className="text-sm font-semibold text-white font-display">Vectorized Compute</h4>
                <p className="text-xs text-neutral-400 mt-1">AVX-512 in-memory aggregation with zero GC stall.</p>
                <div className="mt-3 text-xs font-mono text-neutral-300 bg-neutral-950 p-2 rounded-lg flex justify-between">
                  <span>Throughput:</span>
                  <span className="text-emerald-400 tabular-nums">12.4M ops/sec</span>
                </div>
              </div>

              {/* Stage 3 */}
              <div className="p-4 rounded-2xl bg-neutral-900/80 border border-neutral-800/90 relative">
                <div className="flex items-center justify-between text-xs text-neutral-400 mb-2">
                  <span className="font-mono text-neutral-500 font-bold">STAGE 03</span>
                  <span className="text-emerald-400 font-mono flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Dispatched
                  </span>
                </div>
                <h4 className="text-sm font-semibold text-white font-display">Materialized Delivery</h4>
                <p className="text-xs text-neutral-400 mt-1">Subscribers and replicas receive state diff.</p>
                <div className="mt-3 text-xs font-mono text-neutral-300 bg-neutral-950 p-2 rounded-lg flex justify-between">
                  <span>Delivery P99:</span>
                  <span className="text-emerald-400 tabular-nums">
                    {chaosMode ? '2.14ms' : '0.84ms'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Interactive Split: Live Stream Feed (Left) & Event Payload Inspector (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[420px]">
            {/* Live Feed Table (7 cols) */}
            <div className="lg:col-span-7 border-b lg:border-b-0 lg:border-r border-neutral-800 p-4 sm:p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 text-xs text-neutral-400 border-b border-neutral-800/80 font-mono">
                  <span>LIVE INGESTION STREAM ({filteredEvents.length} events)</span>
                  <span>TOTAL: {eventsCounter.toLocaleString()}</span>
                </div>

                <div className="mt-3 space-y-1.5 max-h-[360px] overflow-y-auto pr-1">
                  {filteredEvents.map((evt) => {
                    const isSelected = selectedEvent?.id === evt.id;
                    return (
                      <div
                        key={evt.id}
                        onClick={() => setSelectedEvent(evt)}
                        className={`p-3 rounded-xl border font-mono text-xs cursor-pointer transition-all flex items-center justify-between gap-3 ${
                          isSelected
                            ? 'bg-neutral-800/90 border-neutral-600 text-white shadow-sm'
                            : 'bg-neutral-950/60 border-neutral-800/70 text-neutral-300 hover:bg-neutral-800/40'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                          <span className="font-semibold text-neutral-200">{evt.id}</span>
                          <span className="text-neutral-500 text-[11px] truncate">
                            {evt.sourceRegion}
                          </span>
                        </div>

                        <div className="flex items-center gap-3 shrink-0 text-right">
                          <span className="text-neutral-400 text-[11px]">
                            {evt.payloadBytes} B
                          </span>
                          <span className="text-emerald-400 font-semibold tabular-nums text-[11px]">
                            {evt.latencyMs}ms
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Status footer */}
              <div className="pt-3 mt-3 border-t border-neutral-800/80 flex items-center justify-between text-xs text-neutral-500 font-mono">
                <span>Protocol: gRPC / HTTP3 Wire</span>
                <span>Buffer utilization: 18.4%</span>
              </div>
            </div>

            {/* Event Payload Inspector (5 cols) */}
            <div className="lg:col-span-5 p-4 sm:p-6 flex flex-col justify-between bg-neutral-950/90">
              {selectedEvent ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                    <div className="flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-neutral-400" />
                      <span className="text-xs font-semibold text-neutral-200 font-mono">
                        Payload Inspector
                      </span>
                    </div>
                    <span className="text-xs font-mono text-emerald-400 bg-emerald-950/50 border border-emerald-800 px-2 py-0.5 rounded">
                      {selectedEvent.status}
                    </span>
                  </div>

                  {/* Metadata Chips */}
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                    <div className="p-2.5 bg-neutral-900 rounded-xl border border-neutral-800">
                      <span className="text-[10px] text-neutral-500 uppercase block">Event ID</span>
                      <span className="text-neutral-200 font-medium truncate block">{selectedEvent.id}</span>
                    </div>
                    <div className="p-2.5 bg-neutral-900 rounded-xl border border-neutral-800">
                      <span className="text-[10px] text-neutral-500 uppercase block">Edge POP</span>
                      <span className="text-neutral-200 font-medium truncate block">{selectedEvent.sourceRegion}</span>
                    </div>
                    <div className="p-2.5 bg-neutral-900 rounded-xl border border-neutral-800">
                      <span className="text-[10px] text-neutral-500 uppercase block">End-to-End Latency</span>
                      <span className="text-emerald-400 font-semibold tabular-nums block">{selectedEvent.latencyMs} ms</span>
                    </div>
                    <div className="p-2.5 bg-neutral-900 rounded-xl border border-neutral-800">
                      <span className="text-[10px] text-neutral-500 uppercase block">Timestamp</span>
                      <span className="text-neutral-300 tabular-nums block">{selectedEvent.timestamp}</span>
                    </div>
                  </div>

                  {/* Raw JSON representation */}
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-mono uppercase text-neutral-500 block">
                      Decoded Wire Payload:
                    </span>
                    <pre className="p-3.5 bg-neutral-900 rounded-xl text-neutral-200 font-mono text-xs overflow-x-auto leading-relaxed border border-neutral-800 max-h-[190px]">
                      {JSON.stringify(
                        {
                          event_id: selectedEvent.id,
                          topic: selectedEvent.eventTopic,
                          origin: selectedEvent.sourceRegion,
                          latency_ms: selectedEvent.latencyMs,
                          payload: selectedEvent.data,
                        },
                        null,
                        2
                      )}
                    </pre>
                  </div>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-xs text-neutral-500">
                  Select an event in the stream table to inspect wire payload
                </div>
              )}

              {/* Inspector bottom info */}
              <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-between text-xs text-neutral-500">
                <span>Cryptographic hash verified</span>
                <span className="text-neutral-400 font-mono">Zero serialization drop</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
