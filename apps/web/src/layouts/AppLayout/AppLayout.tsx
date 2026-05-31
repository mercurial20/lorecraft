import { Flex, Layout } from "antd";
import { Suspense } from "react";
import { Outlet } from "react-router";

import { Spinner } from "@/shared/ui/Spinner";

import { AppSidebar } from "../AppSidebar/AppSidebar";

import styles from "./AppLayout.module.scss";

const AppLayout = () => {
  return (
    <Layout className={styles.layout}>
      <AppSidebar />
      <Flex vertical className={styles.main}>
        <Flex className={styles.content}>
          <Suspense fallback={<Spinner variant="fill" />}>
            <Outlet />
          </Suspense>
        </Flex>
      </Flex>
    </Layout>
  );
};

export { AppLayout };
