import { useState } from 'react';
import { Check, Copy, ExternalLink, GitBranch, GitCommit, GitPullRequest, Github, Terminal, X } from 'lucide-react';

interface GitHubModalProps {
  isOpen: boolean;
  onClose: () => void;
  repoUrl: string;
  onUpdateRepoUrl: (url: string) => void;
}

export function GitHubModal({ isOpen, onClose, repoUrl, onUpdateRepoUrl }: GitHubModalProps) {
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [copiedCommand, setCopiedCommand] = useState(false);
  const [inputValue, setInputValue] = useState(repoUrl);
  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen) return null;

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(repoUrl);
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2000);
    } catch {
      // fallback
    }
  };

  const gitSnippet = `git init
git add .
git commit -m "feat: production responsive landing page"
git branch -M main
git remote add origin ${repoUrl}
git push -u origin main`;

  const handleCopyCommand = async () => {
    try {
      await navigator.clipboard.writeText(gitSnippet);
      setCopiedCommand(true);
      setTimeout(() => setCopiedCommand(false), 2000);
    } catch {
      // fallback
    }
  };

  const handleSaveRepo = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onUpdateRepoUrl(inputValue.trim());
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/60">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-xl">
              <Github className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
                GitHub Repository & Deployment Hub
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Verified repository configuration and quick push instructions
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-100 rounded-lg transition-colors hover:bg-neutral-200/50 dark:hover:bg-neutral-800"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Repository URL submission block */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label htmlFor="repo-input" className="text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-300">
                Repository URL
              </label>
              <span className="text-xs text-neutral-500 dark:text-neutral-400">
                Main branch: <code className="font-mono text-neutral-800 dark:text-neutral-200">main</code>
              </span>
            </div>

            <form onSubmit={handleSaveRepo} className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <input
                  id="repo-input"
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="https://github.com/username/repository"
                  className="w-full px-3.5 py-2.5 text-sm font-mono bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white transition-all text-neutral-900 dark:text-neutral-100"
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="px-4 py-2.5 text-xs font-medium text-white bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100 rounded-xl transition-colors whitespace-nowrap"
                >
                  {isSaved ? 'Saved!' : 'Submit / Update'}
                </button>
                <button
                  type="button"
                  onClick={handleCopyUrl}
                  className="px-3.5 py-2.5 text-xs font-medium border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 rounded-xl transition-colors flex items-center gap-1.5"
                  title="Copy repository link"
                >
                  {copiedUrl ? <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedUrl ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </form>

            <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
              <span>Active URL:</span>
              <a
                href={repoUrl}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 inline-flex break-all"
              >
                {repoUrl}
                <ExternalLink className="w-3 h-3 shrink-0" />
              </a>
            </div>
          </div>

          {/* Repo health & metadata stats */}
          <div className="grid grid-cols-3 gap-3 p-4 bg-neutral-50 dark:bg-neutral-950/60 rounded-xl border border-neutral-200 dark:border-neutral-800 text-center">
            <div>
              <div className="flex items-center justify-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400">
                <GitBranch className="w-3.5 h-3.5" />
                <span>Default Branch</span>
              </div>
              <p className="mt-1 font-mono text-sm font-semibold text-neutral-900 dark:text-neutral-100">main</p>
            </div>
            <div>
              <div className="flex items-center justify-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400">
                <GitCommit className="w-3.5 h-3.5" />
                <span>Architecture</span>
              </div>
              <p className="mt-1 font-mono text-sm font-semibold text-neutral-900 dark:text-neutral-100">React + Vite</p>
            </div>
            <div>
              <div className="flex items-center justify-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400">
                <GitPullRequest className="w-3.5 h-3.5" />
                <span>Responsive</span>
              </div>
              <p className="mt-1 font-mono text-sm font-semibold text-neutral-900 dark:text-neutral-100">100% Mobile</p>
            </div>
          </div>

          {/* Command Terminal Preview */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-300">
                <Terminal className="w-3.5 h-3.5" />
                <span>Git Push Instructions</span>
              </div>
              <button
                type="button"
                onClick={handleCopyCommand}
                className="text-xs text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 flex items-center gap-1 transition-colors"
              >
                {copiedCommand ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCommand ? 'Commands copied' : 'Copy commands'}</span>
              </button>
            </div>
            <pre className="p-4 bg-neutral-900 text-neutral-100 font-mono text-xs rounded-xl overflow-x-auto leading-relaxed border border-neutral-800">
              {gitSnippet}
            </pre>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/60">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200/60 dark:hover:bg-neutral-800 rounded-xl transition-colors"
          >
            Close
          </button>
          <a
            href={repoUrl}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 text-xs font-medium text-white bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100 rounded-xl transition-colors flex items-center gap-1.5"
          >
            <span>Open in GitHub</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
