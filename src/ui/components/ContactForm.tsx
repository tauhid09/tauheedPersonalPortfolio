import { useState, useRef, useEffect, type FormEvent } from 'react';
import { repository } from '../../data/repository.ts';
import { validateContactSubmission } from '../../domain/usecases.ts';
import { Send, CheckCircle2, AlertCircle, Mail, Linkedin, Github } from 'lucide-react';
import type { PortfolioOwner } from '../../domain/entities.ts';

interface ContactFormProps {
  owner: PortfolioOwner;
  onOpenResume?: () => void;
}

export function ContactForm({ owner }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    honeypot: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const mountTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    mountTimeRef.current = Date.now();
  }, []);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitStatus('idle');
    setStatusMessage('');

    const timeDelta = Date.now() - mountTimeRef.current;
    const validation = validateContactSubmission({
      ...formData,
      submitTimeDelta: timeDelta,
    });

    if (!validation.success) {
      setErrors(validation.errors || {});
      setSubmitStatus('error');
      setStatusMessage('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      repository.addMessage({
        name: formData.name,
        email: formData.email,
        message: formData.message,
      });

      setSubmitStatus('success');
      setStatusMessage('Thank you! Your message has been sent successfully.');
      setFormData({
        name: '',
        email: '',
        message: '',
        honeypot: '',
      });
      setErrors({});
    } catch {
      setSubmitStatus('error');
      setStatusMessage('An error occurred. Please contact via email directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
      {/* Left Info Column (Cols 1-5) */}
      <div className="lg:col-span-5 space-y-6">
        <div>
          <h3 className="font-display text-2xl font-bold tracking-tight text-[#111111]">
            Let&rsquo;s Connect
          </h3>
          <p className="mt-2 text-sm text-[#555555] leading-relaxed">
            Available for Salesforce Developer roles and CRM projects.
          </p>
        </div>

        {/* Action Links: Email button, LinkedIn, GitHub */}
        <div className="flex flex-col gap-3 font-mono text-xs">
          <a
            href={`mailto:${owner.email}`}
            className="inline-flex items-center gap-2 border border-[#111111] bg-[#111111] px-4 py-2.5 text-[#FAFAF9] hover:bg-neutral-800 transition-colors"
          >
            <Mail className="h-4 w-4" />
            <span>Email Directly</span>
          </a>

          <div className="flex items-center gap-3 pt-2">
            <a
              href={owner.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 border border-[#E5E5E0] bg-white px-3.5 py-2 text-[#333333] hover:border-[#111111] hover:text-[#111111] transition-colors"
            >
              <Linkedin className="h-3.5 w-3.5" />
              <span>LinkedIn</span>
            </a>

            <a
              href={owner.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 border border-[#E5E5E0] bg-white px-3.5 py-2 text-[#333333] hover:border-[#111111] hover:text-[#111111] transition-colors"
            >
              <Github className="h-3.5 w-3.5" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </div>

      {/* Right Form Column (Cols 6-12) */}
      <div className="lg:col-span-7">
        {submitStatus === 'success' && (
          <div className="mb-6 flex items-start gap-3 border border-emerald-300 bg-emerald-50 p-4 text-xs font-mono text-emerald-900">
            <CheckCircle2 className="h-4 w-4 text-emerald-700 shrink-0" />
            <span>{statusMessage}</span>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="mb-6 flex items-start gap-3 border border-[#D92D20]/40 bg-[#D92D20]/10 p-4 text-xs font-mono text-[#D92D20]">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{statusMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          {/* Honeypot field */}
          <div className="hidden" aria-hidden="true">
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={formData.honeypot}
              onChange={(e) => handleChange('honeypot', e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="contact-name"
              className="block font-mono text-xs uppercase tracking-wider text-[#333333] mb-1"
            >
              Name
            </label>
            <input
              id="contact-name"
              type="text"
              required
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className={`w-full border bg-white px-3.5 py-2 text-sm text-[#111111] focus:outline-none ${
                errors.name ? 'border-[#D92D20]' : 'border-[#E5E5E0] focus:border-[#111111]'
              }`}
              placeholder="Your name"
            />
            {errors.name && (
              <p className="mt-1 font-mono text-xs text-[#D92D20]">{errors.name}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="contact-email"
              className="block font-mono text-xs uppercase tracking-wider text-[#333333] mb-1"
            >
              Email
            </label>
            <input
              id="contact-email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className={`w-full border bg-white px-3.5 py-2 text-sm text-[#111111] focus:outline-none ${
                errors.email ? 'border-[#D92D20]' : 'border-[#E5E5E0] focus:border-[#111111]'
              }`}
              placeholder="name@example.com"
            />
            {errors.email && (
              <p className="mt-1 font-mono text-xs text-[#D92D20]">{errors.email}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="contact-message"
              className="block font-mono text-xs uppercase tracking-wider text-[#333333] mb-1"
            >
              Message
            </label>
            <textarea
              id="contact-message"
              required
              rows={4}
              value={formData.message}
              onChange={(e) => handleChange('message', e.target.value)}
              className={`w-full border bg-white p-3 text-sm text-[#111111] focus:outline-none resize-none ${
                errors.message ? 'border-[#D92D20]' : 'border-[#E5E5E0] focus:border-[#111111]'
              }`}
              placeholder="How can I help you?"
            />
            {errors.message && (
              <p className="mt-1 font-mono text-xs text-[#D92D20]">{errors.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 border border-[#111111] bg-[#111111] px-6 py-2.5 text-xs font-mono uppercase tracking-wider text-[#FAFAF9] hover:bg-neutral-800 disabled:opacity-50 transition-colors"
          >
            <Send className="h-3.5 w-3.5" />
            <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
