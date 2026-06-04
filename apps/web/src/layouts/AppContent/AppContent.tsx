import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router";

import { AppLayout } from "@/layouts/AppLayout/AppLayout";
import { APP_ROUTES } from "@/shared/routing/routes";

const ThemeShowcase = lazy(() => import("@/pages/ThemeShowcase/ThemeShowcase"));
const WorldCreate = lazy(() => import("@/pages/WorldCreate/WorldCreate"));

const AppContent = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path={APP_ROUTES.dashboard} element={<></>} />
        <Route path={APP_ROUTES.themeShowcase} element={<ThemeShowcase />} />
        <Route path={APP_ROUTES.worldCreate} element={<WorldCreate />} />
      </Route>
      <Route path="*" element={<Navigate to={APP_ROUTES.themeShowcase} replace />} />
    </Routes>
  );
};

export { AppContent };
