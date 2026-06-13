import { App } from "antd";
import { useState } from "react";

import { WorldsService } from "@/shared/api/worlds";
import { getErrorMessage } from "@/shared/lib/getErrorMessage";
import { useWorldStore } from "@/shared/stores/useWorldStore";

import {
  WorldFormDrawer,
  type WorldFormValues,
} from "./WorldFormDrawer";

const WorldCreateDrawerHost = () => {
  const { message } = App.useApp();
  const closeCreateWorldDrawer = useWorldStore(
    (state) => state.closeCreateWorldDrawer,
  );
  const createWorldDrawerOpen = useWorldStore(
    (state) => state.createWorldDrawerOpen,
  );
  const notifyWorldsChanged = useWorldStore((state) => state.notifyWorldsChanged);
  const setActiveWorldId = useWorldStore((state) => state.setActiveWorldId);
  const [creating, setCreating] = useState(false);

  const handleCreate = async (values: WorldFormValues) => {
    setCreating(true);

    try {
      const world = await WorldsService.create(values);
      setActiveWorldId(world.id);
      notifyWorldsChanged();
      closeCreateWorldDrawer();
      message.success(`${world.name} created.`);
    } catch (error) {
      message.error(getErrorMessage(error, "World was not created."));
    } finally {
      setCreating(false);
    }
  };

  return (
    <WorldFormDrawer
      mode="create"
      open={createWorldDrawerOpen}
      submitting={creating}
      onClose={closeCreateWorldDrawer}
      onSubmit={(values) => void handleCreate(values)}
    />
  );
};

export { WorldCreateDrawerHost };
