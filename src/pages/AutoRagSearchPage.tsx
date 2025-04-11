import React from 'react';
import { MainNav } from '@/components/MainNav';
import { UserNav } from '@/components/UserNav';
import AutoRagSearch from '@/components/AutoRagSearch';

const AutoRagSearchPage: React.FC = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <header className="border-b">
          <div className="flex h-16 items-center px-4">
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              <UserNav />
            </div>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-8">
          <div className="mx-auto max-w-4xl">
            <h1 className="text-3xl font-bold tracking-tight mb-6">AutoRAG Knowledge Search</h1>
            <p className="text-muted-foreground mb-8">
              Search through your knowledge base using Cloudflare AutoRAG technology.
            </p>
            <AutoRagSearch />
          </div>
        </main>
      </div>
    </>
  );
};

export default AutoRagSearchPage;
