import { Navigate, Route, Routes } from "react-router";

import { AppLayout } from "@/layouts/AppLayout/AppLayout";

const AppContent = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={"Hello World"} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export { AppContent };
