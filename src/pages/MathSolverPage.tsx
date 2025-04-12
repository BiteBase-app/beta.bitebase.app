import React from 'react';
import { MainNav } from '@/components/MainNav';
import { UserNav } from '@/components/UserNav';
import MathSolver from '@/components/MathSolver';

const MathSolverPage: React.FC = () => {
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
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M2 12h10"></path><path d="M9 4v16"></path><path d="M14 9l3 3-3 3"></path><path d="M17 6v12"></path><path d="M22 12h-2"></path></svg>
            </div>
            <h1 className="text-2xl font-medium">Math Problem Solver</h1>
          </div>
          <p className="text-muted-foreground mb-6 ml-9">
            Solve complex mathematical problems using DeepSeek Math AI.
          </p>
          <MathSolver />
        </div>
      </main>
    </div>
  );
};

export default MathSolverPage;
