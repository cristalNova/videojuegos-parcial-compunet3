import { Column, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Move } from "../../moves/entities/move.entity";
import { Session } from "../../sessions/entities/session.entity";

export class Round {

    @PrimaryGeneratedColumn()
    id:number;

    @Column({type:'int', name:'round_number'})
    roundNumber:number;

    @Column({type:'varchar'})
    result:string;

    @ManyToOne(()=>Session, (session)=>session.rounds)
    session:Session;

    @OneToMany(()=>Move, (move)=>move.round)
    moves:Move[];
}
