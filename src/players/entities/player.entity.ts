import { Column, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Move } from "../../moves/entities/move.entity";
import { Session } from "../../sessions/entities/session.entity";

export class Player {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type:'varchar'})
    name: string;

    @Column({name: 'health_points', type:'int'})
    healthPoints:number;

    @OneToMany(() => Move, (move) => move.player)
    moves: Move[];

    @OneToMany(()=>Session, (session) => session.player1)
    sessionsAsPlayer1: Session[];

    @OneToMany(()=>Session, (session) => session.player2)
    sessionsAsPlayer2: Session[];
}
