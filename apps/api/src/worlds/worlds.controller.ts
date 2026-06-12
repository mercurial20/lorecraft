import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { CreateWorldDto } from './dto/create-world.dto';
import { WorldsService } from './worlds.service';

@Controller('worlds')
export class WorldsController {
  constructor(private readonly worldsService: WorldsService) {}
  @Post()
  create(@Body() body: CreateWorldDto) {
    return this.worldsService.create(body);
  }

  @Get()
  findAll() {
    return this.worldsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.worldsService.findOne(id);
  }
}
