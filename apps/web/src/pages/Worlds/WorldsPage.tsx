import type { TableProps } from "antd";
import { Alert, Button, Empty, Flex, Table, Tag, Typography } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";

import { type World, WorldsService } from "@/shared/api/worlds";
import { getErrorMessage } from "@/shared/lib/getErrorMessage";
import { buildWorldSettingsPath } from "@/shared/routing/routes";
import { useWorldStore } from "@/shared/stores/useWorldStore";

import styles from "./WorldsPage.module.scss";

const { Text, Title } = Typography;

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  month: "short",
});

const WorldsPage = () => {
  const navigate = useNavigate();
  const activeWorldId = useWorldStore((state) => state.activeWorldId);
  const openCreateWorldDrawer = useWorldStore(
    (state) => state.openCreateWorldDrawer,
  );
  const setActiveWorldId = useWorldStore((state) => state.setActiveWorldId);
  const worldsRevision = useWorldStore((state) => state.worldsRevision);

  const [worlds, setWorlds] = useState<World[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const loadWorlds = useCallback(async () => {
    setLoading(true);
    setLoadError(null);

    try {
      const worldList = await WorldsService.list();
      setWorlds(worldList);

      if (
        activeWorldId &&
        !worldList.some((world) => world.id === activeWorldId)
      ) {
        setActiveWorldId(null);
      }
    } catch (error) {
      setLoadError(getErrorMessage(error, "Worlds could not be loaded."));
    } finally {
      setLoading(false);
    }
  }, [activeWorldId, setActiveWorldId]);

  useEffect(() => {
    void Promise.resolve().then(loadWorlds);
  }, [loadWorlds, worldsRevision]);

  const columns = useMemo<TableProps<World>["columns"]>(
    () => [
      {
        title: "World",
        dataIndex: "name",
        key: "name",
        render: (name: string, world) => (
          <Flex vertical gap={2}>
            <Flex align="center" gap={8}>
              <Text strong>{name}</Text>
              {world.id === activeWorldId ? (
                <Tag color="gold">Active</Tag>
              ) : null}
            </Flex>
            <Text type="secondary">{world.id}</Text>
          </Flex>
        ),
      },
      {
        title: "Genres",
        dataIndex: "genreIds",
        key: "genreIds",
        render: (genreIds: string[]) =>
          genreIds.length ? (
            <Tag>{genreIds.length}</Tag>
          ) : (
            <Text type="secondary">None</Text>
          ),
      },
      {
        title: "Updated",
        dataIndex: "updatedAt",
        key: "updatedAt",
        render: (updatedAt: string) => dateFormatter.format(new Date(updatedAt)),
      },
      {
        title: "",
        key: "actions",
        align: "right",
        render: (_, world) => (
          <Flex justify="flex-end" gap={8}>
            <Button
              disabled={world.id === activeWorldId}
              size="small"
              onClick={() => setActiveWorldId(world.id)}
            >
              {world.id === activeWorldId ? "Active" : "Set active"}
            </Button>
            <Button
              size="small"
              onClick={() => navigate(buildWorldSettingsPath(world.id))}
            >
              Settings
            </Button>
          </Flex>
        ),
      },
    ],
    [activeWorldId, navigate, setActiveWorldId],
  );

  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.header}>
          <div>
            <Text className={styles.eyebrow}>World archive</Text>
            <Title level={1}>Worlds</Title>
            <Text type="secondary">
              Create, select, and manage the archives available in this workspace.
            </Text>
          </div>
          <Button type="primary" onClick={openCreateWorldDrawer}>
            Create world
          </Button>
        </header>

        {loadError ? (
          <Alert
            showIcon
            action={<Button onClick={() => void loadWorlds()}>Retry</Button>}
            message={loadError}
            type="error"
          />
        ) : null}

        <section className={styles.panel} aria-label="World list">
          <Table<World>
            columns={columns}
            dataSource={worlds}
            loading={loading}
            locale={{
              emptyText: (
                <Empty
                  description="No worlds yet."
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                />
              ),
            }}
            pagination={false}
            rowKey="id"
            size="middle"
          />
        </section>
      </div>
    </main>
  );
};

export default WorldsPage;
