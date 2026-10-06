import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateMoveDto {

    @IsNumber()
    @IsNotEmpty({message:'La ronda es un campo requerido'})
    roundId:number;

    @IsNumber()
    @IsNotEmpty({message:'El jugador es un campo requerido'})
    playerId: number;

    @IsNumber()
    @IsNotEmpty({message:'El tipo de movimiento es un campo requerido'})
    moveType: number;
}
