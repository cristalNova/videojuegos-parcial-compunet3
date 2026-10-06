import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Session } from './entities/session.entity';
import { SessionNotFoundException } from '../common/exceptions/http/session-not-found.exception';
import { PlayersService } from '../players/players.service';

@Injectable()
export class SessionsService {

  constructor(
    @InjectRepository(Session)
    private readonly sessionRepository: Repository<Session>,
    private readonly playerService:PlayersService,
  ){}

  async create(createSessionDto: CreateSessionDto) {
    const {...userData} = createSessionDto;

    const player1Obj = await this.playerService.findOne(userData.player1);

    const player2Obj = await this.playerService.findOne(userData.player2);

    const sessionObj = this.sessionRepository.create({
      ...userData,
      player1: player1Obj,
      player2: player2Obj,
    })

    return await this.sessionRepository.save(sessionObj);
  }

  async findAll() : Promise<Session[]>{
    return await this.sessionRepository.find({
      relations:{
        player1:true,
        player2:true,
      }
    });
  }

  async findOne(id: number) {
    const sessionObj = await this.sessionRepository.findOne({
      where: {id},
    })

    if(!sessionObj){
      throw new SessionNotFoundException(id);
    }

    return sessionObj;
  }

  async update(id: number, updateSessionDto: UpdateSessionDto) {

    const {...userData} = updateSessionDto;

    const sessionObj = await this.findOne(id);
    
    const player1Obj = userData.player1 ? await this.playerService.findOne(userData.player1) : sessionObj.player1;

    const player2Obj = userData.player2 ? await this.playerService.findOne(userData.player2) : sessionObj.player2;

    const sessionData = {
      ...userData,
      player1: player1Obj,
      player2: player2Obj,
    }

    return this.sessionRepository.merge(sessionObj,sessionData);
  }

  async remove(id: number) {
    return this.sessionRepository.delete(id);
  }
}
