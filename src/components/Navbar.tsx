
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { BarChart2, Search, MapPin, Users, UserPlus, Menu, X, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isLandingPage = location.pathname === "/";

  // Landing page navigation items
  const landingNavItems = [
    { name: "Features", href: "/#features", scrollTo: "features" },
    { name: "Pricing", href: "/#pricing", scrollTo: "pricing" },
    { name: "Testimonials", href: "/#testimonials", scrollTo: "testimonials" },
    { name: "FAQ", href: "/#faq", scrollTo: "faq" },
  ];

  // Workspace navigation items
  const workspaceNavItems = [
    { name: "Dashboard", href: "/dashboard", icon: BarChart2 },
    { name: "Market Research", href: "/research", icon: Search },
    { name: "Location Analysis", href: "/location", icon: MapPin },
    { name: "Competitive Analysis", href: "/competitive-analysis", icon: UserPlus },
    { name: "Consumer Insights", href: "/insights", icon: Users },
    { name: "API Test", href: "/api-test", icon: Code },
  ];

  // Determine which nav items to use based on current page
  const navItems = isLandingPage ? landingNavItems : workspaceNavItems;

  // Handle smooth scrolling for landing page navigation
  const handleScrollTo = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-md bg-bite-600 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">B</span>
                </div>
                <span className="font-bold text-xl text-foreground">BiteBase<span className="text-bite-600">AI</span></span>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-4">
              {navItems.map((item) => (
                isLandingPage ? (
                  <button
                    key={item.name}
                    className="inline-flex items-center px-1 pt-1 text-sm font-medium text-foreground hover:text-bite-600 transition-colors"
                    onClick={() => handleScrollTo(item.scrollTo)}
                  >
                    {item.name}
                  </button>
                ) : (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="inline-flex items-center px-1 pt-1 text-sm font-medium text-foreground hover:text-bite-600 transition-colors"
                  >
                    <item.icon className="h-4 w-4 mr-2" />
                    {item.name}
                  </Link>
                )
              ))}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center gap-2">
            <Button variant="outline">Sign In</Button>
            <Button>Get Started</Button>
          </div>
          <div className="flex items-center sm:hidden">
            <Button
              variant="ghost"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center rounded-md p-2"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      <div className={cn("sm:hidden", isMenuOpen ? "block" : "hidden")}>
        <div className="pt-2 pb-3 space-y-1">
          {navItems.map((item) => (
            isLandingPage ? (
              <button
                key={item.name}
                className="flex items-center px-3 py-2 text-base font-medium text-foreground hover:bg-bite-50 hover:text-bite-600 w-full text-left"
                onClick={() => handleScrollTo(item.scrollTo)}
              >
                {item.name}
              </button>
            ) : (
              <Link
                key={item.name}
                to={item.href}
                className="flex items-center px-3 py-2 text-base font-medium text-foreground hover:bg-bite-50 hover:text-bite-600"
                onClick={() => setIsMenuOpen(false)}
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.name}
              </Link>
            )
          ))}
        </div>
        <div className="pt-4 pb-3 border-t border-border px-3 space-y-2">
          <Button variant="outline" className="w-full">Sign In</Button>
          <Button className="w-full">Get Started</Button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
