import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";

import * as schema from "./schema.js";
import { Pool, PoolConfig } from "pg";

export type PostgresDb = NodePgDatabase<typeof schema>;

export type PostgresConnection = {
  db: PostgresDb;
  pool: Pool;
  close: () => Promise<void>;
};

export function createPostgresConnection(
  config: string | PoolConfig,
): PostgresConnection {
  const pool = new Pool(
    typeof config === "string" ? { connectionString: config } : config,
  );
  const db = drizzle(pool, { schema });
  return {
    db,
    pool,
    close: () => pool.end(),
  };
}
