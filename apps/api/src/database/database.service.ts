import {
  createPostgresConnection,
  PostgresConnection,
  PostgresDb,
} from '@lorecraft/db/postgres';
import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseService implements OnApplicationShutdown {
  private readonly connection: PostgresConnection;

  constructor(private readonly configService: ConfigService) {
    const databaseUrl = this.configService.get<string>('DATABASE_URL');

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
}
