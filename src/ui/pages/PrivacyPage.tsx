import { useEffect } from 'react';
import { navigate } from '../router.ts';
import { ArrowLeft, Shield, Lock, EyeOff, Server, Clock } from 'lucide-react';

export function PrivacyPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = 'Privacy & Data Ethics | Tauheed Ansari';
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAF9] pb-24 text-[#111111]">
      {/* Return Bar */}
      <div className="border-b border-[#E5E5E0] bg-white sticky top-16 z-30">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 font-mono text-xs">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-[#555555] hover:text-[#111111] focus:outline-none"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span className="uppercase tracking-wider">Back to Portfolio Index</span>
          </button>
          <span className="font-mono text-[#767676]">COMPLIANCE: PRIVACY-BY-DESIGN</span>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 pt-12 sm:px-6 sm:pt-16 lg:px-8">
        <header className="border-b border-[#E5E5E0] pb-8">
          <div className="flex items-center gap-2 font-mono text-xs text-[#D92D20] mb-2 uppercase tracking-wider">
            <Shield className="h-3.5 w-3.5" />
            <span>Architectural Guarantee</span>
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-[#111111]">
            Privacy &amp; Data Ethics Policy
          </h1>
          <p className="mt-4 text-base text-[#555555] leading-relaxed max-w-2xl font-mono text-xs">
            Effective Date: October 2026 • Zero Ad-Trackers • Zero Third-Party Advertising Cookies
          </p>
        </header>

        <div className="mt-12 space-y-10 text-xs sm:text-sm text-[#333333] leading-relaxed">
          {/* Section 1: Philosophy */}
          <section className="border-b border-[#E5E5E0] pb-8">
            <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-[#111111] mb-2">
              <EyeOff className="h-4 w-4 text-[#767676]" />
              <span>01 / Data Minimization Invariant</span>
            </div>
            <p>
              This website is engineered according to the principle of least privilege. We do not operate behavioral tracking scripts, cross-site identity graphs, or ad-tech pixels. Your IP address is never stored or aggregated into advertising profiles.
            </p>
          </section>

          {/* Section 2: Contact Form Transmission & TTL */}
          <section className="border-b border-[#E5E5E0] pb-8">
            <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-[#111111] mb-2">
              <Clock className="h-4 w-4 text-[#767676]" />
              <span>02 / Contact Form Submissions &amp; 90-Day TTL</span>
            </div>
            <p>
              When you submit a technical inquiry through the contact form, the payload is transmitted securely via TLS 1.3. Contact messages are retained strictly for the purpose of communicating regarding potential advisory or engineering engagements.
            </p>
            <p className="mt-2 text-[#555555]">
              All inquiries are subject to a documented <strong>90-day retention TTL (Time-To-Live)</strong>, after which conversation records are permanently purged from active storage.
            </p>
          </section>

          {/* Section 3: Cookies & Storage */}
          <section className="border-b border-[#E5E5E0] pb-8">
            <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-[#111111] mb-2">
              <Lock className="h-4 w-4 text-[#767676]" />
              <span>03 / Storage &amp; Session Cookies</span>
            </div>
            <p>
              The public-facing portfolio operates completely cookie-free. Local browser storage is utilized strictly for ephemeral UI state (such as your active project tag filter and offline portfolio cache). The password-authenticated owner console (<code className="bg-[#F4F4F0] px-1.5 py-0.5 font-mono text-xs">/admin</code>) sets only a single strictly necessary, HTTP-Only, Secure session token for administrative authorization.
            </p>
          </section>

          {/* Section 4: AI Assistant Grounding & Telemetry */}
          <section className="border-b border-[#E5E5E0] pb-8">
            <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-[#111111] mb-2">
              <Server className="h-4 w-4 text-[#767676]" />
              <span>04 / Portfolio AI Assistant Grounding</span>
            </div>
            <p>
              Queries dispatched to the interactive portfolio assistant are processed with transient grounding. Conversations are not sold, retained for training commercial foundation models, or indexed into persistent behavioral logs.
            </p>
          </section>

          {/* Section 5: Rights */}
          <section>
            <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-[#111111] mb-2">
              <span>05 / Rights &amp; Direct Data Requests</span>
            </div>
            <p>
              To request immediate erasure or an export of any message previously sent, direct an encrypted message to{' '}
              <a href="mailto:tauheedansari269@gmail.com" className="font-mono text-[#D92D20] underline">
                tauheedansari269@gmail.com
              </a>
              . Requests are addressed within 48 hours.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
