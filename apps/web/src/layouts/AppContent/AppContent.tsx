import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router";

import { AppLayout } from "@/layouts/AppLayout/AppLayout";
import { APP_ROUTES } from "@/shared/routing/routes";

const ThemeShowcase = lazy(() => import("@/pages/ThemeShowcase/ThemeShowcase"));
const WorldSettingsPage = lazy(
  () => import("@/pages/WorldSettings/WorldSettingsPage"),
);
const WorldsPage = lazy(() => import("@/pages/Worlds/WorldsPage"));

const AppContent = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route
          path={APP_ROUTES.dashboard}
          element={<Navigate to={APP_ROUTES.worlds} replace />}
        />
        <Route path={APP_ROUTES.themeShowcase} element={<ThemeShowcase />} />
        <Route path={APP_ROUTES.worlds} element={<WorldsPage />} />
        <Route
          path={APP_ROUTES.worldSettings}
          element={<WorldSettingsPage />}
        />
      </Route>
      <Route path="*" element={<Navigate to={APP_ROUTES.worlds} replace />} />
    </Routes>
  );
};

export { AppContent };
