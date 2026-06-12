import {
  createPostgresConnection,
  PostgresConnection,
  PostgresDb,
} from '@lorecraft/db/postgres';
import { Injectable, OnApplicationShutdown } from '@nestjs/common';

@Injectable()
export class DatabaseService implements OnApplicationShutdown {
  private readonly connection: PostgresConnection;

  constructor() {
    const databaseUrl = process.env.DATABASE_URL;

    if (!databaseUrl) {
      throw new Error('Database url is not provided in env');
    }

    this.connection = createPostgresConnection(databaseUrl);
  }

  get db(): PostgresDb {
    return this.connection.db;
  }

  async onApplicationShutdown(): Promise<void> {
    await this.connection.close();
  }
  Е;
}
