import { useState, useRef, useEffect, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { askPortfolioAssistant, type ChatMessage } from '../../data/aiAssistant.ts';
import { navigate } from '../router.ts';
import { MessageSquare, X, Send, Terminal, ArrowUpRight, Sparkles } from 'lucide-react';

interface ChatWidgetProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export function ChatWidget({ isOpen, onClose, onOpen }: ChatWidgetProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      role: 'assistant',
      content:
        'Hello! I am Mohd Tauheed Ansari’s portfolio intelligence assistant. I am strictly grounded in Tauheed’s Salesforce CRM projects, Apex architecture, Lightning Web Components (LWC), Flows, Agentforce, and experience at KloudCodey. What would you like to verify?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const quickPrompts = [
    'Tell me about the Real Estate CRM project',
    'How does your Salesforce-to-OpenAI MCP server work?',
    'What is your experience with LWC and Flows?',
    'Explain your Apex Trigger & Batch architecture',
  ];

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || inputValue;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await askPortfolioAssistant(textToSend);

      const assistantMsg: ChatMessage = {
        id: `asst-${Date.now()}`,
        role: 'assistant',
        content: response.text,
        referencedSlugs: response.referencedSlugs,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `asst-err-${Date.now()}`,
          role: 'assistant',
          content: 'An error occurred while generating a response. Please review the case studies directly or send an email inquiry.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSend();
  };

  return (
    <>
      {/* Accessible Chat Modal / Drawer */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="chat-dialog-heading"
          className="fixed inset-0 sm:inset-auto sm:bottom-6 sm:right-6 z-50 flex h-full sm:h-[620px] w-full sm:w-[460px] flex-col border border-[#E5E5E0] bg-[#FAFAF9] shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#E5E5E0] bg-white px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#D92D20] animate-pulse" />
              <div>
                <h3 id="chat-dialog-heading" className="font-mono text-xs font-semibold uppercase tracking-wider text-[#111111]">
                  Portfolio AI Grounding Engine
                </h3>
                <span className="font-mono text-[10px] text-[#767676]">
                  AI assistant, answers may be imperfect
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="border border-[#E5E5E0] p-1.5 text-[#767676] hover:border-[#111111] hover:text-[#111111]"
              aria-label="Close portfolio assistant dialog"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Quick Prompts Bar */}
          <div className="border-b border-[#E5E5E0] bg-[#F4F4F0] px-4 py-2 overflow-x-auto">
            <div className="flex items-center gap-2 text-[10px] font-mono whitespace-nowrap">
              <span className="text-[#767676] uppercase">Suggestions:</span>
              {quickPrompts.map((prompt, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleSend(prompt)}
                  disabled={isLoading}
                  className="border border-[#E5E5E0] bg-white px-2 py-1 text-[#333333] hover:border-[#111111] hover:text-[#111111]"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Message History */}
          <div
            aria-live="polite"
            className="flex-1 overflow-y-auto p-4 space-y-4 text-xs font-sans"
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.role === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div className="mb-1 flex items-center gap-1.5 font-mono text-[10px] text-[#767676]">
                  <span>{msg.role === 'user' ? 'GUEST' : 'PORTFOLIO_AI'}</span>
                  <span>•</span>
                  <span>{msg.timestamp}</span>
                </div>

                <div
                  className={`max-w-[88%] p-3.5 leading-relaxed ${
                    msg.role === 'user'
                      ? 'border border-[#111111] bg-[#111111] text-[#FAFAF9]'
                      : 'border border-[#E5E5E0] bg-white text-[#222222]'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.content}</p>

                  {/* Referenced Case Studies Links */}
                  {msg.referencedSlugs && msg.referencedSlugs.length > 0 && (
                    <div className="mt-3 border-t border-[#F0F0EC] pt-2 space-y-1">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[#767676] block">
                        Verified Sources:
                      </span>
                      {msg.referencedSlugs.map((slug) => (
                        <button
                          key={slug}
                          onClick={() => {
                            onClose();
                            navigate(`/projects/${slug}`);
                          }}
                          className="flex items-center gap-1 font-mono text-[11px] text-[#D92D20] hover:underline"
                        >
                          <span>/projects/{slug}</span>
                          <ArrowUpRight className="h-3 w-3" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex flex-col items-start">
                <div className="mb-1 font-mono text-[10px] text-[#767676]">PORTFOLIO_AI • Thinking</div>
                <div className="border border-[#E5E5E0] bg-white p-3 font-mono text-xs text-[#555555] flex items-center gap-2">
                  <span className="h-1.5 w-1.5 bg-[#D92D20] animate-bounce" />
                  <span>Synthesizing portfolio telemetry and benchmarks...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form onSubmit={handleFormSubmit} className="border-t border-[#E5E5E0] bg-white p-3">
            <div className="flex items-center gap-2">
              <label htmlFor="chat-input-field" className="sr-only">
                Ask a question about Tauheed's work or architecture
              </label>
              <input
                id="chat-input-field"
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about benchmarks, Raft, latency..."
                maxLength={400}
                disabled={isLoading}
                className="flex-1 border border-[#E5E5E0] bg-[#FAFAF9] px-3 py-2 text-xs text-[#111111] placeholder:text-[#999999] focus:border-[#111111] focus:outline-none"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                className="border border-[#111111] bg-[#111111] px-3.5 py-2 text-xs font-mono text-[#FAFAF9] hover:bg-neutral-800 disabled:opacity-40"
                aria-label="Send query"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="mt-2 flex items-center justify-between text-[10px] font-mono text-[#767676]">
              <span>Grounded in actual production code</span>
              <span>ESC to exit</span>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
