import { Dropdown, type DropdownProps } from "antd";
import type { CSSProperties } from "react";

import { useUIStore } from "@/shared/stores/useUIStore";

import { APP_SIDEBAR_WIDTH } from "../../AppSidebar.constants";

import styles from "./Dropdown.module.scss";

const DROPDOWN_INSET = 6;
const COLLAPSED_DROPDOWN_WIDTH = 240;

type AppSidebarDropdownStyle = CSSProperties & {
  "--app-sidebar-dropdown-inset": string;
  "--app-sidebar-dropdown-width": string;
};

type AppSidebarDropdownProps = Omit<DropdownProps, "classNames" | "styles">;

const expandedDropdownWidth = APP_SIDEBAR_WIDTH - DROPDOWN_INSET * 2;

const AppSidebarDropdown = (dropdownProps: AppSidebarDropdownProps) => {
  const sidebarCollapsed = useUIStore((state) => state.sidebarCollapsed);
  const rootStyle: AppSidebarDropdownStyle = {
    "--app-sidebar-dropdown-inset": sidebarCollapsed
      ? "0px"
      : `${DROPDOWN_INSET}px`,
    "--app-sidebar-dropdown-width": sidebarCollapsed
      ? `${COLLAPSED_DROPDOWN_WIDTH}px`
      : `${expandedDropdownWidth}px`,
  };

  return (
    <Dropdown
      {...dropdownProps}
      classNames={{
        root: styles.dropdown,
      }}
      styles={{
        root: rootStyle,
      }}
    />
  );
};

export { AppSidebarDropdown };
