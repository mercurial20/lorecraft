import {
  DownOutlined,
  GlobalOutlined,
  LoadingOutlined,
  PlusOutlined,
  SettingOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { type MenuProps,Tag } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router";

import { type World, WorldsService } from "@/shared/api/worlds";
import { APP_ROUTES, buildWorldSettingsPath } from "@/shared/routing/routes";
import { useUIStore } from "@/shared/stores/useUIStore";
import { useWorldStore } from "@/shared/stores/useWorldStore";

import { AppSidebarDropdown } from "../Dropdown";
import { AppSidebarItem } from "../Item";
import {
  APP_SIDEBAR_WORLD_CREATE_KEY,
  APP_SIDEBAR_WORLD_CREATE_LABEL,
  APP_SIDEBAR_WORLD_MANAGE_KEY,
  APP_SIDEBAR_WORLD_MANAGE_LABEL,
  APP_SIDEBAR_WORLD_SETTINGS_KEY,
  APP_SIDEBAR_WORLD_SETTINGS_LABEL,
} from "./WorldSelect.constants";

import styles from "./WorldSelect.module.scss";

const AppSidebarWorldSelect = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [worlds, setWorlds] = useState<World[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const sidebarCollapsed = useUIStore((state) => state.sidebarCollapsed);
  const activeWorldId = useWorldStore((state) => state.activeWorldId);
  const openCreateWorldDrawer = useWorldStore(
    (state) => state.openCreateWorldDrawer,
  );
  const setActiveWorldId = useWorldStore((state) => state.setActiveWorldId);
  const worldsRevision = useWorldStore((state) => state.worldsRevision);
  const location = useLocation();
  const navigate = useNavigate();

  const selectedWorld = useMemo(
    () => worlds.find((world) => world.id === activeWorldId) ?? null,
    [activeWorldId, worlds],
  );

  const loadWorlds = useCallback(async () => {
    setLoading(true);
    setLoadError(false);

    try {
      const worldList = await WorldsService.list();
      setWorlds(worldList);

      if (
        activeWorldId &&
        !worldList.some((world) => world.id === activeWorldId)
      ) {
        setActiveWorldId(null);
      }
    } catch {
      setLoadError(true);
    } finally {
      setLoading(false);
    }
  }, [activeWorldId, setActiveWorldId]);

  useEffect(() => {
    void Promise.resolve().then(loadWorlds);
  }, [loadWorlds, worldsRevision]);

  const worldsRouteActive = location.pathname === APP_ROUTES.worlds;
  const worldSettingsActive =
    !!selectedWorld &&
    location.pathname === buildWorldSettingsPath(selectedWorld.id);

  const selectedKeys = useMemo(
    () => {
      if (worldsRouteActive) {
        return [APP_SIDEBAR_WORLD_MANAGE_KEY];
      }

      return activeWorldId ? [activeWorldId] : [];
    },
    [activeWorldId, worldsRouteActive],
  );

  const menuItems = useMemo<MenuProps["items"]>(
    () => {
      const worldItems: NonNullable<MenuProps["items"]> = loading
        ? [
            {
              key: "loading-worlds",
              disabled: true,
              icon: <LoadingOutlined />,
              label: "Loading worlds",
            },
          ]
        : worlds.map((world) => ({
            key: world.id,
            icon: <GlobalOutlined />,
            label: (
              <span className={styles.worldMenuLabel}>
                <span className={styles.worldMenuName}>{world.name}</span>
                {world.id === activeWorldId ? (
                  <Tag
                    bordered={false}
                    color="gold"
                    className={styles.activeTag}
                  >
                    Active
                  </Tag>
                ) : null}
              </span>
            ),
          }));

      if (!loading && !worldItems.length) {
        worldItems.push({
          key: "empty-worlds",
          disabled: true,
          label: loadError ? "Worlds unavailable" : "No worlds yet",
        });
      }

      return [
        {
          key: APP_SIDEBAR_WORLD_CREATE_KEY,
          icon: <PlusOutlined />,
          label: APP_SIDEBAR_WORLD_CREATE_LABEL,
        },
        {
          key: APP_SIDEBAR_WORLD_MANAGE_KEY,
          icon: <UnorderedListOutlined />,
          label: APP_SIDEBAR_WORLD_MANAGE_LABEL,
        },
        {
          type: "divider",
        },
        ...worldItems,
        {
          type: "divider",
        },
        {
          key: APP_SIDEBAR_WORLD_SETTINGS_KEY,
          disabled: !selectedWorld,
          icon: <SettingOutlined />,
          label: APP_SIDEBAR_WORLD_SETTINGS_LABEL,
        },
      ];
    },
    [activeWorldId, loadError, loading, selectedWorld, worlds],
  );

  const handleMenuClick = useCallback<NonNullable<MenuProps["onClick"]>>(
    ({ key }) => {
      setMenuOpen(false);

      if (key === APP_SIDEBAR_WORLD_CREATE_KEY) {
        openCreateWorldDrawer();
        return;
      }

      if (key === APP_SIDEBAR_WORLD_MANAGE_KEY) {
        navigate(APP_ROUTES.worlds);
        return;
      }

      if (key === APP_SIDEBAR_WORLD_SETTINGS_KEY && selectedWorld) {
        navigate(buildWorldSettingsPath(selectedWorld.id));
        return;
      }

      const world = worlds.find((item) => item.id === key);

      if (world) {
        setActiveWorldId(world.id);
        navigate(buildWorldSettingsPath(world.id));
      }
    },
    [navigate, openCreateWorldDrawer, selectedWorld, setActiveWorldId, worlds],
  );

  const handleOpenChange = (open: boolean) => {
    setMenuOpen(open);

    if (open) {
      void loadWorlds();
    }
  };

  return (
    <div className={styles.root}>
      <AppSidebarDropdown
        menu={{
          items: menuItems,
          onClick: handleMenuClick,
          selectedKeys,
        }}
        onOpenChange={handleOpenChange}
        open={menuOpen}
        placement="bottomLeft"
        trigger={["click"]}
      >
        <AppSidebarItem
          active={worldSettingsActive}
          aria-label="Change world"
          className={styles.trigger}
          collapsed={sidebarCollapsed}
          description={selectedWorld ? "Current world" : "No active world"}
          icon={<GlobalOutlined />}
          label={selectedWorld?.name ?? "Select world"}
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
