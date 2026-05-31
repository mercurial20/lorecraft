import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router";

import { AppLayout } from "@/layouts/AppLayout/AppLayout";

const ThemeShowcase = lazy(() => import("@/pages/ThemeShowcase/ThemeShowcase"));

const AppContent = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<></>} />
        <Route path="/theme-showcase" element={<ThemeShowcase />} />
      </Route>
      <Route path="*" element={<Navigate to="/theme-showcase" replace />} />
    </Routes>
  );
};

export { AppContent };
