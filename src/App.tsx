import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import Simulators from "./pages/Simulators";
import SavingsPlan from "./pages/simulators/SavingsPlan";
import CompoundInterest from "./pages/simulators/CompoundInterest";
import BondsCalculator from "./pages/simulators/BondsCalculator";
import CreditCard from "./pages/simulators/CreditCard";
import PersonalLoan from "./pages/simulators/PersonalLoan";
import DebtPayoff from "./pages/simulators/DebtPayoff";
import Analytics from "./pages/Analytics";
import Education from "./pages/Education";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/simulators" element={<Simulators />} />
          <Route path="/simulators/savings" element={<SavingsPlan />} />
          <Route path="/simulators/compound" element={<CompoundInterest />} />
          <Route path="/simulators/bonds" element={<BondsCalculator />} />
          <Route path="/simulators/credit-card" element={<CreditCard />} />
          <Route path="/simulators/loan" element={<PersonalLoan />} />
          <Route path="/simulators/debt-payoff" element={<DebtPayoff />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/education" element={<Education />} />
          <Route path="/profile" element={<Profile />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
