import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ScrollText } from "lucide-react";
import { AuthProvider } from "./context/AuthContext";
import { NotificationProvider } from "./context/NotificationContext";
import { AppLayout } from "./layouts/AppLayout";
import { ComingSoon } from "./components/ui/ComingSoon";
import { Skeleton } from "./components/ui/Skeleton";
import { AmbientBackdrop } from "./components/3d/AmbientBackdrop";

function lazyPage(loader, name) {
  return lazy(() => loader().then((m) => ({ default: m[name] })));
}

const Dashboard = lazyPage(() => import("./pages/Dashboard/Dashboard"), "Dashboard");
const ProfileSearch = lazyPage(() => import("./pages/ProfileSearch/ProfileSearch"), "ProfileSearch");
const ProfileDetails = lazyPage(() => import("./pages/ProfileDetails/ProfileDetails"), "ProfileDetails");
const NetworkAnalysis = lazyPage(() => import("./pages/NetworkAnalysis/NetworkAnalysis"), "NetworkAnalysis");
const GeoIntelligence = lazyPage(() => import("./pages/GeoIntelligence/GeoIntelligence"), "GeoIntelligence");
const Integrations = lazyPage(() => import("./pages/Integrations/Integrations"), "Integrations");
const AIPipeline = lazyPage(() => import("./pages/AIPipeline/AIPipeline"), "AIPipeline");
const Governance = lazyPage(() => import("./pages/Governance/Governance"), "Governance");
const Alerts = lazyPage(() => import("./pages/Alerts/Alerts"), "Alerts");
const Settings = lazyPage(() => import("./pages/Settings/Settings"), "Settings");

function RouteFallback() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--sp-4)" }}>
      <Skeleton height={32} width={260} />
      <Skeleton height={200} radius={12} />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <AmbientBackdrop />
        <BrowserRouter>
            <Routes>
              <Route element={<AppLayout />}>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route
                  path="/dashboard"
                  element={
                    <Suspense fallback={<RouteFallback />}>
                      <Dashboard />
                    </Suspense>
                  }
                />
                <Route
                  path="/profile-search"
                  element={
                    <Suspense fallback={<RouteFallback />}>
                      <ProfileSearch />
                    </Suspense>
                  }
                />
                <Route
                  path="/profile/:id"
                  element={
                    <Suspense fallback={<RouteFallback />}>
                      <ProfileDetails />
                    </Suspense>
                  }
                />
                <Route
                  path="/network"
                  element={
                    <Suspense fallback={<RouteFallback />}>
                      <NetworkAnalysis />
                    </Suspense>
                  }
                />
                <Route
                  path="/network/:id"
                  element={
                    <Suspense fallback={<RouteFallback />}>
                      <NetworkAnalysis />
                    </Suspense>
                  }
                />
                <Route
                  path="/geo"
                  element={
                    <Suspense fallback={<RouteFallback />}>
                      <GeoIntelligence />
                    </Suspense>
                  }
                />
                <Route
                  path="/integrations"
                  element={
                    <Suspense fallback={<RouteFallback />}>
                      <Integrations />
                    </Suspense>
                  }
                />
                <Route
                  path="/integrations/:id"
                  element={
                    <Suspense fallback={<RouteFallback />}>
                      <Integrations />
                    </Suspense>
                  }
                />
                <Route
                  path="/ai-pipeline"
                  element={
                    <Suspense fallback={<RouteFallback />}>
                      <AIPipeline />
                    </Suspense>
                  }
                />
                <Route
                  path="/governance"
                  element={
                    <Suspense fallback={<RouteFallback />}>
                      <Governance />
                    </Suspense>
                  }
                />
                <Route
                  path="/alerts"
                  element={
                    <Suspense fallback={<RouteFallback />}>
                      <Alerts />
                    </Suspense>
                  }
                />
                <Route
                  path="/settings"
                  element={
                    <Suspense fallback={<RouteFallback />}>
                      <Settings />
                    </Suspense>
                  }
                />
                <Route path="*" element={<ComingSoon title="Not Found" icon={ScrollText} description="This route does not exist." />} />
              </Route>
            </Routes>
        </BrowserRouter>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;
