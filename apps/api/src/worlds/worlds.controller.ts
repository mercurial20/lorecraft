import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  ParseUUIDPipe,
  Patch,
  Delete,
} from '@nestjs/common';
import { CreateWorldDto } from './dto/create-world.dto';
import { WorldsService } from './worlds.service';
import { UpdateWorldDto } from './dto/update-world.dto';

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

  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateWorldDto,
  ) {
    return this.worldsService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.worldsService.remove(id);
  }
}
