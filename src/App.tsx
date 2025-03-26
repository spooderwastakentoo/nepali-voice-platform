
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Index from "@/pages/Index";
import About from "@/pages/About";
import Statements from "@/pages/Statements";
import StatementDetail from "@/pages/StatementDetail";
import Promises from "@/pages/Promises";
import PromiseDetail from "@/pages/PromiseDetail";
import Politicians from "@/pages/Politicians";
import PoliticianDetail from "@/pages/PoliticianDetail";
import Submit from "@/pages/Submit";
import Auth from "@/pages/Auth";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/statements" element={<Statements />} />
                <Route path="/statements/:id" element={<StatementDetail />} />
                <Route path="/promises" element={<Promises />} />
                <Route path="/promises/:id" element={<PromiseDetail />} />
                <Route path="/politicians" element={<Politicians />} />
                <Route path="/politicians/:id" element={<PoliticianDetail />} />
                <Route path="/submit" element={<Submit />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
