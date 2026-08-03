'use client';

import { Search } from 'lucide-react';
import { useSearchContext } from 'fumadocs-ui/contexts/search';

export default function SearchButton() {
  const { setOpenSearch } = useSearchContext();
  return (
    <button className="eng-search-button" type="button" onClick={() => setOpenSearch(true)} aria-label="Search engineering documentation">
      <Search aria-hidden="true" size={17} />
      <span>Search documentation</span>
      <kbd>⌘ K</kbd>
    </button>
  );
}
