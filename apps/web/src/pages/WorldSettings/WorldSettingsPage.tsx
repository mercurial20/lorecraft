import {
  Alert,
  App,
  Button,
  Descriptions,
  Flex,
  Popconfirm,
  Spin,
  Typography,
} from "antd";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import { type World, WorldsService } from "@/shared/api/worlds";
import { getErrorMessage } from "@/shared/lib/getErrorMessage";
import { APP_ROUTES } from "@/shared/routing/routes";
import { useWorldStore } from "@/shared/stores/useWorldStore";
import {
  WorldFormDrawer,
  type WorldFormValues,
} from "@/shared/worlds/WorldFormDrawer";

import styles from "./WorldSettingsPage.module.scss";

const { Text, Title } = Typography;

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "medium",
  timeStyle: "short",
});

const WorldSettingsPage = () => {
  const { message } = App.useApp();
  const navigate = useNavigate();
  const { worldId } = useParams<{ worldId: string }>();
  const activeWorldId = useWorldStore((state) => state.activeWorldId);
  const notifyWorldsChanged = useWorldStore(
    (state) => state.notifyWorldsChanged,
  );
  const setActiveWorldId = useWorldStore((state) => state.setActiveWorldId);

  const [world, setWorld] = useState<World | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [editDrawerOpen, setEditDrawerOpen] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const loadWorld = useCallback(async () => {
    if (!worldId) {
      setLoading(false);
      setLoadError("World id is missing.");
      return;
    }

    setLoading(true);
    setLoadError(null);

    try {
      const nextWorld = await WorldsService.getById(worldId);
      setWorld(nextWorld);
    } catch (error) {
      setLoadError(getErrorMessage(error, "World could not be loaded."));
    } finally {
      setLoading(false);
    }
  }, [worldId]);

  useEffect(() => {
    void Promise.resolve().then(loadWorld);
  }, [loadWorld]);

  const handleUpdate = async (values: WorldFormValues) => {
    if (!world) {
      return;
    }

    setUpdating(true);

    try {
      const updatedWorld = await WorldsService.update(world.id, values);
      setWorld(updatedWorld);
      notifyWorldsChanged();
      setEditDrawerOpen(false);
      message.success(`${updatedWorld.name} updated.`);
    } catch (error) {
      message.error(getErrorMessage(error, "World was not updated."));
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!world) {
      return;
    }

    setDeleting(true);

    try {
      await WorldsService.remove(world.id);

      if (activeWorldId === world.id) {
        setActiveWorldId(null);
      }

      notifyWorldsChanged();
      message.success(`${world.name} deleted.`);
      navigate(APP_ROUTES.worlds);
    } catch (error) {
      message.error(getErrorMessage(error, "World was not deleted."));
    } finally {
      setDeleting(false);
    }
  };

  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.header}>
          <div>
            <Text className={styles.eyebrow}>World settings</Text>
            <Title level={1}>{world?.name ?? "World"}</Title>
            <Text type="secondary">Manage this archive record.</Text>
          </div>
          <Flex gap={8}>
            <Button
              disabled={!world || world.id === activeWorldId}
              onClick={() => world && setActiveWorldId(world.id)}
            >
              {world?.id === activeWorldId ? "Active" : "Set active"}
            </Button>
            <Button disabled={!world} onClick={() => setEditDrawerOpen(true)}>
              Edit
            </Button>
          </Flex>
        </header>

        {loading ? (
          <div className={styles.loading}>
            <Spin />
          </div>
        ) : null}

        {loadError ? (
          <Alert
            showIcon
            action={<Button onClick={() => void loadWorld()}>Retry</Button>}
            message={loadError}
            type="error"
          />
        ) : null}

        {world ? (
          <>
            <section className={styles.panel} aria-labelledby="world-general">
              <div className={styles.panelHeader}>
                <Title id="world-general" level={2}>
                  General
                </Title>
              </div>
              <Descriptions
                bordered
                column={1}
                size="small"
                items={[
                  {
                    key: "name",
                    label: "Name",
                    children: world.name,
                  },
                  {
                    key: "id",
                    label: "ID",
                    children: world.id,
                  },
                  {
                    key: "created",
                    label: "Created",
                    children: dateFormatter.format(new Date(world.createdAt)),
                  },
                  {
                    key: "updated",
                    label: "Updated",
                    children: dateFormatter.format(new Date(world.updatedAt)),
                  },
                ]}
              />
            </section>

            <section className={styles.dangerPanel} aria-labelledby="world-danger">
              <div>
                <Title id="world-danger" level={2}>
                  Danger zone
                </Title>
                <Text type="secondary">
                  Delete this world and remove it from the workspace.
                </Text>
              </div>
              <Flex justify="flex-end">
                <Popconfirm
                  okButtonProps={{ danger: true, loading: deleting }}
                  okText="Delete"
                  title="Delete world"
                  description="This action cannot be undone."
                  onConfirm={() => void handleDelete()}
                >
                  <Button danger loading={deleting}>
                    Delete world
                  </Button>
                </Popconfirm>
              </Flex>
            </section>
          </>
        ) : null}
      </div>

      <WorldFormDrawer
        initialValues={world ? { name: world.name } : undefined}
        mode="edit"
        open={editDrawerOpen}
        submitting={updating}
        onClose={() => setEditDrawerOpen(false)}
        onSubmit={(values) => void handleUpdate(values)}
      />
    </main>
  );
};

export default WorldSettingsPage;
