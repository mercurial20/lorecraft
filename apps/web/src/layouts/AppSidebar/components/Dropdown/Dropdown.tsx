import { Dropdown, type DropdownProps } from "antd";
import type { CSSProperties } from "react";

import { APP_SIDEBAR_WIDTH } from "../../AppSidebar.constants";

import styles from "./Dropdown.module.scss";

const APP_SIDEBAR_DROPDOWN_INSET = 6;
const APP_SIDEBAR_DROPDOWN_COLLAPSED_MIN_WIDTH = 240;
const APP_SIDEBAR_DROPDOWN_EXPANDED_WIDTH =
  APP_SIDEBAR_WIDTH - APP_SIDEBAR_DROPDOWN_INSET * 2;

type AppSidebarDropdownRootStyle = CSSProperties & {
  "--app-sidebar-dropdown-inset": string;
  "--app-sidebar-dropdown-width": string;
};

interface AppSidebarDropdownProps extends Omit<
  DropdownProps,
  "classNames" | "styles"
> {
  collapsed: boolean;
  collapsedMinWidth?: number;
  expandedInset?: number;
  expandedWidth?: number;
}

const getDropdownRootStyle = ({
  collapsed,
  collapsedMinWidth,
  expandedInset,
  expandedWidth,
}: Required<
  Pick<
    AppSidebarDropdownProps,
    "collapsed" | "collapsedMinWidth" | "expandedInset" | "expandedWidth"
  >
>): AppSidebarDropdownRootStyle => {
  if (collapsed) {
    return {
      "--app-sidebar-dropdown-inset": "0px",
      "--app-sidebar-dropdown-width": `${collapsedMinWidth}px`,
    };
  }

  return {
    "--app-sidebar-dropdown-inset": `${expandedInset}px`,
    "--app-sidebar-dropdown-width": `${expandedWidth}px`,
  };
};

const AppSidebarDropdown = ({
  collapsed,
  collapsedMinWidth = APP_SIDEBAR_DROPDOWN_COLLAPSED_MIN_WIDTH,
  expandedInset = APP_SIDEBAR_DROPDOWN_INSET,
  expandedWidth = APP_SIDEBAR_DROPDOWN_EXPANDED_WIDTH,
  ...dropdownProps
}: AppSidebarDropdownProps) => {
  const rootStyle = getDropdownRootStyle({
    collapsed,
    collapsedMinWidth,
    expandedInset,
    expandedWidth,
  });

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
