import { Module } from '@nestjs/common';
import { RoundsService } from './rounds.service';
import { RoundsController } from './rounds.controller';
import { SessionsModule } from '../sessions/sessions.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Round } from './entities/round.entity';

@Module({
  imports: [SessionsModule,TypeOrmModule.forFeature([Round])],
  controllers: [RoundsController],
  providers: [RoundsService],
  exports:[RoundsService],
})
export class RoundsModule {}
