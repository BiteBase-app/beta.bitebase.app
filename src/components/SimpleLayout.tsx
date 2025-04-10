import { ReactNode } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Link } from "react-router-dom";

interface SimpleLayoutProps {
  children: ReactNode;
}

export function SimpleLayout({ children }: SimpleLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-white font-jetbrains">
      <header className="py-4 border-b border-border">
        <div className="container max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center">
            <img src="/branding/logo.svg" alt="BiteBase" className="h-8" />
            <span className="ml-2 text-xl font-bold">BiteBase</span>
            <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">Bangkok Beta</span>
          </Link>
        </div>
      </header>
      <main className="flex-1 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </main>
      <Toaster />
    </div>
  );
}

export default SimpleLayout;
