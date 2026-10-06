import { ConflictException, Injectable } from '@nestjs/common';
import { CreateRoundDto } from './dto/create-round.dto';
import { UpdateRoundDto } from './dto/update-round.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Round } from './entities/round.entity';
import { Repository } from 'typeorm';
import { SessionsService } from '../sessions/sessions.service';
import { RoundNotFoundException } from '../common/exceptions/http/round-not-found.exception';
import { MoveType } from '../moves/entities/move.entity';

@Injectable()
export class RoundsService {

  constructor(
    @InjectRepository(Round)
    private readonly roundRepository:Repository<Round>,
    private readonly sessionService:SessionsService,
  ){}

  async create(createRoundDto: CreateRoundDto) {
    const {...userData} = createRoundDto;

    const sessionObj = await this.sessionService.findOne(userData.sessionId);

    const roundObj = this.roundRepository.create({
      ...userData,
      session:sessionObj,
    });

    return await this.roundRepository.save(roundObj);

  }

  async findAll() {
    return await this.roundRepository.find();
  }

  async findOne(id: number) {
    const roundObj = await this.roundRepository.findOne({
      where:{id},
      relations:{
        moves:{
          player:true,
        }
      }
    })

    if(!roundObj){
      throw new RoundNotFoundException(id);
    }

    return roundObj;
  }

  async update(id: number, updateRoundDto: UpdateRoundDto) {
    const {...userData} = updateRoundDto;

    const roundObjt = await this.findOne(id);

    const sessionObj = userData.sessionId ? await this.sessionService.findOne(userData.sessionId) : roundObjt.session;

    const roundData ={
      ...userData,
      session:sessionObj,
    }

    const roundObjUpdated = this.roundRepository.merge(roundObjt,roundData);

    return await this.roundRepository.save(roundObjUpdated);
  }

  async remove(id: number) {
    return this.roundRepository.delete(id);
  }

  async resolve(id: number){
    const roundObj = await this.findOne(id);

    if(roundObj.moves.length < 2){
      throw new ConflictException('Both users most have a movement');
    }

    if((roundObj.moves[1].moveType == MoveType.ATAQUE) && (roundObj.moves[2].moveType == MoveType.DEFENSA)){

    }
  }
}
