export const APP_ROUTES = {
  dashboard: "/",
  themeShowcase: "/theme-showcase",
  worlds: "/worlds",
  worldSettings: "/worlds/:worldId/settings",
} as const;

export const buildWorldSettingsPath = (worldId: string) =>
  `/worlds/${worldId}/settings`;
