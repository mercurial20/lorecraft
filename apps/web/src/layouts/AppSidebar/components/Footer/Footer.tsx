import {
  LogoutOutlined,
  MoreOutlined,
  QuestionCircleOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Dropdown, type MenuProps } from "antd";

import { useUIStore } from "@/shared/stores/useUIStore";

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
      <Dropdown
        classNames={{ root: styles.dropdown }}
        menu={{ items: footerMenuItems }}
        placement="topLeft"
        styles={{ root: { minWidth: sidebarCollapsed ? 220 : 260 } }}
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
      </Dropdown>
    </div>
  );
};

export { AppSidebarFooter };
