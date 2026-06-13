import { httpClient } from "./httpClient";

export type World = {
  id: string;
  name: string;
  genreIds: string[];
  createdAt: string;
  updatedAt: string;
};

export type CreateWorldType = {
  name: string;
};

export type UpdateWorldType = {
  name: string;
};

export const WorldsService = {
  list: async () => {
    const { data } = await httpClient.get<World[]>("/worlds");

    return data;
  },

  getById: async (id: string) => {
    const { data } = await httpClient.get<World>(`/worlds/${id}`);

    return data;
  },

  create: async (input: CreateWorldType) => {
    const { data } = await httpClient.post<World>(`/worlds`, input);

    return data;
  },

  update: async (id: string, input: UpdateWorldType) => {
    const { data } = await httpClient.patch<World>(`/worlds/${id}`, input);

    return data;
  },

  remove: async (id: string) => {
    const { data } = await httpClient.delete<{ id: string }>(`/worlds/${id}`);

    return data;
  },
};
