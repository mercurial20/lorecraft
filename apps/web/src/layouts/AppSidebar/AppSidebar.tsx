import { Divider, Flex } from "antd";
import Sider from "antd/es/layout/Sider";
import type { CSSProperties } from "react";

import { useUIStore } from "@/shared/stores/useUIStore";

import {
  APP_SIDEBAR_COLLAPSED_WIDTH,
  APP_SIDEBAR_WIDTH,
} from "./AppSidebar.constants";
import { AppSidebarFooter } from "./components/AppSidebarFooter/AppSidebarFooter";
import { AppSidebarHeader } from "./components/AppSidebarHeader/AppSidebarHeader";
import { AppSidebarMenu } from "./components/AppSidebarMenu/AppSidebarMenu";

import styles from "./AppSidebar.module.scss";

const AppSidebar = () => {
  const sidebarCollapsed = useUIStore((state) => state.sidebarCollapsed);
  const sidebarStyle = {
    "--app-sidebar-collapsed-width": `${APP_SIDEBAR_COLLAPSED_WIDTH}px`,
    "--app-sidebar-width": `${APP_SIDEBAR_WIDTH}px`,
  } as CSSProperties;

  return (
    <Sider
      collapsedWidth={APP_SIDEBAR_COLLAPSED_WIDTH}
      width={APP_SIDEBAR_WIDTH}
      className={styles.sidebar}
      collapsed={sidebarCollapsed}
      style={sidebarStyle}
    >
      <Flex vertical className={styles.sidebarFlex}>
        <AppSidebarHeader />
        <Divider />
        <AppSidebarMenu />
        <AppSidebarFooter />
      </Flex>
    </Sider>
  );
};

export { AppSidebar };
