import { Button, Flex } from "antd";
import clsx from "clsx";

import { SidebarIconOutlined } from "@/shared/icons/SidebarIconOutlined";
import { useUIStore } from "@/shared/stores/useUIStore";

import { AppSidebarSearch } from "../AppSidebarSearch/AppSidebarSearch";

import styles from "./AppSidebarHeader.module.scss";

const AppSidebarHeader = () => {
  const sidebarCollapsed = useUIStore((state) => state.sidebarCollapsed);
  const toggleSidebar = useUIStore((state) => state.toggleSidebar);

  const containerClassname = clsx(styles.container, {
    [styles.containerCompact]: sidebarCollapsed,
  });

  return (
    <Flex vertical className={containerClassname}>
      <Flex className={styles.headerRow}>
        <h3 hidden={sidebarCollapsed} className={styles.logo}>
          Lorecraft
        </h3>
        <Button
          type="text"
          className={styles.actionButton}
          icon={<SidebarIconOutlined />}
          onClick={toggleSidebar}
        />
      </Flex>
      <div className={styles.searchArea}>
        <AppSidebarSearch />
      </div>
    </Flex>
  );
};

export { AppSidebarHeader };
