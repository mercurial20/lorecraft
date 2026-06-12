import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WorldsModule } from './worlds/worlds.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['../../.env', '.env'],
    }),
    WorldsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
