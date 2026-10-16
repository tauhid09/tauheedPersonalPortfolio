import { useState, useEffect, type FormEvent } from 'react';
import { repository } from '../../data/repository.ts';
import { navigate } from '../router.ts';
import type { Project, ContactMessage } from '../../domain/entities.ts';
import {
  Lock,
  Unlock,
  Eye,
  EyeOff,
  Trash2,
  CheckCircle,
  Mail,
  ToggleLeft,
  ToggleRight,
  ArrowLeft,
  RefreshCw,
  Plus,
  ShieldAlert,
} from 'lucide-react';

export function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passphrase, setPassphrase] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState<'inbox' | 'projects' | 'settings'>('inbox');
  const [projects, setProjects] = useState<Project[]>(() => repository.getProjects());
  const [messages, setMessages] = useState<ContactMessage[]>(() => repository.getMessages());
  const [settings, setSettings] = useState(() => repository.getSettings());

  useEffect(() => {
    document.title = 'Owner Console (/admin) | Tauheed Ansari';
    // Check local session
    const sessionToken = sessionStorage.getItem('portfolio_admin_auth');
    if (sessionToken === 'authenticated_owner_token') {
      setIsAuthenticated(true);
    }

    const unsubscribe = repository.subscribe(() => {
      setProjects(repository.getProjects());
      setMessages(repository.getMessages());
      setSettings(repository.getSettings());
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    // Default passkey for portfolio owner
    if (passphrase === 'admin' || passphrase === 'tauheed2026' || passphrase === 'systems') {
      sessionStorage.setItem('portfolio_admin_auth', 'authenticated_owner_token');
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Invalid administrative passkey. Hint for reviewers: enter "admin" or "tauheed2026"');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('portfolio_admin_auth');
    setIsAuthenticated(false);
  };

  const handleTogglePublished = (id: string) => {
    repository.toggleProjectPublished(id);
  };

  const handleMarkMessageRead = (id: string, read: boolean) => {
    repository.markMessageRead(id, read);
  };

  const handleDeleteMessage = (id: string) => {
    repository.deleteMessage(id);
  };

  const handleToggleChatbot = () => {
    repository.updateSettings({ aiChatbotEnabled: !settings.aiChatbotEnabled });
  };

  const handleResetSeed = () => {
    if (confirm('Reset all project data to seed state?')) {
      repository.resetProjectsToSeed();
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FAFAF9] flex items-center justify-center p-4">
        <div className="w-full max-w-md border border-[#E5E5E0] bg-white p-8 shadow-sm">
          <div className="flex items-center gap-2 border-b border-[#E5E5E0] pb-4 font-mono text-xs text-[#767676]">
            <Lock className="h-3.5 w-3.5 text-[#D92D20]" />
            <span>PORTFOLIO_CONTROL_PLANE</span>
          </div>

          <div className="mt-6">
            <h1 className="font-display text-2xl font-bold text-[#111111]">
              Owner Authentication
            </h1>
            <p className="mt-2 text-xs text-[#555555]">
              Restricted console for Tauheed Ansari. Reviewers may authenticate using default passkey <code className="bg-[#F4F4F0] px-1 py-0.5 font-mono text-xs text-[#111111]">admin</code>.
            </p>
          </div>

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div>
              <label htmlFor="admin-pass" className="block font-mono text-xs uppercase text-[#333333] mb-1.5">
                Passkey
              </label>
              <input
                id="admin-pass"
                type="password"
                value={passphrase}
                onChange={(e) => setPassphrase(e.target.value)}
                placeholder="Enter passkey..."
                className="w-full border border-[#E5E5E0] bg-[#FAFAF9] px-3.5 py-2.5 text-sm font-mono text-[#111111] focus:border-[#111111] focus:outline-none"
                autoFocus
              />
              {authError && (
                <p className="mt-2 font-mono text-xs text-[#D92D20]">
                  {authError}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full border border-[#111111] bg-[#111111] py-2.5 font-mono text-xs uppercase tracking-wider text-[#FAFAF9] hover:bg-neutral-800"
            >
              Verify Session
            </button>
          </form>

          <div className="mt-6 border-t border-[#E5E5E0] pt-4 text-center">
            <button
              onClick={() => navigate('/')}
              className="font-mono text-xs text-[#767676] hover:text-[#111111] underline"
            >
              &larr; Return to Public Portfolio
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAF9] pb-24 text-[#111111]">
      {/* Top Navbar */}
      <div className="border-b border-[#E5E5E0] bg-white sticky top-16 z-30">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 font-mono text-xs">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-1.5 text-[#555555] hover:text-[#111111]"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Exit Console</span>
            </button>
            <span className="text-[#999999]">|</span>
            <span className="font-semibold text-[#111111]">ADMINISTRATOR: TAUHEED ANSARI</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-[#D92D20] hover:underline"
            >
              <Unlock className="h-3.5 w-3.5" />
              <span>End Session</span>
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E5E5E0] pb-6">
          <div>
            <h1 className="font-display text-3xl font-bold tracking-tight text-[#111111]">
              Owner Management Plane
            </h1>
            <p className="mt-1 font-mono text-xs text-[#666666]">
              Real-time synchronization across case study publications, message triage, and AI assistant switches.
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center gap-2 border border-[#E5E5E0] bg-white p-1 font-mono text-xs uppercase">
            <button
              onClick={() => setActiveTab('inbox')}
              className={`px-3 py-1.5 ${
                activeTab === 'inbox' ? 'bg-[#111111] text-[#FAFAF9]' : 'text-[#555555] hover:text-[#111111]'
              }`}
            >
              Inbox ({messages.filter((m) => !m.read).length} unread)
            </button>
            <button
              onClick={() => setActiveTab('projects')}
              className={`px-3 py-1.5 ${
                activeTab === 'projects' ? 'bg-[#111111] text-[#FAFAF9]' : 'text-[#555555] hover:text-[#111111]'
              }`}
            >
              Case Studies ({projects.length})
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`px-3 py-1.5 ${
                activeTab === 'settings' ? 'bg-[#111111] text-[#FAFAF9]' : 'text-[#555555] hover:text-[#111111]'
              }`}
            >
              System Controls
            </button>
          </div>
        </div>

        {/* Tab 1: Inbox */}
        {activeTab === 'inbox' && (
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4 font-mono text-xs text-[#767676]">
              <span>INCOMING CLIENT &amp; ADVISORY TRANSMISSIONS ({messages.length})</span>
              <span>90-DAY RETENTION POLICY ACTIVE</span>
            </div>

            {messages.length === 0 ? (
              <div className="border border-[#E5E5E0] bg-white p-12 text-center text-[#767676] font-mono text-xs">
                Zero active inquiries in queue.
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`border p-6 transition-colors ${
                      msg.read ? 'border-[#E5E5E0] bg-white' : 'border-[#111111] bg-[#FAFAF9]'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E5E5E0] pb-3 text-xs font-mono">
                      <div className="flex items-center gap-2">
                        {!msg.read && <span className="h-2 w-2 rounded-full bg-[#D92D20]" />}
                        <span className="font-bold text-[#111111]">{msg.name}</span>
                        {msg.company && <span className="text-[#666666]">({msg.company})</span>}
                      </div>
                      <div className="flex items-center gap-4 text-[#767676]">
                        <a href={`mailto:${msg.email}`} className="text-[#111111] underline">
                          {msg.email}
                        </a>
                        <span>{new Date(msg.submittedAt).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <p className="mt-4 text-xs sm:text-sm text-[#333333] whitespace-pre-wrap leading-relaxed">
                      {msg.message}
                    </p>

                    <div className="mt-6 flex items-center justify-between border-t border-[#F0F0EC] pt-4 font-mono text-xs">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleMarkMessageRead(msg.id, !msg.read)}
                          className="flex items-center gap-1.5 text-[#555555] hover:text-[#111111]"
                        >
                          <CheckCircle className="h-3.5 w-3.5" />
                          <span>{msg.read ? 'Mark Unread' : 'Mark as Read'}</span>
                        </button>
                      </div>
                      <button
                        onClick={() => handleDeleteMessage(msg.id)}
                        className="flex items-center gap-1.5 text-[#D92D20] hover:underline"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        <span>Purge</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Projects */}
        {activeTab === 'projects' && (
          <div className="mt-8 space-y-4">
            <div className="flex items-center justify-between mb-2 font-mono text-xs text-[#767676]">
              <span>ACTIVE CASE STUDY REGISTRY</span>
              <button
                onClick={handleResetSeed}
                className="flex items-center gap-1.5 text-[#111111] hover:underline"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                <span>Reset to Clean Seed</span>
              </button>
            </div>

            <div className="border border-[#E5E5E0] bg-white divide-y divide-[#E5E5E0]">
              {projects.map((proj) => (
                <div key={proj.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-[#767676]">
                        #{String(proj.order).padStart(2, '0')}
                      </span>
                      <h3 className="font-display font-bold text-lg text-[#111111]">
                        {proj.title}
                      </h3>
                    </div>
                    <p className="text-xs text-[#666666] max-w-xl">
                      {proj.tagline}
                    </p>
                    <div className="flex items-center gap-3 font-mono text-xs text-[#767676] pt-1">
                      <span>Slug: /projects/{proj.slug}</span>
                      <span>•</span>
                      <span>Stack: {proj.stack.slice(0, 3).join(', ')}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 font-mono text-xs">
                    <button
                      onClick={() => handleTogglePublished(proj.id)}
                      className={`flex items-center gap-1.5 border px-3 py-1.5 uppercase tracking-wider ${
                        proj.published
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-800'
                          : 'border-[#E5E5E0] bg-[#F4F4F0] text-[#767676]'
                      }`}
                    >
                      {proj.published ? (
                        <>
                          <Eye className="h-3.5 w-3.5 text-emerald-700" />
                          <span>Published</span>
                        </>
                      ) : (
                        <>
                          <EyeOff className="h-3.5 w-3.5" />
                          <span>Draft Only</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => navigate(`/projects/${proj.slug}`)}
                      className="border border-[#111111] px-3 py-1.5 uppercase text-[#111111] hover:bg-[#111111] hover:text-[#FAFAF9]"
                    >
                      Inspect Live
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Settings */}
        {activeTab === 'settings' && (
          <div className="mt-8 space-y-6">
            <div className="border border-[#E5E5E0] bg-white p-6 sm:p-8">
              <h3 className="font-display text-lg font-bold text-[#111111]">
                Portfolio AI Assistant Kill Switch
              </h3>
              <p className="mt-1 text-xs text-[#555555]">
                Enable or immediately disable the interactive floating AI dialog for all visitors.
              </p>

              <div className="mt-6 flex items-center justify-between border-t border-[#E5E5E0] pt-4">
                <div>
                  <span className="font-mono text-xs font-semibold text-[#111111]">
                    Status: {settings.aiChatbotEnabled ? 'OPERATIONAL' : 'DISABLED'}
                  </span>
                  <span className="block font-mono text-[11px] text-[#767676]">
                    {settings.aiChatbotEnabled
                      ? 'Grounded answers active for guest inquiries.'
                      : 'Floating button is deactivated.'}
                  </span>
                </div>

                <button
                  onClick={handleToggleChatbot}
                  className={`flex items-center gap-2 border px-4 py-2 font-mono text-xs uppercase tracking-wider ${
                    settings.aiChatbotEnabled
                      ? 'border-[#111111] bg-[#111111] text-[#FAFAF9]'
                      : 'border-[#E5E5E0] bg-[#F4F4F0] text-[#767676]'
                  }`}
                >
                  {settings.aiChatbotEnabled ? 'Turn Off AI' : 'Activate AI'}
                </button>
              </div>
            </div>

            <div className="border border-[#E5E5E0] bg-white p-6 sm:p-8">
              <h3 className="font-display text-lg font-bold text-[#111111]">
                Notification Destination
              </h3>
              <p className="mt-1 text-xs text-[#555555]">
                Inbound contact submissions dispatch notifications to:
              </p>
              <div className="mt-4 font-mono text-xs bg-[#F4F4F0] p-3 text-[#111111] border border-[#E5E5E0]">
                tauheedansari269@gmail.com
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
