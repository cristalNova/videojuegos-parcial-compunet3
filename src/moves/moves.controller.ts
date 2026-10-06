import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { MovesService } from './moves.service';
import { CreateMoveDto } from './dto/create-move.dto';
import { UpdateMoveDto } from './dto/update-move.dto';

@Controller('moves')
export class MovesController {
  constructor(private readonly movesService: MovesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createMoveDto: CreateMoveDto) {
    return this.movesService.create(createMoveDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.movesService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.movesService.findOne(+id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() updateMoveDto: UpdateMoveDto) {
    return this.movesService.update(+id, updateMoveDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(@Param('id') id: string) {
    return this.movesService.remove(+id);
  }
}
