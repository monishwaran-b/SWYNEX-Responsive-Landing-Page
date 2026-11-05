import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { LiveProductDemo } from './components/LiveProductDemo';
import { InteractiveSimulator } from './components/InteractiveSimulator';
import { BentoGrid } from './components/BentoGrid';
import { ArchitectureSteps } from './components/ArchitectureSteps';
import { CaseStudies } from './components/CaseStudies';
import { Pricing } from './components/Pricing';
import { Faq } from './components/Faq';
import { TrialCta } from './components/TrialCta';
import { Footer } from './components/Footer';
import { GitHubModal } from './components/GitHubModal';
import { TrialModal } from './components/TrialModal';
import { GitBranch, ExternalLink, Sparkles } from 'lucide-react';

export default function App() {
  // Theme state
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('strata_theme');
      if (stored) return stored === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Repository state (configured to user request)
  const [repoUrl, setRepoUrl] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('strata_repo_url') || 'https://github.com/monishwaran/strata-cloud-landing';
    }
    return 'https://github.com/monishwaran/strata-cloud-landing';
  });

  // Modals state
  const [isRepoModalOpen, setIsRepoModalOpen] = useState(false);
  const [isTrialModalOpen, setIsTrialModalOpen] = useState(false);
  const [selectedPlanForTrial, setSelectedPlanForTrial] = useState('Scale');

  // Sync theme with HTML documentElement
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('strata_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('strata_theme', 'light');
    }
  }, [darkMode]);

  const handleToggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  const handleUpdateRepoUrl = (newUrl: string) => {
    setRepoUrl(newUrl);
    localStorage.setItem('strata_repo_url', newUrl);
  };

  const handleOpenTrialWithPlan = (planName: string) => {
    setSelectedPlanForTrial(planName);
    setIsTrialModalOpen(true);
  };

  const scrollToDemo = () => {
    const el = document.getElementById('demo');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100 font-sans selection:bg-neutral-900 selection:text-white dark:selection:bg-white dark:selection:text-neutral-900 transition-colors duration-200">
      {/* Top GitHub Repo Notice Banner */}
      <aside aria-label="Project Repository Banner" className="bg-neutral-900 text-white dark:bg-neutral-900/90 border-b border-neutral-800 text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="p-0.5 bg-neutral-800 rounded text-neutral-300">
              <GitBranch className="w-3.5 h-3.5" />
            </span>
            <span className="text-neutral-300">
              Project Repository ready for submission:
            </span>
            <a
              href={repoUrl}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-blue-400 hover:underline flex items-center gap-1 font-semibold break-all"
            >
              {repoUrl}
              <ExternalLink className="w-3 h-3 shrink-0" />
            </a>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsRepoModalOpen(true)}
              className="px-2.5 py-1 text-[11px] font-medium bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-lg transition-colors flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>Submit / Configure Git URL</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Navigation */}
      <Navbar
        onOpenRepo={() => setIsRepoModalOpen(true)}
        onOpenTrial={() => handleOpenTrialWithPlan('Scale')}
        darkMode={darkMode}
        onToggleTheme={handleToggleTheme}
      />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <Hero
          onOpenTrial={() => handleOpenTrialWithPlan('Scale')}
          onExploreDemo={scrollToDemo}
        />

        {/* Live Interactive Product Demo & Console */}
        <LiveProductDemo />

        {/* Bento Grid: Core Capabilities */}
        <BentoGrid />

        {/* Interactive Benchmark & Latency Simulator */}
        <InteractiveSimulator />

        {/* Architecture & Code Workflow */}
        <ArchitectureSteps />

        {/* Case Studies & Customer Proof */}
        <CaseStudies />

        {/* Transparent Pricing Section */}
        <Pricing onSelectPlan={handleOpenTrialWithPlan} />

        {/* Technical FAQ */}
        <Faq />

        {/* Lead Capture Banner */}
        <TrialCta />
      </main>

      {/* Footer */}
      <Footer onOpenRepo={() => setIsRepoModalOpen(true)} repoUrl={repoUrl} />

      {/* Interactive GitHub Hub Modal */}
      <GitHubModal
        isOpen={isRepoModalOpen}
        onClose={() => setIsRepoModalOpen(false)}
        repoUrl={repoUrl}
        onUpdateRepoUrl={handleUpdateRepoUrl}
      />

      {/* Interactive Free Trial Onboarding Modal */}
      <TrialModal
        isOpen={isTrialModalOpen}
        onClose={() => setIsTrialModalOpen(false)}
        initialPlan={selectedPlanForTrial}
      />
    </div>
  );
}
