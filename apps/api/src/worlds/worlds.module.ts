import { Module } from '@nestjs/common';
import { WorldsService } from './worlds.service';
import { WorldsController } from './worlds.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  providers: [WorldsService],
  controllers: [WorldsController],
  imports: [DatabaseModule],
})
export class WorldsModule {}
