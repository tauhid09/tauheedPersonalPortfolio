import { useEffect } from 'react';
import { navigate } from '../router.ts';
import { ArrowLeft, AlertTriangle } from 'lucide-react';

export function NotFoundPage() {
  useEffect(() => {
    document.title = '404 - Specification Not Found | Tauheed Ansari';
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAF9] flex items-center justify-center p-4 text-[#111111]">
      <div className="w-full max-w-lg border border-[#E5E5E0] bg-white p-8 sm:p-12 text-center shadow-sm">
        <div className="mx-auto flex h-12 w-12 items-center justify-center border border-[#D92D20]/40 bg-[#D92D20]/10 text-[#D92D20] mb-6">
          <AlertTriangle className="h-6 w-6" />
        </div>

        <span className="font-mono text-xs uppercase tracking-widest text-[#D92D20]">
          HTTP 404 / ROUTE_UNDEFINED
        </span>

        <h1 className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#111111]">
          Resource Not Found
        </h1>

        <p className="mt-4 text-xs sm:text-sm text-[#555555] leading-relaxed">
          The requested uniform resource identifier is not mapped to any active case study, document, or management route.
        </p>

        <div className="mt-8 border-t border-[#E5E5E0] pt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 border border-[#111111] bg-[#111111] px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-[#FAFAF9] hover:bg-neutral-800"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Return to Portfolio Index</span>
          </button>
        </div>
      </div>
    </div>
  );
}
