import { useState } from 'react';
import { CheckCircle2, ShieldCheck, Sparkles, X } from 'lucide-react';

interface TrialModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPlan?: string;
}

export function TrialModal({ isOpen, onClose, initialPlan = 'Scale' }: TrialModalProps) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [cloudProvider, setCloudProvider] = useState<'aws' | 'gcp' | 'azure'>('aws');
  const [plan, setPlan] = useState(initialPlan);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setEmail('');
    setName('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 rounded-lg transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div className="p-6 sm:p-8">
            <div className="space-y-1.5">
              <span className="text-xs font-semibold tracking-wider uppercase text-neutral-500 dark:text-neutral-400">
                Immediate Access
              </span>
              <h3 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
                Start Your 14-Day Free Trial
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                No credit card required. Full access to global edge POPs and sub-2ms pipelines.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ada Lovelace"
                  className="w-full px-3.5 py-2.5 text-sm bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white transition-all text-neutral-900 dark:text-neutral-100"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                  Work Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ada@company.com"
                  className="w-full px-3.5 py-2.5 text-sm bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white transition-all text-neutral-900 dark:text-neutral-100"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                  Target Cloud Environment
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['aws', 'gcp', 'azure'] as const).map((provider) => (
                    <button
                      key={provider}
                      type="button"
                      onClick={() => setCloudProvider(provider)}
                      className={`px-3 py-2 text-xs font-medium rounded-xl border text-center uppercase tracking-wide transition-colors ${
                        cloudProvider === provider
                          ? 'bg-neutral-900 text-white border-neutral-900 dark:bg-white dark:text-neutral-900 dark:border-white shadow-sm'
                          : 'bg-neutral-50 dark:bg-neutral-950 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-800 hover:border-neutral-400'
                      }`}
                    >
                      {provider}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                  Selected Tier
                </label>
                <select
                  value={plan}
                  onChange={(e) => setPlan(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white transition-all text-neutral-900 dark:text-neutral-100"
                >
                  <option value="Developer">Developer (Community / Free)</option>
                  <option value="Scale">Scale ($79/month)</option>
                  <option value="Enterprise">Enterprise (Dedicated VPC)</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-4 text-sm font-medium text-white bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <span>Provisioning Sandbox...</span>
                  ) : (
                    <>
                      <span>Launch Your Environment</span>
                      <Sparkles className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 pt-2 text-xs text-neutral-500 dark:text-neutral-400">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>SOC2 Type II Certified · 99.999% SLA Uptime Guarantee</span>
              </div>
            </form>
          </div>
        ) : (
          <div className="p-8 text-center space-y-4">
            <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
              Welcome aboard, {name}!
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-sm mx-auto">
              Your test cluster credentials and API token have been generated for <span className="font-mono text-neutral-900 dark:text-neutral-100">{email}</span>.
            </p>
            <div className="p-3.5 bg-neutral-100 dark:bg-neutral-800/60 rounded-xl text-xs font-mono text-neutral-700 dark:text-neutral-300">
              strata init --token st_sandbox_9948271a --region us-east
            </div>
            <button
              onClick={handleReset}
              className="mt-4 px-6 py-2.5 text-xs font-medium text-white bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100 rounded-xl transition-colors"
            >
              Back to Overview
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
