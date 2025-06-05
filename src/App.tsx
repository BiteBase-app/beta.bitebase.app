
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { TierProvider } from "@/contexts/TierContext";
import { TierOverride } from "@/components/TierOverride";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import Research from "./pages/Research";
import Location from "./pages/Location";
import CompetitiveAnalysis from "./pages/CompetitiveAnalysis";
import NotFound from "./pages/NotFound";
import Onboarding from "./pages/Onboarding";
import RestaurantSetup from "./pages/RestaurantSetup";
import Integrations from "./pages/Integrations";
import TeamManagement from "./pages/TeamManagement";
import Reports from "./pages/Reports";
import DataIntegration from "./pages/DataIntegration";
import ApiTest from "./pages/ApiTest";
import BiteBaseAIPage from "./pages/BiteBaseAIPage";
import VercelBiteBaseAIPage from "./pages/VercelBiteBaseAIPage";
import AutoRagSearchPage from "./pages/AutoRagSearchPage";
import MathSolverPage from "./pages/MathSolverPage";
import Settings from "./pages/Settings";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <TierProvider initialTier="franchise">
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <TierOverride />
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              
              {/* Authentication Routes */}
              <Route 
                path="/login" 
                element={
                  <ProtectedRoute requireAuth={false}>
                    <Login />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/signup" 
                element={
                  <ProtectedRoute requireAuth={false}>
                    <Signup />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/forgot-password" 
                element={
                  <ProtectedRoute requireAuth={false}>
                    <ForgotPassword />
                  </ProtectedRoute>
                } 
              />
              
              {/* Protected Routes */}
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/research" 
                element={
                  <ProtectedRoute>
                    <Research />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/location" 
                element={
                  <ProtectedRoute>
                    <Location />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/competitive-analysis" 
                element={
                  <ProtectedRoute>
                    <CompetitiveAnalysis />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/onboarding" 
                element={
                  <ProtectedRoute>
                    <Onboarding />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/restaurant-setup" 
                element={
                  <ProtectedRoute>
                    <RestaurantSetup />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/integrations" 
                element={
                  <ProtectedRoute>
                    <Integrations />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/team-management" 
                element={
                  <ProtectedRoute>
                    <TeamManagement />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/reports" 
                element={
                  <ProtectedRoute>
                    <Reports />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/data-integration" 
                element={
                  <ProtectedRoute>
                    <DataIntegration />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/settings" 
                element={
                  <ProtectedRoute>
                    <Settings />
                  </ProtectedRoute>
                } 
              />
              
              {/* Payment Routes */}
              <Route 
                path="/payment-success" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/payment-canceled" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              
              {/* Development/Testing Routes */}
              <Route path="/api-test" element={<ApiTest />} />
              <Route path="/ai-assistant" element={<BiteBaseAIPage />} />
              <Route path="/vercel-ai" element={<VercelBiteBaseAIPage />} />
              <Route path="/autorag" element={<AutoRagSearchPage />} />
              <Route path="/math" element={<MathSolverPage />} />
              
              {/* Catch-all route - must be last */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TierProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
