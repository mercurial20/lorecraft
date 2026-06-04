import { APP_ROUTES } from "@/shared/routing/routes";

export interface AppSidebarWorldOption {
  description: string;
  id: string;
  name: string;
}

export const APP_SIDEBAR_WORLD_CREATE_KEY = "create-world";
export const APP_SIDEBAR_WORLD_CREATE_LABEL = "New world";
export const APP_SIDEBAR_WORLD_CREATE_PATH = APP_ROUTES.worldCreate;
export const APP_SIDEBAR_WORLD_HOME_PATH = APP_ROUTES.dashboard;

export const APP_SIDEBAR_WORLDS: AppSidebarWorldOption[] = [
  {
    id: "aurelian-reaches",
    name: "Aurelian Reaches",
    description: "Current world",
  },
  {
    id: "ironhold-archive",
    name: "Ironhold Archive",
    description: "Northern campaign",
  },
  {
    id: "velora-expanse",
    name: "Velora Expanse",
    description: "Star map draft",
  },
];

export const APP_SIDEBAR_DEFAULT_WORLD_ID = APP_SIDEBAR_WORLDS[0].id;
