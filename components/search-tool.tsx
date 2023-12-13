"use client"
import { useState } from 'react';
import { Hero } from '@/components/home/hero';
import { ToolCard } from '@/components/tool-card';

export function SearchTool() {
  const [searchQuery, setSearchQuery] = useState<string>(''); // Explicitly set the type to string

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle the search logic here, if needed
    console.log('Search query:', searchQuery);
  };

  return (
    <>
      <Hero searchQuery={searchQuery} setSearchQuery={setSearchQuery} handleSearchSubmit={handleSearchSubmit} />
      <ToolCard searchQuery={searchQuery} />
    </>
  );
}
