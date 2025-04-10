
import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Toaster } from "@/components/ui/toaster";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-white font-jetbrains">
      <Navbar />
      <main className="flex-1 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}

export default Layout;
