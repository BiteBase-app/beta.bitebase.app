
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { BarChart2, Search, MapPin, Users, UserPlus, Menu, X, Code, LogOut, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BiteBaseLogo } from "@/components/ui/BiteBaseLogo";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const isLandingPage = location.pathname === "/";
  const isAuthPage = ["/login", "/signup", "/forgot-password"].includes(location.pathname);

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

  // Get user initials for avatar
  const getUserInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Don't show navbar on auth pages
  if (isAuthPage) {
    return null;
  }

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center gap-3">
                <BiteBaseLogo size="lg" variant="gradient" />
                <span className="font-bold text-xl text-gray-900">
                  BiteBase<span className="text-emerald-600">Intelligence</span>
                </span>
              </Link>
            </div>
            {!isAuthPage && (
              <div className="hidden sm:ml-6 sm:flex sm:space-x-4">
                {navItems.map((item) => (
                  isLandingPage ? (
                    <button
                      key={item.name}
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-emerald-600 transition-colors"
                      onClick={() => handleScrollTo(item.scrollTo)}
                    >
                      {item.name}
                    </button>
                  ) : (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={cn(
                        "inline-flex items-center px-3 py-2 text-sm font-medium transition-colors",
                        location.pathname === item.href
                          ? "text-emerald-600 border-b-2 border-emerald-600"
                          : "text-gray-700 hover:text-emerald-600"
                      )}
                    >
                      <item.icon className="h-4 w-4 mr-2" />
                      {item.name}
                    </Link>
                  )
                ))}
              </div>
            )}
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center gap-3">
            {isAuthenticated ? (
              // Authenticated user menu
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user?.avatar_url} alt={user?.full_name} />
                      <AvatarFallback className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
                        {user?.full_name ? getUserInitials(user.full_name) : 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user?.full_name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="flex items-center">
                      <BarChart2 className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/settings" className="flex items-center">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              // Guest user buttons
              <>
                <Button variant="ghost" asChild>
                  <Link to="/login">Sign In</Link>
                </Button>
                <Button asChild className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700">
                  <Link to="/signup">Start Free Trial</Link>
                </Button>
              </>
            )}
          </div>
          
          {/* Mobile menu button */}
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

      {/* Mobile Navigation */}
      <div className={cn("sm:hidden", isMenuOpen ? "block" : "hidden")}>
        <div className="pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
          {navItems.map((item) => (
            isLandingPage ? (
              <button
                key={item.name}
                className="flex items-center px-3 py-2 text-base font-medium text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 w-full text-left"
                onClick={() => handleScrollTo(item.scrollTo)}
              >
                {item.name}
              </button>
            ) : (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center px-3 py-2 text-base font-medium",
                  location.pathname === item.href
                    ? "text-emerald-600 bg-emerald-50"
                    : "text-gray-700 hover:bg-emerald-50 hover:text-emerald-600"
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.name}
              </Link>
            )
          ))}
        </div>
        
        {/* Mobile auth buttons */}
        <div className="pt-4 pb-3 border-t border-gray-200 px-3 space-y-2 bg-white">
          {isAuthenticated ? (
            <>
              <div className="flex items-center px-3 py-2">
                <Avatar className="h-8 w-8 mr-3">
                  <AvatarImage src={user?.avatar_url} alt={user?.full_name} />
                  <AvatarFallback className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-sm">
                    {user?.full_name ? getUserInitials(user.full_name) : 'U'}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-sm font-medium text-gray-900">{user?.full_name}</div>
                  <div className="text-xs text-gray-500">{user?.email}</div>
                </div>
              </div>
              <Link
                to="/dashboard"
                className="flex items-center px-3 py-2 text-base font-medium text-gray-700 hover:bg-emerald-50 hover:text-emerald-600"
                onClick={() => setIsMenuOpen(false)}
              >
                <BarChart2 className="h-5 w-5 mr-3" />
                Dashboard
              </Link>
              <Link
                to="/settings"
                className="flex items-center px-3 py-2 text-base font-medium text-gray-700 hover:bg-emerald-50 hover:text-emerald-600"
                onClick={() => setIsMenuOpen(false)}
              >
                <Settings className="h-5 w-5 mr-3" />
                Settings
              </Link>
              <button
                onClick={() => {
                  logout();
                  setIsMenuOpen(false);
                }}
                className="flex items-center px-3 py-2 text-base font-medium text-red-600 hover:bg-red-50 w-full text-left"
              >
                <LogOut className="h-5 w-5 mr-3" />
                Sign out
              </button>
            </>
          ) : (
            <>
              <Button variant="outline" className="w-full" asChild>
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  Sign In
                </Link>
              </Button>
              <Button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700" asChild>
                <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                  Start Free Trial
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
