import { ConflictException, Injectable } from '@nestjs/common';
import { CreateMoveDto } from './dto/create-move.dto';
import { UpdateMoveDto } from './dto/update-move.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Move } from './entities/move.entity';
import { Repository } from 'typeorm';
import { PlayersService } from '../players/players.service';
import { RoundsService } from '../rounds/rounds.service';
import { MovementNotFoundException } from '../common/exceptions/http/movement-not-found.exception';

@Injectable()
export class MovesService {

  constructor(
    @InjectRepository(Move)
    private readonly moveRepository:Repository<Move>,
    private readonly playerService:PlayersService,
    private readonly roundService:RoundsService,
  ){}

  async create(createMoveDto: CreateMoveDto) {
    const {...userData} = createMoveDto;

    const movementsInRound = await this.moveRepository.findAndCount({
      where: {
        round:{
          id: userData.roundId
        },
        player:{
          id: userData.playerId
        }
      }
    })

    if (movementsInRound[1] > 0){
      throw new ConflictException('The player already made a movement');
    }

    const lastMovement = await this.moveRepository.findOne({
      where: {
        player:{
          id: userData.playerId
        }
      },
      order:{
        createdAt: 'DESC'
      }
    })

    if(lastMovement && lastMovement.moveType == userData.moveType){
      throw new ConflictException('User already made this movement');
    }

    const playerObj = await this.playerService.findOne(userData.playerId);

    const roundObj = await this.roundService.findOne(userData.roundId);

    const moveObj = this.moveRepository.create({

      ...userData,
      player:playerObj,
      round:roundObj,
      createdAt: new Date(),
    });

    return await this.moveRepository.save(moveObj);
  }

  async findAll() {
    return await this.moveRepository.find({
      relations:{
        round:true,
      }
    });
  }

  async findOne(id: number) {
    const moveObj = await this.moveRepository.findOne({
      where:{id},
      relations:{
        player:true,
      }
    });

    if(!moveObj){
      throw new MovementNotFoundException(id);
    }

    return moveObj;
  }

  async update(id: number, updateMoveDto: UpdateMoveDto) {
    const {...userData} = updateMoveDto;

    const moveObj = await this.findOne(id);

    const roundObj = userData.roundId ? await this.roundService.findOne(userData.roundId) : moveObj.round;

    const playerObj = userData.playerId ? await this.roundService.findOne(userData.playerId) : moveObj.player;

    const moveData = {
      ...userData,
      round:roundObj,
      player:playerObj
    }

    const moveObjUpdated = this.moveRepository.merge(moveObj,moveData);

    return await this.moveRepository.save(moveObjUpdated);
  }

  async remove(id: number) {
    return await this.moveRepository.delete(id);
  }
}
