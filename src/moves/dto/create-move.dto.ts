import { IsEnum, IsNotEmpty, IsNumber } from "class-validator";
import { MoveType } from "../entities/move.entity";

export class CreateMoveDto {

    @IsNumber()
    @IsNotEmpty({message:'La ronda es un campo requerido'})
    roundId:number;

    @IsNumber()
    @IsNotEmpty({message:'El jugador es un campo requerido'})
    playerId: number;

    @IsEnum(MoveType)
    @IsNotEmpty({message:'El tipo de movimiento es un campo requerido'})
    moveType: number;
}
