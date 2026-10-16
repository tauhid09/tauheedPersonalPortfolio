import { Search, Tag } from 'lucide-react';

interface FilterBarProps {
  tags: string[];
  selectedTag: string;
  onSelectTag: (tag: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  resultCount: number;
}

export function FilterBar({
  tags,
  selectedTag,
  onSelectTag,
  searchQuery,
  onSearchChange,
  resultCount,
}: FilterBarProps) {
  const allTags = ['all', ...tags];

  return (
    <div className="border border-[#E5E5E0] bg-[#FAFAF9] p-4 sm:p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Tag Filters with aria-pressed */}
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter projects by technology">
          <span className="mr-2 flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-[#767676]">
            <Tag className="h-3.5 w-3.5" />
            <span>Filter:</span>
          </span>

          {allTags.map((tag) => {
            const isSelected = selectedTag.toLowerCase() === tag.toLowerCase();
            return (
              <button
                key={tag}
                onClick={() => onSelectTag(tag === 'all' ? 'all' : tag)}
                aria-pressed={isSelected}
                className={`border px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-colors ${
                  isSelected
                    ? 'border-[#111111] bg-[#111111] text-[#FAFAF9] font-medium'
                    : 'border-[#E5E5E0] bg-transparent text-[#555555] hover:border-[#111111] hover:text-[#111111]'
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>

        {/* Live Search + Accessible Result Count */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 sm:w-64">
            <label htmlFor="project-search-input" className="sr-only">
              Search projects by title, stack, or problem statement
            </label>
            <input
              id="project-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search stack, problems..."
              className="w-full border border-[#E5E5E0] bg-white py-1.5 pr-8 pl-3 font-mono text-xs text-[#111111] placeholder:text-[#999999] focus:border-[#111111] focus:outline-none"
            />
            <Search className="pointer-events-none absolute top-1/2 right-2.5 h-3.5 w-3.5 -translate-y-1/2 text-[#999999]" />
          </div>

          {/* ARIA Live Region for Screen Readers */}
          <div
            aria-live="polite"
            aria-atomic="true"
            className="min-w-[5.5rem] text-right font-mono text-xs text-[#767676]"
          >
            <span>
              {resultCount} {resultCount === 1 ? 'case study' : 'case studies'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
