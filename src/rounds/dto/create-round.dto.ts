import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateRoundDto {
    @IsNumber()
    @IsNotEmpty({message:'Se debe indicar el número de ronda'})
    roundNumber:number;

    @IsString({message:'El resultado debe ser un texto'})
    result:string;

    @IsNumber()
    @IsNotEmpty({message:'La sesión debe indicarse'})
    sessionId: number;
}
