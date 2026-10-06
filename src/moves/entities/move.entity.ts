import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Round } from "../../rounds/entities/round.entity";
import { Player } from "../../players/entities/player.entity";

export enum MoveType{
    ATAQUE=1,
    DEFENSA=2,
    ESPECIAL=3

}

@Entity()
export class Move {
    @PrimaryGeneratedColumn()
    id:number;

    @ManyToOne(()=> Round, (round) => round.moves)
    round:Round;

    @ManyToOne(()=>Player, (player)=>player.moves)
    player:Player;

    @Column({name:'move_type', type:'int'})
    moveType:MoveType;

    @Column({name:'created_at', type:'timestamp'})
    createdAt:Date;
}
