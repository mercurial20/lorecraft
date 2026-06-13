import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WorldStore {
  activeWorldId: string | null;
  createWorldDrawerOpen: boolean;
  worldsRevision: number;
  closeCreateWorldDrawer: () => void;
  notifyWorldsChanged: () => void;
  openCreateWorldDrawer: () => void;
  setActiveWorldId: (activeWorldId: string | null) => void;
}

export const useWorldStore = create<WorldStore>()(
  persist(
    (set) => ({
      activeWorldId: null,
      createWorldDrawerOpen: false,
      worldsRevision: 0,

      closeCreateWorldDrawer: () => set({ createWorldDrawerOpen: false }),

      notifyWorldsChanged: () =>
        set((state) => ({ worldsRevision: state.worldsRevision + 1 })),

      openCreateWorldDrawer: () => set({ createWorldDrawerOpen: true }),

      setActiveWorldId: (activeWorldId) => set({ activeWorldId }),
    }),
    {
      name: "world-store",
      partialize: (state) => ({
        activeWorldId: state.activeWorldId,
      }),
    },
  ),
);
