import {
  CheckOutlined,
  DownOutlined,
  GlobalOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { useCallback, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router";

import { useUIStore } from "@/shared/stores/useUIStore";

import { AppSidebarDropdown } from "../Dropdown";
import { AppSidebarItem } from "../Item";
import {
  APP_SIDEBAR_DEFAULT_WORLD_ID,
  APP_SIDEBAR_WORLD_CREATE_KEY,
  APP_SIDEBAR_WORLD_CREATE_LABEL,
  APP_SIDEBAR_WORLD_CREATE_PATH,
  APP_SIDEBAR_WORLD_HOME_PATH,
  APP_SIDEBAR_WORLDS,
} from "./WorldSelect.constants";

import styles from "./WorldSelect.module.scss";

const getWorldById = (worldId: string) =>
  APP_SIDEBAR_WORLDS.find((world) => world.id === worldId) ??
  APP_SIDEBAR_WORLDS[0];

const AppSidebarWorldSelect = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedWorldId, setSelectedWorldId] = useState(
    APP_SIDEBAR_DEFAULT_WORLD_ID,
  );
  const sidebarCollapsed = useUIStore((state) => state.sidebarCollapsed);
  const location = useLocation();
  const navigate = useNavigate();

  const selectedWorld = useMemo(
    () => getWorldById(selectedWorldId),
    [selectedWorldId],
  );
  const createWorldActive =
    location.pathname === APP_SIDEBAR_WORLD_CREATE_PATH;

  const selectedKeys = useMemo(
    () => [
      createWorldActive ? APP_SIDEBAR_WORLD_CREATE_KEY : selectedWorldId,
    ],
    [createWorldActive, selectedWorldId],
  );

  const menuItems = useMemo<MenuProps["items"]>(
    () => [
      {
        key: APP_SIDEBAR_WORLD_CREATE_KEY,
        icon: <PlusOutlined />,
        label: APP_SIDEBAR_WORLD_CREATE_LABEL,
      },
      {
        type: "divider",
      },
      ...APP_SIDEBAR_WORLDS.map((world) => ({
        key: world.id,
        icon:
          world.id === selectedWorldId ? <CheckOutlined /> : <GlobalOutlined />,
        label: world.name,
      })),
    ],
    [selectedWorldId],
  );

  const handleMenuClick = useCallback<NonNullable<MenuProps["onClick"]>>(
    ({ key }) => {
      setMenuOpen(false);

      if (key === APP_SIDEBAR_WORLD_CREATE_KEY) {
        navigate(APP_SIDEBAR_WORLD_CREATE_PATH);
        return;
      }

      setSelectedWorldId(key);

      if (location.pathname === APP_SIDEBAR_WORLD_CREATE_PATH) {
        navigate(APP_SIDEBAR_WORLD_HOME_PATH);
      }
    },
    [location.pathname, navigate],
  );

  return (
    <div className={styles.root}>
      <AppSidebarDropdown
        menu={{
          items: menuItems,
          onClick: handleMenuClick,
          selectedKeys,
        }}
        onOpenChange={setMenuOpen}
        open={menuOpen}
        placement="bottomLeft"
        trigger={["click"]}
      >
        <AppSidebarItem
          active={createWorldActive}
          aria-label="Change world"
          className={styles.trigger}
          collapsed={sidebarCollapsed}
          description={selectedWorld.description}
          icon={<GlobalOutlined />}
          label={selectedWorld.name}
          suffix={
            sidebarCollapsed ? undefined : (
              <DownOutlined className={styles.chevron} />
            )
          }
          tooltip="Change world"
          variant={sidebarCollapsed ? "default" : "profile"}
        />
      </AppSidebarDropdown>
    </div>
  );
};

export { AppSidebarWorldSelect };
