import {
  LogoutOutlined,
  MoreOutlined,
  QuestionCircleOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";

import { useUIStore } from "@/shared/stores/useUIStore";

import { AppSidebarDropdown } from "../Dropdown";
import { AppSidebarItem } from "../Item";

import styles from "./Footer.module.scss";

const footerMenuItems: MenuProps["items"] = [
  {
    key: "profile",
    icon: <UserOutlined />,
    label: "Profile",
  },
  {
    key: "settings",
    icon: <SettingOutlined />,
    label: "Settings",
  },
  {
    key: "help",
    icon: <QuestionCircleOutlined />,
    label: "Help",
  },
  {
    type: "divider",
  },
  {
    key: "sign-out",
    danger: true,
    icon: <LogoutOutlined />,
    label: "Sign out",
  },
];

const AppSidebarFooter = () => {
  const sidebarCollapsed = useUIStore((state) => state.sidebarCollapsed);

  return (
    <div className={styles.container}>
      <AppSidebarDropdown
        menu={{ items: footerMenuItems }}
        placement="topLeft"
        trigger={["click"]}
      >
        <AppSidebarItem
          aria-label="Open sidebar menu"
          collapsed={sidebarCollapsed}
          description="Workspace"
          icon={<UserOutlined />}
          label="Medet"
          suffix={<MoreOutlined />}
          variant="profile"
        />
      </AppSidebarDropdown>
    </div>
  );
};

export { AppSidebarFooter };
