import { Spin } from "antd";
import { Suspense } from "react";
import { Outlet } from "react-router";

const AppLayout = () => {
  return (
    <div>
      <Suspense fallback={<Spin />}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export { AppLayout };
