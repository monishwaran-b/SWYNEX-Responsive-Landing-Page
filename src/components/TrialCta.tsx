import { useState } from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Terminal } from 'lucide-react';

export function TrialCta() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <section className="py-20 md:py-24 bg-neutral-950 text-white relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-blue-600/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-400">
            <Terminal className="w-3.5 h-3.5 text-blue-400" />
            <span>Developer Sandbox</span>
            <span aria-hidden="true">·</span>
            <span>Zero-Friction Ingestion</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-display text-balance">
            Deploy your first real-time edge pipeline in under 5 minutes.
          </h2>

          <p className="text-sm sm:text-base text-neutral-400 max-w-xl mx-auto leading-relaxed text-balance">
            Connect your local CLI, stream test events, and benchmark global tail latency immediately without entering billing information.
          </p>

          {/* Form */}
          {!submitted ? (
            <form onSubmit={handleSubmit} className="mt-8 max-w-md mx-auto flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="flex-1 px-4 py-3 text-sm bg-neutral-900 border border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-white transition-all text-white placeholder:text-neutral-500"
              />
              <button
                type="submit"
                className="px-6 py-3 text-sm font-semibold text-neutral-950 bg-white hover:bg-neutral-100 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 whitespace-nowrap active:scale-95"
              >
                <span>Get API Key</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <div className="mt-8 p-6 bg-neutral-900 border border-neutral-800 rounded-2xl max-w-md mx-auto text-center space-y-2 animate-in fade-in">
              <div className="flex items-center justify-center gap-2 text-emerald-400 font-semibold text-sm">
                <CheckCircle2 className="w-5 h-5" />
                <span>Verification link dispatched</span>
              </div>
              <p className="text-xs text-neutral-400">
                Check <span className="font-mono text-neutral-200">{email}</span> to verify your developer sandbox credentials.
              </p>
            </div>
          )}

          {/* Guarantees */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-neutral-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              SOC2 Type II Certified
            </span>
            <span aria-hidden="true">·</span>
            <span>No credit card required</span>
            <span aria-hidden="true">·</span>
            <span>CLI ready for macOS, Linux, & Windows</span>
          </div>
        </div>
      </div>
    </section>
  );
}
