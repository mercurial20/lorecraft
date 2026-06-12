import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateWorldDto } from './dto/create-world.dto';
import { worlds } from '@lorecraft/db';
import { eq } from 'drizzle-orm';

@Injectable()
export class WorldsService {
  constructor(private readonly database: DatabaseService) {}

  async create(input: CreateWorldDto) {
    const [world] = await this.database.db
      .insert(worlds)
      .values({ name: input.name })
      .returning();

    return world;
  }

  async findAll() {
    return this.database.db.select().from(worlds);
  }

  async findOne(id: string) {
    const [world] = await this.database.db
      .select()
      .from(worlds)
      .where(eq(worlds.id, id))
      .limit(1);

    if (!world) throw new NotFoundException('World not found');

    return world;
  }
}
