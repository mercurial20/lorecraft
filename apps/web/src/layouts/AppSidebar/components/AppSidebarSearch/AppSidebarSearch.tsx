import { SearchOutlined } from "@ant-design/icons";

import { useUIStore } from "@/shared/stores/useUIStore";

import { AppSidebarItem } from "../AppSidebarItem/AppSidebarItem";

import styles from "./AppSidebarSearch.module.scss";

const AppSidebarSearch = () => {
  const sidebarCollapsed = useUIStore((state) => state.sidebarCollapsed);

  return (
    <div className={styles.searchRoot}>
      <AppSidebarItem
        aria-label="Search entities"
        collapsed={sidebarCollapsed}
        icon={<SearchOutlined />}
        label="Search"
        tooltip="Search entities"
      />
    </div>
  );
};

export { AppSidebarSearch };
