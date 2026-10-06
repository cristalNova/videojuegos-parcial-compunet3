import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Round } from "../../rounds/entities/round.entity";
import { Player } from "../../players/entities/player.entity";

@Entity()
export class Session {

    @PrimaryGeneratedColumn()
    id:number;

    @Column({type:'varchar'})
    status:string;

    @ManyToOne(()=>Player,(player1)=>player1.sessionsAsPlayer1)
    @JoinColumn({name: 'player1_id'})
    player1:Player;

    @ManyToOne(()=>Player,(player2)=>player2.sessionsAsPlayer2)
    @JoinColumn({name: 'player2_id'})
    player2:Player;

    @Column({name:'max_rounds'})
    maxRounds:number;

    @OneToMany(()=>Round, (round)=>round.session)
    rounds:Round[]
}
