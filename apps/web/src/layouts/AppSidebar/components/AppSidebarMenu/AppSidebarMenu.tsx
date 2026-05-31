import { AppstoreOutlined, BgColorsOutlined } from "@ant-design/icons";
import type { ReactNode } from "react";
import { useLocation, useNavigate } from "react-router";

import { useUIStore } from "@/shared/stores/useUIStore";

import { AppSidebarItem } from "../AppSidebarItem/AppSidebarItem";

import styles from "./AppSidebarMenu.module.scss";

interface SidebarItem {
  icon: ReactNode;
  label: string;
  path: string;
}

const sidebarItems: SidebarItem[] = [
  {
    icon: <AppstoreOutlined />,
    label: "Dashboard",
    path: "/",
  },
  {
    icon: <BgColorsOutlined />,
    label: "Theme Showcase",
    path: "/theme-showcase",
  },
];

const isActivePath = (pathname: string, itemPath: string) => {
  if (itemPath === "/") {
    return pathname === itemPath;
  }

  return pathname === itemPath || pathname.startsWith(`${itemPath}/`);
};

const AppSidebarMenu = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const sidebarCollapsed = useUIStore((state) => state.sidebarCollapsed);

  return (
    <nav className={styles.menuRoot} aria-label="Primary navigation">
      {sidebarItems.map((item) => {
        const active = isActivePath(location.pathname, item.path);

        return (
          <AppSidebarItem
            key={item.path}
            active={active}
            aria-current={active ? "page" : undefined}
            collapsed={sidebarCollapsed}
            icon={item.icon}
            label={item.label}
            tooltip={item.label}
            onClick={() => navigate(item.path)}
          />
        );
      })}
    </nav>
  );
};

export { AppSidebarMenu };
