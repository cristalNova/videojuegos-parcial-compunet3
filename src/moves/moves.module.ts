import { Module } from '@nestjs/common';
import { MovesService } from './moves.service';
import { MovesController } from './moves.controller';
import { PlayersModule } from '../players/players.module';
import { RoundsModule } from '../rounds/rounds.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Move } from './entities/move.entity';

@Module({
  imports: [PlayersModule, RoundsModule,TypeOrmModule.forFeature([Move])],
  controllers: [MovesController],
  providers: [MovesService],
  exports: [MovesService],
})
export class MovesModule {}
