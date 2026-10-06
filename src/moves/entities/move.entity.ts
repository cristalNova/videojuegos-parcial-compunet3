import { Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Round } from "../../rounds/entities/round.entity";
import { Player } from "../../players/entities/player.entity";

export class Move {
    @PrimaryGeneratedColumn()
    id:number;

    @ManyToOne(()=> Round, (round) => round.moves)
    round:Round;

    @ManyToOne(()=>Player, (player)=>player.moves)
    player:Player;

    @Column({name:'move_type', type:'int'})
    moveType:number;

    @Column({name:'created_at', type:'timestamp'})
    createdAt:Date;
}
