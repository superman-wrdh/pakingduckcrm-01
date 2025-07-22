import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { CRMLayout } from "@/components/layouts/CRMLayout";
import { DesignerLayout } from "@/components/layouts/DesignerLayout";
import { ClientLayout } from "@/components/layouts/ClientLayout";
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
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            
            {/* CRM Portal */}
            <Route path="/crm/dashboard" element={
              <ProtectedRoute>
                <CRMLayout>
                  <Dashboard />
                </CRMLayout>
              </ProtectedRoute>
            } />
            <Route path="/crm/community" element={
              <ProtectedRoute>
                <CRMLayout>
                  <Community />
                </CRMLayout>
              </ProtectedRoute>
            } />
            <Route path="/crm/how-to" element={
              <ProtectedRoute>
                <CRMLayout>
                  <Guide />
                </CRMLayout>
              </ProtectedRoute>
            } />
            <Route path="/crm/guide" element={
              <ProtectedRoute>
                <CRMLayout>
                  <Guide />
                </CRMLayout>
              </ProtectedRoute>
            } />
            <Route path="/crm/notifications" element={
              <ProtectedRoute>
                <CRMLayout>
                  <Notifications />
                </CRMLayout>
              </ProtectedRoute>
            } />
            <Route path="/crm/projects" element={
              <ProtectedRoute>
                <CRMLayout>
                  <Projects />
                </CRMLayout>
              </ProtectedRoute>
            } />
            <Route path="/crm/duck-ai" element={
              <ProtectedRoute>
                <CRMLayout>
                  <DuckAI />
                </CRMLayout>
              </ProtectedRoute>
            } />
            <Route path="/crm/profile" element={
              <ProtectedRoute>
                <CRMLayout>
                  <Profile />
                </CRMLayout>
              </ProtectedRoute>
            } />
            <Route path="/crm/chat" element={
              <ProtectedRoute>
                <CRMLayout>
                  <Chat />
                </CRMLayout>
              </ProtectedRoute>
            } />
            <Route path="/crm/payment" element={
              <ProtectedRoute>
                <CRMLayout>
                  <Payment />
                </CRMLayout>
              </ProtectedRoute>
            } />
            <Route path="/crm/statistics" element={
              <ProtectedRoute>
                <CRMLayout>
                  <Statistics />
                </CRMLayout>
              </ProtectedRoute>
            } />
            <Route path="/crm/settings" element={
              <ProtectedRoute>
                <CRMLayout>
                  <UpdatedSettings />
                </CRMLayout>
              </ProtectedRoute>
            } />
            <Route path="/crm/clients-management" element={
              <ProtectedRoute>
                <CRMLayout>
                  <ClientsManagement />
                </CRMLayout>
              </ProtectedRoute>
            } />
            <Route path="/crm/projects-management" element={
              <ProtectedRoute>
                <CRMLayout>
                  <Projects />
                </CRMLayout>
              </ProtectedRoute>
            } />
            <Route path="/crm/projects-management/design" element={
              <ProtectedRoute>
                <CRMLayout>
                  <Contract />
                </CRMLayout>
              </ProtectedRoute>
            } />
            <Route path="/crm/projects-management/manufacturing" element={
              <ProtectedRoute>
                <CRMLayout>
                  <RFQ />
                </CRMLayout>
              </ProtectedRoute>
            } />
            <Route path="/crm/projects-management/completed" element={
              <ProtectedRoute>
                <CRMLayout>
                  <Invoice />
                </CRMLayout>
              </ProtectedRoute>
            } />
            <Route path="/crm/designer-management" element={
              <ProtectedRoute>
                <CRMLayout>
                  <DesignerManagement />
                </CRMLayout>
              </ProtectedRoute>
            } />

            {/* Designer Portal */}
            <Route path="/designer/dashboard" element={
              <ProtectedRoute>
                <DesignerLayout>
                  <Dashboard />
                </DesignerLayout>
              </ProtectedRoute>
            } />
            <Route path="/designer/community" element={
              <ProtectedRoute>
                <DesignerLayout>
                  <Community />
                </DesignerLayout>
              </ProtectedRoute>
            } />
            <Route path="/designer/how-to" element={
              <ProtectedRoute>
                <DesignerLayout>
                  <Guide />
                </DesignerLayout>
              </ProtectedRoute>
            } />
            <Route path="/designer/guide" element={
              <ProtectedRoute>
                <DesignerLayout>
                  <Guide />
                </DesignerLayout>
              </ProtectedRoute>
            } />
            <Route path="/designer/notifications" element={
              <ProtectedRoute>
                <DesignerLayout>
                  <Notifications />
                </DesignerLayout>
              </ProtectedRoute>
            } />
            <Route path="/designer/projects" element={
              <ProtectedRoute>
                <DesignerLayout>
                  <Projects />
                </DesignerLayout>
              </ProtectedRoute>
            } />
            <Route path="/designer/duck-ai" element={
              <ProtectedRoute>
                <DesignerLayout>
                  <DuckAI />
                </DesignerLayout>
              </ProtectedRoute>
            } />
            <Route path="/designer/profile" element={
              <ProtectedRoute>
                <DesignerLayout>
                  <Profile />
                </DesignerLayout>
              </ProtectedRoute>
            } />
            <Route path="/designer/chat" element={
              <ProtectedRoute>
                <DesignerLayout>
                  <Chat />
                </DesignerLayout>
              </ProtectedRoute>
            } />
            <Route path="/designer/payment" element={
              <ProtectedRoute>
                <DesignerLayout>
                  <Payment />
                </DesignerLayout>
              </ProtectedRoute>
            } />
            <Route path="/designer/statistics" element={
              <ProtectedRoute>
                <DesignerLayout>
                  <Statistics />
                </DesignerLayout>
              </ProtectedRoute>
            } />
            <Route path="/designer/settings" element={
              <ProtectedRoute>
                <DesignerLayout>
                  <UpdatedSettings />
                </DesignerLayout>
              </ProtectedRoute>
            } />
            <Route path="/designer/clients-management" element={
              <ProtectedRoute>
                <DesignerLayout>
                  <ClientsManagement />
                </DesignerLayout>
              </ProtectedRoute>
            } />
            <Route path="/designer/projects-management" element={
              <ProtectedRoute>
                <DesignerLayout>
                  <Projects />
                </DesignerLayout>
              </ProtectedRoute>
            } />
            <Route path="/designer/projects-management/design" element={
              <ProtectedRoute>
                <DesignerLayout>
                  <Contract />
                </DesignerLayout>
              </ProtectedRoute>
            } />
            <Route path="/designer/projects-management/manufacturing" element={
              <ProtectedRoute>
                <DesignerLayout>
                  <RFQ />
                </DesignerLayout>
              </ProtectedRoute>
            } />
            <Route path="/designer/projects-management/completed" element={
              <ProtectedRoute>
                <DesignerLayout>
                  <Invoice />
                </DesignerLayout>
              </ProtectedRoute>
            } />
            <Route path="/designer/designer-management" element={
              <ProtectedRoute>
                <DesignerLayout>
                  <DesignerManagement />
                </DesignerLayout>
              </ProtectedRoute>
            } />

            {/* Client Portal */}
            <Route path="/client/dashboard" element={
              <ProtectedRoute>
                <ClientLayout>
                  <Dashboard />
                </ClientLayout>
              </ProtectedRoute>
            } />
            <Route path="/client/community" element={
              <ProtectedRoute>
                <ClientLayout>
                  <Community />
                </ClientLayout>
              </ProtectedRoute>
            } />
            <Route path="/client/how-to" element={
              <ProtectedRoute>
                <ClientLayout>
                  <Guide />
                </ClientLayout>
              </ProtectedRoute>
            } />
            <Route path="/client/guide" element={
              <ProtectedRoute>
                <ClientLayout>
                  <Guide />
                </ClientLayout>
              </ProtectedRoute>
            } />
            <Route path="/client/notifications" element={
              <ProtectedRoute>
                <ClientLayout>
                  <Notifications />
                </ClientLayout>
              </ProtectedRoute>
            } />
            <Route path="/client/projects" element={
              <ProtectedRoute>
                <ClientLayout>
                  <Projects />
                </ClientLayout>
              </ProtectedRoute>
            } />
            <Route path="/client/duck-ai" element={
              <ProtectedRoute>
                <ClientLayout>
                  <DuckAI />
                </ClientLayout>
              </ProtectedRoute>
            } />
            <Route path="/client/profile" element={
              <ProtectedRoute>
                <ClientLayout>
                  <Profile />
                </ClientLayout>
              </ProtectedRoute>
            } />
            <Route path="/client/chat" element={
              <ProtectedRoute>
                <ClientLayout>
                  <Chat />
                </ClientLayout>
              </ProtectedRoute>
            } />
            <Route path="/client/payment" element={
              <ProtectedRoute>
                <ClientLayout>
                  <Payment />
                </ClientLayout>
              </ProtectedRoute>
            } />
            <Route path="/client/statistics" element={
              <ProtectedRoute>
                <ClientLayout>
                  <Statistics />
                </ClientLayout>
              </ProtectedRoute>
            } />
            <Route path="/client/settings" element={
              <ProtectedRoute>
                <ClientLayout>
                  <UpdatedSettings />
                </ClientLayout>
              </ProtectedRoute>
            } />
            <Route path="/client/clients-management" element={
              <ProtectedRoute>
                <ClientLayout>
                  <ClientsManagement />
                </ClientLayout>
              </ProtectedRoute>
            } />
            <Route path="/client/projects-management" element={
              <ProtectedRoute>
                <ClientLayout>
                  <Projects />
                </ClientLayout>
              </ProtectedRoute>
            } />
            <Route path="/client/projects-management/design" element={
              <ProtectedRoute>
                <ClientLayout>
                  <Contract />
                </ClientLayout>
              </ProtectedRoute>
            } />
            <Route path="/client/projects-management/manufacturing" element={
              <ProtectedRoute>
                <ClientLayout>
                  <RFQ />
                </ClientLayout>
              </ProtectedRoute>
            } />
            <Route path="/client/projects-management/completed" element={
              <ProtectedRoute>
                <ClientLayout>
                  <Invoice />
                </ClientLayout>
              </ProtectedRoute>
            } />
            <Route path="/client/designer-management" element={
              <ProtectedRoute>
                <ClientLayout>
                  <DesignerManagement />
                </ClientLayout>
              </ProtectedRoute>
            } />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;