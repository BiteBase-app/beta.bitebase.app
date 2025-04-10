import { Link } from "react-router-dom";

export function Footer() {
  // Helper function to determine if a link should use React Router Link or HTML <a>
  // We'll use <a> for external links, and router-backed pages don't exist yet
  const NavLink = ({ to, children, className = "" }) => {
    // Check if the route exists in our App.tsx routes
    const existingRoutes = ["/", "/dashboard", "/research", "/location", "/insights", "/merge"];
    
    if (existingRoutes.includes(to)) {
      return <Link to={to} className={className}>{children}</Link>;
    }
    
    // For non-existent routes, use a regular <a> tag
    return <a href="#" className={className}>{children}</a>;
  };

  return (
    <footer className="bg-background border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-md bg-bite-600 flex items-center justify-center">
                <span className="text-white font-bold text-xl">B</span>
              </div>
              <span className="font-bold text-xl text-foreground">BiteBase<span className="text-bite-600">AI</span></span>
            </Link>
            <p className="mt-2 text-sm text-muted-foreground">
              AI-powered market research for restaurant and cafe businesses.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">Product</h3>
            <ul className="mt-4 space-y-2">
              <li><NavLink to="/features" className="text-muted-foreground hover:text-bite-600 text-sm">Features</NavLink></li>
              <li><NavLink to="/pricing" className="text-muted-foreground hover:text-bite-600 text-sm">Pricing</NavLink></li>
              <li><NavLink to="/case-studies" className="text-muted-foreground hover:text-bite-600 text-sm">Case Studies</NavLink></li>
              <li><NavLink to="/testimonials" className="text-muted-foreground hover:text-bite-600 text-sm">Testimonials</NavLink></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">Support</h3>
            <ul className="mt-4 space-y-2">
              <li><NavLink to="/documentation" className="text-muted-foreground hover:text-bite-600 text-sm">Documentation</NavLink></li>
              <li><NavLink to="/guides" className="text-muted-foreground hover:text-bite-600 text-sm">Guides</NavLink></li>
              <li><NavLink to="/api-status" className="text-muted-foreground hover:text-bite-600 text-sm">API Status</NavLink></li>
              <li><NavLink to="/merge" className="text-muted-foreground hover:text-bite-600 text-sm">Merge Tool</NavLink></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">Company</h3>
            <ul className="mt-4 space-y-2">
              <li><NavLink to="/about" className="text-muted-foreground hover:text-bite-600 text-sm">About</NavLink></li>
              <li><NavLink to="/blog" className="text-muted-foreground hover:text-bite-600 text-sm">Blog</NavLink></li>
              <li><NavLink to="/careers" className="text-muted-foreground hover:text-bite-600 text-sm">Careers</NavLink></li>
              <li><NavLink to="/press" className="text-muted-foreground hover:text-bite-600 text-sm">Press</NavLink></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-border pt-8 flex flex-col md:flex-row justify-between">
          <p className="text-base text-muted-foreground">&copy; {new Date().getFullYear()} BiteBaseAI. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <NavLink to="/privacy" className="text-muted-foreground hover:text-bite-600 text-sm">Privacy</NavLink>
            <NavLink to="/terms" className="text-muted-foreground hover:text-bite-600 text-sm">Terms</NavLink>
            <NavLink to="/cookies" className="text-muted-foreground hover:text-bite-600 text-sm">Cookies</NavLink>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
