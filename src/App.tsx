import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { CRMLayout } from "@/components/layouts/CRMLayout";
import Dashboard from "./pages/Dashboard";
import Community from "./pages/Community";
import Guide from "./pages/Guide";
import Projects from "./pages/Projects";
import Contract from "./pages/Contract";
import Notifications from "./pages/Notifications";
import DuckAI from "./pages/DuckAI";
import Profile from "./pages/Profile";
import Chat from "./pages/Chat";
import Payment from "./pages/Payment";
import Statistics from "./pages/Statistics";
import UpdatedSettings from "./pages/UpdatedSettings";
import ClientsManagement from "./pages/ClientsManagement";
import DesignerManagement from "./pages/DesignerManagement";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import RFQ from "./pages/RFQ";
import Invoice from "./pages/Invoice";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" storageKey="crm-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={
            <CRMLayout>
              <Dashboard />
            </CRMLayout>
          } />
          <Route path="/community" element={
            <CRMLayout>
              <Community />
            </CRMLayout>
          } />
          <Route path="/how-to" element={
            <CRMLayout>
              <Guide />
            </CRMLayout>
          } />
          <Route path="/guide" element={
            <CRMLayout>
              <Guide />
            </CRMLayout>
          } />
          <Route path="/notifications" element={
            <CRMLayout>
              <Notifications />
            </CRMLayout>
          } />
          <Route path="/projects" element={
            <CRMLayout>
              <Projects />
            </CRMLayout>
          } />
          <Route path="/duck-ai" element={
            <CRMLayout>
              <DuckAI />
            </CRMLayout>
          } />
          <Route path="/profile" element={
            <CRMLayout>
              <Profile />
            </CRMLayout>
          } />
          <Route path="/chat" element={
            <CRMLayout>
              <Chat />
            </CRMLayout>
          } />
          <Route path="/payment" element={
            <CRMLayout>
              <Payment />
            </CRMLayout>
          } />
          <Route path="/statistics" element={
            <CRMLayout>
              <Statistics />
            </CRMLayout>
          } />
          <Route path="/settings" element={
            <CRMLayout>
              <UpdatedSettings />
            </CRMLayout>
          } />
          <Route path="/clients-management" element={
            <CRMLayout>
              <ClientsManagement />
            </CRMLayout>
          } />
          <Route path="/projects-management" element={
            <CRMLayout>
              <Projects />
            </CRMLayout>
          } />
          <Route path="/projects-management/design" element={
            <CRMLayout>
              <Contract />
            </CRMLayout>
          } />
          <Route path="/projects-management/manufacturing" element={
            <CRMLayout>
              <RFQ />
            </CRMLayout>
          } />
          <Route path="/projects-management/completed" element={
            <CRMLayout>
              <Invoice />
            </CRMLayout>
          } />
          <Route path="/designer-management" element={
            <CRMLayout>
              <DesignerManagement />
            </CRMLayout>
          } />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
