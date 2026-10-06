import { Injectable } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Player } from './entities/player.entity';
import { Repository } from 'typeorm';
import { PlayerNotFoundException } from '../common/exceptions/http/player-not-found.exception';

@Injectable()
export class PlayersService {

  constructor(
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>,
  ){}

  async create(createPlayerDto: CreatePlayerDto) {

    const{...userData} = createPlayerDto;
    const player = this.playerRepository.create({
      ...userData
    });

    return await this.playerRepository.save(player);
  }

  async findAll(): Promise<Player[]> {
    return await this.playerRepository.find();
  }

  async findOne(id: number) {
    const player = await this.playerRepository.findOne({
      where: {id},
    })

    if (!player){
      throw new PlayerNotFoundException(id);
    }

    return player;
  }

  async update(id: number, updatePlayerDto: UpdatePlayerDto) {
    const player = await this.findOne(id);
    const{...userData} = updatePlayerDto;

    const updatedPlayer = this.playerRepository.merge(player,userData);

    return this.playerRepository.save(updatedPlayer);
  }

  async remove(id: number) {
    return this.playerRepository.delete(id);
  }

  async changeHP(id:number,hp:number){
    const player = await this.findOne(id);

    player.healthPoints += hp;

    this.playerRepository.save(player);
  }
}
