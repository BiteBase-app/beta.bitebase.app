import React from 'react';
import { MainNav } from '@/components/MainNav';
import { UserNav } from '@/components/UserNav';
import AutoRagSearch from '@/components/AutoRagSearch';

const AutoRagSearchPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-muted/5">
      <header className="border-b bg-white shadow-sm">
        <div className="flex h-14 items-center px-4 max-w-7xl mx-auto">
          <MainNav className="mx-4" />
          <div className="ml-auto flex items-center space-x-4">
            <UserNav />
          </div>
        </div>
      </header>
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center gap-2 mb-2">
            <div className="bg-primary/10 p-1.5 rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
            </div>
            <h1 className="text-2xl font-medium">Knowledge Search</h1>
          </div>
          <p className="text-muted-foreground mb-6 ml-9">
            Search through your knowledge base using Cloudflare AutoRAG technology.
          </p>
          <AutoRagSearch />
        </div>
      </main>
    </div>
  );
};

export default AutoRagSearchPage;
